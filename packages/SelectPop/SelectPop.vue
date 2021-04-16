<template>
  <div class="wrap">
    <div class="input" @click="open">
      <span class="input-pre" :class="{ gray: ids.length <= 0 }">
        {{ selectedNum }}
      </span>
      <span class="input-text">选择</span>
    </div>
    <el-dialog
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      width="662px"
      :visible.sync="visible"
      :show-close="false"
    >
      <div class="dia-header" slot="title">
        <span>{{ title }}</span>
        <i
          @click="canel"
          class="iconfont iconcloseguanbi-xian delIcon close-btn"
          style="font-size:12px;"
        ></i>
      </div>
      <!-- 搜索框 -->
      <span class="label">{{ input }}</span>
      <el-input
        style="width:200px;"
        :placeholder="placeholder"
        @input="search"
        v-model="data[searhField]"
      ></el-input>
      <div class="panel">
        <div class="panel-left">
          <div class="header">
            <span>{{ head }}</span>
            <span>({{ data.pageNum }}/{{ pages }})页</span>
          </div>
          <div v-loading="loading">
            <template v-if="isEmpty">
              <div class="empty">暂无数据</div>
            </template>
            <template v-else>
              <el-checkbox
                class="check-all"
                :indeterminate="indeterminate"
                v-model="checkAll"
                @change="checkAllChange"
              >
                全选
              </el-checkbox>
              <div v-if="!changing">
                <div
                  class="panel-left-list"
                  v-infinite-scroll="scrollLoad"
                  :infinite-scroll-disabled="disabled"
                  :infinite-scroll-distance="35"
                >
                  <el-checkbox-group
                    v-model="checkedList"
                    @change="checkedChange"
                  >
                    <el-checkbox
                      style="display:block;margin-right:0;"
                      v-for="item in list"
                      :label="item"
                      :key="item[option.id]"
                    >
                      <span v-if="typeof option.name === 'object'">
                        <template v-for="value in Object.values(option.name)">
                          <!-- eslint-disable-next-line-->
                          {{item[value]}}
                        </template>
                      </span>
                      <span v-else>
                        {{ item[option.name] }}
                      </span>
                    </el-checkbox>
                  </el-checkbox-group>
                </div>
              </div>
              <div v-else class="panel-left-list"></div>
            </template>
          </div>
        </div>
        <div class="panel-right">
          <div class="header">
            <span>已选({{ checkedList.length }}/{{ num }})</span>
            <span class="clear" @click="clearAll">清空</span>
          </div>

          <ul class="panel-right-list">
            <template v-if="noCheck">
              <li class="empty">暂无已选</li>
            </template>
            <li
              v-else
              class="panel-right-li"
              v-for="item in checkedList"
              :key="item[option.id]"
            >
              <span v-if="typeof option.name === 'object'">
                <template v-for="value in Object.values(option.name)">
                  <!-- eslint-disable-next-line-->
                  {{item[value]}}
                </template>
              </span>
              <span v-else>
                {{ item[option.name] }}
              </span>
              <i
                @click="delItem(item)"
                class="iconfont iconcloseguanbi-xian delIcon"
              ></i>
            </li>
          </ul>
        </div>
      </div>
      <div class="footer" slot="footer">
        <el-button @click="canel" style="width:76px;" type="plan" size="small">
          取消
        </el-button>
        <el-button
          @click="confirm"
          style="width:76px;"
          type="primary"
          size="small"
        >
          确认
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { uniqWith, differenceWith, cloneDeep } from "lodash";
export default {
  props: {
    batch: {
      // 批量查询字段， 如有值则取地址栏约定linkId,进行批量查询回显逻辑
      type: String,
      defualt: ""
    },
    placeholder: {
      type: String,
      default: "输入ID或名称"
    },
    title: {
      type: String,
      default: "选择账户"
    },
    method: {
      type: String,
      default: "post"
    },
    input: {
      type: String,
      default: "账户"
    },
    head: {
      type: String,
      default: "账户"
    },
    // 请求数据接口
    path: {
      type: String,
      required: true
    },
    // 搜索字段
    searhField: {
      type: String,
      required: true
    },
    // 请求方法
    request: {
      type: Object,
      required: true
    },
    // 映射关系
    option: {
      type: Object,
      default: () => {
        return {
          name: "name",
          id: "advertiserId"
        };
      }
    },
    // 定义参数
    params: {
      type: Object,
      default: () => {
        return {
          pageNum: 1,
          pageSize: 200
        };
      }
    }
  },
  computed: {
    noCheck() {
      return this.checkedList.length <= 0;
    },
    isEmpty() {
      return this.list.length <= 0;
    },
    selectedNum() {
      return this.ids.length > 0 ? `已选择${this.ids.length}项` : "请选择";
    },
    disabled() {
      return this.loading || this.data.pageNum >= this.pages;
    }
  },
  data() {
    return {
      changing: false,
      cache: [], // 对于已经存在的选中项，进行缓存
      loading: false,
      total: 0, // 当前总条数，变动的
      num: 0, // 全量总条数，不变的
      pages: 1,
      visible: false,
      indeterminate: false, // 半选状态
      checkAll: false,
      data: { [this.searhField]: "", ...this.params },
      checkedList: [],
      list: [],
      ids: []
    };
  },
  created() {
    this.batchFetch();
  },
  methods: {
    scrollLoad() {
      this.data.pageNum += 1;
      this.loading = true;
      this.fetch(true);
    },
    open() {
      this.visible = true;
    },
    reset() {
      // 重制初始化
      this.loading = false;
      this.total = 0; // 总条数
      this.num = 0;
      this.pages = 1;
      this.visible = false;
      this.indeterminate = false;
      this.checkAll = false;
      this.data = {
        [this.searhField]: "",
        ...this.params
      };
      this.list = [];
    },
    // 确认
    confirm() {
      this.ids = this.checkedList.map(item => item[this.option.id]);
      this.$emit("update:selected", this.ids);
      this.$emit("change", this.ids);
      this.reset();
    },
    canel() {
      this.checkedList = this.cache; // 取消重制回之前数据
      this.reset();
    },
    delItem(item) {
      const index = this.checkedList.findIndex(
        i => i[this.option.id] === item[this.option.id]
      );
      this.checkedList.splice(index, 1);
      this.checkedChange(this.checkedList);
    },
    // 供外部清理调用
    clear() {
      this.checkedList = [];
      this.ids = [];
      this.reset();
      this.$emit("update:selected", this.ids);
      this.$emit("change", this.ids);
    },
    clearAll() {
      // 备份， 防止取消操作后，无法回显
      this.checkedList = [];
      this.checkAll = false;
      this.indeterminate = false;
    },
    diffFun(arrVal, othVal) {
      return arrVal[this.option.id] === othVal[this.option.id];
    },
    checkAllChange(value) {
      if (value) {
        // 合并去重
        this.checkedList = uniqWith(
          this.checkedList.concat(this.list),
          this.diffFun
        );
      } else {
        // 要检查的数组, 排除的值
        this.checkedList = differenceWith(
          this.checkedList,
          this.list,
          this.diffFun
        );
      }
      this.indeterminate = false;
    },
    async search() {
      this.changing = true;
      this.data.pageNum = 1;
      await this.fetch();
      this.changing = false;
    },

    // up = true, 拉加载，否则搜索与普通加载
    fetch(up = false) {
      clearTimeout(this.timeout);
      return new Promise((resolve, reject) => {
        this.timeout = setTimeout(() => {
          this.loading = true;
          this.request({
            url: this.path,
            method: this.method,
            data: this.data
          })
            .then(result => {
              if (result.code === "200") {
                this.total = result.data.total;
                if (!this.data[this.searhField]) {
                  this.num = result.data.total;
                }
                this.pages = result.data.pages;
                const list = up
                  ? uniqWith(this.list.concat(result.data.list), this.diffFun)
                  : result.data.list;
                // 重制将当前选中项目的引用
                this.checkedList = this.checkedList.map(item => {
                  const listItem = list.find(
                    k => k[this.option.id] === item[this.option.id]
                  );
                  if (listItem) item = listItem;
                  return item;
                });
                this.list = list;
                this.checkedChange(this.checkedList);
              }
              resolve(result);
              this.loading = false;
            })
            .catch(err => {
              console.log(err);
              reject(err);
              this.loading = false;
            });
        }, 300);
      });
    },
    checkedChange(value) {
      if (this.list.length === 0) {
        this.checkAll = false;
        this.indeterminate = false;
        return;
      }
      // 当前 - 已经选中 = 0则说明当前都已经被选中，为全选
      const diff = differenceWith(this.list, value, this.diffFun);
      this.checkAll = diff.length === 0;
      // 有选中项，但半选
      this.indeterminate = diff.length > 0 && diff.length !== this.list.length;
    }
  },
  destroyed() {
    clearTimeout(this.timeout);
  },
  watch: {
    visible(val) {
      if (val) {
        this.data = {
          [this.searhField]: "",
          ...this.params
        };

        this.fetch();

        this.cache =
          this.checkedList.length > 0 ? cloneDeep(this.checkedList) : [];
      }
    }
  }
};
</script>

<style lang="less" scoped>
.wrap {
  .label {
    margin-right: 10px;
    color: #333333;
    font-size: 14px;
  }
  .input {
    display: flex;
    align-items: center;
    width: 248px;
    border: 1px solid #dcdee0;
    border-radius: 2px;
    font-size: 14px;
    cursor: pointer;
    .input-pre {
      display: inline-block;
      overflow: hidden;
      box-sizing: border-box;
      padding: 0 10px;
      width: 210px;
      height: 32px;
      color: #333333;
      text-overflow: ellipsis;
      white-space: nowrap;
      font-size: 12px;
      line-height: 32px;
    }
    .input-text {
      display: inline-block;
      box-sizing: border-box;
      width: 40px;
      color: #0650d0;
      vertical-align: middle;
      text-align: center;
      font-size: 12px;
      cursor: pointer;
    }
    .gray {
      color: #c8c9cc;
    }
  }
  .input:hover {
    border: 1px solid #0650d0;
  }
  /deep/.el-dialog__title {
    font-size: 16px;
  }
  /deep/.el-dialog__body {
    padding-top: 0;
    padding-bottom: 0;
  }
  /deep/.el-dialog__header .el-dialog__headerbtn .el-icon-close {
    color: #c8c9cc;
  }
  /deep/.el-dialog__header .el-dialog__headerbtn .el-icon-close:hover {
    color: #646566;
  }
  /deep/.el-dialog__header {
    box-shadow: none;
  }
  .dia-header {
    display: flex;
    justify-content: space-between;
    .close-btn {
      color: #c8c9cc;
    }
    .close-btn:hover {
      color: #333333;
    }
  }
  .panel {
    margin-top: 16px;
    .panel-left,
    .panel-right {
      display: inline-block;
      overflow: hidden;
      box-sizing: border-box;
      border: 1px solid #ebedf0;
      border-radius: 4px;
      background-color: #fff;
    }
    .panel-left {
      box-sizing: border-box;
      margin-right: 16px;
      width: calc(100% - 216px);
    }
    .panel-right-list {
      overflow: auto;
      box-sizing: border-box;
      padding: 10px 8px;
      height: 340px;
    }
    .panel-left-list {
      position: relative;
      overflow: auto;
      box-sizing: border-box;
      padding: 0px 16px;
      height: 308px;
    }
    .empty {
      position: relative;
      box-sizing: border-box;
      height: 341px;
      color: #333333;
      text-align: center;
      line-height: 340px;
    }
    .check-all {
      box-sizing: border-box;
      padding: 0 16px;
      width: 100%;
      border-bottom: 1px solid #ebedf0;
    }
    .panel-right {
      box-sizing: border-box;
      width: 200px;
    }
    .panel-right-li {
      display: flex;
      align-items: center;
      justify-content: space-between;
      box-sizing: border-box;
      margin-bottom: 10px;
      padding: 5px 8px 5px 10px;
      width: 177px;
      border-radius: 2px;
      background: #f7f8fa;
      span {
        display: inline-block;
        overflow: hidden;
        width: 144px;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      i {
        color: #c8c9cc;
        font-size: 12px;
        cursor: pointer;
        transform: scale(0.8);
      }
    }
    .header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      box-sizing: border-box;
      padding: 0 16px;
      height: 40px;
      border-bottom: 1px solid #ebedf0;
      background-color: #f7f8fa;
      color: #646566;
      font-size: 14px;
      line-height: 40px;
    }
    .clear {
      color: #0650d0;
      cursor: pointer;
    }
  }

  /deep/ .el-dialog__footer {
    padding: 20px;
  }
}
</style>

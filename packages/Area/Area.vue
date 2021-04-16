<template>
  <el-dialog
    class="rule-area-dialog"
    title="地域"
    width="830px"
    append-to-body
    :visible.sync="show"
  >
    <div>
      <el-radio-group @change="districtChange" v-model="district" size="small">
        <el-radio-button label="CITY">省市</el-radio-button>
        <el-radio-button label="COUNTY">区县</el-radio-button>
      </el-radio-group>
    </div>

    <!-- 搜索框 -->
    <el-autocomplete
      class="reportWidth"
      style="margin-right:10px;margin-top:16px;"
      value-key="name"
      v-model="queryWords"
      :fetch-suggestions="querySearch"
      placeholder="请输入内容"
      :trigger-on-focus="false"
      @select="queryChange"
    ></el-autocomplete>

    <div v-loading="dialogLoading">
      <div class="listDiv content">
        <div class="listDivRightList">
          <!-- 级联 -->
          <el-cascader-panel
            v-model="cascaders"
            style="min-height:100%;"
            :props="props"
            :options="options"
          ></el-cascader-panel>
        </div>
      </div>
      <!-- 右侧 -->
      <div class="addDiv content">
        <div class="header">
          已选
          <span class="clear" @click="clearList">清空</span>
        </div>
        <div class="color-list">
          <div
            class="color-item color-itemList"
            v-for="item in selected"
            :key="item.id"
          >
            <div class="nameInfo">
              {{ item.name }}
            </div>
            <i
              class="el-icon-delete"
              style="cursor:pointer"
              @click="delSelect(item)"
            ></i>
          </div>
        </div>
      </div>
    </div>
    <el-radio-group
      size="small"
      v-model="location_type"
      style="margin-top:16px;"
    >
      <el-radio label="CURRENT">正在该地区的用户</el-radio>
      <el-radio label="HOME">居住在该地区的用户</el-radio>
      <el-radio label="TRAVEL">到该地区旅行的用户</el-radio>
      <el-radio label="ALL">该地区内的所有用户</el-radio>
    </el-radio-group>
    <span slot="footer" class="dialog-footer">
      <el-button size="small" @click="cancel">取 消</el-button>
      <el-button
        size="small"
        type="primary"
        style="margin-left:20px;"
        @click="confirm"
      >
        确定
      </el-button>
    </span>
  </el-dialog>
</template>

<script>
//获取用户
import { cloneDeep, groupBy } from "lodash";
export default {
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    // 多级数据
    city: {
      type: Array,
      required: true
    },
    // 选中项
    area: {
      type: Array,
      default: () => {
        return [];
      }
    }
  },
  components: {},
  data() {
    return {
      show: this.visible,
      dialogLoading: false,
      queryWords: "",
      selected: [], // 已选
      location_type: "CURRENT",
      district: "CITY",
      cascaders: [], // 级链选中项
      cascaderData: [], // 根据类型切换之后的级联数据
      props: {
        multiple: true,
        emitPath: false,
        label: "name",
        value: "id"
      },
      options: []
    };
  },
  methods: {
    createFilter(queryString) {
      return restaurant => {
        return restaurant.name.indexOf(queryString) !== -1;
      };
    },
    // 搜索
    querySearch(queryString, cb) {
      var restaurants = this.cascaderData;
      var results = queryString
        ? restaurants.filter(this.createFilter(queryString))
        : restaurants;
      // 调用 callback 返回建议列表的数据
      cb(results);
    },
    // 搜索选中时，递归查找所选中项，在级联中选中所有选项
    queryChange(item) {
      const id = item.id;
      if (!this.cascaders.includes(id)) {
        let ids = [];
        const find = options => {
          const length = options.length;
          for (let i = 0; i < length; i++) {
            const item = options[i];
            if (item.id === id) {
              if (item.children) {
                // 递归选到最终节点
                const deepIds = this.deepFind(item.children);
                ids.push(...deepIds);
              } else {
                ids.push(item.id);
              }
              break;
            } else {
              if (item.children) find(item.children);
            }
          }
        };
        // 树状数据 this.options，等接口对接
        find(this.options);
        this.cascaders = Array.from(new Set([...ids, ...this.cascaders]));
      }
    },
    formatCity(city) {
      const clone = cloneDeep(city);
      function treeDataTranslate(data, id = "id", pid = "parentId") {
        var res = [];
        var temp = {};
        for (var i = 0; i < data.length; i++) {
          temp[data[i][id]] = data[i];
        }
        for (var k = 0; k < data.length; k++) {
          if (temp[data[k][pid]] && data[k][id] !== data[k][pid]) {
            if (!temp[data[k][pid]]["children"]) {
              temp[data[k][pid]]["children"] = [];
            }
            if (!temp[data[k][pid]]["_level"]) {
              temp[data[k][pid]]["_level"] = 1;
            }
            data[k]["_level"] = temp[data[k][pid]]._level + 1;
            temp[data[k][pid]]["children"].push(data[k]);
          } else {
            res.push(data[k]);
          }
        }
        return res;
      }
      return treeDataTranslate(clone);
    },
    cascaderChange(value) {
      const selected = [];
      function data(options) {
        for (let i = 0; i < options.length; i++) {
          const item = options[i];
          if (value.includes(item.id)) {
            selected.push(item);
          } else {
            if (item.children) {
              data(item.children);
            } else if (value.includes(item.id)) {
              selected.push(item);
            }
          }
        }
      }
      data(this.options);
      let filterSelected = [];
      if (this.district === "CITY") {
        // 省市
        // 根据 parentId 分组
        const group = groupBy(selected, "parentId");
        this.options.forEach(item => {
          if (group[item.id]) {
            if (item.children.length === group[item.id].length) {
              filterSelected.push(item);
            } else {
              filterSelected.push(...group[item.id]);
            }
          }
        });
        // 如果是顶级且无children, 将顶级也加入
        if (group[0]) {
          filterSelected.push(...group[0]);
        }
        this.selected = filterSelected;
      }
      if (this.district === "COUNTY") {
        // 区县
        this.selected = selected;
      }
    },
    // 删除已选
    delSelect(item) {
      // 如果是省
      if (item.level === "1" && this.district === "CITY") {
        // 过滤出需要删除的id
        let delIds = [];
        for (let i = 0; i < this.options.length; i++) {
          if (this.options[i].id === item.id) {
            if (this.options[i].children) {
              const ids = this.deepFind(this.options[i].children);
              delIds.push(...ids);
            } else {
              delIds.push(this.options[i].id);
            }

            break;
          }
        }
        this.cascaders = this.cascaders.filter(id => !delIds.includes(id));
        return;
      }
      const data = cloneDeep(this.cascaders);
      const index = data.findIndex(value => value === item.id);

      if (index !== -1) {
        data.splice(index, 1);
        this.cascaders = data;
      }
    },
    //取消
    cancel() {
      this.show = false;
    },
    // 保存
    confirm() {
      // 提交
      this.$emit("update:selected", {
        location_type: this.location_type,
        district: this.district,
        selected: this.selected
      });
      this.cancel();
    },
    // 清空列表
    clearList() {
      this.cascaders = [];
    },
    filterData(district) {
      if (district === "CITY") {
        // 省市
        //不要区县
        this.cascaderData = this.city.filter(item => item.level !== "3");
      }
      if (district === "COUNTY") {
        // 区县, 不要省
        this.cascaderData = this.city;
      }
      this.options = this.formatCity(this.cascaderData);
    },
    districtChange(value) {
      this.filterData(value);
      this.cascaders = [];
    },
    deepFind(data) {
      let ids = [];
      function deep(options) {
        options.forEach(c => {
          if (c.children) return deep(c.children);
          ids.push(c.id);
        });
      }
      deep(data);
      return ids;
    }
  },
  watch: {
    show(value) {
      this.$emit("update:visible", value);
    },
    cascaders: {
      handler(value) {
        this.cascaderChange(value);
      },
      deep: true
    },
    async visible(value) {
      this.show = value;
      if (value) {
        // 省市、区县
        this.filterData(this.district);
        // 设置选中id，回显数据,  省市逻辑不同
        if (this.district === "CITY") {
          let ids = [];
          this.area.forEach(item => {
            // 如果为顶级，不存在children,则直接选中，否则递归查找子id
            if (item.level === "1") {
              this.options.forEach(p => {
                if (p.id === item.id) {
                  if (p.children) {
                    const deepId = this.deepFind(p.children);
                    ids.push(...deepId);
                  } else {
                    ids.push(item.id);
                  }
                }
              });
            } else {
              ids.push(item.id);
            }
          });
          this.cascaders = ids;
        } else {
          const cascaders = this.area.map(item => item.id) || [];
          this.cascaders = cascaders;
        }
      } else {
        this.district = "CITY";
        this.location_type = "CURRENT";
        this.queryWords = "";
        this.selected = []; // 已选的json list, 最终提交的参数对应参数字段city
        this.cascaders = []; // 级联选中项的id集合
      }
    }
  }
};
</script>
<style lang="less" scoped>
.rule-area-dialog {
  .el-radio-button__orig-radio:checked + .el-radio-button__inner {
    background: #edf4ff;
    color: #0650d0;
  }
  .el-radio-button__inner {
    width: 88px;
  }
  .el-dialog__title {
    font-size: 16px;
  }
  .el-dialog__footer {
    padding-top: 24px;
    padding-bottom: 16px;
  }
  .el-dialog__body {
    padding-top: 0;
    padding-bottom: 0;
  }
  .el-dialog__header .el-dialog__headerbtn .el-icon-close {
    color: #c8c9cc;
  }
  .el-dialog__header .el-dialog__headerbtn .el-icon-close:hover {
    color: #646566;
  }
  .el-dialog__header {
    box-shadow: none;
  }
  .el-scrollbar__view.el-cascader-menu__list.is-empty {
    width: 570px;
  }

  .content {
    display: inline-block;
    margin-top: 16px;
    height: 370px;
    border: 1px solid #ebedf0;
    background: #ffffff;
    vertical-align: top;
    font-size: 12px;
    line-height: normal;
    .el-cascader-menu__wrap {
      height: 370px;
    }
    .el-divider__text {
      padding: 0;
      width: 100px;
      color: #c8c9cc;
      text-align: center;
      font-size: 12px;
    }
    .color-list {
      overflow: auto;
      height: 330px;
    }
    .header {
      box-sizing: border-box;
      padding: 10px 16px;
      width: 100%;
      height: 40px;
      border-bottom: 1px solid #ebedf0;
      background: #f7f8fa;
      color: #646566;
      font-size: 14px;
      .clear {
        float: right;
        color: #0650d0;
        cursor: Pointer;
      }
    }
    i {
      color: #c8c9cc;
      font-size: 12px;
    }
  }
  .listDiv {
    width: 570px;
    .listDivRightList {
      display: inline-block;
      overflow: auto;
      box-sizing: border-box;
      width: 100%;
      height: 370px;
      .el-cascader-panel.is-bordered {
        border: none;
        border-radius: 0;
      }

      .labelTitle {
        padding-top: 15px;
        color: #333333;
        font-weight: 600;
        font-size: 14px;
      }
      .checkbox {
        margin-top: 15px;
        width: 40%;
        font-size: 12px;
      }
    }
  }
  .addDiv {
    margin-left: 16px;
    width: 193px;
  }
  .queryInput {
    padding-right: 0;
    width: 200px;
    border: 1px solid #dcdee0;
    border-radius: 2px;
    .el-input__inner {
      border: none;
    }
    .el-input-group__append {
      overflow: hidden;
      padding-right: 8px;
      padding-left: 3px;
      border: none;
      background-color: #fff;
      font-size: 16px;
    }
  }
  .queryInput:hover {
    border: 1px solid #0650d0;
  }
  .color-item {
    display: flex;
    overflow: hidden; //超出的文本隐藏
    align-items: center;
    margin: 5px auto;
    padding: 10px 7px;
    width: 88%;
    border-radius: 4px;
    background-color: #f7f8fa;
    text-overflow: ellipsis; //溢出用省略号显示
    white-space: nowrap; //溢出不换行
    cursor: move;
  }
  .nameInfo {
    display: inline-block;
    overflow: hidden; //超出的文本隐藏
    flex: 1;
    margin-left: 8px;
    vertical-align: text-bottom;
    text-overflow: ellipsis; //溢出用省略号显示
    white-space: nowrap; //溢出不换行
  }
  .color-itemList:hover {
    background-color: #ebedf0;
  }
  .navBarWrap {
    position: fixed;
    top: 0;
    z-index: 999;
  }
  .dialog-footer {
    button {
      width: 76px;
      border-radius: 2px;
    }
  }
}
</style>

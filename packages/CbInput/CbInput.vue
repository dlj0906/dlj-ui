<template>
  <div class="cb-input">
    <div>
      <el-input
        :style="{ width: width }"
        v-bind="$attrs"
        @click.native.native="handleClick"
        @keydown.delete.native="delBefore"
        @keyup.delete.native="delAfter"
        @keyup.up.native="handleClick"
        @keyup.down.native="handleClick"
        @keyup.left.native="handleClick"
        @keyup.right.native="handleClick"
        @input="handleInput"
      ></el-input>
      <i
        v-if="delIcon"
        @click="del"
        style="font-size: 14px;line-height: 30px;margin-left:8px;"
        class="el-icon-delete"
      ></i>
      <span
        v-if="maxLength"
        style="min-width:40px;display:inline-block;margin-left:5px;"
        :class="{ error: calculationLength($attrs.value || '') > maxLength }"
      >
        {{ calculationLength($attrs.value || "") }}/{{ maxLength }}
      </span>
    </div>
    <div class="chibao">
      <span
        v-for="i in chibao"
        @click="addCiBao(i)"
        :key="i.alias"
        style="color:#0650D0;margin-right:10px;cursor:pointer;"
      >
        +{{ i[nameLabel] }}
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: "CbInput",
  props: {
    width: {
      type: String,
      default: "200px"
    },
    chibao: {
      // 词包数据格式[{ alias: '{词包}', name: '词包', length: 5 }]
      type: Array,
      default: () => []
    },
    maxLength: {
      // 可输入最大长度
      type: [Number, Boolean],
      default: false
    },
    maxNumber: {
      // 允许输入个数限制
      type: [Number, Boolean],
      default: false
    },
    delIcon: {
      // 是否显示删除
      type: Boolean,
      default: false
    },
    chineseChart: {
      // 默认正常计数
      type: [Number, Boolean],
      default: false
    },
    aliasLabel: {
      type: String,
      default: "alias"
    },
    nameLabel: {
      type: String,
      default: "name"
    },
    lengthLabel: {
      type: String,
      default: "length"
    }
  },
  data() {
    return {
      beforeCibao: this.$attrs.value,
      afterCibao: ""
    };
  },
  watch: {
    "$attrs.value": {
      handler(val) {
        this.beforeCibao = val;
        this.afterCibao = "";
      }
    }
  },
  methods: {
    // 删除一条
    del() {
      this.$emit("del");
    },
    // 态词包
    addCiBao(item) {
      if (this.maxNumber) {
        let lg = 0;
        this.chibao.forEach(val => {
          lg += this.$attrs.value.split(val[this.aliasLabel]).length - 1; // 获取每个词包存在的个数
        });
        if (lg >= this.maxNumber) {
          this.$message.closeAll();
          this.$message.error(`最多插入${this.maxNumber}个词包`);
          return;
        }
      }

      this.$emit(
        "input",
        this.beforeCibao + item[this.aliasLabel] + this.afterCibao
      );
    },
    // 计算包含词包字符串长度
    calculationLength(str) {
      let len = 0;
      let regCBArr = [];
      // 词包的总长度
      this.chibao.forEach(val => {
        len +=
          val[this.lengthLabel] * (str.split(val[this.aliasLabel]).length - 1);
        regCBArr.push(val[this.aliasLabel]);
      });

      let regCB = new RegExp(regCBArr.join("|"), "g");
      let generalStr = str.replace(regCB, ""); // 去除词包字符串

      if (this.chineseChart) {
        let reg = /^[\u4e00-\u9fa5]{0,}$/;
        for (var i = 0; i < generalStr.length; i++) {
          if (reg.test(generalStr[i])) {
            len += 2;
          } else {
            len++;
          }
        }
        this.$emit("length", Math.round(len / this.chineseChart));
        return Math.ceil(len / this.chineseChart);
      } else {
        this.$emit("length", (len += generalStr.length));
        return (len += generalStr.length);
      }
    },
    // 输入
    handleInput(val) {
      this.$emit("input", val);
    },
    // 删除动态词包
    delBefore(e) {
      var startPos = e.target.selectionStart; // input 第0个字符到选中的字符
      this.chibao.forEach(val => {
        if (
          e.target.value.substring(
            startPos - val[this.aliasLabel].length,
            startPos
          ) === val[this.aliasLabel]
        ) {
          e.target.selectionStart = startPos - val[this.aliasLabel].length;
        }
      });
      this.beforeCibao = e.target.value.substring(0, e.target.selectionStart);
      this.afterCibao = e.target.value.substring(e.target.selectionStart);
    },
    // 词包删除后
    delAfter(e) {
      var startPos = e.target.selectionStart; // input 第0个字符到选中的字符
      this.beforeCibao = e.target.value.substring(0, startPos);
      this.afterCibao = e.target.value.substring(startPos);
    },
    // 点击输入框获得焦点
    handleClick(e) {
      var startPos = e.target.selectionStart; // input 第0个字符到选中的字符
      this.beforeCibao = e.target.value.substring(0, e.target.selectionStart);
      this.afterCibao = e.target.value.substring(e.target.selectionStart);
      this.chibao.forEach(val => {
        let str = e.target.value.substr(
          startPos - val[this.aliasLabel].length > 0
            ? startPos - val[this.aliasLabel].length
            : 0,
          val[this.aliasLabel].length * 2
        );
        if (
          str.indexOf(val[this.aliasLabel]) !== -1 &&
          e.target.value.substr(startPos, val[this.aliasLabel].length) !==
            val[this.aliasLabel]
        ) {
          e.target.selectionStart =
            startPos - val[this.aliasLabel].length > 0
              ? startPos +
                (val[this.aliasLabel].length -
                  str.split(val[this.aliasLabel])[1].length)
              : val[this.aliasLabel].length;
          e.target.selectionEnd =
            startPos - val[this.aliasLabel].length > 0
              ? startPos +
                (val[this.aliasLabel].length -
                  str.split(val[this.aliasLabel])[1].length)
              : val[this.aliasLabel].length;
        }
      });
    }
  }
};
</script>
<style lang="less" scoped>
.cb-input {
  font-size: 12px;
  width: 100%;
  .chibao {
    width: 100%;
    margin-top: 4px;
    color: #b0bee1;
    line-height: normal;
  }
}
.error {
  color: #d00;
}
</style>

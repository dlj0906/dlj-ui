<template>
  <div class="bt-table">
    <div
      class="table"
      :class="{ pagination: pagination, 'total-top': isTotalTop }"
      @mouseenter="fixedScroll"
    >
      <el-table
        ref="elTable"
        :data="data"
        v-bind="$attrs"
        @header-dragend="headerDragendHandle"
        v-on="$listeners"
      >
        <template v-for="item in tbColumns">
          <!-- 自定义slot -->
          <el-table-column
            v-if="item.slotScope"
            :key="item.prop"
            v-bind="item"
            v-on="$listeners"
          >
            <template slot-scope="scope">
              <slot
                :name="item.prop"
                v-bind="scope"
              />
            </template>
          </el-table-column>
          <!-- Popover -->
          <el-table-column
            v-else-if="item.showOverflow"
            :key="item.prop"
            v-bind="item"
          >
            <template slot-scope="scope">
              <el-popover
                trigger="hover"
                placement="top"
                :disabled="!showTooltip[item.prop + scope.$index]"
              >
                <span>{{ scope.row[item.prop] }}</span>
                <span
                  slot="reference"
                  class="name-wrapper"
                  @mouseenter="
                    showTips($event, scope.row, item.prop, scope.$index)
                  "
                >{{ scope.row[item.prop] }}</span>
              </el-popover>
            </template>
          </el-table-column>
          <!-- el-table自带功能 -->
          <el-table-column
            v-else
            :key="item.prop"
            v-bind="item"
          />
        </template>
      </el-table>
    </div>
    <template v-if="pagination">
      <StarPagination
        v-if="data.length > 0"
        style="text-align: right;padding: 20px 0px;"
        v-bind="$attrs"
        v-on="$listeners"
        @pagination="paginationChange"
      />
    </template>
    <!-- 获取滚动条宽度 -->
    <div
      v-if="data.length === 0"
      style="height:20px;"
    />
    <div
      ref="scrollWidth"
      class="scroll-width"
      style="width: 100px;height: 100px;overflow: scroll;position: absolute;z-index: -1;opacity: 0;bottom:0;"
    />
  </div>
</template>

<script>
import StarPagination from '../Pagination/index'

export default {
  name: 'StarTable',
  components: {
    StarPagination
  },
  props: {
    data: {type: Array, default: () => []},
    column: {type: Array, default: () => []},
    columnsProps: {type: Object, default: () => {}},
    pagination: {
      type: Boolean,
      default: false
    },
    isTotalTop: {
      type: Boolean,
      default: false
    },
    affixTop: {
      type: Boolean,
      default: false
    },
    offset: {
      type: Number,
      default: 0
    },
    nodeId: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      showTooltip: {},
      childrenComponents: {},
      eventNode: ''
    }
  },
  computed: {
    tbColumns () {
      const { column, columnsProps: props } = this

      return column.map(col => {
        const it = Object.assign({}, props, col)
        return it
      })
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.childrenComponents = this.getTableChildrenComponents()
      if (this.nodeId) {
        this.eventNode = document.querySelector(`#${this.nodeId}`)
      }
      if (this.affixTop) {
        setTimeout(() => {
          this.eventNode.addEventListener('scroll', this.scrollXHandle)
        }, 1000)
      }
    })
  },
  beforeDestroy () {
    if (this.eventNode) {
      this.eventNode.removeEventListener('scroll', this.scrollXHandle)
    }
  },
  methods: {
    // 滚动条fixed高度问题
    fixedScroll () {
      let fixedWrapper = this.$refs.elTable.$refs.fixedWrapper
      let rightFixedWrapper = this.$refs.elTable.$refs.rightFixedWrapper
      let tableWidth = this.$refs.elTable.$el.offsetWidth
      let tableBodyWidth = this.$refs.elTable.$refs.bodyWrapper.scrollWidth
      if (fixedWrapper && tableBodyWidth > tableWidth) {
        fixedWrapper.style.cssText = `width:${
          this.$refs.elTable.$refs.fixedWrapper.style.width
        };
        bottom:${this.$refs.scrollWidth.offsetHeight -
          this.$refs.scrollWidth.scrollWidth}px`
      }
      if (rightFixedWrapper && tableBodyWidth > tableWidth) {
        rightFixedWrapper.style.cssText = `width:${
          this.$refs.elTable.$refs.rightFixedWrapper.style.width
        };
        bottom:${this.$refs.scrollWidth.offsetHeight -
          this.$refs.scrollWidth.scrollWidth}px`
      }
    },
    // 拖动表头回调
    headerDragendHandle () {
      this.$nextTick(() => {
        this.$refs.elTable.doLayout()
        this.fixedScroll()
      })
    },
    //
    showTips (obj, row, prop, index) {
      /* obj为鼠标移入时的事件对象 */
      /* currentWidth 为文本在页面中所占的宽度，创建标签，加入到页面，获取currentWidth ,最后在移除 */
      let TemporaryTag = document.createElement('span')
      TemporaryTag.innerText = row[prop]
      TemporaryTag.className = 'getTextWidth'
      TemporaryTag.style = 'font-size:12px;'
      document.querySelector('body').appendChild(TemporaryTag)
      let currentWidth = document.querySelector('.getTextWidth').offsetWidth
      document.querySelector('.getTextWidth').remove()
      /* cellWidth为表格容器的宽度 */
      const cellWidth = obj.target.offsetWidth

      /* 当文本宽度小于||等于容器宽度两倍时，代表文本显示未超过两行 */
      currentWidth <= 2 * cellWidth
        ? this.$set(this.showTooltip, prop + index, false)
        : this.$set(this.showTooltip, prop + index, true)
    },
    // 重置表头
    paginationChange () {
      this.resetHeader()
    },
    // 获取表格子组件
    getTableChildrenComponents () {
      let componentList = [
        'headerWrapper',
        'fixedHeaderWrapper',
        'rightFixedHeaderWrapper',
        'footerWrapper',
        'fixedFooterWrapper',
        'rightFixedFooterWrapper'
      ]
      let obj = {}
      componentList.forEach(componentName => {
        obj[componentName] = this.$refs.elTable.$refs[componentName]
      })
      return obj
    },
    // 重置表头位置
    resetHeader () {
      // eslint-disable-next-line no-unused-vars
      for (let [key, value] of Object.entries(this.childrenComponents)) {
        if (value) value.style.cssText = `transform:translateY(0px);`
      }
    },
    // 计算表头位置
    calculationHeader (scrollTop, offsetTop) {
      // eslint-disable-next-line no-unused-vars
      for (let [key, value] of Object.entries(this.childrenComponents)) {
        if (value) {
          value.style.cssText = `z-index:99;transform:translateY(${scrollTop -
              offsetTop}px);`
        }
      }
    },
    // 表头总计行吸顶功能
    scrollXHandle (e) {
      // let scrollTop = document.documentElement.scrollTop || document.body.scrollTop || window.pageYOffset
      let offsetTop = this.$el.offsetTop - this.offset - this.eventNode.offsetTop
      let scrollTop = e.target.scrollTop
      // fixed高度问题
      this.$nextTick(() => {
        this.fixedScroll()
      })
      scrollTop > offsetTop
        ? this.calculationHeader(scrollTop, offsetTop)
        : this.resetHeader()
    }
  }
}
</script>
<style lang="less" scoped>
.bt-table {
  .table {
    height: 100%;
  }
  .pagination {
    height: calc(100% - 72px);
  }
  .name-wrapper {
    display: -webkit-box;
    overflow: hidden;
    -webkit-box-orient: vertical;
    margin: 0;
    text-overflow: ellipsis;
    -webkit-line-clamp: 2;
  }
  ::v-deep {
    .el-table {
      font-size: 12px;
    }
    .el-table .cell {
      display: -webkit-box;
      overflow: hidden;
      -webkit-box-orient: vertical;
      text-overflow: ellipsis;
      line-height: 18px;

      -webkit-line-clamp: 2;
    }
    .el-table td,
    .el-table th {
      padding: 5px 0;
      height: 48px;
    }
    .el-table th {
      font-size: 14px;
    }
    .el-table .caret-wrapper {
      height: 17px;
    }
    .el-table .sort-caret.ascending {
      top: -3px;
    }
    .el-table .sort-caret.descending {
      bottom: -2px;
    }
  }
  .total-top {
    ::v-deep {
      .el-table {
        display: flex;
        flex-direction: column;
      }
      .el-table__footer-wrapper {
        font-weight: 600;
      }
      .el-table__body-wrapper {
        order: 1;
      }
      .el-table__fixed-body-wrapper {
        top: 96px !important;
      }
      .el-table__fixed-footer-wrapper {
        top: 47px;
        bottom: auto;
        font-weight: 600;
      }
    }
  }
}
</style>

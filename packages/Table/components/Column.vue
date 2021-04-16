<template>
  <div>
    <el-table-column v-bind="column" v-on="$listeners">
      <template slot-scope="scope" v-if="column.showOverflow">
        {{ scope.row }}
      </template>
    </el-table-column>
  </div>
</template>

<script>
export default {
  name: 'Column',
  props: {
    column: {
      type: Object,
      default: () => {}
    }
  },
  components: {},
  watch: {},
  methods: {}
}
</script>

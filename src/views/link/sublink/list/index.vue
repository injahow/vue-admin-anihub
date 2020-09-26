<template>
  <div class="app-container">
    <LinkTable
      :list-loading="listLoading"
      :table-data="tableData"
      :tags-options="tags_options"
      :tags-filters="tags_filters"
    />
  </div>
</template>

<script>
import { getList } from '@/api/sublink'

export default {
  data() {
    return {
      listLoading: true,
      tableData: [],
      tags_options: []
    }
  },

  mounted() {
    this.listLoading = true
    getList()
      .then((res) => {
        this.tableData = res.data
        this.listLoading = false
      })
      .catch(() => {
        this.listLoading = false
      })
  },
  methods: {
    handleEdit(row) {
      this.$router.push({
        name: 'link_edit',
        params: { id: row._id }
      })
    },
    filterHandler(value, row, column) {
      const property = column['property']
      if (row[property]) {
        return row[property].indexOf(value) > -1
      } else {
        return false
      }
    },
    handleClick(val) {
      window.location.href = val.domain
    }
  }
}
</script>

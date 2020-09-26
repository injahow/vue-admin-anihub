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
import LinkTable from '@/views/link/components/LinkTable'

import { getList } from '@/api/link'

export default {
  name: 'LinkAdd',
  components: {
    LinkTable
  },
  data() {
    return {
      listLoading: true,
      tableData: [],
      tags_options: ['其他'],
      tags_filters: []
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
    // todo request tags_options
    this.tags_filters = []
    this.tags_options.forEach((i) => {
      this.tags_filters.push({
        'text': i,
        'value': i
      })
    })
  }
}
</script>

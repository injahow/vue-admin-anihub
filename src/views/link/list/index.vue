<template>
  <div class="app-container">
    <LinkTable
      :list-loading="listLoading"
      :table-data="tableData"
      :tags-filters="tags_filters"
    />
  </div>

</template>

<script>
import LinkTable from '@/views/link/components/LinkTable'

import { getList } from '@/api/link'
import { getOptions } from '@/api/user'

export default {
  name: 'LinkAdd',
  components: {
    LinkTable
  },
  data() {
    return {
      listLoading: true,
      tableData: [],
      tags_filters: []
    }
  },
  mounted() {
    this.listLoading = true
    getList().then((res) => {
      this.tableData = res.data
      this.listLoading = false
    })
    // 获取用户options
    getOptions('link').then(res => {
      res.data.tags.forEach((i) => {
        this.tags_filters.push({
          'text': i,
          'value': i
        })
      })
    })
  }
}
</script>

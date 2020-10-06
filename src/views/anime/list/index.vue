<template>
  <div class="app-container">
    <AnimeTable
      :list-loading="listLoading"
      :table-data="tableData"
      :tags-filters="tags_filters"
    />
  </div>
</template>

<script>
import AnimeTable from '@/views/anime/components/AnimeTable'
import { getList } from '@/api/anime'
import { getOptions } from '@/api/user'

export default {
  name: 'AnimeList',
  components: {
    AnimeTable
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
    getList().then(res => {
      this.tableData = res.data
      this.listLoading = false
    }).catch(() => {
      this.listLoading = false
    })
    // 获取用户options
    getOptions('anime').then(res => {
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

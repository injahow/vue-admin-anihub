<template>
  <div class="app-container">
    <AnimeTable
      :list-loading="listLoading"
      :table-data="tableData"
      :tags-options="tags_options"
      :tags-filters="tags_filters"
    />
  </div>
</template>

<script>
import AnimeTable from '@/views/anime/components/AnimeTable'
import { getList } from '@/api/anime'

export default {
  name: 'AnimeList',
  components: {
    AnimeTable
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
    getList().then(res => {
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

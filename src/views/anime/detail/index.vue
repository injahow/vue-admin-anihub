<template>
  <div class="app-container">
    <el-table
      v-loading="listLoading"
      :data="tableData"
      width="100%"
      border
    >
      <el-table-column
        label="封面"
        width="120"
      >
        <template slot-scope="scope">
          <el-image
            :src="scope.row.cover"
            alt
            style="width: 100pxheight: 130px"
            fit="fit"
          />
        </template>
      </el-table-column>

      <el-table-column
        prop="name"
        label="名称"
        width="120"
        sortable
      />

      <el-table-column
        prop="pinyin"
        label="拼音"
      />

      <el-table-column
        prop="tags"
        label="标签"
        width="120"
        :filters="tags_options"
        :filter-method="filterHandler"
      >
        <template slot-scope="scope">
          <el-tag
            v-for="tag in scope.row.tags"
            :key="tag.name"
            effect="plain"
          >{{ tag }}</el-tag>
        </template>
      </el-table-column>

      <el-table-column
        prop="introduction"
        label="介绍"
      />

      <el-table-column
        prop="region"
        label="地区"
      />

      <el-table-column
        prop="staff"
        label="STAFF"
      />

      <el-table-column
        prop="actor"
        label="声优"
      />

      <el-table-column
        prop="publish"
        label="时间"
        sortable
        width="90"
      />
    </el-table>
  </div>
</template>

<script>
import { getDetail } from '@/api/anime'
export default {
  data() {
    return {
      tableData: []
    }
  },
  mounted() {
    const id = this.$route.params.id
    getDetail(id).then((res) => {
      this.tableData = [res.data]
    })
  }
}
</script>

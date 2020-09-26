<template>
  <div class="app-container">
    <el-table
      :data="tableData"
      width="100%"
      border
    >
      <el-table-column label="图标" width="80">
        <template slot-scope="scope">
          <el-image
            :src="scope.row.favicon"
            alt
            style="width: 50px; height: 50px"
            fit="fit"
          />
        </template>
      </el-table-column>

      <el-table-column
        prop="domain"
        label="域名"
        width="160"
      />

      <el-table-column
        prop="tags"
        label="标签"
        width="120"
      >
        <template slot-scope="scope">
          <el-tag
            v-for="tag in scope.row.tags"
            :key="tag"
            effect="plain"
          >{{ tag }}</el-tag>
        </template>
      </el-table-column>

      <el-table-column prop="region" label="地区" width="90" />

      <el-table-column prop="add_date" label="添加时间" width="110" />

    </el-table>
  </div>
</template>

<script>
import { getDetail } from '@/api/link'
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

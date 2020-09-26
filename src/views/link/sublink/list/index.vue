<template>
  <div class="app-container">
    <el-table v-loading="listLoading" :data="tableData" width="100%" border>

      <el-table-column prop="link_id" label="域名" width="300" sortable>
        <template slot-scope="scope">
          <el-link
            :href="scope.row.domain"
            type="primary"
            target="_blank"
          >{{ scope.row.domain }}</el-link>
        </template>
      </el-table-column>

      <el-table-column prop="type_name" label="类型" width="140" sortable />

      <el-table-column
        prop="tags"
        label="标签"
        width="140"
        :filters="tagsFilters"
        :filter-method="filterHandler"
      >
        <template slot-scope="scope">
          <el-tag
            v-for="tag in scope.row.tags"
            :key="tag"
            effect="plain"
          >{{ tag }}</el-tag>
        </template>
      </el-table-column>

      <el-table-column prop="add_date" label="添加时间" sortable width="110" />

      <el-table-column label="操作" width="270">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handleClick(scope.row)"
          >查看</el-button>
          <el-button size="mini" @click="handleEdit(scope.row)">编辑</el-button>
        </template>
      </el-table-column>

    </el-table>
  </div>
</template>

<script>
import { getList } from '@/api/sublink'

export default {
  data() {
    return {
      listLoading: true,
      tableData: [],
      tags_options: ['其他'],
      tagsFilters: []
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
    this.tagsFilters = []
    this.tags_options.forEach((i) => {
      this.tagsFilters.push({
        'text': i,
        'value': i
      })
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

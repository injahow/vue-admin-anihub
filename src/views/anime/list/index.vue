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
        width="130"
      >
        <template slot-scope="scope">
          <el-image
            :src="scope.row.cover"
            alt
            style="width:100px;height:130px;"
            fit="fit"
          />
        </template>
      </el-table-column>
      <el-table-column
        prop="name"
        label="名称"
        width="140"
        sortable
      />
      <el-table-column
        prop="tags"
        label="标签"
        width="140"
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
        prop="region"
        label="地区"
        width="90"
        sortable
      />
      <el-table-column
        prop="publish"
        label="时间"
        sortable
        width="90"
      />

      <el-table-column
        label="操作"
        width="270"
      >
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handleClick(scope.row)"
          >查看</el-button>
          <el-button
            size="mini"
            @click="handleEdit(scope.row)"
          >编辑</el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.row)"
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getList, deleteOne } from '@/api/anime'

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
    getList().then(res => {
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
        name: 'anime_edit',
        params: { id: row._id }
      })
    },
    handleDelete(row) {
      const id = row._id
      deleteOne(id).then((res) => {
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
        // 刷新页面 -- 刷新对象
        this.tableData.forEach((element, i) => {
          if (element._id === id) {
            this.tableData.splice(i, 1)
          }
        })
      })
    },
    filterHandler(value, row, column) {
      const property = column['property']
      if (row[property]) {
        // console.log(row[property])
        return row[property].indexOf(value) > -1
      } else {
        return false
      }
    },
    handleClick(val) {
      this.$router.push({
        name: 'anime_detail',
        params: { id: val._id }
      })
    }
  }
}
</script>

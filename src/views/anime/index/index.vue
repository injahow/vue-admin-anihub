<template>
  <div class="app-container">
    <el-form
      ref="form"
      :model="form"
      label-width="50px"
      style="width: 100%"
    >
      <el-form-item label="类型">
        <el-radio-group
          v-model="form.type"
          @change="resetData"
        >
          <el-radio-button
            label="全部"
            name="type"
          />
          <el-radio-button
            label="正片"
            name="type"
          />
          <el-radio-button
            label="电影"
            name="type"
          />
          <el-radio-button
            label="其他"
            name="type"
          />
        </el-radio-group>
      </el-form-item>

      <el-form-item label="地区">
        <el-radio-group
          v-model="form.region"
          @change="resetData"
        >
          <el-radio-button
            label="全部"
            name="region"
          />
          <el-radio-button
            label="日本"
            name="region"
          />
          <el-radio-button
            label="中国"
            name="region"
          />
        </el-radio-group>
      </el-form-item>

      <el-form-item label="时间">
        <el-radio-group
          v-model="form.publish"
          @change="resetData"
        >
          <el-radio-button
            label="全部"
            name="publish"
          />
          <el-radio-button
            label="2000"
            name="publish"
          />
          <el-radio-button
            label="2001"
            name="publish"
          />
        </el-radio-group>
      </el-form-item>

      <el-form-item label="风格">
        <el-radio-group
          v-model="form.tags"
          @change="resetData"
        >
          <el-radio-button
            label="全部"
            name="tags"
          />
          <el-radio-button
            label="青春"
            name="tags"
          />
          <el-radio-button
            label="悬疑"
            name="tags"
          />
        </el-radio-group>
      </el-form-item>
    </el-form>

    <el-table
      v-loading="listLoading"
      :data="indexData"
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
            @click="handleEdit(scope.$index, scope.row)"
          >编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getIndex } from '@/api/anime'

export default {
  data() {
    return {
      form: {
        type: '全部',
        region: '全部',
        publish: '全部',
        tags: '全部'
      },
      indexData: [],
      listLoading: false,
      tags_options: []

    }
  },
  mounted() {
    this.listLoading = true
    getIndex().then(res => {
      this.indexData = res.data
      this.listLoading = false
    })
      .catch(() => {
        this.listLoading = false
      })
  },
  methods: {
    resetData() {
      this.indexData = []
      this.listLoading = true
      // console.log(this.form)
      getIndex(this.form).then(res => {
        this.indexData = res.data
        this.listLoading = false
      })
        .catch(() => {
          this.listLoading = false
        })
    },
    // 代码冗余 - 同list .......
    handleEdit(index, row) {
      this.$router.push({
        name: 'anime_edit',
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
      this.$router.push({
        name: 'anime_detail',
        params: { id: val._id }
      })
    }
  }
}
</script>


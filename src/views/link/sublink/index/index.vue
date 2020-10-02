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
          v-model="form.type_name"
          @change="resetData"
        >
          <el-radio-button
            v-for="type_name in options.type_name"
            :key="type_name"
            :label="type_name"
            name="type_name"
          />
        </el-radio-group>
      </el-form-item>

      <el-form-item label="标签">
        <el-radio-group
          v-model="form.tags"
          @change="resetData"
        >
          <el-radio-button
            v-for="tags in options.tags"
            :key="tags"
            :label="tags"
            name="tags"
          />
        </el-radio-group>
      </el-form-item>

      <el-form-item label="时间">
        <el-radio-group
          v-model="form.add_date"
          @change="resetData"
        >
          <el-radio-button
            v-for="add_date in options.add_date"
            :key="add_date"
            :label="add_date"
            name="add_date"
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
      <el-table-column prop="domain" label="域名" width="300" sortable>
        <template slot-scope="scope">
          <el-link
            :href="scope.row.domain"
            type="primary"
            target="_blank"
          >{{ scope.row.domain }}</el-link>
        </template>
      </el-table-column>

      <el-table-column
        prop="type_name"
        label="类型"
        width="140"
        sortable
      />
      <el-table-column
        prop="tags"
        label="标签"
        width="140"
        :filters="tags_filters"
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

      <el-table-column
        prop="add_date"
        label="时间"
        sortable
        width="100"
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
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getIndex } from '@/api/sublink'
import { getOptions } from '@/api/user'

export default {
  data() {
    return {
      form: {
        type_name: '全部',
        tags: '全部',
        add_date: '全部'
      },
      indexData: [],
      listLoading: false,
      tags_filters: [],
      options: {
        type_name: ['全部'],
        region: ['全部'],
        add_date: ['全部', '2021', '2020'],
        tags: ['全部']
      }
    }
  },
  mounted() {
    this.listLoading = true
    getIndex(this.form).then(res => {
      this.indexData = res.data
      this.listLoading = false
    })
    getOptions('sublink').then(res => {
      this.options.type_name = ['全部'].concat(res.data.type_name)
      this.options.tags = ['全部'].concat(res.data.tags)
      res.data.tags.forEach((i) => {
        this.tags_filters.push({
          'text': i,
          'value': i
        })
      })
    })
  },
  methods: {
    resetData() {
      this.indexData = []
      this.listLoading = true
      getIndex(this.form).then(res => {
        this.indexData = res.data
        this.listLoading = false
      })
    },
    handleEdit(row) {
      this.$router.push({
        name: 'sublink_edit',
        params: { id: row._id }
      })
    },
    handleClick(val) {
      window.location.href = val.domain
    }
  }
}
</script>


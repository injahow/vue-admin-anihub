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
          <el-button
            icon="el-icon-plus"
            circle
            @click="addOption('type_name')"
          />
          <el-button
            icon="el-icon-minus"
            circle
            @click="delOption('type_name')"
          />
        </el-radio-group>
      </el-form-item>

      <el-form-item label="地区">
        <el-radio-group
          v-model="form.region"
          @change="resetData"
        >
          <el-radio-button
            v-for="region in options.region"
            :key="region"
            :label="region"
            name="region"
          />
          <el-button
            icon="el-icon-plus"
            circle
            @click="addOption('region')"
          />
          <el-button
            icon="el-icon-minus"
            circle
            @click="delOption('region')"
          />
        </el-radio-group>
      </el-form-item>

      <el-form-item label="时间">
        <el-radio-group
          v-model="form.publish"
          @change="resetData"
        >
          <el-radio-button
            v-for="publish in options.publish"
            :key="publish"
            :label="publish"
            name="publish"
          />
          <el-button
            icon="el-icon-plus"
            circle
            @click="addOption('publish')"
          />
          <el-button
            icon="el-icon-minus"
            circle
            @click="delOption('publish')"
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
          <el-button
            icon="el-icon-plus"
            circle
            @click="addOption('tags')"
          />
          <el-button
            icon="el-icon-minus"
            circle
            @click="delOption('tags')"
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
        type_name: '全部',
        region: '全部',
        publish: '全部',
        tags: '全部'
      },
      indexData: [],
      listLoading: false,
      tags_options: [],
      options: {
        type_name: ['全部', '正片', '电影', '其他'],
        region: ['全部', '日本', '中国'],
        publish: ['全部', '2020', '2019', '2018', '2017', '2016', '2015'],
        tags: ['全部', '青春', '科幻', '悬疑', '恐怖']
      }
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
    },
    addOption(form_name) {
      this.$prompt('请输入自定义选择内容参数', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
        // inputPattern: //, 正则验证规则
        // inputErrorMessage: '格式不正确'
      }).then(({ value }) => {
        // 添加选项
        if (value) {
          this.options[form_name].push(value)
        }
      }).catch(() => { })
    },
    delOption(form_name) {
      const options = this.options[form_name]
      // 保留第一项
      if (options.length > 1) {
        this.options[form_name].pop()
      }
    }
  }
}
</script>


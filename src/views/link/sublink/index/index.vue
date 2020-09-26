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
        prop="add_date"
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
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getIndex } from '@/api/link'

export default {
  data() {
    return {
      form: {
        type_name: '全部',
        region: '全部',
        add_date: '全部',
        tags: '全部'
      },
      indexData: [],
      listLoading: false,
      tags_options: [],
      options: {
        type_name: ['全部', '休闲娱乐', '论坛社区', '科技工具', '服务托管'],
        region: ['全部', '中国', '美国', '日本', '其他'],
        add_date: ['全部', '2020'],
        tags: ['全部', '青春', '其他']
      }
    }
  },
  mounted() {
    this.listLoading = true
    getIndex(this.form).then(res => {
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
    }
  }
}
</script>


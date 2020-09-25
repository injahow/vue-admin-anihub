<template>
  <div class="app-container">
    <el-form
      ref="linkform"
      :model="linkform"
      label-width="50px"
      style="width: 100%"
    >
      <el-form-item label="域名">
        <el-input v-model="linkform.domain" placeholder="请输入域名(含http)" />
      </el-form-item>

      <el-form-item label="类型">
        <el-select
          v-model="linkform.type_name"
          placeholder="请选择类型"
          style="width: 100%"
        >
          <el-option
            v-for="item in link_type_name"
            :key="item"
            :label="item"
            :value="item"
          />
        </el-select>
      </el-form-item>

      <el-form-item label="标签">
        <el-select
          v-model="linkform.tags"
          multiple
          filterable
          allow-create
          default-first-option
          style="width: 100%"
          placeholder="请选择标签"
        >
          <el-option
            v-for="item in tags_options"
            :key="item"
            :label="item"
            :value="item"
          />
        </el-select>
      </el-form-item>

      <el-form-item label="地区">
        <el-select
          v-model="linkform.region"
          placeholder="请选择地区"
          style="width: 100%"
        >
          <el-option
            v-for="item in region_options"
            :key="item"
            :label="item"
            :value="item"
          />
        </el-select>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="onSubmit(linkform)">提交</el-button>
        <el-button @click="onClose()">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { addOne, addOneByUrl } from '@/api/link'
export default {
  data() {
    return {
      linkform: {},
      actor_options: ['未知'],
      staff_options: ['未知'],
      tags_options: ['其他'],
      link_type_name: ['休闲娱乐', '论坛社区', '科技工具', '服务托管'],
      region_options: ['中国', '日本', '美国']
    }
  },
  mounted() {
    const url = this.$route.query.url
    if (url) {
      addOneByUrl(url)
        .then((res) => {
          if (res) {
            this.linkform = res.data
          }
        })
        .catch((error) => {
          this.$message.error(error)
        })
    }
  },
  methods: {
    onSubmit(link) {
      addOne(link)
        .then((res) => {
          if (res.code === 200) {
            this.$message('提交成功!')
            this.$router.push({ name: 'link_list' })
          } else {
            this.$message('错误: ' + res.error)
          }
        })
        .catch((error) => {
          this.$message.error(error)
        })
    },
    onClose() {
      this.$router.go(-1)
    }
  }
}
</script>

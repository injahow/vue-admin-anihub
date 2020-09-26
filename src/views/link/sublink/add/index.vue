<template>
  <div class="app-container">
    <el-form
      ref="linkForm"
      :model="linkForm"
      label-width="50px"
      style="width: 100%"
    >
      <el-form-item label="链接">
        <el-input v-model="linkForm.domain" placeholder="请输入地址(含http)" />
        <el-button v-if="resetButtonShow" @click="resetValue('domain')">重置</el-button>
      </el-form-item>

      <el-form-item label="类型">
        <el-select
          v-model="linkForm.type_name"
          placeholder="请选择类型"
          style="width: 100%"
        >
          <el-option
            v-for="item in linkTypeName"
            :key="item"
            :label="item"
            :value="item"
          />
        </el-select>
        <el-button v-if="resetButtonShow" @click="resetValue('type_name')">重置</el-button>
      </el-form-item>

      <el-form-item label="标签">
        <el-select
          v-model="linkForm.tags"
          multiple
          filterable
          allow-create
          default-first-option
          style="width: 100%"
          placeholder="请选择标签"
        >
          <el-option
            v-for="item in tagsOptions"
            :key="item"
            :label="item"
            :value="item"
          />
        </el-select>
        <el-button v-if="resetButtonShow" @click="resetValue('tags')">重置</el-button>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="onSubmit(linkForm)">提交</el-button>
        <el-button @click="onClose()">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>

import { addOne } from '@/api/sublink'
export default {
  name: 'LinkAdd',
  data() {
    return {
      linkForm: {},
      linkTypeName: ['视频', '学习', '购物', '博客'],
      tagsOptions: ['游戏', '动漫', '其他'],
      resetButtonShow: false
    }
  },
  methods: {
    onSubmit(link) {
      addOne(link)
        .then((res) => {
          if (res.code === 200) {
            this.$message('提交成功!')
            this.$router.push({ name: 'link_sublink_list' })
          }
        })
    }
  }
}
</script>

<template>
  <div class="app-container">
    <el-form
      ref="linkform"
      :model="linkform"
      label-width="50px"
      style="width: 100%"
    >
      <el-form-item label="域名">
        <el-input v-model="linkform.domain" />
        <el-button @click="resetValue('domain')">重置</el-button>
      </el-form-item>

      <el-form-item label="图标">
        <el-input v-model="linkform.favicon" />
        <el-button @click="resetValue('favicon')">重置</el-button>
      </el-form-item>

      <el-form-item label="类型">
        <el-select
          v-model="linkform.type_name"
          placeholder="请选择类型"
          style="width: 100%"
        >
          <el-option label="休闲娱乐" value="休闲娱乐" />
          <el-option label="论坛社区" value="论坛社区" />
          <el-option label="科技工具" value="科技工具" />
          <el-option label="服务托管" value="服务托管" />
        </el-select>
        <el-button @click="resetValue('region')">重置</el-button>
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
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
        <el-button @click="resetValue('tags')">重置</el-button>
      </el-form-item>

      <el-form-item label="地区">
        <el-select
          v-model="linkform.region"
          placeholder="请选择地区"
          style="width: 100%"
        >
          <el-option label="中国" value="中国" />
          <el-option label="日本" value="日本" />

          <el-option label="其他" value="其他" />
        </el-select>
        <el-button @click="resetValue('region')">重置</el-button>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="onSubmit(linkform)">提交</el-button>
        <el-button @click="onClose()">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { getDetail, editOne } from '@/api/link'
export default {
  data() {
    return {
      old_link_form: {},
      linkform: {},
      tags_options: []
    }
  },
  mounted() {
    const id = this.$route.params.id
    getDetail(id)
      .then(res => {
        this.old_link_form = res.data
        this.linkform = Object.assign({}, this.old_link_form)
      })
  },
  methods: {
    onSubmit(formName) {
      let changes = []
      // 判断修改项
      const old_link_form = this.old_link_form
      for (const i in old_link_form) {
        // 注意引用类型 object !
        if (typeof formName[i] === 'object') {
          if (formName[i].toString() !== old_link_form[i].toString()) {
            changes.push(i)
          }
        } else {
          if (formName[i] !== old_link_form[i]) {
            changes.push(i)
          }
        }
      }
      // console.log(this.old_link_form)
      if (changes.length > 0) {
        const link = formName
        // console.log('changes:', changes)
        editOne(link, changes).then((res) => {
          if (res.code === 200) {
            this.$message('修改成功!')
            changes = []
            setTimeout(() => {
              this.$router.go(-1)
            }, 1000)
          } else {
            this.$message('错误: ' + res.error)
          }
        })
      } else {
        this.$message('未修改内容!')
      }
    },
    onClose() {
      this.$router.go(-1)
    },
    resetValue(name) {
      this.linkform[name] = this.old_link_form[name]
    }
  }
}
</script>

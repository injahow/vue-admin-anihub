<template>
  <div class="app-container">
    <LinkForm
      :link-form="linkform"
      :link-type-name="link_type_name"
      :tags-options="tags_options"
      :region-options="region_options"
      :on-submit="onSubmit"
      :reset-value="resetValue"
      reset-button-show
    />
  </div>

</template>
<script>

import LinkForm from '@/views/link/components/LinkForm'

import { getDetail, editOne } from '@/api/link'

export default {
  name: 'LinkEdit',
  components: {
    LinkForm
  },
  data() {
    return {
      old_link_form: {},
      linkform: {},
      link_type_name: ['休闲娱乐', '论坛社区', '科技工具', '服务托管'],
      tags_options: ['其他'],
      region_options: ['中国', '美国', '日本', '其他'],
      resetButtonShow: true
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
    onSubmit(link_form) {
      let changes = []
      // 判断修改项
      const old_link_form = this.old_link_form
      for (const i in old_link_form) {
        // 注意引用类型 object !
        if (typeof link_form[i] === 'object') {
          if (link_form[i].toString() !== old_link_form[i].toString()) {
            changes.push(i)
          }
        } else {
          if (link_form[i] !== old_link_form[i]) {
            changes.push(i)
          }
        }
      }
      // console.log(this.old_link_form)
      if (changes.length > 0) {
        const link = link_form
        // console.log('changes:', changes)
        editOne(link, changes).then((res) => {
          if (res.code === 200) {
            this.$message('修改成功!')
            changes = []
            setTimeout(() => {
              this.$router.go(-1)
            }, 1000)
          }
        })
      } else {
        this.$message('未修改内容!')
      }
    },
    resetValue(name) {
      this.linkform[name] = this.old_link_form[name]
    }
  }
}
</script>

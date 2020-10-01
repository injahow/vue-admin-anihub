<template>
  <div class="app-container">
    <LinkForm
      :link-form="link_form"
      :on-submit="onSubmit"
      :reset-value="resetValue"
      is-sublink
      :options="options"
      reset-button-show
    />
  </div>

</template>
<script>

import LinkForm from '@/views/link/components/LinkForm'

import { getDetail, editOne } from '@/api/sublink'
import { getOptions } from '@/api/user'

export default {
  name: 'LinkEdit',
  components: {
    LinkForm
  },
  data() {
    return {
      old_link_form: {},
      link_form: {},
      options: {}
    }
  },
  mounted() {
    getOptions('sublink')
      .then(res => {
        this.options = res.data
      })
    const id = this.$route.params.id
    getDetail(id)
      .then(res => {
        this.old_link_form = res.data
        this.link_form = Object.assign({}, this.old_link_form)
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
      this.link_form[name] = this.old_link_form[name]
    }
  }
}
</script>

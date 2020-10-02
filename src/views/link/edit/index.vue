<template>
  <div class="app-container">
    <LinkForm
      :link-form="link_form"
      :options="options"
      :on-submit="onSubmit"
      :reset-value="resetValue"
      reset-button-show
    />
  </div>

</template>
<script>

import LinkForm from '@/views/link/components/LinkForm'

import { getDetail, editOne } from '@/api/link'
import { compareForm } from '@/utils/put-changes'
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
    const id = this.$route.params.id
    getDetail(id).then(res => {
      this.old_link_form = res.data
      this.link_form = Object.assign({}, this.old_link_form)
    })
    getOptions('link').then(res => {
      this.options = res.data
    })
  },
  methods: {
    onSubmit(link_form) {
      // 判断修改项
      const old_link_form = this.old_link_form
      const res = compareForm(link_form, old_link_form)
      if (res.is_changed) {
        const link = link_form
        editOne(link, res.changes).then((res) => {
          this.$message('修改成功!')
          setTimeout(() => {
            this.$router.go(-1)
          }, 1000)
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

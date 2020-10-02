<template>
  <div class="app-container">
    <LinkForm
      :link-form="link_form"
      :options="options"
      :on-submit="onSubmit"
    />
  </div>
</template>

<script>
import LinkForm from '@/views/link/components/LinkForm'

import { addOne } from '@/api/link'
import { getOptions } from '@/api/user'

export default {
  name: 'LinkAdd',
  components: {
    LinkForm
  },
  data() {
    return {
      link_form: {},
      options: {}
    }
  },
  mounted() {
    getOptions('link').then(res => {
      this.options = res.data
    })
  },
  methods: {
    onSubmit(link) {
      addOne(link).then(res => {
        this.$message('提交成功!')
        this.$router.push({ name: 'link_list' })
      })
    }
  }
}
</script>

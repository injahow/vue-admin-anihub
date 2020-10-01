<template>
  <div class="app-container">
    <LinkForm
      :link-form="link_form"
      :on-submit="onSubmit"
    />
  </div>
</template>

<script>
import LinkForm from '@/views/link/components/LinkForm'

import { addOne } from '@/api/link'

export default {
  name: 'LinkAdd',
  components: {
    LinkForm
  },
  data() {
    return {
      link_form: {}
    }
  },
  methods: {
    onSubmit(link) {
      addOne(link)
        .then(res => {
          if (res.code === 200) {
            this.$message('提交成功!')
            this.$router.push({ name: 'link_list' })
          }
        })
    }
  }
}
</script>

<template>
  <div class="app-container">
    <LinkForm
      :link-form="linkform"
      :link-type-name="link_type_name"
      :tags-options="tags_options"
      :region-options="region_options"
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
      linkform: {},
      tags_options: ['其他'],
      link_type_name: ['休闲娱乐', '论坛社区', '科技工具', '服务托管'],
      region_options: ['中国', '美国', '日本', '其他']
    }
  },
  methods: {
    onSubmit(link) {
      addOne(link)
        .then((res) => {
          if (res.code === 200) {
            this.$message('提交成功!')
            this.$router.push({ name: 'link_list' })
          }
        })
    }
  }
}
</script>

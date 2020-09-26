<template>
  <div class="app-container">
    <AnimeForm
      :anime-form="anime_form"
      :actor-options="actor_options"
      :staff-options="staff_options"
      :tags-options="tags_options"
      :type-name-options="type_name_options"
      :region-options="region_options"
      :on-submit="onSubmit"
    />
  </div>
</template>

<script>
import AnimeForm from '@/views/anime/components/AnimeForm'

import { addOne, addOneByUrl } from '@/api/anime'
export default {
  name: 'AnimeAdd',
  components: {
    AnimeForm
  },
  data() {
    return {
      anime_form: {},
      actor_options: ['未知'],
      staff_options: ['未知'],
      tags_options: ['其他'],
      type_name_options: ['正片', '电影', '其他'],
      region_options: ['中国', '日本', '美国'],
      onSubmit: (anime) => {
        addOne(anime)
          .then((res) => {
            this.$message('提交成功!')
            this.$router.push({ name: 'anime_list' })
          })
      },
      resetValue: (name) => {
        this.anime_form[name] = this.old_anime_form[name]
      }

    }
  },
  mounted() {
    const url = this.$route.query.url
    const that = this
    if (url) {
      addOneByUrl(url)
        .then((res) => {
          that.anime_form = res.data
        })
    }
  }
}
</script>

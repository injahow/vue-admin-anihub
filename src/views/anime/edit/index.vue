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
      :reset-value="resetValue"
      reset-button-show
    />
  </div>
</template>

<script>
import AnimeForm from '@/views/anime/components/AnimeForm'
import { getDetail, editOne } from '@/api/anime'
import { compareFrom } from '@/utils/put-changes'

export default {
  name: 'AnimeEdit',
  components: {
    AnimeForm
  },
  data() {
    return {
      old_anime_form: {},
      anime_form: {},
      actor_options: ['未知'],
      staff_options: ['未知'],
      tags_options: ['其他'],
      region_options: ['中国', '日本', '美国'],
      type_name_options: ['正片', '电影', '其他'],
      onSubmit: (formName) => {
        // 判断修改项
        const res = compareFrom(formName, this.old_anime_form)
        let changes = res.changes
        if (res.is_changed) {
          const anime = formName
          editOne(anime, changes).then((res) => {
            this.$message('修改成功!')
            changes = []
            setTimeout(() => {
              this.$router.push({
                name: 'anime_detail',
                params: { id: this.old_anime_form._id }
              })
            }, 1000)
          })
        } else {
          this.$message('未修改内容!')
        }
      }
    }
  },
  mounted() {
    const id = this.$route.params.id
    getDetail(id)
      .then((res) => {
        this.old_anime_form = res.data
        this.anime_form = Object.assign({}, this.old_anime_form)
      })
      .catch((error) => {
        this.$message.error(error)
      })
  },
  methods: {
    resetValue(name) {
      this.anime_form[name] = this.old_anime_form[name]
    }
  }
}
</script>

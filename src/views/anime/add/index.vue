<template>
  <div class="app-container">
    <el-tabs v-model="activeName">
      <el-tab-pane
        label="填写表单"
        name="form"
      >
        <AnimeForm
          :anime-form="anime_form"
          :on-submit="onSubmit"
        />
      </el-tab-pane>
      <el-tab-pane
        label="填写链接"
        name="url"
      >
        <el-form label-width="50px" style="width:100%">
          注：目前仅支持bilibili
          <el-form-item label="链接">
            <el-input v-model="url" placeholder="如:https://www.bilibili.com/bangumi/play/ss34230/" />
          </el-form-item>
          <el-form-item>
            <el-button
              type="primary"
              @click="url2form()"
            >提交</el-button>
          </el-form-item>
        </el-form>
      </el-tab-pane>
    </el-tabs>
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
      activeName: 'form',
      url: '',
      anime_form: {}
    }
  },
  methods: {
    onSubmit(anime) {
      addOne(anime).then((res) => {
        this.$message('提交成功!')
        this.$router.push({ name: 'anime_list' })
      })
    },
    resetValue(name) {
      this.anime_form[name] = this.old_anime_form[name]
    },
    url2form() {
      // todo: is url ?
      if (this.url) {
        addOneByUrl(this.url).then((res) => {
          this.anime_form = res.data
          this.activeName = 'form'
        })
      }
    }
  }
}
</script>

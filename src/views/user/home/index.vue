<template>
  <div class="app-container">
    <el-image :src="user_info.avatar" />
    <br>

    <svg-icon icon-class="user" />{{ user_info.name }}
    <br>

    <svg-icon icon-class="email" />
    <el-link :href="'mailto:'+user_info.email" target="_blank">{{ user_info.email }}</el-link>
    <br>

    {{ user_info.introduction }}

    <el-divider />

    <i class="el-icon-link">
      <el-link :href="'https://twitter.com/'+user_info.twitter" target="_blank">
        @{{ user_info.twitter }}
      </el-link>
    </i>
    <br>

    <i class="el-icon-link" />
    <el-link :href="'https://github.com/'+user_info.github" target="_blank">
      @{{ user_info.github }}
    </el-link>
    <br>

    <i class="el-icon-link">
      <el-link :href="'https://weibo.com/'+user_info.weibo" target="_blank">
        @{{ user_info.weibo }}
      </el-link>
    </i>
    <br>

    <i class="el-icon-link">
      <el-link :href="'https://facebook.com/'+user_info.facebook" target="_blank">
        @{{ user_info.facebook }}
      </el-link>
    </i>
    <br>

  </div>
</template>

<script>
import { getInfo } from '@/api/user'
export default {
  data() {
    return {
      user_info: {
        name: '',
        avatar: '',
        email: '',
        introduction: '',
        github: '',
        weibo: '',
        twitter: '',
        facebook: ''
      }
    }
  },
  mounted() {
    getInfo().then(res => {
      this.user_info = res.data
    })
  }
}
</script>

<style>

</style>

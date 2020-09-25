<template>
  <div class="app-container">
    <el-form
      ref="animeform"
      :model="animeform"
      label-width="50px"
      style="width: 100%"
    >
      <el-form-item label="名称">
        <el-input v-model="animeform.name" />
      </el-form-item>

      <el-form-item label="封面">
        <el-input v-model="animeform.cover" />
      </el-form-item>

      <el-form-item label="介绍">
        <el-input
          v-model="animeform.introduction"
          type="textarea"
          autosize
          placeholder="请输入介绍"
        />
      </el-form-item>

      <el-form-item label="类型">
        <el-select
          v-model="animeform.type_name"
          placeholder="请选择类型"
          style="width: 100%"
        >
          <el-option
            v-for="item in anime_type_name"
            :key="item"
            :label="item"
            :value="item"
          />
        </el-select>
      </el-form-item>

      <el-form-item label="标签">
        <el-select
          v-model="animeform.tags"
          multiple
          filterable
          allow-create
          default-first-option
          style="width: 100%"
          placeholder="请选择标签"
        >
          <el-option
            v-for="item in tags_options"
            :key="item"
            :label="item"
            :value="item"
          />
        </el-select>
      </el-form-item>

      <el-form-item label="地区">
        <el-select
          v-model="animeform.region"
          placeholder="请选择地区"
          style="width: 100%"
        >
          <el-option
            v-for="item in region_options"
            :key="item.value"
            :label="item"
            :value="item"
          />
        </el-select>
      </el-form-item>

      <el-form-item label="日期">
        <el-date-picker
          v-model="animeform.publish"
          type="month"
          placeholder="选择发布日期"
          style="width: 100%"
        />
      </el-form-item>

      <el-form-item label="声优">
        <el-select
          v-model="animeform.actor"
          filterable
          allow-create
          multiple
          placeholder="请选择"
          style="width: 100%"
        >
          <el-option
            v-for="item in actor_options"
            :key="item"
            :label="item"
            :value="item"
          />
        </el-select>
      </el-form-item>

      <el-form-item label="STAFF">
        <el-select
          v-model="animeform.staff"
          filterable
          allow-create
          default-first-option
          multiple
          style="width: 100%"
          placeholder="请选择"
        >
          <el-option
            v-for="item in staff_options"
            :key="item"
            :label="item"
            :value="item"
          />
        </el-select>
      </el-form-item>

      <el-form-item>
        <el-button
          type="primary"
          @click="onSubmit(animeform)"
        >提交</el-button>
        <el-button @click="onClose()">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { addOne, addOneByUrl } from '@/api/anime'
export default {
  data() {
    return {
      animeform: {},
      actor_options: ['未知'],
      staff_options: ['未知'],
      tags_options: ['其他'],
      anime_type_name: ['正片', '电影', '其他'],
      region_options: ['中国', '日本', '美国']
    }
  },
  mounted() {
    const url = this.$route.query.url
    const that = this
    if (url) {
      addOneByUrl(url)
        .then((res) => {
          if (res) {
            that.animeform = res.data
          }
        })
        .catch((error) => {
          that.$message.error(error)
        })
    }
  },
  methods: {
    onSubmit(anime) {
      addOne(anime)
        .then((res) => {
          if (res.code === 200) {
            this.$message('提交成功!')
            this.$router.push({ name: 'anime_list' })
          } else {
            this.$message('错误: ' + res.error)
          }
        })
        .catch((error) => {
          this.$message.error(error)
        })
    },
    onClose() {
      this.$router.go(-1)
    }
  }
}
</script>

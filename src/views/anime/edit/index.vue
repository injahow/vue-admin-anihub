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
        <el-button @click="resetValue('name')">重置</el-button>
      </el-form-item>

      <el-form-item label="封面">
        <el-input v-model="animeform.cover" />
        <el-button @click="resetValue('cover')">重置</el-button>
      </el-form-item>

      <el-form-item label="介绍">
        <el-input
          v-model="animeform.introduction"
          type="textarea"
          autosize
          placeholder="请输入介绍"
        />
        <el-button @click="resetValue('introduction')">重置</el-button>
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
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
        <el-button @click="resetValue('tags')">重置</el-button>
      </el-form-item>

      <el-form-item label="地区">
        <el-select
          v-model="animeform.region"
          placeholder="请选择地区"
          style="width: 100%"
        >
          <el-option
            label="日本"
            value="日本"
          />
          <el-option
            label="中国"
            value="中国"
          />
          <el-option
            label="其他"
            value="其他"
          />
        </el-select>
        <el-button @click="resetValue('region')">重置</el-button>
      </el-form-item>

      <el-form-item label="日期">
        <el-date-picker
          v-model="animeform.publish"
          type="month"
          placeholder="选择发布日期"
          style="width: 100%"
        />
        <el-button @click="resetValue('publish')">重置</el-button>
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
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
        <el-button @click="resetValue('actor')">重置</el-button>
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
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
        <el-button @click="resetValue('staff')">重置</el-button>
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
import { getDetail, editOne } from '@/api/anime'
export default {
  data() {
    return {
      old_anime_form: {},
      animeform: {},
      actor_options: [],
      staff_options: [],
      tags_options: []
    }
  },
  mounted() {
    const id = this.$route.params.id
    getDetail(id)
      .then((res) => {
        this.old_anime_form = res.data
        this.animeform = Object.assign({}, this.old_anime_form)
      })
      .catch((error) => {
        this.$message.error(error)
      })
  },
  methods: {
    onSubmit(formName) {
      let changes = []
      // 判断修改项
      const old_anime_form = this.old_anime_form
      for (const i in old_anime_form) {
        // 注意引用类型 object !
        if (typeof formName[i] === 'object') {
          if (formName[i].toString() !== old_anime_form[i].toString()) {
            changes.push(i)
          }
        } else {
          if (formName[i] !== old_anime_form[i]) {
            changes.push(i)
          }
        }
      }
      // console.log(this.old_anime_form)
      if (changes.length > 0) {
        const anime = formName
        // console.log('changes:', changes)
        editOne(anime, changes).then((res) => {
          if (res.code === 200) {
            this.$message('修改成功!')
            changes = []
            setTimeout(() => {
              this.$router.push({
                name: 'anime_detail',
                params: { id: this.old_anime_form._id }
              })
            }, 1000)
          } else {
            this.$message('错误: ' + res.error)
          }
        })
      } else {
        this.$message('未修改内容!')
      }
    },
    onClose() {
      this.$router.go(-1)
    },
    resetValue(name) {
      this.animeform[name] = this.old_anime_form[name]
    }
  }
}
</script>

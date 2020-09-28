<template>
  <div class="app-container">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="用户选项" name="first"> 用户选项 </el-tab-pane>
      <el-tab-pane label="动漫选项" name="second">

        <el-form ref="animeOptionForm" :model="animeOptionForm" :rules="rules" label-width="80px">

          <el-form-item v-for="item in optionForm" :key="item.message" :label="optionLabel[item]" prop="item">
            <el-select
              v-model="animeOptionForm[item]"
              multiple
              filterable
              allow-create
              default-first-option
              style="width: 100%;"
              placeholder="请添加选项"
            >
              <el-option
                v-for="option in animeOptionForm[item]"
                :key="option"
                :label="option"
                :value="option"
              />
            </el-select>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="submitForm('animeOptionForm')">保存</el-button>
            <el-button @click="resetForm('animeOptionForm')">重置</el-button>
          </el-form-item>

        </el-form>
      </el-tab-pane>

      <el-tab-pane label="链接选项" name="third">
        链接选项
      </el-tab-pane>

      <el-tab-pane label="其他" name="fourth">
        其他
      </el-tab-pane>

    </el-tabs>

  </div>
</template>
<script>
import { getAnimeOptions } from '@/api/user'
import { compareFrom } from '@/utils/put-changes'

export default {
  data() {
    return {
      activeName: 'first',
      optionForm: ['type_name', 'tags', 'actor', 'staff'],
      optionLabel: {
        'type_name': '类型选项',
        'tags': '标签选项',
        'actor': 'actor选项',
        'staff': 'staff选项'
      },
      oldOptionForm: {},
      animeOptionForm: {
        type_name: [],
        tags: [],
        actor: [],
        staff: []
      },
      is_changed: false,
      rules: {
        name: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },
          { min: 1, max: 6, message: '长度在 1 到 6 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  mounted() {

  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          (formName) => {
            // 判断修改项
            // const res = compareFrom(formName, this.old_anime_form)
            /* let changes = res.changes
            if (res.is_changed) {

              const anime = formName
              editOne(anime, changes).then((res) => {
                this.$message('修改成功!')
                changes = []
              })

            } else {
              this.$message('未修改内容!')
            }*/
          }
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
    handleClick(event) {
      console.log(event)
      getAnimeOptions().then((res) => {
        this.animeOptionForm = res.data
        this.oldOptionForm = Object.assign({}, this.animeOptionForm)
      })
      const res = compareFrom(this.animeOptionForm, this.oldOptionForm)

      if (res.is_changed) {
        // put res.changes
      }
      // !if
      // 修改过判断?
      /*
      const old_form = this.oldOptionForm
      if (!old_form) {
        return
      }
      const new_form = this.animeOptionForm
      this.is_changed = false
      for (const i in old_form) {
        if (typeof new_form[i] === 'object') {
          if (new_form[i].toString() !== old_form[i].toString()) {
            this.is_changed = true
            break
          }
        } else {
          if (new_form[i] !== old_form[i]) {
            this.is_changed = true
            break
          }
        }
      }
      // 2.无-跳转-get_Options
      if (this.is_changed) {
        this.$message({
          type: 'warning',
          message: '修改未保存!'
        })
      } else {

      }*/
    }
  }
}
</script>

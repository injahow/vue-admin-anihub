<template>
  <div class="app-container">
    <!--注意：此处有3重for渲染-->
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane
        v-for="i in tabName"
        :key="'tab_'+i"
        :label="tabLabel[i]"
        :name="i"
      >
        <div v-if="i === 'user'">
          <el-form :ref="formData[i]" :model="formData[i]" label-width="80px">
            <el-form-item v-for="j in optionForm[i]" :key="'form_'+j" :label="optionLabel[j]" :prop="j">
              <el-input v-model="formData[i][j]" placeholder="请输入内容" />
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="submitForm()">保存</el-button>
            </el-form-item>
          </el-form>
        </div>
        <div v-if="i !== 'user'">
          <el-form :ref="formData[i]" :model="formData[i]" label-width="80px">
            <el-form-item v-for="j in optionForm[i]" :key="'form_'+j" :label="optionLabel[j]" :prop="j">
              <el-select
                v-model="formData[i][j]"
                multiple
                filterable
                allow-create
                default-first-option
                style="width: 100%;"
                placeholder="请添加选项"
              >
                <el-option
                  v-for="k in formData[i][j]"
                  :key="'option_'+j+'_'+k"
                  :label="k"
                  :value="k"
                />
              </el-select>

            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="submitForm()">保存</el-button>
            </el-form-item>
          </el-form>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import { getOptions } from '@/api/user'
import { editOptions } from '@/api/user'

export default {
  data() {
    return {
      tabName: [ // i-1
        'user',
        'anime',
        'link',
        'sublink',
        'other'
      ],
      tabLabel: { // i-2
        'user': '用户',
        'anime': '动漫',
        'link': '链接',
        'sublink': '子链',
        'other': '其他'
      },
      activeName: 'user', // i-3
      optionForm: { // j-1
        'user': [
          'avatar',
          'introduction',
          'github_name',
          'weibo_name',
          'twitter_name',
          'facebook_name'
        ],
        'anime': [
          'type_name',
          'tags',
          'actor',
          'staff',
          'region'
        ],
        'link': [
          'type_name',
          'tags',
          'region'
        ],
        'sublink': [
          'type_name',
          'tags'
        ],
        'other': [
          'no_name'
        ]
      },
      optionLabel: { // j-2 可补充
        'type_name': '类型选项',
        'tags': '标签选项',
        'actor': 'Actor选项',
        'staff': 'Staff选项',
        'region': '地区选项',
        'no_name': '无名',
        'avatar': '头像',
        'introduction': '介绍',
        'github_name': 'GitHub',
        'weibo_name': '微博',
        'twitter_name': 'Twitter',
        'facebook_name': 'Facebook'
      },
      oldFormData: {},
      needUpdateOld: {
        user: true,
        anime: true,
        link: true,
        sublink: true,
        other: true
      },
      formData: { // i-j-k
        user: {
          no_name: []
        },
        anime: {
          type_name: [],
          tags: [],
          actor: [],
          staff: [],
          region: []
        },
        link: {
          type_name: [],
          tags: [],
          region: []
        },
        sublink: {
          type_name: [],
          tags: []
        },
        other: {
          no_name: []
        }
      }
    }
  }, mounted() {
    this.handleClick({ name: 'user' })
  },
  methods: {
    submitForm() {
      const name = this.activeName
      const options = this.formData[this.activeName]
      editOptions(name, options).then(() => {
        this.$message('修改成功!')
      })
      this.needUpdateOld[name] = true
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
    handleClick(event) {
      // 注意name规范化，user特殊
      const name = event.name
      if (name === 'other') return // 占位
      if (this.needUpdateOld[name]) {
        getOptions(name).then((res) => {
          if (res.data) {
            this.formData[name] = res.data
            this.oldFormData[name] = Object.assign({}, res.data)
            this.needUpdateOld[name] = false
          }
        })
      } else {
        this.formData[name] = Object.assign({}, this.oldFormData[name])
      }
    }
  }
}
</script>

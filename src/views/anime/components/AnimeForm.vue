<template>
  <el-form
    ref="animeForm"
    :model="animeForm"
    label-width="50px"
    style="width: 100%"
  >
    <el-form-item label="名称">
      <el-input v-model="animeForm.name" />
      <el-button v-if="resetButtonShow" @click="resetValue('name')">重置</el-button>
    </el-form-item>

    <el-form-item label="封面">
      <el-input v-model="animeForm.cover" />
      <el-button v-if="resetButtonShow" @click="resetValue('cover')">重置</el-button>
    </el-form-item>

    <el-form-item label="介绍">
      <el-input
        v-model="animeForm.introduction"
        type="textarea"
        autosize
        placeholder="请输入介绍"
      />
      <el-button v-if="resetButtonShow" @click="resetValue('introduction')">重置</el-button>
    </el-form-item>

    <el-form-item label="类型">
      <el-select
        v-model="animeForm.type_name"
        placeholder="请选择类型"
        style="width: 100%"
      >
        <el-option
          v-for="item in options.type_name"
          :key="item"
          :label="item"
          :value="item"
        />
      </el-select>
      <el-button v-if="resetButtonShow" @click="resetValue('type_name')">重置</el-button>
    </el-form-item>

    <el-form-item label="标签">
      <el-select
        v-model="animeForm.tags"
        multiple
        filterable
        allow-create
        default-first-option
        style="width: 100%"
        placeholder="请选择标签"
      >
        <el-option
          v-for="item in options.tags"
          :key="item"
          :label="item"
          :value="item"
        />
      </el-select>
      <el-button v-if="resetButtonShow" @click="resetValue('tags')">重置</el-button>
    </el-form-item>

    <el-form-item label="地区">
      <el-select
        v-model="animeForm.region"
        placeholder="请选择地区"
        style="width: 100%"
      >
        <el-option
          v-for="item in options.region"
          :key="item"
          :label="item"
          :value="item"
        />
      </el-select>
      <el-button v-if="resetButtonShow" @click="resetValue('region')">重置</el-button>
    </el-form-item>

    <el-form-item label="日期">
      <el-date-picker
        v-model="animeForm.publish"
        type="month"
        placeholder="选择发布日期"
        style="width: 100%"
      />
      <el-button v-if="resetButtonShow" @click="resetValue('publish')">重置</el-button>
    </el-form-item>

    <el-form-item label="声优">
      <el-select
        v-model="animeForm.actor"
        filterable
        allow-create
        multiple
        placeholder="请选择"
        style="width: 100%"
      >
        <el-option
          v-for="item in options.actor"
          :key="item"
          :label="item"
          :value="item"
        />
      </el-select>
      <el-button v-if="resetButtonShow" @click="resetValue('actor')">重置</el-button>
    </el-form-item>

    <el-form-item label="STAFF">
      <el-select
        v-model="animeForm.staff"
        filterable
        allow-create
        default-first-option
        multiple
        style="width: 100%"
        placeholder="请选择"
      >
        <el-option
          v-for="item in options.staff"
          :key="item"
          :label="item"
          :value="item"
        />
      </el-select>
      <el-button v-if="resetButtonShow" @click="resetValue('staff')">重置</el-button>
    </el-form-item>

    <el-form-item>
      <el-button
        type="primary"
        @click="onSubmit(animeForm)"
      >提交</el-button>
      <el-button v-if="resetButtonShow" @click="onClose()">取消</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import { getOptions } from '@/api/user'
export default {
  name: 'AnimeForm',
  props: {
    animeForm: {
      type: Object,
      default() {
        return {}
      }
    },
    onSubmit: {
      type: Function,
      default() {}
    },
    resetButtonShow: {
      type: Boolean,
      default: false
    },
    resetValue: {
      type: Function,
      default() {}
    }
  },
  data() {
    return {
      options: {
        actor: [],
        staff: [],
        type_name: [],
        tags: [],
        region: []
      }
    }
  },
  mounted() {
    getOptions('anime').then(res => {
      this.options = res.data
    })
  },
  methods: {
    onClose() {
      this.$router.go(-1)
    }
  }
}
</script>

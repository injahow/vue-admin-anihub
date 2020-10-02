<template>
  <el-form
    ref="linkForm"
    :model="linkForm"
    label-width="50px"
    style="width: 100%"
  >
    <el-form-item label="域名">
      <el-input v-model="linkForm.domain" :disabled="isSublink" placeholder="请输入地址(含http)" />
      <el-button v-if="resetButtonShow && !isSublink" @click="resetValue('domain')">重置</el-button>
    </el-form-item>

    <el-form-item v-if="isSublink" label="路径">
      <el-input v-model="linkForm.link_path" placeholder="请输入路径(不含域名)" />
      <el-button v-if="resetButtonShow" @click="resetValue('link_path')">重置</el-button>
    </el-form-item>

    <el-form-item v-if="!isSublink" label="图标">
      <el-input v-model="linkForm.favicon" placeholder="请输入地址(含http)" />
      <el-button v-if="resetButtonShow" @click="resetValue('favicon')">重置</el-button>
    </el-form-item>

    <el-form-item label="类型">
      <el-select
        v-model="linkForm.type_name"
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
        v-model="linkForm.tags"
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

    <el-form-item v-if="!isSublink" label="地区">
      <el-select
        v-model="linkForm.region"
        placeholder="可留空"
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

    <el-form-item>
      <el-button type="primary" @click="onSubmit(linkForm)">提交</el-button>
      <el-button @click="onClose()">取消</el-button>
    </el-form-item>
  </el-form>
</template>

<script>

export default {
  name: 'LinkForm',
  props: {
    linkForm: {
      type: Object,
      default() { return {} }
    },
    onSubmit: {
      type: Function,
      default() { }
    },
    options: {
      type: Object,
      default() { return {} }
    },
    resetValue:
    {
      type: Function,
      default() { }
    },
    resetButtonShow: {
      type: Boolean,
      default: false
    },
    isSublink: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    onClose() {
      this.$router.go(-1)
    }
  }
}
</script>

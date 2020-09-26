<template>
  <el-form
    ref="linkForm"
    :model="linkForm"
    label-width="50px"
    style="width: 100%"
  >
    <el-form-item label="链接">
      <el-input v-model="linkForm.domain" placeholder="请输入地址(含http)" />
      <el-button v-if="resetButtonShow" @click="resetValue('domain')">重置</el-button>
    </el-form-item>

    <el-form-item v-if="resetButtonShow" label="图标">
      <el-input v-model="linkForm.favicon" placeholder="请输入地址(含http)" />
      <el-button @click="resetValue('favicon')">重置</el-button>
    </el-form-item>

    <el-form-item label="类型">
      <el-select
        v-model="linkForm.type_name"
        placeholder="请选择类型"
        style="width: 100%"
      >
        <el-option
          v-for="item in linkTypeName"
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
          v-for="item in tagsOptions"
          :key="item"
          :label="item"
          :value="item"
        />
      </el-select>
      <el-button v-if="resetButtonShow" @click="resetValue('tags')">重置</el-button>
    </el-form-item>

    <el-form-item label="地区">
      <el-select
        v-model="linkForm.region"
        placeholder="添加路径链接请留空"
        style="width: 100%"
      >
        <el-option
          v-for="item in regionOptions"
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
    linkTypeName: {
      type: Array,
      default() { return [] }
    },
    tagsOptions: {
      type: Array,
      default() { return [] }
    },
    regionOptions: {
      type: Array,
      default() { return [] }
    },
    onSubmit: {
      type: Function,
      default() { }
    },
    resetValue:
    {
      type: Function,
      default() { }
    },
    resetButtonShow: {
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

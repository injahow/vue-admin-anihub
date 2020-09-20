<template>
  <div class="app-container">
    <el-form
      ref="form"
      :model="animeform"
      label-width="50px"
      style="width: 100%"
    >
      <el-form-item label="类型">
        <el-radio-group v-model="from.type">
          <el-radio-button
            label="全部"
            name="type"
          />
          <el-radio-button
            label="正片"
            name="type"
          />
          <el-radio-button
            label="电影"
            name="type"
          />
          <el-radio-button
            label="其他"
            name="type"
          />
        </el-radio-group>
      </el-form-item>

      <el-form-item label="地区">
        <el-radio-group v-model="from.region">
          <el-radio-button
            label="全部"
            name="type"
          />
          <el-radio-button
            label="日本"
            name="type"
          />
          <el-radio-button
            label="中国"
            name="type"
          />
        </el-radio-group>
      </el-form-item>

      <el-form-item label="时间">
        <el-radio-group v-model="from.publish">
          <el-radio-button
            label="全部"
            name="type"
          />
          <el-radio-button
            label="2000"
            name="type"
          />
          <el-radio-button
            label="2001"
            name="type"
          />
        </el-radio-group>
      </el-form-item>

      <el-form-item label="风格">
        <el-checkbox-group v-model="from.tags">
          <el-checkbox-button
            label="全部"
            name="type"
          />
          <el-checkbox-button
            label="青春"
            name="type"
          />
          <el-checkbox-button
            label="悬疑"
            name="type"
          />
        </el-checkbox-group>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      from: {
        type: '',
        region: '',
        tags: [],
        publish: []

      }
    }
  },
  methods: {
    choose(from) {
      console.log(from)
    }
  }
}
</script>


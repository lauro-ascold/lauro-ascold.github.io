<template>
  <client-only>
    <el-drawer
        class="component-element-editor-drawer"
        title="元素编辑"
        v-model="showDrawer"
        :before-close="handleClose">
      <el-form :model="localData" status-icon :rules="elementDataRules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="id" prop="id">
          <el-input v-model="localData.id" @change="hasChange = true"></el-input>
        </el-form-item>
        <el-form-item label="label" prop="label">
          <el-input v-model="localData.label" @change="hasChange = true"></el-input>
        </el-form-item>
        <!--      <el-form-item>-->
        <!--        <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>-->
        <!--        <el-button @click="resetForm('ruleForm')">重置</el-button>-->
        <!--      </el-form-item>-->
      </el-form>
      <template #footer>
        <div style="flex: auto">
          <el-button @click="cancelClick">cancel</el-button>
        </div>
      </template>
    </el-drawer>
  </client-only>
</template>

<script>
export default {
  name: "element-editor-drawer",
  data() {
    return {
      showDrawer: false,
      hasChange: false,
      localData: {
        id: '',
        style: {},
        label: '',
        type: '',
        labelCfg: {}
      },
      elementDataRules: {}
    }
  },
  computed: {
    // elementDataRules() {
    //   return {}
    // }
  },
  methods: {
    handleShowDrawer(itemData = {}) {
      if (itemData?.getModel) {
        const itemModel = itemData.getModel();
        const {id = '', x = 0, y = 0, label = '', type = '', style = {}, labelCfg = {}, ...others} = itemModel;
        this.showDrawer = true;
        this._initDrawerData();
        this.localData = {id, x, y, label, type, style, labelCfg}
        console.log('itemModel', {id, x, y, label, type, ...others}, itemData)
      } else {
        console.warn('handleShowDrawer error', itemData)
      }
    },
    _initDrawerData() {
      this.hasChange = false;
      this.localData = this.$options.data().localData
    },
    handleClose(done = () => {}) {
      // todo update ? emit page update : void
      console.log('hasChange',this.hasChange)
      done()
      this.hasChange && this.$emit('update-item', this.localData)
    },
    cancelClick() {
      this.hasChange = false;
      this.$nextTick(() => {
        this.showDrawer = false;
      })
    }
  }
}
</script>

<style scoped>

</style>

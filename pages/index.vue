<template>
  <div class="page-index">
<!--    <section class="container">-->
<!--      <ul>-->
<!--        <li>-->
<!--          <nuxt-link :to="{name:'welcome'}">WELCOME</nuxt-link>-->
<!--        </li>-->
<!--      </ul>-->
<!--    </section>-->
    <van-button type="primary" @click="handleHref('welcome')">基础用法</van-button>
<!--    <van-sticky>-->
<!--    </van-sticky>-->


  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router';

// 响应式状态
const count = ref(0)
const selectedFiles = ref([]);
const router = useRouter()
const route = useRoute()

// 用来修改状态、触发更新的函数
function handleSelectedFile() {
  console.log('handleSelectedFile',this.$refs.filePicker.files)
}
function increment() {
  count.value++
}
function handleHref(aim = '') {
  console.log({aim});
  router.push({
    name: 'welcome',
    query: {
      id: 123
    }
  })
}

// 生命周期钩子
onMounted(() => {
  console.log(`The initial count is ${count.value}.`)
})
</script>

<style scoped>

</style>

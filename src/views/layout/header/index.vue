<template>
  <a-layout-header class="header">

    <a-menu theme="dark" mode="horizontal" :style="{ lineHeight: '64px' }">
      <a-menu-item>namespace <a-select v-model:value="ns" style="width: 120px" @focus="focus" @change="handleChange">
          <a-select-option value="">全部</a-select-option>
          <a-select-option v-for="ns in nss" :value="ns.metadata.name">{{ ns.metadata.name }}</a-select-option>
        </a-select>
      </a-menu-item>
    </a-menu>
  </a-layout-header>
</template>

<script setup>

import { namespaces } from '@/api/ns';
import { ref } from 'vue';
import router from '@/router/index.js'

let ns = ref("")
let localNs = localStorage.getItem("namespace")

if (localNs !== null || localNs !== undefined) {
  ns = ref(localNs)
}


let nss = ref([])
namespaces().then((res) => {
  res.items.forEach(element => {
    nss.value.push(element)
  });
})

const handleChange = (value) => {
  localStorage.setItem('namespace', value)
  router.go(0)
}

</script>

<style scoped>
.logo {
  float: left;
  width: 120px;
  height: 31px;
  margin: 16px 24px 16px 0;
  background: rgba(255, 255, 255, 0.3);
}
</style>
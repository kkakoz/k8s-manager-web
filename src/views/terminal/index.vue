<template>
    <Xterm :socketURI="xtermUrl" />
</template>


<script setup>
import router from '@/router/index.js'
import { ref } from 'vue';
import Xterm from '../../components/xterm.vue'

let query = router.currentRoute.value.query

let namespace = query.namespace
let name = query.name
let containerName = query.containerName
const xtermUrl = ref(`ws://172.19.173.145:9010/api/pods/${name}/terminal?namespace=${namespace}&container_name=${containerName}`)

</script>
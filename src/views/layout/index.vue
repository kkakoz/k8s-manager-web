<template>
    <a-layout>
        <Header></Header>
    </a-layout>
    <a-layout >
        <a-layout-sider width="200" style="background: #fff">
            <SideBar />
        </a-layout-sider>
        <a-layout style="padding: 20px 24px 24px">
            <a-layout-content :style="{ background: '#fff', padding: '24px', margin: 0, minHeight: '700px' }">
                <router-view/>
            </a-layout-content>
        </a-layout>
    </a-layout>
</template>

<script setup>
import Header from './header/index.vue'
import SideBar from './side_bar/index.vue'
import { namespaces } from '../../api/ns';

namespaces().then((res) => {
    console.log(res)
})

</script>

<template>
    <a-menu v-model:selectedKeys="selectedKeys" style="width: 200px" mode="inline" :open-keys="openKeys"
        @openChange="onOpenChange" @click="click">
        <a-sub-menu key="sub1">
            <template #icon>
                <MailOutlined />
            </template>
            <template #title>工作负载</template>
            <a-menu-item key="/">Pod</a-menu-item>
            <a-menu-item key="/deployment">Deployment</a-menu-item>
        </a-sub-menu>
        <a-sub-menu key="sub2">
            <template #icon></template>
            <template #title>
                <AppstoreOutlined />
                负载均衡
            </template>
            <a-menu-item key="/service">Service</a-menu-item>
            <a-menu-item key="/ingress">Ingress</a-menu-item>
        </a-sub-menu>
        <a-sub-menu key="sub3">
            <template #icon>
                <SettingOutlined />
            </template>
            <template #title>存储和配置</template>
            <a-menu-item key="/configmap">ConfigMap</a-menu-item>
            <a-menu-item key="/secret">Secret</a-menu-item>
            <a-menu-item key="/claim">PersistentVolumnClaim</a-menu-item>
        </a-sub-menu>
                <a-sub-menu key="sub4">
            <template #icon>
                <SettingOutlined />
            </template>
            <template #title>工作流</template>
            <a-menu-item key="/workflow">工作流</a-menu-item>
        </a-sub-menu>
    </a-menu>
</template>
<script setup>
import { defineComponent, reactive, toRefs } from 'vue';
import { MailOutlined, AppstoreOutlined, SettingOutlined } from '@ant-design/icons-vue';
import router from '@/router/index.js'
const state = reactive({
    rootSubmenuKeys: ['sub1', 'sub2', 'sub3', 'sub4'],
    openKeys: ['sub1'],
    selectedKeys: [],
});

const click = (item) => {
    router.push(item.key)
}

const onOpenChange = openKeys => {
    const latestOpenKey = openKeys.find(key => state.openKeys.indexOf(key) === -1);

    if (state.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
        state.openKeys = openKeys;
    } else {
        state.openKeys = latestOpenKey ? [latestOpenKey] : [];
    }
};
toRefs(state)
</script>
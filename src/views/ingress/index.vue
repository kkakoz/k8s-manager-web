<template>
    <a-button type="primary" @click="addDeployment">添加</a-button>&nbsp;
    <a-table :columns="columns" :data-source="list">
        <template #headerCell="{ column }">
            <template v-if="column.key === 'name'">
                <span>
                    Name
                </span>
            </template>
        </template>

        <template #bodyCell="{ column, record }">
            <template v-if="column.key === 'name'">
                {{ record.metadata.name }}
            </template>
            <template v-else-if="column.key === 'namespace'">
                {{ record.metadata.namespace }}
            </template>
            <template v-else-if="column.key === 'clusterips'">
                <span>
                    <a-tag v-for="label in record.spec.clusterIPs" :key="label"
                        :color="label === 'loser' ? 'volcano' : label.length > 5 ? 'geekblue' : 'green'">
                        {{ label.toUpperCase() }}
                    </a-tag>
                </span>
            </template>
            <template v-else-if="column.key === 'port'">
                <span>
                    <a-tag v-for="label in record.spec.ports" :key="label"
                        :color="label === 'loser' ? 'volcano' : label.length > 5 ? 'geekblue' : 'green'">
                        {{ label }}
                    </a-tag>
                </span>

            </template>
            <template v-else-if="column.key === 'labels'">
                <span>
                    <a-tag v-for="label in record.metadata.labels" :key="label"
                        :color="label === 'loser' ? 'volcano' : label.length > 5 ? 'geekblue' : 'green'">
                        {{ label.toUpperCase() }}
                    </a-tag>
                </span>
            </template>
            <template v-else-if="column.key === 'action'">
                <span>
                    <a @click="showModal(record)">yaml</a>|
                    <a>Delete</a>|  
                </span>
            </template>
        </template>
    </a-table>
    <a-modal v-model:visible="visible" width="800px" title="Basic Modal" @ok="handleOk">
        <JsonEditorVue class="editor" v-model="yamlContent" language="zh-CN" />
    </a-modal>
</template>
<script setup>
import { DownOutlined } from '@ant-design/icons-vue';
import { ref } from 'vue';
import { ingresses } from '@/api/ingress.js';
import JsonEditorVue from 'json-editor-vue3';
import router from '@/router/index.js';


var list = ref([])
const visible = ref(false);

const yamlContent = ref({})

const showModal = (item) => {
    yamlContent.value = item
    visible.value = true;
};

const restart = (item) => {
    deploymentRestart({ namespace: item.metadata.namespace, name: item.metadata.name })
}

const handleOk = () => {
    visible.value = false
    console.log(yamlContent)
}

ingresses().then(res => {
    res.items.forEach(element => {
        list.value.push(element)
    });
})

const columns = [{
    name: 'Name',
    dataIndex: 'name',
    key: 'name',
}, {
    title: 'Namespace',
    dataIndex: 'namespace',
    key: 'namespace',
}, {
    title: 'Labels',
    key: 'labels',
    dataIndex: 'labels',
}, {
    title: 'ClusterIPs',
    dataIndex: 'clusterips',
    key: 'clusterips',
}, {
    title: 'Port',
    key: 'port',
    dataIndex: 'port',
}, {
    title: 'Action',
    key: 'action',
}];
</script>

<style>
</style>
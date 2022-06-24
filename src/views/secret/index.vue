<template>
    <div class="top-select"></div>
    <a-button type="primary">查询</a-button>&nbsp;
    <a-button type="primary" @click="addVisible = true">添加</a-button>&nbsp;
    <a-button type="primary">Apply</a-button>&nbsp;
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
            <template v-else-if="column.key === 'action'">
                <span>
                    <a type="primary" @click="showyaml(record.data)">data</a>&nbsp
                    <a-popconfirm title="Are you sure delete this task?" ok-text="Yes" cancel-text="No"
                        @confirm="deletePod(record)"> <a href="#">delete</a></a-popconfirm>&nbsp
                </span>
            </template>
        </template>
    </a-table>
    <a-modal v-model:visible="dataVisible" width="800px" title="Basic Modal" @ok="dataHandleOk">
        <JsonEditorVue class="editor" v-model="yamlContent" language="zh-CN" />
    </a-modal>
</template>
<script setup>
import { DownOutlined } from '@ant-design/icons-vue';
import { ref } from 'vue';
import { secrets, secretAdd } from '@/api/secret.js';
import { pretifyJson } from '@/utils/json.js'
import JsonEditorVue from 'json-editor-vue3'
import { compileScript } from '@vue/compiler-sfc';

var addVisible = ref(false)
// yaml 
var list = ref([])
const dataVisible = ref(false);
const yamlContent = ref("")
const showyaml = (item) => {
    yamlContent.value = item
    dataVisible.value = true;
};
const dataHandleOk = () => {
    dataVisible.value = false
}


// log
const logVisible = ref(false);
const logContent = ref("")

const showlog = (record) => {
    podLog(record.metadata.name, { container_name: "nginx-containers", namespace: record.metadata.namespace }).then(res => {
        console.log(res)
        logVisible.value = true
        logContent.value = res.logs
    })
}
const logHandleOk = () => {
    logVisible.value = false
}


// button
const deletePod = (record) => {
    podDel(record.metadata.name, { namespace: record.metadata.namespace }).then(() => {
        location.reload()
    })
}

// search 
const searchSecret = () => {
    secrets().then(res => {
        list.value = []
        res.items.forEach(element => {
            list.value.push(element)
        });
    })
}

searchSecret()

const columns = [{
    name: 'Name',
    dataIndex: 'name',
    key: 'name',
}, {
    title: 'Namespace',
    dataIndex: 'namespace',
    key: 'namespace',
}, {
    title: 'Type',
    dataIndex: 'type',
    key: 'type',
}, {
    title: 'Data',
    key: 'data',
    dataIndex: 'data',
}, {
    title: 'Action',
    key: 'action',
}];
</script>
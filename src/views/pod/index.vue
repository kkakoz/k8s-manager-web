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
            <template v-else-if="column.key === 'status'">
                {{ record.status.phase }}
            </template>
            <template v-else-if="column.key === 'containers'">
                <span>
                    <a-tag v-for="container in record.spec.containers" :key="container"
                        :color="container.name === 'loser' ? 'volcano' : container.length > 5 ? 'geekblue' : 'green'">
                        {{ container.name }}
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
                    <a type="primary" @click="showyaml(record)">yaml</a>&nbsp
                    <a-popconfirm title="Are you sure delete this task?" ok-text="Yes" cancel-text="No"
                        @confirm="deletePod(record)"> <a href="#">delete</a></a-popconfirm>&nbsp
                    <a type="primary" @click="showlog(record)">logs</a>
                </span>
            </template>
        </template>
    </a-table>
    <a-modal v-model:visible="yamlVisible" width="800px" title="Basic Modal" @ok="handleOk">
        <JsonEditorVue class="editor" v-model="yamlContent" language="zh-CN" />
    </a-modal>
    <a-modal v-model:visible="logVisible" width="800px" title="Basic Modal" @ok="logHandleOk">
        <a-textarea v-model:value="logContent" placeholder="" :auto-size="{ maxRows: 20 }" />
    </a-modal>
    <AddPod :addVisible="addVisible" @close-model="closeModel"/>
</template>
<script setup>
import { DownOutlined } from '@ant-design/icons-vue';
import { ref } from 'vue';
import { pods, podLog, podDel } from '@/api/pod.js';
import { pretifyJson } from '@/utils/json.js'
import JsonEditorVue from 'json-editor-vue3'
import { compileScript } from '@vue/compiler-sfc';
import AddPod from './components/add_pod.vue'

// add model
var addVisible = ref(false)

var closeModel = () => {
    addVisible.value = false
}
// yaml 
var list = ref([])
const yamlVisible = ref(false);
const yamlContent = ref("")
const showyaml = (item) => {
    yamlContent.value = item
    yamlVisible.value = true;
};
const handleOk = () => {
    yamlVisible.value = false
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
const searchPod = () => {
    pods().then(res => {
        list.value = []
        res.items.forEach(element => {
            list.value.push(element)
        });
    })
}

searchPod()

const columns = [{
    name: 'Name',
    dataIndex: 'name',
    key: 'name',
}, {
    title: 'Namespace',
    dataIndex: 'namespace',
    key: 'namespace',
}, {
    title: 'Containers',
    dataIndex: 'containers',
    key: 'containers',
}, {
    title: 'Labels',
    key: 'labels',
    dataIndex: 'labels',
}, {
    title: 'Status',
    key: 'status',
    dataIndex: 'status',
}, {
    title: 'Action',
    key: 'action',
}];
</script>
<template>
    <a-modal v-model:visible="addVisible" width="800px" title="Basic Modal" @ok="addHandleOk" :afterClose="closeFunc">
        <a-form-item label="Pod Name">
            <a-input v-model:value="addPod.name" />
        </a-form-item>
        <a-form-item label="Namespace">
            <a-select ref="select" v-model:value="addPod.namespace" style="width: 120px" @focus="focus"
                @change="handleChange">
                <a-select-option v-for="(namespace, index) in nss" :value="namespace.metadata.name">
                    {{ namespace.metadata.name }}</a-select-option>
            </a-select>
        </a-form-item>

        <a-space v-for="(container, index) in addPod.containers" :key="index" style="display: flex; margin-bottom: 8px"
            align="baseline">
                        <a-form-item label="name" :rules="{
                required: true,
            }">
                <a-input v-model:value="container.name" />
            </a-form-item>

            <a-form-item label="Image" :rules="{
                required: true,
            }">
                <a-input v-model:value="container.image" />
            </a-form-item>
            <a-form-item label="ContainerPort" :rules="{
                
            }">
                <a-input-number controls="false" v-model:value="container.container_port" />
            </a-form-item>
            <a-form-item label="HostPort" :rules="{
                
            }">
                <a-input-number controls="false" v-model:value="container.host_port" />
            </a-form-item>
            <MinusCircleOutlined @click="removeSight(sight)" />
        </a-space>

        <a-form-item>
            <a-button type="dashed" block @click="addContainer">
                <PlusOutlined />
                Add Container
            </a-button>
        </a-form-item>
    </a-modal>
</template>

<script setup>
import { defineProps, ref, defineEmits } from 'vue';
import { namespaces } from '@/api/ns';
import { podAdd } from '@/api/pod';
import router from '@/router/index.js'

let nss = ref([])
namespaces().then((res) => {
    res.items.forEach(element => {
        nss.value.push(element)
    });
})

let emits =defineEmits("close-model")

let props = defineProps({
    addVisible: Boolean
})


const addHandleOk = () => {
    podAdd(addPod.value).then(res => {
        emits("close-model")
        router.go(0)
    })
    
}

var addPod = ref({
    name: "",
    namespace: "",
    containers: []
})

const addContainer = () => {
    addPod.value.containers.push({
        image: "",
        id: Date.now(),
        name: "",
        host_port: 0,
        container_port: 0,
    });
};

const closeFunc = () => {
    emits("close-model")
}

</script>
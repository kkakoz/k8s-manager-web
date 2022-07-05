<template>
    <div style="margin:10px">
        <a-steps :current="cur">
            <a-step>

                <template #title>deployment</template>
                <template #description>
                    <span>This is a description.</span>
                </template>
            </a-step>
            <a-step title="pod" description="This is a description." />
            <!-- <a-step title="Waiting" description="This is a description." />     -->
        </a-steps>
    </div>
    <a-form :model="formState" name="basic" :wrapper-col="{ span: 16 }" autocomplete="off" @finish="onFinish"
        @finishFailed="onFinishFailed">
        <div v-if="cur == 0">
            <a-form-item label="Deployment Name">
                <a-input v-model:value="addDeployment.name" />
            </a-form-item>

            <a-form-item label="Namespace">
                <a-select ref="select" v-model:value="addDeployment.namespace" @focus="focus" @change="handleChange">
                    <a-select-option v-for="(namespace, index) in nss" :value="namespace.metadata.name">
                        {{ namespace.metadata.name }}</a-select-option>
                </a-select>
            </a-form-item>

            <a-form-item label="Replicas" :rules="{
            
            }">
                <a-input-number controls="false" v-model:value="addDeployment.replicas" />
            </a-form-item>


            <a-space v-for=" (container, index) in labels" :key="index" style="display: flex; margin-bottom: 8px"
                align="baseline">
                <a-form-item label="key" :rules="{
                    required: true,
                }">
                    <a-input v-model:value="container.key" />
                </a-form-item>

                <a-form-item label="value" :rules="{
                    required: true,
                }">
                    <a-input v-model:value="container.value" />
                </a-form-item>

            </a-space>

            <a-form-item>
                <a-button type="dashed" block @click="addLabel">
                    <PlusOutlined />
                    Add Label
                </a-button>
            </a-form-item>

            <a-button type="dashed" block @click="cur++">
                <PlusOutlined />
                NEXT
            </a-button>
        </div>
        <div v-else>

            <a-space v-for="(container, index) in addDeployment.containers" :key="index"
                style="display: flex; margin-bottom: 8px" align="baseline">
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
            <a-button type="dashed" block @click="add">
                <PlusOutlined />
                finish
            </a-button>
        </div>
    </a-form>
</template>

<script setup>
import { defineProps, ref, defineEmits } from 'vue';
import { namespaces } from '@/api/ns';
import { podAdd } from '@/api/pod';
import router from '@/router/index.js'
import { deploymentAdd } from '@/api/deployment.js'

let cur = ref(0)

let nss = ref([])
namespaces().then((res) => {
    res.items.forEach(element => {
        nss.value.push(element)
    });
})

let emits = defineEmits("close-model")

let props = defineProps({
    addVisible: Boolean
})



var addDeployment = ref({
    name: "",
    namespace: "",
    labels: {},
    replicas: 0,
    containers: []
})

let labels = ref([])

const addContainer = () => {
    addDeployment.value.containers.push({
        image: "",
        id: Date.now(),
        name: "",
        host_port: 0,
        container_port: 0,
    });
};

const add = () => {
    console.log(addDeployment.value.labels)

    labels.value.forEach(element => {
        addDeployment.value.labels[element.key] = element.value
    });
    deploymentAdd(addDeployment.value).then(()=> {
        router.push("")
    
    })
}

const addLabel = () => {
    labels.value.push({
        key: "",
        value: "",
    })
}

const closeFunc = () => {
    emits("close-model")
}

</script>
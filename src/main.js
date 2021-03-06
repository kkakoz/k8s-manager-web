import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index.js'
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';
import JsonEditorVue from 'json-editor-vue3'
import "jsoneditor";
import store from '@/store/index.js'


createApp(App).use(store).use(JsonEditorVue).use(Antd).use(router).mount('#app')

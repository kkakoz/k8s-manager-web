import { createStore } from "vuex";



const store = createStore({
    state () {
        return {
            namespace: ""
        }
    },
    mutations: {
        changeNamespace(state, newNamespace) {
            state.namespace = newNamespace
        }
    }
})

export default store
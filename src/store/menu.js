import axios from 'axios'

export default {
    namespaced: true, 
    state: () => ({
        items: []
    }),
    mutations: {
        updateState(state, payload){
            state.items = payload
        },
    },
    actions: {
        async selectMenu({commit}){
            await axios.get('/vue/menu/selectMenu').then((res)=>{
                commit('updateState', res.data)
            })
        },
        async insertMenu({commit}, data){
            await axios.post('/vue/menu/insertMenu', data).then((res)=>{
                commit('updateState', res.data)
            })
        },
        async deleteMenu({commit}, data){
            await axios.post('/vue/menu/deleteMenu', data).then((res)=>{
                commit('updateState', res.data)
            })
        },
        /*
        async updateMenu({commit}, data){
            await axios.post('/vue/menu/updateMenu', data).then((res)=>{
                commit('updateState', res.data)
            })
        },
        */
    },
    getters: {
    }
};
import { set, toggle } from '@/utils/vuex'
import list from './list'


export default {
    namespaced: true,
    state: {
        list: list.state(),
    },
    mutations: {
        ...list.mutations,
    },
    getters: {
        ...list.getters,
    },
    actions: {
        ...list.actions,
    }
}

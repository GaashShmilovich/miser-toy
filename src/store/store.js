import { createStore } from 'vuex'
import { toyStore } from './toy.store'

export const store = createStore({
    strict: true,
    modules: {
        toyStore
    },
})

export default store
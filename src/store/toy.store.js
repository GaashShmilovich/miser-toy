import { toyService } from '../services/toy.service.js'

export const toyStore = {
    state: {
        toys: null,
        toysCount: null,
        currToy: null,
        sortBy: {
            by: '',
            desc: false,
        },
    },
    getters: {
        toy({ currToy }) {
            return currToy
        },
        donePct({ toys }) {
            if (!toys || !toys.length) return 0
            const dones = toys.reduce(
                (acc, toy) => (toy.isDone ? acc + 1 : acc),
                0
            )
            const total = toys.length

            return ((dones / total) * 100).toFixed(2)
        },
        toysToDisplay(state) {
            const { toys, sortBy } = state
            if (!toys) return null

            // const { status, txt, pageIdx, pageSize, labels } = filterBy
            let filteredToys = [...toys]

            const { by, desc } = sortBy
            if (by === "name") {
                filteredToys.sort((a, b) => (desc ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name)))

            } else if (by === "price") {
                filteredToys.sort((a, b) => (desc ? a.price.localeCompare(b.price) : b.price.localeCompare(a.price)))
            } else if (by === "createdAt") {
                filteredToys.sort((a, b) => (desc ? a.createdAt - b.createdAt : b.createdAt - a.createdAt))
            }
            if (labels.length > 0) {
                filteredToys = filteredToys.filter((toy) => {
                    const toyLabelsArray = [...toy.labels]
                    return toyLabelsArray.some((label) => labels.includes(label))
                })
            }

            // const startIdx = pageIdx * pageSize
            // return filteredToys.slice(startIdx, startIdx + pageSize)


            // const startIdx = pageIdx * pageSize
            // filteredToys = filteredToys.slice(startIdx, startIdx + pageSize)

            return filteredToys
        },
    },
    mutations: {
        setToys(state, { toys }) {
            state.toys = toys
        },
        setCurrToy(state, { toy }) {
            state.currToy = toy
        },
        addToy(state, { toy }) {
            state.toys.unshift(toy)
        },
        updateToy(state, { toy }) {
            const idx = state.toys.findIndex((t) => t._id === toy._id)
            state.toys.splice(idx, 1, toy)
        },
        removeToy(state, { toyId }) {
            const idx = state.toys.findIndex((toy) => toy._id === toyId)
            state.toys.splice(idx, 1)
        },
        setSortBy(state, sortBy) {
            state.sortBy = sortBy
        },
        setSortBy(state, sortBy) {
            state.sortBy = sortBy
        },
    },
    actions: {
        loadToys(context, { filterBy }) {
            toyService
                .query(filterBy)
                .then((toys) => {
                    context.commit({ type: 'setToys', toys })
                })
                .catch((err) => {
                    throw err
                })
        },
        saveToy({ commit, dispatch }, { toy }) {
            const actionType = toy._id ? 'updateToy' : 'addToy'
            console.log('type', actionType)
            return toyService.save(toy).then((savedToy) => {
                commit({ type: actionType, toy: savedToy })
                let txt = actionType === 'addToy' ? 'Added a toy' : 'Updated toy'
                txt += `: ${savedToy.txt}`
                return savedToy
            })
        },
        removeToy({ commit, dispatch, state }, payload) {
            console.log('🚀 ~ file: toy.store.js:101 ~ payload:', payload)
            return toyService.remove(payload.toyId).then(() => {
                const toyTxt = state.toys.find(
                    (toy) => toy._id === payload.toyId
                ).txt
                commit(payload) // {type: 'removeToy', toyId}
                // const activity = { txt: `Removed the toy ${toyTxt}`, at: Date.now() }
            })
        },
        getById({ commit }, { toyId }) {
            return toyService.getById(toyId).then((toy) => {
                commit({ type: 'setCurrToy', toy })
                return toy
            })
        },
    },
    // loadToys({ commit }, { filterBy }) {
    //     toyService
    //         .query(filterBy)
    //         .then(toys => commit({ type: 'setToys', toys }))
    //         .catch(err => {
    //             throw err
    //         })
    // },
}

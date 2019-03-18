const state = {
    groupParams: '',
}

const getters = {
    groupParams: state => state.groupParams,
}

const mutations = {
    groupParamsChange(state, params) {
        state.groupParams = params
    },
}

export default {
    state,
    getters,
    mutations
}

const state = {
    roleParams: '',
    userParams: '',
    menuObjParams: '',
}

const getters = {
    roleParams: state => state.roleParams,
    userParams: state => state.userParams,
    menuObjParams: state => state.menuObjParams,
}

const mutations = {
    roleParamsChange(state, params) {
        state.roleParams = params
    },
    userParamsChange(state, params) {
        state.userParams = params
    },
    menuObjParamsChange(state, params) {
        state.menuObjParams = params
    },
}

export default {
    state,
    getters,
    mutations
}

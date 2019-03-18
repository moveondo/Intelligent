import api from '../../api/tagmanage';

const state = {}

const getters = {}

const mutations = {}

const actions = {


    async AC_PdfDownTaskGetPdfDownResult ({dispatch, commit}, params) {
	    return api.PdfDownTaskGetPdfDownResult(params)
	      .then(res => {
	        return res
	      })
	      .catch(err => {
	      })
	      .finally(() => {
	      })
	  },
}



export default {
    state,
    getters,
    actions,
    mutations
}
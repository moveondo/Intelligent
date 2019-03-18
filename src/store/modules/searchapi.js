import api from '../../api/searchapi';

const state = {}

const getters = {}

const mutations = {}

const actions = {


	  async AC_PdfPathProducerSearchDoc ({dispatch, commit}, params) {
	    return api.PdfPathProducerSearchDoc(params)
	      .then(res => {
	        return res
	      })
	      .catch(err => {
	      })
	      .finally(() => {
	      })
	  },

	  async AC_PdfPathProducerGetDocByPage ({dispatch, commit}, params) {
	    return api.PdfPathProducerGetDocByPage(params)
	      .then(res => {
	        return res
	      })
	      .catch(err => {
	      })
	      .finally(() => {
	      })
	  },

	  async AC_PdfPathProducerGetCatalogBy ({dispatch, commit}, params) {
	    return api.PdfPathProducerGetCatalogBy(params)
	      .then(res => {
	        return res
	      })
	      .catch(err => {
	      })
	      .finally(() => {
	      })
	  },

	  async AC_PdfPathProducerGetOutline ({dispatch, commit}, params) {
	    return api.PdfPathProducerGetOutline(params)
	      .then(res => {
	        return res
	      })
	      .catch(err => {
	      })
	      .finally(() => {
	      })
	  },

	  async AC_RemoteDicRemoteDic ({dispatch, commit}, params) {
	    return api.RemoteDicRemoteDic(params)
	      .then(res => {
	        return res
	      })
	      .catch(err => {
	      })
	      .finally(() => {
	      })
	  },

	  async AC_JobServiceCheckHealth ({dispatch, commit}, params) {
	    return api.JobServiceCheckHealth(params)
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

import api from '../../api/analyzetask';

const state = {}

const getters = {}

const mutations = {}

const actions = {


	  async AC_AsyncTaskServiceDeleteAsyncTask ({dispatch, commit}, params) {
	    return api.AsyncTaskServiceDeleteAsyncTask(params)
	      .then(res => {
	        return res
	      })
	      .catch(err => {
	      })
	      .finally(() => {
	      })
	  },

	  async AC_AsyncTaskServiceGetAsyncTask ({dispatch, commit}, params) {
	    return api.AsyncTaskServiceGetAsyncTask(params)
	      .then(res => {
	        return res
	      })
	      .catch(err => {
	      })
	      .finally(() => {
	      })
	  },

	  async AC_AsyncTaskServiceAddAsyncTask ({dispatch, commit}, params) {
	    return api.AsyncTaskServiceAddAsyncTask(params)
	      .then(res => {
	        return res
	      })
	      .catch(err => {
	      })
	      .finally(() => {
	      })
	  },

	  async AC_AsyncTaskServiceUpdateAsyncTask ({dispatch, commit}, params) {
	    return api.AsyncTaskServiceUpdateAsyncTask(params)
	      .then(res => {
	        return res
	      })
	      .catch(err => {
	      })
	      .finally(() => {
	      })
	  },

	  async AC_AsyncTaskServiceUpdateManyAsyncTask ({dispatch, commit}, params) {
	    return api.AsyncTaskServiceUpdateManyAsyncTask(params)
	      .then(res => {
	        return res
	      })
	      .catch(err => {
	      })
	      .finally(() => {
	      })
	  },

	  async AC_AsyncTaskServiceGetManyAsyncTask ({dispatch, commit}, params) {
	    return api.AsyncTaskServiceGetManyAsyncTask(params)
	      .then(res => {
	        return res
	      })
	      .catch(err => {
	      })
	      .finally(() => {
	      })
	  },

	  async AC_AsyncTaskServiceQueryAsyncTask ({dispatch, commit}, params) {
	    return api.AsyncTaskServiceQueryAsyncTask(params)
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

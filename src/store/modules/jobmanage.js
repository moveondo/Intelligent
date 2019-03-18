import api from '../../api/jobmanage';

const state = {}

const getters = {}

const mutations = {}

const actions = {


	  async AC_JobManageServiceBuildJob ({dispatch, commit}, params) {
	    return api.JobManageServiceBuildJob(params)
	      .then(res => {
	        return res
	      })
	      .catch(err => {
	      })
	      .finally(() => {
	      })
	  },

	  async AC_JobManageServiceKillProcess ({dispatch, commit}, params) {
	    return api.JobManageServiceKillProcess(params)
	      .then(res => {
	        return res
	      })
	      .catch(err => {
	      })
	      .finally(() => {
	      })
	  },

	  async AC_JobManageServiceStartJob ({dispatch, commit}, params) {
	    return api.JobManageServiceStartJob(params)
	      .then(res => {
	        return res
	      })
	      .catch(err => {
	      })
	      .finally(() => {
	      })
	  },

	  async AC_NodeAgentServiceOperation1 ({dispatch, commit}, params) {
	    return api.NodeAgentServiceOperation1(params)
	      .then(res => {
	        return res
	      })
	      .catch(err => {
	      })
	      .finally(() => {
	      })
	  },

	  async AC_AppManageServiceBuildApp ({dispatch, commit}, params) {
	    return api.AppManageServiceBuildApp(params)
	      .then(res => {
	        return res
	      })
	      .catch(err => {
	      })
	      .finally(() => {
	      })
	  },

	  async AC_AppManageServiceRollApp ({dispatch, commit}, params) {
	    return api.AppManageServiceRollApp(params)
	      .then(res => {
	        return res
	      })
	      .catch(err => {
	      })
	      .finally(() => {
	      })
	  },

	  async AC_TaskServiceDeleteTask ({dispatch, commit}, params) {
	    return api.TaskServiceDeleteTask(params)
	      .then(res => {
	        return res
	      })
	      .catch(err => {
	      })
	      .finally(() => {
	      })
	  },

	  async AC_TaskServiceGetTask ({dispatch, commit}, params) {
	    return api.TaskServiceGetTask(params)
	      .then(res => {
	        return res
	      })
	      .catch(err => {
	      })
	      .finally(() => {
	      })
	  },

	  async AC_TaskServiceAddTask ({dispatch, commit}, params) {
	    return api.TaskServiceAddTask(params)
	      .then(res => {
	        return res
	      })
	      .catch(err => {
	      })
	      .finally(() => {
	      })
	  },

	  async AC_TaskServiceUpdateTask ({dispatch, commit}, params) {
	    return api.TaskServiceUpdateTask(params)
	      .then(res => {
	        return res
	      })
	      .catch(err => {
	      })
	      .finally(() => {
	      })
	  },

	  async AC_TaskServiceUpdateManyTask ({dispatch, commit}, params) {
	    return api.TaskServiceUpdateManyTask(params)
	      .then(res => {
	        return res
	      })
	      .catch(err => {
	      })
	      .finally(() => {
	      })
	  },

	  async AC_TaskServiceGetManyTask ({dispatch, commit}, params) {
	    return api.TaskServiceGetManyTask(params)
	      .then(res => {
	        return res
	      })
	      .catch(err => {
	      })
	      .finally(() => {
	      })
	  },

	  async AC_TaskServiceQueryTask ({dispatch, commit}, params) {
	    return api.TaskServiceQueryTask(params)
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

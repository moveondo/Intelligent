import api from '../../api/opauth';

const state = {}

const getters = {}

const mutations = {}

const actions = {


	  async AC_RoleMenuServiceDeleteRoleMenu ({dispatch, commit}, params) {
	    return api.RoleMenuServiceDeleteRoleMenu(params)
	      .then(res => {
	        return res
	      })
	      .catch(err => {
	      })
	      .finally(() => {
	      })
	  },

	  async AC_RoleMenuServiceGetRoleMenu ({dispatch, commit}, params) {
	    return api.RoleMenuServiceGetRoleMenu(params)
	      .then(res => {
	        return res
	      })
	      .catch(err => {
	      })
	      .finally(() => {
	      })
	  },

	  async AC_RoleMenuServiceAddRoleMenu ({dispatch, commit}, params) {
	    return api.RoleMenuServiceAddRoleMenu(params)
	      .then(res => {
	        return res
	      })
	      .catch(err => {
	      })
	      .finally(() => {
	      })
	  },

	  async AC_RoleMenuServiceUpdateRoleMenu ({dispatch, commit}, params) {
	    return api.RoleMenuServiceUpdateRoleMenu(params)
	      .then(res => {
	        return res
	      })
	      .catch(err => {
	      })
	      .finally(() => {
	      })
	  },

	  async AC_RoleMenuServiceUpdateManyRoleMenu ({dispatch, commit}, params) {
	    return api.RoleMenuServiceUpdateManyRoleMenu(params)
	      .then(res => {
	        return res
	      })
	      .catch(err => {
	      })
	      .finally(() => {
	      })
	  },

	  async AC_RoleMenuServiceGetManyRoleMenu ({dispatch, commit}, params) {
	    return api.RoleMenuServiceGetManyRoleMenu(params)
	      .then(res => {
	        return res
	      })
	      .catch(err => {
	      })
	      .finally(() => {
	      })
	  },

	  async AC_RoleMenuServiceQueryRoleMenu ({dispatch, commit}, params) {
	    return api.RoleMenuServiceQueryRoleMenu(params)
	      .then(res => {
	        return res
	      })
	      .catch(err => {
	      })
	      .finally(() => {
	      })
	  },

	  async AC_UserForgetPasswordServiceEmailTOCode ({dispatch, commit}, params) {
	    return api.UserForgetPasswordServiceEmailTOCode(params)
	      .then(res => {
	        return res
	      })
	      .catch(err => {
	      })
	      .finally(() => {
	      })
	  },

	  async AC_UserForgetPasswordServiceFindPassword ({dispatch, commit}, params) {
	    return api.UserForgetPasswordServiceFindPassword(params)
	      .then(res => {
	        return res
	      })
	      .catch(err => {
	      })
	      .finally(() => {
	      })
	  },

	  async AC_LoginServiceLogin ({dispatch, commit}, params) {
	    return api.LoginServiceLogin(params)
	      .then(res => {
	        return res
	      })
	      .catch(err => {
	      })
	      .finally(() => {
	      })
	  },

	  async AC_LoginServiceGetUserMenus ({dispatch, commit}, params) {
	    return api.LoginServiceGetUserMenus(params)
	      .then(res => {
	        return res
	      })
	      .catch(err => {
	      })
	      .finally(() => {
	      })
	  },

	  async AC_LoginServiceCreateUser ({dispatch, commit}, params) {
	    return api.LoginServiceCreateUser(params)
	      .then(res => {
	        return res
	      })
	      .catch(err => {
	      })
	      .finally(() => {
	      })
	  },

	  async AC_LoginServiceGetUserPermissions ({dispatch, commit}, params) {
	    return api.LoginServiceGetUserPermissions(params)
	      .then(res => {
	        return res
	      })
	      .catch(err => {
	      })
	      .finally(() => {
	      })
	  },

	  async AC_LoginServiceUpdatePassword ({dispatch, commit}, params) {
	    return api.LoginServiceUpdatePassword(params)
	      .then(res => {
	        return res
	      })
	      .catch(err => {
	      })
	      .finally(() => {
	      })
	  },

	  async AC_LoginServiceCheckToken ({dispatch, commit}, params) {
	    return api.LoginServiceCheckToken(params)
	      .then(res => {
	        return res
	      })
	      .catch(err => {
	      })
	      .finally(() => {
	      })
	  },

	  async AC_LoginServiceGetCompanyInfo ({dispatch, commit}, params) {
	    return api.LoginServiceGetCompanyInfo(params)
	      .then(res => {
	        return res
	      })
	      .catch(err => {
	      })
	      .finally(() => {
	      })
	  },

	  async AC_CompanyGroupServiceDeleteCompanyGroup ({dispatch, commit}, params) {
	    return api.CompanyGroupServiceDeleteCompanyGroup(params)
	      .then(res => {
	        return res
	      })
	      .catch(err => {
	      })
	      .finally(() => {
	      })
	  },

	  async AC_CompanyGroupServiceGetCompanyGroup ({dispatch, commit}, params) {
	    return api.CompanyGroupServiceGetCompanyGroup(params)
	      .then(res => {
	        return res
	      })
	      .catch(err => {
	      })
	      .finally(() => {
	      })
	  },

	  async AC_CompanyGroupServiceAddCompanyGroup ({dispatch, commit}, params) {
	    return api.CompanyGroupServiceAddCompanyGroup(params)
	      .then(res => {
	        return res
	      })
	      .catch(err => {
	      })
	      .finally(() => {
	      })
	  },

	  async AC_CompanyGroupServiceUpdateCompanyGroup ({dispatch, commit}, params) {
	    return api.CompanyGroupServiceUpdateCompanyGroup(params)
	      .then(res => {
	        return res
	      })
	      .catch(err => {
	      })
	      .finally(() => {
	      })
	  },

	  async AC_CompanyGroupServiceUpdateManyCompanyGroup ({dispatch, commit}, params) {
	    return api.CompanyGroupServiceUpdateManyCompanyGroup(params)
	      .then(res => {
	        return res
	      })
	      .catch(err => {
	      })
	      .finally(() => {
	      })
	  },

	  async AC_CompanyGroupServiceGetManyCompanyGroup ({dispatch, commit}, params) {
	    return api.CompanyGroupServiceGetManyCompanyGroup(params)
	      .then(res => {
	        return res
	      })
	      .catch(err => {
	      })
	      .finally(() => {
	      })
	  },

	  async AC_CompanyGroupServiceQueryCompanyGroup ({dispatch, commit}, params) {
	    return api.CompanyGroupServiceQueryCompanyGroup(params)
	      .then(res => {
	        return res
	      })
	      .catch(err => {
	      })
	      .finally(() => {
	      })
	  },

	  async AC_UserRoleManageServiceRewriteAddUserRole ({dispatch, commit}, params) {
	    return api.UserRoleManageServiceRewriteAddUserRole(params)
	      .then(res => {
	        return res
	      })
	      .catch(err => {
	      })
	      .finally(() => {
	      })
	  },

	  async AC_UserServiceDeleteUser ({dispatch, commit}, params) {
	    return api.UserServiceDeleteUser(params)
	      .then(res => {
	        return res
	      })
	      .catch(err => {
	      })
	      .finally(() => {
	      })
	  },

	  async AC_UserServiceGetUser ({dispatch, commit}, params) {
	    return api.UserServiceGetUser(params)
	      .then(res => {
	        return res
	      })
	      .catch(err => {
	      })
	      .finally(() => {
	      })
	  },

	  async AC_UserServiceAddUser ({dispatch, commit}, params) {
	    return api.UserServiceAddUser(params)
	      .then(res => {
	        return res
	      })
	      .catch(err => {
	      })
	      .finally(() => {
	      })
	  },

	  async AC_UserServiceUpdateUser ({dispatch, commit}, params) {
	    return api.UserServiceUpdateUser(params)
	      .then(res => {
	        return res
	      })
	      .catch(err => {
	      })
	      .finally(() => {
	      })
	  },

	  async AC_UserServiceUpdateManyUser ({dispatch, commit}, params) {
	    return api.UserServiceUpdateManyUser(params)
	      .then(res => {
	        return res
	      })
	      .catch(err => {
	      })
	      .finally(() => {
	      })
	  },

	  async AC_UserServiceGetManyUser ({dispatch, commit}, params) {
	    return api.UserServiceGetManyUser(params)
	      .then(res => {
	        return res
	      })
	      .catch(err => {
	      })
	      .finally(() => {
	      })
	  },

	  async AC_UserServiceQueryUser ({dispatch, commit}, params) {
	    return api.UserServiceQueryUser(params)
	      .then(res => {
	        return res
	      })
	      .catch(err => {
	      })
	      .finally(() => {
	      })
	  },

	  async AC_PositionServiceDeletePosition ({dispatch, commit}, params) {
	    return api.PositionServiceDeletePosition(params)
	      .then(res => {
	        return res
	      })
	      .catch(err => {
	      })
	      .finally(() => {
	      })
	  },

	  async AC_PositionServiceGetPosition ({dispatch, commit}, params) {
	    return api.PositionServiceGetPosition(params)
	      .then(res => {
	        return res
	      })
	      .catch(err => {
	      })
	      .finally(() => {
	      })
	  },

	  async AC_PositionServiceAddPosition ({dispatch, commit}, params) {
	    return api.PositionServiceAddPosition(params)
	      .then(res => {
	        return res
	      })
	      .catch(err => {
	      })
	      .finally(() => {
	      })
	  },

	  async AC_PositionServiceUpdatePosition ({dispatch, commit}, params) {
	    return api.PositionServiceUpdatePosition(params)
	      .then(res => {
	        return res
	      })
	      .catch(err => {
	      })
	      .finally(() => {
	      })
	  },

	  async AC_PositionServiceUpdateManyPosition ({dispatch, commit}, params) {
	    return api.PositionServiceUpdateManyPosition(params)
	      .then(res => {
	        return res
	      })
	      .catch(err => {
	      })
	      .finally(() => {
	      })
	  },

	  async AC_PositionServiceGetManyPosition ({dispatch, commit}, params) {
	    return api.PositionServiceGetManyPosition(params)
	      .then(res => {
	        return res
	      })
	      .catch(err => {
	      })
	      .finally(() => {
	      })
	  },

	  async AC_PositionServiceQueryPosition ({dispatch, commit}, params) {
	    return api.PositionServiceQueryPosition(params)
	      .then(res => {
	        return res
	      })
	      .catch(err => {
	      })
	      .finally(() => {
	      })
	  },

	  async AC_CompanyServiceDeleteCompany ({dispatch, commit}, params) {
	    return api.CompanyServiceDeleteCompany(params)
	      .then(res => {
	        return res
	      })
	      .catch(err => {
	      })
	      .finally(() => {
	      })
	  },

	  async AC_CompanyServiceGetCompany ({dispatch, commit}, params) {
	    return api.CompanyServiceGetCompany(params)
	      .then(res => {
	        return res
	      })
	      .catch(err => {
	      })
	      .finally(() => {
	      })
	  },

	  async AC_CompanyServiceAddCompany ({dispatch, commit}, params) {
	    return api.CompanyServiceAddCompany(params)
	      .then(res => {
	        return res
	      })
	      .catch(err => {
	      })
	      .finally(() => {
	      })
	  },

	  async AC_CompanyServiceUpdateCompany ({dispatch, commit}, params) {
	    return api.CompanyServiceUpdateCompany(params)
	      .then(res => {
	        return res
	      })
	      .catch(err => {
	      })
	      .finally(() => {
	      })
	  },

	  async AC_CompanyServiceUpdateManyCompany ({dispatch, commit}, params) {
	    return api.CompanyServiceUpdateManyCompany(params)
	      .then(res => {
	        return res
	      })
	      .catch(err => {
	      })
	      .finally(() => {
	      })
	  },

	  async AC_CompanyServiceGetManyCompany ({dispatch, commit}, params) {
	    return api.CompanyServiceGetManyCompany(params)
	      .then(res => {
	        return res
	      })
	      .catch(err => {
	      })
	      .finally(() => {
	      })
	  },

	  async AC_CompanyServiceQueryCompany ({dispatch, commit}, params) {
	    return api.CompanyServiceQueryCompany(params)
	      .then(res => {
	        return res
	      })
	      .catch(err => {
	      })
	      .finally(() => {
	      })
	  },

	  async AC_UserPermissionServiceDeleteUserPermission ({dispatch, commit}, params) {
	    return api.UserPermissionServiceDeleteUserPermission(params)
	      .then(res => {
	        return res
	      })
	      .catch(err => {
	      })
	      .finally(() => {
	      })
	  },

	  async AC_UserPermissionServiceGetUserPermission ({dispatch, commit}, params) {
	    return api.UserPermissionServiceGetUserPermission(params)
	      .then(res => {
	        return res
	      })
	      .catch(err => {
	      })
	      .finally(() => {
	      })
	  },

	  async AC_UserPermissionServiceAddUserPermission ({dispatch, commit}, params) {
	    return api.UserPermissionServiceAddUserPermission(params)
	      .then(res => {
	        return res
	      })
	      .catch(err => {
	      })
	      .finally(() => {
	      })
	  },

	  async AC_UserPermissionServiceUpdateUserPermission ({dispatch, commit}, params) {
	    return api.UserPermissionServiceUpdateUserPermission(params)
	      .then(res => {
	        return res
	      })
	      .catch(err => {
	      })
	      .finally(() => {
	      })
	  },

	  async AC_UserPermissionServiceUpdateManyUserPermission ({dispatch, commit}, params) {
	    return api.UserPermissionServiceUpdateManyUserPermission(params)
	      .then(res => {
	        return res
	      })
	      .catch(err => {
	      })
	      .finally(() => {
	      })
	  },

	  async AC_UserPermissionServiceGetManyUserPermission ({dispatch, commit}, params) {
	    return api.UserPermissionServiceGetManyUserPermission(params)
	      .then(res => {
	        return res
	      })
	      .catch(err => {
	      })
	      .finally(() => {
	      })
	  },

	  async AC_UserPermissionServiceQueryUserPermission ({dispatch, commit}, params) {
	    return api.UserPermissionServiceQueryUserPermission(params)
	      .then(res => {
	        return res
	      })
	      .catch(err => {
	      })
	      .finally(() => {
	      })
	  },

	  async AC_GroupManageServiceDeleteRewrite ({dispatch, commit}, params) {
	    return api.GroupManageServiceDeleteRewrite(params)
	      .then(res => {
	        return res
	      })
	      .catch(err => {
	      })
	      .finally(() => {
	      })
	  },

	  async AC_GroupRoleServiceDeleteGroupRole ({dispatch, commit}, params) {
	    return api.GroupRoleServiceDeleteGroupRole(params)
	      .then(res => {
	        return res
	      })
	      .catch(err => {
	      })
	      .finally(() => {
	      })
	  },

	  async AC_GroupRoleServiceGetGroupRole ({dispatch, commit}, params) {
	    return api.GroupRoleServiceGetGroupRole(params)
	      .then(res => {
	        return res
	      })
	      .catch(err => {
	      })
	      .finally(() => {
	      })
	  },

	  async AC_GroupRoleServiceAddGroupRole ({dispatch, commit}, params) {
	    return api.GroupRoleServiceAddGroupRole(params)
	      .then(res => {
	        return res
	      })
	      .catch(err => {
	      })
	      .finally(() => {
	      })
	  },

	  async AC_GroupRoleServiceUpdateGroupRole ({dispatch, commit}, params) {
	    return api.GroupRoleServiceUpdateGroupRole(params)
	      .then(res => {
	        return res
	      })
	      .catch(err => {
	      })
	      .finally(() => {
	      })
	  },

	  async AC_GroupRoleServiceUpdateManyGroupRole ({dispatch, commit}, params) {
	    return api.GroupRoleServiceUpdateManyGroupRole(params)
	      .then(res => {
	        return res
	      })
	      .catch(err => {
	      })
	      .finally(() => {
	      })
	  },

	  async AC_GroupRoleServiceGetManyGroupRole ({dispatch, commit}, params) {
	    return api.GroupRoleServiceGetManyGroupRole(params)
	      .then(res => {
	        return res
	      })
	      .catch(err => {
	      })
	      .finally(() => {
	      })
	  },

	  async AC_GroupRoleServiceQueryGroupRole ({dispatch, commit}, params) {
	    return api.GroupRoleServiceQueryGroupRole(params)
	      .then(res => {
	        return res
	      })
	      .catch(err => {
	      })
	      .finally(() => {
	      })
	  },

	  async AC_RolePermissionServiceDeleteRolePermission ({dispatch, commit}, params) {
	    return api.RolePermissionServiceDeleteRolePermission(params)
	      .then(res => {
	        return res
	      })
	      .catch(err => {
	      })
	      .finally(() => {
	      })
	  },

	  async AC_RolePermissionServiceGetRolePermission ({dispatch, commit}, params) {
	    return api.RolePermissionServiceGetRolePermission(params)
	      .then(res => {
	        return res
	      })
	      .catch(err => {
	      })
	      .finally(() => {
	      })
	  },

	  async AC_RolePermissionServiceAddRolePermission ({dispatch, commit}, params) {
	    return api.RolePermissionServiceAddRolePermission(params)
	      .then(res => {
	        return res
	      })
	      .catch(err => {
	      })
	      .finally(() => {
	      })
	  },

	  async AC_RolePermissionServiceUpdateRolePermission ({dispatch, commit}, params) {
	    return api.RolePermissionServiceUpdateRolePermission(params)
	      .then(res => {
	        return res
	      })
	      .catch(err => {
	      })
	      .finally(() => {
	      })
	  },

	  async AC_RolePermissionServiceUpdateManyRolePermission ({dispatch, commit}, params) {
	    return api.RolePermissionServiceUpdateManyRolePermission(params)
	      .then(res => {
	        return res
	      })
	      .catch(err => {
	      })
	      .finally(() => {
	      })
	  },

	  async AC_RolePermissionServiceGetManyRolePermission ({dispatch, commit}, params) {
	    return api.RolePermissionServiceGetManyRolePermission(params)
	      .then(res => {
	        return res
	      })
	      .catch(err => {
	      })
	      .finally(() => {
	      })
	  },

	  async AC_RolePermissionServiceQueryRolePermission ({dispatch, commit}, params) {
	    return api.RolePermissionServiceQueryRolePermission(params)
	      .then(res => {
	        return res
	      })
	      .catch(err => {
	      })
	      .finally(() => {
	      })
	  },

	  async AC_UserGroupManageServiceGetGroup ({dispatch, commit}, params) {
	    return api.UserGroupManageServiceGetGroup(params)
	      .then(res => {
	        return res
	      })
	      .catch(err => {
	      })
	      .finally(() => {
	      })
	  },

	  async AC_UserGroupManageServiceRewriteAddUserGroup ({dispatch, commit}, params) {
	    return api.UserGroupManageServiceRewriteAddUserGroup(params)
	      .then(res => {
	        return res
	      })
	      .catch(err => {
	      })
	      .finally(() => {
	      })
	  },

	  async AC_UserOnlineServiceInviteUser ({dispatch, commit}, params) {
	    return api.UserOnlineServiceInviteUser(params)
	      .then(res => {
	        return res
	      })
	      .catch(err => {
	      })
	      .finally(() => {
	      })
	  },

	  async AC_UserOnlineServiceChangePassword ({dispatch, commit}, params) {
	    return api.UserOnlineServiceChangePassword(params)
	      .then(res => {
	        return res
	      })
	      .catch(err => {
	      })
	      .finally(() => {
	      })
	  },

	  async AC_UserOnlineServiceUserRegister ({dispatch, commit}, params) {
	    return api.UserOnlineServiceUserRegister(params)
	      .then(res => {
	        return res
	      })
	      .catch(err => {
	      })
	      .finally(() => {
	      })
	  },

	  async AC_RoleServiceDeleteRole ({dispatch, commit}, params) {
	    return api.RoleServiceDeleteRole(params)
	      .then(res => {
	        return res
	      })
	      .catch(err => {
	      })
	      .finally(() => {
	      })
	  },

	  async AC_RoleServiceGetRole ({dispatch, commit}, params) {
	    return api.RoleServiceGetRole(params)
	      .then(res => {
	        return res
	      })
	      .catch(err => {
	      })
	      .finally(() => {
	      })
	  },

	  async AC_RoleServiceAddRole ({dispatch, commit}, params) {
	    return api.RoleServiceAddRole(params)
	      .then(res => {
	        return res
	      })
	      .catch(err => {
	      })
	      .finally(() => {
	      })
	  },

	  async AC_RoleServiceUpdateRole ({dispatch, commit}, params) {
	    return api.RoleServiceUpdateRole(params)
	      .then(res => {
	        return res
	      })
	      .catch(err => {
	      })
	      .finally(() => {
	      })
	  },

	  async AC_RoleServiceUpdateManyRole ({dispatch, commit}, params) {
	    return api.RoleServiceUpdateManyRole(params)
	      .then(res => {
	        return res
	      })
	      .catch(err => {
	      })
	      .finally(() => {
	      })
	  },

	  async AC_RoleServiceGetManyRole ({dispatch, commit}, params) {
	    return api.RoleServiceGetManyRole(params)
	      .then(res => {
	        return res
	      })
	      .catch(err => {
	      })
	      .finally(() => {
	      })
	  },

	  async AC_RoleServiceQueryRole ({dispatch, commit}, params) {
	    return api.RoleServiceQueryRole(params)
	      .then(res => {
	        return res
	      })
	      .catch(err => {
	      })
	      .finally(() => {
	      })
	  },

	  async AC_UserGroupServiceDeleteUserGroup ({dispatch, commit}, params) {
	    return api.UserGroupServiceDeleteUserGroup(params)
	      .then(res => {
	        return res
	      })
	      .catch(err => {
	      })
	      .finally(() => {
	      })
	  },

	  async AC_UserGroupServiceGetUserGroup ({dispatch, commit}, params) {
	    return api.UserGroupServiceGetUserGroup(params)
	      .then(res => {
	        return res
	      })
	      .catch(err => {
	      })
	      .finally(() => {
	      })
	  },

	  async AC_UserGroupServiceAddUserGroup ({dispatch, commit}, params) {
	    return api.UserGroupServiceAddUserGroup(params)
	      .then(res => {
	        return res
	      })
	      .catch(err => {
	      })
	      .finally(() => {
	      })
	  },

	  async AC_UserGroupServiceUpdateUserGroup ({dispatch, commit}, params) {
	    return api.UserGroupServiceUpdateUserGroup(params)
	      .then(res => {
	        return res
	      })
	      .catch(err => {
	      })
	      .finally(() => {
	      })
	  },

	  async AC_UserGroupServiceUpdateManyUserGroup ({dispatch, commit}, params) {
	    return api.UserGroupServiceUpdateManyUserGroup(params)
	      .then(res => {
	        return res
	      })
	      .catch(err => {
	      })
	      .finally(() => {
	      })
	  },

	  async AC_UserGroupServiceGetManyUserGroup ({dispatch, commit}, params) {
	    return api.UserGroupServiceGetManyUserGroup(params)
	      .then(res => {
	        return res
	      })
	      .catch(err => {
	      })
	      .finally(() => {
	      })
	  },

	  async AC_UserGroupServiceQueryUserGroup ({dispatch, commit}, params) {
	    return api.UserGroupServiceQueryUserGroup(params)
	      .then(res => {
	        return res
	      })
	      .catch(err => {
	      })
	      .finally(() => {
	      })
	  },

	  async AC_UserManageServiceRewriteQueryUser ({dispatch, commit}, params) {
	    return api.UserManageServiceRewriteQueryUser(params)
	      .then(res => {
	        return res
	      })
	      .catch(err => {
	      })
	      .finally(() => {
	      })
	  },

	  async AC_UserManageServiceCheckAuth ({dispatch, commit}, params) {
	    return api.UserManageServiceCheckAuth(params)
	      .then(res => {
	        return res
	      })
	      .catch(err => {
	      })
	      .finally(() => {
	      })
	  },

	  async AC_UserManageServiceQueryUserInfo ({dispatch, commit}, params) {
	    return api.UserManageServiceQueryUserInfo(params)
	      .then(res => {
	        return res
	      })
	      .catch(err => {
	      })
	      .finally(() => {
	      })
	  },

	  async AC_MenuObjServiceDeleteMenuObj ({dispatch, commit}, params) {
	    return api.MenuObjServiceDeleteMenuObj(params)
	      .then(res => {
	        return res
	      })
	      .catch(err => {
	      })
	      .finally(() => {
	      })
	  },

	  async AC_MenuObjServiceGetMenuObj ({dispatch, commit}, params) {
	    return api.MenuObjServiceGetMenuObj(params)
	      .then(res => {
	        return res
	      })
	      .catch(err => {
	      })
	      .finally(() => {
	      })
	  },

	  async AC_MenuObjServiceAddMenuObj ({dispatch, commit}, params) {
	    return api.MenuObjServiceAddMenuObj(params)
	      .then(res => {
	        return res
	      })
	      .catch(err => {
	      })
	      .finally(() => {
	      })
	  },

	  async AC_MenuObjServiceUpdateMenuObj ({dispatch, commit}, params) {
	    return api.MenuObjServiceUpdateMenuObj(params)
	      .then(res => {
	        return res
	      })
	      .catch(err => {
	      })
	      .finally(() => {
	      })
	  },

	  async AC_MenuObjServiceUpdateManyMenuObj ({dispatch, commit}, params) {
	    return api.MenuObjServiceUpdateManyMenuObj(params)
	      .then(res => {
	        return res
	      })
	      .catch(err => {
	      })
	      .finally(() => {
	      })
	  },

	  async AC_MenuObjServiceGetManyMenuObj ({dispatch, commit}, params) {
	    return api.MenuObjServiceGetManyMenuObj(params)
	      .then(res => {
	        return res
	      })
	      .catch(err => {
	      })
	      .finally(() => {
	      })
	  },

	  async AC_MenuObjServiceQueryMenuObj ({dispatch, commit}, params) {
	    return api.MenuObjServiceQueryMenuObj(params)
	      .then(res => {
	        return res
	      })
	      .catch(err => {
	      })
	      .finally(() => {
	      })
	  },

	  async AC_DepartmentServiceDeleteDepartment ({dispatch, commit}, params) {
	    return api.DepartmentServiceDeleteDepartment(params)
	      .then(res => {
	        return res
	      })
	      .catch(err => {
	      })
	      .finally(() => {
	      })
	  },

	  async AC_DepartmentServiceGetDepartment ({dispatch, commit}, params) {
	    return api.DepartmentServiceGetDepartment(params)
	      .then(res => {
	        return res
	      })
	      .catch(err => {
	      })
	      .finally(() => {
	      })
	  },

	  async AC_DepartmentServiceAddDepartment ({dispatch, commit}, params) {
	    return api.DepartmentServiceAddDepartment(params)
	      .then(res => {
	        return res
	      })
	      .catch(err => {
	      })
	      .finally(() => {
	      })
	  },

	  async AC_DepartmentServiceUpdateDepartment ({dispatch, commit}, params) {
	    return api.DepartmentServiceUpdateDepartment(params)
	      .then(res => {
	        return res
	      })
	      .catch(err => {
	      })
	      .finally(() => {
	      })
	  },

	  async AC_DepartmentServiceUpdateManyDepartment ({dispatch, commit}, params) {
	    return api.DepartmentServiceUpdateManyDepartment(params)
	      .then(res => {
	        return res
	      })
	      .catch(err => {
	      })
	      .finally(() => {
	      })
	  },

	  async AC_DepartmentServiceGetManyDepartment ({dispatch, commit}, params) {
	    return api.DepartmentServiceGetManyDepartment(params)
	      .then(res => {
	        return res
	      })
	      .catch(err => {
	      })
	      .finally(() => {
	      })
	  },

	  async AC_DepartmentServiceQueryDepartment ({dispatch, commit}, params) {
	    return api.DepartmentServiceQueryDepartment(params)
	      .then(res => {
	        return res
	      })
	      .catch(err => {
	      })
	      .finally(() => {
	      })
	  },

	  async AC_PermServiceDeletePerm ({dispatch, commit}, params) {
	    return api.PermServiceDeletePerm(params)
	      .then(res => {
	        return res
	      })
	      .catch(err => {
	      })
	      .finally(() => {
	      })
	  },

	  async AC_PermServiceGetPerm ({dispatch, commit}, params) {
	    return api.PermServiceGetPerm(params)
	      .then(res => {
	        return res
	      })
	      .catch(err => {
	      })
	      .finally(() => {
	      })
	  },

	  async AC_PermServiceAddPerm ({dispatch, commit}, params) {
	    return api.PermServiceAddPerm(params)
	      .then(res => {
	        return res
	      })
	      .catch(err => {
	      })
	      .finally(() => {
	      })
	  },

	  async AC_PermServiceUpdatePerm ({dispatch, commit}, params) {
	    return api.PermServiceUpdatePerm(params)
	      .then(res => {
	        return res
	      })
	      .catch(err => {
	      })
	      .finally(() => {
	      })
	  },

	  async AC_PermServiceUpdateManyPerm ({dispatch, commit}, params) {
	    return api.PermServiceUpdateManyPerm(params)
	      .then(res => {
	        return res
	      })
	      .catch(err => {
	      })
	      .finally(() => {
	      })
	  },

	  async AC_PermServiceGetManyPerm ({dispatch, commit}, params) {
	    return api.PermServiceGetManyPerm(params)
	      .then(res => {
	        return res
	      })
	      .catch(err => {
	      })
	      .finally(() => {
	      })
	  },

	  async AC_PermServiceQueryPerm ({dispatch, commit}, params) {
	    return api.PermServiceQueryPerm(params)
	      .then(res => {
	        return res
	      })
	      .catch(err => {
	      })
	      .finally(() => {
	      })
	  },

	  async AC_UserRoleServiceDeleteUserRole ({dispatch, commit}, params) {
	    return api.UserRoleServiceDeleteUserRole(params)
	      .then(res => {
	        return res
	      })
	      .catch(err => {
	      })
	      .finally(() => {
	      })
	  },

	  async AC_UserRoleServiceGetUserRole ({dispatch, commit}, params) {
	    return api.UserRoleServiceGetUserRole(params)
	      .then(res => {
	        return res
	      })
	      .catch(err => {
	      })
	      .finally(() => {
	      })
	  },

	  async AC_UserRoleServiceAddUserRole ({dispatch, commit}, params) {
	    return api.UserRoleServiceAddUserRole(params)
	      .then(res => {
	        return res
	      })
	      .catch(err => {
	      })
	      .finally(() => {
	      })
	  },

	  async AC_UserRoleServiceUpdateUserRole ({dispatch, commit}, params) {
	    return api.UserRoleServiceUpdateUserRole(params)
	      .then(res => {
	        return res
	      })
	      .catch(err => {
	      })
	      .finally(() => {
	      })
	  },

	  async AC_UserRoleServiceUpdateManyUserRole ({dispatch, commit}, params) {
	    return api.UserRoleServiceUpdateManyUserRole(params)
	      .then(res => {
	        return res
	      })
	      .catch(err => {
	      })
	      .finally(() => {
	      })
	  },

	  async AC_UserRoleServiceGetManyUserRole ({dispatch, commit}, params) {
	    return api.UserRoleServiceGetManyUserRole(params)
	      .then(res => {
	        return res
	      })
	      .catch(err => {
	      })
	      .finally(() => {
	      })
	  },

	  async AC_UserRoleServiceQueryUserRole ({dispatch, commit}, params) {
	    return api.UserRoleServiceQueryUserRole(params)
	      .then(res => {
	        return res
	      })
	      .catch(err => {
	      })
	      .finally(() => {
	      })
	  },

	  async AC_GroupServiceDeleteGroup ({dispatch, commit}, params) {
	    return api.GroupServiceDeleteGroup(params)
	      .then(res => {
	        return res
	      })
	      .catch(err => {
	      })
	      .finally(() => {
	      })
	  },

	  async AC_GroupServiceGetGroup ({dispatch, commit}, params) {
	    return api.GroupServiceGetGroup(params)
	      .then(res => {
	        return res
	      })
	      .catch(err => {
	      })
	      .finally(() => {
	      })
	  },

	  async AC_GroupServiceAddGroup ({dispatch, commit}, params) {
	    return api.GroupServiceAddGroup(params)
	      .then(res => {
	        return res
	      })
	      .catch(err => {
	      })
	      .finally(() => {
	      })
	  },

	  async AC_GroupServiceUpdateGroup ({dispatch, commit}, params) {
	    return api.GroupServiceUpdateGroup(params)
	      .then(res => {
	        return res
	      })
	      .catch(err => {
	      })
	      .finally(() => {
	      })
	  },

	  async AC_GroupServiceUpdateManyGroup ({dispatch, commit}, params) {
	    return api.GroupServiceUpdateManyGroup(params)
	      .then(res => {
	        return res
	      })
	      .catch(err => {
	      })
	      .finally(() => {
	      })
	  },

	  async AC_GroupServiceGetManyGroup ({dispatch, commit}, params) {
	    return api.GroupServiceGetManyGroup(params)
	      .then(res => {
	        return res
	      })
	      .catch(err => {
	      })
	      .finally(() => {
	      })
	  },

	  async AC_GroupServiceQueryGroup ({dispatch, commit}, params) {
	    return api.GroupServiceQueryGroup(params)
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

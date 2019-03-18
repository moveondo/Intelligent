import Vue from 'vue';
import axios from 'axios';



export default {



      async RoleMenuServiceDeleteRoleMenu(params={}){
        let res= await axios.post( '/opauth/roleMenuService/deleteRoleMenu',params);
        return res.data;
      }
      ,
  


      async RoleMenuServiceGetRoleMenu(params={}){
        let res= await axios.post( '/opauth/roleMenuService/getRoleMenu',params);
        return res.data;
      }
      ,
  


      async RoleMenuServiceAddRoleMenu(params={}){
        let res= await axios.post( '/opauth/roleMenuService/addRoleMenu',params);
        return res.data;
      }
      ,
  


      async RoleMenuServiceUpdateRoleMenu(params={}){
        let res= await axios.post( '/opauth/roleMenuService/updateRoleMenu',params);
        return res.data;
      }
      ,
  


      async RoleMenuServiceUpdateManyRoleMenu(params={}){
        let res= await axios.post( '/opauth/roleMenuService/updateManyRoleMenu',params);
        return res.data;
      }
      ,
  


      async RoleMenuServiceGetManyRoleMenu(params={}){
        let res= await axios.post( '/opauth/roleMenuService/getManyRoleMenu',params);
        return res.data;
      }
      ,
  


      async RoleMenuServiceQueryRoleMenu(params={}){
        let res= await axios.post( '/opauth/roleMenuService/queryRoleMenu',params);
        return res.data;
      }
      ,
  



      async UserForgetPasswordServiceEmailTOCode(params={}){
        let res= await axios.post( '/opauth/userForgetPasswordService/emailTOCode',params);
        return res.data;
      }
      ,
  


      async UserForgetPasswordServiceFindPassword(params={}){
        let res= await axios.post( '/opauth/userForgetPasswordService/findPassword',params);
        return res.data;
      }
      ,
  



      async LoginServiceLogin(params={}){
        let res= await axios.post( '/opauth/loginService/login',params);
        return res.data;
      }
      ,
  


      async LoginServiceGetUserMenus(params={}){
        let res= await axios.post( '/opauth/loginService/getUserMenus',params);
        return res.data;
      }
      ,
  


      async LoginServiceCreateUser(params={}){
        let res= await axios.post( '/opauth/loginService/createUser',params);
        return res.data;
      }
      ,
  


      async LoginServiceGetUserPermissions(params={}){
        let res= await axios.post( '/opauth/loginService/getUserPermissions',params);
        return res.data;
      }
      ,
  


      async LoginServiceUpdatePassword(params={}){
        let res= await axios.post( '/opauth/loginService/updatePassword',params);
        return res.data;
      }
      ,
  


      async LoginServiceCheckToken(params={}){
        let res= await axios.post( '/opauth/loginService/checkToken',params);
        return res.data;
      }
      ,
  


      async LoginServiceGetCompanyInfo(params={}){
        let res= await axios.post( '/opauth/loginService/getCompanyInfo',params);
        return res.data;
      }
      ,
  



      async CompanyGroupServiceDeleteCompanyGroup(params={}){
        let res= await axios.post( '/opauth/companyGroupService/deleteCompanyGroup',params);
        return res.data;
      }
      ,
  


      async CompanyGroupServiceGetCompanyGroup(params={}){
        let res= await axios.post( '/opauth/companyGroupService/getCompanyGroup',params);
        return res.data;
      }
      ,
  


      async CompanyGroupServiceAddCompanyGroup(params={}){
        let res= await axios.post( '/opauth/companyGroupService/addCompanyGroup',params);
        return res.data;
      }
      ,
  


      async CompanyGroupServiceUpdateCompanyGroup(params={}){
        let res= await axios.post( '/opauth/companyGroupService/updateCompanyGroup',params);
        return res.data;
      }
      ,
  


      async CompanyGroupServiceUpdateManyCompanyGroup(params={}){
        let res= await axios.post( '/opauth/companyGroupService/updateManyCompanyGroup',params);
        return res.data;
      }
      ,
  


      async CompanyGroupServiceGetManyCompanyGroup(params={}){
        let res= await axios.post( '/opauth/companyGroupService/getManyCompanyGroup',params);
        return res.data;
      }
      ,
  


      async CompanyGroupServiceQueryCompanyGroup(params={}){
        let res= await axios.post( '/opauth/companyGroupService/queryCompanyGroup',params);
        return res.data;
      }
      ,
  



      async UserRoleManageServiceRewriteAddUserRole(params={}){
        let res= await axios.post( '/opauth/userRoleManageService/rewriteAddUserRole',params);
        return res.data;
      }
      ,
  



      async UserServiceDeleteUser(params={}){
        let res= await axios.post( '/opauth/userService/deleteUser',params);
        return res.data;
      }
      ,
  


      async UserServiceGetUser(params={}){
        let res= await axios.post( '/opauth/userService/getUser',params);
        return res.data;
      }
      ,
  


      async UserServiceAddUser(params={}){
        let res= await axios.post( '/opauth/userService/addUser',params);
        return res.data;
      }
      ,
  


      async UserServiceUpdateUser(params={}){
        let res= await axios.post( '/opauth/userService/updateUser',params);
        return res.data;
      }
      ,
  


      async UserServiceUpdateManyUser(params={}){
        let res= await axios.post( '/opauth/userService/updateManyUser',params);
        return res.data;
      }
      ,
  


      async UserServiceGetManyUser(params={}){
        let res= await axios.post( '/opauth/userService/getManyUser',params);
        return res.data;
      }
      ,
  


      async UserServiceQueryUser(params={}){
        let res= await axios.post( '/opauth/userService/queryUser',params);
        return res.data;
      }
      ,
  



      async PositionServiceDeletePosition(params={}){
        let res= await axios.post( '/opauth/positionService/deletePosition',params);
        return res.data;
      }
      ,
  


      async PositionServiceGetPosition(params={}){
        let res= await axios.post( '/opauth/positionService/getPosition',params);
        return res.data;
      }
      ,
  


      async PositionServiceAddPosition(params={}){
        let res= await axios.post( '/opauth/positionService/addPosition',params);
        return res.data;
      }
      ,
  


      async PositionServiceUpdatePosition(params={}){
        let res= await axios.post( '/opauth/positionService/updatePosition',params);
        return res.data;
      }
      ,
  


      async PositionServiceUpdateManyPosition(params={}){
        let res= await axios.post( '/opauth/positionService/updateManyPosition',params);
        return res.data;
      }
      ,
  


      async PositionServiceGetManyPosition(params={}){
        let res= await axios.post( '/opauth/positionService/getManyPosition',params);
        return res.data;
      }
      ,
  


      async PositionServiceQueryPosition(params={}){
        let res= await axios.post( '/opauth/positionService/queryPosition',params);
        return res.data;
      }
      ,
  



      async CompanyServiceDeleteCompany(params={}){
        let res= await axios.post( '/opauth/companyService/deleteCompany',params);
        return res.data;
      }
      ,
  


      async CompanyServiceGetCompany(params={}){
        let res= await axios.post( '/opauth/companyService/getCompany',params);
        return res.data;
      }
      ,
  


      async CompanyServiceAddCompany(params={}){
        let res= await axios.post( '/opauth/companyService/addCompany',params);
        return res.data;
      }
      ,
  


      async CompanyServiceUpdateCompany(params={}){
        let res= await axios.post( '/opauth/companyService/updateCompany',params);
        return res.data;
      }
      ,
  


      async CompanyServiceUpdateManyCompany(params={}){
        let res= await axios.post( '/opauth/companyService/updateManyCompany',params);
        return res.data;
      }
      ,
  


      async CompanyServiceGetManyCompany(params={}){
        let res= await axios.post( '/opauth/companyService/getManyCompany',params);
        return res.data;
      }
      ,
  


      async CompanyServiceQueryCompany(params={}){
        let res= await axios.post( '/opauth/companyService/queryCompany',params);
        return res.data;
      }
      ,
  



      async UserPermissionServiceDeleteUserPermission(params={}){
        let res= await axios.post( '/opauth/userPermissionService/deleteUserPermission',params);
        return res.data;
      }
      ,
  


      async UserPermissionServiceGetUserPermission(params={}){
        let res= await axios.post( '/opauth/userPermissionService/getUserPermission',params);
        return res.data;
      }
      ,
  


      async UserPermissionServiceAddUserPermission(params={}){
        let res= await axios.post( '/opauth/userPermissionService/addUserPermission',params);
        return res.data;
      }
      ,
  


      async UserPermissionServiceUpdateUserPermission(params={}){
        let res= await axios.post( '/opauth/userPermissionService/updateUserPermission',params);
        return res.data;
      }
      ,
  


      async UserPermissionServiceUpdateManyUserPermission(params={}){
        let res= await axios.post( '/opauth/userPermissionService/updateManyUserPermission',params);
        return res.data;
      }
      ,
  


      async UserPermissionServiceGetManyUserPermission(params={}){
        let res= await axios.post( '/opauth/userPermissionService/getManyUserPermission',params);
        return res.data;
      }
      ,
  


      async UserPermissionServiceQueryUserPermission(params={}){
        let res= await axios.post( '/opauth/userPermissionService/queryUserPermission',params);
        return res.data;
      }
      ,
  



      async GroupManageServiceDeleteRewrite(params={}){
        let res= await axios.post( '/opauth/groupManageService/deleteRewrite',params);
        return res.data;
      }
      ,
  



      async GroupRoleServiceDeleteGroupRole(params={}){
        let res= await axios.post( '/opauth/groupRoleService/deleteGroupRole',params);
        return res.data;
      }
      ,
  


      async GroupRoleServiceGetGroupRole(params={}){
        let res= await axios.post( '/opauth/groupRoleService/getGroupRole',params);
        return res.data;
      }
      ,
  


      async GroupRoleServiceAddGroupRole(params={}){
        let res= await axios.post( '/opauth/groupRoleService/addGroupRole',params);
        return res.data;
      }
      ,
  


      async GroupRoleServiceUpdateGroupRole(params={}){
        let res= await axios.post( '/opauth/groupRoleService/updateGroupRole',params);
        return res.data;
      }
      ,
  


      async GroupRoleServiceUpdateManyGroupRole(params={}){
        let res= await axios.post( '/opauth/groupRoleService/updateManyGroupRole',params);
        return res.data;
      }
      ,
  


      async GroupRoleServiceGetManyGroupRole(params={}){
        let res= await axios.post( '/opauth/groupRoleService/getManyGroupRole',params);
        return res.data;
      }
      ,
  


      async GroupRoleServiceQueryGroupRole(params={}){
        let res= await axios.post( '/opauth/groupRoleService/queryGroupRole',params);
        return res.data;
      }
      ,
  



      async RolePermissionServiceDeleteRolePermission(params={}){
        let res= await axios.post( '/opauth/rolePermissionService/deleteRolePermission',params);
        return res.data;
      }
      ,
  


      async RolePermissionServiceGetRolePermission(params={}){
        let res= await axios.post( '/opauth/rolePermissionService/getRolePermission',params);
        return res.data;
      }
      ,
  


      async RolePermissionServiceAddRolePermission(params={}){
        let res= await axios.post( '/opauth/rolePermissionService/addRolePermission',params);
        return res.data;
      }
      ,
  


      async RolePermissionServiceUpdateRolePermission(params={}){
        let res= await axios.post( '/opauth/rolePermissionService/updateRolePermission',params);
        return res.data;
      }
      ,
  


      async RolePermissionServiceUpdateManyRolePermission(params={}){
        let res= await axios.post( '/opauth/rolePermissionService/updateManyRolePermission',params);
        return res.data;
      }
      ,
  


      async RolePermissionServiceGetManyRolePermission(params={}){
        let res= await axios.post( '/opauth/rolePermissionService/getManyRolePermission',params);
        return res.data;
      }
      ,
  


      async RolePermissionServiceQueryRolePermission(params={}){
        let res= await axios.post( '/opauth/rolePermissionService/queryRolePermission',params);
        return res.data;
      }
      ,
  



      async UserGroupManageServiceGetGroup(params={}){
        let res= await axios.post( '/opauth/userGroupManageService/getGroup',params);
        return res.data;
      }
      ,
  


      async UserGroupManageServiceRewriteAddUserGroup(params={}){
        let res= await axios.post( '/opauth/userGroupManageService/rewriteAddUserGroup',params);
        return res.data;
      }
      ,
  



      async UserOnlineServiceInviteUser(params={}){
        let res= await axios.post( '/opauth/userOnlineService/inviteUser',params);
        return res.data;
      }
      ,
  


      async UserOnlineServiceChangePassword(params={}){
        let res= await axios.post( '/opauth/userOnlineService/changePassword',params);
        return res.data;
      }
      ,
  


      async UserOnlineServiceUserRegister(params={}){
        let res= await axios.post( '/opauth/userOnlineService/userRegister',params);
        return res.data;
      }
      ,
  



      async RoleServiceDeleteRole(params={}){
        let res= await axios.post( '/opauth/roleService/deleteRole',params);
        return res.data;
      }
      ,
  


      async RoleServiceGetRole(params={}){
        let res= await axios.post( '/opauth/roleService/getRole',params);
        return res.data;
      }
      ,
  


      async RoleServiceAddRole(params={}){
        let res= await axios.post( '/opauth/roleService/addRole',params);
        return res.data;
      }
      ,
  


      async RoleServiceUpdateRole(params={}){
        let res= await axios.post( '/opauth/roleService/updateRole',params);
        return res.data;
      }
      ,
  


      async RoleServiceUpdateManyRole(params={}){
        let res= await axios.post( '/opauth/roleService/updateManyRole',params);
        return res.data;
      }
      ,
  


      async RoleServiceGetManyRole(params={}){
        let res= await axios.post( '/opauth/roleService/getManyRole',params);
        return res.data;
      }
      ,
  


      async RoleServiceQueryRole(params={}){
        let res= await axios.post( '/opauth/roleService/queryRole',params);
        return res.data;
      }
      ,
  



      async UserGroupServiceDeleteUserGroup(params={}){
        let res= await axios.post( '/opauth/userGroupService/deleteUserGroup',params);
        return res.data;
      }
      ,
  


      async UserGroupServiceGetUserGroup(params={}){
        let res= await axios.post( '/opauth/userGroupService/getUserGroup',params);
        return res.data;
      }
      ,
  


      async UserGroupServiceAddUserGroup(params={}){
        let res= await axios.post( '/opauth/userGroupService/addUserGroup',params);
        return res.data;
      }
      ,
  


      async UserGroupServiceUpdateUserGroup(params={}){
        let res= await axios.post( '/opauth/userGroupService/updateUserGroup',params);
        return res.data;
      }
      ,
  


      async UserGroupServiceUpdateManyUserGroup(params={}){
        let res= await axios.post( '/opauth/userGroupService/updateManyUserGroup',params);
        return res.data;
      }
      ,
  


      async UserGroupServiceGetManyUserGroup(params={}){
        let res= await axios.post( '/opauth/userGroupService/getManyUserGroup',params);
        return res.data;
      }
      ,
  


      async UserGroupServiceQueryUserGroup(params={}){
        let res= await axios.post( '/opauth/userGroupService/queryUserGroup',params);
        return res.data;
      }
      ,
  



      async UserManageServiceRewriteQueryUser(params={}){
        let res= await axios.post( '/opauth/userManageService/rewriteQueryUser',params);
        return res.data;
      }
      ,
  


      async UserManageServiceCheckAuth(params={}){
        let res= await axios.post( '/opauth/userManageService/checkAuth',params);
        return res.data;
      }
      ,
  


      async UserManageServiceQueryUserInfo(params={}){
        let res= await axios.post( '/opauth/userManageService/queryUserInfo',params);
        return res.data;
      }
      ,
  



      async MenuObjServiceDeleteMenuObj(params={}){
        let res= await axios.post( '/opauth/menuObjService/deleteMenuObj',params);
        return res.data;
      }
      ,
  


      async MenuObjServiceGetMenuObj(params={}){
        let res= await axios.post( '/opauth/menuObjService/getMenuObj',params);
        return res.data;
      }
      ,
  


      async MenuObjServiceAddMenuObj(params={}){
        let res= await axios.post( '/opauth/menuObjService/addMenuObj',params);
        return res.data;
      }
      ,
  


      async MenuObjServiceUpdateMenuObj(params={}){
        let res= await axios.post( '/opauth/menuObjService/updateMenuObj',params);
        return res.data;
      }
      ,
  


      async MenuObjServiceUpdateManyMenuObj(params={}){
        let res= await axios.post( '/opauth/menuObjService/updateManyMenuObj',params);
        return res.data;
      }
      ,
  


      async MenuObjServiceGetManyMenuObj(params={}){
        let res= await axios.post( '/opauth/menuObjService/getManyMenuObj',params);
        return res.data;
      }
      ,
  


      async MenuObjServiceQueryMenuObj(params={}){
        let res= await axios.post( '/opauth/menuObjService/queryMenuObj',params);
        return res.data;
      }
      ,
  



      async DepartmentServiceDeleteDepartment(params={}){
        let res= await axios.post( '/opauth/departmentService/deleteDepartment',params);
        return res.data;
      }
      ,
  


      async DepartmentServiceGetDepartment(params={}){
        let res= await axios.post( '/opauth/departmentService/getDepartment',params);
        return res.data;
      }
      ,
  


      async DepartmentServiceAddDepartment(params={}){
        let res= await axios.post( '/opauth/departmentService/addDepartment',params);
        return res.data;
      }
      ,
  


      async DepartmentServiceUpdateDepartment(params={}){
        let res= await axios.post( '/opauth/departmentService/updateDepartment',params);
        return res.data;
      }
      ,
  


      async DepartmentServiceUpdateManyDepartment(params={}){
        let res= await axios.post( '/opauth/departmentService/updateManyDepartment',params);
        return res.data;
      }
      ,
  


      async DepartmentServiceGetManyDepartment(params={}){
        let res= await axios.post( '/opauth/departmentService/getManyDepartment',params);
        return res.data;
      }
      ,
  


      async DepartmentServiceQueryDepartment(params={}){
        let res= await axios.post( '/opauth/departmentService/queryDepartment',params);
        return res.data;
      }
      ,
  



      async PermServiceDeletePerm(params={}){
        let res= await axios.post( '/opauth/permService/deletePerm',params);
        return res.data;
      }
      ,
  


      async PermServiceGetPerm(params={}){
        let res= await axios.post( '/opauth/permService/getPerm',params);
        return res.data;
      }
      ,
  


      async PermServiceAddPerm(params={}){
        let res= await axios.post( '/opauth/permService/addPerm',params);
        return res.data;
      }
      ,
  


      async PermServiceUpdatePerm(params={}){
        let res= await axios.post( '/opauth/permService/updatePerm',params);
        return res.data;
      }
      ,
  


      async PermServiceUpdateManyPerm(params={}){
        let res= await axios.post( '/opauth/permService/updateManyPerm',params);
        return res.data;
      }
      ,
  


      async PermServiceGetManyPerm(params={}){
        let res= await axios.post( '/opauth/permService/getManyPerm',params);
        return res.data;
      }
      ,
  


      async PermServiceQueryPerm(params={}){
        let res= await axios.post( '/opauth/permService/queryPerm',params);
        return res.data;
      }
      ,
  



      async UserRoleServiceDeleteUserRole(params={}){
        let res= await axios.post( '/opauth/userRoleService/deleteUserRole',params);
        return res.data;
      }
      ,
  


      async UserRoleServiceGetUserRole(params={}){
        let res= await axios.post( '/opauth/userRoleService/getUserRole',params);
        return res.data;
      }
      ,
  


      async UserRoleServiceAddUserRole(params={}){
        let res= await axios.post( '/opauth/userRoleService/addUserRole',params);
        return res.data;
      }
      ,
  


      async UserRoleServiceUpdateUserRole(params={}){
        let res= await axios.post( '/opauth/userRoleService/updateUserRole',params);
        return res.data;
      }
      ,
  


      async UserRoleServiceUpdateManyUserRole(params={}){
        let res= await axios.post( '/opauth/userRoleService/updateManyUserRole',params);
        return res.data;
      }
      ,
  


      async UserRoleServiceGetManyUserRole(params={}){
        let res= await axios.post( '/opauth/userRoleService/getManyUserRole',params);
        return res.data;
      }
      ,
  


      async UserRoleServiceQueryUserRole(params={}){
        let res= await axios.post( '/opauth/userRoleService/queryUserRole',params);
        return res.data;
      }
      ,
  



      async GroupServiceDeleteGroup(params={}){
        let res= await axios.post( '/opauth/groupService/deleteGroup',params);
        return res.data;
      }
      ,
  


      async GroupServiceGetGroup(params={}){
        let res= await axios.post( '/opauth/groupService/getGroup',params);
        return res.data;
      }
      ,
  


      async GroupServiceAddGroup(params={}){
        let res= await axios.post( '/opauth/groupService/addGroup',params);
        return res.data;
      }
      ,
  


      async GroupServiceUpdateGroup(params={}){
        let res= await axios.post( '/opauth/groupService/updateGroup',params);
        return res.data;
      }
      ,
  


      async GroupServiceUpdateManyGroup(params={}){
        let res= await axios.post( '/opauth/groupService/updateManyGroup',params);
        return res.data;
      }
      ,
  


      async GroupServiceGetManyGroup(params={}){
        let res= await axios.post( '/opauth/groupService/getManyGroup',params);
        return res.data;
      }
      ,
  


      async GroupServiceQueryGroup(params={}){
        let res= await axios.post( '/opauth/groupService/queryGroup',params);
        return res.data;
      }
      ,
  



}

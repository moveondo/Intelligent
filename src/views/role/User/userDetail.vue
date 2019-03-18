<template>
    <div>
        <div class="table-wrap">
            <el-tabs v-model="tabSelect">
                <el-tab-pane :label="$t('dataTable.roleList')" name="1">
                    <dataList 
                    ref="userRoleList"
                    :params="params"
                    :operation="operation"
                    :tableColumn="userRoleTableColumn"
                    queryDataMethod='userRole'
                    ></dataList>
                </el-tab-pane>
                <el-tab-pane :label="$t('dataTable.groupList')" name="2">
                    <dataList 
                    ref="userGroupList"
                    :params="params"
                    :operation="operation"
                    :tableColumn="userGroupTableColumn"
                    queryDataMethod='userGroup'
                    ></dataList>
                </el-tab-pane>
            </el-tabs>

            <el-button class="button" type="primary" @click="appendShow">{{$t('dataTable.create')}}</el-button>
        </div>

        <!-- 创建用户角色 -->
        <el-dialog :title="$t('dataTable.role')" :visible.sync="addUserRoleShow" width="450px" @close="closeAdd">
            <el-form label-width="100px">
                <el-form-item :label="$t('dataTable.role')">
                    <el-select v-model="AddForm.roleId">
                        <el-option
                        v-for="item in roleList"
                        :key="item.id"
                        :label="item.roleName"
                        :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="addUserRole()">{{$t('message.confirm')}}</el-button>
                <el-button @click="addUserRoleShow = false">{{$t('message.cancel')}}</el-button>
            </span>
        </el-dialog>

        <!-- 创建用户小组 -->
        <el-dialog :title="$t('dataTable.group')" :visible.sync="addUserGroupShow" width="450px" @close="closeAdd">
            <el-form ref="form" label-width="100px">
                <el-form-item label="小组">
                    <el-select v-model="AddForm.groupId">
                        <el-option
                        v-for="item in groupList"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="addUserGroup()">{{$t('message.confirm')}}</el-button>
                <el-button @click="addUserGroupShow = false">{{$t('message.cancel')}}</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
import dataList from '../../common/dataTable'

export default {
    components:{
        dataList
    },
    data() {
        return {
            addUserRoleShow: false,
            addUserGroupShow: false,
            AddForm: {},
            params: {},
            roleList: [],
            groupList: [],
            userId: '',
            tabSelect: '1',
            operation: [this.$t('dataTable.delete')],
            userRoleTableColumn: [{ prop: 'roleName',label: this.$t('dataTable.role'),methed: 'role' }],
            userGroupTableColumn: [
                { prop: 'name',label: this.$t('dataTable.group'),methed: 'group' }
            ]
        }
    },
    created() {
        this.userId = this.$route.query.id
        this.params.userId = this.userId
    },
    methods: {
        async queryRole() {
            let params = {
                pageSize:100,
                pageNum: 1
            }

            const result = await this.$store.dispatch('AC_RoleServiceQueryRole', params);
            this.roleList = result.data.roles
        },
        
        async queryGroup() {
             let params = {
                pageSize:100,
                pageNum: 1
            }

            const result = await this.$store.dispatch('AC_GroupServiceQueryGroup', params);
            this.groupList = result.data.groups
        },

        //创建用户角色
        async addUserRole() {
            if(!this.AddForm.roleId) {
                this.$message.error(this.$t('message.empty'))
                return
            }

            this.AddForm.userId = this.userId
            this.$store.commit('loadingChange',{text: this.$t('message.inRequest'),show: true})
            const result = await this.$store.dispatch('AC_UserRoleServiceAddUserRole', this.AddForm)
            this.$store.commit('loadingChange',{show: false})
            result.code == '200' && result.data.userRole ? this.$message.success(this.$t('message.success')) : this.$message.error(this.$t('message.fail'))
            this.closeAdd()
            this.$refs.userRoleList.queryData()
        },

        //创建用户小组
        async addUserGroup() {
            if(!this.AddForm) {
                this.$message.error(this.$t('message.empty'))
                return
            }

            this.AddForm.userId = this.userId
            this.$store.commit('loadingChange',{text: this.$t('message.inRequest'),show: true})
            const result = await this.$store.dispatch('AC_UserGroupServiceAddUserGroup', this.AddForm)
            this.$store.commit('loadingChange',{show: false})
            result.code == '200' && result.data.userGroup ? this.$message.success(this.$t('message.success')) : this.$message.error(this.$t('message.fail'))
            this.closeAdd()
            this.$refs.userGroupList.queryData()
        },

        appendShow() {
            if(this.tabSelect == '1') {
                this.queryRole()
                this.addUserRoleShow = true
            }else {
                this.queryGroup()
                this.addUserGroupShow = true
            }
        },

        closeAdd() {   
            this.AddForm = {}
            this.addUserGroupShow = false
            this.addUserRoleShow = false
        }
    }
}
</script>
<style lang="less" scoped>
.table-wrap{
    padding: 20px;
    display: flex;
    .el-tabs{
        flex: 1;
    }
    .button{
        margin-left: 10px;
        height: 34px;
    }
}
.selectform{
    width: 400px;
    text-align: center;
}
</style>

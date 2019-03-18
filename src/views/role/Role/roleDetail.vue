<template>
    <div>
        <div class="table-wrap">
            <el-tabs v-model="tabSelect">
                <el-tab-pane :label="$t('dataTable.role') + $t('dataTable.edit')" name="1">
                    <div class="selectform">
                        <el-form label-width="100px">
                            <el-form-item :label="$t('dataTable.role')">
                                <el-input v-model="roleDetail.roleName"></el-input>
                            </el-form-item>
                            <el-form-item :label="$t('dataTable.description')">
                                <el-input v-model="roleDetail.description"></el-input>
                            </el-form-item>      
                        </el-form>
                        <span>
                            <el-button type="primary" @click="updateRole()">{{$t('dataTable.save')}}</el-button>
                        </span>
                    </div>
                </el-tab-pane>
                <el-tab-pane :label="$t('dataTable.menuList')"  name="2">
                    <dataList 
                    ref="roleMenuList"
                    :params="params"
                    queryDataMethod='roleMenu'
                    :operation="operation"
                    :tableColumn="roleMenuTableColumn"
                    ></dataList>
                </el-tab-pane>
                <el-tab-pane :label="$t('dataTable.groupList')" name="3">
                    <dataList 
                    ref="roleGroupList"
                    :params="params"
                    queryDataMethod='groupRole'
                    :operation="operation"
                    :tableColumn="roleGroupTableColumn"
                    ></dataList>
                </el-tab-pane>
            </el-tabs>

            <el-button class="button" v-if="tabSelect != 1" type="primary" @click="appendShow">{{$t('dataTable.create')}}</el-button>
        </div>

        <!-- 创建角色的菜单 -->
        <el-dialog :title="$t('dataTable.role') + $t('dataTable.menu')" :visible.sync="roleMenuEditShow" width="450px" @close="closeEdit">
            <el-form label-width="100px">
                <el-form-item :label="$t('dataTable.menu')">
                    <el-select v-model="userMenu">
                        <el-option
                        v-for="item in menuObjList"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="addRoleMenu">{{$t('message.confirm')}}</el-button>
                <el-button @click="roleMenuEditShow = false">{{$t('message.cancel')}}</el-button>
            </span>
        </el-dialog>

         <!-- 创建角色的小组 -->
        <el-dialog :title="$t('dataTable.role') + $t('dataTable.group')" :visible.sync="roleGroupEditShow" width="450px" @close="closeEdit">
            <el-form label-width="100px">
                <el-form-item :label="$t('dataTable.group')">
                    <el-select v-model="userGroup">
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
                <el-button type="primary" @click="addRoleGroup">{{$t('message.confirm')}}</el-button>
                <el-button @click="roleGroupEditShow = false">{{$t('message.cancel')}}</el-button>
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
            roleMenuEditShow: false,
            roleGroupEditShow: false,
            userMenu: '',
            userGroup: '',
            groupList: [],
            menuObjList: [],
            roleDetail: '',
            params: {},
            tabSelect: '1',
            operation: [this.$t('dataTable.delete')],
            roleMenuTableColumn: [
                { prop: 'name',label: this.$t('dataTable.menu'),methed: 'menuObj' }
            ],
            operation: [this.$t('dataTable.delete')],
            roleGroupTableColumn: [
                { prop: 'name',label: this.$t('dataTable.group'),methed: 'group' }
            ]
        }
    },
    created() {
        this.params.roleId = this.$route.query.id
        this.getRole()
    },
    methods: {
        async queryMenuObj() {
            let params = {
                pageSize:100,
                pageNum: 1
            }

            const result = await this.$store.dispatch('AC_MenuObjServiceQueryMenuObj', params);
            this.menuObjList = result.data.menuObjs
        },

        async queryGroup() {
            let params = {
                pageSize:100,
                pageNum: 1
            }

            const result = await this.$store.dispatch('AC_GroupServiceQueryGroup', params);
            this.groupList = result.data.groups
        },

        async getRole(){
            let params = {id: this.$route.query.id}
            const result = await this.$store.dispatch('AC_RoleServiceGetRole', params);
            this.roleDetail = result.data.role
        },

        async updateRole(){
            if(!this.roleDetail.roleName || !this.roleDetail.description) {
                this.$message.error(this.$t('message.empty'))
                return
            }

            this.$store.commit('loadingChange',{text: this.$t('message.inRequest'),show: true})
            const result = await this.$store.dispatch('AC_RoleServiceUpdateRole', this.roleDetail);
            result.code == 200 ? this.$message.success(this.$t('message.success')) : this.$message.error(this.$t('message.fail'))
            this.$store.commit('loadingChange',{show: false})
        },

        async addRoleMenu() {
            if(!this.userMenu) {
                this.$message.error(this.$t('message.empty'))
                return
            }

            let params = {
                roleId: this.roleDetail.id,
                menuObjId: this.userMenu
            }

            this.$store.commit('loadingChange',{text: this.$t('message.inRequest'),show: true})
            const result = await this.$store.dispatch('AC_RoleMenuServiceAddRoleMenu', params);
            result.code == 200 ? this.$message.success(this.$t('message.success')) : this.$message.error(this.$t('message.fail'))
            this.$store.commit('loadingChange',{show: false})
            this.$refs.roleMenuList.queryData()
            this.closeEdit()
        },

        async addRoleGroup(){
            if(!this.userGroup) {
                this.$message.error(this.$t('message.empty'))
                return
            }

            let params = {
                roleId: this.roleDetail.id,
                groupId: this.userGroup
            }
            this.$store.commit('loadingChange',{text: this.$t('message.inRequest'),show: true})
            const result = await this.$store.dispatch('AC_GroupRoleServiceAddGroupRole', params);
            result.code == 200 ? this.$message.success(this.$t('message.success')) : this.$message.error(this.$t('message.fail'))
            this.$store.commit('loadingChange',{show: false})
            this.$refs.roleGroupList.queryData()
            this.closeEdit()
        },

        appendShow() {
            if(this.tabSelect == '2') {
                this.queryMenuObj()
                this.roleMenuEditShow = true
            }
            if (this.tabSelect == '3') {
                this.queryGroup()
                this.roleGroupEditShow = true
            }
        },

        closeEdit() {
            this.userMenu = ''
            this.userGroup = ''
            this.roleMenuEditShow = false
            this.roleGroupEditShow = false
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
    padding-top: 30px;
    text-align: center;
}
</style>

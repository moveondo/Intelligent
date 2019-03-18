<template>
    <div class="list-wrap">
        <div class="list-header">
            <div class="title">{{$t('dataTable.userList')}}</div>
            <el-button type="primary" @click="appendShow">{{$t('dataTable.create')}}</el-button>
        </div>

        <!-- 用户表 -->
        <dataList 
        class="container"
        ref="userList"
        queryDataMethod='user'
        :operation="operation"
        :tableColumn="tableColumn"
        @selectOperation="selectOperation"
        ></dataList>

        <!-- 创建用户 -->
        <el-dialog :title="$t('dataTable.user')" :visible.sync="addUserShow" width="450px" @close="closeAdd">
            <el-form ref="form" :model="AddForm" label-width="100px">
                <el-form-item :label="$t('login.email')">
                    <el-input
                    type="textarea"
                    :rows="4"
                    :placeholder="$t('placeholder.moreEmail')"
                    v-model="AddForm.emails">
                    </el-input>
                </el-form-item>
                <el-form-item :label="$t('dataTable.group')">
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
                <el-button type="primary" @click="addUser()">{{$t('message.confirm')}}</el-button>
                <el-button @click="addUserShow = false">{{$t('message.cancel')}}</el-button>
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
                addUserShow: false,
                AddForm: {},
                groupList: [],
                operation: [this.$t('dataTable.edit'),this.$t('dataTable.delete')],
                tableColumn: [
                    {prop: 'name',label: this.$t('dataTable.user')},
                    {prop: 'userName',label: this.$t('dataTable.userName')},
                    {prop: 'phone',label: this.$t('dataTable.phone')}
                ]
            }
        },
        methods: {
            //创建用户
            async addUser() {
                if(!this.AddForm.emails || !this.AddForm.groupId) {
                    this.$message.error(this.$t('message.empty'))
                    return
                }
                this.$store.commit('loadingChange',{text: this.$t('message.inRequest'),show: true})
                const result = await this.$store.dispatch('AC_UserOnlineServiceInviteUser', this.AddForm)
                this.$store.commit('loadingChange',{show: false})
                
                if(result.code == '200') {
                    this.$message.success(this.$t('message.success')) 
                }else if(result.code == '500' && result.msg == 'Invalid Addresses') {
                    this.$message.error(this.$t('login.fail') + this.$t('message.fail'))
                }else {
                    this.$message.error(this.$t('message.fail'))
                }

                this.closeAdd()
                this.$refs.userList.queryData()
            },

            async queryGroup() {
                let params = {
                    pageNum: 1,
                    pageSize: 50
                }
                const result = await this.$store.dispatch('AC_GroupServiceQueryGroup', params);
                this.groupList = result.data.groups;
            },

            selectOperation(data) {
                this.$router.push({path: 'userDetail', query: {id: data.data.id }})
            },

            appendShow() {
                this.queryGroup()
                this.addUserShow = true
            },

            closeAdd() {
                this.AddForm = {}
                this.addUserShow = false
            }
        }
    }

</script>
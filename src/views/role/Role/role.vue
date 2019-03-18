<template>
    <div class="list-wrap">
        <div class="list-header">
            <div class="title">{{$t('dataTable.roleList')}}</div>
            <el-button type="primary" @click="editShow = true">{{$t('dataTable.create')}}</el-button>
        </div>
        <div class="container">
            <dataList 
            ref="roleList"
            queryDataMethod='role'
            :operation="operation"
            :tableColumn="tableColumn"
            @selectOperation="selectOperation"
            ></dataList>
        </div>

        <!-- 创建角色 -->
        <el-dialog :title="$t('dataTable.role')" :visible.sync="editShow" width="450px" @close="closeEdit">
            <el-form :model="form" ref="form" label-width="100px">
                <el-form-item :label="$t('dataTable.role')">
                    <el-input v-model="form.roleName"></el-input>
                </el-form-item>
                <el-form-item :label="$t('dataTable.role') + $t('dataTable.description')">
                    <el-input v-model="form.description"></el-input>
                </el-form-item>      
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="addRole()">{{$t('message.confirm')}}</el-button>
                <el-button @click="editShow = false">{{$t('message.cancel')}}</el-button>
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
                editShow: false,
                form:{},
                operation: [this.$t('dataTable.edit'),this.$t('dataTable.delete')],
                tableColumn: [
                    { prop: 'roleName',label: this.$t('dataTable.role')},
                    { prop: 'description',label: this.$t('dataTable.description')}
                ]
            }
        },
        methods: {
            async addRole(){
                if(!this.form.roleName || !this.form.description) {
                    this.$message.error(this.$t('message.empty'))
                    return
                }

                this.$store.commit('loadingChange',{text: this.$t('message.inRequest'),show: true})
                const result = await this.$store.dispatch('AC_RoleServiceAddRole', this.form);
                result.code == 200 ? this.$message.success(this.$t('message.success')) : this.$message.error(this.$t('message.fail'))
                this.$store.commit('loadingChange',{show: false})
                this.$refs.roleList.queryData()
                this.closeEdit()
            },

            selectOperation(data) {
                this.$router.push({path: 'roleDetail', query: {id: data.data.id }})
            },

            closeEdit() {
                this.form = {}
                this.editShow = false
            }
        }
    }

</script>
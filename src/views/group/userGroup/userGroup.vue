<template>
    <div class="list-wrap">
        <div class="list-header">
            <div class="title">{{$t('dataTable.groupList')}}</div>
            <el-button type="primary" @click="editShow = true">{{$t('dataTable.create')}}</el-button>
        </div>

        <dataList 
        class="container"
        ref="groupList"
        queryDataMethod='group'
        :operation="operation"
        :tableColumn="tableColumn"
        @selectOperation="selectOperation"
        ></dataList>

        <el-dialog :title="$t('dataTable.group')" :visible.sync="editShow" width="450px" @close="close">
            <el-form ref="form" :model="form" label-width="100px">
                <el-form-item :label="$t('dataTable.group')">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item :label="$t('dataTable.description')">
                    <el-input v-model="form.description"></el-input>
                </el-form-item>      
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="addForm()">{{$t('message.confirm')}}</el-button>
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
                editShow:false,
                form:{},
                tableColumn:[
                    {
                        prop: 'name',
                        label: this.$t('dataTable.group')
                    },
                    {
                        prop: 'description',
                        label: this.$t('dataTable.description')
                    }
                ],
                operation: [this.$t('dataTable.edit')]
            }
        },
        methods: {
            close() {
                this.form = {}
                this.editShow = false
            },

            selectOperation(data) {
                this.form = data.data
                this.editShow = true
            },

            async addForm(){
                if(!this.form.name || !this.form.description) {
                    this.$message.error(this.$t('message.empty'))
                    return
                }
                if(this.form.id) {
                    this.updateForm()
                    return
                }

                this.$store.commit('loadingChange',{text: this.$t('message.inRequest'),show: true})
                const result = await this.$store.dispatch('AC_GroupServiceAddGroup', this.form);
                result.code == 200 ? this.$message.success(this.$t('message.success')) : this.$message.error(this.$t('message.fail'))
                this.$store.commit('loadingChange',{show: false})
                this.$refs.groupList.queryData()
                this.close()
            },

            async updateForm(){
                this.$store.commit('loadingChange',{text: this.$t('message.inRequest'),show: true})
                const res = await this.$store.dispatch('AC_GroupServiceUpdateGroup', this.form);
                res.code == 200 ? this.$message.success(this.$t('message.success')) : this.$message.error(this.$t('message.fail'))
                this.$store.commit('loadingChange',{show: false})
                this.$refs.groupList.queryData()
                this.close()
            }
        }
    }
</script>
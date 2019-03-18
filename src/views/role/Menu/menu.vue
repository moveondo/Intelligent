<template>
    <div class="list-wrap">
        <div class="list-header">
            <div class="title">{{$t('dataTable.menuList')}}</div>
            <el-button type="primary" @click="editShow = true">{{$t('dataTable.create')}}</el-button>
        </div>
        <div class="container">
            <dataList 
            ref="dataList"
            queryDataMethod='menuObj'
            :operation="operation"
            :tableColumn="tableColumn"
            @selectOperation="selectOperation"
            ></dataList>
        </div>

        <el-dialog :title="$t('dataTable.menu')" :visible.sync="editShow" width="450px" @close="form = {}">
            <el-form ref="form" :model="form" label-width="100px">
                <el-form-item :label="$t('dataTable.menu')">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item :label="$t('dataTable.address')">
                    <el-input v-model="form.url"></el-input>
                </el-form-item>   
                <el-form-item :label="$t('dataTable.icon')">
                    <el-input v-model="form.icon"></el-input>
                </el-form-item>  
                <el-form-item :label="$t('dataTable.icon')">
                    <el-input v-model="form.sort"></el-input>
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
    import dataList from '../../common/dataTable';
    export default {
        components:{
              dataList
        },
        data() {
            return {
                editShow:false,
                form:{},
                operation: [this.$t('dataTable.edit'),this.$t('dataTable.delete')],
                tableColumn: [
                    { label: this.$t('dataTable.menu'),prop: 'name' },
                    { label: this.$t('dataTable.address'),prop: 'url' },
                    { label: this.$t('dataTable.icon'),prop: 'icon' },
                    { label: 'sort',prop: 'sort',sortable: true}
                ]
            }
        },
        methods: {
            selectOperation(data) {
                this.form = data.data
                this.editShow = true
            },

            async addForm(){
                if (!this.form.name || !this.form.url || !this.form.icon) {
                    this.$message.error(this.$t('message.empty'))
                    return
                }

                if(this.form.id) {
                    this.updateForm()
                    return
                }
                
                this.$store.commit('loadingChange',{text: this.$t('message.inRequest'),show: true})
                const result = await this.$store.dispatch('AC_MenuObjServiceAddMenuObj', this.form);
                result.code == 200 ? this.$message.success(this.$t('message.success')) : this.$message.error(this.$t('message.fail'))
                this.$store.commit('loadingChange',{show: false})
                this.$refs.dataList.queryData()
                this.editShow = false
            },

            async updateForm(){
                const result = await this.$store.dispatch('AC_MenuObjServiceUpdateMenuObj', this.form);
                result.code == 200 ? this.$message.success(this.$t('message.success')) : this.$message.error(this.$t('message.fail'))
                this.$refs.dataList.queryData()
                this.editShow = false
            },
        }
    }

</script>
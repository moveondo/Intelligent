<template>
    <div class="list-wrap">
        <div class="nav">
            <el-tabs v-model="tabSelect" @tab-click="queryTarget">
                <el-tab-pane :label="$t('industryModel.industryModel')"></el-tab-pane>
                <el-tab-pane :label="item.name" v-for="item in myGroupList" :key="item.id"></el-tab-pane>
            </el-tabs>
            <el-button class="button" type="primary" @click="editShow = true">{{$t('dataTable.create')}}</el-button>
        </div>

        <dataList 
        class="container"
        ref="dataList"
        queryDataMethod='bizModel'
        :params="params"
        :operation="operation"
        :tableColumn="tableColumn"
        @selectOperation="selectOperation"
        ></dataList>

        <el-dialog :title="$t('industryModel.industryName')" :visible.sync="editShow" width="450px" @close="close">
            <el-form ref="form" :model="form" label-width="120px">
                <el-form-item :label="$t('industryModel.industryName')">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item :label="$t('industryModel.industryModel')"> 
                    <el-select style="width:100%" v-model="form.businessId">
                        <el-option
                        v-for="item in businessList"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id">
                        </el-option>
                    </el-select>
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
        tabSelect: '0',
        myGroupList: [],
        editShow:false,
        form:{
            name: '',
            businessId: ''
        },
        params: {},
        businessList: [],
        operation: [this.$t('dataTable.edit'),this.$t('dataTable.delete')],
        tableColumn: [
            {prop: 'name',label: this.$t('industryModel.industryName')}
        ]
    }
  },
  created() {
      this.tabSelect == 0 ? this.params.userId = localStorage.getItem('userId')
                            : this.params.groupId = this.myGroupList[this.tabSelect - 1].id 
      this.getGroup()
      this.queryBusiness()
  },
  methods: {
    queryTarget() {
        let params = {}
        this.tabSelect == 0 ? params.userId = localStorage.getItem('userId')
                            : params.groupId = this.myGroupList[this.tabSelect - 1].id 
                            this.params = params
    },

    selectOperation(data) {
        this.$router.push({path: '/analyst/industryModelDetail', query: {Id: data.data.id, name:data.data.name }})
    },

    async addForm(){
        for(let item in this.form) {
            if (!this.form[item]) {
                this.$message.error(this.$t('message.empty'))
                return
            }
        }

        if(this.tabSelect != 0 && this.tabSelect) {
            this.form.groupId = this.myGroupList[this.tabSelect - 1].id 
        }
        this.form.userId = localStorage.getItem('userId')
        const result = await this.$store.dispatch('AC_BizModelServiceAddBizModel', this.form);
        result.code == 200 ? this.$message.success(this.$t('message.success')) : this.$message.error(this.$t('message.fail'))
        this.$refs.dataList.queryData()
        this.close()
    },

    close() {
        this.editShow = false
        this.form = {}
    },

    async queryBusiness() {
        let params = {
            pageNum: 1,
            pageSize: 10
        }

        const result = await this.$store.dispatch('AC_BusinessServiceQueryBusiness', params)
        this.businessList = result.data.businesss 
    },

    async getGroup() {
        let params = {
            userId: localStorage.getItem('userId')
        }

        const result = await this.$store.dispatch('AC_UserGroupManageServiceGetGroup', params)
        this.myGroupList = result.data.group ? result.data.group : []
    },
  },
  
}

</script>

<style lang="less" scoped>
.nav{
    padding-top: 10px;
    position: relative;
    .el-tabs{
        padding-right: 80px;
    }
    .button{
        position: absolute;
        top: 13px;
        right: 0;
        height: 34px;
    }
}
</style>

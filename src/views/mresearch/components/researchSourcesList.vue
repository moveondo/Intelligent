<template>
    <div>
        <dataList 
        ref="dataList" 
        @selectRow="selectRow"
        :search-data-list="searchDataList" 
        :operation="operation" 
        :table-column="tableColumn">
        </dataList>    

        <!-- 修改来源 -->
        <el-dialog :visible.sync="sourceShow" width="500px">
            <el-form label-width="120px">
                <el-form-item :label="$t('myTarget.title')">
                    <el-input v-model="selectSource.title"></el-input>
                </el-form-item>
                <el-form-item :label="$t('reportTemplate.type')"> 
                    <el-select style="width:100%" v-model="selectSource.infoCatagoryId" >
                        <el-option
                        v-for="item in infoCatagorys"
                        :key="item.id"
                        :label="item.infoSourceName"
                        :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item :label="$t('industryModel.publishTime')">
                    <el-date-picker
                    v-model="selectSource.publishTime"
                    type="date">
                    </el-date-picker>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="update">{{$t('message.confirm')}}</el-button>
                <el-button @click="sourceShow = false">{{$t('message.cancel')}}</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import dataList from '../../common/dataList'
export default {
    components:{
        dataList
    },
    props: ['analyzeParms','routeParams'],
    data() {
        return {
            roles:[],
            editShow:false,
            selectSource: {},
            infoCatagorys: [],
            sourceShow: false,
            searchDataList:[
                {
                    name: this.$t('myTarget.title'),
                    paramsId: 'title'
                },
                {
                    name: this.$t('reportTemplate.type'),
                    paramsId: 'type'
                },
                {
                    paramsId: 'publishTime',
                    name: this.$t('industryModel.publishTime')
                },
            ],
            tableColumn:[{
                prop: 'title',
                label: this.$t('myTarget.title')
            },
            {
                prop: 'type',
                label: this.$t('reportTemplate.type')
            },
            {
                prop: 'source',
                label: this.$t('task.source')
            },
            {
                prop: 'author',
                label: this.$t('industryModel.author')
            },
            {
                prop: 'status',
                label: this.$t('task.status')
            },
            {
                prop: 'publishTime',
                label: this.$t('industryModel.publishTime')
            }
            ],
            operation: {
                label1: this.$t('industryModel.label'),
                label2: this.$t('dataTable.delete')
            }
        }
    },
    mounted() {
        this.analyzeAspectId = this.analyzeParms.analyzeAspectId
        this.$refs.dataList.searchDataChange()
    },
    watch: {
        analyzeParms:{
            handler(newValue,oldValue){
                this.analyzeAspectId = newValue.analyzeAspectId;
                this.$refs.dataList.searchDataChange()
            },
            deep:true
        },
    },
    methods: {
        // 获取数据列表
        async queryDataList(params) {
            if(!this.analyzeAspectId) {
                return
            }
            let list =[]
            params.stockCode = this.routeParams.corpCode
            params.analyzeAspectId = this.analyzeAspectId
            const result = await this.$store.dispatch('AC_CorpAnalyzManageQueryDocById', params);
            list = result.data.crawlerResults ? result.data.crawlerResults : []
            if (list !== null) {
                list.forEach(item => {
                    item.publishTime = this.timetrans(item.publishTime)
                })
            }
            this.$refs.dataList.total=result.data.total;             
            this.$refs.dataList.dataList=list;
        },

        async queryInfoCatagory() {
            let params = {
                pageNum: 1,
                pageSize: 50
            }
            const result = await this.$store.dispatch('AC_InfoCatagoryServiceQueryInfoCatagory', params)
            this.infoCatagorys = result.data.infoCatagorys ? result.data.infoCatagorys : []
        },

        selectRow(data) {
            this.queryInfoCatagory()
            this.selectSource = data
            this.sourceShow = true
        },

        async update() {
            if(!this.selectSource.title || !this.selectSource.publishTime) {
                this.$message.error(this.$t('message.empty'))
                return
            }
            
            this.infoCatagorys.forEach(item => {
                this.selectSource.infoCatagoryId == item.id ? this.selectSource.type = item.infoSourceName : null
            })

            const result = await this.$store.dispatch('AC_CrawlerResultServiceUpdateCrawlerResult', this.selectSource);
            result.code == 200 ? this.$message.success(this.$t('message.success')) : this.$message.error(this.$t('message.fail'))
            this.$refs.dataList.searchDataChange()
            this.sourceShow = false
        },

        // 查看事件
        selectEdit(row) {
            //阻止冒泡
            window.event? window.event.cancelBubble = true : window.event.stopPropagation();

            let params={
                docId: row.id,
                pageInd: 1,
                bmId: this.routeParams.bmId,
                corpId: this.routeParams.corpId,
                name: this.routeParams.name
            }
            
            this.$router.push({path: '/mresearch/retrievalcontent',query: params})
        },

        async deleteData(data) {
            let params = {
                documentId: data.id
            }

            const result = await this.$store.dispatch('AC_CorpAnalyzManageDeleteInfoSources', params);
            result.code == 200 ? this.$message.success(this.$t('message.success')) : this.$message.error(this.$t('message.fail'))
            this.$refs.dataList.searchDataChange()
            this.$refs.dataList.deleteShow = false;
        },

        timetrans(data) {
            var date = new Date(data);
            var Y = date.getFullYear() + '-';
            var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
            var D = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate()) + ' ';
            return Y+M+D;   
        },
    }
}
</script>

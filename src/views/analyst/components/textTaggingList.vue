<template>
    <div>
        <dataList ref="dataList" 
        @selectRow="selectRow"
        :search-data-list="searchDataList" 
        :operation="operation" 
        :table-column="tableColumn">
        </dataList>    
    </div>
</template>

<script>
    import dataList from '../../common/dataList'
    export default {
        components:{
            dataList
        },
        props: ['analyzeAspectId','bizModelId'],
        data() {
            return {
                roles:[],
                editShow:false,
                searchDataList:[
                    {
                        name: this.$t('myTarget.companyName'),
                        paramsId: 'stockName'
                    },
                    {
                        name: this.$t('myTarget.stockCode'),
                        paramsId: 'stockCode'
                    },
                    {
                        paramsId: 'docType',
                        name: this.$t('reportTemplate.type')
                    },
                ],
                tableColumn:[{
                    prop: 'stockName',
                    label: this.$t('myTarget.companyName')
                },
                {
                    prop: 'stockCode',
                    label: this.$t('myTarget.stockCode')
                },
                {
                    prop: 'docType',
                    label: this.$t('reportTemplate.type')
                },
                {
                    prop: 'publishTime',
                    label: this.$t('industryModel.publishTime')
                }
                ],
                operation: {
                    label1: this.$t('industryModel.examine')
                }
            }
        },
        watch: {
            analyzeAspectId(data) {
                this.analyzeAspectId = data
                this.$refs.dataList.searchDataChange()
            },
            bizModelId(val){
                this.bizModelId=val;
            }
        },
        methods: {
            // 获取数据列表
            async queryDataList(params) {
                if (!this.analyzeAspectId) {
                    return
                }
                params.analyzeAspectId = this.analyzeAspectId
                const result = await this.$store.dispatch('AC_QueryDocQueryDocTagById', params);
                if (result.data.list !== null) {
                    result.data.list.forEach(item => {
                        item.publishTime = this.timetrans(item.publishTime)
                    })
                }
                this.$refs.dataList.total=result.data.total;             
                this.$refs.dataList.dataList=result.data.list;
            },

            // 查看事件
            selectEdit(data) {
                let params = {
                    docId: data.docId,
                    TagId: data.TagId,
                    pageInd: data.pageInd,
                    corpId: data.corpAnalyzeId,
                    bmId: this.bizModelId,
                    name: this.$route.query.name  //存疑
                }

                this.$router.push({ path:"/mresearch/retrievalcontent",query: params });
            },

            timetrans(data) {
                var date = new Date(data);
                var Y = date.getFullYear() + '-';
                var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
                var D = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate()) + ' ';
                return Y+M+D;   
            },

            selectRow(row) {
                this.$emit('selectRow', row)
            },
        }
    }
</script>

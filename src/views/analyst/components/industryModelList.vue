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
        props:['operation'],
        data() {
            return {
                searchDataList:[
                    {
                        name: this.$t('industryModel.industryName'),
                        paramsId: 'name'
                    },
                ],
                tableColumn:[
                {
                    label: this.$t('industryModel.industryName'),
                    prop: 'name'
                },
                ]
            }
        },
        methods: {
            // 获取数据列表
            async queryDataList(params) {
                if(this.$parent.tabSelect != 0 && this.$parent.tabSelect) {
                    params.groupId = this.$parent.myGroupList[this.$parent.tabSelect - 1].id 
                }else if(!this.$parent.tabSelect || this.$parent.tabSelect == 0){
                    params.userId = localStorage.getItem('userId')
                }

                const result = await this.$store.dispatch('AC_BizModelServiceQueryBizModel', params);
                this.$refs.dataList.total=result.data.total;             
                this.$refs.dataList.dataList=result.data.bizModels;
            },

            selectRow(row) {
                this.$emit('selectRow', row)
            },
        }
    }

</script>

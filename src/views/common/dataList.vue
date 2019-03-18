<template>
    <div>
        <!-- 搜索框 -->
        <div class="search-warp">
            <div class="search-type">
                <i class="el-icon-search"></i>
                <div class="select-list">
                    <div class="select-data" :key='index' v-for="(item,index) in selectDataList" >
                        {{item.name}} : {{item.value}}
                        <i class="el-icon-circle-close" @click="deleteSelectData(index,item)"></i>
                    </div>
                </div>
                <div class="search-cont">
                    <input ref="selectInput" @keydown.13="keydown" @focus="searchListShow = true" @blur="searchListShow = false" v-model="inputData" type="text" class="search-input" :placeholder="$t('placeholder.enter')">
                    <i class="search-triangle" v-show="searchListShow && searchDataList"></i>
                    <ul class="search-list" v-show="searchListShow && searchDataList">
                        <li @mousedown="selectItem(item)" :key="index" v-for="(item,index) in searchDataList">{{item.name}}</li>
                    </ul>
                </div>
            </div>
            
            <el-date-picker
            v-model="searchTime"
            type="daterange"
            value-format="yyyy-MM-dd HH:mm:ss"
            range-separator="__"
            :start-placeholder="$t('dataTable.startDate')"
            :end-placeholder="$t('dataTable.endDate')">
            </el-date-picker>
        </div>    
        <!-- 列表主体 -->
        <el-table :data="dataList" v-loading="tableLoading" border highlight-current-row @row-click="selectRow" :header-cell-style="{color:'#000'}">
            <el-table-column v-for="item in tableColumn" :key="item.prop" :prop="item.prop" :label="item.label" :sortable="item.sortable"></el-table-column>
            <el-table-column prop="createdAt" :label="$t('dataTable.creationTime')" sortable :formatter="timetrans"></el-table-column>
            <el-table-column :label="$t('dataTable.operating')" v-if="operation" width="165px">
                <template slot-scope="scope">
                    <el-button v-if="operation.label1" size="small" type="primary" @click="$parent.selectEdit(scope.row)">{{operation.label1}}</el-button>
                    <el-button v-if="operation.label2" size="small" type="danger" @click="selectDelete(scope.row)">{{operation.label2}}</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination
            align="right"
            layout="prev, pager, next"
            :total="total"
            :page-size="pageSize"
            @current-change="searchDataChange">
        </el-pagination>

        <!-- 删除提示框 -->
        <el-dialog :append-to-body="operation && operation.appendBody" :visible.sync="deleteShow" width="300px" center>
            <div class="del-dialog-cnt">{{$t('message.deleteSure')}}</div>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="$parent.deleteData(deleteData)">{{$t('message.confirm')}}</el-button>
                <el-button @click="deleteShow = false">{{$t('message.cancel')}}</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
export default {
    props:['searchDataList','operation','tableColumn'],
    data () {
        return {
            inputData: '',
            searchTime: '',
            searchListShow: false,
            selectDataList:[],   
            selectData:'',      
            dataList: [],
            deleteShow: false,
            deleteData: null,
            total: 1,
            pageSize: 10,
            tableLoading: false
        }
    },
    watch:{
        searchTime() {
           this.searchDataChange()
        },
        selectDataList() {
           this.searchDataChange()
        },
        dataList() {
            this.tableLoading = false
        }
    },
    created () {
        this.searchDataChange()
    },
    methods: {
        searchDataChange(val) {
            if (!this.dataList) {
                this.dataList = []
            }

            this.tableLoading = true

            let params = {}
            this.selectDataList.forEach(item => {
                params[item.paramsId] = item.value
            })
            
            if(this.searchTime) {
                params.dateFrom = this.searchTime[0]
                params.dateTo = this.searchTime[1]
            }
            params.pageNum = val ? val : 1;
            params.pageSize = this.pageSize
            this.$parent.queryDataList(params)
        },
        // 点击选中搜索name
        selectItem(item) {
            this.selectData = item
            this.inputData = item.name + ":"   
            this.searchListShow = false;
            this.$nextTick(function () {
                this.$refs.selectInput.focus();
            });
        },
        // 回车事件
        keydown() {
            let name = this.inputData.slice(0,this.selectData.name.length + 1)
            let value = this.inputData.slice(this.selectData.name.length + 1)
            
            if(name != this.selectData.name + ':' || value == '') {
                this.$message.error(this.$t('message.fail'))
                return false
            }

            this.selectDataList.forEach((item,index) => {
                if(item.name == this.selectData.name) {
                    this.selectDataList.splice(index,1)
                }
            })

            this.selectData.value = value
            this.selectDataList.push(this.selectData)
            this.inputData = ''
        },

        // 删除选中的搜索
        deleteSelectData(index,item) {
            this.selectDataList.splice(index,1)
        },

        //行点击事件
        selectRow(row) {
            this.$emit('selectRow',row)
        },

        //删除弹框
        selectDelete(row) {
            //阻止冒泡
            window.event? window.event.cancelBubble = true : window.event.stopPropagation();
            
            this.deleteShow = true
            this.deleteData = row
        },

        timetrans(row) {
            var date = new Date(row.createdAt);
            var Y = date.getFullYear() + '-';
            var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
            var D = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate()) + ' ';
            return Y+M+D;   
        },
    }

}
</script>
<style lang="less" scoped>
.search-warp{
    margin-bottom: 20px;
    display: flex;
    width: 100%;
    max-width: 750px;

    .search-type {
        flex:1;
        display: flex;
        padding: 5px;
        margin-right: 10px;
        border-radius: 4px;
        border: 1px solid #d7d8d9;
        .el-icon-search{
            font-size: 18px;
            line-height: 30px;
            margin-right: 10px;
        }
        .select-list{
            .select-data{
                padding: 5px 8px;
                height: 20px;
                line-height: 20px;
                font-size: 12px;
                border-radius: 25px;
                margin-right: 3px;
                background: #cbe1fa;
                display: inline-block;
                white-space: nowrap;
            }
        }   

        .search-cont{
            position: relative;
            flex: 1;
            height: 30px;
            input{
                font-size: 14px;
                outline: 0;
                border: 0;
                display: inline-block;
                height: 100%;
                width: 100%;
            }
            .search-triangle{
                width: 6px;
                height: 6px;
                border: 1px solid #d7d8d9;
                border-bottom: none;
                border-right: none;
                transform:rotate(45deg);
                background: #fff;
                z-index: 999;
                position:absolute; 
                top: 42px;
                left: 40px;
            }
            .search-list{
                position: absolute;
                top: 45px;
                left: 0;
                width: 84px;
                padding-top: 10px;
                font-size: 14px;
                background: #fff;
                z-index: 998;
                border: 1px solid #d7d8d9;
                border-radius: 4px;
                li{
                    height: 36px;
                    line-height: 36px;
                    text-align: center;
                    overflow: hidden;
                }
                li:hover{
                    background: #ecf5ff;
                    color: #409eff;
                    cursor: pointer;
                }
            }
        }
    }
    .el-range-editor--small.el-input__inner{
        width: 300px;
        height: 42px;
        .el-range-separator{
            line-height: 34px;
        }
    }
}
</style>

<template>
 <div class="tabs-wrap">
    <div class="tab-header">
        <el-tabs class="tab-left" v-model="selectedDiagramId" type="card" @tab-click="handleClick">
            <el-tab-pane v-if="diagrams.length == 0" name="0" :label="this.$t('message.noData')"></el-tab-pane>
            <el-tab-pane
            v-for="item in diagrams"
            :key="item.id"
            :name="item.id + ''">
                <span slot="label">
                    <span>{{ item.name }}</span>
                    <el-dropdown trigger="click" class="dropdown">
                        <i class="el-icon-arrow-down icon"></i>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item @click.native="upDateTab(item)">{{$t('message.update')}}</el-dropdown-item>
                            <el-dropdown-item @click.native="removeTab(item)">{{$t('dataTable.delete')}}</el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>     
                </span>
            </el-tab-pane>
        </el-tabs>
        <div class="tab-right">
            <el-button type="primary" @click="newDiagramDialog = true">{{$t('message.add')}}</el-button>
            <el-button type="primary" @click="savediagram(0)">{{$t('dataTable.save')}}</el-button>
        </div>
    </div>
    <div class="diagram-popover">
        <div class="popover-wrap">
            <div id="popover-content" class="popover-list" v-show="selectionModelShow">
                <el-tooltip class="item" effect="dark" placement="top-start">
                    <div slot="content">{{ $t('mresearch.formula') }}</div>
                    <div class="icon-content" @click="selectionModelEdit(1)" @mouseover="iconShowId = 1" @mouseout="iconShowId = ''">
                        <img v-show="!selectionModel.formula && iconShowId != 1" :src="diagram_formula" alt="">
                        <img v-show="selectionModel.formula || iconShowId == 1" :src="diagram_formula_hover" alt="">
                    </div>
                </el-tooltip>
                <el-tooltip class="item" effect="dark" placement="top-start">
                    <div slot="content">{{ $t('industryModel.label') }}</div>
                    <div class="icon-content" @click="selectionModelEdit(2)" @mouseover="iconShowId = 2" @mouseout="iconShowId = ''">
                        <img v-show="!selectionModel.remark && iconShowId != 2" :src="diagram_label" alt="">
                        <img v-show="selectionModel.remark || iconShowId == 2" :src="diagram_label_hover" alt="">
                    </div>
                </el-tooltip>
                <el-tooltip class="item" effect="dark" placement="top-start">
                    <div slot="content">{{ $t('myTarget.link') }}</div>
                    <div class="icon-content" @click="selectionModelEdit(3)" @mouseover="iconShowId = 3" @mouseout="iconShowId = ''">
                        <img v-show="!selectionModel.linkList && iconShowId != 3" :src="diagram_link" alt="">
                        <img v-show="selectionModel.linkList || iconShowId == 3" :src="diagram_link_hover" alt="">
                    </div>
                </el-tooltip>
            </div>
        </div>
        <div class="prompt">{{ $t('placeholder.zoom') }}</div>
    </div>

    <diagram ref="diag"
    v-bind:model-data="diagramData"
    v-on:model-changed="modelChanged"
    @nodeSelectionChanged='nodeSelectionChanged'
    @nodeButtonSelection='nodeButtonSelection'
    v-show="diagrams.length != 0"
    class="diagrams">
    </diagram>
    <div class="diagrams" v-show="diagrams.length == 0">
        {{ $t('message.noData') }}
    </div>

    <!-- 编辑公式弹出框 -->
    <el-dialog :title="$t('message.update')" :visible.sync="selectionModelFormShow" width="550px" @close="close">
        <el-form label-width="100px">
            <el-form-item :label="selectionModelForm.title">
                <el-input v-model="selectionModelForm.data" type="textarea" :rows="6"></el-input>
            </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="selectionModelUpdate">{{$t('message.confirm')}}</el-button>
            <el-button @click="selectionModelFormShow = false">{{$t('message.cancel')}}</el-button>
        </span>
    </el-dialog>

    <!-- 链接弹出框 -->
    <el-dialog :visible.sync="selectionModelLinkShow" class="link-content" width="80%" @close="close">
        <div slot="title" class="title">
            <div>{{ $t('mresearch.associatedAnnotation') }}</div>
            <el-button type="primary" @click="informationListShow = true">{{$t('mresearch.association')}}</el-button>
        </div>

        <ul class="link-list">
            <li v-for="(item,index) in selectionModelLinkList" :key="index">
                <div class="link-head">
                    <div class="title"> {{ item.title }}</div>
                    <div class="label" @click="selectTable(item)"> {{ item.selectionLabel }}</div>
                    <i class="el-icon-delete" @click="deleteTable(item)"></i>
                </div>
                <div class="content">
                    <div v-html="item.sourceStr"></div>
                    <div class="msg">
                        <div class="msg-left">
                            <img :src="finishimg">
                            {{ $t('mresearch.conclusion')}}：
                        </div>
                        <div class="msg-right">{{item.msg}}</div>
                    </div>
                </div>
            </li>
        </ul>
    </el-dialog>

    <!-- 新增弹出框 -->
    <el-dialog :title="$t('reportTemplate.chapterName')" :visible.sync="newDiagramDialog" width="450px" @close="close">
        <el-form ref="addform" label-width="120px">
            <el-form-item :label="$t('mresearch.createDiagramInputTitle')">
                <el-input v-model="addform.name"></el-input>
            </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="addDiagram()">{{$t('message.confirm')}}</el-button>
            <el-button @click="newDiagramDialog = false">{{$t('message.cancel')}}</el-button>
        </span>
    </el-dialog>

    <!-- 删除提示框 -->
    <el-dialog :visible.sync="deleteShow" width="300px" center>
        <div class="del-dialog-cnt">{{$t('message.deleteSure')}}</div>
        <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="sureDelete">{{$t('message.confirm')}}</el-button>
            <el-button @click="deleteShow = false">{{$t('message.cancel')}}</el-button>
        </span>
    </el-dialog>

    <!-- 加入标注 -->
    <el-dialog :visible.sync="informationListShow" width="80%" @close="informationListShow = false">
        <informationList @joinReportSection="joinReportSection" :routeParams="routeParams"></informationList>
    </el-dialog>
 </div>
</template>

<script>
import diagram from "./../../diagram/Gojs/statechart";
import informationList from "./informationList"
import diagram_formula from "./../../../../static/img/svg/diagram_formula.svg";
import diagram_formula_hover from "./../../../../static/img/svg/diagram_formula_hover.svg";
import diagram_label from "./../../../../static/img/svg/diagram_label.svg";
import diagram_label_hover from "./../../../../static/img/svg/diagram_label_hover.svg";
import diagram_link from "./../../../../static/img/svg/diagram_link.svg";
import diagram_link_hover from "./../../../../static/img/svg/diagram_link_hover.svg";
import finishimg from "./../../../../static/img/svg/finish.svg";
export default {
    props: ['routeParams','analyzeParms','parentSelect'],
    components: {
        diagram,
        informationList
    },
    data() {
        return {
            finishimg: finishimg,
            firstRun: true,
            analyzeAspectId:'',
            diagrams:[],
            selectedDiagramId: '0',
            selectedDiagram: null,
            diagramData: {},
            deleteId: '',
            addform:{},
            deleteShow: false,
            newDiagramDialog:false,
            selectionModel: {},
            selectionModelShow: false,
            selectionModelForm: {},
            selectionModelFormShow: false,
            selectionModelUpdateList: [],
            informationListShow: false,
            selectionModelLinkShow: false,
            selectionModelLinkList: [],
            timeForm: {},
            iconShowId: '',
            excelData: {},
            profitData: {},
            profitDateList: [],
            letter: {},
            excelDataList: {},
            excelToDiagramData: {},
            excelDataId: 1,
            diagram_formula: diagram_formula,
            diagram_formula_hover: diagram_formula_hover,
            diagram_label: diagram_label,
            diagram_label_hover: diagram_label_hover,
            diagram_link: diagram_link,
            diagram_link_hover: diagram_link_hover,
        }
    },
    watch: {
        parentSelect(newData) {
            if(newData != 'fourth') {
                return
            }
            
            if(this.firstRun && this.diagrams.length != 0) {
                this.firstRun = false
                this.handleClick(this.diagrams[0].id)
            }

            this.queryExcelData(this.$store.state.selectExcelData)
        },
        analyzeParms:{
            handler(newValue,oldValue){
                this.analyzeAspectId = newValue.analyzeAspectId;
                if(newValue.time !=null){
                    this.timeForm.dateFrom=newValue.time+'-01-01 00:00:00';
                    this.timeForm.dateTo=newValue.time+'-12-31 00:00:00';
                }else{
                    this.timeForm.dateFrom = null;
                    this.timeForm.dateTo = null;
                }
            },
            deep:true
        }
        
    },
    mounted() {
        this.queryDiagram()
    },
    methods: {
        async handleClick(tab) {
            if(tab == 0) {
                return
            }
            this.selectedDiagramId = typeof tab == 'object' ? tab.name : tab + ''
            let params={
                id: this.selectedDiagramId
            }

            const result = await this.$store.dispatch('AC_CorpAnaDiagramServiceGetCorpAnaDiagram', params);
            this.selectedDiagram = result.data.corpAnaDiagram
            this.getDiagramData(this.selectedDiagram.diagramePath)
        },

        getDiagramData(url) {
            this.$axios.get(url).then(result => {
                this.diagramData = result.data
                this.selectedDiagram.diagrameJson = JSON.stringify(result.data)
            })
        },

        upDateTab(data) {
            this.addform = data
            this.newDiagramDialog = true
        },

        removeTab(data) {
            this.deleteId = data.id
            this.deleteShow = true
        },

        queryExcelData(excelData) {
            if(!excelData || !excelData.data) {
                return
            }
            this.$store.commit('loadingChange',{show: true,text: this.$t('mresearch.diagramSaving')})

            let selectExcel = {}
            let dataList = []
            let timeList = []
            let letter = {}
            let data = excelData.data

            for (var i = 0; i < 26; i++) {
                letter[String.fromCharCode((65 + i))] = i
            }
            this.letter = letter

            for(let i in data) {
                let obj = {
                    label: i,
                    data: data[i].data && data[i].data.dataTable ? data[i].data.dataTable : null
                }
                if(i == '利润表') {
                    selectExcel = data[i].data.dataTable[0]
                    this.profitData = data[i].data.dataTable
                }
                dataList.push(obj)
            }
            this.excelData = dataList
            
            if(excelData.activeSheetIndex != 0 || excelData.activeRowIndex != 0 || excelData.activeColumnIndex != 0){
                let obj = this.excelData[excelData.activeSheetIndex].data[excelData.activeRowIndex][excelData.activeColumnIndex]
                let year = typeof this.excelData[excelData.activeSheetIndex].data[0][excelData.activeColumnIndex].value == 'string' ? this.excelData[excelData.activeSheetIndex].data[0][excelData.activeColumnIndex].value.replace('E','') : this.excelData[excelData.activeSheetIndex].data[0][excelData.activeColumnIndex].value
                let label = year + this.excelData[excelData.activeSheetIndex].data[excelData.activeRowIndex][0].value

                this.excelDataList = {
                    text: excelData.label + this.excelData[excelData.activeSheetIndex].label + label,
                    formula: obj.formula,
                    id: 0,
                    dataList: []
                }

                this.excelToDiagramData =  {
                    class: "go.GraphLinksModel",
                    nodeKeyProperty: "id",
                    nodeDataArray: [
                        { id: 0, text: this.excelDataList.text }
                    ],
                    linkDataArray: []
                }

                if(!this.excelDataList.formula) {
                    this.$message.error(this.$t('message.noData'))
                    this.$store.commit('loadingChange',{show: false})
                    return
                }

                this.findFormula(this.excelDataList,this.excelData[excelData.activeSheetIndex].data[excelData.activeRowIndex],label,() => {
                    this.createExcelNode(this.excelDataList,() => {
                        let params = {
                            name: excelData.label + label,
                            corpAnalyzeId: this.$route.query.corpId,
                            userId: localStorage.getItem('userId'),
                            diagrameJson: JSON.stringify(this.excelToDiagramData)
                        }
                        
                        this.addDiagram(params)
                    })
                })
                return
            }

            this.excelDataList = {
                text: excelData.label,
                id: 0,
                dataList: [],
            }

            this.excelToDiagramData =  {
                class: "go.GraphLinksModel",
                nodeKeyProperty: "id",
                nodeDataArray: [
                    { id: 0, text: this.excelDataList.text }
                ],
                linkDataArray: []
            }

            for(let i in selectExcel) {
                let value = selectExcel[i].value ? selectExcel[i].value.toString() : ''
                if(value.indexOf('E') != '-1') {
                    let obj = {
                        index: i,
                        data: selectExcel[i].value
                    }
                    timeList.push(obj)
                }
            }
            this.profitDateList.push(timeList[0])
            
            // console.log('excelData---',this.excelData)
            // console.log('profitData---',this.profitData)
            // console.log('profitDateList---',this.profitDateList)
            this.queryRow(excelData)
        },

        queryRow(excelData){
            let stauas
            for(let i in this.profitData) {
                if(this.profitData[i][0].value == '产品拆分结束') {
                    this.createExcelNode(this.excelDataList,() => {
                        let params = {
                            name: excelData.label,
                            corpAnalyzeId: this.$route.query.corpId,
                            userId: localStorage.getItem('userId'),
                            diagrameJson: JSON.stringify(this.excelToDiagramData)
                        }
                        
                        this.addDiagram(params)
                    })
                    return
                }

                this.queryColumn(this.profitData[i])
            }
        },

        queryColumn(rowData) {
            if(rowData[0].value.indexOf('产品') != '-1' && rowData[0].value.indexOf('：') != '-1') {
                let obj = {
                    text: rowData[0].value,
                    dataList: []
                }

                this.excelDataList.dataList.push(obj)
            }
            
            if(rowData[0].value.indexOf('产品') == '-1' && rowData[0].value.indexOf('：') == '-1'){
                this.profitDateList.forEach(item => {
                    let obj = {
                        text: item.data.replace('E','') + rowData[0].value + ':' + rowData[item.index].value.toFixed(2),
                        formula: rowData[item.index].formula,
                        dataList: []
                    }
                    let length = this.excelDataList.dataList.length == 0 ? 0 : this.excelDataList.dataList.length - 1
                    this.excelDataList.dataList[length].dataList.push(obj)
                    if(obj.formula) {
                        this.findFormula(obj,rowData)
                    }
                })
            }
        },

        findFormula(obj,ExcelData,objLabel,callback) {
            if(obj.formula.indexOf('!') != '-1') {
                let arr = obj.formula.split('!')
                if(arr.length != 2) {
                    console.error('lj---出错',arr)
                }
                
                let label = arr[0]
                let letter = arr[1].slice(0,1)
                let index = arr[1].slice(1)
                
                let selectExcel = {}
                this.excelData.forEach(item => {
                    item.label == label ? selectExcel = item.data : null
                })
                let num = this.letter[letter]  //A-Z字母的index
                let objData = selectExcel[index - 1][num]
                let cont = {
                    text: arr[1] + ':' + label + ExcelData[0].value + ':' + objData.value.toFixed(2),   //此ExcelData为利润表的一行。
                    formula: objData.formula,
                    dataList: []
                }
                obj.dataList.push(cont)

                if(cont.formula) {
                    this.findFormula(cont,selectExcel,label)
                }
            }else if(obj.formula.indexOf(':') == '-1') {
                let reg = /[\u002a\u002b\u002c\u002d\u002f\u0028\u0029]/
                let arr = obj.formula.split(reg)
                arr.forEach(item => {
                    let letter = this.letter[item.slice(0,1)] 
                    let index
                    if(item.indexOf('$') != '-1') {
                        index = item.slice(2)
                    }else {
                        index = item.slice(1)
                    }

                    if(item.length > 1 && index * 1 == index && this.letter.hasOwnProperty(item.slice(0,1))) {
                        if(!ExcelData[0][letter]) {
                            this.$message.error('请选择正确的表格')
                            return
                        }
                        
                        let firstRow = ExcelData[0][letter]
                        let firstColumn = ExcelData[index - 1][0]
                        let selectData = ExcelData[index - 1][letter]
                        let value = firstRow.value.toString().indexOf('E') == '-1' ? firstRow.value : firstRow.value.replace('E','')

                        let cont = {
                            text: item + ':' + objLabel + value + firstColumn.value + ':' + selectData.value.toFixed(2),
                            formula: selectData.formula,
                            dataList: []
                        }
                        obj.dataList.push(cont)

                        if(cont.formula) {
                            this.findFormula(cont,ExcelData,objLabel)
                        }
                    }
                })
            }else {
                let reg = /[\u002a\u002b\u002c\u002d\u002f\u0028\u0029]/
                let arr = obj.formula.split(reg).filter(item => {
                    return item.indexOf(':') != '-1'
                }) 
                if(arr.length< 1){
                    console.error('错误=====',arr)
                }
                arr.forEach(item => {
                    let arrCont = item.split(':')
                    let letter = this.letter[arrCont[0].slice(0,1)]  
                    let lastIndex = arrCont[1].slice(1)
                    for(let index = arrCont[0].slice(1);index <= lastIndex;index++){

                        let firstRow = ExcelData[0][letter]
                        let firstColumn = ExcelData[index - 1][0]
                        let selectData = ExcelData[index - 1][letter]
                        let value = firstRow.value.toString().indexOf('E') == '-1' ? firstRow.value : firstRow.value.replace('E','')

                        let cont = {
                            text: arrCont[0].slice(0,1) + index + ':' + objLabel + value + firstColumn.value + ':' + selectData.value.toFixed(2),
                            formula: selectData.formula,
                            dataList: []
                        }
                        obj.dataList.push(cont)
                        if(cont.formula) {
                            this.findFormula(cont,ExcelData,objLabel)
                        }
                    }
                })
            }
            callback && callback.call()
        },

        createExcelNode(data,callback) {
            data.dataList.forEach(item => {
                item.id = this.excelDataId

                let nodeData = {
                    id: item.id,
                    text: item.text,
                    formula: item.formula
                }

                let linkData = {
                    from: data.id,
                    to: item.id,
                    text: '相关',
                }
                this.excelToDiagramData.nodeDataArray.push(nodeData)
                this.excelToDiagramData.linkDataArray.push(linkData)
                this.excelDataId++

                if(item.dataList.length != 0) {
                    this.createExcelNode(item)
                }

            })

            callback && callback.call()
        },
 
        // 获取数据列表
        async queryDiagram() {
            if (!this.$route.query.corpId) {
                return
            }

            let params={
                corpAnalyzeId: this.$route.query.corpId,
                dateFrom: this.timeForm.dateFrom,
                dateTo: this.timeForm.dateTo
            }

            const result = await this.$store.dispatch('AC_CorpAnaDiagramServiceQueryCorpAnaDiagram', params);
            this.diagrams = result.data.corpAnaDiagrams ? result.data.corpAnaDiagrams : []
            if(!this.firstRun && this.diagrams.length != 0) {
                this.handleClick(result.data.corpAnaDiagrams[0].id)
            }
        },

        async addDiagram(data){
            if (!this.addform.name && !data) {
                this.$message.error(this.$t('message.empty'))
                return
            }

            if(this.addform.id) {
                this.savediagram()
                return
            }
 
            let params

            if(!data) {
                params={
                    name: this.addform.name,
                    corpAnalyzeId: this.$route.query.corpId,
                    userId: localStorage.getItem('userId'),
                    diagrameJson: "{ \"class\": \"go.GraphLinksModel\",\"nodeKeyProperty\": \"id\",\"nodeDataArray\": [],\"linkDataArray\": []}"
                }
            }else {
                params = data
            }
            
            this.$store.commit('loadingChange',{show: true,text: this.$t('mresearch.diagramSaving')})
            const result = await this.$store.dispatch('AC_CorpAnaDiagramManageAddDiagram', params);
            this.queryDiagram()
            this.$store.commit('loadingChange',{show: false})
            this.newDiagramDialog = false;
            this.$store.commit('selectExcel','')
            this.excelDataList = {}
            this.excelToDiagramData = {}
            this.excelDataId = 1
        },

        async savediagram(newCard){
            if(!this.diagrams) {
                this.$message.error(this.$t('message.noData'))
                return
            }
            let diagrameJson = JSON.parse(this.model().toJson())

            for(let i = 0; i<diagrameJson.linkDataArray.length;i++) {
                diagrameJson.linkDataArray[i].points = null
            }
            
            let params={
                id: this.selectedDiagramId,
                corpAnalyzeId: this.$route.query.corpId,
                userId: localStorage.getItem('userId'),
                diagrameJson: JSON.stringify(diagrameJson)
            }

            this.newDiagramDialog ? params.name = this.addform.name : null
            this.$store.commit('loadingChange',{show: true,text: this.$t('mresearch.diagramSaving')})
            const result = await this.$store.dispatch('AC_CorpAnaDiagramManageUpdateDiagram', params);
            result.code == 200 ? this.$message.success(this.$t('message.success')) : this.$message.error(this.$t('message.fail'))
            this.$store.commit('loadingChange',{show: false})
            this.close()
            this.selectionModelUpdateList = []
            if(newCard != 0) {
                this.handleClick(newCard)
            }
        },

        async sureDelete() {
            let params = {
                id: this.deleteId
            }

            this.$store.commit('loadingChange',{show: true,text: this.$t('message.inRequest')})
            const result = await this.$store.dispatch('AC_CorpAnaDiagramManageDeleteDiagram', params);
            result.code == 200 ? this.$t('message.success') : this.$t('message.fail')
            this.queryDiagram()
            this.close()
            this.$store.commit('loadingChange',{show: false})
        },

        nodeSelectionChanged(node,bool) {
            if(!bool) {
                this.selectionModelShow = false
                return
            }

            this.selectionModel = node.data
        },

        selectionModelEdit(data) {
            if(data ==1) {
                this.selectionModelForm.title = this.$t('mresearch.formula')
                this.selectionModelForm.data = this.selectionModel.formula ? this.selectionModel.formula : ''
                this.selectionModelForm.sort = 1
                this.selectionModelFormShow = true
            }else if(data == 2) {
                this.selectionModelForm.title = this.$t('industryModel.label')
                this.selectionModelForm.data = this.selectionModel.remark ? this.selectionModel.remark : ''
                this.selectionModelForm.sort = 2
                this.selectionModelFormShow = true
            }else if(data == 3) {
                this.selectionModelLinkList = this.selectionModel.linkList
                this.selectionModelLinkShow = true
            }
        },

        selectionModelUpdate() {
            if(this.selectionModelForm.sort ==1) {
                this.selectionModel.formula = this.selectionModelForm.data
            }else if(this.selectionModelForm.sort == 2) {
                this.selectionModel.remark = this.selectionModelForm.data
            }
            this.selectionModelUpdateList.forEach((item,index) => {
                if(item.id == this.selectionModel.id) {
                    this.selectionModelUpdateList.splice(index,1)
                }
            })

            this.selectionModelUpdateList.push(this.selectionModel)
            this.close()
        },

        joinReportSection(data) {
            if(!this.selectionModel.linkList) {
                this.selectionModel.linkList = []
            }

            this.selectionModel.linkList.forEach((item,index) => {
                if(item.id == data.id) {
                    this.selectionModel.linkList.splice(index,1)
                }
            })

            this.selectionModelUpdateList.forEach((item,index) => {
                if(item.id == this.selectionModel.id) {
                    this.selectionModelUpdateList.splice(index,1)
                }
            })

            this.selectionModel.linkList.push(data)
            this.selectionModelUpdateList.push(this.selectionModel)
            this.selectionModelLinkList = this.selectionModel.linkList
            this.informationListShow = false
        },

        nodeButtonSelection(e,obj) {
            let mouseEvent = e.event
            const popover = document.querySelector('#popover-content')
            popover.style.top = mouseEvent.offsetY + 32 + 'px'
            popover.style.left = mouseEvent.offsetX - 61 + 'px'
            this.selectionModelShow = true
        },

        model() { 
            return this.$refs.diag.model() 
        },
        
        updateDiagramFromData() { 
            this.$refs.diag.updateDiagramFromData()
        },
       
        modelChanged(e) {
            if (e.isTransactionFinished) {
                this.savedModelText = e.model.toJson();
            }
        },

        selectTable(data) {
            this.$emit('getAnalyzeAspect',data.analyzeAspectId)
        },

        deleteTable(data) {
            let i = Number
            this.selectionModelLinkList.forEach((item,index) => {
                item.id == data.id ? i = index : null
            })
            this.selectionModelLinkList.splice(i,1)

            this.selectionModelUpdateList.forEach((item,index) => {
                if(item.id == this.selectionModel.id) {
                    this.selectionModelUpdateList.splice(index,1)
                }
            })

            this.selectionModelUpdateList.push(this.selectionModel)
        },

        close() {
            this.deleteShow = false
            this.newDiagramDialog = false
            this.selectionModelFormShow = false
            this.selectionModelLinkShow = false
            this.selectionModelForm = {}
            this.addform = {}
        }
    }
}
</script>
<style lang="less" scoped>
.tabs-wrap{
    padding: 0 10px 20px;
}
.diagram-popover{
    height: 20px;
    padding-bottom: 5px;
    display: flex;
    justify-content: space-between;
    .popover-wrap{
        position: relative;
    }

    .popover-list{
        width: 120px;
        height: 34px;
        position: absolute;
        display: flex;
        z-index: 999;
        background: #d1ddf5;
        border: 2px solid #9eafd4;
        cursor: pointer;
        font-size: 14px;
        line-height: 30px;
        color: #7a869a;
        border-radius: 4px;
        .item {
            flex: 1;
            color: #7a869a;
            display: flex;
            justify-content: center;
            align-items: center;
            img{
                height: 20px;
            }
        }
        .item:hover{
            color: #3b4458;
        }
    }
}

.diagrams{
    border: solid 1px #d3dbe6; 
    width: 100%; 
    height: 400px;
}
.dropdown{
    display: none;
}
.el-tabs__item.is-active {
    .dropdown{
        display: inline-block;
    }
}
.tab-header{
   position: relative;
}
.tab-left{
    padding-right: 144px;
}
.tab-right {
    text-align: right;
    width: 140px;
    position: absolute;
    right: 0;
    top: 4px;
}
.popover-title {
    font-size: 16px;
    line-height: 20px;
}
.popover-content {
    font-size: 12px;
    line-height: 16px;
}
.link-content{
    .title{
        display: flex;
        font-size: 18px;
        line-height: 32px;
        font-weight: 500;
        div{
            flex: 1;
        }
    }
    .el-button{
        margin-right: 30px;
    }
    .link-list{
        li{
            margin-bottom: 10px;
            font-size: 14px;
            .link-head{
                background: #d0e4f1;
                display: flex;
                padding: 5px;
                box-sizing: border-box;
                line-height: 30px;
                border-bottom: 1px solid #f2f2f4;
                .title{
                    flex: 1;
                    font-size: 16px;
                    color: #000;
                }
                .label{
                    line-height: 30px;
                    color: #000;
                    cursor: pointer;
                    margin: 0 15px;
                }
                .label:hover{
                    color: #409EFF;
                }
                i{
                    line-height: 30px;
                    font-size: 16px;
                    cursor: pointer;
                }
            }
            .content{
                padding: 10px;
                .msg{
                    margin-top: 10px;
                    border: 1px dashed #e4e7ed;
                    color: #888;
                    padding: 10px;
                    display: flex;
                    line-height: 20px;
                    .msg-left{
                        margin-right: 12px;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        color: #409EFF;
                        img{
                            margin-right: 4px;
                            height: 20px;
                        }
                    }
                    .msg-right{
                        flex: 1;
                    }
                }
            }
        }
    }
}
</style>

 

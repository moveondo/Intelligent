<template>
      <div>
        <div class="sample-tutorial">
            <div class="options-container">
                <div class="option-row">
                    <span class="inputContainer">
                        <input type="file" id="fileDemo" class="input">
                        <input type="button" id="loadExcel" value="import" class="button" @click="loadExcel">
                    </span>
                    <span class="inputContainer">
                        <input id="exportFileName" value="export.xlsx" class="input">
                        <input type="button" id="saveExcel" value="export" class="button" @click="exportExcel">
                    </span>
                    <span class="group">
                        <label>Password:
                            <input type="password" id="password">
                        </label>
                    </span>
                </div>
            </div>
        </div>
       
       <div class="spreadContainer" >
        <gc-spread-sheets
            :hostClass='"spreadHost"'
            @workbookInitialized='spreadInitHandle'
            :showHorizontalScrollbar = 'showHorizontalScrollbar'
            :showVerticalScrollbar = 'showVerticalScrollbar'
           :allowUserZoom = 'allowUserZoom'
        >
        </gc-spread-sheets>
      </div>
      <div id="ss" class="sample-spreadsheets"></div>

    </div>
    </template>
    <script>
    import  '@grapecity/spread-sheets-vue'
	import * as Excel from "@grapecity/spread-excelio"
	import GC from '@grapecity/spread-sheets'
	import * as FileSaver from "file-saver"
      export default {
        data(){
          return {
            showHorizontalScrollbar: true,
            showVerticalScrollbar:true,
            allowUserZoom:true,
           dataSource: [
			   { name: 'Alice', age: 27, birthday: '1985/08/31', position: 'PM' }
			]
          }
        },
        created(){
          //this.QueryDataTable();
        },
        computed:{
          dataTable(){
            let dataTable = [];
            for (let i = 0; i < 42; i++) {
              dataTable.push({price: i + 0.56})
            }
            return dataTable
          }
        },
        mounted(){
          this.QueryDataTable();
        },
        methods:{
            spreadInitHandle: function (spread) {
				window.mySpread = spread;
				GC.Spread.Common.CultureManager.culture('zh-cn');
				// GC.Spread.Common.CultureManager.culture('ja-jp');
				//GC.Spread.Common.CultureManager.culture('en-us');
				let sheet = spread.getActiveSheet();
            },
             async QueryDataTable() {
                let params={
                        "corpAnalyzeId": this.$route.query.corpId,
                    }
                    this.tableNums=[];
                    const res = await this.$store.dispatch('AC_AnalyzeExcelServiceQueryAnalyzeExcel', params);
                    if(res.code==200 && res.data.analyzeExcels && res.data.analyzeExcels.length){
                        this.tableNums=res.data.analyzeExcels;
                        console.log(res.data.analyzeExcels[0])
                         window.mySpread.fromJSON(JSON.parse(res.data.analyzeExcels[0].excelText) );
                       
                    }   
            },
            async addtable(json,name){
                let Strjson=JSON.stringify(json);
                let para={
                        "corpAnalyzeId": this.$route.query.corpId,
                        "excelText": Strjson,
                        "name": name,
                        "stockCode": this.$route.query.corpCode,
                    }
                    const res = await this.$store.dispatch('AC_AnalyzeExcelServiceAddAnalyzeExcel', para);
                    if(res.code==200){
                       console.log(1)
                    }  
             },
            loadExcel(){    
                let self=this;
            	this.excelIO = new Excel.IO();
                let sheet = window.mySpread.getActiveSheet();
                let excelFile = document.getElementById("fileDemo").files[0];
                console.log(excelFile)
                let password = document.getElementById('password').value;
                // here is excel IO API
                this.excelIO.open(excelFile, function (json) {
                    let workbookObj = json;
                   // console.log(typeof(JSON.stringify(json)));  
                    window.mySpread.fromJSON(workbookObj);
                  
                   
                }, function (e) {
                    // process error
                    // alert(e.errorMessage);
                    console.log(e.errorMessage);
                    if (e.errorCode === 2/*noPassword*/ || e.errorCode === 3 /*invalidPassword*/) {
                        document.getElementById('password').onselect = null;
                    }
                }, {password: password});

            },
           	exportExcel(e){
                let self=this;
                this.excelIO = new Excel.IO();
                let excelFile = document.getElementById("fileDemo").files[0];
				//let spread = GC.Spread.Sheet
				if (window.mySpread) {
                    let ssjson = window.mySpread.toJSON();
                    self.addtable(ssjson,excelFile.name);
                    
					// this.excelIO.save(ssjson,(blob) => {
					// 	FileSaver.saveAs(blob, "test.xlsx");
					// }, (error) =>{
					// 	console.log(error);
					// });
				}
			}

        }
      }
    </script>
<style lang="less" scoped>
.sample-tutorial {
     position: relative;
     height: 100%;
     overflow: hidden;
}

.sample-spreadsheets {
    width: calc(100% - 280px);
    height: 100%;
    overflow: hidden;
    float: left;
}

.options-container {
    // float: right;
    // width: 280px;
    padding: 12px;
    height: 100%;
    box-sizing: border-box;
    background: #fbfbfb;
    overflow: auto;
    .options-row{
        display: flex;
    }
}

.sample-options {
    z-index: 1000;
}

.inputContainer {
    width: 100%;
    height: auto;
    border: 1px solid #eee;
    padding: 6px 12px;
    margin-bottom: 10px;
    box-sizing: border-box;
}

.input {
    font-size: 14px;
    height: 20px;
    border: 0;
    outline: none;
    background: transparent;
}

.button {
    height: 30px;
    padding: 6px 12px;
    width: 80px;
    margin-top: 6px;
}

.group {
    padding: 12px;
}

.group input {
    padding: 4px 12px;
}

</style>
<style scoped>
.spreadHost{
    width: 1800px;
    height: 600px;
     /* width: 100%; */
    /* height: 100%; */
}

</style>
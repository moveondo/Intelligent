import Vue from 'vue';
import axios from 'axios';



export default {



      async ModelDataServiceDeleteModelData(params={}){
        let res= await axios.post( '/analyzemanage/modelDataService/deleteModelData',params);
        return res.data;
      }
      ,
  


      async ModelDataServiceGetModelData(params={}){
        let res= await axios.post( '/analyzemanage/modelDataService/getModelData',params);
        return res.data;
      }
      ,
  


      async ModelDataServiceAddModelData(params={}){
        let res= await axios.post( '/analyzemanage/modelDataService/addModelData',params);
        return res.data;
      }
      ,
  


      async ModelDataServiceUpdateModelData(params={}){
        let res= await axios.post( '/analyzemanage/modelDataService/updateModelData',params);
        return res.data;
      }
      ,
  


      async ModelDataServiceUpdateManyModelData(params={}){
        let res= await axios.post( '/analyzemanage/modelDataService/updateManyModelData',params);
        return res.data;
      }
      ,
  


      async ModelDataServiceGetManyModelData(params={}){
        let res= await axios.post( '/analyzemanage/modelDataService/getManyModelData',params);
        return res.data;
      }
      ,
  


      async ModelDataServiceQueryModelData(params={}){
        let res= await axios.post( '/analyzemanage/modelDataService/queryModelData',params);
        return res.data;
      }
      ,
  



      async FinanceModelServiceDeleteFinanceModel(params={}){
        let res= await axios.post( '/analyzemanage/financeModelService/deleteFinanceModel',params);
        return res.data;
      }
      ,
  


      async FinanceModelServiceGetFinanceModel(params={}){
        let res= await axios.post( '/analyzemanage/financeModelService/getFinanceModel',params);
        return res.data;
      }
      ,
  


      async FinanceModelServiceAddFinanceModel(params={}){
        let res= await axios.post( '/analyzemanage/financeModelService/addFinanceModel',params);
        return res.data;
      }
      ,
  


      async FinanceModelServiceUpdateFinanceModel(params={}){
        let res= await axios.post( '/analyzemanage/financeModelService/updateFinanceModel',params);
        return res.data;
      }
      ,
  


      async FinanceModelServiceUpdateManyFinanceModel(params={}){
        let res= await axios.post( '/analyzemanage/financeModelService/updateManyFinanceModel',params);
        return res.data;
      }
      ,
  


      async FinanceModelServiceGetManyFinanceModel(params={}){
        let res= await axios.post( '/analyzemanage/financeModelService/getManyFinanceModel',params);
        return res.data;
      }
      ,
  


      async FinanceModelServiceQueryFinanceModel(params={}){
        let res= await axios.post( '/analyzemanage/financeModelService/queryFinanceModel',params);
        return res.data;
      }
      ,
  



      async JsDataServiceDeleteJsData(params={}){
        let res= await axios.post( '/analyzemanage/jsDataService/deleteJsData',params);
        return res.data;
      }
      ,
  


      async JsDataServiceGetJsData(params={}){
        let res= await axios.post( '/analyzemanage/jsDataService/getJsData',params);
        return res.data;
      }
      ,
  


      async JsDataServiceAddJsData(params={}){
        let res= await axios.post( '/analyzemanage/jsDataService/addJsData',params);
        return res.data;
      }
      ,
  


      async JsDataServiceUpdateJsData(params={}){
        let res= await axios.post( '/analyzemanage/jsDataService/updateJsData',params);
        return res.data;
      }
      ,
  


      async JsDataServiceUpdateManyJsData(params={}){
        let res= await axios.post( '/analyzemanage/jsDataService/updateManyJsData',params);
        return res.data;
      }
      ,
  


      async JsDataServiceGetManyJsData(params={}){
        let res= await axios.post( '/analyzemanage/jsDataService/getManyJsData',params);
        return res.data;
      }
      ,
  


      async JsDataServiceQueryJsData(params={}){
        let res= await axios.post( '/analyzemanage/jsDataService/queryJsData',params);
        return res.data;
      }
      ,
  



      async ChartDataManageServiceSaveAsChartJson(params={}){
        let res= await axios.post( '/analyzemanage/chartDataManageService/saveAsChartJson',params);
        return res.data;
      }
      ,
  


      async ChartDataManageServiceSaveOutputTemplate(params={}){
        let res= await axios.post( '/analyzemanage/chartDataManageService/saveOutputTemplate',params);
        return res.data;
      }
      ,
  



      async ShareDescriptionServiceDeleteShareDescription(params={}){
        let res= await axios.post( '/analyzemanage/shareDescriptionService/deleteShareDescription',params);
        return res.data;
      }
      ,
  


      async ShareDescriptionServiceGetShareDescription(params={}){
        let res= await axios.post( '/analyzemanage/shareDescriptionService/getShareDescription',params);
        return res.data;
      }
      ,
  


      async ShareDescriptionServiceAddShareDescription(params={}){
        let res= await axios.post( '/analyzemanage/shareDescriptionService/addShareDescription',params);
        return res.data;
      }
      ,
  


      async ShareDescriptionServiceUpdateShareDescription(params={}){
        let res= await axios.post( '/analyzemanage/shareDescriptionService/updateShareDescription',params);
        return res.data;
      }
      ,
  


      async ShareDescriptionServiceUpdateManyShareDescription(params={}){
        let res= await axios.post( '/analyzemanage/shareDescriptionService/updateManyShareDescription',params);
        return res.data;
      }
      ,
  


      async ShareDescriptionServiceGetManyShareDescription(params={}){
        let res= await axios.post( '/analyzemanage/shareDescriptionService/getManyShareDescription',params);
        return res.data;
      }
      ,
  


      async ShareDescriptionServiceQueryShareDescription(params={}){
        let res= await axios.post( '/analyzemanage/shareDescriptionService/queryShareDescription',params);
        return res.data;
      }
      ,
  



      async ModelDataMetaServiceDeleteModelDataMeta(params={}){
        let res= await axios.post( '/analyzemanage/modelDataMetaService/deleteModelDataMeta',params);
        return res.data;
      }
      ,
  


      async ModelDataMetaServiceGetModelDataMeta(params={}){
        let res= await axios.post( '/analyzemanage/modelDataMetaService/getModelDataMeta',params);
        return res.data;
      }
      ,
  


      async ModelDataMetaServiceAddModelDataMeta(params={}){
        let res= await axios.post( '/analyzemanage/modelDataMetaService/addModelDataMeta',params);
        return res.data;
      }
      ,
  


      async ModelDataMetaServiceUpdateModelDataMeta(params={}){
        let res= await axios.post( '/analyzemanage/modelDataMetaService/updateModelDataMeta',params);
        return res.data;
      }
      ,
  


      async ModelDataMetaServiceUpdateManyModelDataMeta(params={}){
        let res= await axios.post( '/analyzemanage/modelDataMetaService/updateManyModelDataMeta',params);
        return res.data;
      }
      ,
  


      async ModelDataMetaServiceGetManyModelDataMeta(params={}){
        let res= await axios.post( '/analyzemanage/modelDataMetaService/getManyModelDataMeta',params);
        return res.data;
      }
      ,
  


      async ModelDataMetaServiceQueryModelDataMeta(params={}){
        let res= await axios.post( '/analyzemanage/modelDataMetaService/queryModelDataMeta',params);
        return res.data;
      }
      ,
  



      async AnalyzeOpServiceGetHistoryData(params={}){
        let res= await axios.post( '/analyzemanage/analyzeOpService/getHistoryData',params);
        return res.data;
      }
      ,
  


      async AnalyzeOpServiceGetEstimateData(params={}){
        let res= await axios.post( '/analyzemanage/analyzeOpService/getEstimateData',params);
        return res.data;
      }
      ,
  


      async AnalyzeOpServiceSaveNCalculate(params={}){
        let res= await axios.post( '/analyzemanage/analyzeOpService/saveNCalculate',params);
        return res.data;
      }
      ,
  


      async AnalyzeOpServiceGetConclusionData(params={}){
        let res= await axios.post( '/analyzemanage/analyzeOpService/getConclusionData',params);
        return res.data;
      }
      ,
  


      async AnalyzeOpServiceGetAnalyzeData(params={}){
        let res= await axios.post( '/analyzemanage/analyzeOpService/getAnalyzeData',params);
        return res.data;
      }
      ,
  



      async ChartDataServiceDeleteChartData(params={}){
        let res= await axios.post( '/analyzemanage/chartDataService/deleteChartData',params);
        return res.data;
      }
      ,
  


      async ChartDataServiceGetChartData(params={}){
        let res= await axios.post( '/analyzemanage/chartDataService/getChartData',params);
        return res.data;
      }
      ,
  


      async ChartDataServiceAddChartData(params={}){
        let res= await axios.post( '/analyzemanage/chartDataService/addChartData',params);
        return res.data;
      }
      ,
  


      async ChartDataServiceUpdateChartData(params={}){
        let res= await axios.post( '/analyzemanage/chartDataService/updateChartData',params);
        return res.data;
      }
      ,
  


      async ChartDataServiceUpdateManyChartData(params={}){
        let res= await axios.post( '/analyzemanage/chartDataService/updateManyChartData',params);
        return res.data;
      }
      ,
  


      async ChartDataServiceGetManyChartData(params={}){
        let res= await axios.post( '/analyzemanage/chartDataService/getManyChartData',params);
        return res.data;
      }
      ,
  


      async ChartDataServiceQueryChartData(params={}){
        let res= await axios.post( '/analyzemanage/chartDataService/queryChartData',params);
        return res.data;
      }
      ,
  



      async ReportServiceGetConclusionRichText(params={}){
        let res= await axios.post( '/analyzemanage/reportService/getConclusionRichText',params);
        return res.data;
      }
      ,
  


      async ReportServiceSaveConclusionAsSection(params={}){
        let res= await axios.post( '/analyzemanage/reportService/saveConclusionAsSection',params);
        return res.data;
      }
      ,
  


      async ReportServiceGetModelOutputRichText(params={}){
        let res= await axios.post( '/analyzemanage/reportService/getModelOutputRichText',params);
        return res.data;
      }
      ,
  


      async ReportServiceTestOutputRichText(params={}){
        let res= await axios.post( '/analyzemanage/reportService/testOutputRichText',params);
        return res.data;
      }
      ,
  


      async ReportServiceGetPreViewRichText(params={}){
        let res= await axios.post( '/analyzemanage/reportService/getPreViewRichText',params);
        return res.data;
      }
      ,
  


      async ReportServiceGetRichTextByVariables(params={}){
        let res= await axios.post( '/analyzemanage/reportService/getRichTextByVariables',params);
        return res.data;
      }
      ,
  


      async ReportServiceGetCorpName(params={}){
        let res= await axios.post( '/analyzemanage/reportService/getCorpName',params);
        return res.data;
      }
      ,
  


      async ReportServiceReplaceRichTextByCharts(params={}){
        let res= await axios.post( '/analyzemanage/reportService/replaceRichTextByCharts',params);
        return res.data;
      }
      ,
  



      async HypersisServiceDeleteHypersis(params={}){
        let res= await axios.post( '/analyzemanage/hypersisService/deleteHypersis',params);
        return res.data;
      }
      ,
  


      async HypersisServiceGetHypersis(params={}){
        let res= await axios.post( '/analyzemanage/hypersisService/getHypersis',params);
        return res.data;
      }
      ,
  


      async HypersisServiceAddHypersis(params={}){
        let res= await axios.post( '/analyzemanage/hypersisService/addHypersis',params);
        return res.data;
      }
      ,
  


      async HypersisServiceUpdateHypersis(params={}){
        let res= await axios.post( '/analyzemanage/hypersisService/updateHypersis',params);
        return res.data;
      }
      ,
  


      async HypersisServiceUpdateManyHypersis(params={}){
        let res= await axios.post( '/analyzemanage/hypersisService/updateManyHypersis',params);
        return res.data;
      }
      ,
  


      async HypersisServiceGetManyHypersis(params={}){
        let res= await axios.post( '/analyzemanage/hypersisService/getManyHypersis',params);
        return res.data;
      }
      ,
  


      async HypersisServiceQueryHypersis(params={}){
        let res= await axios.post( '/analyzemanage/hypersisService/queryHypersis',params);
        return res.data;
      }
      ,
  



      async ReportChartServiceDeleteReportChart(params={}){
        let res= await axios.post( '/analyzemanage/reportChartService/deleteReportChart',params);
        return res.data;
      }
      ,
  


      async ReportChartServiceGetReportChart(params={}){
        let res= await axios.post( '/analyzemanage/reportChartService/getReportChart',params);
        return res.data;
      }
      ,
  


      async ReportChartServiceAddReportChart(params={}){
        let res= await axios.post( '/analyzemanage/reportChartService/addReportChart',params);
        return res.data;
      }
      ,
  


      async ReportChartServiceUpdateReportChart(params={}){
        let res= await axios.post( '/analyzemanage/reportChartService/updateReportChart',params);
        return res.data;
      }
      ,
  


      async ReportChartServiceUpdateManyReportChart(params={}){
        let res= await axios.post( '/analyzemanage/reportChartService/updateManyReportChart',params);
        return res.data;
      }
      ,
  


      async ReportChartServiceGetManyReportChart(params={}){
        let res= await axios.post( '/analyzemanage/reportChartService/getManyReportChart',params);
        return res.data;
      }
      ,
  


      async ReportChartServiceQueryReportChart(params={}){
        let res= await axios.post( '/analyzemanage/reportChartService/queryReportChart',params);
        return res.data;
      }
      ,
  



      async OutputTemplateServiceDeleteOutputTemplate(params={}){
        let res= await axios.post( '/analyzemanage/outputTemplateService/deleteOutputTemplate',params);
        return res.data;
      }
      ,
  


      async OutputTemplateServiceGetOutputTemplate(params={}){
        let res= await axios.post( '/analyzemanage/outputTemplateService/getOutputTemplate',params);
        return res.data;
      }
      ,
  


      async OutputTemplateServiceAddOutputTemplate(params={}){
        let res= await axios.post( '/analyzemanage/outputTemplateService/addOutputTemplate',params);
        return res.data;
      }
      ,
  


      async OutputTemplateServiceUpdateOutputTemplate(params={}){
        let res= await axios.post( '/analyzemanage/outputTemplateService/updateOutputTemplate',params);
        return res.data;
      }
      ,
  


      async OutputTemplateServiceUpdateManyOutputTemplate(params={}){
        let res= await axios.post( '/analyzemanage/outputTemplateService/updateManyOutputTemplate',params);
        return res.data;
      }
      ,
  


      async OutputTemplateServiceGetManyOutputTemplate(params={}){
        let res= await axios.post( '/analyzemanage/outputTemplateService/getManyOutputTemplate',params);
        return res.data;
      }
      ,
  


      async OutputTemplateServiceQueryOutputTemplate(params={}){
        let res= await axios.post( '/analyzemanage/outputTemplateService/queryOutputTemplate',params);
        return res.data;
      }
      ,
  



      async JobServiceCheckHealth(params={}){
        let res= await axios.post( '/analyzemanage/jobService/checkHealth',params);
        return res.data;
      }
      ,
  



      async ModelTemplateVariableServiceDeleteModelTemplateVariable(params={}){
        let res= await axios.post( '/analyzemanage/modelTemplateVariableService/deleteModelTemplateVariable',params);
        return res.data;
      }
      ,
  


      async ModelTemplateVariableServiceGetModelTemplateVariable(params={}){
        let res= await axios.post( '/analyzemanage/modelTemplateVariableService/getModelTemplateVariable',params);
        return res.data;
      }
      ,
  


      async ModelTemplateVariableServiceAddModelTemplateVariable(params={}){
        let res= await axios.post( '/analyzemanage/modelTemplateVariableService/addModelTemplateVariable',params);
        return res.data;
      }
      ,
  


      async ModelTemplateVariableServiceUpdateModelTemplateVariable(params={}){
        let res= await axios.post( '/analyzemanage/modelTemplateVariableService/updateModelTemplateVariable',params);
        return res.data;
      }
      ,
  


      async ModelTemplateVariableServiceUpdateManyModelTemplateVariable(params={}){
        let res= await axios.post( '/analyzemanage/modelTemplateVariableService/updateManyModelTemplateVariable',params);
        return res.data;
      }
      ,
  


      async ModelTemplateVariableServiceGetManyModelTemplateVariable(params={}){
        let res= await axios.post( '/analyzemanage/modelTemplateVariableService/getManyModelTemplateVariable',params);
        return res.data;
      }
      ,
  


      async ModelTemplateVariableServiceQueryModelTemplateVariable(params={}){
        let res= await axios.post( '/analyzemanage/modelTemplateVariableService/queryModelTemplateVariable',params);
        return res.data;
      }
      ,
  



      async AnalyzeServiceDeleteAnalyze(params={}){
        let res= await axios.post( '/analyzemanage/analyzeService/deleteAnalyze',params);
        return res.data;
      }
      ,
  


      async AnalyzeServiceGetAnalyze(params={}){
        let res= await axios.post( '/analyzemanage/analyzeService/getAnalyze',params);
        return res.data;
      }
      ,
  


      async AnalyzeServiceAddAnalyze(params={}){
        let res= await axios.post( '/analyzemanage/analyzeService/addAnalyze',params);
        return res.data;
      }
      ,
  


      async AnalyzeServiceUpdateAnalyze(params={}){
        let res= await axios.post( '/analyzemanage/analyzeService/updateAnalyze',params);
        return res.data;
      }
      ,
  


      async AnalyzeServiceUpdateManyAnalyze(params={}){
        let res= await axios.post( '/analyzemanage/analyzeService/updateManyAnalyze',params);
        return res.data;
      }
      ,
  


      async AnalyzeServiceGetManyAnalyze(params={}){
        let res= await axios.post( '/analyzemanage/analyzeService/getManyAnalyze',params);
        return res.data;
      }
      ,
  


      async AnalyzeServiceQueryAnalyze(params={}){
        let res= await axios.post( '/analyzemanage/analyzeService/queryAnalyze',params);
        return res.data;
      }
      ,
  



}

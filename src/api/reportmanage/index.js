import Vue from 'vue';
import axios from 'axios';



export default {



      async ReportServiceDeleteReport(params={}){
        let res= await axios.post( '/reportmanage/reportService/deleteReport',params);
        return res.data;
      }
      ,
  


      async ReportServiceGetReport(params={}){
        let res= await axios.post( '/reportmanage/reportService/getReport',params);
        return res.data;
      }
      ,
  


      async ReportServiceAddReport(params={}){
        let res= await axios.post( '/reportmanage/reportService/addReport',params);
        return res.data;
      }
      ,
  


      async ReportServiceUpdateReport(params={}){
        let res= await axios.post( '/reportmanage/reportService/updateReport',params);
        return res.data;
      }
      ,
  


      async ReportServiceUpdateManyReport(params={}){
        let res= await axios.post( '/reportmanage/reportService/updateManyReport',params);
        return res.data;
      }
      ,
  


      async ReportServiceGetManyReport(params={}){
        let res= await axios.post( '/reportmanage/reportService/getManyReport',params);
        return res.data;
      }
      ,
  


      async ReportServiceQueryReport(params={}){
        let res= await axios.post( '/reportmanage/reportService/queryReport',params);
        return res.data;
      }
      ,
  



      async ReportTemplateVaribleServiceDeleteReportTemplateVarible(params={}){
        let res= await axios.post( '/reportmanage/reportTemplateVaribleService/deleteReportTemplateVarible',params);
        return res.data;
      }
      ,
  


      async ReportTemplateVaribleServiceGetReportTemplateVarible(params={}){
        let res= await axios.post( '/reportmanage/reportTemplateVaribleService/getReportTemplateVarible',params);
        return res.data;
      }
      ,
  


      async ReportTemplateVaribleServiceAddReportTemplateVarible(params={}){
        let res= await axios.post( '/reportmanage/reportTemplateVaribleService/addReportTemplateVarible',params);
        return res.data;
      }
      ,
  


      async ReportTemplateVaribleServiceUpdateReportTemplateVarible(params={}){
        let res= await axios.post( '/reportmanage/reportTemplateVaribleService/updateReportTemplateVarible',params);
        return res.data;
      }
      ,
  


      async ReportTemplateVaribleServiceUpdateManyReportTemplateVarible(params={}){
        let res= await axios.post( '/reportmanage/reportTemplateVaribleService/updateManyReportTemplateVarible',params);
        return res.data;
      }
      ,
  


      async ReportTemplateVaribleServiceGetManyReportTemplateVarible(params={}){
        let res= await axios.post( '/reportmanage/reportTemplateVaribleService/getManyReportTemplateVarible',params);
        return res.data;
      }
      ,
  


      async ReportTemplateVaribleServiceQueryReportTemplateVarible(params={}){
        let res= await axios.post( '/reportmanage/reportTemplateVaribleService/queryReportTemplateVarible',params);
        return res.data;
      }
      ,
  



      async ReportManageServiceSaveAsTemplate(params={}){
        let res= await axios.post( '/reportmanage/reportManageService/saveAsTemplate',params);
        return res.data;
      }
      ,
  


      async ReportManageServiceCreateFromTemplate(params={}){
        let res= await axios.post( '/reportmanage/reportManageService/createFromTemplate',params);
        return res.data;
      }
      ,
  


      async ReportManageServicePreCreateReport(params={}){
        let res= await axios.post( '/reportmanage/reportManageService/preCreateReport',params);
        return res.data;
      }
      ,
  


      async ReportManageServiceCreateReport(params={}){
        let res= await axios.post( '/reportmanage/reportManageService/createReport',params);
        return res.data;
      }
      ,
  


      async ReportManageServiceGetCharts(params={}){
        let res= await axios.post( '/reportmanage/reportManageService/getCharts',params);
        return res.data;
      }
      ,
  


      async ReportManageServiceGetChartsBy(params={}){
        let res= await axios.post( '/reportmanage/reportManageService/getChartsBy',params);
        return res.data;
      }
      ,
  


      async ReportManageServiceCreateFmSection(params={}){
        let res= await axios.post( '/reportmanage/reportManageService/createFmSection',params);
        return res.data;
      }
      ,
  


      async ReportManageServiceDraftUpdateSection(params={}){
        let res= await axios.post( '/reportmanage/reportManageService/draftUpdateSection',params);
        return res.data;
      }
      ,
  


      async ReportManageServiceImportAnalyzeAspect(params={}){
        let res= await axios.post( '/reportmanage/reportManageService/importAnalyzeAspect',params);
        return res.data;
      }
      ,
  


      async ReportManageServiceAsyncCreateReport(params={}){
        let res= await axios.post( '/reportmanage/reportManageService/asyncCreateReport',params);
        return res.data;
      }
      ,
  


      async ReportManageServiceAsyncCreateFmSection(params={}){
        let res= await axios.post( '/reportmanage/reportManageService/asyncCreateFmSection',params);
        return res.data;
      }
      ,
  



      async UserReportDraftManageUpdateUserReportDraft(params={}){
        let res= await axios.post( '/reportmanage/userReportDraftManage/updateUserReportDraft',params);
        return res.data;
      }
      ,
  



      async RenewSectionAddAddSection(params={}){
        let res= await axios.post( '/reportmanage/renewSectionAdd/addSection',params);
        return res.data;
      }
      ,
  



      async SectionTreeServiceGetSectionTree(params={}){
        let res= await axios.post( '/reportmanage/sectionTreeService/getSectionTree',params);
        return res.data;
      }
      ,
  



      async RenewTemplateSectionTreeSortUpdateSort(params={}){
        let res= await axios.post( '/reportmanage/renewTemplateSectionTreeSort/updateSort',params);
        return res.data;
      }
      ,
  



      async TemplateVaribleValueServiceDeleteTemplateVaribleValue(params={}){
        let res= await axios.post( '/reportmanage/templateVaribleValueService/deleteTemplateVaribleValue',params);
        return res.data;
      }
      ,
  


      async TemplateVaribleValueServiceGetTemplateVaribleValue(params={}){
        let res= await axios.post( '/reportmanage/templateVaribleValueService/getTemplateVaribleValue',params);
        return res.data;
      }
      ,
  


      async TemplateVaribleValueServiceAddTemplateVaribleValue(params={}){
        let res= await axios.post( '/reportmanage/templateVaribleValueService/addTemplateVaribleValue',params);
        return res.data;
      }
      ,
  


      async TemplateVaribleValueServiceUpdateTemplateVaribleValue(params={}){
        let res= await axios.post( '/reportmanage/templateVaribleValueService/updateTemplateVaribleValue',params);
        return res.data;
      }
      ,
  


      async TemplateVaribleValueServiceUpdateManyTemplateVaribleValue(params={}){
        let res= await axios.post( '/reportmanage/templateVaribleValueService/updateManyTemplateVaribleValue',params);
        return res.data;
      }
      ,
  


      async TemplateVaribleValueServiceGetManyTemplateVaribleValue(params={}){
        let res= await axios.post( '/reportmanage/templateVaribleValueService/getManyTemplateVaribleValue',params);
        return res.data;
      }
      ,
  


      async TemplateVaribleValueServiceQueryTemplateVaribleValue(params={}){
        let res= await axios.post( '/reportmanage/templateVaribleValueService/queryTemplateVaribleValue',params);
        return res.data;
      }
      ,
  



      async ChartDataServiceDeleteChartData(params={}){
        let res= await axios.post( '/reportmanage/chartDataService/deleteChartData',params);
        return res.data;
      }
      ,
  


      async ChartDataServiceGetChartData(params={}){
        let res= await axios.post( '/reportmanage/chartDataService/getChartData',params);
        return res.data;
      }
      ,
  


      async ChartDataServiceAddChartData(params={}){
        let res= await axios.post( '/reportmanage/chartDataService/addChartData',params);
        return res.data;
      }
      ,
  


      async ChartDataServiceUpdateChartData(params={}){
        let res= await axios.post( '/reportmanage/chartDataService/updateChartData',params);
        return res.data;
      }
      ,
  


      async ChartDataServiceUpdateManyChartData(params={}){
        let res= await axios.post( '/reportmanage/chartDataService/updateManyChartData',params);
        return res.data;
      }
      ,
  


      async ChartDataServiceGetManyChartData(params={}){
        let res= await axios.post( '/reportmanage/chartDataService/getManyChartData',params);
        return res.data;
      }
      ,
  


      async ChartDataServiceQueryChartData(params={}){
        let res= await axios.post( '/reportmanage/chartDataService/queryChartData',params);
        return res.data;
      }
      ,
  



      async CoverManageServiceUpdateCover(params={}){
        let res= await axios.post( '/reportmanage/coverManageService/updateCover',params);
        return res.data;
      }
      ,
  


      async CoverManageServiceAddCover(params={}){
        let res= await axios.post( '/reportmanage/coverManageService/addCover',params);
        return res.data;
      }
      ,
  



      async RenewTemplateSectionAddAddTemplateSection(params={}){
        let res= await axios.post( '/reportmanage/renewTemplateSectionAdd/addTemplateSection',params);
        return res.data;
      }
      ,
  



      async ReportVariableServiceDeleteReportVariable(params={}){
        let res= await axios.post( '/reportmanage/reportVariableService/deleteReportVariable',params);
        return res.data;
      }
      ,
  


      async ReportVariableServiceGetReportVariable(params={}){
        let res= await axios.post( '/reportmanage/reportVariableService/getReportVariable',params);
        return res.data;
      }
      ,
  


      async ReportVariableServiceAddReportVariable(params={}){
        let res= await axios.post( '/reportmanage/reportVariableService/addReportVariable',params);
        return res.data;
      }
      ,
  


      async ReportVariableServiceUpdateReportVariable(params={}){
        let res= await axios.post( '/reportmanage/reportVariableService/updateReportVariable',params);
        return res.data;
      }
      ,
  


      async ReportVariableServiceUpdateManyReportVariable(params={}){
        let res= await axios.post( '/reportmanage/reportVariableService/updateManyReportVariable',params);
        return res.data;
      }
      ,
  


      async ReportVariableServiceGetManyReportVariable(params={}){
        let res= await axios.post( '/reportmanage/reportVariableService/getManyReportVariable',params);
        return res.data;
      }
      ,
  


      async ReportVariableServiceQueryReportVariable(params={}){
        let res= await axios.post( '/reportmanage/reportVariableService/queryReportVariable',params);
        return res.data;
      }
      ,
  



      async SectionManageServiceReplaceImg(params={}){
        let res= await axios.post( '/reportmanage/sectionManageService/replaceImg',params);
        return res.data;
      }
      ,
  


      async SectionManageServiceRewriteSectionDelete(params={}){
        let res= await axios.post( '/reportmanage/sectionManageService/rewriteSectionDelete',params);
        return res.data;
      }
      ,
  



      async SectionElementServiceDeleteSectionElement(params={}){
        let res= await axios.post( '/reportmanage/sectionElementService/deleteSectionElement',params);
        return res.data;
      }
      ,
  


      async SectionElementServiceGetSectionElement(params={}){
        let res= await axios.post( '/reportmanage/sectionElementService/getSectionElement',params);
        return res.data;
      }
      ,
  


      async SectionElementServiceAddSectionElement(params={}){
        let res= await axios.post( '/reportmanage/sectionElementService/addSectionElement',params);
        return res.data;
      }
      ,
  


      async SectionElementServiceUpdateSectionElement(params={}){
        let res= await axios.post( '/reportmanage/sectionElementService/updateSectionElement',params);
        return res.data;
      }
      ,
  


      async SectionElementServiceUpdateManySectionElement(params={}){
        let res= await axios.post( '/reportmanage/sectionElementService/updateManySectionElement',params);
        return res.data;
      }
      ,
  


      async SectionElementServiceGetManySectionElement(params={}){
        let res= await axios.post( '/reportmanage/sectionElementService/getManySectionElement',params);
        return res.data;
      }
      ,
  


      async SectionElementServiceQuerySectionElement(params={}){
        let res= await axios.post( '/reportmanage/sectionElementService/querySectionElement',params);
        return res.data;
      }
      ,
  



      async TemplateProcessServicePreCreateFmSectionTemplate(params={}){
        let res= await axios.post( '/reportmanage/templateProcessService/preCreateFmSectionTemplate',params);
        return res.data;
      }
      ,
  


      async TemplateProcessServiceCreateFmSectionTemplate(params={}){
        let res= await axios.post( '/reportmanage/templateProcessService/createFmSectionTemplate',params);
        return res.data;
      }
      ,
  


      async TemplateProcessServiceQueryReportTemplateVaribleById(params={}){
        let res= await axios.post( '/reportmanage/templateProcessService/queryReportTemplateVaribleById',params);
        return res.data;
      }
      ,
  


      async TemplateProcessServiceUpdateReportTemplateVaribles(params={}){
        let res= await axios.post( '/reportmanage/templateProcessService/updateReportTemplateVaribles',params);
        return res.data;
      }
      ,
  



      async TemplateOutputVaribleServiceDeleteTemplateOutputVarible(params={}){
        let res= await axios.post( '/reportmanage/templateOutputVaribleService/deleteTemplateOutputVarible',params);
        return res.data;
      }
      ,
  


      async TemplateOutputVaribleServiceGetTemplateOutputVarible(params={}){
        let res= await axios.post( '/reportmanage/templateOutputVaribleService/getTemplateOutputVarible',params);
        return res.data;
      }
      ,
  


      async TemplateOutputVaribleServiceAddTemplateOutputVarible(params={}){
        let res= await axios.post( '/reportmanage/templateOutputVaribleService/addTemplateOutputVarible',params);
        return res.data;
      }
      ,
  


      async TemplateOutputVaribleServiceUpdateTemplateOutputVarible(params={}){
        let res= await axios.post( '/reportmanage/templateOutputVaribleService/updateTemplateOutputVarible',params);
        return res.data;
      }
      ,
  


      async TemplateOutputVaribleServiceUpdateManyTemplateOutputVarible(params={}){
        let res= await axios.post( '/reportmanage/templateOutputVaribleService/updateManyTemplateOutputVarible',params);
        return res.data;
      }
      ,
  


      async TemplateOutputVaribleServiceGetManyTemplateOutputVarible(params={}){
        let res= await axios.post( '/reportmanage/templateOutputVaribleService/getManyTemplateOutputVarible',params);
        return res.data;
      }
      ,
  


      async TemplateOutputVaribleServiceQueryTemplateOutputVarible(params={}){
        let res= await axios.post( '/reportmanage/templateOutputVaribleService/queryTemplateOutputVarible',params);
        return res.data;
      }
      ,
  



      async TemplateSectionServiceDeleteTemplateSection(params={}){
        let res= await axios.post( '/reportmanage/templateSectionService/deleteTemplateSection',params);
        return res.data;
      }
      ,
  


      async TemplateSectionServiceGetTemplateSection(params={}){
        let res= await axios.post( '/reportmanage/templateSectionService/getTemplateSection',params);
        return res.data;
      }
      ,
  


      async TemplateSectionServiceAddTemplateSection(params={}){
        let res= await axios.post( '/reportmanage/templateSectionService/addTemplateSection',params);
        return res.data;
      }
      ,
  


      async TemplateSectionServiceUpdateTemplateSection(params={}){
        let res= await axios.post( '/reportmanage/templateSectionService/updateTemplateSection',params);
        return res.data;
      }
      ,
  


      async TemplateSectionServiceUpdateManyTemplateSection(params={}){
        let res= await axios.post( '/reportmanage/templateSectionService/updateManyTemplateSection',params);
        return res.data;
      }
      ,
  


      async TemplateSectionServiceGetManyTemplateSection(params={}){
        let res= await axios.post( '/reportmanage/templateSectionService/getManyTemplateSection',params);
        return res.data;
      }
      ,
  


      async TemplateSectionServiceQueryTemplateSection(params={}){
        let res= await axios.post( '/reportmanage/templateSectionService/queryTemplateSection',params);
        return res.data;
      }
      ,
  



      async UserReportDraftServiceDeleteUserReportDraft(params={}){
        let res= await axios.post( '/reportmanage/userReportDraftService/deleteUserReportDraft',params);
        return res.data;
      }
      ,
  


      async UserReportDraftServiceGetUserReportDraft(params={}){
        let res= await axios.post( '/reportmanage/userReportDraftService/getUserReportDraft',params);
        return res.data;
      }
      ,
  


      async UserReportDraftServiceAddUserReportDraft(params={}){
        let res= await axios.post( '/reportmanage/userReportDraftService/addUserReportDraft',params);
        return res.data;
      }
      ,
  


      async UserReportDraftServiceUpdateUserReportDraft(params={}){
        let res= await axios.post( '/reportmanage/userReportDraftService/updateUserReportDraft',params);
        return res.data;
      }
      ,
  


      async UserReportDraftServiceUpdateManyUserReportDraft(params={}){
        let res= await axios.post( '/reportmanage/userReportDraftService/updateManyUserReportDraft',params);
        return res.data;
      }
      ,
  


      async UserReportDraftServiceGetManyUserReportDraft(params={}){
        let res= await axios.post( '/reportmanage/userReportDraftService/getManyUserReportDraft',params);
        return res.data;
      }
      ,
  


      async UserReportDraftServiceQueryUserReportDraft(params={}){
        let res= await axios.post( '/reportmanage/userReportDraftService/queryUserReportDraft',params);
        return res.data;
      }
      ,
  



      async CoverServiceDeleteCover(params={}){
        let res= await axios.post( '/reportmanage/coverService/deleteCover',params);
        return res.data;
      }
      ,
  


      async CoverServiceGetCover(params={}){
        let res= await axios.post( '/reportmanage/coverService/getCover',params);
        return res.data;
      }
      ,
  


      async CoverServiceAddCover(params={}){
        let res= await axios.post( '/reportmanage/coverService/addCover',params);
        return res.data;
      }
      ,
  


      async CoverServiceUpdateCover(params={}){
        let res= await axios.post( '/reportmanage/coverService/updateCover',params);
        return res.data;
      }
      ,
  


      async CoverServiceUpdateManyCover(params={}){
        let res= await axios.post( '/reportmanage/coverService/updateManyCover',params);
        return res.data;
      }
      ,
  


      async CoverServiceGetManyCover(params={}){
        let res= await axios.post( '/reportmanage/coverService/getManyCover',params);
        return res.data;
      }
      ,
  


      async CoverServiceQueryCover(params={}){
        let res= await axios.post( '/reportmanage/coverService/queryCover',params);
        return res.data;
      }
      ,
  



      async SectionServiceDeleteSection(params={}){
        let res= await axios.post( '/reportmanage/sectionService/deleteSection',params);
        return res.data;
      }
      ,
  


      async SectionServiceGetSection(params={}){
        let res= await axios.post( '/reportmanage/sectionService/getSection',params);
        return res.data;
      }
      ,
  


      async SectionServiceAddSection(params={}){
        let res= await axios.post( '/reportmanage/sectionService/addSection',params);
        return res.data;
      }
      ,
  


      async SectionServiceUpdateSection(params={}){
        let res= await axios.post( '/reportmanage/sectionService/updateSection',params);
        return res.data;
      }
      ,
  


      async SectionServiceUpdateManySection(params={}){
        let res= await axios.post( '/reportmanage/sectionService/updateManySection',params);
        return res.data;
      }
      ,
  


      async SectionServiceGetManySection(params={}){
        let res= await axios.post( '/reportmanage/sectionService/getManySection',params);
        return res.data;
      }
      ,
  


      async SectionServiceQuerySection(params={}){
        let res= await axios.post( '/reportmanage/sectionService/querySection',params);
        return res.data;
      }
      ,
  



      async ReportTemplateServiceDeleteReportTemplate(params={}){
        let res= await axios.post( '/reportmanage/reportTemplateService/deleteReportTemplate',params);
        return res.data;
      }
      ,
  


      async ReportTemplateServiceGetReportTemplate(params={}){
        let res= await axios.post( '/reportmanage/reportTemplateService/getReportTemplate',params);
        return res.data;
      }
      ,
  


      async ReportTemplateServiceAddReportTemplate(params={}){
        let res= await axios.post( '/reportmanage/reportTemplateService/addReportTemplate',params);
        return res.data;
      }
      ,
  


      async ReportTemplateServiceUpdateReportTemplate(params={}){
        let res= await axios.post( '/reportmanage/reportTemplateService/updateReportTemplate',params);
        return res.data;
      }
      ,
  


      async ReportTemplateServiceUpdateManyReportTemplate(params={}){
        let res= await axios.post( '/reportmanage/reportTemplateService/updateManyReportTemplate',params);
        return res.data;
      }
      ,
  


      async ReportTemplateServiceGetManyReportTemplate(params={}){
        let res= await axios.post( '/reportmanage/reportTemplateService/getManyReportTemplate',params);
        return res.data;
      }
      ,
  


      async ReportTemplateServiceQueryReportTemplate(params={}){
        let res= await axios.post( '/reportmanage/reportTemplateService/queryReportTemplate',params);
        return res.data;
      }
      ,
  



      async ReportCorpAnalyzeServiceDeleteReportCorpAnalyze(params={}){
        let res= await axios.post( '/reportmanage/reportCorpAnalyzeService/deleteReportCorpAnalyze',params);
        return res.data;
      }
      ,
  


      async ReportCorpAnalyzeServiceGetReportCorpAnalyze(params={}){
        let res= await axios.post( '/reportmanage/reportCorpAnalyzeService/getReportCorpAnalyze',params);
        return res.data;
      }
      ,
  


      async ReportCorpAnalyzeServiceAddReportCorpAnalyze(params={}){
        let res= await axios.post( '/reportmanage/reportCorpAnalyzeService/addReportCorpAnalyze',params);
        return res.data;
      }
      ,
  


      async ReportCorpAnalyzeServiceUpdateReportCorpAnalyze(params={}){
        let res= await axios.post( '/reportmanage/reportCorpAnalyzeService/updateReportCorpAnalyze',params);
        return res.data;
      }
      ,
  


      async ReportCorpAnalyzeServiceUpdateManyReportCorpAnalyze(params={}){
        let res= await axios.post( '/reportmanage/reportCorpAnalyzeService/updateManyReportCorpAnalyze',params);
        return res.data;
      }
      ,
  


      async ReportCorpAnalyzeServiceGetManyReportCorpAnalyze(params={}){
        let res= await axios.post( '/reportmanage/reportCorpAnalyzeService/getManyReportCorpAnalyze',params);
        return res.data;
      }
      ,
  


      async ReportCorpAnalyzeServiceQueryReportCorpAnalyze(params={}){
        let res= await axios.post( '/reportmanage/reportCorpAnalyzeService/queryReportCorpAnalyze',params);
        return res.data;
      }
      ,
  



      async JobServiceCheckHealth(params={}){
        let res= await axios.post( '/reportmanage/jobService/checkHealth',params);
        return res.data;
      }
      ,
  



      async DataDictionaryServiceDeleteDataDictionary(params={}){
        let res= await axios.post( '/reportmanage/dataDictionaryService/deleteDataDictionary',params);
        return res.data;
      }
      ,
  


      async DataDictionaryServiceGetDataDictionary(params={}){
        let res= await axios.post( '/reportmanage/dataDictionaryService/getDataDictionary',params);
        return res.data;
      }
      ,
  


      async DataDictionaryServiceAddDataDictionary(params={}){
        let res= await axios.post( '/reportmanage/dataDictionaryService/addDataDictionary',params);
        return res.data;
      }
      ,
  


      async DataDictionaryServiceUpdateDataDictionary(params={}){
        let res= await axios.post( '/reportmanage/dataDictionaryService/updateDataDictionary',params);
        return res.data;
      }
      ,
  


      async DataDictionaryServiceUpdateManyDataDictionary(params={}){
        let res= await axios.post( '/reportmanage/dataDictionaryService/updateManyDataDictionary',params);
        return res.data;
      }
      ,
  


      async DataDictionaryServiceGetManyDataDictionary(params={}){
        let res= await axios.post( '/reportmanage/dataDictionaryService/getManyDataDictionary',params);
        return res.data;
      }
      ,
  


      async DataDictionaryServiceQueryDataDictionary(params={}){
        let res= await axios.post( '/reportmanage/dataDictionaryService/queryDataDictionary',params);
        return res.data;
      }
      ,
  



      async TemplateSectionManageServiceRewriteTemplateSectionDelete(params={}){
        let res= await axios.post( '/reportmanage/templateSectionManageService/rewriteTemplateSectionDelete',params);
        return res.data;
      }
      ,
  



      async RenewSectionTreeSortUpdateSort(params={}){
        let res= await axios.post( '/reportmanage/renewSectionTreeSort/updateSort',params);
        return res.data;
      }
      ,
  



      async TemplateSectionTreeServiceGetTemplateSectionTree(params={}){
        let res= await axios.post( '/reportmanage/templateSectionTreeService/getTemplateSectionTree',params);
        return res.data;
      }
      ,
  



      async ChartDataManageServiceSaveAsChartJson(params={}){
        let res= await axios.post( '/reportmanage/chartDataManageService/saveAsChartJson',params);
        return res.data;
      }
      ,
  



}

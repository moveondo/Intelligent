import api from '../../api/analyzemanage';

const state = {}

const getters = {}

const mutations = {}

const actions = {


	  async AC_ModelDataServiceDeleteModelData ({dispatch, commit}, params) {
	    return api.ModelDataServiceDeleteModelData(params)
	      .then(res => {
	        return res
	      })
	      .catch(err => {
	      })
	      .finally(() => {
	      })
	  },

	  async AC_ModelDataServiceGetModelData ({dispatch, commit}, params) {
	    return api.ModelDataServiceGetModelData(params)
	      .then(res => {
	        return res
	      })
	      .catch(err => {
	      })
	      .finally(() => {
	      })
	  },

	  async AC_ModelDataServiceAddModelData ({dispatch, commit}, params) {
	    return api.ModelDataServiceAddModelData(params)
	      .then(res => {
	        return res
	      })
	      .catch(err => {
	      })
	      .finally(() => {
	      })
	  },

	  async AC_ModelDataServiceUpdateModelData ({dispatch, commit}, params) {
	    return api.ModelDataServiceUpdateModelData(params)
	      .then(res => {
	        return res
	      })
	      .catch(err => {
	      })
	      .finally(() => {
	      })
	  },

	  async AC_ModelDataServiceUpdateManyModelData ({dispatch, commit}, params) {
	    return api.ModelDataServiceUpdateManyModelData(params)
	      .then(res => {
	        return res
	      })
	      .catch(err => {
	      })
	      .finally(() => {
	      })
	  },

	  async AC_ModelDataServiceGetManyModelData ({dispatch, commit}, params) {
	    return api.ModelDataServiceGetManyModelData(params)
	      .then(res => {
	        return res
	      })
	      .catch(err => {
	      })
	      .finally(() => {
	      })
	  },

	  async AC_ModelDataServiceQueryModelData ({dispatch, commit}, params) {
	    return api.ModelDataServiceQueryModelData(params)
	      .then(res => {
	        return res
	      })
	      .catch(err => {
	      })
	      .finally(() => {
	      })
	  },

	  async AC_FinanceModelServiceDeleteFinanceModel ({dispatch, commit}, params) {
	    return api.FinanceModelServiceDeleteFinanceModel(params)
	      .then(res => {
	        return res
	      })
	      .catch(err => {
	      })
	      .finally(() => {
	      })
	  },

	  async AC_FinanceModelServiceGetFinanceModel ({dispatch, commit}, params) {
	    return api.FinanceModelServiceGetFinanceModel(params)
	      .then(res => {
	        return res
	      })
	      .catch(err => {
	      })
	      .finally(() => {
	      })
	  },

	  async AC_FinanceModelServiceAddFinanceModel ({dispatch, commit}, params) {
	    return api.FinanceModelServiceAddFinanceModel(params)
	      .then(res => {
	        return res
	      })
	      .catch(err => {
	      })
	      .finally(() => {
	      })
	  },

	  async AC_FinanceModelServiceUpdateFinanceModel ({dispatch, commit}, params) {
	    return api.FinanceModelServiceUpdateFinanceModel(params)
	      .then(res => {
	        return res
	      })
	      .catch(err => {
	      })
	      .finally(() => {
	      })
	  },

	  async AC_FinanceModelServiceUpdateManyFinanceModel ({dispatch, commit}, params) {
	    return api.FinanceModelServiceUpdateManyFinanceModel(params)
	      .then(res => {
	        return res
	      })
	      .catch(err => {
	      })
	      .finally(() => {
	      })
	  },

	  async AC_FinanceModelServiceGetManyFinanceModel ({dispatch, commit}, params) {
	    return api.FinanceModelServiceGetManyFinanceModel(params)
	      .then(res => {
	        return res
	      })
	      .catch(err => {
	      })
	      .finally(() => {
	      })
	  },

	  async AC_FinanceModelServiceQueryFinanceModel ({dispatch, commit}, params) {
	    return api.FinanceModelServiceQueryFinanceModel(params)
	      .then(res => {
	        return res
	      })
	      .catch(err => {
	      })
	      .finally(() => {
	      })
	  },

	  async AC_JsDataServiceDeleteJsData ({dispatch, commit}, params) {
	    return api.JsDataServiceDeleteJsData(params)
	      .then(res => {
	        return res
	      })
	      .catch(err => {
	      })
	      .finally(() => {
	      })
	  },

	  async AC_JsDataServiceGetJsData ({dispatch, commit}, params) {
	    return api.JsDataServiceGetJsData(params)
	      .then(res => {
	        return res
	      })
	      .catch(err => {
	      })
	      .finally(() => {
	      })
	  },

	  async AC_JsDataServiceAddJsData ({dispatch, commit}, params) {
	    return api.JsDataServiceAddJsData(params)
	      .then(res => {
	        return res
	      })
	      .catch(err => {
	      })
	      .finally(() => {
	      })
	  },

	  async AC_JsDataServiceUpdateJsData ({dispatch, commit}, params) {
	    return api.JsDataServiceUpdateJsData(params)
	      .then(res => {
	        return res
	      })
	      .catch(err => {
	      })
	      .finally(() => {
	      })
	  },

	  async AC_JsDataServiceUpdateManyJsData ({dispatch, commit}, params) {
	    return api.JsDataServiceUpdateManyJsData(params)
	      .then(res => {
	        return res
	      })
	      .catch(err => {
	      })
	      .finally(() => {
	      })
	  },

	  async AC_JsDataServiceGetManyJsData ({dispatch, commit}, params) {
	    return api.JsDataServiceGetManyJsData(params)
	      .then(res => {
	        return res
	      })
	      .catch(err => {
	      })
	      .finally(() => {
	      })
	  },

	  async AC_JsDataServiceQueryJsData ({dispatch, commit}, params) {
	    return api.JsDataServiceQueryJsData(params)
	      .then(res => {
	        return res
	      })
	      .catch(err => {
	      })
	      .finally(() => {
	      })
	  },

	  async AC_ChartDataManageServiceSaveAsChartJson ({dispatch, commit}, params) {
	    return api.ChartDataManageServiceSaveAsChartJson(params)
	      .then(res => {
	        return res
	      })
	      .catch(err => {
	      })
	      .finally(() => {
	      })
	  },

	  async AC_ChartDataManageServiceSaveOutputTemplate ({dispatch, commit}, params) {
	    return api.ChartDataManageServiceSaveOutputTemplate(params)
	      .then(res => {
	        return res
	      })
	      .catch(err => {
	      })
	      .finally(() => {
	      })
	  },

	  async AC_ShareDescriptionServiceDeleteShareDescription ({dispatch, commit}, params) {
	    return api.ShareDescriptionServiceDeleteShareDescription(params)
	      .then(res => {
	        return res
	      })
	      .catch(err => {
	      })
	      .finally(() => {
	      })
	  },

	  async AC_ShareDescriptionServiceGetShareDescription ({dispatch, commit}, params) {
	    return api.ShareDescriptionServiceGetShareDescription(params)
	      .then(res => {
	        return res
	      })
	      .catch(err => {
	      })
	      .finally(() => {
	      })
	  },

	  async AC_ShareDescriptionServiceAddShareDescription ({dispatch, commit}, params) {
	    return api.ShareDescriptionServiceAddShareDescription(params)
	      .then(res => {
	        return res
	      })
	      .catch(err => {
	      })
	      .finally(() => {
	      })
	  },

	  async AC_ShareDescriptionServiceUpdateShareDescription ({dispatch, commit}, params) {
	    return api.ShareDescriptionServiceUpdateShareDescription(params)
	      .then(res => {
	        return res
	      })
	      .catch(err => {
	      })
	      .finally(() => {
	      })
	  },

	  async AC_ShareDescriptionServiceUpdateManyShareDescription ({dispatch, commit}, params) {
	    return api.ShareDescriptionServiceUpdateManyShareDescription(params)
	      .then(res => {
	        return res
	      })
	      .catch(err => {
	      })
	      .finally(() => {
	      })
	  },

	  async AC_ShareDescriptionServiceGetManyShareDescription ({dispatch, commit}, params) {
	    return api.ShareDescriptionServiceGetManyShareDescription(params)
	      .then(res => {
	        return res
	      })
	      .catch(err => {
	      })
	      .finally(() => {
	      })
	  },

	  async AC_ShareDescriptionServiceQueryShareDescription ({dispatch, commit}, params) {
	    return api.ShareDescriptionServiceQueryShareDescription(params)
	      .then(res => {
	        return res
	      })
	      .catch(err => {
	      })
	      .finally(() => {
	      })
	  },

	  async AC_ModelDataMetaServiceDeleteModelDataMeta ({dispatch, commit}, params) {
	    return api.ModelDataMetaServiceDeleteModelDataMeta(params)
	      .then(res => {
	        return res
	      })
	      .catch(err => {
	      })
	      .finally(() => {
	      })
	  },

	  async AC_ModelDataMetaServiceGetModelDataMeta ({dispatch, commit}, params) {
	    return api.ModelDataMetaServiceGetModelDataMeta(params)
	      .then(res => {
	        return res
	      })
	      .catch(err => {
	      })
	      .finally(() => {
	      })
	  },

	  async AC_ModelDataMetaServiceAddModelDataMeta ({dispatch, commit}, params) {
	    return api.ModelDataMetaServiceAddModelDataMeta(params)
	      .then(res => {
	        return res
	      })
	      .catch(err => {
	      })
	      .finally(() => {
	      })
	  },

	  async AC_ModelDataMetaServiceUpdateModelDataMeta ({dispatch, commit}, params) {
	    return api.ModelDataMetaServiceUpdateModelDataMeta(params)
	      .then(res => {
	        return res
	      })
	      .catch(err => {
	      })
	      .finally(() => {
	      })
	  },

	  async AC_ModelDataMetaServiceUpdateManyModelDataMeta ({dispatch, commit}, params) {
	    return api.ModelDataMetaServiceUpdateManyModelDataMeta(params)
	      .then(res => {
	        return res
	      })
	      .catch(err => {
	      })
	      .finally(() => {
	      })
	  },

	  async AC_ModelDataMetaServiceGetManyModelDataMeta ({dispatch, commit}, params) {
	    return api.ModelDataMetaServiceGetManyModelDataMeta(params)
	      .then(res => {
	        return res
	      })
	      .catch(err => {
	      })
	      .finally(() => {
	      })
	  },

	  async AC_ModelDataMetaServiceQueryModelDataMeta ({dispatch, commit}, params) {
	    return api.ModelDataMetaServiceQueryModelDataMeta(params)
	      .then(res => {
	        return res
	      })
	      .catch(err => {
	      })
	      .finally(() => {
	      })
	  },

	  async AC_AnalyzeOpServiceGetHistoryData ({dispatch, commit}, params) {
	    return api.AnalyzeOpServiceGetHistoryData(params)
	      .then(res => {
	        return res
	      })
	      .catch(err => {
	      })
	      .finally(() => {
	      })
	  },

	  async AC_AnalyzeOpServiceGetEstimateData ({dispatch, commit}, params) {
	    return api.AnalyzeOpServiceGetEstimateData(params)
	      .then(res => {
	        return res
	      })
	      .catch(err => {
	      })
	      .finally(() => {
	      })
	  },

	  async AC_AnalyzeOpServiceSaveNCalculate ({dispatch, commit}, params) {
	    return api.AnalyzeOpServiceSaveNCalculate(params)
	      .then(res => {
	        return res
	      })
	      .catch(err => {
	      })
	      .finally(() => {
	      })
	  },

	  async AC_AnalyzeOpServiceGetConclusionData ({dispatch, commit}, params) {
	    return api.AnalyzeOpServiceGetConclusionData(params)
	      .then(res => {
	        return res
	      })
	      .catch(err => {
	      })
	      .finally(() => {
	      })
	  },

	  async AC_AnalyzeOpServiceGetAnalyzeData ({dispatch, commit}, params) {
	    return api.AnalyzeOpServiceGetAnalyzeData(params)
	      .then(res => {
	        return res
	      })
	      .catch(err => {
	      })
	      .finally(() => {
	      })
	  },

	  async AC_ChartDataServiceDeleteChartData ({dispatch, commit}, params) {
	    return api.ChartDataServiceDeleteChartData(params)
	      .then(res => {
	        return res
	      })
	      .catch(err => {
	      })
	      .finally(() => {
	      })
	  },

	  async AC_ChartDataServiceGetChartData ({dispatch, commit}, params) {
	    return api.ChartDataServiceGetChartData(params)
	      .then(res => {
	        return res
	      })
	      .catch(err => {
	      })
	      .finally(() => {
	      })
	  },

	  async AC_ChartDataServiceAddChartData ({dispatch, commit}, params) {
	    return api.ChartDataServiceAddChartData(params)
	      .then(res => {
	        return res
	      })
	      .catch(err => {
	      })
	      .finally(() => {
	      })
	  },

	  async AC_ChartDataServiceUpdateChartData ({dispatch, commit}, params) {
	    return api.ChartDataServiceUpdateChartData(params)
	      .then(res => {
	        return res
	      })
	      .catch(err => {
	      })
	      .finally(() => {
	      })
	  },

	  async AC_ChartDataServiceUpdateManyChartData ({dispatch, commit}, params) {
	    return api.ChartDataServiceUpdateManyChartData(params)
	      .then(res => {
	        return res
	      })
	      .catch(err => {
	      })
	      .finally(() => {
	      })
	  },

	  async AC_ChartDataServiceGetManyChartData ({dispatch, commit}, params) {
	    return api.ChartDataServiceGetManyChartData(params)
	      .then(res => {
	        return res
	      })
	      .catch(err => {
	      })
	      .finally(() => {
	      })
	  },

	  async AC_ChartDataServiceQueryChartData ({dispatch, commit}, params) {
	    return api.ChartDataServiceQueryChartData(params)
	      .then(res => {
	        return res
	      })
	      .catch(err => {
	      })
	      .finally(() => {
	      })
	  },

	  async AC_ReportServiceGetConclusionRichText ({dispatch, commit}, params) {
	    return api.ReportServiceGetConclusionRichText(params)
	      .then(res => {
	        return res
	      })
	      .catch(err => {
	      })
	      .finally(() => {
	      })
	  },

	  async AC_ReportServiceSaveConclusionAsSection ({dispatch, commit}, params) {
	    return api.ReportServiceSaveConclusionAsSection(params)
	      .then(res => {
	        return res
	      })
	      .catch(err => {
	      })
	      .finally(() => {
	      })
	  },

	  async AC_ReportServiceGetModelOutputRichText ({dispatch, commit}, params) {
	    return api.ReportServiceGetModelOutputRichText(params)
	      .then(res => {
	        return res
	      })
	      .catch(err => {
	      })
	      .finally(() => {
	      })
	  },

	  async AC_ReportServiceTestOutputRichText ({dispatch, commit}, params) {
	    return api.ReportServiceTestOutputRichText(params)
	      .then(res => {
	        return res
	      })
	      .catch(err => {
	      })
	      .finally(() => {
	      })
	  },

	  async AC_ReportServiceGetPreViewRichText ({dispatch, commit}, params) {
	    return api.ReportServiceGetPreViewRichText(params)
	      .then(res => {
	        return res
	      })
	      .catch(err => {
	      })
	      .finally(() => {
	      })
	  },

	  async AC_ReportServiceGetRichTextByVariables ({dispatch, commit}, params) {
	    return api.ReportServiceGetRichTextByVariables(params)
	      .then(res => {
	        return res
	      })
	      .catch(err => {
	      })
	      .finally(() => {
	      })
	  },

	  async AC_ReportServiceGetCorpName ({dispatch, commit}, params) {
	    return api.ReportServiceGetCorpName(params)
	      .then(res => {
	        return res
	      })
	      .catch(err => {
	      })
	      .finally(() => {
	      })
	  },

	  async AC_ReportServiceReplaceRichTextByCharts ({dispatch, commit}, params) {
	    return api.ReportServiceReplaceRichTextByCharts(params)
	      .then(res => {
	        return res
	      })
	      .catch(err => {
	      })
	      .finally(() => {
	      })
	  },

	  async AC_HypersisServiceDeleteHypersis ({dispatch, commit}, params) {
	    return api.HypersisServiceDeleteHypersis(params)
	      .then(res => {
	        return res
	      })
	      .catch(err => {
	      })
	      .finally(() => {
	      })
	  },

	  async AC_HypersisServiceGetHypersis ({dispatch, commit}, params) {
	    return api.HypersisServiceGetHypersis(params)
	      .then(res => {
	        return res
	      })
	      .catch(err => {
	      })
	      .finally(() => {
	      })
	  },

	  async AC_HypersisServiceAddHypersis ({dispatch, commit}, params) {
	    return api.HypersisServiceAddHypersis(params)
	      .then(res => {
	        return res
	      })
	      .catch(err => {
	      })
	      .finally(() => {
	      })
	  },

	  async AC_HypersisServiceUpdateHypersis ({dispatch, commit}, params) {
	    return api.HypersisServiceUpdateHypersis(params)
	      .then(res => {
	        return res
	      })
	      .catch(err => {
	      })
	      .finally(() => {
	      })
	  },

	  async AC_HypersisServiceUpdateManyHypersis ({dispatch, commit}, params) {
	    return api.HypersisServiceUpdateManyHypersis(params)
	      .then(res => {
	        return res
	      })
	      .catch(err => {
	      })
	      .finally(() => {
	      })
	  },

	  async AC_HypersisServiceGetManyHypersis ({dispatch, commit}, params) {
	    return api.HypersisServiceGetManyHypersis(params)
	      .then(res => {
	        return res
	      })
	      .catch(err => {
	      })
	      .finally(() => {
	      })
	  },

	  async AC_HypersisServiceQueryHypersis ({dispatch, commit}, params) {
	    return api.HypersisServiceQueryHypersis(params)
	      .then(res => {
	        return res
	      })
	      .catch(err => {
	      })
	      .finally(() => {
	      })
	  },

	  async AC_ReportChartServiceDeleteReportChart ({dispatch, commit}, params) {
	    return api.ReportChartServiceDeleteReportChart(params)
	      .then(res => {
	        return res
	      })
	      .catch(err => {
	      })
	      .finally(() => {
	      })
	  },

	  async AC_ReportChartServiceGetReportChart ({dispatch, commit}, params) {
	    return api.ReportChartServiceGetReportChart(params)
	      .then(res => {
	        return res
	      })
	      .catch(err => {
	      })
	      .finally(() => {
	      })
	  },

	  async AC_ReportChartServiceAddReportChart ({dispatch, commit}, params) {
	    return api.ReportChartServiceAddReportChart(params)
	      .then(res => {
	        return res
	      })
	      .catch(err => {
	      })
	      .finally(() => {
	      })
	  },

	  async AC_ReportChartServiceUpdateReportChart ({dispatch, commit}, params) {
	    return api.ReportChartServiceUpdateReportChart(params)
	      .then(res => {
	        return res
	      })
	      .catch(err => {
	      })
	      .finally(() => {
	      })
	  },

	  async AC_ReportChartServiceUpdateManyReportChart ({dispatch, commit}, params) {
	    return api.ReportChartServiceUpdateManyReportChart(params)
	      .then(res => {
	        return res
	      })
	      .catch(err => {
	      })
	      .finally(() => {
	      })
	  },

	  async AC_ReportChartServiceGetManyReportChart ({dispatch, commit}, params) {
	    return api.ReportChartServiceGetManyReportChart(params)
	      .then(res => {
	        return res
	      })
	      .catch(err => {
	      })
	      .finally(() => {
	      })
	  },

	  async AC_ReportChartServiceQueryReportChart ({dispatch, commit}, params) {
	    return api.ReportChartServiceQueryReportChart(params)
	      .then(res => {
	        return res
	      })
	      .catch(err => {
	      })
	      .finally(() => {
	      })
	  },

	  async AC_OutputTemplateServiceDeleteOutputTemplate ({dispatch, commit}, params) {
	    return api.OutputTemplateServiceDeleteOutputTemplate(params)
	      .then(res => {
	        return res
	      })
	      .catch(err => {
	      })
	      .finally(() => {
	      })
	  },

	  async AC_OutputTemplateServiceGetOutputTemplate ({dispatch, commit}, params) {
	    return api.OutputTemplateServiceGetOutputTemplate(params)
	      .then(res => {
	        return res
	      })
	      .catch(err => {
	      })
	      .finally(() => {
	      })
	  },

	  async AC_OutputTemplateServiceAddOutputTemplate ({dispatch, commit}, params) {
	    return api.OutputTemplateServiceAddOutputTemplate(params)
	      .then(res => {
	        return res
	      })
	      .catch(err => {
	      })
	      .finally(() => {
	      })
	  },

	  async AC_OutputTemplateServiceUpdateOutputTemplate ({dispatch, commit}, params) {
	    return api.OutputTemplateServiceUpdateOutputTemplate(params)
	      .then(res => {
	        return res
	      })
	      .catch(err => {
	      })
	      .finally(() => {
	      })
	  },

	  async AC_OutputTemplateServiceUpdateManyOutputTemplate ({dispatch, commit}, params) {
	    return api.OutputTemplateServiceUpdateManyOutputTemplate(params)
	      .then(res => {
	        return res
	      })
	      .catch(err => {
	      })
	      .finally(() => {
	      })
	  },

	  async AC_OutputTemplateServiceGetManyOutputTemplate ({dispatch, commit}, params) {
	    return api.OutputTemplateServiceGetManyOutputTemplate(params)
	      .then(res => {
	        return res
	      })
	      .catch(err => {
	      })
	      .finally(() => {
	      })
	  },

	  async AC_OutputTemplateServiceQueryOutputTemplate ({dispatch, commit}, params) {
	    return api.OutputTemplateServiceQueryOutputTemplate(params)
	      .then(res => {
	        return res
	      })
	      .catch(err => {
	      })
	      .finally(() => {
	      })
	  },

	  async AC_JobServiceCheckHealth ({dispatch, commit}, params) {
	    return api.JobServiceCheckHealth(params)
	      .then(res => {
	        return res
	      })
	      .catch(err => {
	      })
	      .finally(() => {
	      })
	  },

	  async AC_ModelTemplateVariableServiceDeleteModelTemplateVariable ({dispatch, commit}, params) {
	    return api.ModelTemplateVariableServiceDeleteModelTemplateVariable(params)
	      .then(res => {
	        return res
	      })
	      .catch(err => {
	      })
	      .finally(() => {
	      })
	  },

	  async AC_ModelTemplateVariableServiceGetModelTemplateVariable ({dispatch, commit}, params) {
	    return api.ModelTemplateVariableServiceGetModelTemplateVariable(params)
	      .then(res => {
	        return res
	      })
	      .catch(err => {
	      })
	      .finally(() => {
	      })
	  },

	  async AC_ModelTemplateVariableServiceAddModelTemplateVariable ({dispatch, commit}, params) {
	    return api.ModelTemplateVariableServiceAddModelTemplateVariable(params)
	      .then(res => {
	        return res
	      })
	      .catch(err => {
	      })
	      .finally(() => {
	      })
	  },

	  async AC_ModelTemplateVariableServiceUpdateModelTemplateVariable ({dispatch, commit}, params) {
	    return api.ModelTemplateVariableServiceUpdateModelTemplateVariable(params)
	      .then(res => {
	        return res
	      })
	      .catch(err => {
	      })
	      .finally(() => {
	      })
	  },

	  async AC_ModelTemplateVariableServiceUpdateManyModelTemplateVariable ({dispatch, commit}, params) {
	    return api.ModelTemplateVariableServiceUpdateManyModelTemplateVariable(params)
	      .then(res => {
	        return res
	      })
	      .catch(err => {
	      })
	      .finally(() => {
	      })
	  },

	  async AC_ModelTemplateVariableServiceGetManyModelTemplateVariable ({dispatch, commit}, params) {
	    return api.ModelTemplateVariableServiceGetManyModelTemplateVariable(params)
	      .then(res => {
	        return res
	      })
	      .catch(err => {
	      })
	      .finally(() => {
	      })
	  },

	  async AC_ModelTemplateVariableServiceQueryModelTemplateVariable ({dispatch, commit}, params) {
	    return api.ModelTemplateVariableServiceQueryModelTemplateVariable(params)
	      .then(res => {
	        return res
	      })
	      .catch(err => {
	      })
	      .finally(() => {
	      })
	  },

	  async AC_AnalyzeServiceDeleteAnalyze ({dispatch, commit}, params) {
	    return api.AnalyzeServiceDeleteAnalyze(params)
	      .then(res => {
	        return res
	      })
	      .catch(err => {
	      })
	      .finally(() => {
	      })
	  },

	  async AC_AnalyzeServiceGetAnalyze ({dispatch, commit}, params) {
	    return api.AnalyzeServiceGetAnalyze(params)
	      .then(res => {
	        return res
	      })
	      .catch(err => {
	      })
	      .finally(() => {
	      })
	  },

	  async AC_AnalyzeServiceAddAnalyze ({dispatch, commit}, params) {
	    return api.AnalyzeServiceAddAnalyze(params)
	      .then(res => {
	        return res
	      })
	      .catch(err => {
	      })
	      .finally(() => {
	      })
	  },

	  async AC_AnalyzeServiceUpdateAnalyze ({dispatch, commit}, params) {
	    return api.AnalyzeServiceUpdateAnalyze(params)
	      .then(res => {
	        return res
	      })
	      .catch(err => {
	      })
	      .finally(() => {
	      })
	  },

	  async AC_AnalyzeServiceUpdateManyAnalyze ({dispatch, commit}, params) {
	    return api.AnalyzeServiceUpdateManyAnalyze(params)
	      .then(res => {
	        return res
	      })
	      .catch(err => {
	      })
	      .finally(() => {
	      })
	  },

	  async AC_AnalyzeServiceGetManyAnalyze ({dispatch, commit}, params) {
	    return api.AnalyzeServiceGetManyAnalyze(params)
	      .then(res => {
	        return res
	      })
	      .catch(err => {
	      })
	      .finally(() => {
	      })
	  },

	  async AC_AnalyzeServiceQueryAnalyze ({dispatch, commit}, params) {
	    return api.AnalyzeServiceQueryAnalyze(params)
	      .then(res => {
	        return res
	      })
	      .catch(err => {
	      })
	      .finally(() => {
	      })
	  },

}



export default {
    state,
    getters,
    actions,
    mutations
}

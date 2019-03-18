import api from '../../api/reportmanage';

const state = {}

const getters = {}

const mutations = {}

const actions = {


	  async AC_ReportServiceDeleteReport ({dispatch, commit}, params) {
	    return api.ReportServiceDeleteReport(params)
	      .then(res => {
	        return res
	      })
	      .catch(err => {
	      })
	      .finally(() => {
	      })
	  },

	  async AC_ReportServiceGetReport ({dispatch, commit}, params) {
	    return api.ReportServiceGetReport(params)
	      .then(res => {
	        return res
	      })
	      .catch(err => {
	      })
	      .finally(() => {
	      })
	  },

	  async AC_ReportServiceAddReport ({dispatch, commit}, params) {
	    return api.ReportServiceAddReport(params)
	      .then(res => {
	        return res
	      })
	      .catch(err => {
	      })
	      .finally(() => {
	      })
	  },

	  async AC_ReportServiceUpdateReport ({dispatch, commit}, params) {
	    return api.ReportServiceUpdateReport(params)
	      .then(res => {
	        return res
	      })
	      .catch(err => {
	      })
	      .finally(() => {
	      })
	  },

	  async AC_ReportServiceUpdateManyReport ({dispatch, commit}, params) {
	    return api.ReportServiceUpdateManyReport(params)
	      .then(res => {
	        return res
	      })
	      .catch(err => {
	      })
	      .finally(() => {
	      })
	  },

	  async AC_ReportServiceGetManyReport ({dispatch, commit}, params) {
	    return api.ReportServiceGetManyReport(params)
	      .then(res => {
	        return res
	      })
	      .catch(err => {
	      })
	      .finally(() => {
	      })
	  },

	  async AC_ReportServiceQueryReport ({dispatch, commit}, params) {
	    return api.ReportServiceQueryReport(params)
	      .then(res => {
	        return res
	      })
	      .catch(err => {
	      })
	      .finally(() => {
	      })
	  },

	  async AC_ReportTemplateVaribleServiceDeleteReportTemplateVarible ({dispatch, commit}, params) {
	    return api.ReportTemplateVaribleServiceDeleteReportTemplateVarible(params)
	      .then(res => {
	        return res
	      })
	      .catch(err => {
	      })
	      .finally(() => {
	      })
	  },

	  async AC_ReportTemplateVaribleServiceGetReportTemplateVarible ({dispatch, commit}, params) {
	    return api.ReportTemplateVaribleServiceGetReportTemplateVarible(params)
	      .then(res => {
	        return res
	      })
	      .catch(err => {
	      })
	      .finally(() => {
	      })
	  },

	  async AC_ReportTemplateVaribleServiceAddReportTemplateVarible ({dispatch, commit}, params) {
	    return api.ReportTemplateVaribleServiceAddReportTemplateVarible(params)
	      .then(res => {
	        return res
	      })
	      .catch(err => {
	      })
	      .finally(() => {
	      })
	  },

	  async AC_ReportTemplateVaribleServiceUpdateReportTemplateVarible ({dispatch, commit}, params) {
	    return api.ReportTemplateVaribleServiceUpdateReportTemplateVarible(params)
	      .then(res => {
	        return res
	      })
	      .catch(err => {
	      })
	      .finally(() => {
	      })
	  },

	  async AC_ReportTemplateVaribleServiceUpdateManyReportTemplateVarible ({dispatch, commit}, params) {
	    return api.ReportTemplateVaribleServiceUpdateManyReportTemplateVarible(params)
	      .then(res => {
	        return res
	      })
	      .catch(err => {
	      })
	      .finally(() => {
	      })
	  },

	  async AC_ReportTemplateVaribleServiceGetManyReportTemplateVarible ({dispatch, commit}, params) {
	    return api.ReportTemplateVaribleServiceGetManyReportTemplateVarible(params)
	      .then(res => {
	        return res
	      })
	      .catch(err => {
	      })
	      .finally(() => {
	      })
	  },

	  async AC_ReportTemplateVaribleServiceQueryReportTemplateVarible ({dispatch, commit}, params) {
	    return api.ReportTemplateVaribleServiceQueryReportTemplateVarible(params)
	      .then(res => {
	        return res
	      })
	      .catch(err => {
	      })
	      .finally(() => {
	      })
	  },

	  async AC_ReportManageServiceSaveAsTemplate ({dispatch, commit}, params) {
	    return api.ReportManageServiceSaveAsTemplate(params)
	      .then(res => {
	        return res
	      })
	      .catch(err => {
	      })
	      .finally(() => {
	      })
	  },

	  async AC_ReportManageServiceCreateFromTemplate ({dispatch, commit}, params) {
	    return api.ReportManageServiceCreateFromTemplate(params)
	      .then(res => {
	        return res
	      })
	      .catch(err => {
	      })
	      .finally(() => {
	      })
	  },

	  async AC_ReportManageServicePreCreateReport ({dispatch, commit}, params) {
	    return api.ReportManageServicePreCreateReport(params)
	      .then(res => {
	        return res
	      })
	      .catch(err => {
	      })
	      .finally(() => {
	      })
	  },

	  async AC_ReportManageServiceCreateReport ({dispatch, commit}, params) {
	    return api.ReportManageServiceCreateReport(params)
	      .then(res => {
	        return res
	      })
	      .catch(err => {
	      })
	      .finally(() => {
	      })
	  },

	  async AC_ReportManageServiceGetCharts ({dispatch, commit}, params) {
	    return api.ReportManageServiceGetCharts(params)
	      .then(res => {
	        return res
	      })
	      .catch(err => {
	      })
	      .finally(() => {
	      })
	  },

	  async AC_ReportManageServiceGetChartsBy ({dispatch, commit}, params) {
	    return api.ReportManageServiceGetChartsBy(params)
	      .then(res => {
	        return res
	      })
	      .catch(err => {
	      })
	      .finally(() => {
	      })
	  },

	  async AC_ReportManageServiceCreateFmSection ({dispatch, commit}, params) {
	    return api.ReportManageServiceCreateFmSection(params)
	      .then(res => {
	        return res
	      })
	      .catch(err => {
	      })
	      .finally(() => {
	      })
	  },

	  async AC_ReportManageServiceDraftUpdateSection ({dispatch, commit}, params) {
	    return api.ReportManageServiceDraftUpdateSection(params)
	      .then(res => {
	        return res
	      })
	      .catch(err => {
	      })
	      .finally(() => {
	      })
	  },

	  async AC_ReportManageServiceImportAnalyzeAspect ({dispatch, commit}, params) {
	    return api.ReportManageServiceImportAnalyzeAspect(params)
	      .then(res => {
	        return res
	      })
	      .catch(err => {
	      })
	      .finally(() => {
	      })
	  },

	  async AC_ReportManageServiceAsyncCreateReport ({dispatch, commit}, params) {
	    return api.ReportManageServiceAsyncCreateReport(params)
	      .then(res => {
	        return res
	      })
	      .catch(err => {
	      })
	      .finally(() => {
	      })
	  },

	  async AC_ReportManageServiceAsyncCreateFmSection ({dispatch, commit}, params) {
	    return api.ReportManageServiceAsyncCreateFmSection(params)
	      .then(res => {
	        return res
	      })
	      .catch(err => {
	      })
	      .finally(() => {
	      })
	  },

	  async AC_UserReportDraftManageUpdateUserReportDraft ({dispatch, commit}, params) {
	    return api.UserReportDraftManageUpdateUserReportDraft(params)
	      .then(res => {
	        return res
	      })
	      .catch(err => {
	      })
	      .finally(() => {
	      })
	  },

	  async AC_RenewSectionAddAddSection ({dispatch, commit}, params) {
	    return api.RenewSectionAddAddSection(params)
	      .then(res => {
	        return res
	      })
	      .catch(err => {
	      })
	      .finally(() => {
	      })
	  },

	  async AC_SectionTreeServiceGetSectionTree ({dispatch, commit}, params) {
	    return api.SectionTreeServiceGetSectionTree(params)
	      .then(res => {
	        return res
	      })
	      .catch(err => {
	      })
	      .finally(() => {
	      })
	  },

	  async AC_RenewTemplateSectionTreeSortUpdateSort ({dispatch, commit}, params) {
	    return api.RenewTemplateSectionTreeSortUpdateSort(params)
	      .then(res => {
	        return res
	      })
	      .catch(err => {
	      })
	      .finally(() => {
	      })
	  },

	  async AC_TemplateVaribleValueServiceDeleteTemplateVaribleValue ({dispatch, commit}, params) {
	    return api.TemplateVaribleValueServiceDeleteTemplateVaribleValue(params)
	      .then(res => {
	        return res
	      })
	      .catch(err => {
	      })
	      .finally(() => {
	      })
	  },

	  async AC_TemplateVaribleValueServiceGetTemplateVaribleValue ({dispatch, commit}, params) {
	    return api.TemplateVaribleValueServiceGetTemplateVaribleValue(params)
	      .then(res => {
	        return res
	      })
	      .catch(err => {
	      })
	      .finally(() => {
	      })
	  },

	  async AC_TemplateVaribleValueServiceAddTemplateVaribleValue ({dispatch, commit}, params) {
	    return api.TemplateVaribleValueServiceAddTemplateVaribleValue(params)
	      .then(res => {
	        return res
	      })
	      .catch(err => {
	      })
	      .finally(() => {
	      })
	  },

	  async AC_TemplateVaribleValueServiceUpdateTemplateVaribleValue ({dispatch, commit}, params) {
	    return api.TemplateVaribleValueServiceUpdateTemplateVaribleValue(params)
	      .then(res => {
	        return res
	      })
	      .catch(err => {
	      })
	      .finally(() => {
	      })
	  },

	  async AC_TemplateVaribleValueServiceUpdateManyTemplateVaribleValue ({dispatch, commit}, params) {
	    return api.TemplateVaribleValueServiceUpdateManyTemplateVaribleValue(params)
	      .then(res => {
	        return res
	      })
	      .catch(err => {
	      })
	      .finally(() => {
	      })
	  },

	  async AC_TemplateVaribleValueServiceGetManyTemplateVaribleValue ({dispatch, commit}, params) {
	    return api.TemplateVaribleValueServiceGetManyTemplateVaribleValue(params)
	      .then(res => {
	        return res
	      })
	      .catch(err => {
	      })
	      .finally(() => {
	      })
	  },

	  async AC_TemplateVaribleValueServiceQueryTemplateVaribleValue ({dispatch, commit}, params) {
	    return api.TemplateVaribleValueServiceQueryTemplateVaribleValue(params)
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

	  async AC_CoverManageServiceUpdateCover ({dispatch, commit}, params) {
	    return api.CoverManageServiceUpdateCover(params)
	      .then(res => {
	        return res
	      })
	      .catch(err => {
	      })
	      .finally(() => {
	      })
	  },

	  async AC_CoverManageServiceAddCover ({dispatch, commit}, params) {
	    return api.CoverManageServiceAddCover(params)
	      .then(res => {
	        return res
	      })
	      .catch(err => {
	      })
	      .finally(() => {
	      })
	  },

	  async AC_RenewTemplateSectionAddAddTemplateSection ({dispatch, commit}, params) {
	    return api.RenewTemplateSectionAddAddTemplateSection(params)
	      .then(res => {
	        return res
	      })
	      .catch(err => {
	      })
	      .finally(() => {
	      })
	  },

	  async AC_ReportVariableServiceDeleteReportVariable ({dispatch, commit}, params) {
	    return api.ReportVariableServiceDeleteReportVariable(params)
	      .then(res => {
	        return res
	      })
	      .catch(err => {
	      })
	      .finally(() => {
	      })
	  },

	  async AC_ReportVariableServiceGetReportVariable ({dispatch, commit}, params) {
	    return api.ReportVariableServiceGetReportVariable(params)
	      .then(res => {
	        return res
	      })
	      .catch(err => {
	      })
	      .finally(() => {
	      })
	  },

	  async AC_ReportVariableServiceAddReportVariable ({dispatch, commit}, params) {
	    return api.ReportVariableServiceAddReportVariable(params)
	      .then(res => {
	        return res
	      })
	      .catch(err => {
	      })
	      .finally(() => {
	      })
	  },

	  async AC_ReportVariableServiceUpdateReportVariable ({dispatch, commit}, params) {
	    return api.ReportVariableServiceUpdateReportVariable(params)
	      .then(res => {
	        return res
	      })
	      .catch(err => {
	      })
	      .finally(() => {
	      })
	  },

	  async AC_ReportVariableServiceUpdateManyReportVariable ({dispatch, commit}, params) {
	    return api.ReportVariableServiceUpdateManyReportVariable(params)
	      .then(res => {
	        return res
	      })
	      .catch(err => {
	      })
	      .finally(() => {
	      })
	  },

	  async AC_ReportVariableServiceGetManyReportVariable ({dispatch, commit}, params) {
	    return api.ReportVariableServiceGetManyReportVariable(params)
	      .then(res => {
	        return res
	      })
	      .catch(err => {
	      })
	      .finally(() => {
	      })
	  },

	  async AC_ReportVariableServiceQueryReportVariable ({dispatch, commit}, params) {
	    return api.ReportVariableServiceQueryReportVariable(params)
	      .then(res => {
	        return res
	      })
	      .catch(err => {
	      })
	      .finally(() => {
	      })
	  },

	  async AC_SectionManageServiceReplaceImg ({dispatch, commit}, params) {
	    return api.SectionManageServiceReplaceImg(params)
	      .then(res => {
	        return res
	      })
	      .catch(err => {
	      })
	      .finally(() => {
	      })
	  },

	  async AC_SectionManageServiceRewriteSectionDelete ({dispatch, commit}, params) {
	    return api.SectionManageServiceRewriteSectionDelete(params)
	      .then(res => {
	        return res
	      })
	      .catch(err => {
	      })
	      .finally(() => {
	      })
	  },

	  async AC_SectionElementServiceDeleteSectionElement ({dispatch, commit}, params) {
	    return api.SectionElementServiceDeleteSectionElement(params)
	      .then(res => {
	        return res
	      })
	      .catch(err => {
	      })
	      .finally(() => {
	      })
	  },

	  async AC_SectionElementServiceGetSectionElement ({dispatch, commit}, params) {
	    return api.SectionElementServiceGetSectionElement(params)
	      .then(res => {
	        return res
	      })
	      .catch(err => {
	      })
	      .finally(() => {
	      })
	  },

	  async AC_SectionElementServiceAddSectionElement ({dispatch, commit}, params) {
	    return api.SectionElementServiceAddSectionElement(params)
	      .then(res => {
	        return res
	      })
	      .catch(err => {
	      })
	      .finally(() => {
	      })
	  },

	  async AC_SectionElementServiceUpdateSectionElement ({dispatch, commit}, params) {
	    return api.SectionElementServiceUpdateSectionElement(params)
	      .then(res => {
	        return res
	      })
	      .catch(err => {
	      })
	      .finally(() => {
	      })
	  },

	  async AC_SectionElementServiceUpdateManySectionElement ({dispatch, commit}, params) {
	    return api.SectionElementServiceUpdateManySectionElement(params)
	      .then(res => {
	        return res
	      })
	      .catch(err => {
	      })
	      .finally(() => {
	      })
	  },

	  async AC_SectionElementServiceGetManySectionElement ({dispatch, commit}, params) {
	    return api.SectionElementServiceGetManySectionElement(params)
	      .then(res => {
	        return res
	      })
	      .catch(err => {
	      })
	      .finally(() => {
	      })
	  },

	  async AC_SectionElementServiceQuerySectionElement ({dispatch, commit}, params) {
	    return api.SectionElementServiceQuerySectionElement(params)
	      .then(res => {
	        return res
	      })
	      .catch(err => {
	      })
	      .finally(() => {
	      })
	  },

	  async AC_TemplateProcessServicePreCreateFmSectionTemplate ({dispatch, commit}, params) {
	    return api.TemplateProcessServicePreCreateFmSectionTemplate(params)
	      .then(res => {
	        return res
	      })
	      .catch(err => {
	      })
	      .finally(() => {
	      })
	  },

	  async AC_TemplateProcessServiceCreateFmSectionTemplate ({dispatch, commit}, params) {
	    return api.TemplateProcessServiceCreateFmSectionTemplate(params)
	      .then(res => {
	        return res
	      })
	      .catch(err => {
	      })
	      .finally(() => {
	      })
	  },

	  async AC_TemplateProcessServiceQueryReportTemplateVaribleById ({dispatch, commit}, params) {
	    return api.TemplateProcessServiceQueryReportTemplateVaribleById(params)
	      .then(res => {
	        return res
	      })
	      .catch(err => {
	      })
	      .finally(() => {
	      })
	  },

	  async AC_TemplateProcessServiceUpdateReportTemplateVaribles ({dispatch, commit}, params) {
	    return api.TemplateProcessServiceUpdateReportTemplateVaribles(params)
	      .then(res => {
	        return res
	      })
	      .catch(err => {
	      })
	      .finally(() => {
	      })
	  },

	  async AC_TemplateOutputVaribleServiceDeleteTemplateOutputVarible ({dispatch, commit}, params) {
	    return api.TemplateOutputVaribleServiceDeleteTemplateOutputVarible(params)
	      .then(res => {
	        return res
	      })
	      .catch(err => {
	      })
	      .finally(() => {
	      })
	  },

	  async AC_TemplateOutputVaribleServiceGetTemplateOutputVarible ({dispatch, commit}, params) {
	    return api.TemplateOutputVaribleServiceGetTemplateOutputVarible(params)
	      .then(res => {
	        return res
	      })
	      .catch(err => {
	      })
	      .finally(() => {
	      })
	  },

	  async AC_TemplateOutputVaribleServiceAddTemplateOutputVarible ({dispatch, commit}, params) {
	    return api.TemplateOutputVaribleServiceAddTemplateOutputVarible(params)
	      .then(res => {
	        return res
	      })
	      .catch(err => {
	      })
	      .finally(() => {
	      })
	  },

	  async AC_TemplateOutputVaribleServiceUpdateTemplateOutputVarible ({dispatch, commit}, params) {
	    return api.TemplateOutputVaribleServiceUpdateTemplateOutputVarible(params)
	      .then(res => {
	        return res
	      })
	      .catch(err => {
	      })
	      .finally(() => {
	      })
	  },

	  async AC_TemplateOutputVaribleServiceUpdateManyTemplateOutputVarible ({dispatch, commit}, params) {
	    return api.TemplateOutputVaribleServiceUpdateManyTemplateOutputVarible(params)
	      .then(res => {
	        return res
	      })
	      .catch(err => {
	      })
	      .finally(() => {
	      })
	  },

	  async AC_TemplateOutputVaribleServiceGetManyTemplateOutputVarible ({dispatch, commit}, params) {
	    return api.TemplateOutputVaribleServiceGetManyTemplateOutputVarible(params)
	      .then(res => {
	        return res
	      })
	      .catch(err => {
	      })
	      .finally(() => {
	      })
	  },

	  async AC_TemplateOutputVaribleServiceQueryTemplateOutputVarible ({dispatch, commit}, params) {
	    return api.TemplateOutputVaribleServiceQueryTemplateOutputVarible(params)
	      .then(res => {
	        return res
	      })
	      .catch(err => {
	      })
	      .finally(() => {
	      })
	  },

	  async AC_TemplateSectionServiceDeleteTemplateSection ({dispatch, commit}, params) {
	    return api.TemplateSectionServiceDeleteTemplateSection(params)
	      .then(res => {
	        return res
	      })
	      .catch(err => {
	      })
	      .finally(() => {
	      })
	  },

	  async AC_TemplateSectionServiceGetTemplateSection ({dispatch, commit}, params) {
	    return api.TemplateSectionServiceGetTemplateSection(params)
	      .then(res => {
	        return res
	      })
	      .catch(err => {
	      })
	      .finally(() => {
	      })
	  },

	  async AC_TemplateSectionServiceAddTemplateSection ({dispatch, commit}, params) {
	    return api.TemplateSectionServiceAddTemplateSection(params)
	      .then(res => {
	        return res
	      })
	      .catch(err => {
	      })
	      .finally(() => {
	      })
	  },

	  async AC_TemplateSectionServiceUpdateTemplateSection ({dispatch, commit}, params) {
	    return api.TemplateSectionServiceUpdateTemplateSection(params)
	      .then(res => {
	        return res
	      })
	      .catch(err => {
	      })
	      .finally(() => {
	      })
	  },

	  async AC_TemplateSectionServiceUpdateManyTemplateSection ({dispatch, commit}, params) {
	    return api.TemplateSectionServiceUpdateManyTemplateSection(params)
	      .then(res => {
	        return res
	      })
	      .catch(err => {
	      })
	      .finally(() => {
	      })
	  },

	  async AC_TemplateSectionServiceGetManyTemplateSection ({dispatch, commit}, params) {
	    return api.TemplateSectionServiceGetManyTemplateSection(params)
	      .then(res => {
	        return res
	      })
	      .catch(err => {
	      })
	      .finally(() => {
	      })
	  },

	  async AC_TemplateSectionServiceQueryTemplateSection ({dispatch, commit}, params) {
	    return api.TemplateSectionServiceQueryTemplateSection(params)
	      .then(res => {
	        return res
	      })
	      .catch(err => {
	      })
	      .finally(() => {
	      })
	  },

	  async AC_UserReportDraftServiceDeleteUserReportDraft ({dispatch, commit}, params) {
	    return api.UserReportDraftServiceDeleteUserReportDraft(params)
	      .then(res => {
	        return res
	      })
	      .catch(err => {
	      })
	      .finally(() => {
	      })
	  },

	  async AC_UserReportDraftServiceGetUserReportDraft ({dispatch, commit}, params) {
	    return api.UserReportDraftServiceGetUserReportDraft(params)
	      .then(res => {
	        return res
	      })
	      .catch(err => {
	      })
	      .finally(() => {
	      })
	  },

	  async AC_UserReportDraftServiceAddUserReportDraft ({dispatch, commit}, params) {
	    return api.UserReportDraftServiceAddUserReportDraft(params)
	      .then(res => {
	        return res
	      })
	      .catch(err => {
	      })
	      .finally(() => {
	      })
	  },

	  async AC_UserReportDraftServiceUpdateUserReportDraft ({dispatch, commit}, params) {
	    return api.UserReportDraftServiceUpdateUserReportDraft(params)
	      .then(res => {
	        return res
	      })
	      .catch(err => {
	      })
	      .finally(() => {
	      })
	  },

	  async AC_UserReportDraftServiceUpdateManyUserReportDraft ({dispatch, commit}, params) {
	    return api.UserReportDraftServiceUpdateManyUserReportDraft(params)
	      .then(res => {
	        return res
	      })
	      .catch(err => {
	      })
	      .finally(() => {
	      })
	  },

	  async AC_UserReportDraftServiceGetManyUserReportDraft ({dispatch, commit}, params) {
	    return api.UserReportDraftServiceGetManyUserReportDraft(params)
	      .then(res => {
	        return res
	      })
	      .catch(err => {
	      })
	      .finally(() => {
	      })
	  },

	  async AC_UserReportDraftServiceQueryUserReportDraft ({dispatch, commit}, params) {
	    return api.UserReportDraftServiceQueryUserReportDraft(params)
	      .then(res => {
	        return res
	      })
	      .catch(err => {
	      })
	      .finally(() => {
	      })
	  },

	  async AC_CoverServiceDeleteCover ({dispatch, commit}, params) {
	    return api.CoverServiceDeleteCover(params)
	      .then(res => {
	        return res
	      })
	      .catch(err => {
	      })
	      .finally(() => {
	      })
	  },

	  async AC_CoverServiceGetCover ({dispatch, commit}, params) {
	    return api.CoverServiceGetCover(params)
	      .then(res => {
	        return res
	      })
	      .catch(err => {
	      })
	      .finally(() => {
	      })
	  },

	  async AC_CoverServiceAddCover ({dispatch, commit}, params) {
	    return api.CoverServiceAddCover(params)
	      .then(res => {
	        return res
	      })
	      .catch(err => {
	      })
	      .finally(() => {
	      })
	  },

	  async AC_CoverServiceUpdateCover ({dispatch, commit}, params) {
	    return api.CoverServiceUpdateCover(params)
	      .then(res => {
	        return res
	      })
	      .catch(err => {
	      })
	      .finally(() => {
	      })
	  },

	  async AC_CoverServiceUpdateManyCover ({dispatch, commit}, params) {
	    return api.CoverServiceUpdateManyCover(params)
	      .then(res => {
	        return res
	      })
	      .catch(err => {
	      })
	      .finally(() => {
	      })
	  },

	  async AC_CoverServiceGetManyCover ({dispatch, commit}, params) {
	    return api.CoverServiceGetManyCover(params)
	      .then(res => {
	        return res
	      })
	      .catch(err => {
	      })
	      .finally(() => {
	      })
	  },

	  async AC_CoverServiceQueryCover ({dispatch, commit}, params) {
	    return api.CoverServiceQueryCover(params)
	      .then(res => {
	        return res
	      })
	      .catch(err => {
	      })
	      .finally(() => {
	      })
	  },

	  async AC_SectionServiceDeleteSection ({dispatch, commit}, params) {
	    return api.SectionServiceDeleteSection(params)
	      .then(res => {
	        return res
	      })
	      .catch(err => {
	      })
	      .finally(() => {
	      })
	  },

	  async AC_SectionServiceGetSection ({dispatch, commit}, params) {
	    return api.SectionServiceGetSection(params)
	      .then(res => {
	        return res
	      })
	      .catch(err => {
	      })
	      .finally(() => {
	      })
	  },

	  async AC_SectionServiceAddSection ({dispatch, commit}, params) {
	    return api.SectionServiceAddSection(params)
	      .then(res => {
	        return res
	      })
	      .catch(err => {
	      })
	      .finally(() => {
	      })
	  },

	  async AC_SectionServiceUpdateSection ({dispatch, commit}, params) {
	    return api.SectionServiceUpdateSection(params)
	      .then(res => {
	        return res
	      })
	      .catch(err => {
	      })
	      .finally(() => {
	      })
	  },

	  async AC_SectionServiceUpdateManySection ({dispatch, commit}, params) {
	    return api.SectionServiceUpdateManySection(params)
	      .then(res => {
	        return res
	      })
	      .catch(err => {
	      })
	      .finally(() => {
	      })
	  },

	  async AC_SectionServiceGetManySection ({dispatch, commit}, params) {
	    return api.SectionServiceGetManySection(params)
	      .then(res => {
	        return res
	      })
	      .catch(err => {
	      })
	      .finally(() => {
	      })
	  },

	  async AC_SectionServiceQuerySection ({dispatch, commit}, params) {
	    return api.SectionServiceQuerySection(params)
	      .then(res => {
	        return res
	      })
	      .catch(err => {
	      })
	      .finally(() => {
	      })
	  },

	  async AC_ReportTemplateServiceDeleteReportTemplate ({dispatch, commit}, params) {
	    return api.ReportTemplateServiceDeleteReportTemplate(params)
	      .then(res => {
	        return res
	      })
	      .catch(err => {
	      })
	      .finally(() => {
	      })
	  },

	  async AC_ReportTemplateServiceGetReportTemplate ({dispatch, commit}, params) {
	    return api.ReportTemplateServiceGetReportTemplate(params)
	      .then(res => {
	        return res
	      })
	      .catch(err => {
	      })
	      .finally(() => {
	      })
	  },

	  async AC_ReportTemplateServiceAddReportTemplate ({dispatch, commit}, params) {
	    return api.ReportTemplateServiceAddReportTemplate(params)
	      .then(res => {
	        return res
	      })
	      .catch(err => {
	      })
	      .finally(() => {
	      })
	  },

	  async AC_ReportTemplateServiceUpdateReportTemplate ({dispatch, commit}, params) {
	    return api.ReportTemplateServiceUpdateReportTemplate(params)
	      .then(res => {
	        return res
	      })
	      .catch(err => {
	      })
	      .finally(() => {
	      })
	  },

	  async AC_ReportTemplateServiceUpdateManyReportTemplate ({dispatch, commit}, params) {
	    return api.ReportTemplateServiceUpdateManyReportTemplate(params)
	      .then(res => {
	        return res
	      })
	      .catch(err => {
	      })
	      .finally(() => {
	      })
	  },

	  async AC_ReportTemplateServiceGetManyReportTemplate ({dispatch, commit}, params) {
	    return api.ReportTemplateServiceGetManyReportTemplate(params)
	      .then(res => {
	        return res
	      })
	      .catch(err => {
	      })
	      .finally(() => {
	      })
	  },

	  async AC_ReportTemplateServiceQueryReportTemplate ({dispatch, commit}, params) {
	    return api.ReportTemplateServiceQueryReportTemplate(params)
	      .then(res => {
	        return res
	      })
	      .catch(err => {
	      })
	      .finally(() => {
	      })
	  },

	  async AC_ReportCorpAnalyzeServiceDeleteReportCorpAnalyze ({dispatch, commit}, params) {
	    return api.ReportCorpAnalyzeServiceDeleteReportCorpAnalyze(params)
	      .then(res => {
	        return res
	      })
	      .catch(err => {
	      })
	      .finally(() => {
	      })
	  },

	  async AC_ReportCorpAnalyzeServiceGetReportCorpAnalyze ({dispatch, commit}, params) {
	    return api.ReportCorpAnalyzeServiceGetReportCorpAnalyze(params)
	      .then(res => {
	        return res
	      })
	      .catch(err => {
	      })
	      .finally(() => {
	      })
	  },

	  async AC_ReportCorpAnalyzeServiceAddReportCorpAnalyze ({dispatch, commit}, params) {
	    return api.ReportCorpAnalyzeServiceAddReportCorpAnalyze(params)
	      .then(res => {
	        return res
	      })
	      .catch(err => {
	      })
	      .finally(() => {
	      })
	  },

	  async AC_ReportCorpAnalyzeServiceUpdateReportCorpAnalyze ({dispatch, commit}, params) {
	    return api.ReportCorpAnalyzeServiceUpdateReportCorpAnalyze(params)
	      .then(res => {
	        return res
	      })
	      .catch(err => {
	      })
	      .finally(() => {
	      })
	  },

	  async AC_ReportCorpAnalyzeServiceUpdateManyReportCorpAnalyze ({dispatch, commit}, params) {
	    return api.ReportCorpAnalyzeServiceUpdateManyReportCorpAnalyze(params)
	      .then(res => {
	        return res
	      })
	      .catch(err => {
	      })
	      .finally(() => {
	      })
	  },

	  async AC_ReportCorpAnalyzeServiceGetManyReportCorpAnalyze ({dispatch, commit}, params) {
	    return api.ReportCorpAnalyzeServiceGetManyReportCorpAnalyze(params)
	      .then(res => {
	        return res
	      })
	      .catch(err => {
	      })
	      .finally(() => {
	      })
	  },

	  async AC_ReportCorpAnalyzeServiceQueryReportCorpAnalyze ({dispatch, commit}, params) {
	    return api.ReportCorpAnalyzeServiceQueryReportCorpAnalyze(params)
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

	  async AC_DataDictionaryServiceDeleteDataDictionary ({dispatch, commit}, params) {
	    return api.DataDictionaryServiceDeleteDataDictionary(params)
	      .then(res => {
	        return res
	      })
	      .catch(err => {
	      })
	      .finally(() => {
	      })
	  },

	  async AC_DataDictionaryServiceGetDataDictionary ({dispatch, commit}, params) {
	    return api.DataDictionaryServiceGetDataDictionary(params)
	      .then(res => {
	        return res
	      })
	      .catch(err => {
	      })
	      .finally(() => {
	      })
	  },

	  async AC_DataDictionaryServiceAddDataDictionary ({dispatch, commit}, params) {
	    return api.DataDictionaryServiceAddDataDictionary(params)
	      .then(res => {
	        return res
	      })
	      .catch(err => {
	      })
	      .finally(() => {
	      })
	  },

	  async AC_DataDictionaryServiceUpdateDataDictionary ({dispatch, commit}, params) {
	    return api.DataDictionaryServiceUpdateDataDictionary(params)
	      .then(res => {
	        return res
	      })
	      .catch(err => {
	      })
	      .finally(() => {
	      })
	  },

	  async AC_DataDictionaryServiceUpdateManyDataDictionary ({dispatch, commit}, params) {
	    return api.DataDictionaryServiceUpdateManyDataDictionary(params)
	      .then(res => {
	        return res
	      })
	      .catch(err => {
	      })
	      .finally(() => {
	      })
	  },

	  async AC_DataDictionaryServiceGetManyDataDictionary ({dispatch, commit}, params) {
	    return api.DataDictionaryServiceGetManyDataDictionary(params)
	      .then(res => {
	        return res
	      })
	      .catch(err => {
	      })
	      .finally(() => {
	      })
	  },

	  async AC_DataDictionaryServiceQueryDataDictionary ({dispatch, commit}, params) {
	    return api.DataDictionaryServiceQueryDataDictionary(params)
	      .then(res => {
	        return res
	      })
	      .catch(err => {
	      })
	      .finally(() => {
	      })
	  },

	  async AC_TemplateSectionManageServiceRewriteTemplateSectionDelete ({dispatch, commit}, params) {
	    return api.TemplateSectionManageServiceRewriteTemplateSectionDelete(params)
	      .then(res => {
	        return res
	      })
	      .catch(err => {
	      })
	      .finally(() => {
	      })
	  },

	  async AC_RenewSectionTreeSortUpdateSort ({dispatch, commit}, params) {
	    return api.RenewSectionTreeSortUpdateSort(params)
	      .then(res => {
	        return res
	      })
	      .catch(err => {
	      })
	      .finally(() => {
	      })
	  },

	  async AC_TemplateSectionTreeServiceGetTemplateSectionTree ({dispatch, commit}, params) {
	    return api.TemplateSectionTreeServiceGetTemplateSectionTree(params)
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

}



export default {
    state,
    getters,
    actions,
    mutations
}

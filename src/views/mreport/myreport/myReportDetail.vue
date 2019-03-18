<template>
    <div class="special-vue">
        <div class="guide">
            <div class="left">
                <router-link to="/mreport/myreport">{{$t('report.myReport')}}</router-link>
                 / {{ $route.query.name }}
            </div>
            <div class="right">
                <!-- <el-tooltip class="item" effect="dark" :content="$t('report.saveAsTemplate')" placement="bottom">
                    <img :src="saveimg" @click="saveTemplateShow = true" />
                </el-tooltip> -->
                <el-tooltip class="item" effect="dark" :content="$t('report.saveCurrentDraft')" placement="bottom">
                    <i class="el-icon-upload" @click="Draf()"></i>
                </el-tooltip>
                <el-tooltip class="item" effect="dark" :content="$t('message.preview')" placement="bottom">
                    <i class="el-icon-view" @click="preView()"></i>
                </el-tooltip>
                <el-tooltip class="item" effect="dark" :content="$t('myTarget.downloadWORD')" placement="bottom">
                    <i class="el-icon-download" @click="DownLoadPdforword"></i>
                </el-tooltip>
                <el-tooltip class="item" effect="dark" :content="$t('report.importCompanyResearch')" placement="bottom">
                    <i class="el-icon-edit-outline" @click="importResearch"></i>
                </el-tooltip>
            </div>
        </div>
         <div class="content-modify">
            <div class="queryside" :class="{ 'queryside-wrap': chosenWidth }">
                <div class="append-tree">
                    <el-dropdown>
                        <span class="el-dropdown-link">
                            <i class="el-icon-circle-plus-outline"></i>{{$t('message.add')}}
                        </span>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item v-for="(item,index) in options" :key="index" @click.native="appendTree(item)">{{item.label}}</el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                    <div class="chosen-width" @click="chosenWidth = !chosenWidth">
                        <i class="el-icon-d-arrow-left" v-if="!chosenWidth"></i>
                        <i class="el-icon-d-arrow-right" v-if="chosenWidth"></i>
                    </div>
                </div>
                <div class="nav-tree">
                    <el-tree
                    :data="navList"
                    draggable
                    node-key="id"
                    ref="vueTree"
                    highlight-current
                    @node-expand="nodeExpand"
                    @node-collapse="nodeCollapse"
                    :default-expanded-keys="expandedKeys"
                    :expand-on-click-node="false"
                    @node-click="handleNodeClick"
                    @node-drag-end="updateAnalyzeAspect">
                    <span class="custom-tree-node" slot-scope="{ node, data }">
                        {{ data.title }}
                        <el-dropdown trigger="click">
                            <i class="el-icon-arrow-down icon"></i>
                            <el-dropdown-menu slot="dropdown">
                                <el-dropdown-item @click.native="updateselectSection(data,'append')">{{$t('message.add')}}</el-dropdown-item>
                                <el-dropdown-item @click.native="updateselectSection(data,'updata')">{{$t('message.update')}}</el-dropdown-item>
                                <el-dropdown-item @click.native="updateselectSection(data,'delete')">{{$t('dataTable.delete')}}</el-dropdown-item>
                            </el-dropdown-menu>
                        </el-dropdown>
                    </span>
                    </el-tree>
                </div>
            </div>
            <div class="container1">
                <div class="report-research-content">
                    <!-- <span class="open" @click="open = !open">
                        <span v-if="!open"><i class="el-icon-circle-plus"></i>{{ $t('report.expand') }}</span>
                        <span v-if="open"><i class="el-icon-remove"></i>{{ $t('report.collapse') }}</span>
                    </span> -->
                     <!-- v-if="open" -->
                    <ul class="join-report-research-list">
                        <li v-for="(item,index) in joinReportResearchList" :key="index">
                            <p @click="reportResearch(item)">{{$t('mresearch.companyResearch')}} > {{ item.corpName }}     {{ item.corpCode }}</p>
                            <i class="el-icon-circle-close" @click="selectDelete(item)"></i>
                        </li>
                    </ul>

                    <!-- <ul class="join-report-research-list" v-if="!open">
                        <li v-if="index == joinReportResearchList.length - 1" v-for="(item,index) in joinReportResearchList" :key="index">
                            <p @click="reportResearch(item)">{{$t('mresearch.companyResearch')}} > {{ item.corpName }}     {{ item.corpCode }}</p>
                            <i class="el-icon-circle-close" @click="selectDelete(item)"></i>
                        </li>
                    </ul> -->
                </div>
                
                <div v-show="!companyResearchDetailShow && !companyResearchListShow">
                    <div class="title-content">
                        <div class="title">{{selectSection.title}}</div>
                        <div class="editimg">
                            <el-button v-if="!isEdit" type="primary" @click="is_Edit(true)">{{$t('dataTable.edit')}}</el-button>
                            <el-button v-if="isEdit" type="primary" @click="submit">{{$t('dataTable.save')}}</el-button>
                        </div>
                    </div>
                    <div class="edit-text">
                        <!-- 封面 -->
                        <cover ref="cover" :section="selectSection" :edit="isEdit" v-if="selectSection.type == 5"></cover> 
                        <!-- 富文本 -->
                        <div v-else-if="selectSection.type!=5 && isEdit">
                            <UEditor :config=config :defaultMsg="richText" @onChange="onChange" ref="ueditor"></UEditor>
                        </div>
                        <div v-else v-html="richText"></div> 
                    </div>
                </div>

                <div class="research-content" v-show="companyResearchDetailShow || companyResearchListShow">
                    <div class="title">{{ $t('mresearch.companyResearch') }}</div>
                    <div v-if="companyResearchListShow">
                        <researchList @selectRow="selectResearchList"></researchList>
                        <span slot="footer" class="dialog-footer">
                            <el-button type="primary" @click="selectResearchDetail">{{$t('message.confirm')}}</el-button>
                        </span>
                    </div>

                    <researchDetail v-if="companyResearchDetailShow" @joinReportSection="joinReportSection" :researchDetailParams="researchDetailParams"></researchDetail>
                </div>
           </div>
        </div>

        <!-- 财务分析创建 -->
        <analyzeSection ref="analyzeSection"></analyzeSection>

        <!-- 新增弹出框 -->
        <el-dialog :title="textTitle" :visible.sync="Section" width="450px" @close="close">
            <el-form ref="addform" :model="addform" label-width="120px">
                <el-form-item :label="$t('reportTemplate.chapterName')">
                    <el-input v-model="addform.title"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="updataTree">{{$t('message.confirm')}}</el-button>
                <el-button @click="Section = false">{{$t('message.cancel')}}</el-button>
            </span>
        </el-dialog>

        <!-- 另存为模版 -->
        <el-dialog :title="$t('reportTemplate.reportTemplate')" :visible.sync="saveTemplateShow" width="450px" @close="close">
            <el-form label-width="120px">
                <el-form-item :label="$t('report.reportName')">
                    <el-input v-model="saveTemplate.title"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="savetemplate">{{$t('message.confirm')}}</el-button>
                <el-button @click="saveTemplateShow = false">{{$t('message.cancel')}}</el-button>
            </span>
        </el-dialog>

        <!-- 删除SectionCorpAnalyze -->
        <el-dialog title="" :visible.sync="deleteSectionCorpAnalyzeShow" width="300px" center>
            <div class="del-dialog-cnt">{{$t('message.deleteSure')}}</div>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="deleteSectionCorpAnalyze()">{{$t('message.confirm')}}</el-button>
                <el-button @click="deleteSectionCorpAnalyzeShow = false">{{$t('message.cancel')}}</el-button>
            </span>
        </el-dialog>

        <!-- 删除章节 -->
        <el-dialog title="" :visible.sync="deleteShow" width="300px" center>
            <div class="del-dialog-cnt">{{$t('message.deleteSure')}}</div>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="deleteTree()">{{$t('message.confirm')}}</el-button>
                <el-button @click="deleteShow = false">{{$t('message.cancel')}}</el-button>
            </span>
        </el-dialog>
            <!-- 编辑可能的chart弹出框 -->
        <dialogchart :child-com="chartSection"></dialogchart>
        <!-- 预览 -->
        <preview :child-content="previewContent"  v-show="isPre" @hidepreview="hidepreview"></preview> 
    </div>
</template>
<script>
    import bus from '../../common/bus';
    import UEditor from '../../ueditor/ueditor.vue';
    import cover from '../components/cover.vue';
    import preview from '../components/preview.vue';
    import analyzeSection from '../components/analyzeSection'
    import dialogchart from '../../mframe/components/dialogchart';
    import addimg from '../../../../static/img/tags/add.png';
    import editimg from '../../../../static/img/tags/editor.png';
    import downimg from '../../../../static/img/tags/down.png';
    import deleteimg from '../../../../static/img/tags/delete.png';
    import titckimg from '../../../../static/img/tags/titck.png';
    import saveimg from '../../../../static/img/tags/save.png';
    import outimg from '../../../../static/img/tags/out.png';
    import researchList from '../../mresearch/components/researchList';
    import researchDetail from '../../mresearch/CompanyResearch/researchDetail';
    export default {
        data: function(){
            return {
                charturl:"/reportmanage/chartDataManageService/saveAsChartJson",  
                url3:"/editorback/ueditor/previewPdf",  
                addimg:addimg,
                editimg:editimg,
                downimg:downimg,
                titckimg:titckimg,
                deleteimg:deleteimg,
                saveimg:saveimg,
                outimg:outimg,
                deleteShow: false,
                navList: [],
                textTitle: '',
                config: {
                    autoHeightEnabled: false,
                    autoFloatEnabled: true,
                    initialContent:'请输入内容',   //初始化编辑器的内容,也可以通过textarea/script给值，看官网例子
                    autoClearinitialContent:true, //是否自动清除编辑器初始内容，注意：如果focus属性设置为true,这个也为真，那么编辑器一上来就会触发导致初始化的内容看不到了
                    initialFrameWidth: '100%',
                    initialFrameHeight: 550,
                    BaseUrl: '',
                    UEDITOR_HOME_URL: 'static/ueditor/'
                },
                selectSection: '',
                Section:false,
                addform:{
                    title:'',
                },
                options: [
                    {
                        value: '3',
                        label: this.$t('reportTemplate.text')
                    }, 
                    {
                        value: '5',
                        label: this.$t('reportTemplate.cover')
                    }, 
                    {
                        value: '4',
                        label: this.$t('reportTemplate.financialAnalysis')
                    }, 
                    {
                        value: '6',
                        label: this.$t('reportTemplate.catalog')
                    }, 
                    {
                        value: '7',
                        label: this.$t('reportTemplate.clause')
                    }
                ],
                editform:{
                    title:''
                },
                saveTemplate: {},
                saveTemplateShow: false,
                chartSection:false,
                step:1,
                reportId: this.$route.query.reportId,
                isPre:false,
                items: [],
                dragarr:[],
                disclaimer:'<p><strong><br/></strong></p><p><span style="text-decoration:underline;"><strong>Analyst Certification</strong></span></p><p><strong><br/></strong></p><p>The research analyst primarily responsible for the preparation of all or part of this research report hereby certifies that: (i) all of the views expressed in this research report reflect accurately my personal views about the subject company or companies and its or their securities; and (ii) no part of my compensation was, is, or will be directly or indirectly, related to the specific recommendations or views expressed in this research report. The research analyst confirms that neither he/she nor his/her associate(s) serves as an officer of the company mentioned in this research report and has any financial interests or hold any shares of the securities mentioned in this research report.</p><p><br/></p><p><span style="text-decoration: underline;"><strong>Disclaimer</strong></span></p><p><strong><br/></strong></p><p>The research report is prepared by Tongfang Securities Limited (<strong>“Tongfang Securities”</strong>) and is distributed to its selected clients.</p><p><br/></p><p>This research report is strictly confidential to the recipient and provided only for the use of the recipient and it is not intended for persons in places where the distribution or publication of this research report is not permitted under applicable laws or regulations of such places. The securities referred to in this research report may not be eligible for sale in some jurisdictions. This research report is for information purposes only and does not constitute an offer to buy or sell any securities or a solicitation of an offer to buy, or recommendation for investment in, any securities. This information contained in this research report has been compiled by Tongfang Securities from sources that it believes to be reliable and the opinions, analysis, forecasts, projections and expectations contained in this research report are based on such information and no representation, warranty or guarantee is made or given by Tongfang Securities or any person for its accuracy or completeness. Such opinions and estimates may be different from or contrary to the opinions presented by the other business departments, units or affiliates of Tongfang Securities, as different assumptions and standards, different views and analytical methods may be adopted in the preparation of such other materials. The points of view,opinions and analytical methods adopted in this research report are solely expressed by the analysts but not that of Tongfang Securities or its affiliates and Tongfang Securities is under no obligation to bring such other materials to the attention of any recipient of this research report. The information, opinions and forecasts presented in this research report are the current opinions of the analysts as of the date appearing on this material only which may subject to change at any time without notice. Neither Tongfang Securities nor its affiliates accept any liability whatsoever for any direct or consequential loss arising from any use of material contained in this research report or otherwise arising in connection therewith. Please be aware of the fact that investment involve risks. The value or price of investments referred to in this research report and the return from them may fluctuate. Past performance is not reliable indicator to future performance. Future returns are not guaranteed and a loss of original capital may occur. Any recommendation contained in this research report does not have regard to the specific investment objectives, financial situation and the particular needs of any individuals. This research report shall not to be taken in substitution for the exercise of judgment by respective recipients of this research report, where necessary, recipients should obtain professional financial, tax and legal advice before making investment decisions.</p><p><br/></p><p>To the extent permitted by relevant and applicable laws or regulations: (i) Tongfang Securities, its affiliates and/or its directors and employees may deal as principal or agent, or buy or sell, or have long or short positions in, the securities or other instruments based thereon, of issuers or securities mentioned herein; (ii) Tongfang</p><p>Securities may take part or make investment in financing transactions with, or provide other services to or solicit business from issuer(s) of the securities mentioned in this research report; (iii) Tongfang Securities and its affiliates that carry on a business in Hong Kong in investment banking, proprietary trading or agency broking</p><p>in relation to securities may receive compensation from or mandates for investment banking services in the past 12 months from listed corporations whose securities are being reviewed herein; (iv) Tongfang Securities or its affiliates may act as the market makers in the securities in respect of the issuer mentioned in this research report.</p><p><br/></p><p><strong>This research report may not be reproduced, redistributed, or disseminated in any form by any mean to any other person without the prior written consent of Tongfang Securities.</strong></p><p><br/></p><p><strong>Copyright 2018. Tongfang Securities Limited. All rights reserved.</strong></p><p><br/></p><p><strong>Tongfang Securities Limited</strong></p><p><br/></p><p><strong>Unit 2102-3, 21/F, Golden Centre, 188 Des Voeux Road Central, Hong Kong</strong></p><p><br/></p><p><strong>Tel: +852 2306 0900</strong></p><p><br/></p><p><span style="text-decoration: underline; font-family: 楷体, 楷体_GB2312, SimKai;"><strong>分析师声明</strong></span></p><p><span style="font-family: 楷体, 楷体_GB2312, SimKai;">主要负责撰写本研究报告全部或部分内容的分析师在此声明：(i) 本研究报告所表述的任何观点均准确反映了上述分析师个人对标的公司或其证券的看法; 及 (ii) 该分析师所得酬劳的任何组成部分不论在过去，现在及将来，直接或间接，均与本研究报告的具体建议或观点并无任何联系。此外，该分析师确认其本人或其有联系人士并无担任本研究报告所述公司之高级职员，亦无拥有本研究报告中提及的证券的任何财务权益或股份。</span></p><p><br/></p><p><br/></p><p><span style="text-decoration: underline; font-family: 楷体, 楷体_GB2312, SimKai;"><strong>免责条款</strong></span></p><p><span style="text-decoration: underline; font-family: 楷体, 楷体_GB2312, SimKai;"><strong><br/></strong></span></p><p><span style="font-family: 楷体, 楷体_GB2312, SimKai;">本研究报告由同方证券有限公司(<strong>「 同方证券」</strong>)编写并分发予其特选客户使用。</span></p><p><br/></p><p><span style="font-family: 楷体, 楷体_GB2312, SimKai;">本研究报告对于收件人而言属高度机密，仅供收件人使用。本研究报告并非意图发送、发布给在当地法律法规不允许该研究报告发送、发布的人士。本研究报告所评论的证券可能在某些地方不能出售。本研究报告仅供参考之用，并不构成购买或出售任何证券或征求购买要约或推荐投资任何证券的要约。本研究报告中的信息由同方证券从其认为可靠的来源编制而成，本研究报告中的观点、分析、展望、预测和预期均基于此类信息，但我们不保证该信息的准确性和完整性。有关意见和预测可能与同方证券其他业务部门，单位或联属公司由于采用不同的观点和分析方法而提出不同或相悖的意见。本研究报告中采用的观点，意见和分析方法仅由分析师提出，并不包括同方证券或其联属公司的观点及意见。同方证券没有义务将其他观点及意见引起本研究报告任何收件人注意。本研究报告所载资料、意见和预测仅反映分析师于发出本研究报告当日的观点，这些资料可能随时更改不予通告。同方证券及其联属公司概不就因使用本研究报告所载数据或因此而导致的任何直接或间接损失承担任何责任。请注意，投资涉及风险，本研究报告中提及的投资价值或价格以及从中获得的回报可能会有所波动。过去的表现不能代表未来的业绩。 未来的回报不能得到保证，并且可能发生资本的损失。本研究报告所评论的证券的任何建议并未有考虑具体的投资目标，财务状况或个人需要。客户不应以本研究报告取代其独立判断或仅根据本研究报告做出投资决策。如有需要，应在作出投资决策前先寻求专业的财务，税务和法律意见。</span></p><p><br/></p><p><span style="font-family: 楷体, 楷体_GB2312, SimKai;">在相关及适用法律或法规允许的范围内：（i）同方证券及其联属公司及╱或其董事及雇员可能会作为委托人或代理人就本研究报告所述发行人或其证券进行交易，或购买或出售或持有其证券; （ii）同方证券可能参与或投资于本研究报告所述证券的交易，或向本研究报告所述发行人提供或提供其他服务或招揽其业务; （iii）同方证券及其联属公司在香港进行投资银行业务，自营交易或代理经纪业务可能会在过去 12 个月内从本研究报告所述证券所属的上市公司获得报酬或服务授权; （iv）同方证券或其联属公司可能会担任本研究报告所述发行人的证券做市商。</span></p><p><br/></p><p><span style="font-family: 楷体, 楷体_GB2312, SimKai;"><strong>未经同方证券事先书面同意，任何人不得以任何目的、形式将本报告的任何部分复制、分发或传播给任何其他人。</strong></span></p><p><span style="font-family: 楷体, 楷体_GB2312, SimKai;"><strong><br/></strong></span></p><p><span style="font-family: 楷体, 楷体_GB2312, SimKai;"><strong>2018 &nbsp;版权所有:同方证券有限公司。保留一切权利。</strong></span></p><p><span style="font-family: 楷体, 楷体_GB2312, SimKai;"><strong><br/></strong></span></p><p><span style="font-family: 楷体, 楷体_GB2312, SimKai;"><strong>同方证券有限公司</strong></span></p><p><span style="font-family: 楷体, 楷体_GB2312, SimKai;"><strong><br/></strong></span></p><p><span style="font-family: 楷体, 楷体_GB2312, SimKai;"><strong>香港德辅道中188号金龙中心21楼2102-3</strong></span></p><p><span style="font-family: 楷体, 楷体_GB2312, SimKai;"><strong><br/></strong></span></p><p><span style="font-family: 楷体, 楷体_GB2312, SimKai;"><strong>电话：+852 2606 0900</strong></span></p><p><br/></p>',
                catalogdata:"<p><br/></p><p><strong>目录</strong></p><p><br/></p><p><strong>公司管理架构.........................................................................................................................................3</strong></p><p><br/></p><p>股权结构...........................................................................................................................................................................3</p><p>公司治理...........................................................................................................................................................................3</p><p><br/></p><p><strong>市场观点变迁.........................................................................................................................................4</strong></p><p><br/></p><p>股价变化及对应事件......................................................................................................................................................4</p><p>机构观点变迁..................................................................................................................................................................4</p><p><br/></p><p><strong>产业链....................................................................................................................................................5</strong></p><p><br/></p><p><strong>产品结构................................................................................................................................................6</strong></p><p><br/></p><p>手机镜头...........................................................................................................................................................................6<br/></p><p>车载镜头...........................................................................................................................................................................7</p><p>手机摄像头模组...............................................................................................................................................................7</p><p><br/></p><p><strong>营收分析................................................................................................................................................9</strong></p><p><br/></p><p><strong>客户结构...............................................................................................................................................10</strong></p><p><br/></p><p><strong>行业需求和变革.....................................................................................................................................11</strong></p><p><br/></p><p>行业发展趋势..................................................................................................................................................................11</p><p>行业技术壁垒..................................................................................................................................................................13</p><p>公司技术路线演进..........................................................................................................................................................16</p><p><br/></p><p><strong>营运能力 ...............................................................................................................................................19</strong></p><p><br/></p><p><strong>同业比较 ...............................................................................................................................................20</strong></p><p><br/></p><p><strong>盈利能力对比.........................................................................................................................................20</strong><br/></p><p><br/></p><p><br/></p><p><br/></p>",
                imgtest:'',
                previewContent:{},
                isEdit:false,
                richText:'',
                newSectionTree: '',
                chosenWidth: true,
                companyResearchListShow: false,
                companyResearchDetailShow: false,
                selectResearch: {},
                researchDetailParams: {},
                joinReportResearchList: [],
                selectSectionCorpAnalyze: {},
                deleteSectionCorpAnalyzeShow: false,
                open: false,
                expandedKeys: [],
            }
        },
        components: {
            UEditor,
            cover,
            preview,
            dialogchart,
            researchList,
            researchDetail,
            analyzeSection
        },
        created(){
            this.queryAnalyzeAspect();
            this.querySectionCorpAnalyze()
        },
        methods: {
            nodeExpand(data,node,s) {
                this.expandedKeys.push(data.id)
            },

            nodeCollapse(data,node,s) {
                this.expandedKeys.forEach((item,index) => {
                    if(item == data.id) {
                        this.expandedKeys.splice(index,1)
                    }
                })
            },

            handleNodeClick(item) {
                this.selectSection = item;
                this.companyResearchListShow = false
                this.companyResearchDetailShow = false

                this.getSection()
            },

            async getSection() {
                let params = {id: this.selectSection.id}

                let result = await this.$store.dispatch('AC_SectionServiceGetSection',params)
                if(result.data.section.richText) {
                    this.isEdit = false; 
                    this.richText = result.data.section.richText
                }else {
                    this.isEdit=true; 
                    if(this.selectSection.type==6){
                        this.richText=this.catalogdata;
                    }else if(this.selectSection.type==7){
                        this.richText=this.disclaimer;
                    }else {
                        this.richText=''
                    }
                }
            },

            updateselectSection (data,type) {
                this.selectSection = data
                if(type == 'append') {
                    this.textTitle = this.$t('report.addText')
                    this.addform.value = 3
                    this.addform.type = 'treeCreate'
                    this.Section = true
                }else if(type == 'updata') {
                    this.textTitle = this.$t('report.modifyText')
                    this.Section = true
                    this.addform = data
                }else {
                    this.deleteShow = true
                }
            },

            async queryAnalyzeAspect() {
                let params = {
                    reportId: this.$route.query.reportId,
                }
                let result = await this.$store.dispatch('AC_SectionTreeServiceGetSectionTree',params)
                this.navList = result.data.list
                if(this.navList.length > 0){
                    if(this.newSectionTree) {
                        this.handleNodeClick(this.newSectionTree)
                        this.$nextTick(() => {
                            this.$refs.vueTree.setCurrentKey(this.newSectionTree.id);
                            this.newSectionTree = ''
                        })
                        return
                    }
                    this.handleNodeClick(this.navList[0])
                    this.$nextTick(() => {
                        this.$refs.vueTree.setCurrentKey(this.navList[0].id);
                    })
                }  
            },
            async updateAnalyzeAspect(draggingNode, dropNode, ev) {
                let type
               
                if (dropNode.data.id == draggingNode.data.id) {
                    return
                }

                if (ev == 'before') {
                    type = 1
                }else if (ev == 'inner') {
                    type = 2
                }else if (ev == 'after') {
                    type = 3
                }

                let params = {
                    dragSectionId: draggingNode.data.id,
                    destSectionId: dropNode.data.id,
                    type: type
                }

                let result = await this.$store.dispatch('AC_RenewSectionTreeSortUpdateSort',params)
                result.code == 200 ? this.$message.success(this.$t('message.success')) : this.$message.error(this.$t('message.fail')) 
                this.queryAnalyzeAspect()
            },
            
            async appendTree(item) {
                //文本创建
                if(item.value == 3) {
                    if(this.Section && !this.addform.title) {
                        this.$message.error(this.$t('message.empty'))
                        return
                    }
                    if(!this.Section) {
                        this.textTitle = this.$t('report.addText')
                        this.Section = true
                        return
                    }
                }

                //财务分析创建
                if(item.value == 4) {
                    this.$refs.analyzeSection.clickModelShow()
                    return 
                }

                let params = {
                    reportId: this.reportId,
                    title: item.value == '3' ? this.addform.title : item.label,
                    type: item.value,
                    parentSectionId: this.addform.type == 'treeCreate' ? this.selectSection.id : '0'
                }
                
                let result = await this.$store.dispatch('AC_RenewSectionAddAddSection',params)
                result.code == 200 ? this.$message.success(this.$t('message.success')) : this.$message.error(this.$t('message.fail')) 
                this.newSectionTree = result.data.section
                this.close()
                this.queryAnalyzeAspect()
            },
            async updataTree() {
                if (!this.addform.title) {
                    this.$message.error(this.$t('message.empty'))
                    return
                }

                if(!this.addform.id) {
                    this.appendTree({value: 3})
                    return
                }
 
                let params = {
                    reportId: this.reportId,
                    id: this.addform.id,
                    title: this.addform.title,
                }
                let result = await this.$store.dispatch('AC_SectionServiceUpdateSection',params)
                result.code == 200 ? this.$message.success(this.$t('message.success')) : this.$message.error(this.$t('message.fail')) 
                this.close()
                this.queryAnalyzeAspect()
            },
            async deleteTree() {
                let params = {
                    id: this.selectSection.id
                }
                let result = await this.$store.dispatch('AC_SectionManageServiceRewriteSectionDelete',params)
                result.code == 200 ? this.$message.success(this.$t('message.success')) : this.$message.error(this.$t('message.fail')) 
                this.deleteShow = false
                this.queryAnalyzeAspect()
            },

            onChange(val){
                this.chartSection=val.chart;
            },
            is_Edit(val){
                this.isEdit=val;
            },
           async Draf(){
                let params = {
                    "reportId": this.reportId,
                    "sectionId": this.navList[0].id,
                    "userId": localStorage.getItem('userId')
                }
                let result = await this.$store.dispatch('AC_UserReportDraftManageUpdateUserReportDraft',params)
                result.code == 200 ? this.$message.success(this.$t('message.success')) : this.$message.error(this.$t('message.fail')) 
                bus.$emit('setDraf',{"type":200});
           },
           preView(){
                this.isPre=true;
                let params = {
                    "reportId": this.reportId,
                }
                this.$axios.get(this.url3,params).then((res) => {
                     let data = res.data.data;
                     this.previewContent={
                        reportcontent: data
                     }
                }).catch(function (err) {
                    console.log("调用失败", err)
                })
                
            },
            async savetemplate(){
                if(!this.saveTemplate.title) {
                    this.$message.error(this.$t('message.empty'))
                    return
                }

                let params = {
                    reportId: this.$route.query.reportId,
                    tempName: this.saveTemplate.title
                }   

                this.$store.commit('loadingChange',{show: true,text: this.$t('message.inRequest')})
                const result = await this.$store.dispatch('AC_ReportManageServiceSaveAsTemplate', params);
                this.$store.commit('loadingChange',{show: false})
                this.close()
                result.code == 200 ? this.$message.success(this.$t('message.success')) : this.$message.error(this.$t('message.fail')); 
            },
          
            async submit(){
                if(this.selectSection.type == 5) {
                    this.$refs.cover.updateCover()
                    return
                }

                let reportId =this.$route.query.reportId ;
                let content=this.$refs.ueditor.getUEContent();
                let para = {
                    reportId: reportId,
                    id: this.selectSection.id,
                    richText: content
                }
                const res = await this.$store.dispatch('AC_SectionServiceUpdateSection',  para);   
                if(res.code==200){
                    this.isEdit=false; 
                    this.$message.success(this.$t('message.success')); 
                    this.handleNodeClick(this.selectSection)
                }
            },
            
            DownLoadPdforword(){
                let params = { 
                    reportId:this.reportId, 
                    title:this.$route.query.name,
                    userId: localStorage.getItem('userId')
                }

                this.$store.commit('loadingChange',{show: true,text: this.$t('message.inRequest')})
                this.$axios.get('/editorback/ueditor/downloadWord',params).then((res) => {
                    this.getPdfDownResult(res.data)
                })
            }, 
            
            getPdfDownResult(taskId) {
                this.$axios.post('/editorback/pdfDownTask/getPdfDownResult',{ 
                    taskId:taskId
                }).then((res) => { 

                    if (res.data.errorMsg == '任务仍在运行中') {
                        this.$store.commit('loadingChange',{show: true,text: res.data.data ? res.data.data : '0%'})
                        setTimeout(() => { 
                            this.getPdfDownResult(taskId)
                        }, 3000);
                        return 
                    }
                    
                    this.$message.success(this.$t('message.success'))
                    this.$store.commit('loadingChange',{show: false})
                    
                    if (res.data.returnCode == 'error') {
                        this.$message.error(this.$t('message.fail'))
                        return
                    }

                    if(res.data){
                        window.open(res.data.data); 
                    }
                }) 
            },

            async querySectionCorpAnalyze() {
                let params = {
                    reportId: this.$route.query.reportId
                }

                const result = await this.$store.dispatch('AC_ReportCorpAnalyzeServiceQueryReportCorpAnalyze', params)
                let sectionCorpAnalyze = []
                if(!result.data.reportCorpAnalyzes || result.data.reportCorpAnalyzes.length == 0) {
                    this.joinReportResearchList = []
                }else {
                    sectionCorpAnalyze = result.data.reportCorpAnalyzes
                    let arr = []
                    sectionCorpAnalyze.forEach(item => {
                        arr.push(item.corpAnalyzeId)
                    })
                    this.getManyCorpAnalyze(arr,sectionCorpAnalyze)
                }
            },

            async getManyCorpAnalyze(data,sectionCorpAnalyze) {
                let params = {
                    id: data
                }

                const result = await this.$store.dispatch('AC_CorpAnalyzeServiceGetManyCorpAnalyze', params)
                let corpAnalyzes = result.data.corpAnalyzes ? result.data.corpAnalyzes : []
                for(let i = 0;i < sectionCorpAnalyze.length; i++) {
                    for(let j = 0;j < corpAnalyzes.length; j++) {
                        if (sectionCorpAnalyze[i].corpAnalyzeId == corpAnalyzes[j].id) {
                            corpAnalyzes[j].sectionCorpAnalyzeId = sectionCorpAnalyze[i].id
                        }
                    }
                }

                this.joinReportResearchList = corpAnalyzes
            },

            selectDelete(item) {
                this.selectSectionCorpAnalyze = item
                this.deleteSectionCorpAnalyzeShow = true
            },

            async deleteSectionCorpAnalyze() {
                let params = {
                    id: this.selectSectionCorpAnalyze.sectionCorpAnalyzeId
                }

                const result = await this.$store.dispatch('AC_ReportCorpAnalyzeServiceDeleteReportCorpAnalyze', params)
                result.code == 200 ? this.$message.success(this.$t('message.success')) : this.$message.error(this.$t('message.fail'))
                this.deleteSectionCorpAnalyzeShow = false
                this.querySectionCorpAnalyze()
            },

            importResearch() {
                this.companyResearchListShow = true
                this.companyResearchDetailShow = false
            },

            selectResearchList(row) {
                this.$message.success(this.$t('message.chosen') + row.modelName)
                this.selectResearch = row
            },

            selectResearchDetail() {
                if(!this.selectResearch) {
                    this.$message.error(this.$t('message.noChosen'))
                    return
                }

                let params = {
                    bmId: this.selectResearch.bmId,
                    corpId: this.selectResearch.id,
                    name: this.selectResearch.corpName,
                    corpCode: this.selectResearch.corpCode,
                }

                this.researchDetailParams = params
                this.companyResearchListShow = false
                this.companyResearchDetailShow = true
            },

            async joinReportSection(data) {
                let params = {
                    reportId: this.$route.query.reportId,
                    sectionId: this.selectSection.id,
                    textTaggingId: data.id,
                    type: data.type,
                    corpAnalyzeId: this.selectResearch.id
                }

                this.$store.commit('loadingChange',{show: true,text: this.$t('message.inRequest')})
                const result = await this.$store.dispatch('AC_ReportManageServiceImportAnalyzeAspect', params);
                this.$store.commit('loadingChange',{show: false})
                if(result.code == 200) {
                    this.querySectionCorpAnalyze()
                    this.handleNodeClick(this.selectSection)
                    this.$message.success(this.$t('message.success'))
                    this.companyResearchListShow = false
                    this.companyResearchDetailShow = false
                }else {
                    this.$message.error(this.$t('message.fail'))
                }
            },

            reportResearch(item) {
                let params = {
                    bmId: item.bmId,
                    corpId: item.id,
                    name: item.corpName,
                    corpCode: item.corpCode,
                }

                this.researchDetailParams = params
                this.companyResearchDetailShow = true
            },

            hidepreview(val){
                this.isPre=false;
            },

            close () {
                this.Section = false
                this.addform = {
                    title: ''
                }
                this.saveTemplate = {}
                this.saveTemplateShow = false
            }
        }
    }
</script>
<style lang="less" scoped>
.special-vue{
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    .guide{
        display: flex;
        justify-content: space-between;
        background: #1c84c6;
        height: 35px;
        color: #fff;
        line-height: 35px;
        font-size: 1.3rem;
        padding: 0 0 0 2rem;
        .left a{
            color:#fff;
        } 
    }
    .guide .right{
        padding-right: 40px;
        img{
            font-size: 2rem;
            margin-right: 15px;
            cursor: pointer;
            vertical-align: text-bottom;
        }
    }
    .guide .right i{
        font-size: 2rem;
        margin-right: 15px; 
        cursor: pointer;
    }


}
.content-modify{
    flex: 1;
    display: flex;
    background: #f4f5f7;
    .queryside-wrap{
        width: 200px;
    }
    .queryside {
        min-width: 200px;
        font-size: 1.5rem;  
        border-right: 1px solid #ddd; 
        background: #fff;
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
        .append-tree{
            text-align: center;
            height: 36px;
            line-height: 36px;
            background: #e2e4e9;
            cursor: pointer;
            position: relative;
            .chosen-width{
                font-size: 18px;
                position: absolute;
                top: 0;
                right: 2px;
            }
            .chosen-width:hover{
                color: rgba(0,0,0,.5)
            }
        }
        .nav-tree{
            height: 100%;
            overflow: auto;
            display: flex;
            .el-tree{
                flex: 1;
            }
            .icon{
                opacity: 0;
            }
            .el-tree-node__content:hover {
                .icon{
                    opacity: 1;
                }
            }
        }
    }
    .container1{
        flex: 1;
        padding: 20px 10px 10px;
        border-radius: 0px;
        background: #f4f5f7; 
        overflow: auto;
        .title-content{
            background: #fff;
            height: 111px;
            line-height: 40px;
            padding: 35px 25px;
            box-sizing: border-box;
            border-bottom: 1px solid #d4d0d0;
            .title{
                font-size: 24px;
                font-weight: bold;
                float: left;
            }
            .editimg {
                float: right;
            }
        }
        .edit-text{
            background: #fff;
            padding: 40px 25px;
        } 
        .quill-editor{
            background: #fff;
        }
    }
}
.el-select{
    width: 100%;
}

.el-dropdown-pdf{
    color: #fff;
}
.join-report-research-list {
    li{
        font-size: 12px;
        line-height: 32px;
        text-align: right;
        cursor: pointer;
        p{
            display: inline-block;
        }
    }
    li:hover{
        p{
            color: #1c84c6;
        }
    }
}
.report-research-content{
    position: relative;
    padding: 0 10px;
    background: #fff;
    margin-bottom: 10px;
    .open{
        display: none;
        position: absolute;
        top: -14px;
        right: 10px;
        line-height: 12px;
        font-size: 12px;
        cursor: pointer;
        background: #fff;
    }
}
.report-research-content:hover{
    .open{
        display: block;
    }
}
.research-content{
    background: #fff;
    padding: 10px;
    text-align: right;

    .title{
        line-height: 40px;
        font-size: 18px;
        text-align: left;
    }
}
</style>



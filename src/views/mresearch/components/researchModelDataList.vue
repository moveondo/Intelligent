<template>
    <div >
        <div class="table"    v-loading="loading">
           <summaryId :analyzeAspectId="analyzeAspectId" ref="summary"></summaryId>
            <draggable :list="tagText" v-if="isDraggable"  :move="getdata" @update="datadragEnd">
                <div class="table-content" v-for="(item,index) in tagText" :key="index">
                   <div class="top-text">
                     <div class="front">
                      <div class="header-img">{{item.userName | DealUserName }}</div>
                      <div  v-if ="isEditid==item.id" class="title" >
                           <el-input v-model="editTitle[item.id]" placeholder="请输入内容" class="edit-title"></el-input>
                           <el-button class="cancel" @click="isEditid = ''">{{$t('message.cancel')}}</el-button>
                           <el-button type="primary" @click="saveEdit('title',item)">{{$t('message.confirm')}}</el-button>
                      </div>
                      <div  v-else  class="title" >{{item.title}}</div>
                      <!-- <span class="addlabel" v-if="textLabel[item.id]">
                          <span  class="circle" :style="{backgroundColor:conBgColor[item.id]}"> </span> {{textLabel[item.id]}}
                      </span>
                      <span class="addlabel">
                          <el-dropdown @command="addlabel(item,$event)" >
                                <span class="el-dropdown-link">
                                  <i><img :src="labelimg" alt=""></i>标签 <i class="el-icon-arrow-down el-icon--right"></i>
                                </span>
                                <el-dropdown-menu slot="dropdown">
                                    <el-dropdown-item v-for="(item,index) in titleArr" :key="index" :command="item.id+'-'+item.title">
                                        <span><span  class="circle"> </span> {{item.title}}</span> 
                                    </el-dropdown-item>
                                </el-dropdown-menu>
                            </el-dropdown>
                      </span> -->
                       <el-select class="addlabel" v-model="summArr[item.id]" @change="addlabel(item)" placeholder="请选择">
                            <el-option  :key="0"  label="  "  value="  "> </el-option>
                            <el-option v-for="itemS in titleArr" :key="itemS.id"  :label="itemS.title"  :value="itemS.id"> </el-option>
                        </el-select>
                     </div>
                     <div>
                       <span class="big-small" @click="bigSmall(item)">
                           <i v-if="!isMove[item.id]" class="el-icon-arrow-down"></i> 
                           <i v-else class="el-icon-arrow-up"></i>
                       </span>
                       <span class="editdata" @click="editData(item)"><i class="el-icon-edit-outline"></i></span>
                       <span class="deletedata" @click="deleteData(item)">
                            <i v-if="!item.childFold || item.childFold.length == 0" class="el-icon-delete"></i>
                            <i v-if="item.childFold && item.childFold.length > 0" class="el-icon-circle-close-outline"></i>
                       </span>
                        <el-button @click="joinReportSection(item)" type="primary" v-if="$route.name== 'myReportDetail'">{{$t('mresearch.join')}}</el-button>
                        <el-checkbox @change="joinIntegrateList(item)" v-model="item.join" v-if="integrateByTime"></el-checkbox>
                     </div>
                   </div>
                    <div class="move" v-if ="isMove[item.id] && (!item.childFold || item.childFold.length == 0)">
                        <div class="text" >
                            <div  class="text-1 img" v-if="item.type=='table' || item.type=='pic'" v-html="item.sourceStr"></div>
                            <div  v-else-if="isEditid==item.id" class="text-1" >
                                <el-input type="textarea" :row=3 v-model="editSourcestr[item.id]" class="edit-title"></el-input>
                            </div>
                            <div  class="text-1" v-else>
                                <span>{{item.sourceStr}}</span> 
                            </div>
                             <div class="conclusion">
                                <span v-if="item.msg" class="con-clu"><i><img :src="finishimg" alt=""></i>结论:</span>
                                {{item.msg}}
                                <p>
                                <span v-if="item.msg" @click="updateConclusion(item)"><i><img :src="editcimg" alt=""></i> 【 {{$t('mresearch.editorialConclusion')}} 】</span> 
                                <span class="add-c" v-else @click="addConclusion(item)"><i><img :src="addcimg" alt=""></i> {{$t('mresearch.addConclusion')}}</span>
                                </p>
                            </div>
                        </div>
                        <div class="desc">
                            <div >
                                <p class="source-from" @click="selectEdit(item)"> <i><img :src="linkimg" alt=""></i> {{$t('task.source')}}:{{item.docTitle}}</p>
                                <p> <span class="publish-time">{{$t('industryModel.publishTime')}}:</span> {{item.publishTime | formatDate}}</p>
                            </div>
                            <div  class="operate">
                                <p>
                                 <span v-if="item.type=='table'" class="factor" @click="downExcel(item)">{{$t('analyst.download')}}</span>
                                <span v-else class="factor" @click="factor(item)"> <i><img :src="factorimg" alt=""></i>  {{$t('mresearch.influencingFactor')}}</span>
                                <span class="data" @click="Structured(item)"> <i><img :src="sdataimg" alt=""></i>  {{$t('mresearch.structuredData')}}</span> |
                                <span class="data" @click="comment(item)"><i><img :src="commentimg" alt=""></i>  <el-badge :value="item.commentCount" class="item">{{$t('mresearch.discuss')}}</el-badge></span>
                                </p>
                                <p><span class="publish-time">标注时间:</span> {{item.createdAt | formatDateHH}}</p>
                            </div>
                        </div>
                    </div>       

                    <div class="move" v-if ="isMove[item.id] && (item.childFold && item.childFold.length > 0)">
                        <div v-for="child in item.childFold" :key="child.id" class="child-content">
                            <div class="child-left">{{ child.publishTime | formatDateY }}</div>
                            <div class="child-right">
                                <div  class="text-1 img" v-if="child.type=='table' || child.type=='pic'" v-html="child.sourceStr"></div>
                                <div  v-else-if="isEditid==item.id" class="text-1" >
                                    <el-input type="textarea" :row=3 v-model="editSourcestr[child.id]" class="edit-title"></el-input>
                                </div>
                                <div  class="text-1" v-else>
                                    <span>{{child.sourceStr}}</span> 
                                </div>
                                <div class="conclusion">
                                    <span v-if="child.msg" class="con-clu"><i><img :src="finishimg" alt=""></i>结论:</span>
                                    {{child.msg}}
                                    <p>
                                        <span v-if="child.msg" @click="updateConclusion(child)"><i><img :src="editcimg" alt=""></i> 【 {{$t('mresearch.editorialConclusion')}} 】</span> 
                                        <span class="add-c" v-else @click="addConclusion(child)"><i><img :src="addcimg" alt=""></i> {{$t('mresearch.addConclusion')}}</span>
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div class="conclusion">
                            <span v-if="item.msg" class="con-clu"><i><img :src="finishimg" alt=""></i>结论:</span>
                            {{item.msg}}
                            <p>
                                <span v-if="item.msg" @click="updateConclusion(item)"><i><img :src="editcimg" alt=""></i> 【 {{$t('mresearch.editorialConclusion')}} 】</span> 
                                <span class="add-c" v-else @click="addConclusion(item)"><i><img :src="addcimg" alt=""></i> {{$t('mresearch.addConclusion')}}</span>
                            </p>
                        </div>
                        <div class="desc">
                            <div>
                                <p v-for="child in item.childFold" :key="child.id" style="padding-top:5px">
                                    <span class="source-from" @click="selectEdit(child)">{{$t('task.source')}}:{{child.docTitle || $t('message.noData')}}</span>
                                    <span class="margin-left: 10px;">
                                        <span class="publish-time">{{$t('industryModel.publishTime')}}:</span> {{child.publishTime | formatDate}}
                                    </span>
                                </p>
                            </div>
                            <div class="operate">
                                <p>
                                 <span v-if="item.type=='table'" class="factor" @click="downExcel(item)">{{$t('analyst.download')}}</span>
                                 <span v-else class="factor" @click="factor(item)"> <i><img :src="factorimg" alt=""></i>  {{$t('mresearch.influencingFactor')}}</span>
                                 <span class="data" @click="Structured(item)"> <i><img :src="sdataimg" alt=""></i>  {{$t('mresearch.structuredData')}}</span> |
                                 <span class="data" @click="comment(item)"><i><img :src="commentimg" alt=""></i> <el-badge :value="item.commentCount" class="item">{{$t('mresearch.discuss')}}</el-badge></span>
                                </p>
                                <p><span class="publish-time">标注时间:</span> {{item.createdAt | formatDateHH}}</p>
                            </div>
                        </div>
                    </div>        
                </div>  
            </draggable>
            <div v-else>
             <div class="table-content" v-for="(item,index) in tagText" :key="index">
                    <div class="top-text">
                        <div class="front">
                        <div class="header-img">{{item.userName | DealUserName }}</div>
                        <div  v-if ="isEditid==item.id" class="title" >
                            <el-input v-model="editTitle[item.id]" placeholder="请输入内容" class="edit-title"></el-input>
                            <el-button class="cancel"  @click="isEditid = ''">{{$t('message.cancel')}}</el-button>
                            <el-button type="primary" @click="saveEdit('title',item)">{{$t('message.confirm')}}</el-button>
                        </div>
                        <div  v-else  class="title" >{{item.title}}</div>
                         <!-- <span class="addlabel" v-if="textLabel[item.id]">
                          <span  class="circle" :style="{backgroundColor:conBgColor[item.id]}"> </span> {{textLabel[item.id]}}
                         </span>
                          <span class="addlabel">
                          <el-dropdown @command="addlabel(item,$event)" >
                                <span class="el-dropdown-link">
                                  <i><img :src="labelimg" alt=""></i>  标签 <i class="el-icon-arrow-down el-icon--right"></i>
                                </span>
                                <el-dropdown-menu slot="dropdown">
                                    <el-dropdown-item v-for="(item,index) in textTagFlagTypes" :key="index" :command="item.id+'-'+item.name+'-'+item.color">
                                        <span><span  class="circle"> </span> {{item.name}}</span> 
                                    </el-dropdown-item>
                                </el-dropdown-menu>
                            </el-dropdown>
                        </span> -->
                         <el-select class="addlabel" v-model="summArr[item.id]" @change="addlabel(item)" placeholder="请选择">
                            <el-option  :key="0"  label="  "  value="  "> </el-option>
                            <el-option v-for="itemS in titleArr" :key="itemS.id"  :label="itemS.title"  :value="itemS.id"> </el-option>
                        </el-select>
                        </div>
                        <div>
                        <span class="big-small" @click="bigSmall(item)">
                            <i v-if="!isMove[item.id]" class="el-icon-arrow-down"></i> 
                            <i v-else class="el-icon-arrow-up"></i>
                        </span>
                        <span class="editdata" @click="editData(item)"><i class="el-icon-edit-outline"></i></span>
                        <span class="deletedata" @click="deleteData(item)">
                            <i v-if="!item.childFold || item.childFold.length == 0" class="el-icon-delete"></i>
                            <i v-if="item.childFold && item.childFold.length > 0" class="el-icon-circle-close-outline"></i>
                        </span>
                        <el-button type="primary" @click="joinReportSection(item)" v-if="$route.name== 'myReportDetail'">{{$t('mresearch.join')}}</el-button>
                        <el-checkbox @change="joinIntegrateList(item)" v-model="item.join" v-if="integrateByTime"></el-checkbox>
                        </div>
                    </div>
                    <div class="move" v-if ="isMove[item.id] && (!item.childFold || item.childFold.length == 0)">
                        <div class="text" >
                            <div  class="text-1 img" v-if="item.type=='table' || item.type=='pic'" v-html="item.sourceStr"></div>
                            <div  v-else-if="isEditid==item.id" class="text-1" >
                                <el-input type="textarea" :row=3 v-model="editSourcestr[item.id]" class="edit-title"></el-input>
                            </div>
                            <div  class="text-1" v-else>
                                <span>{{item.sourceStr}}</span> 
                            </div>
                             <div class="conclusion">
                                <span v-if="item.msg" class="con-clu"><i><img :src="finishimg" alt=""></i>结论:</span>
                                {{item.msg}}
                                <p>
                                <span v-if="item.msg" @click="updateConclusion(item)"><i><img :src="editcimg" alt=""></i> 【 {{$t('mresearch.editorialConclusion')}} 】</span> 
                                <span class="add-c" v-else @click="addConclusion(item)"><i><img :src="addcimg" alt=""></i> {{$t('mresearch.addConclusion')}}</span>
                                </p>
                            </div>
                        </div>
                        <div class="desc">
                            <div >
                                <p class="source-from" @click="selectEdit(item)"> <i><img :src="linkimg" alt=""></i> {{$t('task.source')}}:{{item.docTitle}}</p>
                                <p> <span class="publish-time">{{$t('industryModel.publishTime')}}:</span> {{item.publishTime | formatDate}}</p>
                            </div>
                            <div  class="operate">
                                <p>
                                 <span v-if="item.type=='table'" class="factor" @click="downExcel(item)">{{$t('analyst.download')}}</span>
                                 <span v-else class="factor" @click="factor(item)"> <i><img :src="factorimg" alt=""></i>  {{$t('mresearch.influencingFactor')}}</span>
                                 <span class="data" @click="Structured(item)"> <i><img :src="sdataimg" alt=""></i>  {{$t('mresearch.structuredData')}}</span> |
                                 <span class="data" @click="comment(item)"><i><img :src="commentimg" alt=""></i>  <el-badge :value="item.commentCount" class="item">{{$t('mresearch.discuss')}}</el-badge></span>
                                </p>
                                <p><span class="publish-time">标注时间:</span> {{item.createdAt | formatDateHH}}</p>
                            </div>
                        </div>
                    </div>       

                    <div class="move" v-if ="isMove[item.id] && (item.childFold && item.childFold.length > 0)">
                        <div v-for="child in item.childFold" :key="child.id" class="child-content">
                            <div class="child-left">{{ child.publishTime | formatDateY }}</div>
                            <div class="child-right">
                                <div  class="text-1 img" v-if="child.type=='table' || child.type=='pic'" v-html="child.sourceStr"></div>
                                <div  v-else-if="isEditid==item.id" class="text-1" >
                                    <el-input type="textarea" :row=3 v-model="editSourcestr[child.id]" class="edit-title"></el-input>
                                </div>
                                <div  class="text-1" v-else>
                                    <span>{{child.sourceStr}}</span> 
                                </div>
                                <div class="conclusion">
                                    <span v-if="child.msg" class="con-clu"><i><img :src="finishimg" alt=""></i>结论:</span>
                                    {{child.msg}}
                                    <p>
                                        <span v-if="child.msg" @click="updateConclusion(child)"><i><img :src="editcimg" alt=""></i> 【 {{$t('mresearch.editorialConclusion')}} 】</span> 
                                        <span class="add-c" v-else @click="addConclusion(child)"><i><img :src="addcimg" alt=""></i> {{$t('mresearch.addConclusion')}}</span>
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div class="conclusion">
                            <span v-if="item.msg" class="con-clu"><i><img :src="finishimg" alt=""></i>结论:</span>
                            {{item.msg}}
                            <p>
                                <span v-if="item.msg" @click="updateConclusion(item)"><i><img :src="editcimg" alt=""></i> 【 {{$t('mresearch.editorialConclusion')}} 】</span> 
                                <span class="add-c" v-else @click="addConclusion(item)"><i><img :src="addcimg" alt=""></i> {{$t('mresearch.addConclusion')}}</span>
                            </p>
                        </div>
                        <div class="desc">
                            <div>
                                <p v-for="child in item.childFold" :key="child.id" style="padding-top:5px">
                                    <span class="source-from" @click="selectEdit(child)">{{$t('task.source')}}:{{child.docTitle || $t('message.noData')}}</span>
                                    <span class="margin-left: 10px;">
                                        <span class="publish-time">{{$t('industryModel.publishTime')}}:</span> {{child.publishTime | formatDate}}
                                    </span>
                                </p>
                            </div>
                            <div class="operate">
                                <p>
                                  <span v-if="item.type=='table'" class="factor" @click="downExcel(item)">{{$t('analyst.download')}}</span>
                                  <span v-else class="factor" @click="factor(item)"> <i><img :src="factorimg" alt=""></i>  {{$t('mresearch.influencingFactor')}}</span>
                                  <span class="data" @click="Structured(item)"> <i><img :src="sdataimg" alt=""></i>  {{$t('mresearch.structuredData')}}</span> |
                                  <span class="data" @click="comment(item)"><i><img :src="commentimg" alt=""></i>  <el-badge :value="item.commentCount" class="item">{{$t('mresearch.discuss')}}</el-badge></span>
                                </p>
                                <p><span class="publish-time">标注时间:</span> {{item.createdAt | formatDateHH}}</p>
                            </div>
                        </div>
                    </div>    
                </div>  
            </div>
        </div>
        <div class="table-content" v-show="!loading && total==0">
            <div  class="nothing-data">
                <img :src="nothingimg" alt="">
                 <p>{{$t('message.noData')}}</p>
            </div>
        </div>
         <!-- 结构化数据 -->
        <el-dialog :title="$t('mresearch.structuredData')"  class="Structured" :visible.sync="StructuredVisible">
            <div class="content">
                <div class="message" v-if="textType=='table' || textType=='pic'">
                    <div v-html="text"> </div>
                </div>
                <div  class="message"  v-else>{{text}}</div>
                <el-table :data="StructuredItems" border    style="width: 100%">
                 <el-table-column label="name">
                 <template slot-scope="scope" >
                    <span v-if="!scope.row.editeFlag">{{ scope.row.name }}</span>
                    <span v-if="scope.row.editeFlag" class="cell-edit-input">
                       <el-input  v-model="scope.row.name"></el-input>
                    </span>
                 </template>
                </el-table-column>
                 <el-table-column label="value">
                 <template slot-scope="scope" >
                    <span v-if="!scope.row.editeFlag">{{ scope.row.value }}</span>
                    <span v-if="scope.row.editeFlag" class="cell-edit-input">
                        <el-input  v-model="scope.row.value"></el-input>
                    </span>
                 </template>
                </el-table-column>
                <el-table-column :label="$t('dataTable.operating')"  width="140">
                  <template slot-scope="scope">
                    <el-button @click="deletInfo(scope.$index,scope.row,'Structured')" type="text" size="small">{{$t('dataTable.delete')}}</el-button>
                     <span v-if="!scope.row.editeFlag" style="margin-left:10px;"  @click="affectedEdit(scope.$index,scope.row,'Structured')">  <i class="el-icon-edit"></i> </span>
                    <el-button v-if="scope.row.editeFlag"  style="margin-left:10px;"  @click="affectedSave(scope.$index,scope.row,'Structured')">  <i class="el-icon-document"></i> {{$t('dataTable.save')}}</el-button>
                   </template>
                </el-table-column>
               </el-table>
               <div class="addnum" @click="addnum('Structured')"><i class="el-icon-circle-plus-outline"></i>{{$t('mresearch.newEntry')}}</div>
            </div>
            <div slot="footer" class="dialog-footer">
                <el-button @click="StructuredVisible = false">{{$t('message.cancel')}}</el-button>
                <el-button type="primary" @click="StructuredInfo()">{{$t('message.confirm')}}</el-button>
            </div>
        </el-dialog>
        <!-- 影响因子 -->
        <el-dialog :title="$t('mresearch.influencingFactor')"  class="factor" :visible.sync="factorVisible">
            <div class="content">
                <div class="message" v-if="textType=='table' || textType=='pic'">
                    <div v-html="text"> </div>
                </div>
                <div  class="message"  v-else>{{text}}</div>
                <el-table :data="inferenceItems" border    style="width: 100%">
                 <el-table-column :label="$t('mresearch.influenceFactor')">
                 <template slot-scope="scope" >
                    <span v-if="!scope.row.editeFlag">{{ scope.row.influenceFactor }}</span>
                    <span v-if="scope.row.editeFlag" class="cell-edit-input">
                       <el-input    v-model="scope.row.influenceFactor"></el-input>
                    </span>
                 </template>
                </el-table-column>
                 <el-table-column :label="$t('mresearch.affectTime')" width="180px">
                 <template slot-scope="scope" >
                    <span v-if="!scope.row.editeFlag">{{ scope.row.affectTime | formatDateY}}</span>
                    <span v-if="scope.row.editeFlag" class="cell-edit-input">
                          <el-date-picker v-model="scope.row.affectTime"
                            type="year" value-format="yyyy">
                           </el-date-picker>
                    </span>
                 </template>
                </el-table-column>
                <el-table-column :label="$t('mresearch.influenceOutcome')">
                 <template slot-scope="scope" >
                    <span v-if="!scope.row.editeFlag">{{ scope.row.influenceOutcome }}</span>
                    <span v-if="scope.row.editeFlag" class="cell-edit-input">
                        <el-autocomplete popper-class="my-autocomplete affected-num"  v-model="scope.row.influenceOutcome" :fetch-suggestions="querySearchaffected" @select="handleSelect"></el-autocomplete>
                    </span>
                 </template>
                </el-table-column>
                <el-table-column :label="$t('mresearch.value')">
                 <template slot-scope="scope" >
                    <span v-if="!scope.row.editeFlag">{{ scope.row.value }}</span>
                    <span v-if="scope.row.editeFlag" class="cell-edit-input">
                      <el-input   v-model="scope.row.value" ></el-input>
                    </span>
                 </template>
                </el-table-column>
                <el-table-column :label="$t('mresearch.annotate')">
                 <template slot-scope="scope" >
                    <span v-if="!scope.row.editeFlag">{{ scope.row.annotate }}</span>
                    <span v-if="scope.row.editeFlag" class="cell-edit-input">
                      <el-input    v-model="scope.row.annotate" ></el-input>
                    </span>
                 </template>
                </el-table-column>
                <el-table-column :label="$t('mresearch.operate')"  width="140">
                  <template slot-scope="scope">
                    <el-button @click="deletInfo(scope.$index,scope.row,'factor')" type="text" size="small">{{$t('dataTable.delete')}}</el-button>
                     <span v-if="!scope.row.editeFlag" style="margin-left:10px;"  @click="affectedEdit(scope.$index,scope.row,'factor')">  <i class="el-icon-edit"></i> </span>
                    <el-button v-if="scope.row.editeFlag"  style="margin-left:10px;"  @click="affectedSave(scope.$index,scope.row,'factor')">  <i class="el-icon-document"></i>{{$t('dataTable.save')}}</el-button>
                   </template>
                </el-table-column>
               </el-table>
               <div class="addnum" @click="addnum('factor')"><i class="el-icon-circle-plus-outline"></i>{{$t('mresearch.newEntry')}}</div>
            </div>
            <div slot="footer" class="dialog-footer">
                <el-button @click="factorVisible = false">{{$t('message.cancel')}}</el-button>
                <el-button type="primary" @click="addConclusionInfo()">{{$t('message.confirm')}}</el-button>
            </div>
        </el-dialog>
      
       <!-- /*添加评论信息*/ -->
        <el-dialog :title="$t('mresearch.discuss')" :visible.sync="CommentVisible">
            <el-form :model="Commentform" >
                <el-form-item >
                  <el-input type="textarea"  :placeholder="$t('mresearch.discussA')" :rows="2" v-model="Commentform.comment"></el-input>
                </el-form-item>
                <el-checkbox v-model="checkedEmail">邮件通知</el-checkbox>
                 <span class="reply">
                        <el-dropdown>
                            <el-button type="text">
                                @提醒谁看<i class="el-icon-arrow-down el-icon--right"></i>
                            </el-button>
                            <el-dropdown-menu slot="dropdown">
                                <el-dropdown-item v-for="(item,index) in userArr" :key="index" @click.native="Remeber(item,'1')">{{item.name}}</el-dropdown-item>
                            </el-dropdown-menu>
                        </el-dropdown>
                </span>
            </el-form>
            <div  class="addcomment">
                <el-button @click="CommentVisible = false">{{$t('message.cancel')}}</el-button>
                <el-button  :disabled="isDisabled" type="primary" @click="addCommentText(this)">{{$t('message.confirm')}}</el-button>
            </div>
            <ul  class="reply-cc" v-for="(item,index) in commentArr" :key="index">
              <li class="userinfo" @mouseenter="Enter(item)">
                  <p class="usertime"><span class="header-img">{{item.userName | DealUserName  }}</span><span class="username">{{item.userName}}</span><span class="user-time">{{item.createdAt | formatDateHH}}</span></p>
                  <div class="usercomment">{{item.content}} <span v-show="item.id==showId" class="reply"  @click="Reply(item)">回复</span> 
                    <span  v-show="item.id==showId" class="reply">
                        <el-dropdown>
                            <el-button class="remind" type="text">
                                @提醒谁看<i class="el-icon-arrow-down el-icon--right"></i>
                            </el-button>
                            <el-dropdown-menu slot="dropdown">
                                <el-dropdown-item v-for="(item,index) in userArr" :key="index" @click.native="Remeber(item,'2')">{{item.name}}</el-dropdown-item>
                            </el-dropdown-menu>
                        </el-dropdown>
                    </span>
                    <div v-show="item.id==currentreplyid" >
                        <el-input type="textarea"  placeholder="回复内容" :rows="2" v-model="Commentform.replyComment"></el-input>
                        <div  class="addreplycomment">
                            <el-button @click="currentreplyid = ''">{{$t('message.cancel')}}</el-button>
                            <el-button  :disabled="isDisabled" type="primary" @click="addRelpyCommentText()">{{$t('message.confirm')}}</el-button>
                        </div>
                    </div>
                  </div>
                 </li>
                  <li class="userinfo">
                  <div class="reply-content" v-show="item.children" v-for="child in item.children" :key="child.id"  @mouseenter.stop="Enter(child)">
                      <p><span>{{child.content1}}</span><span class="V2-reply">{{child.content2}}</span><span>{{child.content3}}</span><span class="user-time">{{child.createdAt | formatDateHH}}</span></p>
                      <div class="answer"><span>{{child.answer}}</span>
                        <span class="reply"  v-show="child.id==showId" @click="childReply(child)">回复</span> 
                        <span class="reply"  v-show="child.id==showId">
                            <el-dropdown>
                                <el-button class="remind" type="text">
                                    @提醒谁看<i class="el-icon-arrow-down el-icon--right"></i>
                                </el-button>
                                <el-dropdown-menu slot="dropdown">
                                    <el-dropdown-item v-for="(item,index) in userArr" :key="index" @click.native="Remeber(item,'2')">{{item.name}}</el-dropdown-item>
                                </el-dropdown-menu>
                            </el-dropdown>
                        </span>
                        <div v-show="child.id==currentreplyid" >
                            <el-input type="textarea"  placeholder="回复内容" :rows="2" v-model="Commentform.replyComment"></el-input>
                            <div  class="addreplycomment">
                                <el-button @click="currentreplyid = ''">{{$t('message.cancel')}}</el-button>
                                <el-button  :disabled="isDisabled" type="primary" @click="addRelpyCommentText()">{{$t('message.confirm')}}</el-button>
                            </div>
                        </div>
                      </div>
                  </div>
              </li>
            </ul>
        </el-dialog>
       <!-- /*添加更新结论信息*/ -->
        <el-dialog :title="$t('mresearch.conclusionInformation')" :visible.sync="FormVisible">
            <el-form :model="form" label-width="100px">
                <el-form-item :label="$t('mresearch.conclusionInformation')" >
                  <el-input type="textarea" :rows="5" v-model="form.conclusion"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="FormVisible = false">{{$t('message.cancel')}}</el-button>
                <el-button v-if="currentTag=='add'" type="primary" @click="addConclusionText()">{{$t('message.confirm')}}</el-button>
                <el-button v-if="currentTag=='update'" type="primary" @click="updateConclusionText()">{{$t('dataTable.save')}}</el-button>
            </div>
        </el-dialog>
        <div class="pagination"  v-if="total>0">
            <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="currentPage"
                :page-sizes="[10, 20, 50, 100]"
                :page-size="pageSize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="total">
            </el-pagination>
            <div style="padding-top: 20px;">
                <el-button v-if="integrateByTime" type="primary" @click="addFoIds">{{$t('mresearch.merge')}}</el-button>
            </div>
        </div>  
    </div>
</template>

<script>
    import draggable from 'vuedraggable';
    import { formatDate } from "../../utils/date";
    import nothingimg from "./../../../../static/img/tags/nothingdata.png";
    import commentimg from "./../../../../static/img/svg/comment.svg";
    import linkimg from "./../../../../static/img/svg/link.svg";
    import sdataimg from "./../../../../static/img/svg/sdata.svg";
    import factorimg from "./../../../../static/img/svg/factor.svg";
    import labelimg from "./../../../../static/img/svg/label.svg";
    import addcimg from "./../../../../static/img/svg/add-c.svg";
    import editcimg from "./../../../../static/img/svg/edit-c.svg";
    import finishimg from "./../../../../static/img/svg/finish.svg";
    import conclusionImg from "./../../../../static/img/svg/conclusion.svg";
    import summaryId from "../components/summary"
    export default {
        name:"researchModelList",
        components:{
            draggable,
            summaryId
        },
        props: {
            analyzeParms:Object,
            routeParams: Object
        },
        data() {
            return {
                url:'/bayesiangues/textExtract/getInference',
                url2:"/editorback/ueditor/downloadExcel",
                tagText:[],
                currentPage:1,
                pageSize:10,
                total:0,
                searchListShow: false,
                dateFrom:null,
                dateTo:null,
                stockCode:'',
                timeColumn:null,
                showAll:false,
                title:'',
                FormVisible:false,
                form:{
                    conclusion:'',
                    id:''
                },
                Commentform:{
                    comment:'',
                    replyComment:''
                },
                CommentVisible:false,
                currentTag:'',
                factorVisible:false,
                inferenceItems:[],
                affectedArr:[],
                affectWayArr:[],
                textTagId:'',
                text:'',
                textType:'',
                restaurants:[],
                nothingimg:nothingimg,
                commentimg:commentimg,
                conclusionImg: conclusionImg,
                linkimg:linkimg,
                sdataimg:sdataimg,
                factorimg:factorimg,
                labelimg:labelimg,
                addcimg:addcimg,
                editcimg:editcimg,
                finishimg:finishimg,
                StructuredVisible:false,
                StructuredItems:[],
                isDraggable:false,
                commentObj:Object,
                commentArr:[],
                isDisabled:false,
                isEditid:'',
                editTitle:[],
                editSourcestr:[],
                influenceOutcome:[],
                isMove:[],
                integrateByTime: false,
                textLabel:[],
                conBgColor:[],
                textLabelname:[],
                conBgColorid:[],
                currentreplyid:null,
                showId:null,
                userArr:[],
                checkedEmail:false,
                remeberUser:[],
                integrates: [],
                integrateIds: [],
                loading:true,
                titleArr:[],
                summArr:[]
              
            }
        },
        created(){
            this.analyzeAspectId = this.analyzeParms.analyzeAspectId
            this.queryDataList()
            this.remindWho();
            this.queryCorpEvaDimention();
            if(this.$route.query.textTaggingId){
                this.showComment(this.$route.query.textTaggingId);
            }
        },
        watch: {
            analyzeParms:{
                handler(newValue,oldValue){
                    this.analyzeAspectId = newValue.analyzeAspectId;
                    if(newValue.time !=null){
                    this.dateFrom=newValue.time+'-01-01 00:00:00';
                    this.dateTo=newValue.time+'-12-31 00:00:00';
                        this.timeColumn="publish_time";
                    }else{
                    this.dateFrom=null;
                    this.dateTo=null;
                        this.timeColumn=null;
                    }
                    this.queryDataList();
                },
                deep:true
            },
        },
        filters: {
            formatDate(time) {
            var date = new Date(time);
            return formatDate(date, "yyyy-MM-dd");
            },
            formatDateY(time) {
            var date = new Date(time);
            return formatDate(date, "yyyy");
            },
            formatDateHH(time) {
            var date = new Date(time);
            return formatDate(date, "yyyy-MM-dd hh:mm:ss");
            },
            DealUserName(name){
                if(name==null) return false;
            if(name.match(/[^\u4e00-\u9fa5]/g)==null){
                return name.substring(0,1);
            }else if( name.match(/[^\u4e00-\u9fa5]/g).length &&  name.match(/[^\u4e00-\u9fa5]/g).length>0){
                return name.substring(0,2);
            }
           }
        },
        methods: {
            changeDar(val){
                this.isDraggable=val;
            },
            changeIntegrateByTime(data) {
                if(!data) {
                    this.integrateIds = []
                    this.integrates = []
                }

                this.integrateByTime = data
                this.queryDataList()
            },
            async queryCorpEvaDimention(){
                let para={
                "tagClassId": this.analyzeAspectId
                }
                this.titleArr=[];
                const res = await this.$store.dispatch('AC_CorpEvaDimentionServiceQueryCorpEvaDimention', para);
                if(res.code==200){
                    this.titleArr = res.data.corpEvaDimentions;
                } 
           },
            async  querySearchaffected(str, cb) {
                let para={
                  "pageNum":1,
                  "pageSize":1000,
                }
                this.affectedArr=[];this.affectWayArr=[];
                const res =await this.$store.dispatch('AC_InfluenceOutcomeServiceQueryInfluenceOutcome', para);
                this.influenceOutcome=[];
                if(res.code==200) {
                    for(let i=0;i<res.data.influenceOutcomes.length;i++){
                        var obj = {}
                        obj.value = res.data.influenceOutcomes[i].influenceOutcome;
                        if(res.data.influenceOutcomes[i].id !=undefined && res.data.influenceOutcomes[i].influenceOutcome !=undefined){
                        this.influenceOutcome[res.data.influenceOutcomes[i].influenceOutcome]=res.data.influenceOutcomes[i].id;
                        }
                            this.affectedArr.push(obj);
                    }
                    cb(this.affectedArr);
                }
            },

            // async queryTextTagFlag(){
            //     this.textLabel=[];
            //     const res = await this.$store.dispatch('AC_TextTagFlagServiceQueryTextTagFlag', {});
            //     if(res.data.textTagFlags.length && res.data.textTagFlags.length>0){
            //         for(let i=0;i<res.data.textTagFlags.length;i++){
            //            this.textLabel[res.data.textTagFlags[i].textTaggingId]=this.textLabelname[res.data.textTagFlags[i].flagTypeId];
            //             this.$set(this.conBgColor,res.data.textTagFlags[i].textTaggingId,this.conBgColorid[res.data.textTagFlags[i].flagTypeId]);
            //         }
            //     }
            // },

            handleSelect(item) {
                console.log(item);
            },

            async Draf(item){
                let drafnode=JSON.parse(localStorage.getItem("drafnodeClick"));
                if(drafnode==undefined || drafnode==null){
                    this.$message.error(this.$t('message.noData'));
                    return false;
                }
                let params = {
                    "id": drafnode.id,
                    "textTagId": item.id,
                    "type": drafnode.type
                }
                let result = await this.$store.dispatch('AC_ReportManageServiceDraftUpdateSection',params)
                if(result.code == 200 ){
                this.$message.success(this.$t('message.chosen') + ' ' + drafnode.title) 
                }
            },
            // 获取数据列表
            async queryDataList(id) {
                if(!this.analyzeAspectId) {
                    return
                }
                // this.$store.commit('loadingChange',{text: this.$t('message.inRequest'),show: true})
                let params={
                    analyzeAspectId : this.analyzeAspectId,
                    corpAnalyzeId:this.$route.query.corpId,
                    stockCode : this.routeParams.corpCode,
                    pageNum:this.currentPage,
                    pageSize:this.pageSize,
                    dateFrom:this.dateFrom,
                    dateTo:this.dateTo,
                    timeColumn:this.timeColumn,
                    orderBy: "sort asc",
                    model: 1,
                    corpEvaDimentionId:id
                };
                const result = await this.$store.dispatch('AC_CorpAnalyzManageQueryModelById', params);
                // this.$store.commit('loadingChange',{show: false})
                if(result.code==200){
                    this.loading=false;
                    this.tagText=result.data.list; 
                    if(result.data.list && result.data.list.length>0){
                        for(let i=0;i<result.data.list.length;i++){
                            this.isMove[result.data.list[i].id]=true;
                           // this.summArr[result.data.list[i].id]=result.data.list[i].corpEvaDimentionId;
                            this.$set(this.summArr,result.data.list[i].id,result.data.list[i].corpEvaDimentionId)
                        }
                    }  
                    this.total=result.data.total;
                    if(result.data.list){
                        this.stockCode=result.data.list[0].stockCode;
                    }  
                }
                
            },
            // 查看事件
            selectEdit(row) {
                let params={
                    docId: row.docId,
                    pageInd: row.pageInd,
                    bmId: this.routeParams.bmId,
                    corpId: this.routeParams.corpId,
                    name: this.routeParams.name,
                    TagId: row.id
                }
                this.$router.push({path: '/mresearch/retrievalcontent',query: params})
            },

            selectRow(row) {
                this.$emit('selectRow', row)
            },
            // async queryLabelClick(){
            //     this.textTagFlagTypes=[];
            //     const res = await this.$store.dispatch('AC_TextTagFlagTypeServiceQueryTextTagFlagType', {});
            //     this.textTagFlagTypes=res.data.textTagFlagTypes;
            //      if(res.data.textTagFlagTypes.length && res.data.textTagFlagTypes.length>0){
            //         for(let i=0;i<res.data.textTagFlagTypes.length;i++){
            //            this.textLabelname[res.data.textTagFlagTypes[i].id]=res.data.textTagFlagTypes[i].name;
            //            this.conBgColorid[res.data.textTagFlagTypes[i].id]=res.data.textTagFlagTypes[i].color;
            //         }
            //     }
            //     setTimeout(() => {
            //        this.queryTextTagFlag();
            //     }, 301);
            // },
            async addlabel(item){
                // console.log(item,labelidname);
                // return false;
                // let labelid=labelidname.split('-')[0];
                // let labelname=labelidname.split('-')[1];
                // let color=labelidname.split('-')[2];
                // this.$set(this.textLabel,item.id,labelname);
                // this.$set(this.conBgColor,item.id,color);
                //this.conBgColor=color;
                let para={  
                  "analyzeAspectId": this.analyzeAspectId,
                  "id": item.id,
                  "stockCode": this.$route.query.corpCode,
                  "corpEvaDimentionId": this.summArr[item.id]
                }
               const res = await this.$store.dispatch('AC_TextTaggingServiceUpdateTextTagging', para);
            },
            bigSmall(item){
              this.isMove[item.id]=  !this.isMove[item.id];
              this.$set(this.isMove,item.id,this.isMove[item.id]);
            },
            editData(item){
                this.isEditid=item.id;
                this.editTitle[item.id]=item.title;
                this.editSourcestr[item.id]=item.sourceStr;
                if(item.childFold && item.childFold.length > 0) {
                    item.childFold.forEach(child => {
                        this.editSourcestr[child.id]= child.sourceStr;
                    })
                }
            },
            async saveEdit(type,item){
                let arr = []
                let params = {
                    id: item.id,
                    title: this.editTitle[item.id],
                    sourceStr: this.editSourcestr[item.id]
                };  
                arr.push(params)
                if(item.childFold && item.childFold.length > 0) {
                    item.childFold.forEach(child => {
                        let params = {
                            id: child.id,
                            sourceStr: this.editSourcestr[child.id]
                        }
                        arr.push(params)
                    })
                }

                for(let i = 0;i < arr.length;i++) {
                    let result = await this.$store.dispatch('AC_TextTaggingServiceUpdateTextTagging', arr[i]);
                    result.code == 200 ? this.$message.success(this.$t('message.success')) : this.$message.error(this.$t('message.fail'))
                }

                this.isEditid='';
                this.queryDataList()
            },
            deleteData(item){
                 this.$confirm(this.$t('message.deleteSure'), {
                    confirmButtonText: this.$t('message.confirm'),
                    cancelButtonText: this.$t('message.cancel'),
                    type: 'warning'
                    }).then(() => {
                        if(item.childFold && item.childFold.length > 0) {
                            this.deleteFolds(item)
                        }else {
                            this.deleteDataTip(item);
                        }
                    })
            },

            async deleteFolds(data){
                let params={ newTextTaggingId: data.id }
                this.$store.commit('loadingChange',{show: true,text: this.$t('message.inRequest')})  
                const result = await this.$store.dispatch('AC_FoldManageDeleteFolds', params);
                result.code == 200 ? this.$message.success(this.$t('message.success')) : this.$message.error(this.$t('message.fail'))
                this.$store.commit('loadingChange',{show: false})  
                this.queryDataList();
            },

            async deleteDataTip(item){
                 let para = {
                    "id": item.id,
                    "analyzeAspectId": this.analyzeAspectId,
                    "corpAnalyzeId":item.corpAnalyzeId
                };
                this.$store.commit('loadingChange',{show: true,text: this.$t('message.inRequest')})  
                const result = await this.$store.dispatch('AC_TextTaggingManageDeleteTextTag', para);
                result.code == 200 ? this.$message.success(this.$t('message.success')) : this.$message.error(this.$t('message.fail'))
                this.$store.commit('loadingChange',{show: false})  
                this.queryDataList();
            },

            getdata (evt) {},
            datadragEnd (evt) {
                var itemslength=this.tagText.length;
                this.dragarr=[];

                for( let i=0;i<itemslength;i++){
                    var obj={
                        "id":this.tagText[i].id,
                        "sort": i+(this.currentPage-1)*this.pageSize
                    }
                    this.dragarr.push(obj);
                }
                this.updatePosOrder(this.dragarr);
            },
            async updatePosOrder(dragarr){
                let para = {
                    "textTaggings": dragarr  
                 }
                const res = await this.$store.dispatch('AC_TextTaggingServiceUpdateManyTextTagging', para);
            },
            addnum(type){   
                if(type=='factor'){
                    let obj={
                    "influenceFactor":"",
                    "affectTime":"",
                    "influenceOutcome":"",
                    "value":"",
                    "annotate":"",
                    "editeFlag":true
                    }
                    this.inferenceItems.push(obj);
                }else if(type=='Structured'){
                    let obj={
                    "name":"",
                    "value":"",
                    "editeFlag":true
                    }
                    this.StructuredItems.push(obj);
                }          
            },
            // addConclusionInfo(){
            //    for(let i=0;i<this.inferenceItems.length;i++){
            //          if(this.inferenceItems[i].influenceFactor !=undefined && this.inferenceItems[i].influenceFactor !="" && this.inferenceItems[i].influenceFactor !='' && this.inferenceItems[i].influenceFactor !=null){
            //           this.AddTagInference(this.inferenceItems[i].influenceFactor,this.inferenceItems[i].affectTime,this.inferenceItems[i].influenceOutcome,this.inferenceItems[i].value);
            //          }
            //    }  
            // },
            async addConclusionInfo(){
                let newArr = this.inferenceItems.map(val => {
                let json = {};
                    json.id=val.id;
                    json.influenceFactor=val.influenceFactor;
                    if(val.affectTime.toString().indexOf("0000")!=-1){
                       json.affectTime=val.affectTime;
                    }else{
                      json.affectTime=val.affectTime+'-01-01';
                    }
                    json.influenceOutcome=val.influenceOutcome;
                    json.influenceOutcomeId=this.influenceOutcome[val.influenceOutcome];
                    json.influenceFactor=val.influenceFactor;
                    json.value=val.value;
                    json.annotate=val.annotate;
                    json.editeFlag=val.editeFlag;
                    json.corpAnalyzeId=this.routeParams.corpId;
                    json.textTaggingId=this.textTagId;
                    return json;
                });
                let para={
                    "tagInferenceList":newArr,
                    "textTaggingId":this.textTagId
                }
               const res = await this.$store.dispatch('AC_TagInferenceManageUpdateBatchTagInference', para);
               if(res.code==200){          
                  this.factorVisible=false;
               }
            },
            deletInfo(index,row,type){
                if(type=="Structured"){
                 this.StructuredItems.splice(index,1);
                }else{
                 this.inferenceItems.splice(index,1);
                }
            },
            async StructuredInfo(){ 
                let properties = {};
                if (this.StructuredItems && this.StructuredItems.length > 0) {
                    for (let i = 0; i < this.StructuredItems.length; i++) {
                      properties[this.StructuredItems[i].name] = this.StructuredItems[i].value;
                    }
                }
              let para={
                    "properties":properties,
                    "tagClass": this.StructuredItems[0].sourceClass,
                    "textTaggingId": this.StructuredItems[0].id
              }
               const res = await this.$store.dispatch('AC_TagPropertyManageUpdateTagPropertyValue', para);
               if(res.code==200){          
                   this.$message.success(this.$t('message.success'));
                   this.StructuredVisible=false;
                }   
            },
            Structured(item){
               this.StructuredVisible=true;
               if(item.tagPropertyValues !=null){
                 this.StructuredItems=item.tagPropertyValues;
                 for(let i=0;i<item.tagPropertyValues.length;i++){
                        this.$set(this.StructuredItems[i],"editeFlag",false)
                 }
               }   
            },
            comment(item){
                this.CommentVisible=true;
                this.commentObj=item;
                this.queryCommentText(item.id);
            },
            showComment(id){
                this.CommentVisible=true;
                this.queryCommentText(id);
            },
            arrNumber(arr){  
                var arr_number = {};  
                for(var i = 0 ; i < arr.length ; i++){  
                    if(arr_number[arr[i]]){  
                        arr_number[arr[i]]++  
                    }  
                    else{  
                        arr_number[arr[i]] = 1 ;  
                    }  
                }  
                return arr_number ;  
            },
            async queryCommentText(id){
                let para={
                "bizModelId": this.routeParams.bmId,
                "corpAnalyzeId": this.routeParams.corpId,
                "pageNum": 1,
                "pageSize": 100000,
                "textTaggingId": id
                }  
                 this.commentArr=[];  
                const res = await this.$store.dispatch('AC_CommentManageQueryCommentTree', para);
                 if(res.code==200 && res.data.list && res.data.list.length){          
                  this.commentArr=res.data.list;
                  for(let i=0;i<res.data.list.length;i++){
                       if(res.data.list[i].children){
                          var child=this.loopchild(res.data.list[i].children,res.data.list[i].userName)
                       }
                  }
                  this.commentArr = this.commentArr.map(item => {
                       if(item.children && item.children.length>0){
                          var child=this.loopchild(item.children,item.userName)
                       }
                        return {
                            userName: item.userName,
                            children:child,
                            id: item.id,
                            content:item.content,
                            createdAt: item.createdAt
                        }
                    })
                } 
            },
            loopchild(data,userName){
                let childobj=[]; 
                for(let k=0;k<data.length;k++){
                    let obj={}; 
                    obj.id=data[k].id;
                    obj.createdAt=data[k].createdAt;
                    obj.content1=data[k].userName;
                    obj.content2='回复';
                    obj.content3=userName;
                    obj.answer=data[k].answer;
                    childobj.push(obj);
                   if(data[k].children){
                    var child= this.loopchild(data[k].children,data[k].userName);
                    for(let j=0;j<child.length;j++){
                          let obj1={}; 
                        obj1.id=child[j].id;
                        obj1.createdAt=child[j].createdAt;
                        obj1.content1=child[j].content1;
                        obj1.content2=child[j].content2;
                        obj1.content3=child[j].content3;
                        obj1.answer=child[j].answer;
                        childobj.push(obj1);
                    }
                    }
                }
                return childobj;
            },
            async remindWho(){
                this.userArr=[];
                const res = await this.$store.dispatch('AC_UserServiceQueryUser', {});
                 if(res.code==200){          
                  this.userArr=res.data.users;
                } 

            },
            Reply(item){
                this.currentreplyid=item.id;
                this.remeberUser=[];
            },
            childReply(item){
                this.currentreplyid=item.id;
                this.remeberUser=[];
            },
            Enter(item){
               this.showId=item.id;
            },
            Remeber(item,type){
                if(type=='1'){
                 this.Commentform.comment=this.Commentform.comment+'  @'+item.name+"  ";
                }else{
                 this.Commentform.replyComment=this.Commentform.replyComment+'  @'+item.name+"  ";
                }
                this.remeberUser.push(item.id);
            },
            async emailReplyNotice(commentObj){
                 let para={
                    "bmId": this.routeParams.bmId,
                    "textTaggingId": commentObj.id,
                    "corpCode": this.routeParams.corpCode,
                    "corpId": this.routeParams.corpId,
                    "name": localStorage.getItem("name"),
                    "toUserIds": this.remeberUser,
                    "userId": localStorage.getItem('userId'),
                    }
                const res = await this.$store.dispatch('AC_EmailServiceEmailReplyNotice', para);
                if(res.code==200){      
                    this.checkedEmail=false;    
                    this.$message.success("邮件发送成功！");
                } 

            },
           async addRelpyCommentText(){
               if(this.Commentform.replyComment=='' || this.Commentform.replyComment==null){
                  this.$message.error(this.$t('message.empty'));
                  return false;
              }
              this.isDisabled=true;
                 let para={
                "bizModelId": this.routeParams.bmId,
                "corpAnalyzeId": this.commentObj.corpAnalyzeId,
                "textTaggingId": this.commentObj.id,
                "userName":localStorage.getItem("name"),
                "userId":localStorage.getItem('userId'),
                "parent": this.currentreplyid,
                "answer": this.Commentform.replyComment,
                "type":2
                }
                const res = await this.$store.dispatch('AC_CommentManageInsertComment', para);
                 if(res.code==200){          
                   this.$message.success(this.$t('message.success'));
                   //  this.CommentVisible=false;
                   this.queryCommentText(this.commentObj.id);
                   this.Commentform.replyComment="";
                   this.currentreplyid=null;
                   this.isDisabled=false;
                }else{
                    this.isDisabled=false;
                    this.$message.error(res.msg);
                }
                if(this.checkedEmail==true){
                    this.emailReplyNotice(this.commentObj)
                }   
            },
            async addCommentText(){
              if(this.Commentform.comment=='' || this.Commentform.comment==null){
                  this.$message.error(this.$t('message.empty'));
                  return false;
              }
              this.isDisabled=true;
               let para={
                "bizModelId": this.routeParams.bmId,
                "content": this.Commentform.comment,
                "corpAnalyzeId": this.commentObj.corpAnalyzeId,
                "textTaggingId": this.commentObj.id,
                "userName":localStorage.getItem("name"),
                "userId":localStorage.getItem('userId'),
                "parent": this.currentreplyid,
                "answer": this.Commentform.replyComment,
                "type":1
                }
                const res = await this.$store.dispatch('AC_CommentManageInsertComment', para);
                 if(res.code==200){          
                   this.$message.success(this.$t('message.success'));
                   //  this.CommentVisible=false;
                   this.queryCommentText(this.commentObj.id);
                   this.Commentform.comment="";
                   this.Commentform.replyComment="";
                   this.currentreplyid=null;
                   this.isDisabled=false;
                }else{
                    this.isDisabled=false;
                    this.$message.error(res.msg);

                }   
              if(this.checkedEmail==true){
                    this.emailReplyNotice(this.commentObj)
                }  

            },
            async factor(item){
                this.factorVisible=true;
                this.inferenceItems=[];
                this.textTagId=item.id;
                this.text=item.sourceStr;
                this.textType=item.type;
                let para={
                    "textTaggingId": item.id,
                    "pageNum":1,
                    "pageSize":1000
                }
                const res = await this.$store.dispatch('AC_TagInferenceServiceQueryTagInference', para);
                if(res.code==200) {
                    if(res.data.total==0){
                       // this.GetInference();
                    }else{
                       this.inferenceItems=res.data.tagInferences;
                        for(let i=0;i<res.data.tagInferences.length;i++){
                         this.$set(this.inferenceItems[i],"editeFlag",false)
                        }
                    }
                }
            },
            downExcel(item){
                let para={
                    "docId":item.docId,
                    "pdfNum":item.pageInd,
                    "index":item.tableNum
                }
                
                this.$store.commit('loadingChange',{show: true,text: this.$t('message.inRequest')})              
                this.$axios.get(this.url2, para).then(res => {
                    window.location.href=res.data.excelPath;
                    this.$store.commit('loadingChange',{show: false}) 
                })
                .catch(function(err) {
                    this.$store.commit('loadingChange',{show: false})
                });
                
            },
            GetInference(){
                let para={
                    //"text":item.sourceStr
                    "text":this.text
                }
                this.$axios.post(this.url, para).then(res => {
                if (res.data.code == 200) {
                    this.inferenceItems=res.data.data.inferenceItems;
                    if(res.data.tagInferences && res.data.tagInferences.length>0){
                        for(let i=0;i<res.data.tagInferences.length;i++){
                        this.$set(this.inferenceItems[i],"editeFlag",false)
                        }
                    }   
                } else {
                    this.$message.error(res.data.msg);
                }
                });
            },
            addConclusion(item) { 
                this.title="添加结论";
                this.FormVisible=true;
                this.currentTag='add';
                this.form.id=item.id;
                this.form.conclusion = ''
            },
            async addConclusionText(){
                let para={
                    id:this.form.id,
                    msg:this.form.conclusion
                }
                const res = await this.$store.dispatch('AC_TextTaggingServiceUpdateTextTagging', para);
                if(res.code==200) {this.FormVisible=false;this.currentTag=''; this.form.conclusion='';this.queryDataList();}
            },
            updateConclusion(item) { 
                this.title="更新结论";
                this.FormVisible=true;
                this.currentTag='update';
                this.form.conclusion=item.msg;
                this.form.id=item.id;
            },
            async updateConclusionText(){
                let para={
                    id:this.form.id,
                    msg:this.form.conclusion
                }  
                const res = await this.$store.dispatch('AC_TextTaggingServiceUpdateTextTagging', para);
                if(res.code==200) {this.FormVisible=false;this.currentTag=''; this.form.conclusion='';this.queryDataList()}
            },
          
            handleSizeChange(val) {
                this.pageSize=val;
                this.queryDataList();
            },
            handleCurrentChange(val) {
                this.currentPage=val;
                this.queryDataList();

            },
            joinReportSection(data) {
                this.$emit('joinReportSection',data)
            },

            joinIntegrateList(data) {
                let bool = false
                let index = Number
                if(this.integrateIds.length > 0) {
                    for(let i=0;i<this.integrateIds.length;i++) {
                        if(this.integrateIds[i] == data.id) {
                            bool = true
                            index = i
                        }
                    }
                }
                
                if(!bool) {
                    this.integrates.push(data)
                    this.integrateIds.push(data.id)
                    this.$message.success(this.$t('message.success'))
                }else {
                    this.integrateIds.splice(index,1)
                    this.integrates.splice(index,1)
                    this.$message.success(this.$t('message.success'))
                }
            },

            async addFoIds() {

                if(this.integrateIds.length < 2) {
                    this.$message.error(this.$t('message.noChosen'))
                    return
                }
                
                let params={
                    analyzeAspectId: this.analyzeAspectId,
                    corpAnalyzeId: this.routeParams.corpId,
                    foldTextTaggingId: this.integrateIds[0],
                    foldedTextTaggingIds: this.integrateIds,
                    stockCode: this.routeParams.corpCode,
                    tagClass: this.integrates[0].tagClass,
                    userId: localStorage.getItem('userId')
                }  

                this.$store.commit('loadingChange',{show: true,text: this.$t('message.inRequest')}) 
                const result = await this.$store.dispatch('AC_FoldManageAddFolds', params);
                result.code == 200 ? this.$message.success(this.$t('message.success')) : this.$message.error(this.$t('message.fail'))
                this.$store.commit('loadingChange',{show: false}) 
                this.integrateIds = []
                this.integrates= []
                this.$parent.changeIntegrateByTime()
            },

            affectedEdit:function(index,row,type){
                if(type=='factor'){
                    this.$set(this.inferenceItems[index],"editeFlag",true)
                }else if(type=='Structured'){
                   this.$set(this.StructuredItems[index],"editeFlag",true)                   
                }
            },
            affectedSave:function(index,row,type){
                  if(type=='factor'){
                    this.$set(this.inferenceItems[index],"influenceFactor",row.influenceFactor);
                    this.$set(this.inferenceItems[index],"affectTime",row.affectTime);
                    this.$set(this.inferenceItems[index],"influenceOutcome",row.influenceOutcome);
                    this.$set(this.inferenceItems[index],"value",row.value);
                    this.$set(this.inferenceItems[index],"editeFlag",false);
                    this.$set(this.inferenceItems[index],"annotate",row.annotate);
                  }else if(type=='Structured'){
                    this.$set(this.StructuredItems[index],"name",row.name)   
                    this.$set(this.StructuredItems[index],"value",row.value)   
                    this.$set(this.StructuredItems[index],"editeFlag",false);

                  }
                   
            },
        }
    }
</script>
<style lang="less" scoped>
.table{
    background: #f4f5f9;
    font-size: 13px;
   
    .table-content{
         display: flex;
         flex-flow: column;
         border:1px solid #fff;
         background: #fff;
         margin: 10px 0;
         box-shadow:3px 3px 5px #e4e7ed; 
         .text,.desc{
             padding: 10px;
         }
         .top-text{
            display: flex; 
            justify-content: space-between;
            border-bottom: 1px solid #f2f2f4;
            padding: 5px;
            background: #d0e4f1;
            .header-img{
                border-radius: 50%;
                background: #4da9ec;
                width: 30px;
                height: 30px;
                display: inline-block;
                line-height: 30px;
                text-align: center;
                color: #fff;
              
                // border-radius: 0px 60px 60px 0;
                // width: 15px;
            }
            .front{
                display: flex;
                .title{
                    display: flex;
                    line-height: 32px;
                    margin-left: 6px;
                    font-size: 14px;
                    font-weight: bold;
                    .edit-title{
                        width: 260px;
                    }
                    .cancel{
                    margin-left: 10px;
                    }
                }
                 .circle {
                    --bcColor: #f00;
                 } 
                .addlabel{
                    margin-left: 20px;
                    line-height: 31px;
                    .circle{
                        border-radius: 50%;
                        width: 10px;
                        height: 10px;
                        background:var(--bcColor); 
                        display: inline-block;
                        margin-top: 11px;
                    }
                    .el-dropdown-link i img{
                        vertical-align: middle;
                    }
                }
            }
            .big-small i{       
                line-height: 30px;
                font-size: 16px;
            }
            .draf{
                margin-left: 8px;
            }
            span{
                cursor: pointer;
            }
            .factor{
                margin: 0 10px;
            }
            .deletedata,.editdata{
                font-size: 16px;
                margin-left: 8px;
            }
         }
         .move{
            transition: top .5s ease-in-out;
         }
         .desc{
             display: flex;
             justify-content: space-between;
             border-top: 1px solid #f2f2f4;
            .middle{
                 .comment{
                    color:#75757b;
                 }
                 .line{
                     color: #d3d3de;
                     margin: 0 5px;
                 }
                 .activty{
                     color: #4eb994;
                 }
             }
             .operate{
                //  line-height: 34px;
                 .data{
                     cursor: pointer;
                 }
             }
             .operate,.factor{
                 cursor: pointer;
             }
             .source-from{
                 color: #559ff8;
                 cursor: pointer;
                 margin-right: 10px;
             }
             .publish-time{
                 color:#888;
             }
         }
        
       
    }
  
}
 .nothing-data{
        text-align: center;
        padding: 50px 0;
        color: #a09d9d;
        font-size: 1.3rem;
  }
 .factor{
    .content{
        padding:0 10px;
        .message{
            margin-bottom: 20px;
        }
        .addnum{
           color:#409EFF;
        }
        .nums{
            display: flex;
             .info-num,.infoType-num,.affected-num,.affectWay-num{
                -webkit-box-flex: 1;
                -webkit-flex: 1;
                flex: 1
            }
        }
       
    }
}
.addcomment{
    text-align: right;
}
.userinfo{
    padding: 10px 10px;
    font-size: 14px;
    // border-bottom: 1px solid #dcdfe6;
    .usertime{
        margin-bottom: 5px;
        .user-time{
         color:#dcdfe6;
        }
    }
    .username{
        margin-right: 10px;
    }
    .usercomment{
        text-indent: 2em;
         padding: 12px 0px 10px;
          line-height: 20px;
    }
    .reply-content{
       text-indent: 4em;
       padding: 12px 0px 10px;
       border-bottom: 1px solid #F6F6F6;
        .V2-reply{
            color: #8590A6;
            margin-right: 8px;
            margin-left: 8px;
            
        }
        .user-time{
            color:#dcdfe6;
            margin-left: 10px;
        }
        .answer{
            text-indent: 5em;
            line-height: 20px;
        }
    }
    .header-img{
        border-radius: 50%;
        background: #4da9ec;
        width: 30px;
        height: 30px;
        display: inline-block;
        line-height: 30px;
        text-align: center;
        color: #fff;
        margin-right: 8px;
    }
    .addreplycomment{
            text-align: right;
            margin-top: 8px;
    }
    .reply{
        color: #4da9ec;
        cursor: pointer;
        margin-left: 10px;
    }
}
i img{
    vertical-align: sub;
}
.my-autocomplete {
  li {
    line-height: normal;
    padding: 7px;

    .name {
      text-overflow: ellipsis;
      overflow: hidden;
    }
    .addr {
      font-size: 12px;
      color: #b4b4b4;
    }

    .highlighted .addr {
      color: #ddd;
    }
  }
}

.cell-icon{
  cursor:pointer;
  color:#fff;
}
.child-content{
    display: flex;
    padding: 8px 5px;
    .child-left {
        margin-right: 8px;
        font-size: 16px;
        font-weight: bolder;
    }
    .child-right{
        flex: 1;
    }
}
.conclusion{
    color: #888;
    border: 1px dashed #e4e7ed;
    padding: 10px;
    margin: 5px 0px;
    font-size: 14px;
    span{
        cursor: pointer;
    }
    .con-clu{
        color: #409EFF;
        margin-right: 5px;
        i{
            margin: 0 5px;
        }
    }
    p{
        text-align: center;
    }
    i img{
        width: 18px;
        height: 18px;
    }
}
</style>
<style scoped>
.table .table-content .img  >>> img{
        width: 100%;
}
.factor >>> .el-dialog{
    width: 75%;
}
.factor >>> .el-dialog__header{
    border-bottom: 1px solid #ebecf0;
}
.factor >>> .el-dialog__footer{
   border-top: 1px solid #ebecf0;
}
.message >>> img{
    width: 100%;
}
.content >>> .el-date-editor.el-input, .el-date-editor.el-input__inner{
    width: 140px;
}
.front .addlabel >>> .el-dropdown{
    font-size: 12px;
    
}
 .userinfo >>> .el-textarea__inner{
     width: 80%;
 }
 .userinfo >>> .remind{
     padding: 0 15px;
     margin-left: -44px;
 }
 .operate .data >>> .el-badge__content{
         height: 14px;
    line-height: 13px;
    padding: 0 4px;
 }

</style>
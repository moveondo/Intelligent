<template>
  <div class="list-wrap">
    <div class="list-header">
        <div class="title">{{$t('menu.reportTemplate')}}</div>
        <el-button type="primary" @click="addFormShow = true">{{$t('dataTable.create')}}</el-button>
    </div>

    <dataList 
    ref="reportTemplateList"
    class="container"
    queryDataMethod='reportTemplate'
    :operation="operation"
    :tableColumn="tableColumn"
    @selectOperation="selectOperation"
    ></dataList>

    <!--新增界面-->
    <el-dialog :title="$t('reportTemplate.reportTemplate')" width="350px" :visible.sync="addFormShow" @close="close">
      <el-form :model="addForm" label-width="120px" ref="addForm">
          <el-form-item :label="$t('reportTemplate.reportTemplate')" prop="typeName">
            <el-input v-model="addForm.typeName" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item :label="$t('reportTemplate.type')" prop="type">
              <el-select v-model="addForm.type">
                  <el-option label="1" value="1"></el-option>
                  <el-option label="2" value="2"></el-option>
              </el-select>
          </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
          <el-button type="primary" @click.native="addReportTemplates">{{$t('message.confirm')}}</el-button>
          <el-button @click.native="addFormShow = false">{{$t('message.cancel')}}</el-button>
      </div>
    </el-dialog>

  </div>
</template>
<script>
import dataList from '../../common/dataTable'
export default {
  components:{
    dataList
  },
  data() {
    return {
      addFormShow: false,//新增界面是否显示
      addForm: {},
      operation: [this.$t('dataTable.edit'),this.$t('dataTable.delete')],
      tableColumn:[{
          prop: 'typeName',
          label: this.$t('reportTemplate.reportTemplate')
      },
      {
          prop: 'type',
          label: this.$t('reportTemplate.type')
      }
      ]
    }
  },
  methods: {
        selectOperation(data) {
          this.$router.push({path: '/mreport/reportTemplateDetail',query: {reportId :data.data.id, typeName: data.data.typeName}})
        },

        //创建
        async addReportTemplates() {
            this.$store.commit('loadingChange',{show: true,text: this.$t('message.inRequest')})
            const result = await this.$store.dispatch('AC_ReportTemplateServiceAddReportTemplate', this.addForm);
            result.code == 200 ? this.$message.success(this.$t('message.success')) : this.$message.error(this.$t('message.fail'))
            this.$store.commit('loadingChange',{show: false})
            this.close()
            this.$refs.reportTemplateList.queryData();
        },

        close() {
          this.addFormShow = false
          this.addForm = {}
        }

  }
  
}

</script>
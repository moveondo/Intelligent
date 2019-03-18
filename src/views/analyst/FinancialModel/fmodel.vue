<template>
    <div class="list-wrap">
      <div class="list-header">
          <div class="title">{{$t('analyst.financialModel')}}</div>
          <!-- <el-button type="primary" @click="appendShow">创建</el-button> -->
      </div>

      <dataList 
      ref="dataList"
      class="container"
      queryDataMethod='financeModel'
      :operation="operation"
      :tableColumn="tableColumn"
      @selectOperation="selectOperation"
      ></dataList>
    </div>
</template>
<script>
  import dataList from '../../common/dataTable';
  export default {
    components:{
      dataList
    },
    data() {
      return {
        operation: [this.$t('task.detail')],
        tableColumn: [{
                prop: 'name',
                label: this.$t('analyst.financialModel')
            },
            {
                prop: 'description',
                label: this.$t('dataTable.description')
            },
            {
                prop: 'code',
                label: this.$t('analyst.modelCode')
            }
            ]
      }
    },
    methods: {
      selectOperation(data) {
        let row = data.data
        this.$router.push({path: '/analyst/modifyfmodel',query: {Id: row.id,name: row.name}})
      }
    }
  }
</script>
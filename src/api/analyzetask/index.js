import Vue from 'vue';
import axios from 'axios';



export default {



      async AsyncTaskServiceDeleteAsyncTask(params={}){
        let res= await axios.post( '/analyzetask/asyncTaskService/deleteAsyncTask',params);
        return res.data;
      }
      ,
  


      async AsyncTaskServiceGetAsyncTask(params={}){
        let res= await axios.post( '/analyzetask/asyncTaskService/getAsyncTask',params);
        return res.data;
      }
      ,
  


      async AsyncTaskServiceAddAsyncTask(params={}){
        let res= await axios.post( '/analyzetask/asyncTaskService/addAsyncTask',params);
        return res.data;
      }
      ,
  


      async AsyncTaskServiceUpdateAsyncTask(params={}){
        let res= await axios.post( '/analyzetask/asyncTaskService/updateAsyncTask',params);
        return res.data;
      }
      ,
  


      async AsyncTaskServiceUpdateManyAsyncTask(params={}){
        let res= await axios.post( '/analyzetask/asyncTaskService/updateManyAsyncTask',params);
        return res.data;
      }
      ,
  


      async AsyncTaskServiceGetManyAsyncTask(params={}){
        let res= await axios.post( '/analyzetask/asyncTaskService/getManyAsyncTask',params);
        return res.data;
      }
      ,
  


      async AsyncTaskServiceQueryAsyncTask(params={}){
        let res= await axios.post( '/analyzetask/asyncTaskService/queryAsyncTask',params);
        return res.data;
      }
      ,
  



}

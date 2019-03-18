import Vue from 'vue';
import axios from 'axios';



export default {



      async JobManageServiceBuildJob(params={}){
        let res= await axios.post( '/jobmanage/jobManageService/buildJob',params);
        return res.data;
      }
      ,
  


      async JobManageServiceKillProcess(params={}){
        let res= await axios.post( '/jobmanage/jobManageService/killProcess',params);
        return res.data;
      }
      ,
  


      async JobManageServiceStartJob(params={}){
        let res= await axios.post( '/jobmanage/jobManageService/startJob',params);
        return res.data;
      }
      ,
  



      async NodeAgentServiceOperation1(params={}){
        let res= await axios.post( '/jobmanage/nodeAgentService/Operation1',params);
        return res.data;
      }
      ,
  



      async AppManageServiceBuildApp(params={}){
        let res= await axios.post( '/jobmanage/appManageService/buildApp',params);
        return res.data;
      }
      ,
  


      async AppManageServiceRollApp(params={}){
        let res= await axios.post( '/jobmanage/appManageService/rollApp',params);
        return res.data;
      }
      ,
  



      async TaskServiceDeleteTask(params={}){
        let res= await axios.post( '/jobmanage/taskService/deleteTask',params);
        return res.data;
      }
      ,
  


      async TaskServiceGetTask(params={}){
        let res= await axios.post( '/jobmanage/taskService/getTask',params);
        return res.data;
      }
      ,
  


      async TaskServiceAddTask(params={}){
        let res= await axios.post( '/jobmanage/taskService/addTask',params);
        return res.data;
      }
      ,
  


      async TaskServiceUpdateTask(params={}){
        let res= await axios.post( '/jobmanage/taskService/updateTask',params);
        return res.data;
      }
      ,
  


      async TaskServiceUpdateManyTask(params={}){
        let res= await axios.post( '/jobmanage/taskService/updateManyTask',params);
        return res.data;
      }
      ,
  


      async TaskServiceGetManyTask(params={}){
        let res= await axios.post( '/jobmanage/taskService/getManyTask',params);
        return res.data;
      }
      ,
  


      async TaskServiceQueryTask(params={}){
        let res= await axios.post( '/jobmanage/taskService/queryTask',params);
        return res.data;
      }
      ,
  



}

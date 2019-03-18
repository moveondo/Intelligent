import Vue from 'vue';
import axios from 'axios';



export default {



      async PdfPathProducerSearchDoc(params={}){
        let res= await axios.post( '/searchapi/pdfPathProducer/searchDoc',params);
        return res.data;
      }
      ,
  


      async PdfPathProducerGetDocByPage(params={}){
        let res= await axios.post( '/searchapi/pdfPathProducer/getDocByPage',params);
        return res.data;
      }
      ,
  


      async PdfPathProducerGetCatalogBy(params={}){
        let res= await axios.post( '/searchapi/pdfPathProducer/getCatalogBy',params);
        return res.data;
      }
      ,
  


      async PdfPathProducerGetOutline(params={}){
        let res= await axios.post( '/searchapi/pdfPathProducer/getOutline',params);
        return res.data;
      }
      ,
  



      async RemoteDicRemoteDic(params={}){
        let res= await axios.post( '/searchapi/remoteDic/remoteDic',params);
        return res.data;
      }
      ,
  



      async JobServiceCheckHealth(params={}){
        let res= await axios.post( '/searchapi/jobService/checkHealth',params);
        return res.data;
      }
      ,
  



}

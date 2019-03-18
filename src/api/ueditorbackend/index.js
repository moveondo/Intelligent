import Vue from 'vue';
import axios from 'axios';



export default {


    async PdfDownTaskGetPdfDownResult(params={}){
        let res= await axios.post( '/ueditorbackend/pdfDownTask/getPdfDownResult',params);
        return res.data;
    }
    ,
}
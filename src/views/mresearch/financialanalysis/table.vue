<template>
<div class="table">
    
      <table style="border-collapse:collapse">
            <caption>主要手机品牌双摄渗透率快速提升</caption> 
            <thead>
                <tr>
                  <th> </th><td></td><th >2016A</th><th >2017E</th><th >2018E</th><th >2019E</th><th >2020E</th>
                </tr>
            </thead>    
            <tbody>
                <tr>
                    <th rowspan="5">苹果</th><th>出货量(百万部)</th><td>205</td><td>220</td><td>230</td><td>240</td><td>240</td>
                </tr>
                <tr>
                     <th>后置双摄渗透率</th><td>15%</td><td>220</td><td>230</td><td>240</td><td>240</td>
                </tr>
                <tr>
                      <th>双摄需求量（百万颗</th><td>205</td><td>220</td><td>230</td><td>240</td><td>240</td>
                </tr>
                <tr>
                      <th>ASP（美元）</th><td>205</td><td>220</td><td>230</td><td>240</td><td>240</td>
                </tr>
                <tr>
                       <th>市场空间(百万美元)</th><td>205</td><td>220</td><td>230</td><td>240</td><td>240</td>
                </tr>
                 <tr>
                    <th rowspan="5">三星</th><th>出货量（百万部）</th><td>205</td><td>220</td><td>230</td><td>240</td><td>240</td>
                </tr>
                 <tr>
                     <th>后置双摄渗透率</th><td>205</td><td>220</td><td>230</td><td>240</td><td>240</td>
                </tr>
                 <tr>
                     <th>双摄需求量（百万颗）</th><td>205</td><td>220</td><td>230</td><td>240</td><td>240</td>
                </tr>
                 <tr >
                     <th>ASP（美元）</th><td>205</td><td>220</td><td>230</td><td>240</td><td>240</td>
                </tr>
                 <tr >
                     <th>市场空间（百万美元）</th><td>205</td><td>220</td><td>230</td><td>240</td><td>240</td>
                </tr>
                 <tr>
                    <th rowspan="8">其他安卓旗舰</th><th>出货量(百万部)</th><td>205</td><td>220</td><td>230</td><td>240</td><td>240</td>
                </tr>
                 <tr >
                    <th>后置双摄渗透率</th><td>205</td><td>220</td><td>230</td><td>240</td><td>240</td>
                </tr>
                 <tr >
                    <th>后置双摄需求量(百万颗)</th><td>205</td><td>220</td><td>230</td><td>240</td><td>240</td>
                </tr>
                 <tr >
                     <th>后置双摄旗舰ASP(美元)</th><td>205</td><td>220</td><td>230</td><td>240</td><td>240</td>
                </tr>
                  <tr >
                      <th>前置双摄渗透率</th><td>205</td><td>220</td><td>230</td><td>240</td><td>240</td>
                </tr>
                 <tr >
                      <th>旗舰前置双摄需求量(百万颗)</th><td>205</td><td>220</td><td>230</td><td>240</td><td>240</td>
                </tr>
                 <tr >
                     <th>旗舰前置双摄ASP(美元)</th><td>205</td><td>220</td><td>230</td><td>240</td><td>240</td>
                </tr>
                 <tr>
                     <th>旗舰市场空间(百万美元)</th><td>205</td><td>220</td><td>230</td><td>240</td><td>240</td>
                </tr>
                </tbody>
            <tfoot>
               
                <tr>
                    <th rowspan="2">总价</th>
                    <th colspan="1">市场空间(百万美元)</th> <td >2300</td><td >8716</td> <td >14107</td><td >18276</td><td >20926</td>
                </tr>
                 <tr>
                    <th colspan="1">YoY</th> <td ></td><td >279%</td> <td >62%</td><td >30%</td><td >15%</td>
                </tr>
            </tfoot>
   </table>
</div>
   
</template>

<script>
    export default {
        data() {
            return {

            }
        },
        methods: {
            onSubmit() {
                console.log('submit!');
            }
        }
    }

</script>
<style lang="less" scoped>

table {
    background-color: #FFF;
    font: 12px arial;
    text-align: center;
}

table caption {
    font-size: 24px;
    background-color: #FFF;
}

table,tr {
    vertical-align: middle;
    text-align:left;
    border-bottom: 1px solid #999;
}
tr ,th ,td{
    //  border: 1px solid #999;

}
tbody td, tbody th {
    padding: 9px;
    text-align: center;
  
}

tfoot td, tfoot th {
    font-weight: bold;
    padding: 4px 8px 6px 9px;
    text-align:center;
}
 tfoot,.space{

      border-bottom: 1px solid #999;
}

thead th {
    font-size: 14px;
    font-weight: bold;
    line-height: 19px;
    padding: 0 8px 2px;
    text-align:center;
}


 
</style>


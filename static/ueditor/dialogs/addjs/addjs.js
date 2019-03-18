

initAddjs();

 function initAddjs(){
     dialog.onok=function(){
        var jscontent=document.getElementById('content').value;
         editor.execCommand('addjs',jscontent)
     }
 }
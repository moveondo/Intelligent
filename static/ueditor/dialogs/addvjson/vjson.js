
initAddjs();

function initAddjs(){
    dialog.onok=function(){
       var jscontent=document.getElementById('content').value;
       var name=document.getElementById('name').value;
       var obj={
           "jscontent":jscontent,
           "name":name
       }
        editor.execCommand('addvjson',obj)
    }
}
var obj = {test: 'str'};

function image(ot, elementImage, obj){
    var element = document.querySelector("#" + elementImage);
    element.src = ot[0];
    var link = document.querySelector("#link1");
    link.href = ot[0];
    var link2 = document.querySelector("#link2");
    link2.value = ot[1];
    obj.test = 'work';
    //link2.name = "change";
    //alert(ot[0]);
}
var j = 0;
function test(text){
   /*var h1 = document.querySelector("#h1");

   h1.innerHTML = + text; */
   j = text;
   alert(text) ;
}
var ot;
function ajax(){
var xhr = new XMLHttpRequest();

//открывае файл php
xhr.open('POST', '../Ajax/Ajax.php');
    
xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
var t = 0;
//ot = ot;
xhr.onreadystatechange = function (){
//Делаем проверку
if (xhr.readyState === 1/*4*/ && xhr.status === /*200*/0){
    ot = xhr.responseText;
    ot = JSON.parse(ot);
    return 2;
    //t = ot;
    //alert(ot);
    /*for(var i =0; i<ot.length;i++){
    strings (i,ot[i]);
    }*/
    //image(ot,"image1",obj);
    /*function test2(){
        alert(2);
    }*/
    //test(ot);










}
}
//ot = ot;
//alert(t);
//При желании передаем парметр 
xhr.send();
}
//ajax();
//alert(obj.test);

function ajaxNovedenie(id){
    var xhr = new XMLHttpRequest();

    var ot;
    //открывае файл php
    xhr.open('POST', '../Ajax/Ajax.php');
        
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    
    xhr.onreadystatechange = function (){
    //Делаем проверку
    if (xhr.readyState ===4 && xhr.status === 200){
        ot = xhr.responseText;
        ot = JSON.parse(ot);
        /*for(var i =0; i<ot.length;i++){
        strings (i,ot[i]);
        }*/
        //test(ot);
        image(ot,"image1");
    }
    }
    
    //При желании передаем парметр 
    xhr.send("param=id&id=" + id);
    
    }
/*ajax()
alert(a);*/

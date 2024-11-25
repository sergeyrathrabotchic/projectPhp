a = 1;
function test(){
  a = 2;
  b = function (){
    a = 3;
  }
  a = a;
  /*var h1 = document.querySelector("#h1");

   h1.innerHTML = 'проверка';*/ 
 }
 test();
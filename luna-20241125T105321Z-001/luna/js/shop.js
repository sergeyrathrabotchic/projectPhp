
    //alert(a);
    //alert(ot);
    //alert(ot);
    //a = ajax();
    /*var a = <?php echo json_encode( $linkImage, JSON_UNESCAPED_UNICODE);?>;
    alert(a.linkImage1);*/
    var link1 = <?php echo '"'. $link1 . '"'?>;
    var link2 = <?php echo '"'. $link2 . '"'?>;
    var link3 = <?php echo '"'. $link3 . '"'?>;
    var link4 = <?php echo '"'. $link4 . '"'?>;
    var link5 = <?php echo '"'. $link5 . '"'?>;
    var link6 = <?php echo '"'. $link6 . '"'?>;
    var link7 = <?php echo '"'. $link7 . '"'?>;
    links = [link1,link2,link3,link4,link5,link6,link7];
    //alert(links);
    /*var element = document.querySelector("#image1");
    element.src = links[0];*/
    /*var oval = document.querySelector("#oval0");
    oval.style.backgroundColor = "#6e2e00";*/
    var linkt = document.querySelector("#image1");
    alert(linkt);
        


    function linkSetRight(left, image , i , i2, i3, i4, i5, i6 , i7 , links){
        //alert(links);
        var link = document.querySelector("#image0");
        var linkSrc = link.getAttribute("src");
        //alert(linkSrc[21]);
        //for(var i = 1; i <= 7 ; i++){
            if(left != 'left'){
                if(linkSrc[21] == 1){
                    link.src = links[1];
                    var oval = document.querySelector(/*"#oval8"*/ "#oval" + i2);
                    oval.style.backgroundColor = "#6e2e00";
                    var oval = document.querySelector(/*"#oval7"*/ "#oval" + i);
                    oval.style.backgroundColor = "#ffffff";
                } else if (linkSrc[21] == 2){
                    link.src = links[2];
                    var oval = document.querySelector(/*"#oval9"*/ "#oval" + i3);
                    oval.style.backgroundColor = "#6e2e00";
                    var oval = document.querySelector(/*"#oval8"*/ "#oval" + i2);
                    oval.style.backgroundColor = "#ffffff";
                } else if (linkSrc[21] == 3){
                    link.src = links[3];
                    var oval = document.querySelector(/*"#oval10"*/ "#oval" + i4);
                    oval.style.backgroundColor = "#6e2e00";
                    var oval = document.querySelector(/*"#oval9"*/ "#oval" + i3);
                    oval.style.backgroundColor = "#ffffff";
                } else if (linkSrc[21] == 4){
                    link.src = links[4];
                    var oval = document.querySelector(/*"#oval11"*/ "#oval" + i5);
                    oval.style.backgroundColor = "#6e2e00";
                    var oval = document.querySelector(/*"#oval10"*/ "#oval" + i4);
                    oval.style.backgroundColor = "#ffffff";
                } else if (linkSrc[21] == 5){
                    link.src = links[5];
                    var oval = document.querySelector(/*"#oval12"*/ "#oval" + i6);
                    oval.style.backgroundColor = "#6e2e00";
                    var oval = document.querySelector(/*"#oval11"*/ "#oval" + i5);
                    oval.style.backgroundColor = "#ffffff";
                }  else if (linkSrc[21] == 6){
                    link.src = links[6];
                    var oval = document.querySelector(/*"#oval13"*/ "#oval" + i7);
                    oval.style.backgroundColor = "#6e2e00";
                    var oval = document.querySelector(/*"#oval12"*/ "#oval" + i6);
                    oval.style.backgroundColor = "#ffffff";
                } else if (linkSrc[21] == 7){
                    link.src = links[0];
                    var oval = document.querySelector(/*"#oval7"*/ "#oval" + i);
                    oval.style.backgroundColor = "#6e2e00";
                    var oval = document.querySelector(/*"#oval13"*/ "#oval" + i7);
                    oval.style.backgroundColor = "#ffffff";
                }
            }     
        //}
        //alert(src[21]);
            if(left == 'left'){
                    if(linkSrc[21] == 1){
                    link.src = links[6];
                    var oval = document.querySelector(/*"#oval7"*/ "#oval" + i);
                    oval.style.backgroundColor = "#ffffff";
                    var oval = document.querySelector(/*"#oval13"*/ "#oval" + i7);
                    oval.style.backgroundColor = "#6e2e00";
                } else if (linkSrc[21] == 2){
                    link.src = links[0];
                    var oval = document.querySelector(/*"#oval7"*/ "#oval" + i);
                    oval.style.backgroundColor = "#6e2e00";
                    var oval = document.querySelector(/*"#oval8"*/ "#oval" + i2);
                    oval.style.backgroundColor = "#ffffff";
                } else if (linkSrc[21] == 3){
                    link.src = links[1];
                    var oval = document.querySelector(/*"#oval8"*/ "#oval" + i2);
                    oval.style.backgroundColor = "#6e2e00";
                    var oval = document.querySelector(/*"#oval9"*/ "#oval" + i3);
                    oval.style.backgroundColor = "#ffffff";
                } else if (linkSrc[21] == 4){
                    link.src = links[2];
                    var oval = document.querySelector(/*"#oval9"*/ "#oval" + i3);
                    oval.style.backgroundColor = "#6e2e00";
                    var oval = document.querySelector(/*"#oval10"*/ "#oval" + i4);
                    oval.style.backgroundColor = "#ffffff";
                } else if (linkSrc[21] == 5){
                    link.src = links[3];
                    var oval = document.querySelector(/*"#oval10"*/ "#oval" + i4);
                    oval.style.backgroundColor = "#6e2e00";
                    var oval = document.querySelector(/*"#oval11"*/ "#oval" + i5);
                    oval.style.backgroundColor = "#ffffff";
                }  else if (linkSrc[21] == 6){
                    link.src = links[4];
                    var oval = document.querySelector(/*"#oval11"*/ "#oval" + i5);
                    oval.style.backgroundColor = "#6e2e00";
                    var oval = document.querySelector(/*"#oval12"*/ "#oval" + i6);
                    oval.style.backgroundColor = "#ffffff";
                } else if (linkSrc[21] == 7){
                    link.src = links[5];
                    var oval = document.querySelector(/*"#oval12"*/ "#oval" + i6);
                    oval.style.backgroundColor = "#6e2e00";
                    var oval = document.querySelector(/*"#oval13"*/ "#oval" + i7);
                    oval.style.backgroundColor = "#ffffff";
                } 
            }
        }
        // function linkSetLeft(){
        // var link = document.querySelector("#image1");
        // var linkSrc = link.getAttribute("src");
        //     if(linkSrc[21] == 1){
        //         link.src = links[6];
        //         var oval = document.querySelector("#oval7");
        //         oval.style.backgroundColor = "#ffffff";
        //         var oval = document.querySelector("#oval13");
        //         oval.style.backgroundColor = "#6e2e00";
        //     } else if (linkSrc[21] == 2){
        //         link.src = links[1];
        //         var oval = document.querySelector("#oval7");
        //         oval.style.backgroundColor = "#6e2e00";
        //         var oval = document.querySelector("#oval8");
        //         oval.style.backgroundColor = "#ffffff";
        //     } else if (linkSrc[21] == 3){
        //         link.src = links[3];
        //         var oval = document.querySelector("#oval10");
        //         oval.style.backgroundColor = "#6e2e00";
        //         var oval = document.querySelector("#oval9");
        //         oval.style.backgroundColor = "#ffffff";
        //     } else if (linkSrc[21] == 4){
        //         link.src = links[4];
        //         var oval = document.querySelector("#oval11");
        //         oval.style.backgroundColor = "#6e2e00";
        //         var oval = document.querySelector("#oval10");
        //         oval.style.backgroundColor = "#ffffff";
        //     } else if (linkSrc[21] == 5){
        //         link.src = links[5];
        //         var oval = document.querySelector("#oval12");
        //         oval.style.backgroundColor = "#6e2e00";
        //         var oval = document.querySelector("#oval11");
        //         oval.style.backgroundColor = "#ffffff";
        //     }  else if (linkSrc[21] == 6){
        //         link.src = links[6];
        //         var oval = document.querySelector("#oval13");
        //         oval.style.backgroundColor = "#6e2e00";
        //         var oval = document.querySelector("#oval12");
        //         oval.style.backgroundColor = "#ffffff";
        //     } else if (linkSrc[21] == 7){
        //         link.src = links[0];
        //         var oval = document.querySelector("#oval7");
        //         oval.style.backgroundColor = "#6e2e00";
        //         var oval = document.querySelector("#oval13");
        //         oval.style.backgroundColor = "#ffffff";
        //     }     
        // }

    function transferPicture(img){

    /*img.onmousedown*/img.onmousedown =function(event) { 
//alert(1);
    

    var proverka1 =1;
    var old =0;
    var proverka2 =0;
    var timer = 0;
    var condishin = 0;
    var link = 0;
    var linkProverka = 0;
    
    function onMouseMove(event) {
        //console.log(event.changedTouches[0].pageX)
        console.log(event.clientX);
        function linkSet(link2){
        var link = document.querySelector("#image2");
        var linkSrc = link.getAttribute("src");
        //alert(linkSrc[21]);
        //for(var i = 1; i <= 7 ; i++){
            if(linkSrc[21] == 1){
                link.src = links[1];
                var oval = document.querySelector("#oval1");
                oval.style.backgroundColor = "#6e2e00";
                var oval = document.querySelector("#oval0");
                oval.style.backgroundColor = "#ffffff";
            } else if (linkSrc[21] == 2){
                link.src = links[2];
                var oval = document.querySelector("#oval2");
                oval.style.backgroundColor = "#6e2e00";
                var oval = document.querySelector("#oval1");
                oval.style.backgroundColor = "#ffffff";
            } else if (linkSrc[21] == 3){
                link.src = links[3];
                var oval = document.querySelector("#oval3");
                oval.style.backgroundColor = "#6e2e00";
                var oval = document.querySelector("#oval2");
                oval.style.backgroundColor = "#ffffff";
            } else if (linkSrc[21] == 4){
                link.src = links[4];
                var oval = document.querySelector("#oval4");
                oval.style.backgroundColor = "#6e2e00";
                var oval = document.querySelector("#oval3");
                oval.style.backgroundColor = "#ffffff";
            } else if (linkSrc[21] == 5){
                link.src = links[5];
                var oval = document.querySelector("#oval5");
                oval.style.backgroundColor = "#6e2e00";
                var oval = document.querySelector("#oval4");
                oval.style.backgroundColor = "#ffffff";
            }  else if (linkSrc[21] == 6){
                link.src = links[6];
                var oval = document.querySelector("#oval6");
                oval.style.backgroundColor = "#6e2e00";
                var oval = document.querySelector("#oval5");
                oval.style.backgroundColor = "#ffffff";
            } else if (linkSrc[21] == 7){
                link.src = links[0];
                var oval = document.querySelector("#oval0");
                oval.style.backgroundColor = "#6e2e00";
                var oval = document.querySelector("#oval6");
                oval.style.backgroundColor = "#ffffff";
            }     
        //}
        //alert(src[21]);
        }
        
        if(proverka1==1){
            proverka1 = 2;
            old = event.clientX;
            
        }
        //console.log(proverka1);
        if(proverka2 ==0){
            //console.log("work");
            proverka2 = 1;
            let timerIdClick = setInterval(function () {
                if(timer<4){
                    timer = timer +1;
                    if (timer == 1 ){
                        condishin = 1;
                    } else if (timer == 2 ){
                        condishin = 2;
                    } else if (timer == 3 ){
                        condishin = 3;
                    }
                } else {
                    clearInterval(timerIdClick);
                }
                
                
            }, 300);
            //console.log("work");
        }

        if(condishin ==1){
            condishin = 0;
            result = old - event.clientX;
            if (result < 0 ){
                result = result * (-1);
            }
            console.log(result + "work kkkkk1");
            if(result > 40 && linkProverka == 0){
                linkSet("#image2");
                linkProverka = 1;
                document.removeEventListener('mousemove', onMouseMove);
                //console.log(result + "work kkkkk1" + 'работает');
            }
            //alert(result);

        }  
        if(condishin ==2){
            condishin = 0;
            result = old - event.clientX;
            if (result < 0 ){
                result = result * (-1);
            }
            console.log(result + "work kkkkk2" /*+ condishin*/);
            if(result > 80  && linkProverka == 0){
                linkSet("#image2");
                linkProverka = 1;
                document.removeEventListener('mousemove', onMouseMove);
                //console.log(result + "work kkkkk1" + 'работает');
            }

        }
        if(condishin ==3){
            condishin = 0;
            result = old - event.clientX;
            if (result < 0 ){
                result = result * (-1);
            }
            console.log(result + "work kkkkk3");
            if(result > 140  && linkProverka == 0){
                linkSet("#image2");
                linkProverka = 1;
                document.removeEventListener('mousemove', onMouseMove);
                //console.log(result + "work kkkkk1" + 'работает');
            }
            //alert(result);

        }
    }

    function test(text){
        document.removeEventListener('mousemove', onMouseMove);
        console.log(text);
    }

    document.addEventListener('mousemove', onMouseMove);

    //Задаем время через каторое программа перестает работать 
    setTimeout(test, 3000, "work22");
    
    //отпускаем мышку останавливаем программу
    img.onmouseup = function() {
        document.removeEventListener('mousemove', onMouseMove);
        img.onmouseup = null;
    };

    //елемент выходит за границу 
    /*img.onmouseout = function() {
        document.removeEventListener('mousemove', onMouseMove);
        img.onmouseup = null;
    }*/

    }
    //убрать зацепку фото
    img.ondragstart = function() {
        return false;
    };
    }
    
    //transferPicture(image2);



    /*var h = document.querySelector("#image2");
    var src = h.getAttribute("src");
    alert(src);*/
    

    function Novedenie(i,k){
        //alert(links[i]);
        var element = document.querySelector("#image1");
        element.src = links[k];
        var oval = document.querySelector("#oval" + i);
        oval.style.backgroundColor = "#6e2e00";
        /*if(i != 0){
             var oval = document.querySelector("#oval" + i);
            oval.style.backgroundColor = "#ffffff";
        }*/
    }
    function down(i){
        var oval = document.querySelector("#oval" + i);
        oval.style.backgroundColor = "#ffffff";
    }

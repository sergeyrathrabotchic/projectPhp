function transferPicture(img){

    let startingPosition = null;

    img.onmousedown = function(event) { 
    let shiftX = event.clientX - img.getBoundingClientRect().left;
    let shiftY = event.clientY - img.getBoundingClientRect().top;

    img.style.position = 'absolute';
    img.style.zIndex = 1000;
    document.body.append(img);
    

    moveAt(event.pageX, event.pageY);
    let timerIdClick = setInterval(function () {
        console.log(event.pageX);
    }, 2000);
    
    //alert(event.pageX);

    //setTimeout(alert, 7000, event.pageX);
    function onMouseMove(event) {
        moveAt(event.pageX, event.pageY);
    }

    // (3) перемещать по экрану
    document.addEventListener('mousemove', onMouseMove);

    function moveAt(pageX, pageY) {
        img.style.left = pageX - img.offsetWidth / 2 + 'px';
        img.style.top = pageY - img.offsetHeight / 2 + 'px';
        /*img.style.left = pageX - shiftX + 'px';
        img.style.top = pageY - shiftY + 'px';*/
        //alert(img.style.top);
    }

    img.onmouseup = function() {
        /*moveAt(event.pageX, event.pageY);
        console.log(event.pageX);*/
        document.removeEventListener('mousemove', onMouseMove);
        img.onmouseup = null;
    };
    }
    img.ondragstart = function() {
    return false;
    };
}
transferPicture(image2);
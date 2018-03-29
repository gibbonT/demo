window.onload = function () {
    var isdown = false,
        cover = document.getElementById("canvas"),
        covercanvas = cover.getContext("2d");

    covercanvas.fillStyle = "transparent";
    covercanvas.fillRect(0, 0, 250, 250);

    function isDown(e) {
        e.preventDefault();
        isdown = true;
    }
    function isUp(e) {
        var data = covercanvas.getImageData(0, 0, 250, 250).data,
            scrapeNum = 0;
        for(var i = 3, len = data.length; i < len; i += 4){
            if(data[i] === 0){
                scrapeNum++;
            }
        }
        if(scrapeNum > 250 * 250 * 0.6 ) {
            covercanvas.clearRect(0, 0, 250, 250);
            $("#jump").click(function () {
                setTimeout(function () {
                    url = $("#jump").attr("href");
                    console.log(url);
                    window.location.href = url;
                }, 600)
            })
        }
        isdown = false;
    }
    function draw(e) {
        e.preventDefault();
        if(isdown) {
            if(e.changedTouches) {
                e = e.changedTouches[e.changedTouches.length-1];
            }
            var _height = parseInt((window.innerHeight - 200)/2),
                _width = parseInt((window.innerWidth - 200)/2),
                touchTop = e.clientY - _height,
                touchLeft = e.clientX - _width;
            // console.log(e.clientY, _height);
            with(covercanvas){
                beginPath();
                arc(touchLeft, touchTop, 15 , 0, Math.PI * 2);
                fill();
            }
        }
        //alert(touchTop);
    }

    covercanvas.fillStyle = "rgba(192, 192, 192, 1)";
    covercanvas.fillRect(0, 0, 250, 250);

    covercanvas.globalCompositeOperation = 'destination-out';

    $("#square").css("background", "rgb(238, 238, 238)");

    cover.addEventListener('touchstart', isDown);
    cover.addEventListener('touchmove', draw);
    cover.addEventListener('touchend', isUp);

    cover.addEventListener('mousemove', draw);
    cover.addEventListener('mousedown', isDown);
    cover.addEventListener('mouseup', isUp);
};
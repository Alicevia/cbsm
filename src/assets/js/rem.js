~(function(){
   function computed(){
        var html = document.documentElement;
        var desW = 1920;
        var width = html.clientWidth;
        if (width<1200) {
            html.style.fontSize=1200/1920*100+'px'

            return
        }
        if (width>desW) {
            html.style.fontSize='100px';
            return;
        }
        let per = width/desW*100;
        html.style.fontSize = per+'px';
   }
   computed();
   window.addEventListener('resize',computed);
})();
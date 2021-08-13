function indexJs(first_cid) {
    setTimeout(function(){
        let oli = $('.nav-list li');
        for (var i = 0; i < oli.length; i++) {
            var li_id = $(oli[i]).attr('data-id').replace("/", "").replace("/", "");
            if (first_cid == li_id) {
                let moveX = $(oli[i]).position().left + $(oli[i]).parent().scrollLeft();
                let pageX = document.documentElement.clientWidth;
                let blockWidth = $(oli[i]).width();
                let left = moveX - (pageX / 2) + (blockWidth / 2);
                $(".nav-list").animate({
                    scrollLeft: left,
                });
                let cate_index = $(oli[i]).prevAll().length;
                let pxs = parseInt(cate_index) * 52;
                $('.bar').css({"width": "52px", "transition-duration": "100ms", "transform": "translateX(" + pxs + "px)"})
            }
        }
    },100)
    //点击导航滑动
    $("body").on("click", '.nav_a', function () {
        let moveX = $(this).position().left + $(this).parent().scrollLeft();
        let pageX = document.documentElement.clientWidth;
        let blockWidth = $(this).width();
        let left = moveX - (pageX / 2) + (blockWidth / 2);
        $(".nav-list").animate({
            scrollLeft: left,
        });
        let cate_index = $(this).prevAll().length;
        let pxs = parseInt(cate_index) * 52;
        $('.bar').css({"width": "52px", "transition-duration": "100ms", "transform": "translateX(" + pxs + "px)"})
    });
}
//百度广告
function baiduJs(baidu_box) {
    let baidu=[
        "//m.inping.com/common/w_rq/static/o/common/sttjs.js", //6t1
        "//m.inping.com/common/xs/openjs/r_pt/source/uuku.js", //6t2
        "//m.inping.com/production/s/source/nm/openjs/ko_ppjc.js", //dt2 n
        "//m.inping.com/common/y/static/t-sq-uvvlb.js", //
        "//m.inping.com/common/w_rq/static/o/common/sttjs.js", //6t1
        "//m.inping.com/common/xs/openjs/r_pt/source/uuku.js", //6t2
        "//m.inping.com/production/s/source/nm/openjs/ko_ppjc.js", //dt2 n
        "//m.inping.com/common/y/static/t-sq-uvvlb.js", //
        "//m.inping.com/common/w_rq/static/o/common/sttjs.js", //6t1
        "//m.inping.com/common/xs/openjs/r_pt/source/uuku.js", //6t2
    ];
    setTimeout(function(){
        $.each(baidu_box, function (i, val) {
            var ad_string = fgl_str(i);
            var new_element = document.createElement("script");
            new_element.setAttribute("type", "text/javascript");
            new_element.setAttribute("src", ad_string);
            document.getElementById(val).appendChild(new_element);
        });
    },1000)
    function fgl_str(ad_index) {
        var src = baidu[ad_index];
        if (ad_index === baidu.length - 1) {
            ad_index = 0;
        } else {
            ad_index++;
        }
        return '//' + src;
    };
    

}
export { 
    //很关键
    indexJs,
    baiduJs
}
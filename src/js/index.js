async function indexJs(mescroll) {
    //点击导航滑动
    $("body").on("click", '.ly-tab-item', function () {
        if($(this).attr('class').indexOf('atcive-ly') == -1){
            $(this).addClass('atcive-ly') 
        }else{
            console.log(mescroll);
        }
    });
}
//百度广告
async function baiduJs(baidu,baidu_box) {
    $.each(baidu_box, function (i, val) {
        var ad_string = fgl_str(i);
        // var new_element = document.createElement("script");
        // new_element.setAttribute("type", "text/javascript");
        // new_element.setAttribute("src", ad_string);
        // document.getElementById(val).appendChild(new_element);
        (function () {
            (window.slotbydup = window.slotbydup || []).push({
                id:ad_string,
                container:val,
                async:true,
                size: '20,12',
                display: 'inlay-fix'
            });

        })();
    });
    function fgl_str(ad_index) {
        var src = baidu[ad_index];
        if (ad_index === baidu.length - 1) {
            ad_index = 0;
        } else {
            ad_index++;
        }
        return src;
    };
    

}
export { 
    //调用方法
    // indexJs,
    baiduJs
}
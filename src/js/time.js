

import Vue from 'vue';

const Time = {
    // 转换时间
    getFormatTime(timestamp) {
        var d_minutes, d_hours, d_days;
        var timeNow = parseInt(new Date().getTime() / 1000);
        var d;
        d = timeNow - timestamp;
        d_days = parseInt(d / 86400);
        d_hours = parseInt(d / 3600);
        d_minutes = parseInt(d / 60);
        if(d < 1000){
            return '刚刚'
        }else if (d_days > 0 && d_days < 4) {
            return d_days + "天前";
        } else if (d_days <= 0 && d_hours > 0) {
            return d_hours + "小时前";
        } else if (d_hours <= 0 && d_minutes > 0) {
            return d_minutes + "分钟前";
        } else {
            var s = new Date(timestamp * 1000);
            return (s.getMonth() + 1) + "月" + s.getDate() + "日";
        }
    }
}
Vue.directive('time', {
    bind(el, binding) {
        el.innerHTML = Time.getFormatTime(binding.value);
        el.__timeout__ = setInterval(function () {
            el.innerHTML = Time.getFormatTime(binding.value);
        }, 60000)
    },
    unbind(el) {
        clearInterval(el.__timeout__);
        delete el.__timeout__;
    }
});
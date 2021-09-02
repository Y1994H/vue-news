

import Vue from 'vue';

const Time = {
    // 获取当前时间戳
    getUnix() {
        const date = Date.parse(new Date()) / 1000;
        return date;
    },
    // 获取今天0点0分0秒的时间戳
    getTodayUnix() {
        const date = new Date();
        date.setHours(0);
        date.setMinutes(0);
        date.setSeconds(0);
        date.setMilliseconds(0);
        return date.getTime();
    },
    // 获取今年1月1日0点0分0秒的时间戳
    getYearUnix() {
        const date = new Date();
        date.setMonth(0);
        date.setDate(1);
        date.setHours(0);
        date.setMinutes(0);
        date.setSeconds(0);
        date.setMilliseconds(0);
        return date.getTime();
    },
    // 获取标准年月日
    getLastDate(time) {
        const date = new Date(time);
        const year = date.getFullYear();
        const month = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1;
        const day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
        return year + '-' + month + '-' + day;
    },
    // 转换时间
    getFormatTime(timestamp) {
        const now = this.getUnix(); // 当前时间戳
        const today = this.getTodayUnix(); // 今天0点0分0秒时间戳
        const year = this.getYearUnix(); // 今年1月1日0点0分0秒的时间戳
        const timer = (now - timestamp) / 1000; // 获取传递进来的时间和当前时间的差值，并转换为秒级时间戳
        let tip;
        if (timer < 60 || Math.floor(timer / 60) <= 0) {
            tip = '刚刚'
        } else if (timer < 3600) {
            tip = Math.floor(timer / 60) + '分钟前';
        } else if (timer >= 3600 && (timestamp - today) >= 0) {
            tip = Math.floor(timer / 3600) + '小时前';
        } else if ((timer / 86400) <= 31) {
            tip = Math.floor(timer / 86400) + '天前';
        } else {
            tip = this.getLastDate(timestamp);
        }
        return tip;
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
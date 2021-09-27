<template>
    <ul class="Tap">
        <li v-for="(item, index) in tapdata" :key="index" @click="clickItem(''+item.route+'')" :class="{active: $route.path ===''+item.route+''}" >
            {{item.name}}
        </li>
    </ul>
</template>
<script>
    export default {
        name:'Tap',
        data() {
            return {
                tapdata:[
                    {
                        name:"新闻",
                        route:'/'
                    },
                    {
                        name:"购物",
                        route:'/List'
                    },
                    {
                        name:"电影",
                        route:'/Video'
                    },
                    {
                        name:"我的",
                        route:'/Personal'
                    }
                ]
            }
        },
        methods:{
            clickItem:function(path){
                this.$router.push(path);
            }
        }
    }
</script>
<style lang="">
    .Tap{
        width: 100%;
        height: 1rem;
        position: fixed;
        bottom: 0;
        display: flex;
        justify-content: space-around;
        align-items: center;
        background: #fff;
        box-shadow: 0px 7px 10px 5px #888888;
    }
    .Tap li{
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: .28rem;
    }
    .active{
        color: red;
    }
</style>
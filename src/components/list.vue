<template>
    <div>
        <header>
            购物中心
        </header>
        <ul class="list_ul">
            <li v-for="(item,index) in datanav" :key="index">
                <router-link :to="'/list_x/'+ item.title">
                    <img :src="item.image" alt="" srcset="">
                    <span>{{item.title}}</span>
                </router-link>
            </li>
        </ul>
        <ul class="wp_ul">
            <waterfall :data="datalist" :col='2'>
                <li v-for="(item,index) in datalist" :key="index">
                    <router-link to="">
                        <div class="li_on">
                                <img class="li_img1" :src="item.originItemImage" alt="">
                                <div class="li_img2">
                                    <img :src="item.actorAvatar" alt="">
                                    <p>{{item.actorName}}</p>
                                </div>
                                <img class="li_img3" :src="item.promotion_article.image" alt="">
                                <img class="li_img4" :src="item.lefttop_taglist[0].img" alt="" >
                        </div>
                        <div class="li_down">
                            <p>{{item.title}}</p>
                            <div class="li_money">
                                <div class="current-price">
                                    <span class="rmb-icon">¥</span>
                                    <span>{{item.showDiscountPrice.slice(0,3)}}</span>
                                    <span class="price-fen">00</span>
                                    <img :src="item.bottomIcon" alt="">
                                </div>
                                <div class="sale-wrapper">
                                    <div class="sale">
                                        {{item.sale}}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </router-link>
                </li>
            </waterfall>
        </ul>
    </div>
 
</template>
<script>
import data from '../static/data.json';
    export default {
        data() {
            return {
                //菜单
                datanav:data.data.nav.slice(0,10),
                //物品列表
                datalist:data.data.list,
            }
        },
        created(){
            let _this = this;
        },
        mounted(){},
        methods:{

        }
    }
</script>
<style scoped>
.vue-waterfall .vue-waterfall-column{
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
}
header{
    font-family: cursive;
    height: 44px;
    line-height: 44px;
    background: #e23f3f;
    text-align: center;
    position: relative;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: center;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    color: #fff;
    font-size: .38rem;
    font-weight: 600;
}
.list_ul{
    width: 100%;
    height: auto;
    overflow: hidden;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
}
.list_ul li{
    width: 20%;
    margin-top: .3rem;
}
.list_ul li a{
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
}
.list_ul li img{
    width: 1rem;
    height: 1rem;
}
.list_ul li span{
    display: block;
    width: 100%;
    height: .36rem;
    line-height: .36rem;
    color: rgb(102, 102, 102);
    font-size: 0.25rem;
    font-weight: 400;
    text-align: center;
    margin-top: .07rem;
}
.wp_ul{
    width: 100%;
    height: auto;
    overflow: hidden;
    background-color: #f6f6f6;
    padding-bottom: 1.5rem;
}
.wp_ul li{
    width: 95%;
    height: auto;
    overflow: hidden;
    border-radius: .1rem;
    margin-top: .2rem;
}
.wp_ul li a{
    display: block;
}
.wp_ul li .li_on{
    width: 100%;
    height: auto;
    position: relative;
}
.wp_ul li .li_down{
    width: 100%;
    padding: .18rem;
    background-color: #fff;
}
.wp_ul li .li_down p{
    min-height: .35rem;
    max-height: .7rem;
    line-height: .35rem;
    font-size: .26rem;
    color: #333;
    margin-bottom: .2rem;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
}
.wp_ul li .li_on .li_img1{
    width: 100%;
    height: auto;
}
.wp_ul li .li_on .li_img2{
    width: 100%;
    height: 1.2rem;
    overflow: hidden;
    position: absolute;
    bottom: .45rem;
    left: 0;
    display: flex;
    align-items: center;
}
.wp_ul li .li_on .li_img2 img{
    width: .38rem;
    height: .38rem;
    margin: .18rem 0 .18rem .18rem;
    overflow: hidden;
    border-radius: 50%;
    border: 1px solid #fff;
}
.wp_ul li .li_on .li_img2 p{
    max-width: 2.4rem;
    text-shadow: 0 0.01rem 0.02rem rgb(0 0 0 / 36%);
    font-size: .22rem;
    color: #fff;
    margin-left: .1rem;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
.wp_ul li .li_on .li_img3{
    position: absolute;
    width: 100%;
    bottom: 0;
    left: 0;
}
.wp_ul li .li_on .li_img4{
    position: absolute;
    height: 0.72rem;
    width: 0.88rem;
    left: 0.1rem;
    top: 0rem;
}
.current-price{
    font-size: .32rem;
    font-weight: 500;
    color: #f46;
    margin-right: .08rem;
    display: flex;
    align-items: center;
}
.rmb-icon {
    margin-right: .04rem;
    font-size: .24rem;
    font-weight: 400;
}
 .price-fen {
    font-size: .24rem;
}
.li_money{
    width: 100%;
    height: auto;
    display: flex;
    align-items: center;
    justify-content: space-between;
}
.li_money .current-price img{
    width: auto;
    height: .24rem;
    margin-left: .06rem;
}
.sale-wrapper {
    text-align: right;
}
.sale {
    display: inline-block;
    padding: .05rem .12rem;
    line-height: 1;
    background: #ffecef;
    border-radius: .28rem;
    font-size: .22rem;
    color: #f46;
}
</style>
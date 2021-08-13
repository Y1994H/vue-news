<template>
    <ul>
        <li class="news_li" v-for='item in onedata'>
            <router-link target="_blank" class="news_san" :to="'/article/'+item.id" v-if="item.all_img.length == 3" >
                <div class="news_right">
                <div class="news_tit">{{item.title}}</div>
                </div>
                <div class="news_img">
                <img :src="item.all_img[0]" alt="">
                <img :src="item.all_img[1]" alt="">
                <img :src="item.all_img[2]" alt="">
                </div>
            </router-link>
            <router-link target="_blank" class="news_dan" :to="'/article/'+item.id" v-if="item.all_img.length == 0">
                <div class="news_left">
                    <img :src="item.litpic[0]"  alt="">
                </div>
                <div class="news_right">
                    <div class="news_tit">{{item.title}}</div>
                    <div class="news_ly">{{item.source}}</div>
                </div>  
            </router-link>
        </li>
    </ul>
</template>

<script>
    export default {
        data () {
            return{
                page:1,//页码数
                size:20,//请求数量
                onedata:null,//第一次加载数据
            }
        },
        mounted(){
          this.getNav()
        },
        methods:{
          getNav(){
                this.$axios.get('https://mini.yyrtv.com/api/get_mini_top')
                  .then(response => {
                    //第一次加载数据https://mini.yyrtv.com/api/get_mobile_hot
                    this.onedata = response.data.data[0].data
                  })
                  .catch(error => {
                    console.log(error)
                    this.errored = true
                  })
              },
        }
    }
</script>


<style>
.newslist{
    width: 100%;
    height: auto;
    overflow: hidden;
    margin-top: .8rem;
  }
  .newslist ul{
    width: 100%;
    height: auto;
    overflow: hidden;
  }
  .newslist ul li{
    width: 7.1rem;
    height: auto;
    overflow: hidden;
    margin: 0 auto;
    padding-top: .2rem;
    padding-bottom: .2rem;
    border-bottom: 1px solid #ddd;
  }
  .newslist ul .news_left{
    float: left;
    width: 2.34rem;
    height: 1.56rem;
  }
  .newslist ul .news_left img{
    width: 2.34rem;
    height: 1.56rem;
  }
  .newslist ul .news_right{
    float: right;
    width: 4.48rem;
    height: 1.56rem;
  }
  .news_right .news_tit{
      font-size: .32rem;
      display: -webkit-box;
      overflow: hidden;
      width: 100%;
      text-overflow: ellipsis;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
  }
  .news_ly{
    text-align: right;
    font-size: 0.28rem;
    color: #949494;
    margin-top: .2rem;
  }
  .news_img img{
    width: 2.34rem;
    height: 1.56rem;
  }
  .news_san,.news_dan{
    display: block;
    width: 100%;
    height: auto;
    overflow: hidden;
  }
  .news_san .news_right{
    width: 100% !important;
    height: auto !important;
  }
  .news_san .news_img{
    width: 100% !important;
    height: auto;
    float: left;
    display: flex;
    justify-content: space-between;
    margin-top: .15rem;
  }
  .link_a{
    display: block;
  }
</style>
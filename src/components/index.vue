<template>
  <div class="app">
    <nav>
      <header>
        <a href="http://">快资讯</a>
      </header>
      <!-- <ul ref="nav" class="nav-list">
        <li
          ref="navli"
          class="nav_a"
          v-for="(item, i) in NewsList"
          :data-id="item.list_dir.replace('/', '').replace('/', '')"
          :class="active === item.id ? 'active' : 'active_a'"
          :key="i"
          @click="btn(item.list_dir), (active = item.id)"
        >
          {{ item.name }}
          <span></span>
        </li>
      </ul> -->
      <ly-tab 
        v-model="selectedId" 
        :options="options" 
        :items="NewsList"
        @change="handleChange"
         >
      </ly-tab>
    </nav>
    <div class="newslist">
      <mescroll-vue ref="mescroll" :down="mescrollDown" :up="mescrollUp" @init="mescrollInit">
        <div
          class="hot"
          v-for="(item, index) in hotdata"
          :key="item.id + index"
          v-show="visible"
        >
          <router-link :to="'/article/' + item.id + '?from='+from">
            <span>头条</span>
            {{ item.title }}
          </router-link>
        </div>
        <ul>
          <li
            class="news_li"
            v-for="(item, index) in onedata"
            :key="(index+index_a)"
          >
            <template v-if="item.id > 0">
              <router-link
                class="news_san"
                :to="'/article/' + item.id + '?from='+from" 
                v-if="item.all_img.length == 3"
              >
                <div class="news_right">
                  <div class="news_tit">{{ item.title }}</div>
                </div>
                <div class="news_img">
                  <img v-lazy="item.all_img[0] + ximg" alt="" />
                  <img v-lazy="item.all_img[1] + ximg" alt="" />
                  <img v-lazy="item.all_img[2] + ximg" alt="" />
                </div>
                <div class="news_sy">
                  <span class="ex_tes">{{ item.source }}</span>
                  <span class="ex_tes ex_t">{{ rand }}万阅读</span>
                </div>
              </router-link>
              <router-link
                class="news_dan"
                :to="'/article/' + item.id + '?from='+from" 
                v-if="item.all_img.length == 0"
              >
                <div class="news_left">
                  <img v-lazy="item.litpic[0] + ximg" alt="" />
                </div>
                <div class="news_right">
                  <div class="news_tit">{{ item.title }}</div>
                  <div class="news_ly">
                    <span class="ex_tes">{{ item.source }}</span>
                    <span class="ex_tes ex_t">{{ rand }}万阅读</span>
                  </div>
                </div>
              </router-link>
            </template>
            <template v-else>
              <div :id="item.baidu_id" class="baidu">
                <!-- <remote-js :src="item.url"></remote-js> -->
              </div>
            </template>
          </li>
          <!-- 下拉信息流 -->
          <li class="news_li" v-for="(item, index) in dataList" :key="item.id + (index + index_a)">
            <template v-if="item.id > 0">
              <router-link
                class="news_san"
                :to="'/article/' + item.id + '?from='+from" 
                v-if="item.all_img.length == 3"
              >
                <div class="news_right">
                  <div class="news_tit">{{ item.title }}</div>
                </div>
                <div class="news_img">
                  <img v-lazy="item.all_img[0] + ximg" alt="" />
                  <img v-lazy="item.all_img[1] + ximg" alt="" />
                  <img v-lazy="item.all_img[2] + ximg" alt="" />
                </div>
                <div class="news_sy">
                  <span class="ex_tes">{{ item.source }}</span>
                  <span class="ex_tes ex_t">{{ rand }}万阅读</span>
                </div>
              </router-link>
              <router-link
                class="news_dan"
                :to="'/article/' + item.id + '?from='+from" 
                v-if="item.all_img.length == 0"
              >
                <div class="news_left">
                  <img v-lazy="item.litpic[0] + ximg" alt="" />
                </div>
                <div class="news_right">
                  <div class="news_tit">{{ item.title }}</div>
                  <div class="news_ly">
                    <span class="ex_tes">{{ item.source }}</span>
                    <span class="ex_tes ex_t">{{ rand }}万阅读</span>
                  </div>
                </div>
              </router-link>
            </template>
            <template v-else>
              <div :id="item.baidu_id" class="baidu">
                <!-- <remote-js :src="item.url"></remote-js> -->
              </div>
            </template>
          </li>
        </ul>
      </mescroll-vue>
    </div>
    <div class="refresh-fixed" @click="Refresh"></div>
    <div class="noti_hide">为您推荐20条更新</div>
  </div>
</template>

<script>
import MescrollVue from 'mescroll.js/mescroll.vue'
import logoSrc from "@/image/ss.svg";
import { indexJs,baiduJs } from "@/js/index.js";

export default {
  
  MescrollVue, // 注册mescroll组件
  components: {
    "remote-js": {
      render(createElement) {
        return createElement("script", {
          attrs: { type: "text/javascript", src: this.src },
        });
      },
      props: {
        src: { type: String, required: true },
      },
    },
  },
  data() {
    return {
      selectedId: 0,
      options: {
        activeColor: '#f85959',
        labelKey: 'name' // 在sortList数组中选择想要渲染的key名
      },
      navurl:'//mini.yyrtv.com/api/get_mobile_menu',//导航接口
      hoturl:'//mini.yyrtv.com/api/get_mobile_hot',//热点接口
      newsurl:'//mini.yyrtv.com/mapi/new_ajaxlist?cid=',//信息流接口
      //百度id
      baidu_id:null,
      baidu_box:[],
      //百度信息流
      baidu: [
        '7644731', //6t1
        '7644733', //6t2
        '7644808', //dt2 n
        '7644809', //6t3
        
        '7644731', //6t1
        '7644733', //6t2
        '7644808', //dt2 n
        '7644809', //6t3
        
        '7644731', //6t1
        '7644733', //6t2
        '7644808', //dt2 n
        '7644809', //6t3
      ],
      index_a:0,
      ximg: "?x-oss-process=style/mxiaotu2",
      imgUrl: logoSrc,
      first_cid: null, //id
      page: 1, //页码数
      size: 20, //请求数量
      active: this.$route.query.active || 'tuijian',
      visible: true,
      notihide:false,
      rand: null,
      from:null,//渠道
      NewsList: [], //导航数据
      errored: false,
      onedata: [], //第一次加载数据
      hotdata: null, //热点数据
      hotpage: 1,
      mescroll: null, // mescroll实例对象
      mescrollDown:{
        callback: this.downCallback,
        auto: false,
        use: true,
        isLock: false,
        offset: 80,
        empty: {
            tip: "暂无相关数据~"
        }
      },
      mescrollUp: {
        use: true,
        auto: false, // 上拉加载的配置.
        callback: this.upCallback, // 上拉回调,此处简写; 相当于 callback: function(page, mescroll) { }//以下是一些常用的配置,当然不写也可以的.
        // page: {
        //   num: this.page, //当前页 默认0,回调之前会加1; 即callback(page)会从1开始
        //   size: this.size, //每页数据条数,默认10
        // },
        // toTop: {
        //   //回到顶部按钮
        //   src: logoSrc, //图片路径,默认null,支持网络图
        //   offset: 1000, //列表滚动1000px才显示回到顶部按钮
        // },
      },
      dataList: [], // 列表数据
    };
  },
  watch: {
    active (newValue) {
      let query = this.$router.history.current.query;
      let path = this.$router.history.current.path;
      //对象的拷贝
      let newQuery = JSON.parse(JSON.stringify(query));
      // 地址栏的参数值赋值
      newQuery.active = newValue;
      this.$router.push({ path, query: newQuery });
    }
  },
  created() {
    //导航
    let _this = this;
     _this.getNav();
     _this.hot(); 
     indexJs();
    _this.from = _this.getQueryString('from');
  },
  mounted() {
    let _this = this;
    _this.randfun(10000, 99999);
  },
  methods: {
    //阅读量
    randfun(min, max) {
      let _this = this;
      _this.rand = (
        parseInt(Math.random() * (max - min + 1) + min, 10) / 10000
      ).toFixed(1);
    },
    //导航
    getNav() {
      let _this = this;
      _this.$axios
        .get(_this.navurl)
        .then((response) => {
          //导航数据
          _this.NewsList = response.data.data; 
            let id1 = _this.NewsList.findIndex(item => {
              if(item.name == '社会'){
                return true;
              }
            })
            _this.NewsList.splice(id1, 1)
            let id2 = _this.NewsList.findIndex(item => {
                if(item.name == '国际'){
                  return true;
                }
            })
            _this.NewsList.splice(id2, 1)
            let id3 = _this.NewsList.findIndex(item => {
              if(item.name == '历史'){
                return true;
              }
            })
            _this.NewsList.splice(id3, 1)
          _this.NewsList.forEach((i,k)=>{
             //判断数据里面的值是否与URL中的active值一样
            if(i.list_dir.replace("/", "").replace("/", "") == _this.active) {
                //导航高亮
                _this.selectedId = k;
                _this.first_cid = i.list_dir.replace("/", "").replace("/", "");
                if(_this.first_cid === 'tuijian'){
                    _this.Newsdata(_this.first_cid);
                    _this.hot();
                }
                indexJs(this.first_cid)
            }
        })
  
        })
        .catch((error) => {
          console.log(error);
          _this.errored = true;
        });
    },
    
    //热点
    hot() {
      let _this = this;
      _this.$axios
        .get(_this.hoturl, {
          params: {
            page: _this.hotpage,
            size: 1,
          },
        })
        .then((response) => {
          _this.hotdata = response.data.data;
        })
        .catch((error) => {
          console.log(error);
          _this.errored = true;
        });
    },
    //首次新闻列表加载
    Newsdata(nav_cid) {
      console.log(nav_cid);
        let _this = this;
        let url = _this.newsurl + nav_cid;
        _this.onedata = [];
        console.log(_this.active );
        if(nav_cid == 'tuijian'){
          _this.visible = true;
        }else{
          _this.visible = false;
        }; 
        
      _this.$axios
        .get(url, {
          params: {
            page: _this.page,
            size: _this.size,
          },
        })
        .then((response) => {
          let res = response.data.data;
          let advert = _this.getRandomArrayElements(_this.baidu, res.length / 2);
          advert.forEach((a, b) => {
            _this.baidu_id = _this.guid();
            _this.baidu_box.push(_this.baidu_id)
            res.splice((b + 1) * 2 + b, 0, {
              id: 0,
              url: a,
              baidu_id:_this.baidu_id
            });
          });
          //传值百度广告id和百度盒子id
          // baiduJs(_this.baidu,_this.baidu_box)
          _this.onedata = res;
        
        })
        .catch((error) => {
          console.log(error);
          _this.errored = true;
        });

    },
    //点击导航
    handleChange(item,index){
      let _this = this;
      let cid = item.list_dir.replace("/", "").replace("/", "");;
      let url = _this.newsurl + cid;
      _this.page = 1;
      _this.active = cid;
      _this.index_a = cid;
      //文章id
      if (cid === "tuijian") {
        _this.visible = true;
      } else {
        _this.visible = false;
      }
      _this.first_cid = cid;
      //首屏
      _this.onedata = [];
      //下拉信息流
      _this.dataList = [];
      _this.$axios
        .get(url, {
          params: {
            page: _this.page,
            size: _this.size,
          },
        })
        .then((response) => {
          let res = response.data.data;
          let advert = _this.getRandomArrayElements(_this.baidu, res.length / 2);
          advert.forEach((a, b) => {
            _this.baidu_id = _this.guid();
            res.splice((b + 1) * 2 + b, 0, {
              id: 0,
              url: a,
              baidu_id:_this.baidu_id
            });
          });
          // baiduJs(_this.baidu,_this.baidu_box)
          _this.onedata = res;
        })
        .catch((error) => {
          console.log(error);
          _this.errored = true;
        });
              
    },
    //点击刷新
    Refresh(){
      let _this = this;
      $('.mescroll').animate({
          scrollTop: 0
      }, 0);
      _this.mescroll.showDownScroll();
      setTimeout(function(){
        _this.mescroll.triggerDownScroll();
      },500)
    },
    mescrollInit(mescroll) {
      this.mescroll = mescroll; // 如果this.mescroll对象没有使用到,则mescrollInit可以不用配置
    },
    downCallback(mescroll) {
      let _this = this;
      mescroll.resetUpScroll(); 
      //  //首屏
      _this.onedata = [];
      // //下拉信息流
      _this.dataList = [];
      setTimeout(()=>{
        // 隐藏下拉加载状态
        mescroll.endErr();
        // _this.notihide = true;
        $('.noti_hide').css({
          'top':'1.6rem',
        });
        setTimeout(()=>{
          $('.noti_hide').css({
            'top':'0',
          });
        },1000)
      },1000)
     
    },
    //下拉加载
    upCallback(page, mescroll) {
      let _this = this;
      let url =  _this.newsurl+ _this.first_cid;
      _this.page++
      if(_this.first_cid == null) {
          _this.index_a = 'rem'
        }else{
          _this.index_a = _this.first_cid;
        }
      if (_this.first_cid == "tuijian") {
        _this.visible = true;
      } else {
        _this.visible = false;
      }
      // 联网请求
      _this.$axios
        .get(url, {
          params: {
            page: _this.page,
            size: _this.size,
          },
        })
        .then((response) => {
          // 请求的列表数据
          let arr = response.data.data;
          let advert = _this.getRandomArrayElements(
            _this.baidu,
            arr.length / 2
          );
          advert.forEach((a, b) => {
            arr.splice((b + 1) * 2 + b, 0, {
              id: 0,
              url: a,
            });
          });
          // 如果是第一页需手动置空列表
          if (page.num == 1) _this.dataList = [];
          _this.dataList = _this.dataList.concat(arr);
          // 数据渲染成功后,隐藏下拉刷新的状态
          _this.$nextTick(() => {
            mescroll.endSuccess(arr.length);
          });
        })
        .catch((e) => {
          // 联网失败的回调,隐藏下拉刷新和上拉加载的状态;
          mescroll.endErr();
        });
    },

    // 获取地址栏参数
    getQueryString(name) {
      var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
      var reg_rewrite = new RegExp("(^|/)" + name + "/([^/]*)(/|$)", "i");
      var r = window.location.search.substr(1).match(reg);
      var q = window.location.pathname.substr(1).match(reg_rewrite);
      if(r != null){
        return unescape(r[2]);
      }else if(q != null){
        return unescape(q[2]);
      }else{
        return null;
      }
    },
     //随机取出几个数组
    getRandomArrayElements(arr, count) {
      let shuffled = arr.slice(0),
        i = arr.length,
        min = i - count,
        temp,
        index;
      while (i-- > min) {
        index = Math.floor((i + 1) * Math.random());
        temp = shuffled[index];
        shuffled[index] = shuffled[i];
        shuffled[i] = temp;
      }
      return shuffled.slice(min);
    },
    //生成唯一ID
    guid() {
        return Number(Math.random().toString().substr(3, 3) + Date.now()).toString(36);
    }
  },
};
</script>

<style scoped>
.mescroll {
  position: fixed;
  top: 80px;
  bottom: 0;
  height: auto;
}
.app {
  width: 100%;
  height: 100%;
}

nav {
  position: fixed;
  top: 0;
  z-index: 5;
  width: 100%;
   height: 36px;
  background: #f4f5f6;
}
header {
  height: 44px;
  line-height: 44px;
  background: #e23f3f;
  text-align: center;
  position: relative;
}
header a {
    display: inline-block;
    background: url(https://p4.ssl.img.360kuai.com/t01ccd7f57276ef0a47.png) center no-repeat;
    text-indent: -9999px;
    background-size: 83px;
    width: 83px;
}
nav ul {
  width: 100%;
  height: 36px;
  overflow-x: scroll;
  display: -webkit-box;
  justify-content: space-around;
  align-items: center;
}
nav ul li {
  color: #505050;
  font-size: 0.32rem;
  padding: 0 0.2rem;
}
.active {
  font-weight: bold;
  color: #f85959;
}
.active span {
  display: block;
  background-color: #f85959;
  width: 0.3rem;
  height: 1px;
  margin: 0 auto;
  margin-top: 0.05rem;
}
.active_a {
  color: #505050;
}
.newslist {
  width: 100%;
  height: auto;
  overflow: hidden;
  margin-top: 0.8rem;
}
.hot {
  width: 95%;
  height: auto;
  overflow: hidden;
  margin: 5px auto;
}
.hot span {
  font-size: 0.32rem;
  color: #fff;
  vertical-align: middle;
  text-align: center;
  display: inline-block;
  background-color: #f85959;
  padding: 5px 5px;
  border-radius: 5px;
  margin-bottom: 5px;
  margin-right: 7px;
}
.hot a {
  color: #f85959;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  position: relative;
  word-wrap: break-word;
  margin-top: 0.1rem;
  line-height: 0.5rem;
  font-weight: 400;
  font-size: 0.4rem;
}
.newslist ul {
  width: 100%;
  height: auto;
  overflow: hidden;
}
.newslist ul li a {
  width: 7.1rem;
  height: auto;
  overflow: hidden;
  margin: 0 auto;
  padding-top: 0.2rem;
  padding-bottom: 0.2rem;
  border-bottom: 1px solid #ddd;
}
/* .baidu {
  width: 7.1rem;
  height: auto;
  overflow: hidden;
  margin: 0 auto;
  padding-top: 0.2rem;
  padding-bottom: 0.2rem;
  border-bottom: 1px solid #ddd;
} */
.newslist ul .news_left {
  float: left;
  width: 2.34rem;
  height: 1.56rem;
}
.newslist ul .news_left img {
  width: 2.34rem;
  height: 1.56rem;
}
.newslist ul .news_right {
  float: right;
  width: 4.48rem;
  height: 1.56rem;
}
.news_right .news_tit {
  font-size: 0.32rem;
  display: -webkit-box;
  overflow: hidden;
  width: 100%;
  text-overflow: ellipsis;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}
.news_ly {
  text-align: right;
  font-size: 0.28rem;
  color: #949494;
  margin-top: 0.2rem;
  display: flex;
  justify-content: space-between;
}
.news_sy {
  float: left;
  width: 100%;
  font-size: 0.28rem;
  color: #949494;
  margin-top: 0.2rem;
  display: flex;
  justify-content: space-between;
}
.news_img img {
  width: 2.34rem;
  height: 1.56rem;
}
.news_san,
.news_dan {
  display: block;
  width: 100%;
  height: auto;
  overflow: hidden;
}
.news_san .news_right {
  width: 100% !important;
  height: auto !important;
}
.news_san .news_img {
  width: 100% !important;
  height: auto;
  float: left;
  display: flex;
  justify-content: space-between;
  margin-top: 0.15rem;
}
.link_a {
  display: block;
}
.mescroll-totop {
  box-shadow: 0 0 6px #8e8e8e;
  background-color: hsla(0, 0%, 100%, 0.9);
}
.refresh-fixed {
    position: fixed;
    bottom: 20px;
    right: 15px;
    width: 55px;
    height: 55px;
    background: url(../image/shuaxin.png) no-repeat;
    background-size: cover;
}
.noti_hide{
    background: #d6e9f7;
    color: #2a90d7;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: .6rem;
    line-height: 4.8px;
    line-height: .6rem;
    text-align: center;
    font-size: 1.92px;
    font-size: .12rem;
    -webkit-animation: top .3s;
    animation: top .3s;
}
.ly-tab{
  position: relative;
  background-color: #f5f5f5;
}
.ly-tab:before {
    content: ' ';
    position: absolute;
    right: 0;
    top: 0;
    bottom: 0;
    background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABsCAQAAAA/U3/IAAAAjUlEQVR42u3ROw6AIABEQUDwc/+z2muIGiil08zbCFpODEGSJEnSYHHPoZybw1K31m3nd3mWmzs3m+pzLzV3ut5Sd/aL3Rm780Xp638AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAODPAEmSJEnDHdhJApBByRhCAAAAAElFTkSuQmCC);
    background-size: 100%;
    width: 30px;
    z-index: 1;
}
</style>

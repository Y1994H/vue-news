<template>
  <!-- <mescroll-vue ref="mescroll" :down="getMescrollDown()" :up="mescrollUp">  -->
  <div>
    <header>
      <a href="http://">快资讯</a>
    </header>
    <div class="content">
      <!-- <div class="nav">
        <router-link :to="{ path: '/?from='+from }">首页</router-link>
        <i></i>
        <router-link :to="{ path: '/?from='+from, query: { active: nav_id } }">{{
          nav_tit
        }}</router-link>
      </div> -->
      <h1 class="title">{{ article_txt.title }}</h1>
      <div class="time">
        {{ article_txt.update_time | moment("YYYY-MM-DD HH:mm:ss") }}
      </div>
      <div class="laiyuan">{{ article_txt.from }}</div>
      <div class="jia">
        <a @click="jia()">A+</a>
        <a @click="jian()">A-</a>
      </div>
      <div class="article_content">
        <div
          class="content_html"
          v-html="article_content"
          :style="{ fontSize: postFontSize / 100 + 'rem' }"
        ></div>
      </div>
      <!-- <div class="tuijai">
        <div class="wn_tj">为你推荐</div>
        <div class="hong"></div>
        <div class="hui"></div>
      </div> -->
      <div class="rel_news">
        <div class="block-title">
            <h2>— 精彩推荐 —</h2>
            <p>以下内容由益资讯提供</p>
        </div>
      </div>
      <div class="newslist">
        <ul>
          <li
            class="news_li"
            v-for="(item, index) in onedata"
            :key="item.id + index + index_a"
          >
            <router-link
              class="news_san"
              :to="'/article/' + item.id + '?from=' + from"
              v-if="item.all_img.length == 3"
              @click.native="fluchCom"
            >
              <div class="news_right">
                <div class="news_tit">{{ item.title }}</div>
              </div>
              <div class="news_img">
                <img :src="item.all_img[0]" alt="" />
                <img :src="item.all_img[1]" alt="" />
                <img :src="item.all_img[2]" alt="" />
              </div>
              <div class="news_sy">
                  <span class="ex_tes">{{
                    item.source
                  }}</span>
                  <!-- <span class="ex_tes ex_t">{{ rand }}万阅读</span> -->
              </div>
            </router-link>
            <router-link
              class="news_dan"
              :to="'/article/' + item.id + '?from=' + from"
              v-if="item.all_img.length == 0"
              @click.native="fluchCom"
            >
              <div class="news_left">
                <img :src="item.litpic[0]" alt="" />
              </div>
              <div class="news_right">
                <div class="news_tit">{{ item.title }}</div>
                <div class="news_ly">{{ item.source }}</div>
              </div>
            </router-link>
          </li>
          <!-- 下拉信息流 -->
          <li v-for="(item, index) in dataList" :key="index + index_a" @click.native="fluchCom">
            <router-link
              class="news_san"
              :to="'/article/' + item.id + '?from=' + from"
              v-if="item.all_img.length == 3"
            >
              <div class="news_right">
                <div class="news_tit">{{ item.title }}</div>
              </div>
              <div class="news_img">
                <img :src="item.all_img[0]" alt="" />
                <img :src="item.all_img[1]" alt="" />
                <img :src="item.all_img[2]" alt="" />
              </div>
              <div class="news_sy">
                  <span class="ex_tes">{{
                    item.source
                  }}</span>
                  <!-- <span class="ex_tes ex_t">{{ rand }}万阅读</span> -->
              </div>
            </router-link>
            <router-link
              class="news_dan"
              :to="'/article/' + item.id + '?from=' + from"
              v-if="item.all_img.length == 0"
              @click.native="fluchCom"
            >
              <div class="news_left">
                <img :src="item.litpic[0]" alt="" />
              </div>
              <div class="news_right">
                <div class="news_tit">{{ item.title }}</div>
                <div class="news_ly">{{ item.source }}</div>
              </div>
            </router-link>
          </li> 
        </ul>
      </div>
    </div>
    <div class="kong"></div>
  </div>
<!-- </mescroll-vue>  -->
</template>
<script>
import logoSrc from "@/image/ss.svg";
export default {
  data() {
    return {
      nav_id: null,
      index_a: 0,
      nav_tit: null,
      from: null, //渠道号
      postFontSize: 34, //字体大小
      id: this.$route.params.id, //文章id
      article_txt: "",
      article_content: null, //文章内容
      onedata: [], //第一次加载数据
      mescroll: null, // mescroll实例对象
      // mescrollUp: {
      //   use: false,
      //   auto: false, // 上拉加载的配置.
      //   callback: this.upCallback, // 上拉回调,此处简写; 相当于 callback: function(page, mescroll) { }//以下是一些常用的配置,当然不写也可以的.
      //   page: {
      //     num: 1, //当前页 默认0,回调之前会加1; 即callback(page)会从1开始
      //     size: 20, //每页数据条数,默认10
      //   },
      //   // toTop: {
      //   //   //回到顶部按钮
      //   //   src: logoSrc, //图片路径,默认null,支持网络图
      //   //   offset: 1000, //列表滚动1000px才显示回到顶部按钮
      //   // },
      // },
      dataList: [], // 列表数据
    };
  },
  created() {
    let _this = this;
    //渠道号
    _this.from = _this.getQueryVariable("from");
    //请求文章数据
    _this.$axios
      .get("//mini.yyrtv.com/mapi/get_artical_info?article_id=" + _this.id)
      .then((response) => {
        // console.log(response.data.data.content[0]);
        (_this.article_txt = response.data.data),
         document.title = _this.article_txt.title;
          //文章内容
          (_this.article_content = response.data.data.content[0]),
          //导航
          (_this.nav_tit = response.data.data.cate_name);
          // _this.nav_id = response.data.data.cate_id;
      })
      .catch((error) => {
        _this.errored = true;
      });
    _this.$axios
      .get("//mini.yyrtv.com/api/get_mini_top")
      .then((response) => {
        //第一次加载数据
        _this.onedata = response.data.data[0].data;
      })
      .catch((error) => {
        _this.errored = true;
      });
  },
  mounted() {},
  methods: {
    jia() {
      let _this = this;
      _this.postFontSize++;
    },
    jian() {
      let _this = this;
      _this.postFontSize--;
    },
    fluchCom() {
      let _this = this;
      _this.$router.go(0);
    },
    mescrollInit(mescroll) {
      let _this = this;
      _this.mescroll = mescroll; // 如果this.mescroll对象没有使用到,则mescrollInit可以不用配置
    },
    //禁止getMescrollDown事件
    getMescrollDown() {
      return {
        use: false,
        auto: false,
        callback: this.downCallback,
      };
    },
    downCallback() {},
  
    //上拉加载
    // upCallback(page, mescroll) {
    //   let _this = this;
    //   (_this.index_a = _this.id),
    //     // 联网请求
    //     _this.$axios
    //       .get("https://mini.yyrtv.com/api/get_mobile_hot", {
    //         params: {
    //           page: page.num,
    //           size: page.size,
    //         },
    //       })
    //       .then((response) => {
    //         // 请求的列表数据
    //         let arr = response.data.data;
    //         // 如果是第一页需手动置空列表
    //         if (page.num == 1) _this.dataList = [];
    //         _this.dataList = _this.dataList.concat(arr);
    //         // 数据渲染成功后,隐藏下拉刷新的状态
    //         _this.$nextTick(() => {
    //           mescroll.endSuccess(arr.length);
    //         });
    //       })
    //       .catch((e) => {
    //         // 联网失败的回调,隐藏下拉刷新和上拉加载的状态;
    //         mescroll.endErr();
    //       });
    // },
    // 获取地址栏参数
    getQueryVariable(variable) {
      var query = window.location.search.substring(1);
      var vars = query.split("&");
      for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split("=");
        if (pair[0] == variable) {
          return pair[1];
        }
      }
      return null;
    },
  },
};
</script>
<style scoped>
.content {
  width: 7.1rem;
  height: 100%;
  overflow: hidden;
  margin: 0 auto;
  padding-bottom: .3rem;
}
.mescroll {
  position: fixed;
  top: 0;
  bottom: 0;
  height: auto;
}
.title {
  margin-top: 0.2rem;
  margin-bottom: 0.2rem;
  color: #3a3a3a;
  font-weight: 700;
  font-size: 0.44rem;
  line-height: 0.56rem;
}

.time,
.laiyuan {
  float: left;
  color: #999;
  font-size: 0.12rem;
  margin-left: 0.1rem;
}

.jia {
  float: right;
}

.jia a {
  display: inline-block;
  vertical-align: middle;
  background-size: 0.29rem auto;
  background-position: center;
  background-repeat: no-repeat;
  width: auto;
  height: 0.5rem;
  margin: 0 0.5px;
  font-size: 0.32rem;
  color: #999;
}

.article_content {
  clear: both;
  width: 100%;
  height: auto;
  overflow: hidden;
}
.article_content img {
  margin: 0.15rem 0;
  width: 100% !important;
}
.content_html {
  width: 100%;
  height: auto;
  overflow: hidden;
  font-size: 0.34rem;
  line-height: 0.6rem;
  word-wrap: break-word;
  margin: 0;
  letter-spacing: 0.5px;
  text-align: justify;
}
.content_html img{
  margin: .1rem auto;
}
.tuijai {
  width: 100%;
  height: auto;
  margin-top: 0.25rem;
}
.wn_tj {
  color: #505050;
  font-size: 0.32rem;
}

.hong {
  width: 1.3rem;
  height: 1px;
  background-color: #f75151;
  margin-top: 0.1rem;
  float: left;
}

.hui {
  background-color: #e5e5e5;
  width: 5.8rem;
  height: 1px;
  margin-top: 0.1rem;
  float: left;
}

.link_a {
  display: block;
}

.mescroll-totop {
  box-shadow: 0 0 6px #8e8e8e;
  background-color: hsla(0, 0%, 100%, 0.9);
}
.nav {
  width: 100%;
  height: auto;
  overflow: hidden;
  display: flex;
  align-items: center;
  padding: 0.2rem 0 0.2rem 0;
}
.nav a {
  font-size: 0.28rem;
  color: #8e8e8e;
}
.nav i {
  border: solid #99a2aa;
  border-width: 0 1px 1px 0;
  display: inline-block;
  padding: 3px;
  transform: rotate(-45deg);
  -webkit-transform: rotate(-45deg);
  margin: 6px 6px;
}
.mescroll-upwarp{
  display: none !important;
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
    background: url(../image/img_preview.png) center no-repeat;
    text-indent: -9999px;
    background-size: 83px;
    width: 83px;
}
.rel_news {
    width: 100%;
    height: auto;
    overflow: hidden;
}

.block-title {
    text-align: center;
}

.block-title h2 {
    color: #888;
    font-size: 2.24px;
    font-size: .14rem;
    line-height: 2.88px;
    line-height: .18rem;
    border-bottom: none;
    margin-top: 26px;
    margin-bottom: 9px;
    font-weight: 400;
}

.block-title p {
    width: 100%;
    height: auto;
    font-size: 12px;
    text-align: center;
    color: #bbb;
}
.kong{
  width: 100%;
  height: 1.5rem;
}
</style>

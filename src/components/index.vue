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
          v-for="(item, i) in newsList"
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
        :items="newsList"
        @change="handleChange"
      >
      </ly-tab>
    </nav>
    <div class="newslist">
      <mescroll-vue
        ref="mescroll"
        :down="mescrollDown"
        :up="mescrollUp"
        @init="mescrollInit"
      >
        <div class="noti_hide"></div>
        <div
          class="hot"
          v-for="(item, index) in hotdata"
          :key="item.id + index"
          v-show="visible"
        >
          <router-link :to="'/article/' + item.id + '?from=' + from">
            <h3>
              <span class="item-status" :style="scaleFun">置顶</span>
              {{ item.title }}
            </h3>
          </router-link>
        </div>
        <ul>
          <li
            class="news_li"
            v-for="(item, index) in onedata"
            :key="index + index_a"
          >
            <template v-if="item.id > 0">
              <router-link
                class="news_san"
                :to="'/article/' + item.id + '?from=' + from"
                v-if="item.all_img.length == 3"
              >
                <div class="news_right">
                  <h3 class="news_tit">{{ item.title }}</h3>
                </div>
                <div class="news_img">
                  <img v-lazy="item.all_img[0] + ximg" alt="" />
                  <img v-lazy="item.all_img[1] + ximg" alt="" />
                  <img v-lazy="item.all_img[2] + ximg" alt="" />
                </div>
                <div class="news_sy">
                  <span class="ex_tes" v-time="item.timestamp">{{
                    item.source
                  }}</span>
                  <!-- <span class="ex_tes ex_t">{{ rand }}万阅读</span> -->
                </div>
              </router-link>
              <router-link
                class="news_dan"
                :to="'/article/' + item.id + '?from=' + from"
                v-if="item.all_img.length == 0"
              >
                <div class="news_left">
                  <img v-lazy="item.litpic[0] + ximg" alt="" />
                </div>
                <div class="news_right">
                  <h3 class="news_tit">{{ item.title }}</h3>
                  <div class="news_ly">
                    <span class="ex_tes" v-time="item.timestamp">{{
                      item.source
                    }}</span>
                    <!-- <span class="ex_tes ex_t">{{ rand }}万阅读</span> -->
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
          <li
            class="news_li"
            v-for="(item, index) in dataList"
            :key="item.id + (index + index_a)"
          >
            <template v-if="item.id > 0">
              <router-link
                class="news_san"
                :to="'/article/' + item.id + '?from=' + from"
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
                  <span class="ex_tes" v-time="item.timestamp">{{
                    item.source
                  }}</span>
                  <!-- <span class="ex_tes ex_t">{{ rand }}万阅读</span> -->
                </div>
              </router-link>
              <router-link
                class="news_dan"
                :to="'/article/' + item.id + '?from=' + from"
                v-if="item.all_img.length == 0"
              >
                <div class="news_left">
                  <img v-lazy="item.litpic[0] + ximg" alt="" />
                </div>
                <div class="news_right">
                  <div class="news_tit">{{ item.title }}</div>
                  <div class="news_ly">
                    <span class="ex_tes" v-time="item.timestamp">{{
                      item.source
                    }}</span>
                    <!-- <span class="ex_tes ex_t">{{ rand }}万阅读</span> -->
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
  </div>
</template>

<script>
import { baiduJs } from "@/js/index.js";
import "@/js/time.js";
export default {
  components: {
    //动态插入js
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
      scale: 0.833,
      selectedId: 0,
      options: {
        activeColor: "#f85959",
        labelKey: "name", // 在sortList数组中选择想要渲染的key名
      },
      navurl: "//mini.yyrtv.com/api/get_mobile_menu", //导航接口
      hoturl: "//mini.yyrtv.com/api/get_mobile_hot", //热点接口
      newsurl: "//mini.yyrtv.com/mapi/new_ajaxlist?cid=", //信息流接口
      //百度id
      baidu_id: null,
      baidu_box: [],
      //百度信息流广告
      baidu: [
        "7644731", //6t1
        "7644733", //6t2
        "7644808", //dt2 n
        "7644809", //6t3

        "7644731", //6t1
        "7644733", //6t2
        "7644808", //dt2 n
        "7644809", //6t3

        "7644731", //6t1
        "7644733", //6t2
        "7644808", //dt2 n
        "7644809", //6t3
      ],
      index_a: 0,
      ximg: "?x-oss-process=style/mxiaotu2", //图片后缀
      // first_cid: null, //id
      page: 1, //页码数
      size: 20, //请求数量
      active: this.$route.query.active || "tuijian",
      visible: true,
      rand: null,
      from: null, //渠道
      newsList: [
        {
            name: '首页',
            list_dir: 'tuijian'
        },
        {
            name: '图片',
            list_dir: 'photo'
        },
        {
            name: '娱乐',
            list_dir: 'bagua'
        },
        {
            name: '军事',
            list_dir: 'mil'
        },
        {
            name: '财经',
            list_dir: 'cj'
        },
        {
            name: '科技',
            list_dir: 'keji'
        },
        {
            name: '房产',
            list_dir: 'fangchan'
        },
        {
            name: '汽车',
            list_dir: 'qiche'
        },
        {
            name: '体育',
            list_dir: 'tiyu'
        },
        {
            name: '时尚',
            list_dir: 'shishang'
        },
        {
            name: '健康',
            list_dir: 'yangsheng'
        },
        {
            name: '游戏',
            list_dir: 'youxi'
        },
        {
            name: '动漫',
            list_dir: 'dongman'
        },
        {
            name: '教育',
            list_dir: 'jiaoyu'
        },
        {
            name: '文化',
            list_dir: 'wenhua'
        },
        {
            name: '旅游',
            list_dir: 'lvyou'
        },
        {
            name: '辟谣',
            list_dir: 'piyao'
        },
      ], //导航数据
      errored: false,
      onedata: [], //第一次加载数据
      hotdata: null, //热点数据
      hotpage: 1,
      mescroll: null, // mescroll实例对象
      mescrollDown: {
        callback: this.downCallback,
        auto: false,
        use: true,
        isLock: false,
        offset: 80,
        empty: {
          tip: "暂无相关数据~",
        },
      },
      mescrollUp: {
        use: true,
        auto: false, // 上拉加载的配置.
        callback: this.upCallback, // 上拉回调,此处简写; 相当于 callback: function(page, mescroll) { }//以下是一些常用的配置,当然不写也可以的.
        htmlNodata: '<p class="upwarp-nodata">-- 暂无数据 --</p>',
        noMoreSize: 5,
        offset: 250,
      },
      dataList: [], // 列表数据
    };
  },
  computed: {
    scaleFun: function () {
      var scale = this.scale;
      return `transform:scale(${scale})`;
    },
  },
  watch: {
    active(newValue) {
      let query = this.$router.history.current.query;
      let path = this.$router.history.current.path;
      //对象的拷贝
      let newQuery = JSON.parse(JSON.stringify(query));
      // 地址栏的参数值赋值
      newQuery.active = newValue;
      this.$router.push({ path, query: newQuery });
    },
  },
  created() {
    //导航
    let _this = this;
    _this.getNav();
    _this.btn();
    _this.from = _this.getQueryString("from");
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
      document.title = "益资讯";
      let _this = this;
      _this.$axios
        .get(_this.navurl)
        .then((response) => {
          //导航数据
          // _this.newsList = response.data.data;
          // let id1 = _this.newsList.findIndex((item) => {
          //   if (item.name == "社会") {
          //     return true;
          //   }
          // });
          // _this.newsList.splice(id1, 1);
          // let id2 = _this.newsList.findIndex((item) => {
          //   if (item.name == "国际") {
          //     return true;
          //   }
          // });
          // _this.newsList.splice(id2, 1);
          // let id3 = _this.newsList.findIndex((item) => {
          //   if (item.name == "历史") {
          //     return true;
          //   }
          // });
          // _this.newsList.splice(id3, 1);
          _this.newsList.forEach((i, k) => {
            //判断数据里面的值是否与URL中的active值一样
            let list_dir = i.list_dir;
            if (list_dir == _this.active) {
              //导航高亮
              _this.selectedId = k;
              if(_this.active === "tuijian") {
                _this.Newsdata(_this.active);
                _this.hot();
              }else {
                _this.visible = false;
              }
            }
          });
        })
        .catch((error) => {
          console.log(error);
          _this.errored = true;
        });
    },

    //热点
    hot() {
      let _this = this;
      _this.visible = true;
      _this.$axios
        .get(_this.hoturl, {
          params: {
            page: _this.hotpage,
            size: 5,
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
      let _this = this;
      let url = _this.newsurl + nav_cid;
      _this.onedata = [];
      if (nav_cid == "tuijian") {
        _this.visible = true;
      } else {
        _this.visible = false;
      }

      _this.$axios
        .get(url, {
          params: {
            page: _this.page,
            size: _this.size,
          },
        })
        .then((response) => {
          let res = response.data.data;
          let advert = _this.getRandomArrayElements(
            _this.baidu,
            res.length / 2
          );
          advert.forEach((a, b) => {
            _this.baidu_id = _this.guid();
            _this.baidu_box.push(_this.baidu_id);
            res.splice((b + 1) * 2 + b, 0, {
              id: 0,
              url: a,
              baidu_id: _this.baidu_id,
            });
          });
          //传值百度广告id和百度盒子id
          baiduJs(_this.baidu, _this.baidu_box);
          _this.onedata = res;
          _this.mescrollDown.use = true;
        })
        .catch((error) => {
          console.log(error);
          _this.errored = true;
        });
    },
    //点击导航
    handleChange(item, index) {
      let _this = this;
      let cid = item.list_dir.replace("/", "").replace("/", "");
      let url = _this.newsurl + cid;
      _this.page = 1;
      _this.active = cid;
      _this.index_a = cid;
      //文章id
      if (cid === "tuijian") {
        _this.hot();
        _this.visible = true;
      } else {
        _this.visible = false;
      }
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
          let advert = _this.getRandomArrayElements(
            _this.baidu,
            res.length / 2
          );
          advert.forEach((a, b) => {
            _this.baidu_id = _this.guid();
            res.splice((b + 1) * 2 + b, 0, {
              id: 0,
              url: a,
              baidu_id: _this.baidu_id,
            });
          });
          baiduJs(_this.baidu, _this.baidu_box);
          _this.onedata = res;
          _this.mescrollDown.use = true;
        })
        .catch((error) => {
          console.log(error);
          _this.errored = true;
        });
    },
    //导航二次点击
    btn(){
      let _this = this;
      $("body").on("click", '.ly-tab-list a', function () {
            if($(this).attr('class').indexOf('atcive-ly') == -1){
              $(this).addClass('atcive-ly').siblings().removeClass('atcive-ly');
            }else{
              _this.mescroll.showDownScroll();
            setTimeout(function () {
              _this.mescroll.triggerDownScroll();
            }, 500);
          }
      });
    },
    //点击刷新
    Refresh() {
      let _this = this;
      $(".mescroll").animate({
        scrollTop: 0,
        },0);
      _this.mescroll.showDownScroll();
      setTimeout(function () {
        _this.mescroll.triggerDownScroll();
      }, 500);
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
      setTimeout(() => {
        // 隐藏下拉加载状态
        mescroll.endErr();
          $(".noti_hide").show();
        setTimeout(() => {
          $(".noti_hide").hide();
        }, 1000);
      }, 1000);
    },
    //下拉加载
    upCallback(page, mescroll) {
      let _this = this;
      let url = _this.newsurl + _this.active;
      _this.page++;
      if (_this.active == null) {
        _this.index_a = "rem";
      } else {
        _this.index_a = _this.active;
      }
      if (_this.active == "tuijian") {
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
          if (arr != 0) {
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
              _this.mescrollDown.use = true;
              $(".noti_hide").html("为您推荐" + arr.length + "条更新");
            });
          } else {
            mescroll.endSuccess(arr.length);
            _this.mescrollDown.use = false;
            $(".noti_hide").html("暂无数据~");
          }
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
      if (r != null) {
        return unescape(r[2]);
      } else if (q != null) {
        return unescape(q[2]);
      } else {
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
      return Number(
        Math.random().toString().substr(3, 3) + Date.now()
      ).toString(36);
    },
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
  background: url(../image/img_preview.png) center no-repeat;
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
  margin-top: 1.7rem;
}
.hot {
  margin: 0 15px;
  font-size: 0;
  padding: 12px 0 10px;
  position: relative;
}
.hot h3 {
  margin: 0;
  font-size: 17px;
  -webkit-line-clamp: 3;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  font-weight: 400;
}
.item-status {
  display: inline-block;
  border: 1px solid #ff7070;
  color: #ff7070;
  border-radius: 4px;
  padding: 0 4px;
  font-size: 12px;
  margin-right: 7px;
}
.hot a {
  display: block;
  -webkit-tap-highlight-color: rgba(255, 255, 255, 0);
  color: #2c2c2c;
  text-decoration: none;
  padding: 0 !important;
}
.hot:after {
  content: " ";
  position: absolute;
  left: 0;
  bottom: 0;
  display: block;
  width: 100%;
  height: 1px;
  background: #e8e8e8;
  /* -webkit-transform: scale(.5);
    -webkit-transform-origin: 0; */
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
.noti_hide {
  background: #d6e9f7;
  color: #2a90d7;
  width: 100%;
  height: 0.6rem;
  line-height: 4.8px;
  line-height: 0.6rem;
  text-align: center;
  font-size: 1.92px;
  font-size: 0.12rem;
  -webkit-animation: pulse 0.3s;
  animation: pulse 0.3s;
  display: none;
}
@keyframes pulse {
  0% {
    top: -0.21rem;
    transform: scaleX(1);
  }

  50% {
    top: 0;
    transform: scale3d(1.05, 1.05, 1.05);
  }

  to {
    top: 0;
    transform: scaleX(1);
  }
}

.ly-tab {
  position: relative;
  background-color: #f5f5f5;
}
.ly-tab:before {
  content: " ";
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

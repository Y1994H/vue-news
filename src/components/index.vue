<template>
  <div class="app">
    <header>
      <ul ref="nav" class="nav-list">
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
      </ul>
    </header>
    <div class="newslist">
      <mescroll-vue ref="mescroll" :down="getMescrollDown()" :up="mescrollUp">
        <div
          class="hot"
          v-for="(item, index) in hotdata"
          :key="item.id + index"
          v-show="visible"
        >
          <router-link :to="'/article/' + item.id">
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
                :to="'/article/' + item.id"
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
                :to="'/article/' + item.id"
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
                :to="'/article/' + item.id"
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
                :to="'/article/' + item.id"
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
  </div>
</template>

<script>
import logoSrc from "@/image/ss.svg";
import { indexJs,baiduJs } from "@/js/index.js";

export default {
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
      nav_id:this.$route.query.active,
      index_a:0,
      ximg: "?x-oss-process=style/mxiaotu2",
      imgUrl: logoSrc,
      first_cid: null, //id
      page: 1, //页码数
      size: 20, //请求数量
      active: this.$route.query.active || 0,
      visible: true,
      rand: null,
      NewsList: null, //导航数据
      errored: false,
      onedata: [], //第一次加载数据
      hotdata: null, //热点数据
      hotpage: 1,
      mescroll: null, // mescroll实例对象
      mescrollUp: {
        use: true,
        auto: false, // 上拉加载的配置.
        callback: this.upCallback, // 上拉回调,此处简写; 相当于 callback: function(page, mescroll) { }//以下是一些常用的配置,当然不写也可以的.
        page: {
          num: 1, //当前页 默认0,回调之前会加1; 即callback(page)会从1开始
          size: 20, //每页数据条数,默认10
        },
        toTop: {
          //回到顶部按钮
          src: logoSrc, //图片路径,默认null,支持网络图
          offset: 1000, //列表滚动1000px才显示回到顶部按钮
        },
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
     this.getNav();
     indexJs();
  },
  mounted() {
    let _this = this;
    _this.hot()
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
        .get("//mini.yyrtv.com/api/get_mobile_menu")
        .then((response) => {
          //导航数据
          _this.NewsList = response.data.data;
          _this.NewsList.unshift({
            id: 0,
            pid: 0,
            name: "热点",
            list_dir: "/index/",
            pid: 0,
          });
          if(_this.nav_id!=undefined){
              _this.active = parseInt(_this.nav_id);
              _this.NewsList.forEach((i,k)=>{
                if(i.id == _this.active) {
                  _this.first_cid = i.list_dir.replace("/", "").replace("/", "");
                  _this.Newsdata(_this.first_cid);
                  indexJs(this.first_cid)
                }
            })
          }else{
                _this.Newsdata();
              };
        })
        .catch((error) => {
          console.log(error);
          _this.errored = true;
        });
    },
    
    //热点
    hot() {
      this.$axios
        .get("//mini.yyrtv.com/api/get_mobile_hot", {
          params: {
            page: this.hotpage,
            size: 1,
          },
        })
        .then((response) => {
          this.hotdata = response.data.data;
        })
        .catch((error) => {
          console.log(error);
          this.errored = true;
        });
    },
    //首次新闻列表加载
    Newsdata(nav_cid) {
        let _this = this;
        let url;
        url = "//mini.yyrtv.com/api/get_mobile_redian";
        if(_this.nav_id!=undefined){
          _this.onedata = [];
          _this.visible = false;
          url = "//mini.yyrtv.com/api/new_ajaxlist?cid=" + nav_cid;
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
          baiduJs(_this.baidu,_this.baidu_box)
          _this.onedata = res;
        })
        .catch((error) => {
          console.log(error);
          _this.errored = true;
        });

    },
    //点击导航请求数据
    btn(cid) {
      let url;
      let _this = this;
      _this.index_a = cid;
      //文章id
      cid = cid.replace("/", "").replace("/", "");
      if (cid == "index") {
        _this.visible = true;
        url = "//mini.yyrtv.com/api/get_mobile_redian";
      } else {
        _this.visible = false;
        url = "//mini.yyrtv.com/api/new_ajaxlist?cid=" + cid;
      }
      _this.mescrollUp.page.num = 1;
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
          baiduJs(_this.baidu,_this.baidu_box)
          _this.onedata = res;
        })
        .catch((error) => {
          console.log(error);
          _this.errored = true;
        });
    },
    mescrollInit(mescroll) {
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
    //下拉加载
    upCallback(page, mescroll) {
      let _this = this;
      let url;
      if(_this.first_cid == null) {
          _this.index_a = 'rem'
        }else{
          _this.index_a = _this.first_cid;
        }
      if (_this.first_cid == "index") {
        _this.visible = true;
        url = "//mini.yyrtv.com/api/get_mobile_redian";
      } else {
        _this.visible = false;
        url = "//mini.yyrtv.com/api/new_ajaxlist?cid=" + _this.first_cid;
      }
      // 联网请求
      _this.$axios
        .get(url, {
          params: {
            page: page.num,
            size: page.size,
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
  top: 44px;
  bottom: 0;
  height: auto;
}
.app {
  width: 100%;
  height: 100%;
}
header {
  position: fixed;
  top: 0;
  z-index: 5;
  width: 100%;
  background: #f4f5f6;
}
header ul {
  width: 100%;
  height: 0.8rem;
  overflow-x: scroll;
  display: -webkit-box;
  justify-content: space-around;
  align-items: center;
}
header ul li {
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
.baidu {
  width: 7.1rem;
  height: auto;
  overflow: hidden;
  margin: 0 auto;
  padding-top: 0.2rem;
  padding-bottom: 0.2rem;
  border-bottom: 1px solid #ddd;
}
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
</style>

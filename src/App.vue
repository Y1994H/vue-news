<template>
  <div id="App">
    <router-view v-if="isRouterAlive" />
    <remote-js
      src="//cpro.baidustatic.com/js/dm.js"
      async="async"
      defer="defer"
    ></remote-js>
    <!-- 底部 -->
    <Tap />
  </div>
</template>

<script>
var bw = document.documentElement.clientWidth / 7.5 + "px";
var htmlTag = document.getElementsByTagName("html")[0];
htmlTag.style.fontSize = bw;
import Tap from '@/components/tap.vue';
//console.log(vtap)
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
    Tap,//底部
  },
  name: "App",
  data() {
    return {
      isRouterAlive: true,
    };
  },
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  /* font-size: 10px; */
}
html {
  color: #2c2c2c;
  width: 100%;
}
body {
  background: #ffffff;
  -webkit-overflow-scrolling: touch;
  overflow: auto;
}
html,
body {
  position: relative;
  height: 100%;
}
a {
  text-decoration: none;
}
body {
  margin: 0;
  font-size: 10px;
  width: 100%;
  height: 100%;
  font-family: "helvetica neue", tahoma, "hiragino sans gb", stheiti,
    "wenquanyi micro hei", \5fae\8f6f\96c5\9ed1, \5b8b\4f53, sans-serif;
  background: #fff;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
}
body,
ul,
li,
dl,
dt,
dd,
p,
ol,
h1,
h2,
h3,
h4,
h5,
h6,
form,
img,
table,
fieldset,
legend {
  margin: 0;
  padding: 0;
}
a {
  -webkit-tap-highlight-color: transparent;
}
ul,
li,
ol {
  list-style: none;
}

img,
fieldset {
  border: 0;
}

img {
  display: block;
  width: 100%;
}

a {
  text-decoration: none;
  color: #2c2c2c;
}

h1,
h2,
h3,
h4,
h5,
h6 {
  font-weight: 100;
}
#App {
  width: 100%;
  height: auto;
  overflow: hidden;
}
.mescroll-totop {
  box-shadow: 0 0 6px #8e8e8e;
  background-color: hsla(0, 0%, 100%, 0.9);
}
.content_html img {
  margin: 5px auto;
  width: 100% !important;
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
  overflow: hidden;
  float: right;
  /* width: 2.34rem;
  height: 1.56rem; */
  width: 33%;
  display: inline-block;
  vertical-align: middle;
  height: 70px;
}
.newslist ul .news_left img {
  /* width: 2.34rem;
  height: 1.56rem; */
  width: 100%;
  min-height: 78px;
  background-color: #fafafa;
}
.newslist ul .news_right {
  float: left;
  width: 67%;
  vertical-align: top;
  height: auto;
}
.news_dan .news_tit {
  margin-right: 22px;
}
.news_right .news_tit {
  font-size: 17px;
  -webkit-line-clamp: 3;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  font-weight: 400;
  text-align: justify;
  /* font-size: 0.34rem;
  display: -webkit-box;
  overflow: hidden;
  width: 100%;
  text-overflow: ellipsis;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical; */
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
  /* width: 2.34rem;
  height: 1.56rem; */
  width: 32.7%;
  height: 70px;
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

</style>

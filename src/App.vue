<template>
  <div id="App">
    <router-view v-if="isRouterAlive" />
    <remote-js src="//cpro.baidustatic.com/js/dm.js" async="async" defer="defer"></remote-js>
 </div> 
</template>

<script>
var bw = (document.documentElement.clientWidth / 7.5) + "px";
var htmlTag = document.getElementsByTagName("html")[0];
htmlTag.style.fontSize = bw;

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
  name: 'App',
  data() {
        return{
            isRouterAlive: true
        }
    },
}
</script>

<style>
*{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    /* font-size: 10px; */
}
html{
    color: #000000;
    width: 100%;
}
body{
    background: #FFFFFF;
    -webkit-overflow-scrolling: touch;
    overflow: auto;
}
html, body {
    position: relative;
    height: 100%;
}
a{
    text-decoration: none;
}
body {
	margin: 0;
	font-size: 10px;
	width:100%;
	height:100%; 
	font-family: 'helvetica neue',tahoma,'hiragino sans gb',stheiti,'wenquanyi micro hei',\5FAE\8F6F\96C5\9ED1,\5B8B\4F53,sans-serif;
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
a{
    -webkit-tap-highlight-color:transparent;
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
	color: #333;
}

h1,
h2,
h3,
h4,
h5,
h6 {
	font-weight: 100;
}
#App{
  overflow: hidden;
}
.mescroll-totop{
    box-shadow: 0 0 6px #8e8e8e;
    background-color: hsla(0,0%,100%,.9);
  }
.mescroll-downwarp{
  display: none;
}  
.content_html>p>img{
  margin: 5px auto;
}
</style>

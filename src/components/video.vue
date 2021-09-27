<template>
  <div class="video">
    <ly-tab
    v-model="selectedId"
    :options="options"
    :items="video_data"
    @change="handleChange"
    >
    </ly-tab>
   
    <div class="filmul">
        <mescroll-vue
            ref="mescroll"
            :down="mescrollDown"
            :up="mescrollUp"
            @init="mescrollInit"
        >
            <ul>
                <li v-for="(item,index) in dataList" :key="index">
                    <router-link :to="'/film_details/'+item.id">
                        <img :src="item.cover" alt="">
                        <h4>
                            {{item.title}}
                        </h4>
                        <Score :rating="item.rate" showText />
                    </router-link>
                </li>
            </ul>
        </mescroll-vue>
    </div>
  </div>
</template>
<script>
import Score from './score.vue';
    export default {
        components:{
            Score
        },
        data() {
            return {
                navUrl:'/Api/j/search_tags', //电影类型导航数据
                filmUrl:'/Api/j/search_subjects',//电影列表数据
                tagid:'热门',//首次id
                page_num:10,//首次数量
                pages:1,//首次页码数
                video_data:[],
                selectedId: 0,
                options: {
                    activeColor: "#f85959",
                    labelKey: "name", // 在sortList数组中选择想要渲染的key名
                },
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
            }
        },
        created(){
            let _this = this;
            _this.getnav();
            _this.filmget();

        },
        mounted(){

        },
        computed:{
            
        },
        methods:{
            //电影导航请求
            getnav(){
                let _this = this;
                _this.$axios
                    .get(_this.navUrl)
                    .then((response) => {
                        console.log(response.data.tags);
                        $.map(response.data.tags,(item,index)=>{
                            _this.video_data.push({
                                'name':item
                            })
                        })
                    })
                    .catch((error) => {
                        console.log(error);
                        _this.errored = true;
                    });
            },
            //点击导航
            handleChange(video_data){
                let _this = this;
                _this.dataList = [];
                _this.tagid = video_data.name;
                _this.filmget();
            },
            //首次电影列表渲染
            filmget(){
                let _this = this;
                _this.$axios
                    .get(_this.filmUrl,{
                        params: {
                            tag:_this.tagid,
                            page_limit:_this.page_num,
                            page_start:_this.pages
                        }
                    })
                    .then((response) => {
                        console.log(response.data.subjects);
                        _this.dataList = response.data.subjects;
                    })
                    .catch((error) => {
                        console.log(error);
                        _this.errored = true;
                    });
            },
            mescrollInit(mescroll) {
                this.mescroll = mescroll; // 如果this.mescroll对象没有使用到,则mescrollInit可以不用配置
            },
        }
    }
</script>
<style scoped>
 
    .video{
        width: 100%;
        height: auto;
        overflow: hidden;
    }
    .mescroll{
        position: fixed;
        top: 38px;
        bottom: 0;
        height: auto;
    }
    .filmul{
        width: 100%;
        height:auto;
        overflow: hidden;
    }
    .filmul ul{
        width: 100%;
        height:auto;
        overflow: hidden;
        display: flex;
        justify-content: space-around;
        flex-wrap: wrap;
        padding-bottom: 20px;
    }
    .filmul ul li{
       width: calc((100% - 20px)/2);
       height: auto;
       margin: 10px auto;
    }
    .filmul ul li img{
        width: 100%;
        border-radius: 5px;
    }
    .filmul ul li h4{
        text-align: center;
        font-size: 13px;
        font-weight: 700;
        line-height: 23px;
        color: rgba(0,0,0,.9);
        margin-top: 4px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
</style>
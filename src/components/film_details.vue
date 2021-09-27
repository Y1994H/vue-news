<template>
    <div class="details">
        <img class="details_img" :src="detailsdata.poster" :alt="detailsdata.name" srcset="">
        <div class="details_rg">
            <h4>{{detailsdata.name}}</h4>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            detailsUrl:'https://movie.querydata.org/api?id='+this.$route.params.id,
            detailsdata:null,
        }
    },
    created() {
        let _this = this;
        _this.detailsget();
    },
    mounted() {
        
    },
    methods: {
        detailsget(){
            let _this = this;
                _this.$axios
                    .get(_this.detailsUrl)
                    .then((response) => {
                        _this.detailsdata = response.data.data[0];
                        console.log(_this.detailsdata);
                    })
                    .catch((error) => {
                        console.log(error);
                        _this.errored = true;
                    });
        }
    },
}
</script>
<style scoped>
    .details{
        width: 95%;
        height: auto;
        overflow: hidden;
        margin: 0 auto;
    }
    .details_img{
        display: block;
        width: calc((100% - 20px)/2);
        float: left;
    }
    .details_rg{
        float: right;
        width: calc((100% - 20px)/2);
    }
</style>
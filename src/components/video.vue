<template>
  <div class="video">
      视频中心
  </div>
</template>
<script>
    export default {
        data() {
            return {
                navUrl:''
            }
        },
        created(){
            let _this = this;
            _this.getnav();

        },
        mounted(){

        },
        methods:{
            getnav(){
                let _this = this;
                _this.$axios
                    .get(_this.navUrl)
                    .then((response) => {
                        console.log(response);
                    })
                    .catch((error) => {
                        console.log(error);
                        _this.errored = true;
                    });
            }
        }
    }
</script>
<style>

</style>
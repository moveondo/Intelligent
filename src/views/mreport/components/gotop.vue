<template>
  <div>
    <button type="button" class="back-top small" @click="backTop(step)" >我要上天</button>
  </div>
  <!-- v-show="backTopShow" -->
</template>

<script type="text/ecmascript-6">
  export default {
    data() {
      return {
        backTopShow:false,
        step:50
      }
    },
    components: {},
    mounted() {
      window.addEventListener('scroll', this.handleScroll,true)
    },
    methods: {
      backTop(i) {
          console.log(i,window.pageYOffset)
         document.documentElement.scrollTop-=i;
                if (document.documentElement.scrollTop>0) {
                    var c=setTimeout(()=>this.backTop(i),16);
                }else {
                    clearTimeout(c);
                }
      },
      handleScroll(){
        //  alert(11)
        if (document.documentElement.scrollTop + document.body.scrollTop > 100) {
          this.backTopShow=true;
        }
        else {
          this.backTopShow=false;
        }
      }
    }
  }
</script>

<style lang="less" scoped>
  .back-top {
    position: fixed;
    right: 10px;
    bottom: 10px
  }
</style>
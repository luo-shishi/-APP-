<template>
  <div id="app">
    <v-header :seller="seller"></v-header>
    <div class="tab">
      <router-link to="/goods" tag="div">商品</router-link>
      <router-link to="/comments" tag="div">评论</router-link>
      <router-link to="/seller" tag="div">商家</router-link>
    </div>
    <transition name="view">
      <div class="view">
        <keep-alive>
        <router-view :seller="seller"></router-view>
        </keep-alive>
      </div>
    </transition>
  </div>
</template>

<script>
import header from "./components/header/Header.vue";
const url="https://api.myjson.com/bins/6fis2"
import {urlPares} from './lib/util'
export default {
  name: "App",
  data() {
    return {
      seller: {
        id:(()=>{
          let queryParam=urlPares();
          return queryParam.id
          console.log(queryParam);
        })()
      }
    };
  },
  created() {
    this.getSeller();
  },
  methods: {
    //获取商家数据
    getSeller() {
      this.$http.get(url).then(res => {
        this.seller = res.body.seller;        
      });
    }
  },
  components: {
    "v-header": header
  }
};
</script>

<style scoped lang='less'>
#app {
  margin: 0;
  padding: 0;
  .tab {
    display: flex;
    width: 100%;
    height: 40px;
    border-bottom: 1px solid rgba(7,17,27,0.1);
    div {
      flex: 1;
      text-align: center;
      line-height: 40px;
    }
    .active {
      color: red;
    }
  }
  .view-enter{
    opacity: 0;
    transform: translateX(100%);
  }
  .view-leave-to{
    opacity: 0;
    transform: translateX(-100%);
    position: absolute;
  }
  .view-enter-active,
  .view-leave-active{
    transition: all 0.5s ease;
  }
  
}
</style>

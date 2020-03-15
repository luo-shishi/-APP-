<template>
<div>
  <div class="container" >
    <div class="content">
      <div class="cart-left" @click.prevent="toggleList">
        <div class="iconBox" id="iconBox">
          <div class="icon" :class="totalCount>0?'active':''">
            <i class="mui-icon mui-icon-extra mui-icon-extra-cart"></i>
          </div>
          <div class="badge" v-show="totalCount>0">{{totalCount}}</div>
        </div>
        <span class="price">&yen;{{totalPrice}}</span>
        <span class="desc">另需配送费￥{{deliveryPrice}}元</span>
      </div>
      <div class="cart-right" :class="{'active':totalCount>0}">
        <span class="send" v-show="totalCount==0">￥{{minPrice}}元起送</span>
        <span
          class="send"
          v-show="(totalPrice<minPrice)&&(totalCount>0)"
          style="background: #333;color:white;"
        >还差 ￥{{minPrice-totalPrice}}元起送</span>
        <span class="send" v-show="totalPrice>=minPrice">去结算</span>
      </div>
    </div>
    <transition name="list">
    <div class="shopcart-list" v-show="listShow">
      <div class="list-header">
        <h1 class="title">购物车</h1>
        <span class="empty" @click="empty">清空</span>
      </div>
      <div class="list-content" ref="listContent">
        <ul>
          <li class="food" v-for="(food,i) in selectFoods" :key="i">
            <span class="name">{{food.name}}</span>
            <div class="price">
              <span>￥{{food.price*food.count}}</span>
            </div>
            <div class="carbtn-wrap">
              <carbtn :food="food"></carbtn>
            </div>
          </li>
        </ul>
      </div>
    </div>
    </transition>
  </div>
  <transition name="mask">
  <div class="mask" v-show="listShow" @click="hideList"></div>
  </transition>
</div>
</template>
<script>
import BScroll from 'better-scroll'
import carbtn from "../../common/CartBtn";
export default {
  name: "ShopCart",
  props: ["deliveryPrice", "minPrice", "selectFoods"],
  data() {
    return {
      fold: true
    };
  },
  components: {
    carbtn
  },
  computed: {
    //商品总价计算
    totalPrice() {
      let total = 0;

      this.selectFoods.forEach(item => {
        total += item.count * item.price;
      });
      return total;
    },
    //商品总数量计算
    totalCount() {
      let count = 0;

      this.selectFoods.forEach(item => {
        count += item.count;
      });
      return count;
    },
    listShow() {
      if (!this.totalCount) {
        this.fold = true;
        return false;
      }
      let show = !this.fold;
      if(show){
          this.$nextTick(() => {
              if(!this.scroll){
                  this.scroll=new BScroll(this.$refs.listContent,{
                            click:true
                         })
              }else{
                  this.scroll.refresh();
              }
          })
         
      }
      return show;
    }
  },
  methods: {
    toggleList() {
      if (!this.totalCount) {
        return;
      }
      this.fold = !this.fold;
    },
    hideList(){
      this.fold=true
    },
    empty(){
        this.selectFoods.forEach((food) => {
            food.count=0
        })
    }
  }
};
</script>
<style lang="less" scoped>
.container {
  position: fixed;
  left: 0;
  bottom: 0;
  background-color: #141d27;
  width: 100%;
  height: 48px;
  z-index: 90;
  display: flex;
  .content {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 48px;
      z-index: 50;
      display: flex;
    .cart-left {
      flex: 1;
      position: relative;
      top: 0;
      left: 0;
      z-index: 60;

      .iconBox {
        position: relative;
        top: -8px;
        width: 56px;
        height: 56px;
        border-radius: 50%;
        background-color: #141d27;
        margin-left: 18px;
        z-index: 80;
        padding: 6px 0;
        box-sizing: border-box;
        display: inline-block;

        .badge {
          position: absolute;
          top: 0px;
          right: 0px;
          width: 27px;
          height: 21px;
          border-radius: 21px;
          line-height: 21px;
          text-align: center;
          font-size: 9px;
          color: #fff;
          background: linear-gradient(90deg, #fc9153, #f01414);
          box-shadow: 0px 4px 8px 0px rgba(0, 0, 0, 0.4);
        }

        .icon {
          background-color: #333;
          margin-left: 5px;
          width: 44px;
          height: 44px;
          border-radius: 50%;
          text-align: center;

          i {
            font-size: 24px;
            color: rgba(255, 255, 255, 0.4);
            line-height: 24px;
            padding: 6px;
          }
        }

        .icon.active {
          background-color: skyblue;

          i {
            color: #fff;
          }
        }
      }

      .price {
        display: inline-block;
        height: 24px;
        font-size: 16px;
        color: rgba(255, 255, 255, 0.4);
        line-height: 24px;
        border-right: 1px solid rgba(255, 255, 255, 0.2);
        padding-right: 6px;
        font-weight: 350;
      }

      .desc {
        display: inline-block;
        font-size: 12px;
        color: rgba(255, 255, 255, 0.4);
        line-height: 24px;
      }
    }

    .cart-right {
      display: flex;
      flex: 0 0 105px;
      background-color: #333;
    }

    .send {
      display: inline-block;
      color: rgba(255, 255, 255, 0.4);
      line-height: 48px;
      height: 48px;
      font-size: 12px;
      font-weight: 700;
      width: 100%;
      text-align: center;
    }

    .cart-right.active {
      background-color: #00b43c;
      .send {
        color: #fff;
      }
    }
  }
  .shopcart-list{
      position: absolute;
      left: 0;
      top:0;
      z-index: -1;
      width: 100%;
      transform: translate3d(0,-100%,0);
      
     
      &.list-enter,&.list-leave-to{
        transform: translate3d(0,0,0)
      }
      &.list-enter-active,&.list-leave-active{
          transition: all 0.4s linear;
        
      }
      .list-header{
          height: 40px;
          line-height: 40px;
          padding: 0 18px;
          background-color: #f3f5f7;
          border-bottom: 1px solid rgba(7,17,27,0.1 );
          .title{
              float:left;
              margin-top: 13px;
              font-size: 14px;
              color: rgb(7,17,27);

          }
          .empty{
              float: right;
              font-size: 12px;
              color: rgb(0,160,220);
              
          }
      }
      .list-content{
          padding: 0 18px;
          max-height: 217px;
          overflow: hidden;
          background-color: #fff;
          .food{
              position: relative;
              padding: 12px 0;
              box-sizing: border-box;
              border-bottom: 1px solid rgba(7, 17, 27, 0.1);
              list-style: none;
              .name{
                  line-height: 30px;
                  font-size: 14px;
                  color: rgb(7, 17, 27);
              }
              .price{
                  position: absolute;
                  right: 100px;
                  bottom: 12px;
                  line-height: 30px;
                  font-size: 14px;
                  font-weight: 700;
                  color: rgb(240, 20, 20);
              }
              .carbtn-wrap{
                  position: absolute;
                  right: 0;
                  bottom: 16px;
              }
          }
      }
  }
}
.mask{
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    backdrop-filter: blur(10px);
    background-color: rgba(0, 0, 0, 0.4);
    z-index: 40;
    &.mask-enter,&.mask-leave-to{
        opacity: 0;
    }
    &.mask-enter-active,&.mask-leave-active{
        transition: all 0.4s;
    }
}
</style>
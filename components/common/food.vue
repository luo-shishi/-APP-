<template>
  <div>
    <transition name="move">
      <div class="food" v-show="flag" ref="food">
        <div>
          <div class="food-content">
            <div class="image-header">
              <img :src="food.image" class="img" />
              <div class="back" @click="hide">
                <span class="mui-icon mui-icon-arrowleft"></span>
              </div>
            </div>
            <div class="content">
              <h1 class="title">{{food.name}}</h1>
              <div class="detail">
                <span class="sell-count">月售{{food.sellCount}}份</span>
                <span class="rating">好评率{{food.rating}}</span>
              </div>
              <div class="price">
                <span>&yen;{{food.price}}</span>
                <span v-show="food.oldPrice">&yen;{{food.oldPrice}}</span>
              </div>
            </div>
            <div class="cartcontrol-wrapper">
              <cartbtn :food="food"></cartbtn>
            </div>
            <transition name="fade">
              <div class="buy" v-show="!food.count || food.count===0" @click="addlist">加入购物车</div>
            </transition>
          </div>
          <split></split>
          <div class="info">
            <h1 class="title">商品信息</h1>
            <p class="text">{{food.info}}</p>
          </div>
          <split></split>
          <div class="rating">
            <h1 class="title">商品评价</h1>
            <ratingselect
              :select-type="selectType"
              :only-content="onlyContent"
              :desc="desc"
              :ratings="food.comments"
              @get="get"
              @toggle="toggle"
            ></ratingselect>
            <div class="rating-wrapper">
              <ul v-show="food.comments && food.comments.length">
                <li v-show="needshow(rating.rateType,rating.text)" v-for="(rating,i) in food.comments" :key="i" class="rating-item">
                  <div class="user">
                    <span class="name">{{rating.username}}</span>
                    <img class="avater" width="12" height="12" :src="rating.avatar" />
                  </div>
                  <div class="time">{{rating.rateTime | dataFormat}}</div>
                  <p class="text">
                    <span
                     :class="{'glyphicon glyphicon-thumbs-up':rating.rateType===0,
                              'glyphicon glyphicon-thumbs-down':rating.rateType===1
                    }"
                     aria-hidden="true"></span>
                    {{rating.text}}
                  </p>
                </li>
              </ul>
              <div class="no-rating" v-show="!food.comments || !food.comments.length">无评价内容</div>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>
<script>
import BScroll from "better-scroll";
import cartbtn from "../common/CartBtn";
import Vue from "vue";
import split from "../common/split";
import ratingselect from "../common/ratingselect";
import {dataFormat} from '../../lib/date'

const POSITIVE = 0;
const NEGETIVE = 1;
const ALL = 2;

export default {
  props: ["food"],
  data() {
    return {
      flag: false,
      selectType: ALL,
      onlyContent: true,
      desc: {
        all: "全部",
        positive: "推荐",
        negetive: "吐槽"
      }
    };
  },
  components: {
    cartbtn,
    split,
    ratingselect
  },
  filters:{
    dataFormat(time){
      return dataFormat(time);

    }
  },
  methods: {
    show() {
      this.flag = true;
      this.selectType = ALL;
      this.onlyContent = true;
      this.$nextTick(() => {
        if (!this.scroll) {
          this.scroll = new BScroll(this.$refs.food, {
            scrollY: true,
            click: true,
            probeType: 3 // listening scroll hook
          });
        } else {
          this.scroll.refresh();
        }
      });
    },
    hide() {
      this.flag = false;
    },
    addlist(event) {
      if (!event._constructed) {
        return;
      }
      Vue.set(this.food, "count", 1);
    },
    get(data) {
      this.selectType = data;
      this.$nextTick(()=>{
        this.scroll.refresh();
      })
    },
    toggle() {
      this.onlyContent = !this.onlyContent;
      this.$nextTick(()=>{
        this.scroll.refresh();
      })
    },
    needshow(type,text){
      if(this.onlyContent && !text){
      return false
      }
      if(this.selectType===2){
      return true
      }else{
        return type===this.selectType
      }
    }
  }
};
</script>
<style lang="less" scoped>
.food {
  position: fixed;
  left: 0;
  top: 0;
  bottom: 48px;
  z-index: 30;
  width: 100%;
  background-color: #ffffff;
  transform: translateX(0);
  &.move-enter,
  &.move-leave-to {
    transform: translateX(100%);
  }
  &.move-enter-active,
  &.move-leave-active {
    transition: all 0.2s linear;
  }
  .food-content {
    position: relative;
    .image-header {
      position: relative;
      width: 100%;
      height: 0;
      padding-top: 100%;
      img {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
      }
      .back {
        position: absolute;
        top: 0;
        left: 0;
        .mui-icon {
          display: block;
          padding: 10px;
          height: auto;
          font-size: 30px;
          color: #ffffff;
        }
      }
    }
    .content {
      padding: 18px;
      .title {
        line-height: 14px;
        margin-bottom: 8px;
        font-size: 14px;
        font-weight: 700;
        color: rgb(7, 17, 27);
      }
      .detail {
        margin-bottom: 18px;
        height: 10px;
        line-height: 10px;
        font-size: 0;
        .sell-count,
        .rating {
          font-size: 10px;
          color: rgb(147, 153, 159);
        }
        .sell-count {
          margin-right: 12px;
        }
      }
      .price {
        span:first-child {
          font-size: 14px;
          line-height: 28px;
          font-weight: 350;
          color: red;
        }

        span:last-child {
          font-size: 10px;
          line-height: 24px;
          font-weight: 350;
          color: rgb(147, 153, 159);
          text-decoration: line-through;
        }
      }
    }
    .cartcontrol-wrapper {
      position: absolute;
      right: 12px;
      bottom: 12px;
    }
    .buy {
      position: absolute;
      right: 18px;
      bottom: 14px;
      z-index: 10;
      height: 24px;
      line-height: 24px;
      padding: 0 12px;
      box-sizing: border-box;
      border-radius: 12px;
      font-size: 10px;
      color: #ffffff;
      background-color: rgb(0, 160, 220);
      opacity: 1;

      &.fade-enter,
      &.fade-leave-to {
        opacity: 0;
      }
      &.fade-enter-active,
      &.fade-leave-active {
        transition: all 0.2s linear;
      }
    }
  }
  .info {
    padding: 0 18px;
    .title {
      line-height: 14px;
      margin-bottom: 6px;
      font-size: 14px;
      color: rgb(7, 17, 27);
    }
    .text {
      line-height: 24px;
      padding: 0 8px;
      font-size: 12px;
      color: rgb(77, 85, 93);
    }
  }
  .rating {
    padding: 0 18px;
    .title {
      line-height: 14px;
      margin-left: 18px;
      font-size: 14px;
      color: rgb(7, 17, 27);
    }
    .rating-wrapper{
      padding: 0 18px;
      .rating-item{
        position: relative;
        padding: 16px 0;
        list-style: none;
       border-bottom: 1px solid rgba(7,17,27,0.1);
       .user{
         position: absolute;
         right: 0;
         top: 16px;
         line-height: 12px;
         font-size: 0;
         .name{
           display: inline-block;
           vertical-align: top;
           font-size: 10px;
           color: rgb(147,153,159);
         }
         .avatar{
           border-radius: 50%;
         }
       }
        .time{
          margin-bottom: 6px;
          line-height: 12px;
          font-size: 10px;
          color: rgb(147, 153, 159);
        }
        .text{
          line-height: 16px;
          font-size: 12px;
          color: rgb(7, 17, 27);
          .glyphicon{
            margin-right: 4px;
            line-height: 24px;
            font-size: 12px;
          }
          .glyphicon-thumbs-up{
            color: rgb(0,160,220)
          }
          .glyphicon-thumbs-down{
            color: rgb(147,153,159)
          }
        }
      }
    }
  }
}
</style>
<template>
  <div class="seller" ref="seller">
    <div class="seller-content">
      <div class="overview">
        <h1 class="title">{{seller.name}}</h1>
        <div class="desc">
          <star class="star" :h1Show="false" :score="seller.score"></star>
          <span class="text">（{{seller.ratingCount}}）</span>
          <span class="text">月销{{seller.sellCount}}份</span>
        </div>
        <ul class="remark">
          <li class="block">
            <h2>起送价</h2>
            <div class="content">
              <span class="stress">{{seller.minPrice}}</span>
              <span>元</span>
            </div>
          </li>
          <li class="block">
            <h2>商家配送</h2>
            <div class="content">
              <span class="stress">{{seller.deliveryPrice}}</span>
              <span>元</span>
            </div>
          </li>
          <li class="block">
            <h2>平均配送时间</h2>
            <div class="content">
              <span class="stress">{{seller.deliveryTime}}</span>
              <span>分钟</span>
            </div>
          </li>
        </ul>
        <div class="love">
          <span @click="change" :class="{'active':love1}" class="glyphicon glyphicon-heart" aria-hidden="true"></span>
          <div class="text">{{text}}</div>
        </div>
      </div>
      <split></split>
      <div class="bulletin">
        <h1 class="title">公告与活动</h1>
        <div class="content-wrapper">
          <p class="content">{{seller.bulletin}}</p>
        </div>
        <div class="supportsList" v-for="(item,i) in seller.supports" :key="i">
          <img :src="picArr[seller.supports[i].type]" />
          <span class="icon-description">{{seller.supports[i].description}}</span>
        </div>
      </div>
      <split></split>
      <div class="pics">
        <h1 class="title">商家实景</h1>
        <div class="pics-wrapper" ref="pics">
          <ul class="pics-list" ref="piclist">
            <li class="pics-item" v-for="(pics,i) in seller.pics" :key="i">
              <img width="120px" height="90px" :src="pics" />
            </li>
          </ul>
        </div>
      </div>
      <split></split>
      <div class="info">
        <h1 class="title">商家信息</h1>
        <ul>
          <li class="infolist" v-for="(item,i) in seller.infos" :key="i">{{item}}</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import star from "../common/Star";
import split from "../common/split";
import BScroll from "better-scroll";
export default {
  name: "Seller",
  props: ["seller"],

  data() {
    return {
      love1:false,
      picArr: [
        "/static/star_img/decrease.png",
        "/static/star_img/discount.png",
        "/static/star_img/guarantee.png",
        "/static/star_img/invoice.png",
        "/static/star_img/special.png"
      ]
    };
  },
  computed:{
    text(){
      return this.love1?'已收藏':'收藏'

    }
  },
  created() {
    this.$nextTick(() => {
      this.scroll = new BScroll(this.$refs.seller, {
        click: true
      });
      this.initscroll();
    });
    /*if(this.seller.pics){
      let picwidth=120;
      let margin=6;
      let width=(picwidth+margin)*this.seller.pics.length-margin;
      console.log('12310')
      this.$nextTick(()=>{
         
      })
    }*/
  },
  watch:{
    'seller':function (){
      this.initscroll();
    }
  },
  components: {
    star,
    split
  },
  methods: {
    change(){
       this.love1=!this.love1
    },
    initscroll() {
      if (this.seller.pics) {
        let picwidth = 120;
        let margin = 6;
        let width = (picwidth + margin) * this.seller.pics.length - margin;
        this.$refs.piclist.style.width = width + "px";
        this.$nextTick(() => {
          if (this.scroll) {
           
            this.scroll = new BScroll(this.$refs.pics, {
              starX: 0,
              click: true,
              scrollX: true,
              scrollY: false,
              eventPassthrough: "vertical"
            });
          } else {
           
            this.scroll.refresh();
          }
        });
      }
    }
  }
};
</script>

<style lang="less" scoped>
.seller {
  position: absolute;
  top: 174px;
  bottom: 0;
  width: 100%;
  overflow: hidden;
  .overview {
    padding: 18px;
    position: relative;
    .title {
      margin-bottom: 10px;
      line-height: 14px;
      color: rgb(7, 17, 27);
      font-size: 20px;
      margin-top: 0;
    }
    .desc {
      padding-bottom: 18px;
      line-height: 18px;
      border-bottom: 1px solid rgba(7, 17, 27, 0.1);
      font-size: 0;
      .star {
        display: inline-block;
        margin-right: 8px;
        vertical-align: top;
        margin-top: 3px;
        margin-bottom: 0;
      }
      .text {
        margin-right: 12px;
        display: inline-block;
        vertical-align: top;
        font-size: 10px;
      }
    }
    .remark {
      display: flex;
      padding-top: 18px;
      list-style: none;
      padding-left: 0;
      .block {
        flex: 1;
        list-style: none;
        text-align: center;
        border-right: 1px solid rgba(7, 17, 27, 0.1);
        &.last-cjild {
          border: none;
        }
        h2 {
          margin-bottom: 4px;
          line-height: 10px;
          font-size: 15px;
          color: rgba(7, 17, 27, 0.6);
        }
        .content {
          .stress {
            font-size: 24px;
          }
        }
      }
    }
    .love{
      position: absolute;
      top:18px;
      right: 11px;
      text-align: center;
      width: 50px;
      .glyphicon{
        font-size: 20px;
        color: rgba(7, 17, 27, 0.6);
        &.active{
        color: red;
      }
      .text{
        font-size: 20px;
        color: rgba(7, 17, 27, 0.6);
      }

      }
    }
  }
  .bulletin {
    padding: 18px 18px 0 18px;
    .title {
      margin-bottom: 8px;
      line-height: 14px;
      color: rgb(7, 17, 27);
      font-size: 14px;
    }
    .content-wrapper {
      padding: 0 12px 16px 12px;
      border-bottom: 1px solid rgba(7, 17, 27, 0.1);
      .content {
        font-size: 12px;
        font-weight: 200;
        color: rgb(240, 20, 20);
        line-height: 24px;
      }
    }
    .supportsList {
      padding: 16px 12px;
      border-bottom: 1px solid rgba(7, 17, 27, 0.1);
      img {
        width: 16px;
        margin-right: 6px;
      }
      .icon-description {
        font-size: 12px;
        font-weight: 200;
        color: rgb(7, 17, 27);
        line-height: 16px;
      }
    }
  }
  .pics {
    padding: 18px;
    .title {
      margin-bottom: 12px;
      line-height: 14px;
      color: rgb(7, 17, 27);
      font-size: 14px;
    }
    .pics-wrapper {
      width: 100%;
      overflow: hidden;
      white-space: nowrap;
      .pics-list {
        padding: 0;
        font-size: 0;
        .pics-item {
          display: inline-block;
          margin-right: 6px;
          width: 120px;
          height: 90px;
          &:last-child {
            margin-right: 0;
          }
        }
      }
    }
  }
  .info{
    padding: 0 18px;
    .title{
      padding: 12px 0;
      font-size: 14px;
      border-bottom: 1px solid rgba(7, 17, 27, 0.1)
    }
    ul{
      padding: 0 12px;
      .infolist{
        padding:16px 0;
        font-size: 12px;
        font-weight: 200;
        color: rgb(7, 17, 27);
        line-height: 16px;
        list-style: none;
        border-bottom:  1px solid rgba(7, 17, 27, 0.1)
      }
    }
  }
}
</style>
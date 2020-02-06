<template>
  <div>
    <div class="ratingselect">
      <div class="rating-type">
        <span class="block all" @click="select(2,$event)" :class="{'active':selectType===2}">
          {{desc.all}}
          <span class="count">{{ratings.length}}</span>
        </span>
        <span class="block positive" @click="select(0,$event)" :class="{'active':selectType===0}">
          {{desc.positive}}
          <span class="count">{{positives.length}}</span>
        </span>
        <span class="block negetive" @click="select(1,$event)" :class="{'active':selectType===1}">
          {{desc.negetive}}
          <span class="count">{{negetive}}</span>
        </span>
      </div>
      <div class="switch" :class="{'on':onlyContent}">
        <span class="mui-icon mui-icon-checkmarkempty" @click="toggle"></span>

        <span class="text">只看有内容评论</span>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  //props: ["selectType", "onlyContent", "desc","ratings"],
  props:{
      selectType:Number,
      onlyContent:Boolean,
      desc:Object,
      ratings:{
          type:Array,
          default(){
              return [];
          }
      }
  },
  data() {
    return {};
  },
  computed:{
     positives(){
       /* return this.ratings.filter((rating)=>{
            return rating.rateType===0
        })*/
        var arr=[];
        this.ratings.forEach(rating=>{
            if(rating.rateType===0){
                arr.push(rating)
            }
        })
            return arr
     },
     negetive(){
         return this.ratings.length-this.positives.length
     }
  },
  methods:{
      select(type,event){
          if(!event._constructed){
              return;
          }
          
         this.$emit('get',type)
      },
      toggle(event){
         if(!event._constructed){
             return;
         }
         this.$emit('toggle')
      }
  }
};
</script>
<style lang="less" scoped>
.ratingselect {
  .rating-type {
    padding: 18px 0;
    margin: 0 18px;
    border-bottom: rgba(7, 17, 27, 0.1);
    font-size: 0;
    .block {
      display: inline-block;
      padding: 8px 12px;
      margin-right: 8px;
      border-radius: 1px;
      font-size: 12px;
      color: rgb(77, 85, 93);
      &.active {
        color: #ffffff;
      }
      .count {
        margin-left: 2px;
        line-height: 16px;
        font-size: 8px;
      }
      &.all {
        background-color: rgba(0, 160, 220, 0.2);
        &.active {
          background-color: rgb(0, 160, 220);
        }
      }
      &.positive {
        background-color: rgba(0, 160, 220, 0.2);
        &.active {
          background-color: rgb(0, 160, 220);
        }
      }
      &.negetive {
        background: rgba(77, 85, 93, 0.2);
        &.active {
          background: rgb(77, 85, 93);
        }
      }
    }
  }
  .switch {
    padding: 12px 18px;
    line-height: 24px;
    border-bottom: 1px solid rgba(7, 17, 27, 0.1);
    color: rgb(147, 153, 159);
    font-size: 0;
    &.on {
      .mui-icon {
        color: #00c850;
      }
    }
    .mui-icon {
      display: inline-block;
      vertical-align: top;
      margin-right: 4px;
      font-size: 24px;
    }
    .text {
      display: inline-block;
      vertical-align: top;
      font-size: 12px;
    }
  }
}
</style>
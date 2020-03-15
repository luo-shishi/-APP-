<template>
  <div class="star">
    <span v-for="(star,i) in 5" :key="i" class="star-item off"></span>
    <h1 v-show="h1Show">{{score}}</h1>
  </div>
</template>
<script>
export default {
  props: ["h1Show", "score"],
  data() {
    return {

    };
  },
  methods:{
    
  },
  methods:{

  },

  updated() {
      let star_on = Math.floor(this.score); //满星数
      let sArr = document.querySelectorAll(".star span");
      if (star_on != 0) {
        for (let i = 0; i < star_on; i++) {
          sArr[i].classList.remove("off");
          sArr[i].classList.add("on");
          if (/\.(5|6|7|8|9)$/.test("" + this.score)) {
            //半星
            sArr[star_on].classList.remove("off");
            sArr[star_on].classList.add("half");
          }
        }
      } else {
        if (/\.(5|6|7|8|9)$/.test("" + this.score)) {
          //半星
          sArr[0].classList.remove("off");
          sArr[0].classList.add("half");
        }
      }
  }
};
</script>
<style lang="less" scoped>
.star {
  line-height: 24px;
  margin-bottom: 28px;
  h1 {
    color: black;
  }

  .star-item {
    display: inline-block;
    margin-right: 5px;

    &.on {
      height: 15px;
      width: 15px;
      background-image: url(../header/header_img/star_on.png);
      background-repeat: no-repeat;
      background-size: 10px 10px;
    }

    &.half {
      height: 15px;
      width: 15px;
      background-image: url(../header/header_img/star_half.png);
      background-repeat: no-repeat;
      background-size: 10px 10px;
    }

    &.off {
      height: 15px;
      width: 15px;
      background-image: url(../header/header_img/star_off.png);
      background-repeat: no-repeat;
      background-size: 10px 10px;
    }

    &:last-child {
      margin-right: 0px;
    }
  }
}
</style>
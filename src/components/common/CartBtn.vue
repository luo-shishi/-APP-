<template>
    <div class="shopcart_btn">
        <transition name="move">
        <div class="decrease" v-show="food.count>0" @click.stop.prevent="decrease">
            	<span class="mui-icon mui-icon-minus"></span>
        </div>
        </transition>
        <div class="count">
           <span v-show="food.count>0"> {{food.count}}</span>
            </div>
        <div class="add" @click.stop.prevent="add">
            	<span class="mui-icon mui-icon-plus"></span>
        </div>
        <transition
			     @before-enter="beforeEnter"
                 @enter="enter"
                 @after-enter="afterEnter">
			      <div class="ball" v-show="flag" ref="ball"></div>
   		   </transition>
    </div>
</template>
<script>
//import iconfont from '../../lib/iconfont/iconfont.js'
import Vue from 'vue'
export default {

    name: 'CartBtn',
    props: ['food'],

    data() {
        return {
            flag:false
        }
    },

    methods: {

        decrease() {
            if(this.food.count>0){
                this.food.count--;
            }else{
                return 
            }
            
        },

        add() {
            if (!this.food.count) {
                Vue.set(this.food, 'count', 1);
                this.flag=true
            } else {
                this.food.count++;
                this.flag=true
            }
        },
        beforeEnter(el) {
            el.style.transform = "translate(0, 0)";
        },
        enter(el, done) {
            el.offsetWidth;
            

           const ballPosition = this.$refs.ball.getBoundingClientRect();

           const iconBoxPosition = document
                .getElementById("iconBox")
                .getBoundingClientRect();

            const xDist = iconBoxPosition.left - ballPosition.left;
            const yDist = iconBoxPosition.top - ballPosition.top;

            el.style.transform = `translate(${xDist}px, ${yDist}px)`;
            el.style.transition = "all 0.5s cubic-bezier(.4,-0.3,1,.68)";

           
            done();
        },
        afterEnter(el) {
            this.flag = !this.flag;

        }

    }
}
</script>
<style lang="less" scoped>
        .move-enter,.move-leave-to{
            opacity: 0;
            transform: rotate(180) translateX(25px);
        }
        .move-enter-active,.move-leave.active{
            transition: all 500 linear;
        }
.shopcart_btn {
    position: relative;
    display: flex;
    padding: 0 20px;



    .decrease,.add
    {
        display: inline-block;
        font-size: 24px;
        height: 25px;
        line-height: 24px;
        margin:0 5px;
        border-radius:50%; 
    }
    .add{
        color: #00a0dc;
        
    }
    .decrease{
        color: #00a0dc;
    }
    .count {
        display: inline-block;
        height: 25px;
        font-size: 15px;
        line-height: 25px;
        color: #000;

    }

    .ball {
        width: 20px;
        height: 20px;
        border-radius: 50%;
        background-color: #00a0dc;
        position: absolute;
        left: 44%;
        top: 1px;
    }




}
</style>
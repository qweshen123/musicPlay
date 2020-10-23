<template>
  <div id="app">
    <div class="header-nav">
      <div class="box">
        <div class="trun">
          <div class="prev icon-xiangzuo trun-item" @click="toPrev"></div>
          <div class="next icon-xiangyou trun-item" @click="toNext"></div>
        </div>
        <div class="nav">
          <!-- <button @click="show">点击</button> -->
          <router-link to="/" class="item" :class="{con:isCon == 0}" @click.native="isCon = 0">主页</router-link>
          <router-link to="/explore" class="item" :class="{con:isCon == 1}" @click.native="isCon = 1">探索</router-link>
          <router-link to="/community" class="item" :class="{con:isCon == 2}" @click.native="isCon = 2">社区</router-link>
        </div>
        <div class="search">
          <span class="icon-sousuo"></span>
          <input type="text" v-model="keyWord">
        </div>
      </div>
    </div>
    <router-view/>
  </div>
</template>

<script>
// import {mapActions,mapState} from 'vuex'
export default {
  data(){
    return{
      keyWord:'Search',
      isCon:0
    }
  },
  computed:{
    // ...mapState(['recommend'])
  },
  methods:{
    show(){
      console.log(this.recommend)
    },
    toPrev(){
      this.$router.go(-1)
    },
    toNext(){
      this.$router.go(1)
    },
    // ...mapActions(['dataMusic'])
  },
  mounted(){
    // this.dataMusic(15)
  }
}
</script>

<style lang="scss" scoped>
  #app{
    padding: 0 155px;

    .header-nav{
      position: fixed;
      z-index: 10;
      left: 0;
      right: 0;
      top:0;
      height: 64px;
      
      background-color: rgba(255,255,255,.4);

      .box{
        display: flex;
        align-items: center;
        height: 100%;
        padding: 0 155px;
      }

      .trun{
        display: flex;
        justify-content: space-between;
        font-size: 16px;
        color:#1f1f1f;
        padding-left: 5px;
        font-weight: 700;


        .trun-item{
          padding: 10px;
          border-radius: 5px;

          &:hover{
            background-color: rgb(235, 235, 235);
          }
        }
      }

      .search{
        position: relative;
        display: flex;
        padding-right:5px ;
        width: 248px;
        justify-content: flex-end;

        .icon-sousuo{
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          left: 45px;
        }

        input{
          height: 32px;
          width: 200px;
          text-indent: 30px;
          outline: none;
          border-radius: 10px;
          border: none;
          background-color:rgb(235, 235, 235);
        }
      }

      .nav{
        flex: 1;
        display: flex;
        justify-content: flex-end;
        padding-right: 120px;

        .item{
          margin-left: 45px;
          text-decoration: none;
          font-size: 16px;
          font-weight: 700;
          color:#000000;
          border-radius: 5px;
          padding: 10px;
          &:hover{
            background-color:rgb(235, 235, 235);
          }

          &.con{
            color:#335eea;
          }
        }
      }

    }


  }
</style>

<template>
  <div id="app">
    <div class="header-nav container-fluid">
        <div class="box row">
          <div class="trun col-md-1 col-sm-2 col-xs-3">
            <div class="prev icon-xiangzuo trun-item" @click="toPrev"></div>
            <div class="next icon-xiangyou trun-item" @click="toNext"></div>
          </div>
          <div class="nav  col-md-6 col-sm-4 col-xs-9">
            <!-- <button @click="show">点击</button> -->
            <router-link to="/" class="item" :class="{con:isCon == 0}" @click.native="isCon = 0">主页</router-link>
            <router-link to="/explore" class="item" :class="{con:isCon == 1}" @click.native="isCon = 1">发现</router-link>
            <router-link to="/community" class="item" :class="{con:isCon == 2}" @click.native="isCon = 2">社区</router-link>
          </div>
          <div class="search  col-md-5 col-sm-6 hidden-xs">
            <span class="icon-sousuo"></span>
            <input type="text" v-model="keyWord">
          </div>
        </div>
    </div>
    <keep-alive>
      <router-view @call="callBack"/>
    </keep-alive>
    <transition name="up"> 
      <MusicPlayer ref='child'/>
    </transition>

  </div>
</template>

<script>
// import {mapActions,mapState} from 'vuex'
import MusicPlayer from './components/MusicPlayer'
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
    callBack(){
      this.$refs.child.changIndex()
    }
    // ...mapActions(['dataMusic'])
  },
  mounted(){
    // this.dataMusic(15)
  },
  components:{
    MusicPlayer
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
      padding: 0 155px;
      background-color: rgba(255,255,255,.8);
      // background-color: skyblue;

      .box{
        display: flex;
        align-items: center;
        height: 100%;
        // padding: 0 155px;
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
          left: 50px;
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

    .up-leave-to,
    .up-enter{
      transform: translateY(100%);
    }

    .up-enter-active,
    .up-leave-active{
      transition: all 1s ease;
    }

    .up-enter-to,
    .up-leave{
      transform: translateY(0);
    }

  
  }
</style>

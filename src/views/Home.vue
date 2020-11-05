<template>
  <div class="home">
    
    <div class="carousel" ref="wrapper">
      <transition-group name="animate" tag="ul" class="box">
        <li v-for="(item,index) in hostBanner" :key="'img:'+item.imageUrl" v-show="conIndex == index"> 
          <img :src='item.imageUrl' /> 
        </li>
      </transition-group>
      <span class="icon-xiangzuo" @click="reduc"></span>
      <span class="icon-xiangyou" @click="add"></span>
      <div class="circle">
        <div v-for="(item,index) in hostBanner" :key="item.imageUrl" class="item" :class="{con:conIndex == index}" @mouseover="conIndex = index"></div>
      </div>
    </div>

    <DisplayItem title="热门推荐" :dataOjb="recommend"/>
    <!-- <NewSongdisplay title="新碟上架" :dataOjb="newSongs"/> -->
    <DisplayItem title="最新专辑" :dataOjb="newest"/>
    <!-- <DisplayItem title="推荐歌手" :dataOjb="hostArtists"/> -->
    <DisplayItem title="榜单" :dataOjb="hdToplist"/>

    <br>
    <br>
    <br>
    <br>
    <br>
    <br>
    <br>
    <br>
    <br>
    <br>
    <br>
    <br>
    <br>
    <br>
    <br>
    <br>
    <br>
    <br>
    <br>
    <br>
    <br>
    <br>
    <br>
    <br>
    <br>
    <br>
    <br>
    <br>
    <br>
    <br>
    <br>
    <br>
    <br>
    <br>
    <br>
    <br>
    <br>
    <br>
    <br>
    <br>
  </div>
</template>

<script>
import {mapActions,mapState,mapGetters} from 'vuex'
import DisplayItem from '../components/DisplayItem'
// import NewSongdisplay from '../components/NewSongdisplay'
export default {
  components: {
    DisplayItem,

  },
  computed:{
    ...mapState(['recommend','newSongs','newest','hostArtists','hostTopList','hostBanner','playList']),
    ...mapGetters(['hdToplist'])
  },
  data(){
    return{
      srcName:[
        {id:1,src:require('../assets/images/轮播图1.jpg')},
        {id:2,src:require('../assets/images/轮播图2.jpg')},
        {id:3,src:require('../assets/images/轮播图3.jpg')},
        {id:4,src:require('../assets/images/轮播图4.jpg')},
        {id:5,src:require('../assets/images/轮播图5.jpg')},
      ],
      conIndex:0
    }
  },
  mounted(){
  // 页面渲染完成后
    this.$nextTick(()=>{
        if(this.timer){
          clearInterval(this.timer)
        }
        // 启动自动轮播图
        this.timer = setInterval(() => {
          this.conIndex++
          if(this.conIndex>this.hostBanner.length-1){
            this.conIndex = 0
          }
        }, 4000);

        // 鼠标移上清除定时器
        this.$refs.wrapper.onmouseenter = ()=>{
          clearInterval(this.timer)
        }

        // 鼠标移开开始定时器
        this.$refs.wrapper.onmouseleave = ()=>{
          clearInterval(this.timer)
          this.timer = setInterval(() => {
            this.conIndex++
            if(this.conIndex>this.hostBanner.length-1){
              this.conIndex = 0
            }
          }, 4000);
        }
    });

    

   
  },
  created(){
    this.dataMusic(12);
    this.newSong(12);
    this.nest(12);
    this.hostArtist(12);
    this.topList(12);
    this.banner();
  },
  beforeDestroy(){
    clearInterval(this.timer)
  },
  methods:{

    reduc(){
      if(this.conIndex == 0){
        this.conIndex = this.hostBanner.length-1
      }else{
        this.conIndex--;
      }
    },

    add(){
      if(this.conIndex == this.hostBanner.length-1){
        this.conIndex = 0
      }else{
        this.conIndex++;
      }
    },

    show(){
      console.log(this.recommend)
    },

    ...mapActions(['dataMusic','newSong','nest','hostArtist','topList','banner','playlistDetail'])
    
  }
}
</script>

<style lang="scss" scoped>
  .home{
    padding-top: 84px;
  }
  .carousel{
    position: relative;
    margin-top: 100px;
    height: 390px;
    width: 1000px;
    margin: 0 auto;
    
    .box{
      position: relative;
      width: 100%;
      height: 100%;
      overflow: hidden;
      img{
        width: 100%;
        position: absolute;
        top: 0;
        left: 0;
      }
    }

    .icon-xiangzuo{
      position: absolute;
      top:50%;
      transform: translateY(-50%);
      left: -80px;
      font-size: 50px;
      color:#ebebeb;
      height: 60px;
      width: 60px;
      border-radius: 10px;
      text-align: center;
      line-height: 60px;

      &:hover{
        background-color: #ebebeb;
        color:#fff;
      }
    }

    .icon-xiangyou{
      position: absolute;
      top:50%;
      transform: translateY(-50%);
      right: -80px;
      font-size: 50px;
      color:#ebebeb;
      height: 60px;
      width: 60px;
      border-radius: 10px;
      text-align: center;
      line-height: 60px;

      &:hover{
        background-color: #ebebeb;
        color:#fff;
      }
    }

    .circle{
      width: 30%;
      height: 30px;
      position: absolute;
      bottom: 40px;
      left: 50%;
      transform: translateX(-50%);
      display: flex;
      justify-content: space-around;
      align-items: center;

      .item{
        height: 10px;
        width: 10px;
        border-radius: 50%;
        background-color: rgba(255,255,255,.2);

        &.con{
          background-color: rgba(255,255,255,.7);
        }


      }
    }
  }

  .animate-enter{
    opacity: 0;
  }
  .animate-enter-active,.animate-leave-active{
    transition: all 1.5s linear;
  }
  .animate-enter-to,.animate-leave{
    opacity: 1;
  }
  .animate-leave-to{
    opacity: 0;
  }
</style>

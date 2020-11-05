<template>
  <div class="explore">
    <HeaderTitle title="发现"/>

    <div class="hot-tag" v-if="allList && hotList">
      <TagButton class="tag-item" :tagName="allList.all.name" @click.native="chDiscover(allList.all.name)"/>
      <TagButton class="tag-item" v-for="(item,index) in hotList" :key="index" :tagName="item.name" @click.native="chDiscover(item.name)"/>
      <TagButton class="tag-item" tagName="..." @click.native="isShowAll =!isShowAll"/>
      <div class="all-tag" v-show="isShowAll">
        <ClassList :classList="language" title="语种" :hotList="hotList"/>
        <ClassList :classList="style" title="风格" :hotList="hotList"/>
        <ClassList :classList="scene" title="场景" :hotList="hotList"/>
        <ClassList :classList="emotion" title="情感" :hotList="hotList"/>
        <ClassList :classList="theme" title="主题" :hotList="hotList"/>
      </div>
    </div>

    <DisplayItem title="网友精选" :dataOjb="discoverList"/>
  </div>
</template>

<script>
import {mapActions,mapState} from 'vuex'
import HeaderTitle from '../components/HeaderTitle'
import TagButton from '../components/TagButton'
import ClassList from '../components/ClassList'
import DisplayItem from '../components/DisplayItem'
export default {
  created(){
    this.playListHot()
    this.playListAll()
    this.getSongList({limit:12,order:'hot',name:'全部歌单'})
  },
  data(){
    return{
      isShowAll:false,
      TagList:'',
    }
  },
  components:{
    HeaderTitle,
    TagButton,
    ClassList,
    DisplayItem
  },
  
  methods:{
    chDiscover(itemName){
      this.getSongList({limit:12,order:'hot',name:itemName})
    },
    ...mapActions(['playListHot','playListAll','getSongList'])
  },
  computed:{
    // 语种列表
    language(){
      return this.allList.sub.filter(item => {
        if(item.category == 0){
          return true
        }
        return false
      })
    },
    // 风格列表
    style(){
      return this.allList.sub.filter(item => {
        if(item.category == 1){
          return true
        }
        return false
      })
    },
    // 场景列表
    scene(){
      return this.allList.sub.filter(item => {
        if(item.category == 2){
          return true
        }
        return false
      })
    },
    // 情感列表
    emotion(){
      return this.allList.sub.filter(item => {
        if(item.category == 3){
          return true
        }
        return false
      })
    },
    // 主题列表
    theme(){
      return this.allList.sub.filter(item => {
        if(item.category == 4){
          return true
        }
        return false
      })
    },
    
    ...mapState(['hotList','allList','discoverList'])
  }
}
</script>

<style lang="scss" scoped>
    .explore{
      padding-top: 64px;

      .hot-tag{
        display: flex;
        flex-wrap: wrap;
        position: relative;

        .tag-item{
          margin: 5px 10px;
          cursor: pointer;
        }
        
        .all-tag{
          width: 100%;

          padding: 10px 20px;
          background-color: #f5f5f7;
          border-radius: 10px;
        }
      }

    }
</style>

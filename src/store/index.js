import Vue from 'vue'
import Vuex from 'vuex'
import actions from './action'
import mutations from './mutations'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // 主页显示的数据 只拿12个demo
    recommend:'',
    newSongs:'',
    newest:'',
    hostArtists:'',
    hostTopList:'',
    hostBanner:'',

    // 播放列表
    // 获取歌单详情
    playList:'',

    // 获取播放歌曲路由
    songUrlDetail:[],

    // 判断播放列表请求完毕
    isDoneList:'',

    // 判断歌曲是否可用
    checkmusiclist:[],

    // 当前播放id
    currSongId:'',

    // 判读是否离开过歌单列表路由
    isLeave:false,

    // 歌单显示的列表
    playingTracks:[],

    // 当前播放歌曲信息
    playingMassge:'',

    // 当前播放歌词
    lyric:'',

    // 热门歌单分类
    hotList:'',

    // 全部歌单分类
    allList:'',

    // 发现歌单
    discoverList:''
  },
  getters:{
    // 处理数组 只获取前12种榜单
    hdToplist(state){
      if(state.hostTopList){
        return state.hostTopList.filter((item,index)=>{
          return index < 12
        })
      }
      return ''
    },

    // 当前可播放播放歌单id
    // ableSongList(state){
    //   let listId = []
    //   for(let i =0;i<state.playList.privileges.length;i++){
    //     for(let j = 0;j<state.checkmusiclist.length;j++){
    //       if(state.playList.privileges[i].id == state.checkmusiclist[j].id && state.checkmusiclist[j].success){
    //         listId.push(state.playList.privileges[i].id)
    //       }
    //     }
    //   },
    // }
  },
  mutations,
  actions
})

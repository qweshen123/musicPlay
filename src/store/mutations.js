import * as types from './mutation-types'
import {} from './action'
export default {
    [types.SET_RECONMEND](state,data){
        state.recommend = data
    },

    [types.SET_NEWSONG](state,data){
        state.newSongs = data
    },

    [types.SET_NEWEST](state,data){
        state.newest = data
    },

    [types.SET_HOSTARTIST](state,data){
        state.hostArtists = data
    },

    [types.SET_TOPLIST](state,data){
        state.hostTopList = data
    },

    [types.SET_BANNER](state,data){
        state.hostBanner = data
    },

    [types.SET_PLAYLIST](state,data){
        state.playList = data
    },

    [types.SET_SONGURL](state,data){
        state.songUrlDetail.push(data)
    },
    

    [types.SET_CHECKMUSIC](state,data){
        state.checkmusiclist.push(data) 
    },

    [types.SET_EMPTY](state){
        state.checkmusiclist.length = 0
    },

    [types.SET_CURRSONG](state,data){
        state.currSongId = data
    },

    [types.SET_EMPTYSONGLIS](state){
        state.songUrlDetail.length = 0

    },

    [types.SET_CHANGLEAVE](state,isflag){
        state.isLeave = isflag
    },

    [types.SET_PLAYINGTRACKS](state,data){
        state.playingTracks = data
    },

    [types.SET_PLAYINGMASSGE](state,data){
        state.playingMassge = data
    },

    [types.SET_LYRIC](state,data){
        state.lyric = data
    },

    [types.SET_PLAYLISTHOT](state,data){
        state.hotList = data
    },

    [types.SET_PLAYLISTALL](state,data){
        state.allList = data
    },
    

    [types.HEANDEL_PLAYLISTALL](state,obj){
        // 是否存在
        let flag = false
        for(let i =0;i<state.hotList.length;i++){
            // 存在
            if(state.hotList[i].name == obj.name){
                flag = true
                break
            }
        }

        if(flag){
            state.hotList = state.hotList.filter((item)=>{
                if(item.name == obj.name){
                    return false
                }
                return true
            })
        }else{
            // 不存在添加
            state.hotList.push(obj)
        }
    },

    [types.SET_DISCOVERLIST](state,data){
        state.discoverList = data
    },
    // 更改当前是否播放列表加载完毕
    [types.SET_ISDONELIST](state,data){
        state.isDoneList = data
    },
}
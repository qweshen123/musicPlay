import * as types from './mutation-types'
import axios from 'axios'
import api from '../api'

export default{
    
    dataMusic(context,amount){

        axios.get(api.API.api.recommend, {
        params: {
            limit: amount
        }
        })
        .then(res => {
            context.commit(types.SET_RECONMEND,res.data.result)
        })
    },

    newSong(context,amount){

        axios.get(api.API.api.top, {
        params: {
            limit: amount
        }
        })
        .then(res => {
            context.commit(types.SET_NEWSONG,res.data.monthData)
        })
    },

    nest(context,amount){

        axios.get(api.API.api.newest, {
        params: {
            limit: amount
        }
        })
        .then(res => {
            context.commit(types.SET_NEWEST,res.data.albums)
        })
    },

    hostArtist(context,amount){

        axios.get(api.API.api.recommendArtists, {
        params: {
            limit: amount
        }
        })
        .then(res => {
            context.commit(types.SET_HOSTARTIST,res.data.artists)
        })
    },

    topList(context){

        axios.get(api.API.api.topList)
        .then(res => {
            context.commit(types.SET_TOPLIST,res.data.list)
        })
    },

    banner(context){ 

        axios.get(api.API.api.banner)
        .then(res => {
            context.commit(types.SET_BANNER,res.data.banners)
        })
        .catch(err => console.log(err))
    },

    playlistDetail(context,id){ 

        axios.get(api.API.api.playlistDetail,{
            params: {
             id
            }
        })
        .then(res => {
            let arrPrivileges
            if(res.data.privileges.length>10){

                arrPrivileges = res.data.privileges.slice(0,10)
            }else{
                arrPrivileges = res.data.privileges
            }
            
            context.commit(types.SET_PLAYLIST,res.data)
            
            for(let i = 0;i<arrPrivileges.length;i++){
                let id = arrPrivileges[i].id
                axios.get(api.API.api.checkMusic,{
                        params:{
                            id
                        }
                })
                .then(() =>{
                    context.commit(types.SET_CHECKMUSIC,{id,success:true})
                })
                .catch(() => {
                    context.commit(types.SET_CHECKMUSIC,{id,success:false})
                })
            }
           
        })
        .catch(err => console.log(err))
    },

    songUrl(context,allowList){
        allowList.forEach(element => {
            let id = element.id
            axios.get(api.API.api.songUrl,{
                params:{
                    id
                }
            })
            .then(res =>{
                context.commit(types.SET_SONGURL,res)
            })
            .catch(err => console.log(err))
        });
        
    },

    checkMusic(context,id){
        axios.get(api.API.api.checkMusic,{
            params:{
                id
            }
        })
        .then(() =>{
            context.commit(types.SET_CHECKMUSIC,{id,success:true})
        })
        .catch(() => {
            context.commit(types.SET_CHECKMUSIC,{id,success:false})
        })
    },

    getLyric(context,id){
        axios.get(api.API.api.lyric,{
            params:{
                id
            }
        })
        .then((res) =>{
            context.commit(types.SET_LYRIC,res.data.lrc.lyric)
        })
        .catch((err) => {
            console.log(err)
        })
    },

    playListHot(context){
        axios.get(api.API.api.playListHot)
        .then((res) =>{
            context.commit(types.SET_PLAYLISTHOT,res.data.tags)
        })
        .catch((err) => {
            console.log(err)
        })
    },

    playListAll(context){
        axios.get(api.API.api.catList)
        .then((res) =>{
            context.commit(types.SET_PLAYLISTALL,res.data)
        })
        .catch((err) => {
            console.log(err)
        })
    },
    // 歌单精选 cat:(华语 catlist接口)对应 limit:50 offset order:new or hot
    getSongList(context,{limit=10,order='hot',name}){
        axios.get(api.API.api.getPlayList,{
            params:{
                limit,
                order,
                cat:name
            }
        })
        .then((res) =>{
            context.commit(types.SET_DISCOVERLIST,res.data.playlists)
        })
        .catch((err) => {
            console.log(err)
        })
    }

    
}
import * as types from './mutation-types'
import axios from 'axios'
import api from '../api'
import vm from '../main'
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

            if(res.data.privileges){
                // console.log(res)
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
            }else{
                context.commit(types.SET_PLAYLIST,false)
            }
            
           
        })
        .catch(() => context.commit(types.SET_PLAYLIST,404))
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
            if(res.data.lrc){
                context.commit(types.SET_LYRIC,res.data.lrc.lyric)
                return;
            }else{
                context.commit(types.SET_LYRIC,false)
            }
            
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
    },

    // 手机登录
    loginPhone(context,{phone,password}){
        axios.get(api.API.api.phoneLogin,{
            params:{
                phone,
                password
            }
        })
        .then((res) => {

            // 保留cookie
            // let arr = res.data.cookie.split(/\;/)
            // console.log(arr)
            // arr = arr[10].split(/\=/)
            // context.commit(types.SET_USERCOOKIE,arr[1])

            axios.get(api.API.api.userList,{
                params:{
                        uid:res.data.bindings[0].userId
                    }
            })
            .then(res => {
                // console.log(res.data.playlist)
                // NMTID=00O-KQxc4EmWGcBLEZJl5_ZHmCjMdwAAAF1q_Pd6A; __csrf=4684cb537dcf541c67c2a1c5256df51a; MUSIC_U=c3ced0ba16669f849587d25d919abb1506ad104816f62930dc686f729bdf25b133a649814e309366; __remember_me=true
                // console.log(document.cookie.split(/\;/))
                // console.log(document.cookie);
                let flag = /(MUSIC_U)=(\w+);/g.test(document.cookie);
                // console.log(flag)
                // console.log(RegExp.$1)
                // console.log(RegExp.$2)
                // console.log(`${RegExp.$1}=${RegExp.$2}`)
                context.commit(types.SET_USERPLAYLIST,res.data.playlist)
                let myLoveSongsList = res.data.playlist[0]
                axios.get(api.API.api.playlistDetail,{
                    params:{
                        id:myLoveSongsList.id,
                        cookie:`${RegExp.$1}=${RegExp.$2}`
                    }
                })
                .then(res =>{
                    // console.log(res.data.playlist.tracks)
                    // 我喜爱的音乐列表
                    // console.log(res.data)
                    context.commit(types.SET_LOVESONGLIST,res.data)
                    // 更改登录状态
                    context.commit(types.IS_LOGIN,true)
                })
                .catch(err => {
                    console.log(err)
                })
                vm.$router.push({path:'/library'})
            })
            .catch(err => {
                console.log(err)
            })

        })
        .catch((err) => {
            console.log(err)
        })
    },

    // 退出登录
    outLogin(context){
        axios.get(api.API.api.out)
        .then((res) =>{
            // 退出成功后消除cookie
            context.commit(types.SET_USERCOOKIE,'')
        })
        .catch((err) => {
            console.log(err)
        })
    },

    // // 退出登录
    mineToSongList(context,songList){
        
        let arrPrivileges

        if(songList.privileges){
            // console.log(res)
            if(songList.privileges.length>10){

                arrPrivileges = songList.privileges.slice(0,10)
            }else{
                arrPrivileges = songList.privileges
            }
            context.commit(types.SET_PLAYLIST,songList)
            
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
        }else{
            context.commit(types.SET_PLAYLIST,false)
        }
             
    },

    // 搜索跳转
    search(context,keywords){
        axios.get(api.API.api.searchDetail,{
            params:{
                keywords
            }
        })
        .then((res) =>{
            console.log(res)
            context.commit(types.SET_SEARCHRESULT,res.data.result)
            vm.$router.push({path:'/search'})
        })
        .catch((err) => {
            console.log(err)
        })
    },

    
}
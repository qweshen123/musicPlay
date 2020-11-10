let baseUrl = 'http://localhost:3000';
let API = {
    api:{
        // 热门推荐
        recommend:baseUrl + '/personalized', // 推荐歌单 
        // 新碟上架 参数 limit offset area type year month
        top:baseUrl + '/top/album', 
        // 最新专辑
        newest:baseUrl + '/album/newest', 
        // 热门歌手
        recommendArtists:baseUrl + '/top/artists',
        // 所有榜单
        topList:baseUrl + '/toplist',
        // 轮播图
        banner:baseUrl + '/banner',
        // 获取歌单详情
        playlistDetail:baseUrl + '/playlist/detail',
        // 获取音乐url
        songUrl:baseUrl + '/song/url',
        // 音乐是否可用
        checkMusic:baseUrl + '/check/music',
        // 获取歌词
        lyric:baseUrl + '/lyric',
        // 歌单分类 
        catList:baseUrl + '/playlist/catlist',
        // 热门歌单分类
        playListHot:baseUrl + '/playlist/hot',
        // 歌单精选 cat:(华语 catlist接口)对应 limit:50 offset order:new or hot
        getPlayList:baseUrl+'/top/playlist',
        // 手机登录 phone&password
        phoneLogin:baseUrl + '/login/cellphone',
        // 用户详情 phone&password
        userDetail:baseUrl + '/user/detail',
        // 退出登录
        out:baseUrl + '/logout',
        // 获取用户歌单
        userList:baseUrl + '/user/playlist',
        // 获取用户歌单
        searchDetail:baseUrl + '/cloudsearch'

    }
}
export default {
    API:API
}
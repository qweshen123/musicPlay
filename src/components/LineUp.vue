<template>
    <div class="line-up">
        <div class="play-box">
            <div class="play-title">
                播放列表
            </div>
            <div class="song-list" v-if="newPlayList">
                <SongListItem v-for="(item,index) in newPlayList" :key="index" :songdetail="item" @callb="sendId" :currId="playingMassge.id"/>
            </div>
        </div>

        <div class="song-lyric-box" v-if="playingMassge">
            <div class="song-title">
                正在播放:{{playingMassge.name}}
            </div>
            <div class="box" ref="lyricBox">
                <div class="song-lyric" ref="songBox">
                    <!-- <p v-for="(item,index) in arr" :key="index" :class="{active:curentIndex==index}">{{item.lyc}}</p> -->
                    <p v-if="arr[curentIndex-2]">{{arr[curentIndex-2].lyc}}</p>
                    <p v-if="arr[curentIndex-1]">{{arr[curentIndex-1].lyc}}</p>
                    <p v-if="arr[curentIndex]" class="active">{{arr[curentIndex].lyc}}</p>
                    <p v-if="arr[curentIndex+1]">{{arr[curentIndex+1].lyc}}</p>
                    <p v-if="arr[curentIndex+2]">{{arr[curentIndex+2].lyc}}</p>
                </div>
            </div>
        </div>

        <div class="mark" @click="hideMark"></div>
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
import SongListItem from './SongListItem'
import {mapState} from 'vuex'
export default {
    props:['playingMassge','newPlayList','currTime','songTime'],
    components:{
       SongListItem
    },
    data(){
        return{
            curentIndex:0
        }
    },
    methods:{
        hideMark(){
            this.$emit('callHide')
        },
        show(){

        },
        sendId(id){
            this.$emit('sendId',id)
        },
        changHeight(curentTime){

            // forEach不能写break
            for(let index = 0;index<this.arr.length;index++) {
                if(index == this.arr.length-1){
                    this.curentIndex = index;
                    break;
                }
                if(curentTime<this.arr[index+1].time && curentTime>this.arr[index].time){
                    this.curentIndex = index;
                    break;
                }
            }


            // let topHeight = this.$refs.lyricBox.offsetHeight/2
            // this.$refs.songBox.style.top = (-(this.curentIndex/this.arr.length)*this.$refs.songBox.offsetHeight)+topHeight + 'px'
        },
    },
    computed:{
        arr(){
            let arr = this.lyric.split(/\n/)
            arr = arr.map(l=>{
                /\[(\d+):(\d+\.\d+)\](.+)/.test(l)
                return {
                    time:parseInt(RegExp.$1) * 60 + parseFloat(RegExp.$2,),
                    lyc:RegExp.$3
                }
            })
            var res = [arr[0]];
            for(var i=1; i<arr.length; i++){
                var repeat = false;
                for(var j=0; j<res.length; j++){
                    if(arr[i].time === res[j].time){
                        repeat = true;
                        break;
                    }
                }
                if(!repeat){
                    res.push(arr[i]);
                }
            }
            return res;
        },

        
        ...mapState(['lyric'])
    }
}
</script>

<style lang="scss" scoped>
    .line-up{
        border-radius: 5px 5px 0 0;
        position: absolute;
        bottom: 66px;
        left: 200px;
        right: 200px;
        height: 40vh;
        background-color: skyblue;
        z-index: -1;
        display: flex;

        .play-box{
            z-index: 1;
            width:60%;
            padding: 0 20px;

            .play-title{
                width: 100%;
                height: 40px;
                line-height: 40px;
                
            }

            .song-list{
                width: 100%;

            }
        }

        .song-lyric-box{
            flex: 1;
            z-index: 1;
            
            display: flex;
            flex-direction: column;
            .song-title{
                height: 40px;
                width: 100%;
                text-align: center;
                z-index: 10;
                line-height: 40px;
            }

            .box{
                width: 100%;
                flex: 1;
                overflow: hidden;
                .song-lyric{
                    position: relative;
                    z-index: -1;
                    width: 100%;
                    height: 100%;
                    display: flex;
                    flex-direction: column;
                    justify-content: space-around;
                    
                    p{
                        text-align: center;
                        transition: all .5 ease;
                        &.active{
                            color:#fff;
                            font-weight: 600;
                        }
                    }
                }

            }


        }

        .mark{
            position: fixed;
            left: 0;
            top: 64px;
            right: 0;
            bottom: 64px;
            background-color: rgba(255,255,255,.3);
            z-index: -1;
        
        }
    }
</style>
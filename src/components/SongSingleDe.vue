<template>
    <div class="song-single-de" >
        <div class="items">
            <img :src="songdetail.al.picUrl">
            <div class="detail">
                <div class="author-song">
                    <div class="song-name">{{songdetail.name}}</div>
                    <div class="author-name">{{songdetail.ar[0].name}}</div>
                </div>
                <div class="album-name">{{songdetail.al.name}}</div>
                <div class="time-name">{{songdetail.dt|setminute}}</div>
            </div>
        </div>
    </div>
</template>

<script>
import {setminute} from '../assets/js/setminute'
export default {
    props:['songdetail'],
    filters:{
        setminute
    },
    methods:{
        musicPlayer(){
            
        }
    }
}
</script>

<style lang="scss" scoped>

    .song-single-de{
            

            .items{
                display: flex;
                padding: .5vw;
                border-radius: 1vw;
                &:hover{
                    background-color: #eaeffd;
                }

                &.con{
                    opacity: .4;
                    cursor: not-allowed;
                }
                img{
                    width: 5vw;
                    margin-right: 1vw;
                    border-radius: 1vw;
                }

                .detail{
                    flex: 1;

                    display: flex;
                    justify-content: space-between;
                    align-items: center;

                    
                }

                .author-song{
                    width: 20vw;


                    .song-name{
                        font-weight: 600;
                        font-size: 1.2vw;
                    }

                    .author-name{
                        font-size: .8vw;
                    }
                }

                .album-name{
                    font-size:1vw;
                    width: 25vw;
                }

                .time-name{
                    width: 10vw;
                    font-size:1vw;
                    text-align: right;
                }
            }
        }

</style>
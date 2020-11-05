<template>
    <div class="song-single-de" @dblclick="call(songdetail.id)">
        <div class="song-name">{{songdetail.name}}</div>
        <div class="detail">
            <div class="author-name">{{songdetail.ar[0].name}}</div>
            <div class="time-name">{{songdetail.dt|setminute}}</div>
        </div>
        <span class="icon-bofang1" v-show="currId == songdetail.id"></span>
    </div>
</template>

<script>
import {setminute} from '../assets/js/setminute'
import {mapActions} from 'vuex'
export default {
    props:['songdetail','currId'],
    filters:{
        setminute
    },
    methods:{
        call(id){
            this.$emit('callb',id)
            this.getLyric(id)
        },
        ...mapActions(['getLyric'])
    },
}
</script>

<style lang="scss" scoped>
    .song-single-de{
        position: relative;
        width: 100%;
        display: flex; 
        justify-content: space-between;
        cursor: pointer;

    
        .song-name{
            flex: 1;
        }


        .detail{
            width: 20%;
            display: flex;

            .author-name{
                width: 65%;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
            }

            .time-name{
                flex: 1;
                margin-left: 10px;
            }
        }

        .icon-bofang1{
            position: absolute;
            left: -15px;
            top: 50%;
            transform: translateY(-50%);
        }
    }

</style>
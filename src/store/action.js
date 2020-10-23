import {SET_RECONMEND} from './mutation-types'
import axios from 'axios'
import api from '../api'

export default{
    
    dataMusic(context,amount){
        // /personalized limit
        axios.get(api.API.api.recommend, {
        params: {
            limit: amount
        }
        })
        .then(res => {
            context.commit(SET_RECONMEND,res.data.result)
        })
    }
}
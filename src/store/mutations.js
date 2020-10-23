import * as types from './mutation-types'

export default {
    [types.SET_RECONMEND](state,data){
        state.recommend = data
    }
}
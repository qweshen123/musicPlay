import {Button,Form,FormItem,Input} from 'element-ui'

const elements = [Button,Form,FormItem,Input]

export default {
    /**
     * Vue.use 方法会自动调用install函数
     * Install Vant Component plugin
     * @param Vue
     */
    install(Vue) {
        elements.forEach(Component => {
            Vue.use(Component)
        })
    }

}
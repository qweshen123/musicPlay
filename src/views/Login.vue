<template>
  <div class="login">
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="邮箱" v-if="isEmil">
        <el-input v-model="form.name" @change="emptyWarning"></el-input>
      </el-form-item>
      <el-form-item label="手机号" v-else>
        <el-input v-model="form.phoneNum" @change="emptyWarning"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="form.password"></el-input>
      </el-form-item>
      <div class="warn">{{warning}}</div>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">登录</el-button>
        <el-button @click="empty">清空</el-button>
      </el-form-item>
    </el-form>
    <p @click="isEmil =! isEmil">{{tiSi}}</p>
  </div>
</template>

<script>
import {mapActions} from 'vuex'
export default {
    data(){
        return{
            form: {
                name: '',
                password:'',
                phoneNum:'',
            },
            // 是否emil登录
            isEmil:true,
            warning:'',
        }
    },

    methods:{
        onSubmit(){
            // 手机登录
            if(!this.isEmil){
                // 判断是否是正确手机号
                if(/^1[34578]\d{9}$/.test(this.form.phoneNum) && this.form.password.length>=6){
                    this.loginPhone({phone:this.form.phoneNum,password:this.form.password})
                }else{
                    this.warning = '请输入正确的手机号和密码'
                    return false;
                }

            }
        },

        empty(){
            this.form.name = ''
            this.form.password = ''
            this.form.phoneNum = ''
        },

        emptyWarning(){
            
            this.warning = ''
        },

        ...mapActions(['loginPhone'])
    },

    computed:{
        tiSi(){
            if(this.isEmil){
                return '使用手机登录'
            }
            return '使用邮箱登录'
        }
    },

    beforeRouteLeave (to, from, next) {
        this.$emit('showNav')
        next()
    }
};
</script>

<style lang="scss" scoped>
    .login{
        padding: 0 30%;

        p{
            text-align: center;
            cursor: pointer;
        }

        .warn{
            text-align: center;
            color:red;
        }
    }
</style>
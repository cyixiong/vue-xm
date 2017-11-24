<template>
  <div class="tmpl">
      <div  class="login">
        <img src="../../../staict/img/logo.png" alt="">
        <div>
          <ul>
            <li><input type="text" v-model="user.uname"></li>
            <li><input type="password" v-model="user.upwd"></li>
            <li><el-button @click="login">登录</el-button></li>
          </ul>
        </div>
      </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        user:{
          uname:'admin',
          upwd:'123456'
        }
      }
    },
    methods: {
      login(){
        var url = '/admin/account/login';
        this.$ajax.post(url,this.user).then(res=>{
          if (res.data.status == 1) {
            this.$message.error(res.data.message);
            return;
          }
            console.log(1111);
          this.$router.push({name:'goodslist'});
        })
      }
    }
  }
</script>
<style scoped>
  .tmpl{
    background-color: #0094ff;
  }
  .tmpl .login{
    width: 300px;
    height: 642px;
    margin: 0 auto;
    padding: 50px;

  }
  .login img{
    margin-left: 70px;
  }
  .login li{
    list-style: none;
    padding:5px;
    text-align: center;
  }
</style>
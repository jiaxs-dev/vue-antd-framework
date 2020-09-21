<template>
  <div class="login-wrap">
    <a-form :form="form" :wrapper-col="{ span: 20 ,offset:2}" size="large" @submit="handleSubmit"
            class="login-container">
      <h2 class="title">大数据可视化中心</h2>
      <a-form-item style="margin-bottom: 24px">
        <a-input placeholder="用户名" size="large" id="userName"
                 v-decorator="['userName', { rules: [{ required: true, message: '请输入用户名!' }] }]">
          <a-icon slot="suffix" type="user"/>
        </a-input>
      </a-form-item>
      <a-form-item style="margin-bottom: 24px">
        <a-input-password size="large" id="password"
                          v-decorator="['password', { rules: [{ required: true, message: '请输入密码!' }] }]"
                          placeholder="密码"/>
      </a-form-item>
      <a-form-item style="margin-bottom: 24px">
        <a-checkbox style="color: #FFFFFF" v-model="rememberPwd">
          记住密码
        </a-checkbox>
      </a-form-item>

      <a-form-item :wrapper-col="{ span: 20 ,offset: 2}">
        <a-spin tip="Loading..." :spinning="loading">
          <a-button type="primary" size="large" style="width: 100%" html-type="submit">
            登录
          </a-button>
        </a-spin>
      </a-form-item>
    </a-form>
  </div>
</template>

<script>
  export default {
    name: 'login',
    components: {},
    data() {
      return {
        form: this.$form.createForm(this, {name: 'login-form'}),
        loading: false,
        rememberPwd: true
      }
    },
    mounted() {

    },
    methods: {
      handleSubmit(e) {
        e.preventDefault();
        this.form.validateFields((error) => {
          if (!error) {
            this.loading = true;
            loginApi({
              userName: this.form.getFieldValue('userName'),
              password: this.form.getFieldValue('password')
            }).then(res => {
              if (res.code == 200) {
                this.loading = false;
                if (this.rememberPwd == false) {
                  removeCookie('userName');
                  removeCookie('pwd');
                }
                const user = {
                  name: res.result.userName,
                  token: res.result.token,
                  userId: res.result.userId,
                  email: res.result.email,
                  userName: this.form.getFieldValue('userName')
                };

                this.$store.commit('account/setUser', user)
                setUser(user);
                setCookie('token', res.result.token, 120);
                setUsernamePwd(this.form.getFieldValue('userName'), this.form.getFieldValue('password'));
                this.$router.push('/')
              } else {
                this.$message.error(res.message)
              }
              this.loading = false;
            })
          }
        });
      }
    }
  }
</script>


<style scoped>
  @import "../../assets/css/login/login.css";
</style>

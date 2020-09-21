<template>
  <div>
    <a-dropdown>
      <div class="header-avatar" style="cursor: pointer;">
        <a-avatar style="backgroundColor:#87d068;width: 32px;height: 32px;line-height: 32px" class="avatar"
                  shape="circle">
          <a-icon slot="icon" type="user"/>
        </a-avatar>
        <span class="name">admin</span>
      </div>
      <a-menu :class="['avatar-menu']" slot="overlay">
        <a-menu-item>
          <a @click="resetpwd">
            <a-icon type="edit" style="margin-right: 10px;color: blue"/>
            <span>修改密码</span>
          </a>
        </a-menu-item>
        <a-menu-item>

          <a @click="logout">
            <a-icon type="poweroff" style="margin-right: 10px;color: red"/>
            <span>退出登录</span>
          </a>

        </a-menu-item>
      </a-menu>
    </a-dropdown>
    <a-modal
      title="修改密码"
      :visible="visible"
      @ok="handleOk"
      @cancel="handleCancel">
      <a-form-model ref="ruleForm" :model="ruleForm" :rules="rules" v-bind="layout">
        <a-form-model-item has-feedback label="密码" prop="pass">
          <a-input-password v-model="ruleForm.pass" placeholder="密码请设置6到20位字母数字组合" type="password"
                            autocomplete="off"/>
        </a-form-model-item>
        <a-form-model-item has-feedback label="确认密码" prop="checkPass">
          <a-input-password v-model="ruleForm.checkPass" placeholder="密码请设置6到20位字母数字组合" type="password"
                            autocomplete="off"/>
        </a-form-model-item>
      </a-form-model>
    </a-modal>
  </div>
</template>

<script>

  export default {
    name: 'HeaderAvatar',
    computed: {},
    data() {
      let validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          if (this.ruleForm.checkPass !== '') {
            this.$refs.ruleForm.validateField('checkPass');
          }
          callback();
        }
      };
      let validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.ruleForm.pass) {
          callback(new Error("两次密码输入不一致，请重新输入"));
        } else {
          callback();
        }
      };
      return {
        visible: false,
        confirmLoading: false,
        ruleForm: {
          pass: '',
          checkPass: ''
        },
        rules: {
          pass: [
            {
              validator: validatePass,
              trigger: 'change'
            },
            {
              pattern: '^[a-zA-Z0-9]{6,20}$',
              message: '密码格式输入有误，请任意输入6到20位字母或者数字',
              trigger: 'change'
            }
          ],
          checkPass: [
            {
              validator: validatePass2,
              trigger: 'change'
            },
            {
              pattern: '^[a-zA-Z0-9]{6,20}$',
              message: '密码格式输入有误，请任意输入6到20位字母或者数字',
              trigger: 'change'
            }
          ]
        },
        layout: {
          labelCol: {span: 4, offset: 1},
          wrapperCol: {span: 18},
        }
      }
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate(valid => {
          if (valid) {
            const pwd = window.btoa(this.ruleForm.pass);
            setStore('pwd', pwd);
            ResetPwd({
              password: pwd,
              userId: this.$store.state.account.user.userId,
            }).then(res => {
              if (res.code == 200) {
                this.visible = false;
                this.$message.success("密码修改成功，请重新登录");
                this.$store.commit('account/setUser', {})
                this.$store.commit('account/setLoginState', 401)
                removeCookie('token');
                removeCookie('user')
                removeCookie('menus')
                this.$router.push({
                  path: '/login'
                })
              } else {
                this.$message.error("密码修改失败");
              }
            })


          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      handleCancel() {
        this.visible = false;
        this.resetForm('ruleForm');
      },
      resetpwd() {
        this.visible = true;
      },
      handleOk() {
        this.submitForm('ruleForm');
      },
      logout() {
        const store = this.$store;
        const router = this.$router;
        this.$confirm({
          title: '确认退出平台吗?',
          onOk() {
            store.commit('account/setUser', {})
            store.commit('account/setLoginState', 401)
            removeCookie('token');
            removeCookie('user')
            removeCookie('menus')
            router.push({
              path: '/login',
              query: {
                code: 200
              }
            })
          },
          onCancel() {
            console.log('Cancel');
          }
        });


      }
    }
  }
</script>

<style lang="less">
  .header-avatar {
    display: inline-flex;
    float: right;

    .avatar, .name {
      align-self: center;
    }

    .avatar {
      margin-right: 8px;
    }

    .name {
      font-weight: 500;
      color: #FFFFFF;
    }
  }

  .avatar-menu {
    width: 150px;
  }

</style>

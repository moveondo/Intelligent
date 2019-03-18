<template>
  <div class="login-wrap">
    <div class="ms-title">同方证券智能投研系统</div>
    <div class="ms-login" v-if="step == 1">
      <el-form :model="ruleForm" ref="ruleForm" class="demo-ruleForm">
        <el-form-item prop="用户名">
          <el-input :placeholder="$t('login.inputUserName')" v-model="ruleForm.userName"></el-input>
        </el-form-item>
        <el-form-item prop="密码">
          <el-input type="password" :placeholder="$t('login.inputPassword')" v-model="ruleForm.password" @keyup.enter.native="submitForm"></el-input>
        </el-form-item>
        <div class="login-btn">
          <el-button type="primary" @click="submitForm">{{$t('login.login')}}</el-button>
        </div>
        <p class="forget-password" @click="step = 2">{{$t('login.forgetPassword')}}?</p>
      </el-form>
    </div>
    
    <div class="find-password" v-if="step == 2" >
      <p class="title">{{$t('login.retrievePassword')}}</p>
      <el-steps :active="active" finish-status="success">
        <el-step :title="$t('login.step') + '1'"></el-step>
        <el-step :title="$t('login.step') + '2'"></el-step>
      </el-steps>
      <el-form class="find-password-form" v-if="active == 0">
        <el-form-item>
          <el-input v-model="findPasswordForm.userName" :placeholder="$t('login.input1')"></el-input>
        </el-form-item>
        <div class="login-btn">
          <el-button type="primary" @click="findPasswordNext">{{$t('login.nextStep')}}</el-button>
        </div>
      </el-form>
      <el-form class="find-password-form" v-if="active == 1">
        <el-form-item :label="$t('login.verificationCode')">
          <el-input v-model="findPasswordForm.verificationCode"></el-input>
        </el-form-item>
        <el-form-item :label="$t('login.newPassword')">
          <el-input type="password" v-model="findPasswordForm.newPassword"></el-input>
        </el-form-item>
        <el-form-item :label="$t('login.sureNewPassword')">
          <el-input type="password" v-model="findPasswordForm.sureNewPassword"></el-input>
        </el-form-item>
        <div class="login-btn">
          <el-button type="primary" @click="upDataPassword">{{$t('login.finish')}}</el-button>
        </div>
      </el-form>
      <p class="forget-password" @click="step = 1">{{$t('login.login')}}</p>
    </div>

    <div class="ms-login" v-if="step == 3">
      <el-form :model="registerForm">
         <el-form-item :label="$t('login.email')" label-width="100px" >
              <el-input disabled v-model="registerForm.email"></el-input>
          </el-form-item>
          <el-form-item :label="$t('login.name')" label-width="100px" >
              <el-input v-model="registerForm.name"></el-input>
          </el-form-item>
          <el-form-item :label="$t('login.phone')" label-width="100px">
              <el-input v-model="registerForm.phone"></el-input>
          </el-form-item>
           <el-form-item :label="$t('login.userName')" label-width="100px" >
              <el-input v-model="registerForm.userName"></el-input>
          </el-form-item>
          <el-form-item :label="$t('login.password')" label-width="100px">
              <el-input type="password" v-model="registerForm.password"></el-input>
          </el-form-item>
          <el-form-item :label="$t('login.surePassword')" label-width="100px">
              <el-input type="password" v-model="registerForm.surePassword"></el-input>
          </el-form-item>
          <el-form-item :label="$t('login.inviteCode')" label-width="100px">
              <el-input v-model="registerForm.inviteCode"></el-input>
          </el-form-item>
      </el-form>
      <div class="login-btn">
          <el-button type="primary" @click="register">{{$t('login.signUp')}}</el-button>
      </div>
    </div>

    <div class="ms-bottom">同方证券版权所有 © 2017-2018  <a herf="http://www.miitbeian.gov.cn"> 闽ICP备16001208号-3 </a></div>
  </div>
</template>

<script>
  export default {
    data: function () {
      return {
        registerForm: {
          surePassword:'',
          inviteCode: '',
          userName: '',
          name: '',
          password: '',
          phone: '',
          email: ''
        },
        findPasswordForm: {},
        ruleForm: {
          userName: '',
          password: ''
        },
        step: 1,
        active: 0
      }
    },
    created() {
      if(this.$route.query.invitationCode) {
        this.step = 3
        this.queryEmail()
        return
      }

      let userName = localStorage.getItem('ms_username')
      let password = localStorage.getItem('ms_password')
      if(userName && password) {
        this.ruleForm.userName = userName
        this.ruleForm.password = password
        this.submitForm()
      }
    },
    methods: {
      async findPasswordNext() {
        let params = {}
        let reg = new RegExp("^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$")

        if(!this.findPasswordForm.userName) {
          this.$message.error(this.$t('message.empty'))
          return
        }

        if(reg.test(this.findPasswordForm.userName)) {
          params.email = this.findPasswordForm.userName
        }else {
          params.userName = this.findPasswordForm.userName
        }
        
        this.$store.commit('loadingChange',{text: this.$t('message.inRequest'),show: true})
        const result = await this.$store.dispatch('AC_UserForgetPasswordServiceEmailTOCode', params);
        this.$store.commit('loadingChange',{show: false})
        if(result.code != 200 || result.data.returnMsg != '验证码已发送') {
          this.$message.error(result.data.returnMsg)
          return
        }

        this.findPasswordForm.userName = result.data.userName
        this.active = 1;
      },

      async upDataPassword() {
        if(!this.findPasswordForm.verificationCode || !this.findPasswordForm.newPassword || !this.findPasswordForm.sureNewPassword) {
          this.$message.error(this.$t('message.empty'))
          return
        }

        if (this.findPasswordForm.newPassword != this.findPasswordForm.sureNewPassword) {
          this.$message.error(this.$t('login.confirmPassword'))
          return
        }

        const result = await this.$store.dispatch('AC_UserForgetPasswordServiceFindPassword', this.findPasswordForm);
        if(result.code != 200 || result.data.returnMsg != '修改密码成功'){
          this.$message.error(result.data.returnMsg)
          return
        }

        this.ruleForm.userName = this.findPasswordForm.userName
        this.ruleForm.password = this.findPasswordForm.newPassword
        this.submitForm()
      },

      async queryEmail() {
        let params = {
          invitationCode: this.$route.query.invitationCode
        }
        
        const result = await this.$store.dispatch('AC_UserServiceQueryUser', params);
        if(result.code != 200) {
            this.$message.error(result.data.returnMsg)
            return
        }
        if (!result.data.users || !result.data.users[0].email) {
          this.$message.error(this.$t('login.noEmail'))
          return
        }
        
        this.registerForm.email = result.data.users[0].email 
        this.registerForm.inviteCode = this.$route.query.invitationCode
      },

      async register() {
     
        for(let i in this.registerForm) {
          if(!this.registerForm[i]) {
            this.$message.error(this.$t('message.empty'))
            return 
          }
        }

        if (this.registerForm.password != this.registerForm.surePassword) {
          this.$message.error(this.$t('login.confirmPassword'))
          return
        }

        if(!/^1[3|4|5|7|8][0-9]\d{4,8}$/.test(this.registerForm.phone) || this.registerForm.phone.length != "11") {
          this.$message.error(this.$t('login.surePhone'))
          return
        }

        const result = await this.$store.dispatch('AC_UserOnlineServiceUserRegister', this.registerForm);
        if(result.data.returnMsg != 'success' || result.code != 200) {
            this.$message.error(result.data.returnMsg)
            return
        }

        this.ruleForm.userName = this.registerForm.userName
        this.ruleForm.password = this.registerForm.password
        this.submitForm()
      },
      async submitForm() {
        const result = await this.$store.dispatch('AC_LoginServiceLogin', this.ruleForm);
        if(result.code == 200 && result.data.success == 'false') {
          this.$message.error(result.data.errorReason)
          return 
        }
        if(result.code == 200 && result.data.success != 'false') {
          this.$message.success(this.$t('message.success'))
          localStorage.removeItem("token");
          localStorage.setItem('ms_username',this.ruleForm.userName)
          localStorage.setItem('ms_password',this.ruleForm.password)
          localStorage.setItem('token',result.data.token)
          localStorage.setItem('name',result.data.name)
          localStorage.setItem('userId',result.data.userId)
          this.$router.replace('/mreport/myreport')
        }
      },

    }
  }
</script>

<style lang="less" scoped>
.login-wrap {
  width: 100%;
  min-height: 100%;
  box-sizing: border-box;
  padding: 15vh 0 20px;
}

.ms-title {
  text-align: center;
  font-size: 30px;
  color: #fff;
}

.ms-login,.find-password {
  width: 300px;
  padding: 40px;
  border-radius: 4px;
  background: #fff;
  margin: 50px auto 0;
}

.find-password .title {
  text-align: center;
  line-height: 30px;
  padding-bottom: 20px;
  font-size: 24px;
}

.login-btn {
  text-align: center;
}

.login-btn button {
  width: 100%;
  height: 36px;
}

.forget-password{
text-align: right;
line-height: 30px;
color: #0085cc;
cursor: pointer;
}

.find-password-form{
  padding-top: 20px;
}

.ms-bottom {
  padding: 80px;
  text-align: center;
  font-size: 10px;
  color: rgb(165, 165, 165);
}
</style>

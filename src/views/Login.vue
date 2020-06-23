<template>
  <div id="container">
    <div id="title-container">
      <img
        alt="Qvault logo"
        src="../img/qvault-icon.png"
      >
      <span id="title">Qvault Classroom</span>
    </div>

    <div id="panel">
      <form
        v-if="state === 'login'"
        class="panel-content"
        @submit.prevent="login"
      >
        <span class="title">Log In to Your Account</span>
        <TextInput
          v-model="loginEmail"
          placeholder="email"
          type="email"
        />
        <TextInput
          v-model="loginPassword"
          placeholder="password"
          type="password"
        />
        <span>Need an account?<a @click="state='register'">Sign Up Free</a></span>
        <BlockButton class="btn">
          Login
        </BlockButton>
        <span><a @click="state='forgot-password'">Forgot Password?</a></span>
      </form>

      <form
        v-if="state === 'register'"
        class="panel-content"
        @submit.prevent="register"
      >
        <span class="title">Sign Up Free</span>
        <TextInput
          v-model="registerEmail"
          placeholder="email"
          type="email"
        />
        <TextInput
          v-model="registerFirstName"
          placeholder="first name"
          type="text"
        />
        <TextInput
          v-model="registerLastName"
          placeholder="last name"
          type="text"
        />
        <TextInput
          v-model="registerPassword"
          placeholder="password"
          type="password"
        />
        <BlockButton class="btn">
          Register
        </BlockButton>
        <span>Have an account? <a @click="state='login'">Login</a></span>
      </form>

      <form
        v-if="state === 'forgot-password'"
        class="panel-content"
        @submit.prevent="submitForgotPasswordEmail"
      >
        <span class="title">Recover Password</span>
        <TextInput
          v-model="recoverEmail"
          placeholder="email"
          type="email"
        />
        <BlockButton class="btn">
          Submit
        </BlockButton>
        <span><a @click="state='login'">Back</a></span>
      </form>

      <form
        v-if="state === 'forgot-password-code'"
        class="panel-content"
        @submit.prevent="submitRecoveryCode"
      >
        <span class="title">Enter Recovery Code</span>
        <TextInput
          v-model="recoverCode"
          placeholder="6 digit code"
          type="number"
        />
        <TextInput
          v-model="recoverPassword"
          placeholder="new password"
          type="password"
        />
        <BlockButton class="btn">
          Submit
        </BlockButton>
        <span><a @click="resendVerification">Resend Code</a></span>
        <span><a @click="state = 'login'">Back</a></span>
      </form>

      <form
        v-if="state === 'email-verification-code'"
        class="panel-content"
        @submit.prevent="submitVerificationCode"
      >
        <span class="title">Check Your Email</span>
        <TextInput
          v-model="validationCode"
          placeholder="6 digit code"
          type="number"
        />
        <BlockButton class="btn">
          Submit
        </BlockButton>
        <span><a @click="resendVerification">Resend Code</a></span>
        <span><a @click="state = 'register'">Back</a></span>
      </form>
    </div>

    <div>
      <span><a
        href="https://qvault.io"
        target="_blank"
      >Blog</a></span>

      <span><a
        href="https://qvault.io/contact"
        target="_blank"
      >Contact</a></span>
    </div>
  </div>
</template>

<script>
import {
  login, 
  createUser, 
  updateUserPasswordCode,
  sendEmailVerification, 
  verifyEmail,
  isLoggedIn
} from '@/lib/cloudClient.js';
import BlockButton from '@/components/BlockButton';
import TextInput from '@/components/TextInput';

export default {
  components: {
    BlockButton,
    TextInput
  },
  data() {
    return {
      state: 'login',
      loginEmail: null,
      loginPassword: null,
      registerEmail: null,
      registerFirstName: null,
      registerLastName: null,
      registerPassword: null,
      recoverEmail: null,
      recoverPassword: null,
      recoverCode: null,
      validationCode: null,
      error: null
    };
  },
  methods: {
    async login(){
      try {
        await login(this.loginEmail, this.loginPassword);
        this.$store.commit('setIsLoggedIn', isLoggedIn());
        this.$router.push({name: 'Dashboard'});
      } catch (err){
        this.$notify({
          type: 'error',
          text: err
        });
      }
    },
    mounted(){
      this.$store.commit('setIsLoggedIn', isLoggedIn());
      if (this.$store.getters.getIsLoggedIn){
        this.$router.push({name: 'Dashboard'});
      }
    },
    async register(){
      try {
        await createUser(
          this.registerEmail, 
          this.registerPassword,
          this.registerFirstName,
          this.registerLastName
        );
        await login(this.registerEmail, this.registerPassword);
        await sendEmailVerification();
        this.state = 'email-verification-code';
      } catch (err){
        this.$notify({
          type: 'error',
          text: err
        });
      }
    },
    async submitForgotPasswordEmail(){
      try {
        await login(this.loginEmail, this.loginPassword);
        this.state='forgot-password-code';
      } catch (err){
        this.$notify({
          type: 'error',
          text: err
        });
      }
    },
    async submitRecoveryCode(){
      try {
        await updateUserPasswordCode(
          this.recoverEmail,
          this.recoverPassword,
          Number(this.recoverCode)
        );
        await login(this.recoverEmail, this.recoverPassword);
        this.$store.commit('setIsLoggedIn', isLoggedIn());
        this.$router.push({name: 'Dashboard'});
      } catch (err){
        this.$notify({
          type: 'error',
          text: err
        });
      }
    },
    async submitVerificationCode(){
      try {
        await verifyEmail(Number(this.validationCode));
        await login(
          this.registerEmail, 
          this.registerPassword
        );
        this.$store.commit('setIsLoggedIn', isLoggedIn());
        this.$router.push({name: 'Dashboard'});
      } catch (err){
        this.$notify({
          type: 'error',
          text: err
        });
      }
    },
    async resendVerification(){
      try {
        await sendEmailVerification();
      } catch (err){
        this.$notify({
          type: 'error',
          text: err
        });
      }
    }
  }
};
</script>

<style scoped lang="scss">
@import '@/styles/colors.scss';

#container {
  background-color: $gray-darkest;
  height: 100%;
  color: $gray-lightest;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;

  #title-container {
    width: 100%;
    text-align: center;
    color: $gray-lightest;

    img {
      vertical-align: middle;
      width: 60px;
    }

    #title {
      margin-left: 25px;
      font-size: 36px;
      vertical-align: middle;
    }
  }

  #panel {
    background-color: $gray-lightest;
    flex: 1;
    max-height: 400px;
    width: 30vw;
    min-width: 400px;
    border-radius: 3px;
    color: $gray-dark;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;

    .panel-content {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: space-evenly;
      align-items: center;
      width: 100%;

      .title {
        font-size: 24px;
      }

      .btn {
        width: 30%;
        min-width: 75px;
      }

      a {
        cursor: pointer;
      }
    }
  }

  a {
    margin-left: 10px;
  }
}

</style>

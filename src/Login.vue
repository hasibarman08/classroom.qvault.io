<template>
  <div id="container">
    <div id="title-container">
      <img
        alt="Qvault logo"
        src="./img/qvault-icon.png"
      >
      <span id="title">Qvault Classroom</span>
    </div>

    <div id="panel">
      <form
        v-if="state === 'login'"
        class="panel-content"
        @submit="login"
      >
        <span class="title">Log In to Your Account</span>
        <input
          v-model="loginEmail"
          placeholder="email"
          type="email"
        >
        <input
          v-model="loginPassword"
          placeholder="password"
          type="password"
        >
        <span>Need an account?<a @click="state='register'">Sign Up Free</a></span>
        <button type="submit">
          Login
        </button>
        <span><a @click="state='forgot-password'">Forgot Password?</a></span>
      </form>


      <form
        v-if="state === 'register'"
        class="panel-content"
        @submit="register"
      >
        <span class="title">Sign Up Free</span>
        <input
          v-model="registerEmail"
          placeholder="email"
          type="email"
        >
        <input
          v-model="registerFirstName"
          placeholder="first name"
        >
        <input
          v-model="registerLastName"
          placeholder="last name"
        >
        <input
          v-model="registerPassword"
          placeholder="password"
          type="password"
        >
        <button
          button
        >
          Register
        </button>
        <span>Have an account? <a @click="state='login'">Login</a></span>
      </form>


      <form
        v-if="state === 'forgot-password'"
        class="panel-content"
        @submit="sendEmail"
      >
        <span class="title">Recover Password</span>
        <input
          v-model="recoverEmail"
          placeholder="email"
          type="email"
        >
        <button
          button
        >
          Submit
        </button>
        <span><a @click="state='login'">Back</a></span>
      </form>

      <form
        v-if="state === 'forgot-password-code'"
        class="panel-content"
        @submit="submitRecoveryCode"
      >
        <span class="title">Enter Recovery Code</span>
        <input
          v-model="recoverCode"
          placeholder="6 digit code"
        >
        <input
          v-model="recoverPassword"
          placeholder="new password"
          type="password"
        >
        <button
          button
        >
          Submit
        </button>
        <span><a @click="resendVerification">Resend Code</a></span>
        <span><a @click="state = 'login'">Back</a></span>
      </form>

      <form
        v-if="state === 'email-verification-code'"
        class="panel-content"
        @submit="submitVerificationCode"
      >
        <span class="title">Check Your Email</span>
        <input
          v-model="validationCode"
          placeholder="6 digit code"
        >
        <button
          button
        >
          Submit
        </button>
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
  verifyEmail
} from '@/lib/cloudClient.js';

export default {
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
        location.reload();
      } catch (err){
        alert(err);
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
        this.state = 'email-verification-code';
      } catch (err){
        alert(err);
      }
    },
    async sendEmail(){
      try {
        await login(this.loginEmail, this.loginPassword);
        this.state='forgot-password-code';
      } catch (err){
        alert(err);
      }
    },
    async submitRecoveryCode(){
      try {
        await updateUserPasswordCode(
          this.recoverEmail,
          this.recoverPassword,
          this.recoverCode
        );
        await login(this.recoverEmail, this.recoverPassword);
        location.reload();
      } catch (err){
        alert(err);
      }
    },
    async submitVerificationCode(){
      try {
        await verifyEmail(this.validationCode);
        await login(
          this.registerEmail, 
          this.registerPassword
        );
        location.reload();
      } catch (err){
        alert(err);
      }
    },
    async resendVerification(){
      try {
        await sendEmailVerification();
      } catch (err){
        alert(err);
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
        font-weight: 100;
      }

      a {
        cursor: pointer;
      }

      input {
        width: 50%;
        min-width: 150px;
        border-radius: 0px;
        border-width: 1px;
        padding: 10px;

        &:focus{
          outline: none !important;
          border-color: $purple-mid;
          border-width: 2px;
        }
      }

      button {
        width: 30%;
        min-width: 75px;
        border-radius: 0px;
        border-width: 0px;
        padding: 10px;
        background-color: $purple-darker;
        color: $white;
        box-shadow: 0 8px 16px 0 rgba(0,0,0,0.4);
        cursor: pointer;

        &:hover{
          box-shadow: 0 8px 16px 0 rgba(0,0,0,0.8);
          background-color: $purple-light;
        }

        &:focus{
          outline: none !important;
        }
      }
    }
  }

  a {
    margin-left: 10px;
  }
}

</style>

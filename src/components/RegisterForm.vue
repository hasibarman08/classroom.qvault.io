<template>
  <div id="register-form">
    <form
      v-if="state === 'register'"
      class="col"
      @submit.prevent="submitRegister"
    >
      <TextInput
        v-model="email"
        placeholder="email"
        type="email"
        class="item"
      />
      <TextInput
        v-model="firstName"
        class="item"
        placeholder="first name"
        type="text"
      />
      <TextInput
        v-model="lastName"
        placeholder="last name"
        type="text"
        class="item"
      />
      <TextInput
        v-model="password"
        placeholder="password"
        type="password"
        class="item"
      />
      <TextInput
        v-model="passwordConfirm"
        placeholder="confirm password"
        type="password"
        class="item"
      />
      <div>
        <input
          v-model="subscribeNews"
          type="checkbox"
          class="item"
        >
        <span>send me programming content and news</span>
      </div>
      <BlockButton class="btn item">
        Sign Up Free
      </BlockButton>
    </form>
    <div
      v-if="'register'"
      class="col right"
    >
      <GoogleLogin
        :params="googleButtonParams"
      >
        Login with Google
      </GoogleLogin>
    </div>

    <form
      v-if="state === 'email-verification-code'"
      class="col"
      @submit.prevent="submitVerificationCode"
    >
      <span class="title">Check Your Email</span>
      <TextInput
        v-model="validationCode"
        placeholder="6 digit code"
        type="text"
      />
      <BlockButton class="btn">
        Submit
      </BlockButton>
      <span><a @click="resendVerification">Resend Code</a></span>
      <span><a @click="state = 'register'">Back</a></span>
    </form>
  </div>
</template>

<script>
import { GoogleLogin } from 'vue-google-login';

import BlockButton from '@/components/BlockButton';
import TextInput from '@/components/TextInput';

import {
  login, 
  createUser, 
  sendEmailVerification, 
  verifyEmail,
  isLoggedIn
} from '@/lib/cloudClient.js';

export default {
  components: {
    GoogleLogin,
    BlockButton,
    TextInput
  },
  data(){
    return {
      state: 'register',
      email: null,
      firstName: null,
      lastName: null,
      password: null,
      passwordConfirm: null,
      subscribeNews: true,
      googleButtonParams: {
        client_id: '44792168937-1rpf8k8v1uv7eqoc8u2bg8qaenkfj41n.apps.googleusercontent.com'
      }
    };
  },
  methods: {
    async onSuccess(googleUser){
      console.log(googleUser);
      console.log(googleUser.getBasicProfile());
    },
    async onFailure(err){
      this.$notify({
        type: 'error',
        text: err
      });
    }
  },
  async submitRegister(){
    if (this.registerPassword !== this.registerPasswordConfirm){
      this.$notify({
        type: 'error',
        text: 'Passwords don\'t match'
      });
      return;
    }
    try {
      await createUser(
        this.registerEmail, 
        this.registerPassword,
        this.registerFirstName,
        this.registerLastName,
        this.registerSubscribeNews
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
  async submitVerificationCode(){
    try {
      await verifyEmail(Number(this.validationCode));
      await login(
        this.registerEmail, 
        this.registerPassword
      );
      this.$store.commit('setIsLoggedIn', isLoggedIn());
      this.$router.push({name: 'Courses'});
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
};
</script>

<style scoped lang="scss">
@import '@/styles/colors.scss';

#register-form {
  flex: 1;
  display: flex;
  flex-direction: row;

  .col {
    flex: 3;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    width: 100%;
    align-items: center;

    .item {
      margin: 10px;
    }

    .btn {
      width: 50%;
      min-width: 75px;
    }
  }

  .right {
    border-left: 1px solid $gray-mid;
  } 
}
</style>

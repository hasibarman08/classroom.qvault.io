<template>
  <div id="login-form">
    <form
      class="col"
      @submit.prevent="submitLogin"
    >
      <span class="title">Login to Your Account</span>
      <TextInput
        v-model="email"
        placeholder="email"
        type="email"
      />
      <TextInput
        v-model="password"
        placeholder="password"
        type="password"
      />
      <BlockButton class="btn">
        Login
      </BlockButton>
    </form>
    <div class="col right">
      <GoogleLogin
        :params="googleButtonParams"
        :on-success="onSuccess"
        :on-failure="onFailure"
      >
        Login with Google
      </GoogleLogin>
    </div>
  </div>
</template>

<script>
import { GoogleLogin } from 'vue-google-login';

import BlockButton from '@/components/BlockButton';
import TextInput from '@/components/TextInput';

import {
  login, 
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
      email: null,
      password: null,
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
  async submitLogin(){
    try {
      await login(this.loginEmail, this.loginPassword);
      this.$store.commit('setIsLoggedIn', isLoggedIn());
      this.$router.push({name: 'Courses'});
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

#login-form {
  flex: 1;
  display: flex;
  flex-direction: row;

  .title {
    font-size: 24px;
  }

  .col {
    flex: 3;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    width: 100%;
    align-items: center;

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

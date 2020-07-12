<template>
  <div id="login-form">
    <div class="col">
      <h2>
        One-Click Sign In
      </h2>
      <GoogleButton
        :on-success="onGoogleSuccess"
        text="Sign in with Google"
      />
      <div class="divider" />
    </div>
    <form
      class="col"
      @submit.prevent="submitLogin"
    >
      <span class="title">Login to Your Account</span>
      <TextInput
        v-model="email"
        placeholder="email"
        type="email"
        class="item"
      />
      <TextInput
        v-model="password"
        placeholder="password"
        type="password"
        class="item"
      />
      <BlockButton class="btn item">
        Login
      </BlockButton>
    </form>
  </div>
</template>

<script>
import GoogleButton from '@/components/GoogleButton';
import BlockButton from '@/components/BlockButton';
import TextInput from '@/components/TextInput';

import {
  login,
  loginGoogle,
  isLoggedIn
} from '@/lib/cloudClient.js';

export default {
  components: {
    GoogleButton,
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
    async onGoogleSuccess(googleUser){
      try {
        await loginGoogle(googleUser.Qt.Au, googleUser.wc.id_token);
        this.$store.commit('setIsLoggedIn', isLoggedIn());
        this.$router.push({name: 'Courses'});
      } catch (err){
        this.$notify({
          type: 'error',
          text: err
        });
      }
    },
    async submitLogin(){
      try {
        await login(this.email, this.password);
        this.$store.commit('setIsLoggedIn', isLoggedIn());
        this.$router.push({name: 'Courses'});
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

#login-form {
  display: flex;
  flex-flow: row wrap;
  flex-direction: row;

  .divider {
    border-bottom: 1px solid $gray-dark;
    width: 100%;
    margin-top: 25px;
    margin-bottom: 15px;
    display: none;

    @media (max-width: 720px) {
      display: block;
    }
  }

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

    .item {
      margin: 10px;
    }

    .btn {
      width: 50%;
      min-width: 75px;
    }
  }
}
</style>

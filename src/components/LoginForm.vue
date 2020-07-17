<template>
  <div>
    <div class="active-form">
      <form
        class="active-form"
        @submit.prevent="submitLogin"
      >
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

      <div class="divider">
        <span>or</span>
      </div>

      <GoogleButton
        :on-success="onGoogleSuccess"
        text="Sign in with Google"
        class="btn"
      />
    </div>
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
        await loginGoogle(
          googleUser.getBasicProfile().getEmail(),
          googleUser.getAuthResponse().id_token
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

.active-form {
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  width: 100%;
  align-items: center;

  .divider {
    width: 60%; 
    text-align: center; 
    border-bottom: 1px solid $gray-light; 
    line-height: 0.1em;
    margin: 1em 0 2em 0;
    color: $gray-light;

    span {
      background-color: $gray-lightest;
      padding: 0 10px; 
    }
  } 

  .item {
    margin-bottom: 2em;
    width: 100%;
  }

  .btn {
    margin-bottom: 2em;
    width: 50%;
    min-width: 250px;
  }
}
</style>

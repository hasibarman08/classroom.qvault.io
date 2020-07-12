<template>
  <div id="register-form">
    <div
      v-if="'register'"
      class="col"
    >
      <h2>
        One-Click Sign Up
      </h2>
      <GoogleButton
        :on-success="onGoogleSuccess"
        text="Sign up with Google"
      />
      <div />
      <div class="divider" />
    </div>
    <form
      v-if="state === 'register'"
      class="col"
      @submit.prevent="submitRegister"
    >
      <TextInput
        v-model="email"
        placeholder="email"
        type="email"
        class="item input"
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

    <form
      v-if="state === 'email-verification-code'"
      class="col"
      @submit.prevent="submitVerificationCode"
    >
      <span class="title item">Check Your Email</span>
      <TextInput
        v-model="validationCode"
        placeholder="6 digit code"
        type="text"
        class="item"
      />
      <BlockButton class="btn item">
        Submit
      </BlockButton>
      <span><a @click="resendVerification">Resend Code</a></span>
    </form>
  </div>
</template>

<script>
import GoogleButton from '@/components/GoogleButton';
import BlockButton from '@/components/BlockButton';
import TextInput from '@/components/TextInput';

import {
  login, 
  createUser, 
  sendEmailVerification, 
  verifyEmail,
  isLoggedIn,
  createUserGoogle,
  loginGoogle
} from '@/lib/cloudClient.js';

export default {
  components: {
    GoogleButton,
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
      validationCode: null
    };
  },
  methods: {
    async onGoogleSuccess(googleUser){
      try {
        await createUserGoogle(
          googleUser.Qt.Au, 
          googleUser.wc.id_token,
          this.subscribeNews
        );
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
          this.email, 
          this.password,
          this.firstName,
          this.lastName,
          this.subscribeNews
        );
        await login(this.email, this.password);
        await sendEmailVerification(this.email);
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
          this.email, 
          this.password
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
        await sendEmailVerification(this.email);
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

#register-form {
  display: flex;
  flex-direction: row;
  flex-flow: row wrap;

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

  .col {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    width: 100%;
    align-items: center;

    .item {
      margin: 10px;
    }

    .input {
      min-width: 150px;
    }

    .btn {
      width: 50%;
      min-width: 75px;
    }
  }
}
</style>

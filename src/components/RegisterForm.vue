<template>
  <div id="register-form">
    <div
      v-if="state === 'register'"
      class="active-form"
    >
      <form
        class="active-form"
        @submit.prevent="submitRegister"
      >
        <TextInput
          v-model="email"
          placeholder="Email"
          type="email"
          class="item input"
        />
        <div class="item">
          <TextInput
            v-model="firstName"
            class="sub-item"
            placeholder="First Name"
            type="text"
          />
          <TextInput
            v-model="lastName"
            placeholder="Last Name"
            type="text"
            class="sub-item right"
          />
        </div>
        <TextInput
          v-model="password"
          placeholder="Password"
          type="password"
          class="item"
        />
        <TextInput
          v-model="passwordConfirm"
          placeholder="Confirm Password"
          type="password"
          class="item"
        />

        <div class="item switch">
          <ToggleSwitch
            v-model="subscribeNews"
          />
          <span class="sub-item right">Get Newsletter</span>
        </div>

        <div class="item switch">
          <ToggleSwitch
            v-model="tosAccepted"
          />
          <span class="sub-item right">I've read and agree to the 
            <a href="https://qvault.io/terms-of-service/">terms</a>
          </span>
        </div>

        <BlockButton class="btn">
          Sign Up Free
        </BlockButton>
      </form>

      <div class="divider">
        <span>or</span>
      </div>

      <GoogleButton
        class="btn"
        :on-success="onGoogleSuccess"
        text="Sign up with Google"
      />
    </div>

    <div
      v-if="state === 'email-verification-code'"
      class="active-form"
    >
      <form
        class="active-form"
        @submit.prevent="submitVerificationCode"
      >
        <span class="title item">Check Your Email</span>
        <TextInput
          v-model="validationCode"
          placeholder="6 digit code"
          type="text"
          class="item"
        />
        <BlockButton class="btn">
          Submit
        </BlockButton>
        <span><a @click="resendVerification">Resend Code</a></span>
      </form>
    </div>
  </div>
</template>

<script>
import GoogleButton from '@/components/GoogleButton';
import BlockButton from '@/components/BlockButton';
import TextInput from '@/components/TextInput';
import ToggleSwitch from '@/components/ToggleSwitch';

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
    TextInput,
    ToggleSwitch
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
      tosAccepted: true,
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
      if (!this.tosAccepted){
        this.$notify({
          type: 'error',
          text: 'You need to accept the terms of service'
        });
        return;
      }
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
    display: flex;
    flex-direction: row;
    
    &.switch{
      align-items: center;
      justify-content: center;
      color: $gray-mid;
      font-size: .75em;
      line-height: .75em;
    }

    .sub-item {
      flex: 1;
    }

    .right {
      margin-left: 1em;
    }
  }

  .btn {
    margin-bottom: 2em;
    width: 50%;
    min-width: 250px;
  }
}
</style>

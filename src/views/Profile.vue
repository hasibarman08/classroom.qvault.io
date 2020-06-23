<template>
  <div id="container">
    <div id="name">
      <span>
        {{ firstName }} {{ lastName }}
      </span>
    </div>

    <div id="email">
      <span>
        {{ email }} 
      </span>
    </div>

    <form
      id="form"
      @submit.prevent="updatePassword"
    >
      <p>
        Update Password
      </p>
      <TextInput
        v-model="oldPassword"
        placeholder="old password"
        type="password"
        class="input"
      />
      <TextInput
        v-model="newPassword"
        class="input"
        placeholder="new password"
        type="password"
      />
      <BlockButton class="btn">
        Submit
      </BlockButton>
    </form>
  </div>
</template>

<script>
import { 
  updateUserPassword
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
      oldPassword: null,
      newPassword: null,
      firstName: this.$store.getters.getUser.FirstName,
      lastName: this.$store.getters.getUser.LastName,
      email: this.$store.getters.getUser.Email
    };
  },
  methods: {
    async updatePassword() {
      try {
        await updateUserPassword(this.email, this.oldPassword, this.newPassword);
        this.$notify({
          type: 'success',
          text: 'Password changed successfully'
        });
        this.oldPassword = null;
        this.newPassword = null;
      } catch (err) {
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
  color: $gray-darker;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;

  #name {
    font-size: 2em;
    margin: 1em;
  }

  #email {
    font-size: 1.5em;
    margin: 1em;
  }

  #form {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    min-width: 500px;

    .input {
      font-size: 1em;
      margin: 10px;
    }
  }
}

</style>

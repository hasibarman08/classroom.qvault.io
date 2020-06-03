<template>
  <div>
    <button
      id="run-btn"
      :disabled="code.trim().length === 0"
    >
      <FontAwesomeIcon
        icon="play"
      />
      Run
    </button>
    <p
      v-if="runErrors"
      id="run-errors"
    >
      {{ runErrors }}
    </p>
    <PrismEditor
      v-model="code"
      language="go"
      :line-numbers="true"
    />
  </div>
</template>

<script>
import 'prismjs';
import 'prismjs/themes/prism.css';
import 'prismjs/components/prism-go.min.js';

import 'vue-prism-editor/dist/VuePrismEditor.css';

import PrismEditor from 'vue-prism-editor';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

export default {
  components: {
    PrismEditor,
    FontAwesomeIcon
  },
  props: { 
    placeholder:{
      type: String,
      required: false,
      default: '\n\n\n\n\n\n'
    }
  },
  data() {
    return {
      code: this.placeholder,
      runErrors: 'jkfnskafdkjadkflsdhfkasjfhbajkfjk fsjnd fasjf skljf sdjklf sdfk asdjfaskflbasdjkf asflkjasd fksadjf sadkjf sdjkf asdjkf asdkfl asdjfas djfskl fjkasd fkjasd fjksd fskjf '
    };
  }
};
</script>

<style lang="scss">
@import '@/styles/colors.scss';

#run-btn {
  float: right;
  margin: 20px;
  background-color: $purple-mid;
  border: none;
  color: white;
  height: 50px;
  padding: 0 30px 0 30px;
  line-height: 50px;
  font-size: 16px;
  text-align: center;
  display: inline-block;
  cursor: pointer;

  &:hover {
    background-color: $purple-light;
  }

  &:disabled {
    background-color: $gray-mid;
  }
}

#run-errors {
  color: $pink;
  margin: 20px;
}

.prism-editor__code {
  background-color: var(--background-color) !important;
}

.prism-editor__line-numbers {
  background-color: var(--background-color) !important;
}

</style>

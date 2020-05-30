<template>
  <div class="hello">
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

export default {
  components: {
    PrismEditor
  },
  props: { 
    placeholder:{
      type: String,
      required: true
    }
  },
  data() {
    return {
      code: this.placeholder
    };
  }
};
</script>

<template>
  <div>
    <VueMarkdown
      id="viewer"
      :source="source"
      @rendered="update"
    />
  </div>
</template>

<script>
import Prism from 'prismjs';
import 'prismjs/themes/prism.css';
import 'prismjs/components/prism-go.min.js';
import 'prismjs/components/prism-bash.min.js';

import VueMarkdown from 'vue-markdown';

export default {
  components: {
    VueMarkdown
  },
  props: { 
    url:{
      type: String,
      required: false,
      default: null
    }
  },
  data(){
    return {
      source: ''
    };
  },
  async mounted(){
    let resp = await fetch(this.url);
    this.source = await resp.text();
  },
  methods: {
    update() {
      this.$nextTick(() => {
        Prism.highlightAll();
      });
    }
  }
};
</script>

<style scoped lang="scss">
@import '@/styles/colors.scss';

#viewer{
  padding: 20px;
}

</style>

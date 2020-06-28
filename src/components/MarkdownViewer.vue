<template>
  <div>
    <div id="markdown-viewer-container">
      <VueMarkdown
        id="viewer"
        :source="source"
        :breaks="false"
        :anchor-attributes="{target: '_blank'}"
        @rendered="update"
      />
    </div>
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
    source:{
      type: String,
      required: false,
      default: ''
    }
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

<style lang="scss">
@import '@/styles/colors.scss';

#markdown-viewer-container {
  height: var(--containerHeight);

  #viewer{
    padding: 20px;
    overflow: auto;

    pre {
      code {
        color: inherit;
      }
    }

    code {
      color: $pink-dark;
    }
  }
}

</style>

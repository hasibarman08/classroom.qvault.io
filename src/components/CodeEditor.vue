<template>
  <div>
    <div id="code-editor-root">
      <LoadingOverlay
        :is-loading="isLoading"
      />
      <div id="editor-container">
        <PrismEditor
          id="editor"
          v-model="code"
          language="go"
          :line-numbers="true"
        />
      </div>
      <div id="console-output">
        <BlockButton
          id="run-btn"
          :click="runCode"
        >
          <FontAwesomeIcon
            icon="play"
          />
          Run
        </BlockButton>
        <p
          v-for="(line, i) of output"
          :key="i"
          :class="{error: err}"
        >
          {{ line }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import 'prismjs';
import 'prismjs/themes/prism.css';
import 'prismjs/components/prism-go.min.js';

import 'vue-prism-editor/dist/VuePrismEditor.css';

import BlockButton from '@/components/BlockButton';
import LoadingOverlay from '@/components/LoadingOverlay';
import runGoWasm from '@/lib/runGoWasm.js';
import { compileCode } from '@/lib/cloudClient.js';
import PrismEditor from 'vue-prism-editor';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

export default {
  components: {
    PrismEditor,
    FontAwesomeIcon,
    LoadingOverlay,
    BlockButton
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
      output: [],
      err: false,
      isLoading: false
    };
  },
  methods: {
    async runCode() {
      try {
        this.isLoading = true;
        const wasm = await compileCode(this.code);
        this.output = await runGoWasm(wasm);
        this.err = false;
        this.isLoading = false;
      } catch(err) {
        this.isLoading = false;
        this.output = [ err ];
        this.err = true;
      }
    }
  }
};
</script>

<style lang="scss">
@import '@/styles/colors.scss';

#code-editor-root {
  display: flex;
  flex-direction: column;
  height: 100%;

  #editor-container {
    align-self: flex-start;
    flex: 3;
    width: 100%;
    overflow: auto;

    #editor {
      .prism-editor__code {
        background-color: var(--background-color) !important;
      }

      .prism-editor__line-numbers {
        background-color: var(--background-color) !important;
      }
    }
  }

  #console-output{
    align-self: flex-end;
    background-color: $gray-dark;
    flex: 1;
    width: 100%;

    #run-btn {
      float: right;
      margin: 20px;
      height: 50px;
      padding: 0 30px 0 30px;
      line-height: 50px;
      font-size: 16px;
    }

    p {
      margin: 0;
      font-size: 1em;
      padding: 5px;
      color: $white;
    }

    .error {
      color: $pink-light;
    }
  }
}

</style>

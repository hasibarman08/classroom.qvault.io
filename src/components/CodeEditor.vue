<template>
  <div>
    <div id="code-editor-root">
      <div id="editor-container">
        <PrismEditor
          id="editor"
          v-model="code"
          language="go"
          :line-numbers="true"
        />
      </div>
      <div id="console-output">
        <button
          id="run-btn"
          :disabled="code.trim().length === 0"
          @click="runCode"
        >
          <FontAwesomeIcon
            icon="play"
          />
          Run
        </button>
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

import runGoWasm from '@/lib/runGoWasm.js';
import { compileCode } from '@/lib/cloudClient.js';
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
      output: [],
      err: false
    };
  },
  methods: {
    async runCode() {
      try {
        const wasm = await compileCode(this.code);
        this.output = await runGoWasm(wasm);
        this.err = false;
      } catch(err) {
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
      background-color: $purple-mid;
      border: none;
      color: white;
      height: 50px;
      padding: 0 30px 0 30px;
      line-height: 50px;
      font-size: 16px;
      text-align: center;
      cursor: pointer;

      &:hover {
        background-color: $purple-light;
      }

      &:disabled {
        background-color: $gray-mid;
      }
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

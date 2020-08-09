<template>
  <div>
    <div id="code-editor-root">
      <LoadingOverlay
        :is-loading="isLoading"
      />
      <div id="editor-container">
        <PrismEditor
          v-model="code"
          class="my-editor"
          :language="progLang"
          line-numbers
          :tab-size="tabSize"
          :insert-spaces="insertSpaces"
          :highlight="highlighter"
        />
      </div>
      <div id="console-output">
        <BlockButton
          id="run-btn"
          class="btn"
          :click="runCode"
        >
          <FontAwesomeIcon
            icon="play"
          />
          Run
        </BlockButton>
        <BlockButton
          id="reset-btn"
          class="btn"
          :click="runReset"
          color="gray"
        >
          <FontAwesomeIcon
            icon="undo"
          />
          Reset
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
import { PrismEditor } from 'vue-prism-editor';
import 'vue-prism-editor/dist/prismeditor.min.css';
import { highlight, languages } from 'prismjs/components/prism-core';
import 'prismjs/components/prism-clike.min';
import 'prismjs/components/prism-javascript.min';
import 'prismjs/components/prism-go.min';
import 'prismjs/themes/prism-tomorrow.css';


import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

import BlockButton from '@/components/BlockButton';
import LoadingOverlay from '@/components/LoadingOverlay';
import { runGoWasm, runJavaScript } from '@/lib/runCode.js';
import { 
  compileCode
} from '@/lib/cloudClient.js';

export default {
  components: {
    PrismEditor,
    FontAwesomeIcon,
    LoadingOverlay,
    BlockButton
  },
  props: {
    runCallback: {
      type: Function,
      required: true
    },
    resetCallback: {
      type: Function,
      required: true
    },
    progLang: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      code: '',
      output: [],
      err: false,
      isLoading: false
    };
  },
  computed: {
    tabSize(){
      if (this.progLang === 'go'){
        return 1; // because its a tab
      }
      return 2;
    },
    insertSpaces(){
      return this.progLang !== 'go';
    }
  },
  methods: {
    highlighter(code) {
      return highlight(code, languages.js); //returns html
    },
    sleep(ms) {
      return new Promise(resolve => setTimeout(resolve, ms));
    },
    setCode(code){
      this.code = code;
    },
    async runCode() {
      try {
        this.isLoading = true;

        if (this.progLang === 'go'){
          try {
            const wasm = await compileCode(this.code);
            this.output = await runGoWasm(wasm);
          } catch (err){
            // we need to capture failure attempts
            await this.runCallback(err);
            throw err;
          }
        } else if (this.progLang === 'js'){
          // make it feel like something is running
          await this.sleep(250);
          try {
            this.output = await runJavaScript(this.code);
          } catch (err){
            // we need to capture failure attempts
            await this.runCallback(JSON.stringify(err));
            throw err;
          }
        }

        this.err = false;
        this.isLoading = false;
        let finalOut = '';
        for (const line of this.output){
          if (Array.isArray(line) || typeof line === 'object'){
            finalOut += JSON.stringify(line);
          } else{
            finalOut+=line;
          }
        }
        await this.runCallback(finalOut);
      } catch(err) {
        this.isLoading = false;
        this.output = [ err ];
        this.err = true;
      }
    },
    async runReset() {
      try {
        await this.resetCallback(this.output.join(''));
      } catch(err) {
        this.output = null;
        this.err = false;
      }
    }
  }
};
</script>

<style lang="scss">
@import '@/styles/colors.scss';

.my-editor {
  font-family: Fira code, Fira Mono, Consolas, Menlo, Courier, monospace;
  font-size: 14px;
  line-height: 1.5;
  padding: 5px;

  .prism-editor__textarea:focus {
    outline: none;
  }

  .prism-editor__code {
    background-color: var(--background-color) !important;
  }

  .prism-editor__line-numbers {
    background-color: var(--background-color) !important;
  }
}

#code-editor-root {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: stretch;

  #editor-container {
    flex: 4;
    overflow: auto;
  }

  #console-output {
    background-color: $gray-darkest;
    flex: 2;
    flex-direction: column;
    padding: 10px;
    overflow: auto;

    .btn {
      float: right;
      margin-left: 1em;
      font-size: 1em;
    }

    p {
      margin: 0;
      font-size: 1em;
      color: $white;
    }

    .error {
      color: $pink-light;
    }
  }
}

</style>

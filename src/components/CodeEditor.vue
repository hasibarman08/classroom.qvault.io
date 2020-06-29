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
import 'prismjs';
import 'prismjs/themes/prism.css';
import 'prismjs/components/prism-go.min.js';

import 'vue-prism-editor/dist/VuePrismEditor.css';

import PrismEditor from 'vue-prism-editor';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

import BlockButton from '@/components/BlockButton';
import LoadingOverlay from '@/components/LoadingOverlay';
import runGoWasm from '@/lib/runGoWasm.js';
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
  methods: {
    setCode(code){
      this.code = code;
    },
    async runCode() {
      try {
        this.isLoading = true;
        const wasm = await compileCode(this.code);
        this.output = await runGoWasm(wasm);
        this.err = false;
        this.isLoading = false;
        await this.runCallback(this.output.join(''));
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

#code-editor-root {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: stretch;

  #editor-container {
    flex: 4;
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

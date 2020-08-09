<template>
  <div id="container">
    <TopNav :title="`${displayLang} Playground`" />

    <div class="langs">
      <a
        v-for="(langKey, i) of langsArray"
        :key="i"
        :href="`/playground/${langKey}`"
      >
        {{ langs[langKey].displayName }}
      </a>
    </div>

    <CodeEditor
      id="editor"
      ref="codeEditor"
      :run-callback="() => {}"
      :reset-callback="setCode"
      :prog-lang="lang"
    />
  </div>
</template>

<script>
import CodeEditor from '@/components/CodeEditor';
import TopNav from '@/components/TopNav';

export default {
  components: {
    TopNav,
    CodeEditor
  },
  data(){
    return {
      lang: this.$route.params.lang,
      langs: {
        go:{
          displayName: 'Go WASM'
        },
        js:{
          displayName: 'JavaScript'
        }
      }
    };
  },
  computed: {
    displayLang(){
      return this.langs[this.lang].displayName;
    },
    langsArray(){
      return Object.keys(this.langs);
    }
  },
  mounted(){
    this.setCode();
  },
  beforeRouteUpdate (to, from, next) {
    this.lang = to.params.lang;
    this.setCode();
    next();
  },
  methods:{
    setCode(){
      if (this.lang === 'go'){
        this.$refs.codeEditor.setCode(`package main

import "fmt"

func main(){
\tfmt.Println("hello world")
}

// code is compiled to WASM
// on our servers then
// executes on your machine
// read about it on our blog:
// https://qvault.io/2020/07/01/running-go-in-the-browser-with-web-assembly-wasm/
    `);
        return;
      }
      if (this.lang === 'js'){
        this.$refs.codeEditor.setCode('console.log("hello world")');
        return;
      }
      this.$refs.codeEditor.setCode('unknown language');
    }
  }
};
</script>

<style scoped lang="scss">
@import '@/styles/colors.scss';

#container {
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  background-color: $gray-darkest;
  height: 100%;

  .langs{
    display: flex;
    flex-direction: row;
    padding: 1em;
    
    a {
      padding-left: 10px;
    }
  }

  #editor {
    flex: 1;
    background-color: $white;
    max-height: 100%;
    overflow: auto;
  }
}
</style>

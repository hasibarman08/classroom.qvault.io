<template>
  <div id="container">
    <TopNav :title="`${displayLang} Playground`" />
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
      lang: this.$route.params.lang
    };
  },
  computed: {
    displayLang(){
      if (this.lang === 'go'){
        return 'Go WASM';
      }
      if (this.lang === 'js'){
        return 'JavaScript';
      }
      return 'unknown';
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
    fmt.Println("hello world")
}
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

  #editor {
    flex: 1;
    background-color: $white;
    max-height: 100%;
    overflow: auto;
  }
}
</style>

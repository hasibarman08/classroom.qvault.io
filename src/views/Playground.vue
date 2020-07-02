<template>
  <div id="container">
    <div id="header">
      <div>
        <BlockButton
          id="btn"
          :click="() => {
            if (this.$store.getters.getIsLoggedIn){
              this.$router.push({name: 'Courses'});
            } else {
              this.$router.push({name: 'Login'});
            }
          }"
        >
          <FontAwesomeIcon
            icon="undo"
          />
          To Courses
        </BlockButton>
      </div>

      <div id="title-container">
        <span id="title">
          <FontAwesomeIcon
            icon="cubes"
          />
          Qvault Playground
        </span>
        <span id="sub-title">
          {{ subTitle }}
        </span>
      </div>
      <div>
        <a
          href="https://qvault.io/2020/07/01/running-go-in-the-browser-with-web-assembly-wasm/"
          target="_blank"
        >
          About
        </a>
      </div>
    </div>
    <CodeEditor
      id="editor"
      ref="codeEditor"
      :run-callback="() => {}"
      :reset-callback="setCode"
      :prog-lang="$route.params.lang"
    />
  </div>
</template>

<script>
import CodeEditor from '@/components/CodeEditor';
import BlockButton from '@/components/BlockButton';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';


export default {
  components: {
    CodeEditor,
    BlockButton,
    FontAwesomeIcon
  },
  computed: {
    subTitle(){
      if (this.$route.params.lang === 'go'){
        return 'Run Go in your browser with web assembly';
      }
      if (this.$route.params.lang === 'js'){
        return 'Run JavaScript in your browser';
      }
      return 'unknown';
    }
  },
  mounted(){
    this.setCode();
  },
  methods:{
    setCode(){
      if (this.$route.params.lang === 'go'){
        this.$refs.codeEditor.setCode(`package main

import "fmt"

func main(){
    fmt.Println("hello world")
}
    `);
        return;
      }
      if (this.$route.params.lang === 'js'){
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
  }

  #header {
    padding: 10px;
    display: flex;
    flex-flow: row wrap;
    justify-content: space-between;
    align-items: center;

    div {
      display: flex;
      flex-direction: column;
      justify-content: center;
      flex: 1;
      align-items: center;
      min-width: 250px;
    }

    #title-container{
      display: flex;
      flex-direction: column;
      justify-content: center;
      text-align: center;
    
      #title{
        font-size: 2.5em;
        color: $gray-lightest;
      }

      #sub-title{
        font-size: 1em;
        color: $gray-lighter;
      }
    }

    #btn {
      font-size: 1.5em;
    }
  }
}

</style>

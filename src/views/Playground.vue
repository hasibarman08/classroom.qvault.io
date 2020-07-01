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
          Run {{ lang }} in your browser with web assembly (desktop only)
        </span>
      </div>
      <div>
        <a
          href="https://qvault.io"
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
    lang(){
      if (this.$route.params.lang === 'go'){
        return 'Go';
      }
      return 'unknown';
    }
  },
  mounted(){
    this.setCode();
  },
  methods:{
    setCode(){
      this.$refs.codeEditor.setCode(
        `
package main

import "fmt"

func main(){
    fmt.Println("hello world")
}
    `);
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
  background-color: $gray-darker;
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
        color: $purple-lighter;
      }
    }

    #btn {
      font-size: 1.5em;
    }
  }
}

</style>

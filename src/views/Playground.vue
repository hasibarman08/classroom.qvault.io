<template>
  <div id="container">
    <div id="header">
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
      <span>
        <FontAwesomeIcon
          icon="cubes"
        />
        Qvault Playground
      </span>
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
      return this.$route.params.lang;
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
  background-color: $gray-mid;
  height: 100%;

  #editor {
    flex: 1;
    background-color: $white;
  }

  #header {
    text-align: center;

    span {
      font-size: 2.5em;
      line-height: 2.5em;
      color: $gray-lightest;
    }

    #btn {
      font-size: 1.2em;
      padding: 15px;
      max-width: 200px;
      left: 0;
      top: 0;
      margin: 20px;
      position: absolute;
    }
  }
}

</style>

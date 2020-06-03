<template>
  <div id="container">
    <MarkdownViewer
      id="mdviewer"
      url="https://raw.githubusercontent.com/lane-c-wagner/go-tinydate/master/README.md"
    />
    <CodeEditor id="editor" />
  </div>
</template>

<script>
import CodeEditor from '@/components/CodeEditor';
import MarkdownViewer from '@/components/MarkdownViewer';

export default {
  components: {
    CodeEditor,
    MarkdownViewer
  },
  data() {
    return {
      course: null,
      module: null,
      excersize: null
    };
  }
};
</script>

<style scoped lang="scss">
@import '@/styles/colors.scss';

#container {
  display: flex;
  padding: 20px;
}

#editor {
  display: inline-block;
  flex: 1;
  background-color: $white;
}

#mdviewer {
  display: inline-block;
  flex: 1;
  background-color: $white;
  border: solid $gray-lightest;
  border-width: 0 1px 0 0;
}

</style>

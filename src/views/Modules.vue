<template>
  <div id="container">
    <MarkdownViewer
      id="mdviewer"
      class="side"
      url="https://raw.githubusercontent.com/lane-c-wagner/go-tinydate/master/README.md"
    />
    <CodeEditor
      id="editor"
      class="side"
    />
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
  background-color: $gray-mid;
}

.side {
  // VH - header bar - 2x container padding
  height: calc(100vh - 60px - 2*20px);
  overflow: auto;
  display: inline-block;
  flex: 1;
  resize: width;
  background-color: $white;
  display: inline-block;
  flex: 1;
}

#mdviewer {
  border: solid $gray-lighter;
  border-width: 0 2px 0 0;
}

</style>

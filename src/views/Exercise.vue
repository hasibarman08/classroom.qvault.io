<template>
  <div id="container">
    <MarkdownViewer
      id="mdviewer"
      class="side"
      :source="markdownSource"
    />
    <div
      v-if="type === 'type_info'"
      id="info-container"
      class="side"
    >
      <p> 👈 Read First 👈🏿 </p>
      <BlockButton
        class="btn"
        :click="submitTypeInfo"
      >
        Continue
      </BlockButton>
    </div>
    <CodeEditor
      v-else-if="type === 'type_code'"
      ref="codeEditor"
      class="side"
      :callback="submitTypeCode"
    />
    <MultipleChoice
      v-else-if="type === 'type_choice'"
      class="side"
      :callback="submitTypeChoice"
      :answers="answers"
      :question="currentQuestion"
    />
  </div>
</template>

<script>
import CodeEditor from '@/components/CodeEditor';
import MultipleChoice from '@/components/MultipleChoice';
import MarkdownViewer from '@/components/MarkdownViewer';
import BlockButton from '@/components/BlockButton';

import { 
  getNextExercise,
  submitInformationalExercise,
  submitCodeExercise,
  submitMultipleChoiceExercise
} from '@/lib/cloudClient.js';

export default {
  components: {
    CodeEditor,
    MarkdownViewer,
    BlockButton,
    MultipleChoice
  },
  data(){
    return {
      markdownSource: '',
      type: 'type_code',
      moduleUUID: this.$route.params.moduleUUID,
      exerciseUUID: null,
      questions: null,
      currentQuestionIndex: 0
    };
  },
  computed: {
    answers(){
      if (this.questions) {
        this.shuffle(this.questions[this.currentQuestionIndex].Answers);
      }
      return null;
    },
    currentQuestion(){
      if (this.questions) {
        return this.questions[this.currentQuestionIndex].Question;
      }
      return null;
    }
  },
  async mounted(){
    await this.getNextExercise();
  },
  methods: {
    shuffle(a) {
      for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [ a[i], a[j] ] = [ a[j], a[i] ];
      }
      return a;
    },
    sleep(ms) {
      return new Promise(resolve => setTimeout(resolve, ms));
    },
    async submitTypeInfo(){
      await submitInformationalExercise(
        this.$route.params.courseUUID,
        this.moduleUUID,
        this.exerciseUUID
      );
      await this.getNextExercise();
    },
    async submitTypeCode(output) {
      try {
        await submitCodeExercise(
          this.$route.params.courseUUID,
          this.moduleUUID,
          this.exerciseUUID,
          output
        );
        this.sleep(2000);
        await this.getNextExercise();
      } catch(err) {
        this.$notify({
          type: 'error',
          text: err
        });
      }
    },
    async submitTypeChoice(question, answer) {
      try {
        await submitMultipleChoiceExercise(
          this.$route.params.courseUUID,
          this.moduleUUID,
          this.exerciseUUID,
          question,
          answer
        );
        await this.getNextExercise();
      } catch(err) {
        this.$notify({
          type: 'error',
          text: err
        });
      }
    },
    async getNextExercise(){
      try {
        const exercise = await getNextExercise(this.$route.params.courseUUID);
        this.markdownSource = exercise.CurrentExercise.Readme;
        this.type = exercise.CurrentExercise.Type;
        this.moduleUUID = exercise.CurrentExercise.ModuleUUID;
        this.exerciseUUID = exercise.CurrentExercise.UUID;
        if (this.$refs.codeEditor){
          this.$refs.codeEditor.setCode(exercise.CurrentExercise.Code);
        }
        if (exercise.CurrentExercise.Questions){
          this.questions = this.shuffle(exercise.CurrentExercise.Questions);
        }
      } catch (err) {
        this.$notify({
          type: 'error',
          text: err
        });
      }
    }
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

#info-container {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  p {
    font-size: 2em;
  }

  .btn {
    font-size: 2em;
    padding: 20px;
  }
}

</style>

<template>
  <div class="root">
    <div
      v-if="courseDone"
      class="full"
    >
      <img
        src="https://qvault.io/wp-content/uploads/2020/08/gatsby_toast.gif"
      >
      <p> Congragulations! You've completed this course</p>
      <BlockButton
        class="btn"
        :click="() => {this.$router.push({ name: 'Courses' })}"
      >
        Next Course
      </BlockButton>
      <BlockButton
        class="btn"
        :click="() => {$router.push({name: 'Portfolio', params: {userUUID: $store.getters.getUser.UUID}}) }"
        color="gray"
      >
        View Portfolio
      </BlockButton>
    </div>

    <div
      v-else
      class="container"
    >
      <MarkdownViewer
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
        :run-callback="submitTypeCode"
        :reset-callback="getNextExercise"
        :prog-lang="progLang"
      />
      <MultipleChoice
        v-else-if="type === 'type_choice'"
        class="side"
        :callback="submitTypeChoice"
        :answers="answers"
        :question="currentQuestion"
      />
    </div>
  </div>
</template>

<script>
import CodeEditor from '@/components/CodeEditor';
import MultipleChoice from '@/components/MultipleChoice';
import MarkdownViewer from '@/components/MarkdownViewer';
import BlockButton from '@/components/BlockButton';

import { 
  loadBalance
} from '@/lib/cloudStore.js';

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
      type: '',
      courseUUID: this.$route.params.courseUUID,
      moduleUUID: null,
      exerciseUUID: null,
      questions: null,
      currentQuestionIndex: 0,
      progLang: 'go',
      courseDone: false
    };
  },
  computed: {
    answers(){
      if (this.questions) {
        return this.shuffle(this.questions[this.currentQuestionIndex].Answers);
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
  async beforeRouteUpdate (to, from, next) {
    this.courseUUID = to.params.courseUUID;
    this.courseDone = false;
    await this.getNextExercise();
    next();
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
        this.courseUUID,
        this.moduleUUID,
        this.exerciseUUID
      );
      await this.getNextExercise();
    },
    async submitTypeCode(output) {
      try {
        const credit = await submitCodeExercise(
          this.courseUUID,
          this.moduleUUID,
          this.exerciseUUID,
          output
        );
        if (credit.GemCredit && credit.Message){
          this.$notify({
            type: 'success',
            text: `${credit.Message} 💎x${credit.GemCredit}`
          });
          loadBalance(this);
        } else{
          this.$notify({
            type: 'success',
            text: 'Correct! Great Job :)'
          });
        }
        await this.sleep(1500);
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
        const credit = await submitMultipleChoiceExercise(
          this.courseUUID,
          this.moduleUUID,
          this.exerciseUUID,
          question,
          answer
        );
        if (credit.GemCredit && credit.Message){
          this.$notify({
            type: 'success',
            text: `${credit.Message} 💎x${credit.GemCredit}`
          });
          loadBalance(this);
        } else{
          this.$notify({
            type: 'success',
            text: 'Correct! Great Job :)'
          });
        }
        await this.sleep(1500);
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
        const exercise = await getNextExercise(this.courseUUID);
        if (exercise.CourseDone){
          this.courseDone = true;
          if (exercise.Message && exercise.GemCredit){
            this.$notify({
              type: 'success',
              text: `${exercise.Message} 💎x${exercise.GemCredit}`
            });
          }
        }
        this.markdownSource = exercise.CurrentExercise.Readme;
        this.type = exercise.CurrentExercise.Type;
        this.moduleUUID = exercise.CurrentExercise.ModuleUUID;
        this.$store.commit('setCurrentModuleUUID', this.moduleUUID);
        this.exerciseUUID = exercise.CurrentExercise.UUID;

        // Allow DOM to render changes before setting data on components
        await this.$nextTick();
        if (this.type === 'type_code'){
          this.$refs.codeEditor.setCode(exercise.CurrentExercise.Code);
          this.progLang = exercise.CurrentExercise.ProgLang;
        } else if (exercise.CurrentExercise.Questions){
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

.root {
  height: 100%;
}

.container {
  display: flex;
  height: 100%;
}

.full {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 100%;
  padding-top: 20px;

  p {
    font-size: 2em;
  }

  .btn {
    font-size: 1.5em;
    margin: 1em;
  }
}

.side {
  height: 100%;
  overflow: auto;
  flex: 1;
  background-color: $white;
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
  }
}

</style>

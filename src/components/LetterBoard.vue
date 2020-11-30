<template>
  <div id="background">
    <div id="letter-board">
      <div id="board-area">
        <!-- <span>A</span><span>B</span><span>C</span><span>D</span>
        <span>E</span><span>F</span><span>G</span><span>H</span> -->
        <draggable v-for="(letter, i) in lettersMatrix" :key="`letter${i}`" v-model="lettersMatrix[i]" class="letter-slot">
          <span>{{ lettersMatrix[i][0] }}</span>
        </draggable>
      </div>
    </div>

    <div id="letters">
      <div id="letters-area">
        <draggable v-for="(letter, i) in letters" :key="`letter-${letters[i]}`" v-model="letters[i]" class="letter-slot">
          <span>{{ letters[i][0] }}</span>
        </draggable>
      </div>
    </div>
  </div>
</template>

<script>
  import draggable from 'vuedraggable'
  import { letters } from './letters.js'

  export default {
    name: 'LetterBoard',
    components: {
      draggable
    },
    data() {
      return {
        lettersMatrix: [],
        letters
      }
    },
    mounted() {
      for (let i = 0; i < 252; i++) {
        // const randomLetterIdx = Math.floor(Math.random() * 29)
        this.lettersMatrix.push([]);
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import url('https://fonts.googleapis.com/css2?family=Roboto+Mono&display=swap');

  #background {
    background-image: url(../assets/top_down_desk_optimized.jpg);
    background-size: cover;
    height: calc(100% - 120px);
    width: calc(100% - 60px);
    padding: 90px 30px 30px 30px;

    display: grid;
    grid-template-columns: 50% 50%;
    grid-area: 
    "letter-board letters";
  }

  #letter-board {
    grid-template-areas: "letter-board";
    background-image: url(../assets/letterboard.png);
    background-size: 745px 851px;
    height: 851px;
    width: 745px;
    box-sizing: border-box; 
    padding: 25px 22px 21px 26px;
    color: #FFFDED;
    font-size: 60px;
  }

  #board-area {
    height: 100%;
    display: flex;
    flex-flow: row wrap;
    font-family: "Roboto Mono", monospace;
  }

  #letters {
    grid-template-areas: "letters";
    color: #FFFDED;
    font-family: "Roboto Mono", monospace;
    font-size: 60px;

    #letters-area {
      display: flex;
      flex-flow: row wrap;
      margin-top: 600px;
      padding: 0px 75px;

      .letter-slot {
        width: 50px;
        height: 60px;
        box-sizing: border-box;
      }
    }
  }

  .letter-slot {
    width: 38px;
    height: 50px;
    box-sizing: border-box; 
    

      span {
        cursor: grab;
        display: inline-block;
        line-height: 48px;
        height: 45px;
        vertical-align: top;
      }
  }
</style>
<template>
  <div id="background" data-app>
    <div id="letter-board">
      <div id="board-area">
        <draggable 
          v-for="(letter, i) in lettersMatrix" 
          :key="`letter${i}`" 
          v-model="lettersMatrix[i]"
          group="letters" 
          class="letter-slot"
          @start="startDrag"
          @end="endDrag"
        >
            <span :key="`lettersMatrix-${i}`" class="letter">{{ lettersMatrix[i][0] }}</span>
        </draggable>
      </div>
    </div>

    <div id="letters">
      <div id="trash-area" :class="{ dragging }">
        <font-awesome-icon icon="trash-alt" class="trash-icon"/>
        <draggable 
          group="letters"
          v-model="trash"
          @add="() => { this.trash = [] }"
        >
          <!-- <span v-for="(letter, i) in trash" :key="`trash-${i}`" class="letter"></span> -->
        </draggable>
      </div>
      <div id="buttons">
        <font-awesome-icon 
          icon="save" 
          class="btn" 
          title="Save Locally"
          @click="saveBoard"
        />
        <font-awesome-icon 
          icon="eraser" 
          class="btn"
          title="Clear Board"
          @click="eraseBoard"
        />
        <font-awesome-icon
          icon="share-square"
          title="Share"
          class="btn"
          @click="showShare = true"
        />
      </div>
      <div id="letters-area">
        <draggable 
          v-for="(letter, i) in letters" 
          :key="`letter-${letters[i]}`" 
          v-model="letters[i]" 
          :group="{ name: 'letters', pull: 'clone', put: false }" 
          class="letter-slot"
          @start="startDrag"
          @end="endDrag"
        >
            <span :key="`letter-${letters[i]}-span`" class="letter">{{ letters[i][0] }}</span>
        </draggable>
      </div>
      <div id="numbers-area">
        <draggable 
          v-for="(num, i) in numbers" 
          :key="`number-${i}`" 
          v-model="numbers[i]" 
          :group="{ name: 'letters', pull: 'clone', put: false }" 
          class="letter-slot"
          @start="startDrag"
          @end="endDrag"
        >
            <span :key="`number-${i}-span`" class="letter">{{ numbers[i][0] }}</span>
        </draggable>
      </div>
    </div>

    <v-dialog 
      v-model="showShare" 
      max-width="700px"
    >
      <v-card>
        <v-card-title>
          <span class="headline">Share Your Word Board</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-btn
                elevation="2" icon tile 
                class="copy-btn"
                @click="copyURL"
              >
                <font-awesome-icon icon="copy" title="Copy URL" />
              </v-btn>
              <v-text-field
                label="URL"
                :value="sharedURL"
                :disabled="true"
              ></v-text-field>
            </v-row>
          </v-container>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
  import draggable from 'vuedraggable'
  import { letters, numbers } from './letters.js'

  export default {
    name: 'LetterBoard',
    components: {
      draggable
    },
    data() {
      return {
        lettersMatrix: [],
        letters,
        numbers,
        trash: [],
        window: {
          width: 0,
          height: 0
        },
        dragging: false,
        showShare: false
      }
    },
    computed: {
      sharedURL() {
        return `https://schwamman.com?wordboard=${btoa(JSON.stringify(this.lettersMatrix))}`
      }
    },
    methods: {
      startDrag() {
        this.dragging = true;
      },
      endDrag() {
        this.dragging = false;
      },
      eraseBoard() {
        let newMatrix = []
        this.lettersMatrix.forEach(() => {
          newMatrix.push([]);
        })
        this.lettersMatrix = newMatrix;

        localStorage.removeItem('wordBoard');
      },
      saveBoard() {
        localStorage.wordBoard = JSON.stringify(this.lettersMatrix);
      },
      copyURL() {
        navigator.clipboard.writeText(this.sharedURL);
      },
      handleResize() {
        this.window.width = window.innerWidth;
        this.window.height = window.innerHeight;

        if (this.window.height < 889) {
          while (this.lettersMatrix.length < 187) {
            this.lettersMatrix.push([]);
          }
          this.lettersMatrix = this.lettersMatrix.slice(0, 187);
        } else {
          while (this.lettersMatrix.length < 252) {
            this.lettersMatrix.push([]);
          }
        }
      }
    },
    created() {
      window.addEventListener('resize', this.handleResize);
      this.handleResize();
    },
    mounted() {
      console.log(this.$route);
      if (this.$route.query.wordBoard) {
        this.lettersMatrix = JSON.parse(atob(this.$route.query.wordBoard));
      } else if (localStorage.wordBoard) {
        console.log(localStorage.wordBoard);
        this.lettersMatrix = JSON.parse(localStorage.wordBoard);
      } else {
        const line1 = [ ["P"],["D"],[],["W"],["O"],["R"],["D"] ];
        const line2 = [ ["B"],["O"],["A"],["R"],["D"],["!"] ];
        const line1Start = this.window.height < 889 ? 55 : 76;
        const line2Start = this.window.height < 889 ? 90 : 113;

        this.lettersMatrix.splice(line1Start, line1.length, ...line1);
        this.lettersMatrix.splice(line2Start, line2.length, ...line2);
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import url('https://fonts.googleapis.com/css2?family=Roboto+Mono&display=swap');

  #background {
    background-image: url(../assets/top_down_desk_optimized.jpg);
    background-size: cover;
    height: calc(100%);
    width: calc(100%);
    padding: 30px 30px 30px 30px;

    display: grid;
    grid-template-columns: 45% 55%;
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

    // .letter-slot:hover {
    //   box-shadow: 0px 0px 17px 16px #0ff;
    //   background-color: #0ff;
    //   opacity: .6;
    //   border-radius: 5px;
    // }
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
    text-align: left;

    #trash-area {
      position: relative;
      display: inline-block;
      margin-top: 400px;
      height: 200px;
      width: 70%;
      vertical-align: bottom;

      .trash-icon {
        display: none;
        position: absolute;
        left: 7px;
        top: 7px;
        height: 30px;
        color: rgba(3, 119, 119, 0.6);
      }

      div {
        height: 100%;
        text-align: center;
      }
    }

    #buttons {
      display: inline-block;
      font-size: 48px;
      vertical-align: bottom;
      margin-left: 20px;

      .btn {
        cursor: pointer;
        padding: 5px 10px;
      }

      .btn:hover {
        opacity: .5;
      }
    }

    #trash-area.dragging {
      box-shadow: 0px 0px 17px 16px rgba(3, 119, 119, 0.5);
      background-color: rgba(3, 119, 119, 0.5);
      opacity: .6;
      border-radius: 5px;

      .trash-icon {
        display: block;
      }
    }

    #letters-area {
      margin-top: 50px;
      display: flex;
      flex-flow: row wrap;
      padding: 0px 75px 0px 0px;

      .letter-slot {
        width: 50px;
        height: 60px;
        box-sizing: border-box;
      }
    }

    #numbers-area {
      display: flex;
      flex-flow: row wrap;
      padding: 0px 75px 0px 0px;

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

  .letter {
    text-shadow: 0 1px 0 #ccc,
                 0 2px 0 #c9c9c9,
                 0 3px 0 #bbb,
                 0 4px 0 #b9b9b9,
                 0 5px 0 #aaa,
                 0 6px 1px rgba(0, 0, 0, 0.05),
                 0 0 5px rgba(0, 0, 0, 0.05),
                 0 1px 3px rgba(0, 0, 0, 0.15),
                 0 3px 5px rgba(0,0,0,.1),
                 0 5px 10px rgba(0,0,0,.125),
                 0 10px 10px rgba(0,0,0,.1),
                 0 20px 20px rgba(0,0,0,.075);
  }

  .copy-btn {
    margin-top: 14px;
    margin-right: 15px;

    svg {
      font-size: 22px;
    }
  }

  @media screen and (max-height: 888px){
  #background {
    grid-template-columns: 50% 50%;
  }

    #letter-board {
      background-size: 707px 669px;
      height: 669px;
      width: 707px;
    }

    #letters {
      #trash-area {
        margin-top: 250px;
        height: 150px;
        width: 35%;
      }

      #letters-area {
        margin-top: 25px;
      }
    }
  }
</style>
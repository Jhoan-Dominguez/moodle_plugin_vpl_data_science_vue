<script lang="ts">

import { defineComponent, onMounted, ref } from "vue";
import {basicSetup, EditorView} from "codemirror"
import {EditorState} from "@codemirror/state"
import {python} from "@codemirror/lang-python"
import { indentUnit } from "@codemirror/language";
import { keymap } from "@codemirror/view";
import { indentWithTab } from "@codemirror/commands";


export default defineComponent({
  name: "CodeMirrorComponent",
  setup() {

    onMounted(() => {
      const myDiv = document.getElementById("test-vue-div");
      
      if (myDiv) {
      
        let state = EditorState.create({
          doc: `def my_function:\n\tpass`,
          extensions: [
            basicSetup,
            python(),
            indentUnit.of("    "),
            keymap.of([indentWithTab ]),
          ]
        })

        let view = new EditorView({
          state,
          parent: myDiv,
        })
        
        console.log(view.state.doc.toString())

      }
    });

    return {};
  },
});

</script>

<template>
  <div id="test-vue-div" class="test-vue-div"></div>
</template>

<style scoped>

.test-vue-div {
  width: 1000px;  /* Ajusta el ancho al 100% del contenedor padre */
  height: 200px;  /* Altura fija */
  border: 1px solid #000;
  overflow: auto;  /* Habilita el scroll si es necesario */
}

</style>

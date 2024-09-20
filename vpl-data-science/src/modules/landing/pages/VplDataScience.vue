<template>
    <div id="test-vue-div"></div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue';
import { basicSetup, EditorView } from 'codemirror';
import { EditorState } from '@codemirror/state';
import { python } from '@codemirror/lang-python';
import { indentUnit } from '@codemirror/language';
import { keymap } from '@codemirror/view';
import { indentWithTab } from '@codemirror/commands';

export default defineComponent({
    name: 'App',
    setup() {
        onMounted(() => {
            const myDiv = document.getElementById('test-vue-div');

            if (myDiv) {
                let state = EditorState.create({
                    doc: `def my_function:\n\tpass`,
                    extensions: [
                        basicSetup,
                        python(),
                        indentUnit.of('    '),
                        keymap.of([indentWithTab]),
                    ],
                });

                let view = new EditorView({
                    state,
                    parent: myDiv,
                });

                console.log(view.state.doc.toString());
            }
        });

        return {};
    },
});
</script>

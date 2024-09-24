import { EditorState } from '@codemirror/state';
import { basicSetup, EditorView } from 'codemirror';
import { python } from '@codemirror/lang-python';
import { indentUnit } from '@codemirror/language';
import { keymap } from '@codemirror/view';
import { indentWithTab } from '@codemirror/commands';

export const getEditorInitialView = (myDiv: HTMLElement, responseCode: string) => {
    const editor_state = EditorState.create({
        doc: responseCode,
        extensions: [basicSetup, python(), indentUnit.of('\t'), keymap.of([indentWithTab])],
    });

    const editor_view = new EditorView({
        state: editor_state,
        parent: myDiv,
    });

    return {
        editor_view,
    };
};

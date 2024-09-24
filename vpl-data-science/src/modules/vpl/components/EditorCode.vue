<template>
    <EditorDescription :problemTitle="editor_title" :problemDescription="editor_description"/>
    <div
        class="w-[90%] ml-[5%] h-[300px] max-h-[300px] border border-black overflow-auto"
        :id="divContainerId"
    >
        <div class="w-full h-full" :id="divEditorId"></div>
    </div>
    <button @click="executePythonCode" :id="buttonId" class="flex mt-2 ml-[5%] btn btn-blue">
        Execute
    </button>
</template>

<script setup lang="ts">
import { PyodideApi } from '@/modules/vpl/api/pyodideApi';
import { onMounted, ref } from 'vue';
import { getEditorInitialView } from '@/modules/vpl/composables/editorState';
import { S3GetObject, s3GetPresignedUrl } from '@/modules/common/aws/s3_client';
import {getEditorChains} from "@/modules/vpl/composables/editorChain"
import EditorDescription from './EditorDescription.vue';


const editor_title = ref();
const editor_description = ref();
const editor_code = ref();
const editor_view = ref();

interface Props {
    buttonId: string;
    bucket_key: string;
    divContainerId: string;
    divEditorId: string;
}
const { bucket_key, divEditorId } = defineProps<Props>();

onMounted(async () => {
    const myDiv = document.getElementById(divEditorId);
    const documentContent = await S3GetObject(import.meta.env.VITE_BUCKET_NAME, bucket_key);
    const {title, description, code} = getEditorChains(documentContent)

    editor_title.value = title;
    editor_description.value = description;
    editor_code.value = code;
    
    if (myDiv) {
        let view = getEditorInitialView(myDiv, code);
        editor_view.value = view;
    }
});

const executePythonCode = async () => {
    const whl_url = await s3GetPresignedUrl(
        import.meta.env.VITE_BUCKET_NAME,
        import.meta.env.VITE_CUSTOM_LIB,
    );

    let python_code = editor_view.value.editor_view.viewState.state.doc.toString();
    PyodideApi(python_code, whl_url);
};
</script>

<style scoped>
.btn {
    @apply font-bold py-2 px-4 rounded;
}
.btn-blue {
    @apply bg-blue-500 text-white;
}
.btn-blue:hover {
    @apply bg-blue-700;
}
</style>

<template>
    <div class="flex-1 flex-col w-[80vw] h-[100%]">
        <EditorCode
            v-for="{ index, bucket_key, buttonId, divContainerId, divEditorId } in list_problems"
            :key="index"
            :bucket_key="bucket_key"
            :buttonId="buttonId"
            :divContainerId="divContainerId"
            :divEditorId="divEditorId"
        />
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import EditorCode from '@/modules/vpl/components/EditorCode.vue';
import { s3GetListObjects } from '@/modules/common/aws/s3_client';

const list_problems = ref();

onMounted(async () => {
    const list_objects = await s3GetListObjects(
        import.meta.env.VITE_BUCKET_NAME,
        import.meta.env.VITE_FOLDER_PROBLEMS,
    );

    list_problems.value = list_objects;
});
</script>

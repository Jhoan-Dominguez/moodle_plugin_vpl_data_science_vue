<template>
    <div class="w-[90%] ml-[5%] h-[100%] max-h-[150px] overflow-auto">
        <div class="lg:max-w-7xl">
            <h1 class="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                {{ problemTitle }}
            </h1>
            <p class="mt-4 mb-4 text-lg leading-6 text-black-900">
                {{ problemDescription }}
            </p>
        </div>
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';

interface Props {
    problemTitle?: string;
    problemDescription?: string;
}

defineProps<Props>();
</script>

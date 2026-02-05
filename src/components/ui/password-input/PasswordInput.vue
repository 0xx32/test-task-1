<script setup lang="ts">
import type { HTMLAttributes } from 'vue'

import { useVModel } from '@vueuse/core'
import { Eye, EyeOff } from 'lucide-vue-next'
import { ref } from 'vue'

import Input from '../input/Input.vue'

defineOptions({
	inheritAttrs: false,
})

const props = defineProps<{
	defaultValue?: number | string
	modelValue?: number | string
	class?: HTMLAttributes['class']
	wrapperClass?: HTMLAttributes['class']
}>()

const emits = defineEmits<{
	(e: 'update:modelValue', payload: number | string): void
}>()

const modelValue = useVModel(props, 'modelValue', emits, {
	passive: true,
	defaultValue: props.defaultValue,
})

const show = ref(false)

const toggleShow = () => {
	show.value = !show.value
}
</script>

<template>
	<div class="relative" :class="wrapperClass">
		<Input
			v-model="modelValue"
			:type="show ? 'text' : 'password'"
			v-bind="$attrs"
			:class="props.class"
		/>
		<button class="absolute top-1/2 right-2 -translate-y-1/2 cursor-pointer" @click="toggleShow">
			<Eye v-if="show" :size="18" class="text-muted-foreground" />
			<EyeOff v-else :size="18" class="text-muted-foreground" />
		</button>
	</div>
</template>

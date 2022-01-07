<template>
  <div class="form-input">
    <input class="form-input__input" readonly :value="value" v-on="listenersWrapper" />
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';

export default defineComponent({
  name: 'form-input',
  emits: ['input'],
  props: {
    value: String,
  },
  setup(props, { emit, listeners }) {
    const listenersWrapper = computed(() => ({
      ...listeners,
      input: (e: InputEvent) => emit('input', (e.target as HTMLInputElement).value),
    }));

    return {
      listenersWrapper,
    };
  },
});
</script>

<style scoped>
.form-input {
  position: relative;
  background: var(--color-input-bg);
  border-radius: var(--radius-default);
}

.form-input__input {
  cursor: auto;
  padding: var(--size-3);
  transition: box-shadow 0.15s ease-in-out;
}
</style>

<template>
  <div class="form-dropdown">
    <form-input :value="selectedItem?.text ?? ''" @click.native="toggle" />
    <div v-if="isOpened">
      <div :key="item.index" v-for="item in items" v-text="item.text" @click="select(item)" />
    </div>
  </div>
</template>

<script lang="ts">
import { PropType, computed, defineComponent, ref } from 'vue';
import FormInput from './form-input.vue';
import isEqual from 'lodash.isequal';

export default defineComponent({
  name: 'form-dropdown',
  components: {
    FormInput,
  },
  emits: ['input', 'change', 'update:value'],
  props: {
    options: {
      type: Array,
      required: true,
    },
    textParser: {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      type: Function as PropType<(item: any) => string>,
      default: (item: unknown) => item,
    },
    valueParser: {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      type: Function as PropType<(item: any) => string | number>,
      default: (item: unknown) => item,
    },
    value: {
      type: [Boolean, String, Number, Date, Object, Array],
    },
  },
  setup(props, { emit }) {
    const isOpened = ref(false);
    const items = computed(() => {
      return props.options.map((option, index) => ({
        option,
        index,
        text: props.textParser(option),
        value: props.valueParser(option),
      }));
    });
    const selectedItem = computed(() => items.value.find(item => isEqual(item.value, props.value)));

    function toggle() {
      console.log('toggling');

      if (isOpened.value) {
        close();
      } else {
        isOpened.value = true;
      }
    }

    function close() {
      isOpened.value = false;
    }

    function select(item: Record<string, unknown>) {
      console.log(`selected ${item.value}`);

      emit('input', item.value);
      emit('change', item);
      close();
    }

    return {
      items,
      isOpened,
      selectedItem,
      close,
      select,
      toggle,
    };
  },
});
</script>

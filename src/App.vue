<template>
  click in the dropdown, select an item and then try to select another
  <form-dropdown
    :value="selected"
    :options="options"
    :text-parser="getName"
    :value-parser="getId"
    @input="select" />
</template>

<script setup>
import { ref } from 'vue'
import FormDropdown from './components/form-dropdown.vue'

const options = [
  { id: 'op1', name: 'Option 1' },
  { id: 'op2', name: 'Option 2' },
  { id: 'op3', name: 'Option 3' },
];
const selected = ref('op1');

function getName(data) {
  return data.name;
}

function getId(data) {
  return data.id;
}

function select(v) {
  selected.value = v;
}
</script>

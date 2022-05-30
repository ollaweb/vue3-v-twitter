<template>
  <form @submit.prevent="onSubmit">
    <textarea
      required
      v-model="text"
      name=""
      id=""
      cols="30"
      rows="10"
    ></textarea>
    <button class="btn btnPrimary" type="submit">Submit</button>
  </form>
</template>

<script>
import { ref } from 'vue'
export default {
  emits: ['onSubmit'],
  setup(_, { emit }) {
    const text = ref('')
    const onSubmit = () => {
      emit('onSubmit', text.value)
      //reset
      text.value = ''
    }
    return { text, onSubmit }
  }
}
</script>

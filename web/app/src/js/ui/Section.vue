<template>
  <section :class="sectionClass" :id="id">
    <div class="container">
      <slot name="title"></slot>
      <slot name="description"></slot>
      <slot name="content"></slot>
    </div>
  </section>
</template>

<script>
export default {
  name: "Section",
  props: {
    id: {
      type: String,
      default: '',
    },
    sectionClass: {
      type: String,
      default: '',
    },
  }
}
</script>

<style>

</style>

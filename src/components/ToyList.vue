<template>
  <section class="toy-list">
    <RouterLink class="btn btn-add" to="/toy/edit">Add toy</RouterLink>
    <ul v-if="toys.length">
      <ToyPreview
        v-for="toy in toys"
        :key="toy._id"
        :toy="toy"
        @removed="$emit('removed', toy._id)"
        @toggled="$emit('toggled', toy)"
      />
    </ul>
  </section>
</template>

<script>
import ToyPreview from "./ToyPreview.vue";

export default {
  props: ["toys"],
  data() {
    return {};
  },
  components: {
    ToyPreview,
  },
};
</script>

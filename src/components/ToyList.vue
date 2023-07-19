<template>
  <section class="toy-list">
    <div class="btn-add-container">
      <RouterLink class="btn btn-add" to="/toy/edit">Add toy</RouterLink>
    </div>

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

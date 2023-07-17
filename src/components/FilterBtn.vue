<template>
  <section
    class="filter-btn flex align-center justify-center"
    :class="active"
    @click="setFilter"
  >
    <a class="btn">{{ button.title }}</a>
  </section>
</template>

<script>
export default {
  props: ["button"],

  methods: {
    setFilter() {
      this.$emit("filtered", this.button);
    },
  },
  computed: {
    active() {
      return { active: this.button.isActive };
    },
  },
};
</script>

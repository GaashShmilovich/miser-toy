<template>
  <RouterView />
</template>

<script>
import { RouterView } from "vue-router";
import { showSuccessMsg } from "./services/event-bus.service";
import UserMsg from "./components/UserMsg.vue";
export default {
  created() {
    this.$store
      .dispatch({ type: "loadToys" })
      .then(() => showSuccessMsg("HomePage Loaded"));
  },
  components: {
    UserMsg,
  },
};
</script>

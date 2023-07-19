<template>
  <AppHeader />
  <RouterView />
</template>

import AppHeader from "./components/AppHeader.vue"
<script>
import { RouterView } from "vue-router";
import { showSuccessMsg } from "./services/event-bus.service";
import UserMsg from "./components/UserMsg.vue";
import AppHeader from "./components/AppHeader.vue";
export default {
  created() {
    this.$store
      .dispatch({ type: "loadToys" })
      .then(() => showSuccessMsg("HomePage Loaded"));
  },
  components: {
    UserMsg,
    AppHeader,
  },
};
</script>

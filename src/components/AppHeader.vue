<template>
  <section>
    <div class="app-header">
      <h1 class="app-title">
        <router-link :to="{ name: 'toy' }">
          <img src="../assets/logo.png" alt="logo" />
        </router-link>
      </h1>
      <nav class="nav-container">
        <ul class="nav-list">
          <li class="nav-item">
            <router-link to="/" class="nav-link">Home</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/toy" class="nav-link">Toys store</router-link>
          </li>
        </ul>
      </nav>
    </div>
  </section>
</template>

<script>
export default {
  methods: {},
  computed: {},
};
</script>

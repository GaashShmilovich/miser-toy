<template>
<<<<<<< HEAD
  <section class="todo-filter">
    <div class="input-container">
      <div class="input">
        <el-input
          v-model="filterBy.txt"
          @input="setFilterTxt"
          placeholder="Search todo.."
          size="large"
          clearable
        />
      </div>
      <div class="filter-btns">
        <FilterBtn
          v-for="button in buttons"
          :button="button"
          :key="button.id"
          @filtered="setFilterStatus"
        />
      </div>
    </div>
    <div>
      <label for="multiple-select">Select multiple options:</label>
      <select
        class="multiple-select"
        id="multiple-select"
        name="multiple-options"
        v-model="filterBy.labels"
        @change="setFilterLabels"
        multiple
      >
        <option value="Doll">Doll</option>
        <option value="Action Figure">Action Figure</option>
        <option value="Creativity">Creativity</option>
        <option value="Building Blocks">Building Blocks</option>
        <option value="Vehicle">Vehicle</option>
      </select>
    </div>
    <div class="filter-sort">
      <select v-model="sortBy.by" @change="applySort">
        <option value="none">None</option>
        <option value="name">Name</option>
        <option value="price">Price</option>
        <option value="createdAt">Created At</option>
      </select>
      <button @click="toggleSortDirection">Toggle Sort Direction</button>
=======
  <section class="todo-filter flex space-between">
    <input
      class="input"
      v-model="filterBy.txt"
      @input="setFilterTxt"
      type="text"
      placeholder="Search todo.."
    />
    <label for="multiple-select">Select multiple options:</label>
    <select
      id="multiple-select"
      name="multiple-options"
      v-model="filterBy.labels"
      @change="setFilterLabels"
      multiple
    >
      <option value="Doll">Doll</option>
      <option value="Battery Powered">Battery Powered</option>
      <option value="Baby">Baby</option>
    </select>
    <div class="filter-btns flex align-center">
      <FilterBtn
        v-for="button in buttons"
        :button="button"
        :key="button.id"
        @filtered="setFilterStatus"
      />
>>>>>>> effaded1746e67828e47374e3a2b0d0bda83dd24
    </div>
    <select v-model="sortBy.by" @change="applySort">
      <option value="none">None</option>
      <option value="name">Name</option>
      <option value="price">Price</option>
      <option value="createdAt">Created At</option>
    </select>
    <button @click="toggleSortDirection">Toggle Sort Direction</button>
  </section>
</template>
<script>
import FilterBtn from "./FilterBtn.vue";

export default {
  components: {
    FilterBtn,
  },
  data() {
    return {
      input: "",
      filterBy: {
        txt: "",
        status: false,
        labels: [],
      },
      sortBy: {
        by: "none",
        desc: false,
      },
      buttons: [
        {
          id: "b1",
          type: "",
          isActive: true,
          title: "All",
        },
        {
          id: "b2",
          type: "in stock",
          isActive: false,
          title: "In stock",
        },
        {
          id: "b3",
          type: "not in stock",
          isActive: false,
          title: "Not in stock",
        },
      ],
    };
  },
  methods: {
    setFilterStatus(button) {
      this.filterBy.status = button.type;
      this.buttons.forEach((btn) => {
        btn.isActive = button.id === btn.id;
      });
      this.$emit("filteredStatus", this.filterBy.status);
    },
    setFilterTxt() {
      this.$emit("filteredTxt", this.filterBy.txt);
    },

    setFilterLabels() {
      this.$emit("filteredLabels", this.filterBy.labels);
      console.log("this.filterBy.labels", this.filterBy.labels);
    },
    applySort() {
      this.$store.commit("setSortBy", { ...this.sortBy });
    },

    toggleSortDirection() {
      this.sortBy.desc = !this.sortBy.desc;
      this.applySort();
    },
  },

  computed: {},
};
</script>

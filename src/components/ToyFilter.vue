<template>
  <section class="todo-filter flex space-between">
    <input
      class="input"
      v-model="filterBy.txt"
      @input="setFilterTxt"
      type="text"
      placeholder="Search todo.."
    />
    <div class="filter-btns flex align-center">
      <FilterBtn
        v-for="button in buttons"
        :button="button"
        :key="button.id"
        @filtered="setFilterStatus"
      />
    </div>
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
      filterBy: {
        txt: "",
        status: false,
      },
      sortBy: {
        by: "",
        desc: 1,
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
  },
};
</script>

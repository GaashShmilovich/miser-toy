<template>
  <section class="toy-app">
    <ToyFilter
      @filteredTxt="debounceHandler"
      @filteredStatus="setFilterByStatus"
      @filteredLabels="setFilterByLabels"
      @setSortBy="setSortBy"
    />
    <ToyList
      v-if="toys"
      :toys="toys"
      @removed="removeToy"
      @toggled="toggleToy"
    />
    <RouterView />
  </section>
</template>

<script>
import ToyList from "../components/ToyList.vue";
import ToyFilter from "../components/ToyFilter.vue";
// import Loader from "../components/Loader";
import { utilService } from "../services/util.service.js";
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service.js";

export default {
  name: "ToyIndex",
  components: {
    ToyList,
    ToyFilter,
    // Loader,
  },
  data() {
    return {
      isLoading: false,
      filterBy: {
        txt: "",
        status: "",
        labels: [],
        pageIdx: 0,
        pageSize: 5,
      },
      // sortBy: {
      //   by: "",
      //   desc: false,
      // },
    };
  },
  created() {
    this.debounceHandler = utilService.debounce(this.setFilterByTxt, 500);
  },
  methods: {
    removeToy(toyId) {
      this.$store
        .dispatch({ type: "removeToy", toyId })
        .then(() => {
          showSuccessMsg("Toy removed");
        })
        .catch((err) => {
          showErrorMsg("Cannot remove toy");
        });
    },
    toggleToy(toy) {
      const newToy = JSON.parse(JSON.stringify(toy));
      newToy.isDone = !newToy.isDone;
      this.$store
        .dispatch({ type: "saveToy", toy: newToy })
        .then(() => {
          showSuccessMsg("Toy updated");
        })
        .catch((err) => {
          showErrorMsg("Cannot update toy");
        });
    },
    filterToys() {
      const filterBy = { ...this.filterBy };
      // this.$store.commit({ type: "setFilterBy", filterBy });
      this.$store.dispatch({ type: "loadToys", filterBy });

      // If filtering in backend/service
      // this.isLoading = true
    },
    setPage(diff) {
      this.filterBy.pageIdx += diff;
      const maxPageIdx = Math.floor(this.toys.length / this.filterBy.pageSize);
      if (this.filterBy.pageIdx < 0) {
        this.filterBy.pageIdx = 0;
      } else if (this.filterBy.pageIdx > maxPageIdx) {
        this.filterBy.pageIdx = maxPageIdx;
      }
      this.filterToys();
    },
    setFilterByTxt(txt) {
      this.filterBy.txt = txt;
      this.filterToys();
    },
    setFilterByStatus(status) {
      this.filterBy.status = status;
      this.filterToys();
    },
    setFilterByLabels(labels) {
      this.filterBy.labels = labels;
      this.filterToys();
    },
    setSortBy(sortBy) {
      this.$store.commit({ type: "setSortBy", sortBy });
    },
  },
  computed: {
    toys() {
      return this.$store.getters.toysToDisplay;
    },
  },
  unmounted() {},
};
</script>

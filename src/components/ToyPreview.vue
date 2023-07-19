  <template>
    <li class="toy-card flex space-between">
      <p @click="$emit('toggled')" >
          <h3>{{ toy.name }}</h3>
      </p>

      <div>
        <button @click="$emit('removed')" class="btn">
          <span>x</span>
        </button>
              <RouterLink
                :to="'/toy/details/' + toy._id"
                class="btn">
                <span>Details</span>
              </RouterLink>
              <RouterLink
                :to="'/toy/edit/' + toy._id"
                class="btn">
                <span>Edit</span>
              </RouterLink>
      </div>
    </li>
  </template>

  <script>
  export default {
    name: "ToyPreview",
    props: ["toy"],
    computed: {
    },
  };
  </script>

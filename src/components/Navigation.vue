<template>
  <div>
    <header v-if="addCityActive" class="container add-city">
      <nav>
        <span>Weather HERE</span>
        <div class="rigth">
          <i class="far fa-edit" ref="editCities" @click="editCities"></i>
          <i class="fas fa-sync" @click="reloadApp"></i>
          <i class="fas fa-plus" @click="addCity"></i>
          <i class="fas fa-weather"></i>
        </div>
      </nav>
    </header>
    <header v-else class="container" :class="{day:isDay, night:isNight}">
      <nav>
        <router-link class="router-link" :to="{name:'AddCity'},">
          <i class="fas fa-angle-left"></i>
        </router-link>
        <span>Weather HERE</span>
        <span>&deg; C</span>
      </nav>
    </header>
  </div>
</template>

<script>
export default {
  name: "Navigation",
  props: ["addCityActive", "isDay", "isNight"],
  methods: {
    addCity() {
      this.$emit("addCity");
    },
    editCities() {
      this.$refs.editCities.classList.toggle("edit-active");
      this.$emit("editCity");
    },
    reloadApp() {
      location.reload();
    },
  },
};
</script>

<style lang="scss" scoped>
.add-city {
  background-color: #313640;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);
}

header {
  z-index: 99;
  position: fixed;
  width: 100%;

  nav {
    display: flex;
    color: #fff;
    padding: 30px 0;
    justify-content: space-between;
    i {
      cursor: pointer;
    }
  }

  .edit-active {
    color: rgba(210, 75, 75, 1);
  }

  .router-link {
    color: #fff;
    font-weight: 900;
  }

  .fas {
    margin-left: 16px;
  }

  span {
    font-weight: bold;
  }
}
</style>

<template>
  <header class="container add-city">
    <nav>
      <span>Add city</span>
      <div class="rigth">
        <i class="far fa-edit"></i>
        <i class="fas fa-sync"></i>
        <i class="fas fa-plus"></i>
      </div>
    </nav>
  </header>
</template>

<script>
export default {
  name: "Navigation",
};
</script>

<style lang="scss" scoped>
.add-city {
  background-color: #313640;
}
header {
  z-index: 99;
  position: fixed;
  width: 100%;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);

  nav {
    display: flex;
    color: #fff;
    padding: 30px 0;
    justify-content: space-between;
  }
  .fas {
    margin-left: 16px;
  }

  span {
    font-weight: bold;
  }
}
</style>

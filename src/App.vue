<template>
  <div class="main">
    <Navigation />
    <router-view :cities="cities"/>
  </div>
</template>

<script>
// plugin
import axios from "axios";
import db from "./firebase/firebaseinit";
import {
  collection,
  query,
  onSnapshot,
  updateDoc,
  doc,
} from "firebase/firestore";
import Navigation from "./components/Navigation.vue";

export default {
  name: "App",
  components: {
    Navigation,
  },
  data() {
    return {
      APIkey: "11766e3f9d10d8c040c5a5aca995163f",
      city: "Detroit",
      cities: [],
    };
  },
  created() {
    this.getCityWether();
  },
  methods: {
    getCityWether() {
      const q = query(collection(db, "cities"));
      onSnapshot(q, (snapshot) => {
        snapshot.docChanges().forEach(async (change) => {
          if (change.type === "added") {
            try {
              const response = await axios.get(
                `https://api.openweathermap.org/data/2.5/weather?q=${
                  change.doc.data().city
                }&units=imperial&appid=${this.APIkey}`
              );
              const data = response.data;

              const cityRef = doc(db, "cities", change.doc.id);
              updateDoc(cityRef, {
                currentWether: data,
              }).then(() => {
                this.cities.push(change.doc.data());
              });
            } catch (error) {
              console.log(error);
            }
          }
        });
      });
      // console.log(unsubscribe);
    },
  },
};
</script>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: "Quicksand", sans-serif;
}

.main {
  // max-width: 1024px;
  // margin: 0 auto;
  height: 100vh;
}

.container {
  padding: 0 20px;
}
</style>

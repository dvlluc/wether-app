<template>
  <div class="main">
    <Modal v-show="modalOpen" @closeModal="toggleModal" :APIkey="APIkey" />
    <Navigation @addCity="toggleModal" @editCity="toggleEdit" />
    <router-view :cities="cities" :edit="edit" :APIkey="APIkey"/>
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
import Modal from "./components/Modal.vue";

export default {
  name: "App",
  components: {
    Navigation,
    Modal,
  },
  data() {
    return {
      APIkey: "11766e3f9d10d8c040c5a5aca995163f",
      city: "Detroit",
      cities: [],
      modalOpen: false,
      edit: false,
    };
  },
  created() {
    this.getCityWeather();
  },
  methods: {
    toggleModal() {
      this.modalOpen = !this.modalOpen;
    },
    toggleEdit() {
      this.edit = !this.edit;
    },
    getCityWeather() {
      const q = query(collection(db, "cities"));
      onSnapshot(q, (snapshot) => {
        snapshot.docChanges().forEach(async (change) => {
          console.log(change.type);
          if (change.type === "added") {
            try {
              const response = await axios.get(
                `https://api.openweathermap.org/data/2.5/weather?q=${
                  change.doc.data().city
                }&units=metric&appid=${this.APIkey}`
              );
              const data = response.data;

              const cityRef = doc(db, "cities", change.doc.id);
              updateDoc(cityRef, {
                currentWeather: data,
              }).then(() => {
                const res = change.doc.data();
                res.id = change.doc.id;
                this.cities.push(res);
              });
            } catch (error) {
              console.log(error);
            }
          } else if (change.type === "removed") {
            console.log(this.cities);
            this.cities = this.cities.filter((city) => {
              return city.id !== change.doc.id;
            });
          }
        });
      });
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

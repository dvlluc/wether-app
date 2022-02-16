<template>
  <div class="main">
    <div v-if="loading" class="loading">
      <span> </span>
    </div>
    <div v-else class="app">
      <Modal
        v-show="modalOpen"
        @closeModal="toggleModal"
        :APIkey="APIkey"
        :cities="cities"
      />
      <Navigation
        @addCity="toggleModal"
        @editCity="toggleEdit"
        :addCityActive="addCityActive"
        :isDay="isDay"
        :isNight="isNight"
      />
      <router-view
        :cities="cities"
        :edit="edit"
        :APIkey="APIkey"
        @isDay="dayTime"
        @isNight="nightTime"
        @resetDays="resetDays"
        :isDay="isDay"
        :isNight="isNight"
        @addCity="toggleModal"
      />
    </div>
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
      cities: [],
      modalOpen: false,
      edit: false,
      addCityActive: false,
      isDay: null,
      isNight: null,
      loading: true,
    };
  },
  created() {
    this.getCityWeather();
    this.checkRoute();
  },
  methods: {
    resetDays() {
      this.isDay = false;
      this.isNight = false;
    },
    toggleModal() {
      this.modalOpen = !this.modalOpen;
    },
    toggleEdit() {
      this.edit = !this.edit;
    },
    getCityWeather() {
      const q = query(collection(db, "cities"));
      onSnapshot(q, (snapshot) => {
        if (snapshot.docs.length === 0) {
          this.loading = false;
        }
        snapshot.docChanges().forEach(async (change) => {
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
                this.loading = false;
              });
            } catch (error) {
              console.log(error);
            }
          } else if (change.type === "removed") {
            this.cities = this.cities.filter((city) => {
              return city.id !== change.doc.id;
            });
          }
        });
      });
    },
    checkRoute() {
      this.addCityActive = this.$route.name === "AddCity" ? true : false;
    },
    dayTime() {
      this.isDay = !this.isDay;
    },
    nightTime() {
      this.isNight = !this.isNight;
    },
  },
  watch: {
    $route() {
      this.checkRoute();
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

.loading {
  @keyframes spin {
    to {
      transform: rotateZ(360deg);
    }
  }
  display: flex;
  height: 100%;
  width: 100%;
  justify-content: center;
  align-items: center;
  span {
    display: block;
    width: 60px;
    height: 60px;
    margin: 0 auto;
    border: 2px solid transparent;
    border-top-color: #142a5f;
    border-radius: 50%;
    animation: spin ease 1000ms infinite;
  }
}

.day {
  transition: 500ms ease all;
  background-color: rgb(59, 150, 249);
}
.night {
  transition: 500ms ease all;
  background-color: rgb(20, 42, 95);
}

.day,
.night {
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);
}

.main {
  height: 100vh;
}

.container {
  padding: 0 20px;
}
</style>

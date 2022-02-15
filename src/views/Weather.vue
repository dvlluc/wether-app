<template>
  <h1>Weather</h1>
</template>

<script>
// import axios from "axios";
import db from "../firebase/firebaseinit";
import { collection, query, getDocs, where } from "firebase/firestore";
import axios from "axios";

export default {
  name: "Weather",
  props: ["APIkey"],
  data() {
    return {
      forecast: null,
      currentWeather: null,
      loading: true,
    };
  },
  created() {
    this.getWeather();
  },
  methods: {
    async getWeather() {
      const citiesRef = collection(db, "cities");
      const q = query(
        citiesRef,
        where("city", "==", `${this.$route.params.city}`)
      );
      const querySnapshot = await getDocs(q);
      this.currentWeather = querySnapshot.docs[0].data().currentWeather;
      console.log(this.currentWeather);
      axios
        .get(
          `https://api.openweathermap.org/data/2.5/onecall?lat=${this.currentWeather.coord.lat}&lon=${this.currentWeather.coord.lon}&exclude=current,minutley,alerts&units=imperial&appid=${this.APIkey}`
        )
        .then((res) => {
          this.forecast = res.data;
        })
        .then(() => {
          this.loading = false;
          console.log(this.loading);
          console.log(this.currentWeather);
          console.log(this.forecast);
        });
    },
  },
};
</script>

<style lang="scss" scoped>
h1 {
  padding-top: 100px;
  color: red;
}
</style>
>

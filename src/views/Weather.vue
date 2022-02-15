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
  beforeDestroy() {
    this.$emit("resetDays");
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
          `https://api.openweathermap.org/data/2.5/onecall?lat=${this.currentWeather.coord.lat}&lon=${this.currentWeather.coord.lon}&exclude=current,minutley,alerts&units=metric&appid=${this.APIkey}`
        )
        .then((res) => {
          this.forecast = res.data;
        })
        .then(() => {
          this.loading = false;
          this.getCurrentTime();
        });
    },
    getCurrentTime() {
      const dateObject = new Date();
      this.currentTime = dateObject.getHours();
      const sunrise = new Date(
        this.currentWeather.sys.sunrise * 1000
      ).getHours();
      const sunset = new Date(this.currentWeather.sys.sunset * 1000).getHours();
      if (this.currentTime > sunrise && this.currentTime < sunset) {
        this.$emit("isDay");
      } else {
        this.$emit("isNight");
      }
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

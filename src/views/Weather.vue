<template>
  <div class="main">
    <div v-if="loading" class="loading">
      <span> </span>
    </div>
    <div v-else class="weather" :class="{ day: isDay, night: isNight }">
      <div class="weather-wrap">
        <CurrentWeather
          :isDay="isDay"
          :isNight="isNight"
          :currentWeather="currentWeather"
          :forecast="forecast"
        />
        <HourlyWeather :forecast="forecast" />
        <WeeklyForecast :forecast="forecast" />
        <AdditionalInfo :currentWeather="currentWeather" />
      </div>
    </div>
  </div>
</template>

<script>
import db from "../firebase/firebaseinit";
import { collection, query, getDocs, where } from "firebase/firestore";
import axios from "axios";

import CurrentWeather from "../components/CurrentWeather.vue";
import HourlyWeather from "../components/HourlyWeather.vue";
import WeeklyForecast from "../components/WeeklyForecast.vue";
import AdditionalInfo from "../components/AdditionalInfo.vue";

export default {
  name: "Weather",
  components: { CurrentWeather, HourlyWeather, WeeklyForecast, AdditionalInfo },
  props: ["APIkey", "isDay", "isNight"],
  data() {
    return {
      forecast: null,
      currentWeather: null,
      loading: true,
      currentTime: null,
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
.weather {
  transition: 500ms ease;
  overflow: scroll;
  width: 100%;
  height: 100%;
  .weather-wrap {
    overflow: hidden;
    // max-width: 1024px;
    margin: 0 auto;
  }
}
</style>
>

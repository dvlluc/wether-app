<template>
  <div class="city" @click="goToWeather">
    <i
      v-if="edit"
      @click="removeCity"
      class="far fa-trash-alt edit"
      ref="edit"
    ></i>
    <span>
      {{ this.city.city }}
    </span>
    <div class="weather">
      <span> {{ Math.round(this.city.currentWeather.main.temp) }}&deg; </span>
      <img
        :src="
          require(`../../public/conditions/${this.city.currentWeather.weather[0].icon}.svg`)
        "
        alt=".img"
      />
    </div>
    <div class="video">
      <video
        :src="
          require(`../../public/videos/${this.city.currentWeather.weather[0].icon}.mp4`)
        "
        autoplay
        loop
        muted
      ></video>
      {{ this.city.currentWeather.weather[0].description }}
      <div class="bg-overlay"></div>
    </div>
  </div>
</template>

<script>
import db from "../firebase/firebaseinit";
import { doc, deleteDoc } from "firebase/firestore";

export default {
  name: "City",
  props: ["city", "edit"],
  data() {
    return {
      id: null,
    };
  },
  created() {},
  methods: {
    async removeCity() {
      await deleteDoc(doc(db, "cities", `${this.city.id}`));
    },
    goToWeather(e) {
      if (e.target !== this.$refs.edit) {
        this.$router.push({
          name: "Weather",
          params: { city: this.city.city },
        });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.city {
  display: flex;
  position: relative;
  flex-direction: column;
  padding: 20px;
  flex-basis: 48%;
  min-height: 250px;
  color: #fff;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
  opacity: 0.6;
  cursor: pointer;


  .edit {
    border-radius: 0px 15px 0 0;
    border: 10px solid rgb(77, 77, 77);
    background-color: rgb(77, 77, 77);
    z-index: 1;
    font-size: 20px;
    position: absolute;
    bottom: 0px;
    left: 0px;
    cursor: pointer;
    &:hover {
      color: rgba(210, 75, 75, 1);
    }
  }

  span {
    z-index: 1;
    text-transform: capitalize;
    display: block;
    font-size: 25px;
    font-weight: 600;
  }

  .weather {
    display: flex;
    z-index: 1;
    justify-content: flex-end;
    align-items: flex-end;
    flex: 1;
    span {
      font-size: 35px;
      margin-right: 8px;
    }
    img {
      height: 100px;
      width: auto;
    }
  }
  .video {
    overflow: hidden;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;

    video {
      height: 100%;
      @media (min-width: 900px) {
        height: auto;
        width: 100%;
      }
    }

    .bg-overlay {
      position: absolute;
      height: 100%;
      width: 100%;
      top: 0;
      background-color: rgba(0, 0, 0, 0.2);
    }
  }
}

.city:hover {
  opacity: 1;
  transition: 1s;
}
</style>

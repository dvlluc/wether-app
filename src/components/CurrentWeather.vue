<template>
  <div class="current-weather">
    <div class="container">
      <div class="weather-info">
        <span class="city">{{ this.currentWeather.name }}</span>
        <span class="current-temperature">{{
          Math.round(this.currentWeather.main.temp)
        }}</span>
        <div class="high-low-temperatures">
          <div class="high">
            <i class="fas fa-chevron-up"></i>
            <span
              >{{ Math.round(this.currentWeather.main.temp_max) }}&deg;C</span
            >
          </div>
          <div class="low">
            <i class="fas fa-chevron-down"></i>
            <span
              >{{ Math.round(this.currentWeather.main.temp_min) }}&deg;C</span
            >
          </div>
        </div>
        <span class="condition">{{
          this.currentWeather.weather[0].description
        }}</span>
        <span class="feels-like"
          >Feels like
          {{ Math.round(this.currentWeather.main.feels_like) }}&deg;C</span
        >
      </div>
      <div>
        <span class="current-date">
          {{
            new Date().toLocaleString("en-GB", {
              timeZone: this.forecast.timezone,
            })
          }}
        </span>
      </div>
      <div class="weather-icon">
        <img v-if="isDay" src="../../public/sun.png" alt="sun" />
        <img v-if="isNight" src="../../public/moon.png" alt="moon" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "CurrentWeather",
  props: ["currentWeather", "forecast", "isDay", "isNight"],
};
</script>

<style lang="scss" scoped>
.current-weather {
  margin-top: 90px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.7);
  .container {
    margin: 30px 0;
    min-height: 366px;
    position: relative;
    display: flex;
    color: #fff;
  }
  span {
    display: block;
  }
  .weather-info {
    padding-top: 30px;
    flex: 1;
    .city {
      font-size: 24px;
      font-weight: 500;
    }
    .current-temperature {
      margin-top: 40px;
      font-size: 80px;
      font-weight: 600;
    }
  }
  .high-low-temperatures {
    display: flex;
    gap: 16px;
    .high,
    .low {
      display: flex;
      span {
        margin-left: 8px;
      }
    }
  }
  .condition {
    text-transform: capitalize;
    font-size: 24px;
    font-weight: 500;
    margin: 60px 0 8px 0;
  }
  .feels-like {
    font-size: 14px;
    font-weight: 400;
  }
  .weather-icon {
    height: 100%;
    position: absolute;
    right: -180px;
    display: flex;
    align-items: center;
    img {
      width: 366px;
      height: 366px;
      animation-name: spin;
      animation-duration: 4000ms;
      animation-iteration-count: infinite;
      animation-timing-function: linear;

      @keyframes spin {
        from {
          transform: rotate(0deg);
        }
        to {
          transform: rotate(360deg);
        }
      }
    }
  }

  .current-date {
    font-weight: 600;
    margin-right: 80px;
  }
}
</style>

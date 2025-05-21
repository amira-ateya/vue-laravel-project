<template>
  <div class="stats-card" :style="{ borderLeft: `4px solid ${color}` }">
    <div class="stats-icon">
      <i :class="icon" :style="{ color }"></i>
    </div>
    <div class="stats-content">
      <h3>{{ title }}</h3>
      <p class="stats-value">{{ value }}</p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: String,
    value: [Number, String],
    icon: String,
    color: String
  }
}
</script>

<style scoped>
.stats-card {
  background: white;
  border-radius: 8px;
  padding: 20px;
  display: flex;
  align-items: center;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.stats-icon {
  font-size: 24px;
  margin-right: 15px;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: rgba(67, 97, 238, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
}

.stats-content h3 {
  font-size: 14px;
  color: #6c757d;
  margin-bottom: 5px;
  font-weight: 500;
}

.stats-value {
  font-size: 24px;
  font-weight: 600;
  color: #2b2d42;
  margin: 0;
}
</style>
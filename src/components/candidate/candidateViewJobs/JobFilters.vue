<!-- NEED TO BE MODULARIZED LATER: MAKE COMPONENT FOR EACH ACCORDION ITEM -->
<template>
  <div class="ms-5">
    <!--////////////////////////////////////////////////////////////////////////////////////////////////////////-->

    <div class="accordion custom-accordion" id="filterAccordion">

      <!-- FILTER: employment type -->
      <div class="accordion-item border-0">

        <!-- HEADER -->
        <h2 class="accordion-header">
          <button class="accordion-button no-bg shadow-none" type="button" data-bs-toggle="collapse" data-bs-target="#employmentCollapse">
            Employment Type
          </button>
        </h2>

        <!-- COLLAPSED PART -->
        <div id="employmentCollapse" class="accordion-collapse collapse show" data-bs-parent="#filterAccordion">

          <!-- body -->
          <div class="accordion-body pt-0">
            <!-- --------------------------------BODY-PART---------------------------------------------------- -->
            <div class="form-check" v-for="type in employmentTypes" :key="type">
              <input class="form-check-input" type="checkbox" :value="type" v-model="selectedEmploymentTypes">
              <label class="form-check-label">{{ type }}</label>
            </div>
            <!-- --------------------------------------------------------------------------------------------- -->
          </div>

        </div>

      </div>

      <!--////////////////////////////////////////////////////////////////////////////////////////////////////////-->

      <!-- FILTER: categories -->
      <div class="accordion-item border-0">

        <!-- HEADER -->
        <h2 class="accordion-header">
          <button class="accordion-button no-bg shadow-none" type="button" data-bs-toggle="collapse" data-bs-target="#categoriesCollapse">
            Categories
          </button>
        </h2>

        <!-- COLLAPSED PART -->
        <div id="categoriesCollapse" class="accordion-collapse collapse show" data-bs-parent="#filterAccordion">

          <!-- body -->
          <div class="accordion-body pt-0">
            <div class="form-check" v-for="cat in categories" :key="cat">
              <input class="form-check-input" type="checkbox" :value="cat" v-model="selectedCategories">
              <label class="form-check-label">{{ cat }}</label>
            </div>
          </div>

        </div>

      </div>

      <!--////////////////////////////////////////////////////////////////////////////////////////////////////////-->

      <!-- FILTER: job level -->
      <div class="accordion-item border-0">

        <!-- HEADER -->
        <h2 class="accordion-header">
          <button class="accordion-button no-bg shadow-none" type="button" data-bs-toggle="collapse" data-bs-target="#levelCollapse">
            Job Level
          </button>
        </h2>

        <!-- COLLAPSED PART -->
        <div id="levelCollapse" class="accordion-collapse collapse show" data-bs-parent="#filterAccordion">

          <!-- body -->
          <div class="accordion-body pt-0">
            <div class="form-check" v-for="level in jobLevels" :key="level">
              <input class="form-check-input" type="checkbox" :value="level" v-model="selectedJobLevels">
              <label class="form-check-label">{{ level }}</label>
            </div>
          </div>

        </div>

      </div>

    </div>
  </div>
</template>


<!--===============================SCRIPT============================ -->

<script setup>
import { ref, watch } from 'vue';

// ------------------ Filters Data ------------------ //
const employmentTypes = ['Full-time', 'Part-time', 'Freelance', 'Internship'];
const categories = ['Design', 'Sales', 'Marketing', 'Business'];
const jobLevels = ['Entry', 'Mid', 'Senior', 'Director'];

const selectedEmploymentTypes = ref([]);
const selectedCategories = ref([]);
const selectedJobLevels = ref([]);

// ------------------ Emit Events ------------------ //
const emit = defineEmits([
  'filter-employment-type-changed',
  'filter-categories-changed',
  'filter-job-level-changed'
]);

// ------------------ Watchers ------------------ //
watch(selectedEmploymentTypes, (newVal) => {
  emit('filter-employment-type-changed', { employmentTypes: newVal });
});

watch(selectedCategories, (newVal) => {
  emit('filter-categories-changed', { categories: newVal });
});

watch(selectedJobLevels, (newVal) => {
  emit('filter-job-level-changed', { jobLevels: newVal });
});
</script>






<!--=========================STYLING========================================== -->
<style scoped>
.custom-accordion .accordion-item {
  border: none;
}

.custom-accordion .accordion-button {
  background-color: transparent;
  box-shadow: none;
  font-weight: bold;
  padding-left: 0;
  color: #212529;
}

.custom-accordion .accordion-button:focus {
  box-shadow: none;
}

.custom-accordion .accordion-button:not(.collapsed) {
  background-color: transparent !important;
  color: #212529 !important;
  box-shadow: none;
}

.custom-accordion .accordion-body {
  padding-left: 0.5rem;
}
</style>

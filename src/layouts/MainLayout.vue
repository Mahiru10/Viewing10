<template>
  <AppHeader />

  <JobRanking />
  <HiringFormsList />

  <router-view></router-view>
  <!-- This ensures child routes load properly -->
</template>

<script>
import AppHeader from 'components/Header.vue'
import JobRanking from 'components/JobRanking.vue'
import HiringFormsList from 'components/HiringFormsList.vue'

export default {
  components: {
    AppHeader,
    JobRanking,
    HiringFormsList,
  },
}
</script>

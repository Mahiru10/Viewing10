import { defineStore } from 'pinia';

export const useMyStore = defineStore('myStore', {
  state: () => ({
    jobs: [],
  }),
  actions: {
    setJobs(newJobs) {
      this.jobs = newJobs;
    },
  },
});

<template>
  <div class="add-job">
    <h2 class="text-2xl font-semibold">Add New Job</h2>
    <form @submit.prevent="submitJob">
      <div class="mb-4">
        <label for="title" class="block text-gray-600 font-medium">Job Title</label>
        <input v-model="newJob.title" type="text" id="title" class="w-full p-2 border border-gray-300 rounded-md mt-1" required />
      </div>
      <div class="mb-4">
        <label for="company" class="block text-gray-600 font-medium">Company Name</label>
        <input v-model="newJob.company" type="text" id="company" class="w-full p-2 border border-gray-300 rounded-md mt-1" required />
      </div>
      <div class="mb-4">
        <label for="description" class="block text-gray-600 font-medium">Job Description</label>
        <textarea v-model="newJob.description" id="description" class="w-full p-2 border border-gray-300 rounded-md mt-1" required></textarea>
      </div>
      <div class="mb-4">
        <label for="qualifications" class="block text-gray-600 font-medium">Qualifications</label>
        <textarea v-model="newJob.qualifications" id="qualifications" class="w-full p-2 border border-gray-300 rounded-md mt-1" required></textarea>
      </div>
      <div class="mb-4">
        <label for="compensation" class="block text-gray-600 font-medium">Compensation & Benefits</label>
        <input v-model="newJob.compensation" type="text" id="compensation" class="w-full p-2 border border-gray-300 rounded-md mt-1" required />
      </div>
      <div class="mb-4">
        <label for="application" class="block text-gray-600 font-medium">Where to Apply</label>
        <input v-model="newJob.application" type="text" id="application" class="w-full p-2 border border-gray-300 rounded-md mt-1" required />
      </div>
      <button type="submit" class="btn-green mt-3">Submit Job</button>
      <button @click="cancel" class="btn-red mt-3">Cancel</button>
    </form>
    <!-- <p v-if="submissionMessage" class="text-green-600">{{ submissionMessage }}</p> -->
  </div>
</template>

<script>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

export default {
  setup() {
    const router = useRouter()
    const newJob = ref({
      title: '',
      company: '',
      description: '',
      qualifications: '',
      compensation: '',
      application: '',
    })
    const submissionMessage = ref('')

    const submitJob = () => {
      console.log('New job submitted:', newJob.value)
      submissionMessage.value = 'Job added successfully!'
      router.push('/jobs')
    }

    const cancel = () => {
      if (confirm('Are you sure you want to cancel?')) {
        router.push('/jobs')
      }
    }

    return {
      newJob,
      submitJob,
      cancel,
      submissionMessage,
    }
  },
}
</script>

<style scoped>
.add-job {
  margin-bottom: 20px;
}
</style>

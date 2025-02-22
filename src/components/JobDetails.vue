<template>
  <div class="job-details">
    <h2 class="text-2xl font-semibold">Job Details</h2>
    <p><strong>Company Name:</strong> {{ jobDetails.company }}</p>
    <p><strong>Job Title:</strong> {{ jobDetails.title }}</p>
    <p><strong>Job Description:</strong> {{ jobDetails.description }}</p>
    <p><strong>Qualifications:</strong> {{ jobDetails.qualifications }}</p>
    <p><strong>Compensation & Benefits:</strong> {{ jobDetails.compensation }}</p>
    <p><strong>Where to Apply:</strong> {{ jobDetails.application }}</p>
    <button @click="editJob" class="btn-blue mt-3">Edit</button>
    <button @click="deleteJob" class="btn-red mt-3">Delete</button>
    <button @click="confirmReturn" class="btn-red mt-3">Return</button>
  </div>
</template>

<script>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

export default {
  setup() {
    const router = useRouter()
    const jobDetails = ref({
      company: 'Tagum Doctors Hospital',
      title: 'Registered Nurse',
      description: 'Provide patient care and administer treatments.',
      qualifications: 'Must be a licensed nurse with at least 1-year experience.',
      compensation: '₱25,000 - ₱35,000 per month + benefits',
      application: 'Submit application to: HR Department, Tagum Doctors Hospital.',
    })

    const editJob = () => {
      router.push(`/jobs/edit/${jobDetails.value.id}`); // Ensure job ID is available
    }

    const deleteJob = () => {
      if (confirm('Are you sure you want to delete this job?')) {
        // Logic to delete the job (mock implementation)
        console.log('Job deleted:', jobDetails.value);
        router.push('/jobs'); // Redirect after deletion
      }
    }

    const confirmReturn = () => {
      if (confirm('Are you sure you want to return?')) {
        router.push('/jobs'); // Navigate back to the jobs list
      }
    }

    return {
      jobDetails,
      editJob,
      deleteJob,
      confirmReturn,
    }
  },
}
</script>

<style scoped>
.job-details {
  margin-bottom: 20px;
}
</style>

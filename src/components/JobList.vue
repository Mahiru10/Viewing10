  <template>
    <div class="job-list">
      <h2 class="text-2xl font-semibold">Job List</h2>
      <ul>
        <li v-for="(job, index) in jobs" :key="index" class="flex justify-between p-2 border-b">
          <span>{{ job.title }}</span>
          <div>
            <button @click="editJob(job.id)" class="btn-blue">Edit</button>
            <button @click="deleteJob(job.id)" class="btn-red">Delete</button>
          </div>
        </li>
      </ul>
    </div>
  </template>

  <script>
  import { ref } from 'vue'
  import { useRouter } from 'vue-router'

  export default {
    setup() {
      const router = useRouter()
      const jobs = ref([
        { id: 1, title: 'Software Engineer' },
        { id: 2, title: 'Registered Nurse' },
        { id: 3, title: 'Data Scientist' },
      ])

      const editJob = (id) => {
        router.push(`/jobs/edit/${id}`)
      }

      const deleteJob = (id) => {
        if (confirm('Are you sure you want to delete this job?')) {
          jobs.value = jobs.value.filter(job => job.id !== id)
          console.log(`Job with id ${id} deleted`)
        }
      }

      return {
        jobs,
        editJob,
        deleteJob,
      }
    },
  }
  </script>

  <style scoped>
  .job-list {
    margin-bottom: 20px;
  }
  </style>

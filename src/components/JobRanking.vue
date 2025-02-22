<template>
  <div class="job-ranking-container flex flex-row p-6 bg-white shadow-lg rounded-lg space-x-8">
    <!-- Trending Jobs Section -->
    <div class="job-list w-1/2 pr-6 bg-gray-50 p-4 rounded-lg shadow-md">
      <h2 class="text-2xl font-semibold mb-4 text-center text-gray-700">Trending Jobs</h2>
      <ul>
        <li
          v-for="(job, index) in rankedJobs"
          :key="index"
          class="flex items-center p-3 border-b last:border-b-0 bg-white rounded-md shadow-sm hover:bg-gray-100 transition"
        >
          <img
            src="https://images.unsplash.com/photo-1534665482403-a909d0d97c67?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&dl=danial-igdery-FCHlYvR5gJI-unsplash.jpg"
            alt="Job Image"
            class="rounded-full mr-3 border border-gray-300 shadow-sm"
            style="width: 48px; height: 48px"
          />
          <div class="flex-1">
            <span class="font-semibold text-lg text-gray-800">{{ job.title }}</span>
            <span class="block text-sm text-gray-600">{{ job.clicks }} clicks</span>
          </div>
        </li>
      </ul>
    </div>

    <!-- Chart Section -->
    <div
      class="chart-container w-1/2 bg-gray-50 p-6 rounded-lg shadow-md flex justify-center items-center"
    >
      <canvas id="jobChart"></canvas>
    </div>
  </div>

  <!-- Edit Modal Section -->
  <div v-if="showModal" class="modal-overlay">
    <div class="modal-content bg-green-500">
      <h3>Edit Job</h3>
      <input
        type="text"
        v-model="editedJob.title"
        class="modal-input"
        placeholder="Edit Job Title"
      />
      <div class="modal-buttons">
        <button @click="saveChanges" class="btn-save">Save</button>
        <button @click="cancelEdit" class="btn-cancel">Cancel</button>
      </div>
    </div>
  </div>
</template>

<script>
import Chart from 'chart.js/auto'

export default {
  data() {
    return {
      rankedJobs: [
        { title: 'Software Engineer', clicks: 120 },
        { title: 'Registered Nurse', clicks: 95 },
        { title: 'Data Scientist', clicks: 80 },
      ],
      showModal: false,
      editedJob: { title: '' },
    }
  },
  mounted() {
    this.renderChart()
  },
  methods: {
    renderChart() {
      const ctx = document.getElementById('jobChart').getContext('2d')
      new Chart(ctx, {
        type: 'bar',
        data: {
          labels: this.rankedJobs.map((job) => job.title),
          datasets: [
            {
              label: 'Clicks',
              data: this.rankedJobs.map((job) => job.clicks),
              backgroundColor: ['#1D4ED8', '#10B981', '#F59E0B'],
              borderColor: ['#1E40AF', '#047857', '#B45309'],
              borderWidth: 2,
              borderRadius: 5,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            y: { beginAtZero: true },
          },
          plugins: {
            legend: { display: false },
          },
        },
      })
    },
    openModal(job) {
      this.editedJob = { ...job }
      this.showModal = true
    },
    saveChanges() {
      const index = this.rankedJobs.findIndex((job) => job.title === this.editedJob.title)
      if (index !== -1) {
        this.rankedJobs[index] = { ...this.editedJob }
      }
      this.showModal = false
    },
    cancelEdit() {
      this.showModal = false
    },
  },
}
</script>

<style scoped>
.job-ranking-container {
  display: flex;
  gap: 40px;
  align-items: flex-start;
  max-width: 1000px;
  margin: auto;
}

.job-list,
.chart-container {
  flex: 1;
  background-color: #f9fafb;
}

.chart-container {
  height: 350px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.job-ranking ul {
  list-style-type: none;
  padding: 0;
}

.job-ranking li {
  display: flex;
  align-items: center;
  padding: 8px;
  border: 1px solid #e2e8f0;
  border-radius: 6px;
  margin-bottom: 8px;
  transition:
    background-color 0.3s,
    transform 0.2s;
}

.job-ranking li:hover {
  background-color: #f0fdfa;
  transform: scale(1.02);
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  background-color: #38a169;
  padding: 20px;
  border-radius: 8px;
  width: 300px;
  text-align: center;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.modal-input {
  width: 100%;
  padding: 10px;
  margin-top: 10px;
  border-radius: 6px;
  border: 1px solid #ddd;
}

.modal-buttons {
  margin-top: 15px;
}

.btn-save {
  background-color: #1d4ed8;
  color: white;
  padding: 8px 15px;
  border-radius: 6px;
  margin-right: 10px;
  cursor: pointer;
}

.btn-cancel {
  background-color: #e53e3e;
  color: white;
  padding: 8px 15px;
  border-radius: 6px;
  cursor: pointer;
}

.btn-save:hover {
  background-color: #2563eb;
}

.btn-cancel:hover {
  background-color: #f87171;
}
</style>

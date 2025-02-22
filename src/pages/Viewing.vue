<template>
  <body>
    <div class="job-application-system">
      <!-- Header -->
      <header class="header flex items-center justify-between">
        <div class="flex items-center space-x-2">
          <img
            src="https://upload.wikimedia.org/wikipedia/en/3/33/Ph_seal_Tagum.png"
            alt="City Icon"
            class="w-8 h-8"
          />
          <h1 class="text-2xl font-semibold text-white">Looking for a Job?</h1>
        </div>
      </header>

      <!-- Search Bar -->
      <div class="search-container">
        <input
          type="text"
          v-model="searchQuery"
          placeholder="Search for jobs..."
          class="search-input"
        />
      </div>

      <h2 class="font-bold">List of Available Jobs</h2>

      <div class="job-list-container">
        <ul class="job-list">
          <li v-for="(form, index) in filteredJobs" :key="index" class="job-item">
            <div class="job-info">
              <h3 class="font-semibold text-lg" :style="{ fontSize: '2.50rem' }">
                {{ form.COMPANY_NAME }} - {{ form.JOB_TITLE }}
              </h3>
            </div>
            <div class="job-button">
              <button @click="viewForm(form)" class="btn-green btn-green-big">
                View Details
              </button>
            </div>
          </li>
        </ul>
      </div>

      <!-- Job Details Modal (without transitions) -->
      <div v-if="viewingForm" class="modal-overlay">
        <div class="modal-content modal-job-details">
          <header class="modal-header">
            <h3>Job Details</h3>
            <button class="close-button" @click="closeViewForm">&times;</button>
          </header>
          <div class="modal-body">
            <!-- Company Name & Job Title Section -->
            <div class="modal-section">
              <h4>Company Name & Job Title</h4>
              <div>{{ selectedForm.COMPANY_NAME }} - {{ selectedForm.JOB_TITLE }}</div>
            </div>
            <div class="modal-section">
              <h4>Job Description</h4>
              <!-- Newlines are preserved -->
              <div v-html="selectedForm.JOB_DESCRIPTION"></div>
            </div>
            <div class="modal-section">
              <h4>Qualifications</h4>
              <div v-html="selectedForm.QUALIFICATIONS"></div>
            </div>
            <div class="modal-section">
              <h4>Compensation & Benefits</h4>
              <div v-html="selectedForm.COMPENSATION"></div>
            </div>
            <div class="modal-section">
              <h4>Where to Apply</h4>
              <div v-html="selectedForm.WHERE_TO_APPLY"></div>
            </div>
          </div>
          <footer class="modal-footer">
            <button @click="closeViewForm" class="btn btn-gray">
              Return ({{ timer }}s)
            </button>
          </footer>
        </div>
      </div>
    </div>
  </body>
</template>

<script>
import { ref, computed, onMounted } from "vue";

export default {
  name: "JobApplicationSystem",
  setup() {
    const hiringForms = ref([]);
    const searchQuery = ref("");
    const selectedForm = ref(null);
    const viewingForm = ref(false);
    const timer = ref(300); // 5-minute timer (300 seconds)
    let countdownInterval = null;

    const fetchJobs = async () => {
      try {
        const response = await fetch(
          "http://10.0.1.26:82/jobapplication/api/get_jobs.php"
        );
        const data = await response.json();
        hiringForms.value = data;
      } catch (error) {
        console.error("API Fetch Error:", error);
      }
    };

    onMounted(fetchJobs);

    const filteredJobs = computed(() => {
      if (!searchQuery.value) return hiringForms.value;
      return hiringForms.value.filter(
        (job) =>
          job.JOB_TITLE.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
          job.COMPANY_NAME.toLowerCase().includes(searchQuery.value.toLowerCase())
      );
    });

    const viewForm = (form) => {
      selectedForm.value = form;
      viewingForm.value = true;
      startTimer();
    };

    const startTimer = () => {
      timer.value = 300; // Reset timer to 5 minutes
      clearInterval(countdownInterval);
      countdownInterval = setInterval(() => {
        if (timer.value > 0) {
          timer.value--;
        } else {
          clearInterval(countdownInterval);
          closeViewForm();
        }
      }, 1000);
    };

    const closeViewForm = () => {
      viewingForm.value = false;
      selectedForm.value = null;
      clearInterval(countdownInterval);
    };

    return {
      hiringForms,
      searchQuery,
      filteredJobs,
      selectedForm,
      viewingForm,
      timer,
      viewForm,
      closeViewForm,
    };
  },
};
</script>

<style>
/* Custom Scrollbar for the Whole Page */
::-webkit-scrollbar {
  width: 6px;
}
::-webkit-scrollbar-track {
  background: #f0f0f0;
  border-radius: 10px;
}
::-webkit-scrollbar-thumb {
  background: #28a745;
  border-radius: 10px;
}
::-webkit-scrollbar-thumb:hover {
  background: #218838;
}

/* Global & Layout */
body {
  margin: 0;
  padding: 0;
  background-color: #d3d3d3;
  font-family: "Arial", sans-serif;
}
.job-application-system {
  max-width: 1400px;
  margin: 40px auto;
  padding: 30px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.1);
  overflow-x: hidden;
}

/* Header */
header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #28a745;
  border-radius: 12px 12px 0 0;
  padding: 20px;
}

/* Job List */
.job-list {
  list-style: none;
  padding: 0;
}
.job-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  border-radius: 8px;
  background-color: #fafafa;
  margin-bottom: 15px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: background-color 0.3s, transform 0.2s;
  flex-wrap: wrap;
}
.job-item:hover {
  background-color: #f0f0f0;
  transform: translateY(-2px);
}

/* Buttons */
.btn {
  padding: 10px 15px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 14px;
  transition: background-color 0.3s, transform 0.2s;
}
.btn-green {
  border: none;
  border-radius: 12px;
  background-color: #28a745;
  color: white;
  cursor: pointer;
}
.btn-gray {
  border: none;
  border-radius: 15px;
  background-color: #6c757d;
  color: white;
}
.btn:hover {
  transform: translateY(-2px);
}
.btn-green-big {
  padding: 15px 25px;
  font-size: 18px;
  transition: transform 0.3s ease-in-out;
}
.btn-green-big:hover {
  transform: scale(1.1);
}

/* Search Bar */
.search-container {
  margin: 20px 0;
  text-align: center;
}
.search-input {
  width: 80%;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

/* Modal Overlay */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
}

/* Modal Content */
.modal-content {
  background: white;
  border-radius: 12px;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.2);
  overflow: hidden;
  width: 100%;
  max-width: 500px;
}

/* Modal Header */
.modal-header {
  background-color: #28a745;
  color: white;
  padding: 15px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.modal-header h3 {
  margin: 0;
  font-size: 1.5rem;
}
.close-button {
  background: transparent;
  border: none;
  font-size: 1.5rem;
  color: white;
  cursor: pointer;
}

/* Modal Body */
.modal-body {
  padding: 20px;
  max-height: 60vh;
  overflow-y: auto;
}
.modal-section {
  margin-bottom: 15px;
}
.modal-section h4 {
  margin: 0 0 5px;
  font-size: 1rem;
  color: #333;
}
.modal-section p,
.modal-section div {
  margin: 0;
  font-size: 0.9rem;
  color: #555;
  line-height: 1.5;
  white-space: pre-line; /* Preserves newlines */
}

/* Modal Footer */
.modal-footer {
  background-color: #f1f1f1;
  padding: 15px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

/* Tablet Responsiveness (up to 1024px) */
@media (max-width: 1024px) {
  .job-application-system {
    max-width: 90%;
    padding: 20px;
  }
  .search-input {
    width: 90%;
  }
  .btn-green-big {
    padding: 12px 20px;
    font-size: 16px;
  }
  .job-item {
    padding: 10px;
  }
  .modal-content {
    max-width: 90%;
  }
}

/* Mobile Responsiveness (up to 768px) */
@media (max-width: 768px) {
  .job-item {
    flex-direction: column;
    text-align: center;
  }
  .job-item div {
    max-width: 100%;
  }
}
</style>

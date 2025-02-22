<template>
  <div class="hiring-forms">
    <h2 class="text-2xl font-semibold">Hiring Forms</h2>

    <ul>
      <li
        v-for="(form, index) in hiringForms"
        :key="index"
        class="flex justify-between p-2 border-b"
      >
        <span>{{ form.jobTitle }}</span>
        <div>
          <button @click="viewForm(form)" class="btn-blue">View</button>
          <button @click="editForm(form)" class="btn-yellow">Edit</button>
          <button @click="confirmDelete(form.id)" class="btn-red">Delete</button>
        </div>
      </li>
    </ul>

    <button @click="showAddJobModal" class="btn-green mt-3">Add Hiring Form</button>
    <button @click="logout" class="logout-btn">Logout</button>

    <!-- View Job Details Modal -->
    <div v-if="viewingForm" class="modal-overlay">
      <div class="modal-content">
        <h3 class="text-lg font-semibold">Job Details</h3>
        <p><strong>Company Name:</strong> {{ selectedForm.companyName }}</p>
        <p><strong>Job Title:</strong> {{ selectedForm.jobTitle }}</p>
        <p><strong>Job Description:</strong> {{ selectedForm.jobDescription }}</p>
        <p><strong>Qualifications:</strong> {{ selectedForm.qualifications }}</p>
        <p><strong>Compensation & Benefits:</strong> {{ selectedForm.benefits }}</p>
        <p><strong>Where to Apply:</strong> {{ selectedForm.whereToApply }}</p>
        <div class="modal-footer">
          <button @click="confirmReturn" class="btn-gray">Return</button>
        </div>
      </div>
    </div>

    <!-- Edit Job Modal -->
    <div v-if="editingForm" class="modal-overlay">
      <div class="modal-content">
        <h3 class="text-lg font-semibold">Edit Job</h3>
        <input v-model="selectedForm.companyName" placeholder="Company Name" class="input-box" />
        <input v-model="selectedForm.jobTitle" placeholder="Job Title" class="input-box" />
        <textarea
          v-model="selectedForm.jobDescription"
          placeholder="Job Description"
          class="input-box"
        ></textarea>
        <input
          v-model="selectedForm.qualifications"
          placeholder="Qualifications"
          class="input-box"
        />
        <input
          v-model="selectedForm.benefits"
          placeholder="Compensation & Benefits"
          class="input-box"
        />
        <input v-model="selectedForm.whereToApply" placeholder="Where to Apply" class="input-box" />
        <button @click="showSaveConfirmation" class="btn-yellow">Save Changes</button>
        <button @click="closeEditModal" class="btn-gray">Cancel</button>
      </div>
    </div>

    <!-- Add Job Modal -->
    <div v-if="addingJob" class="modal-overlay">
      <div class="modal-content">
        <h3 class="text-lg font-semibold">Add New Job</h3>
        <input v-model="newJob.companyName" placeholder="Company Name" class="input-box" />
        <input v-model="newJob.jobTitle" placeholder="Job Title" class="input-box" />
        <textarea
          v-model="newJob.jobDescription"
          placeholder="Job Description"
          class="input-box"
        ></textarea>
        <input v-model="newJob.qualifications" placeholder="Qualifications" class="input-box" />
        <input v-model="newJob.benefits" placeholder="Compensation & Benefits" class="input-box" />
        <input v-model="newJob.whereToApply" placeholder="Where to Apply" class="input-box" />
        <button @click="showAddJobConfirmation" class="btn-green">Add Job</button>
        <button @click="closeAddJobModal" class="btn-gray">Cancel</button>
      </div>
    </div>

    <!-- Delete Confirmation Modal -->
    <div v-if="confirmDeletePopup" class="modal-overlay">
      <div class="modal-content">
        <h3 class="text-lg font-semibold">Confirm Delete</h3>
        <p>Are you sure you want to delete this job?</p>
        <button @click="closeDeleteConfirmation" class="btn-gray">Cancel</button>
        <button @click="deleteForm" class="btn-red">Yes, Delete</button>
      </div>
    </div>

    <!-- Return Confirmation Modal -->
    <div v-if="confirmReturnPopup" class="modal-overlay">
      <div class="modal-content">
        <h3 class="text-lg font-semibold">Confirm Return</h3>
        <p>Are you sure you want to close the job details?</p>
        <button @click="closeConfirmReturn" class="btn-gray">Cancel</button>
        <button @click="closeViewForm" class="btn-green">Yes, Close</button>
      </div>
    </div>

    <!-- Save Confirmation Modal -->
    <div v-if="confirmSavePopup" class="modal-overlay">
      <div class="modal-content">
        <h3 class="text-lg font-semibold">Confirm Save</h3>
        <p>Are you sure you want to save the changes?</p>
        <button @click="saveChanges" class="btn-green">Yes, Save</button>
        <button @click="closeSaveConfirmation" class="btn-gray">Cancel</button>
      </div>
    </div>

    <!-- Saved Success Modal -->
    <div v-if="savedSuccessPopup" class="modal-overlay">
      <div class="modal-content">
        <h3 class="text-lg font-semibold">Success</h3>
        <p>Your changes have been saved successfully!</p>
        <button @click="closeSavedSuccess" class="btn-green">Close</button>
      </div>
    </div>

    <!-- Add Hiring Form Confirmation Modal -->
    <div v-if="addJobConfirmationPopup" class="modal-overlay">
      <div class="modal-content">
        <h3 class="text-lg font-semibold">Review Input</h3>
        <p>Do you wish to review your input before proceeding?</p>
        <button @click="addJob" class="btn-green">Yes, Add Job</button>
        <button @click="closeAddJobConfirmation" class="btn-gray">No, Go Back</button>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
export default {
  setup() {
    const router = useRouter()
    const logout = () => {
      localStorage.removeItem('userToken')
      sessionStorage.clear()
      router.push('/login')
    }
    const hiringForms = ref([
      {
        id: 1,
        companyName: 'Tech Corp',
        jobTitle: 'Software Engineer',
        jobDescription: 'Develop and maintain web applications.',
        qualifications: "Bachelor's degree in Computer Science.",
        benefits: 'Competitive salary, health insurance.',
        whereToApply: 'careers@techcorp.com',
      },
      {
        id: 2,
        companyName: 'HealthCare Inc.',
        jobTitle: 'Nurse',
        jobDescription: 'Provide patient care in hospitals.',
        qualifications: 'Licensed nurse with 2 years experience.',
        benefits: 'Medical benefits, housing allowance.',
        whereToApply: 'apply@healthcareinc.com',
      },
    ])
    const methods = ref(false)
    const viewingForm = ref(false)
    const editingForm = ref(false)
    const addingJob = ref(false)
    const confirmDeletePopup = ref(false)
    const confirmReturnPopup = ref(false)
    const confirmSavePopup = ref(false)
    const savedSuccessPopup = ref(false)
    const addJobConfirmationPopup = ref(false)
    const selectedForm = ref(null)
    const jobToDelete = ref(null)
    const newJob = ref({
      companyName: '',
      jobTitle: '',
      jobDescription: '',
      qualifications: '',
      benefits: '',
      whereToApply: '',
    })

    const viewForm = (form) => {
      viewingForm.value = true
      selectedForm.value = { ...form }
    }

    const confirmReturn = () => {
      confirmReturnPopup.value = true
    }

    const closeConfirmReturn = () => {
      confirmReturnPopup.value = false
    }

    const closeViewForm = () => {
      viewingForm.value = false
      selectedForm.value = null
      confirmReturnPopup.value = false
    }

    const editForm = (form) => {
      editingForm.value = true
      selectedForm.value = { ...form }
    }

    const showSaveConfirmation = () => {
      confirmSavePopup.value = true
    }

    const closeSaveConfirmation = () => {
      confirmSavePopup.value = false
    }

    const saveChanges = () => {
      const index = hiringForms.value.findIndex((form) => form.id === selectedForm.value.id)
      if (index !== -1) {
        hiringForms.value[index] = { ...selectedForm.value }
      }
      confirmSavePopup.value = false
      savedSuccessPopup.value = true
    }

    const closeSavedSuccess = () => {
      savedSuccessPopup.value = false
      editingForm.value = false
    }

    const closeEditModal = () => {
      editingForm.value = false
    }

    const showAddJobModal = () => {
      addingJob.value = true
    }

    const showAddJobConfirmation = () => {
      addJobConfirmationPopup.value = true
    }

    const closeAddJobConfirmation = () => {
      addJobConfirmationPopup.value = false
    }

    const addJob = () => {
      const newJobWithId = { ...newJob.value, id: Date.now() }
      hiringForms.value.push(newJobWithId)
      newJob.value = {
        companyName: '',
        jobTitle: '',
        jobDescription: '',
        qualifications: '',
        benefits: '',
        whereToApply: '',
      }
      addingJob.value = false
      addJobConfirmationPopup.value = false
    }

    const closeAddJobModal = () => {
      addingJob.value = false
    }

    const confirmDelete = (id) => {
      confirmDeletePopup.value = true
      jobToDelete.value = id
    }

    const deleteForm = () => {
      hiringForms.value = hiringForms.value.filter((form) => form.id !== jobToDelete.value)
      confirmDeletePopup.value = false
      jobToDelete.value = null
    }

    const closeDeleteConfirmation = () => {
      confirmDeletePopup.value = false
      jobToDelete.value = null
    }

    return {
      logout,
      methods,
      hiringForms,
      viewForm,
      confirmReturn,
      closeConfirmReturn,
      closeViewForm,
      editingForm,
      editForm,
      showSaveConfirmation,
      closeSaveConfirmation,
      saveChanges,
      closeSavedSuccess,
      closeEditModal,
      addingJob,
      showAddJobModal,
      showAddJobConfirmation,
      addJob,
      closeAddJobModal,
      closeAddJobConfirmation,
      confirmDelete,
      deleteForm,
      closeDeleteConfirmation,
      addJobConfirmationPopup,
      confirmDeletePopup,
      confirmSavePopup,
      savedSuccessPopup,
      confirmReturnPopup,
      viewingForm,
      selectedForm,
      newJob,
      jobToDelete,
    }
  },
}
</script>

<style scoped>
/* General Styles */
body {
  font-family: Arial, sans-serif;
  background-color: #f4f4f4;
  margin: 0;
  padding: 0;
}

.container {
  max-width: 800px;
  margin: 20px auto;
  padding: 20px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

/* Hiring Forms Section */
.hiring-forms {
  max-width: 600px;
  margin: auto;
}

/* Buttons */
.btn {
  padding: 8px 12px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  transition: 0.3s;
}

.btn-blue {
  background-color: #007bff;
  color: white;
}

.btn-yellow {
  background-color: #ffc107;
  color: black;
}

.btn-red {
  background-color: #dc3545;
  color: white;
}

.btn-green {
  background-color: #28a745;
  color: white;
}

.btn-gray {
  background-color: #6c757d;
  color: white;
}

button:hover {
  opacity: 0.8;
}

/* Hiring Forms List */
ul {
  list-style: none;
  padding: 0;
}

li {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  border-bottom: 1px solid #ddd;
}
/* Modals */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  background: white;
  padding: 20px;
  border-radius: 8px;
  max-width: 400px;
  text-align: center;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  border-left: 5px solid #28a745; /* Green border only on the left */
}

.modal-footer {
  margin-top: 20px;
}

/* Input Fields */
.input-box {
  width: 100%;
  padding: 8px;
  margin: 5px 0;
  border: 1px solid #ddd;
  border-radius: 4px;
}

/* Table Styling */
.table-container {
  width: 100%;
  overflow-x: auto;
  margin-top: 20px;
}

table {
  width: 100%;
  border-collapse: collapse;
}

th,
td {
  padding: 10px;
  border: 1px solid #ddd;
  text-align: left;
}

th {
  background-color: #007bff;
  color: white;
}

tr:nth-child(even) {
  background-color: #f9f9f9;
}

/* Counter Animation */
.counter-container {
  display: flex;
  justify-content: space-around;
  background: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.counter {
  font-size: 24px;
  font-weight: bold;
  color: #007bff;
}

/* Dashboard Header */
.dashboard-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #007bff;
  color: white;
  padding: 15px;
  border-radius: 8px;
}

/* Job List Styling */
.job-list {
  padding: 10px;
}

.job-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  background: #f9f9f9;
  margin-bottom: 8px;
  border-radius: 5px;
}

/* Add Job Button */
.add-job-btn {
  display: block;
  width: 100%;
  text-align: center;
  background: #28a745;
  color: white;
  padding: 10px;
  border-radius: 5px;
  margin-top: 10px;
  cursor: pointer;
}

.add-job-btn:hover {
  background: #218838;
}
.logout-btn {
  background-color: #34495e;
  color: white;
  padding: 8px 15px;
  border-radius: 5px;
  margin-top: 10px;
}
</style>

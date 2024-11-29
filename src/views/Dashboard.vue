<template>
  <div class="dashboard">
    <div class="skills-section">
      <h2>My Skills</h2>
      <div class="certificates-grid">
        <CertificateCard 
          v-for="cert in certificates"
          :key="cert.id"
          :certificate="cert"
        />
      </div>
    </div>

    <div class="learning-section">
      <h2>Available Courses</h2>
      <div class="courses-grid">
        <CourseCard
          v-for="course in courses"
          :key="course.id"
          :course="course"
          @enroll="enrollInCourse"
        />
      </div>
    </div>

    <div class="assessment-section">
      <h2>Skill Assessment</h2>
      <AssessmentForm
        @submit="submitAssessment"
        :loading="assessmentLoading"
      />
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import CertificateCard from '@/components/CertificateCard.vue'
import CourseCard from '@/components/CourseCard.vue'
import AssessmentForm from '@/components/AssessmentForm.vue'

export default {
  name: 'Dashboard',
  components: {
    CertificateCard,
    CourseCard,
    AssessmentForm
  },
  computed: {
    ...mapState(['certificates', 'courses', 'assessmentLoading'])
  },
  methods: {
    ...mapActions(['enrollInCourse', 'submitAssessment'])
  }
}
</script> 
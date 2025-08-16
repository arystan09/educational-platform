// External enrollment configuration
export const ENROLLMENT_CONFIG = {
  // Replace this with your actual Google Form URL
  externalFormUrl: 'https://forms.google.com/your-form-id',
  
  // You can add different URLs for different courses
  courseSpecificUrls: {} as Record<string, string>,
};

export const getEnrollmentUrl = (courseId?: string) => {
  if (courseId && ENROLLMENT_CONFIG.courseSpecificUrls[courseId]) {
    return ENROLLMENT_CONFIG.courseSpecificUrls[courseId];
  }
  return ENROLLMENT_CONFIG.externalFormUrl;
}; 
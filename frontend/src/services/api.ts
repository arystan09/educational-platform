import axios, { AxiosInstance, AxiosResponse } from 'axios';
import {
  User,
  Course,
  Chapter,
  Review,
  Assignment,
  Quiz,
  Enrollment,
  Certificate,
  Notification,
  Application,
  MediaFile,
  ApiResponse,
  LoginRequest,
  RegisterRequest,
  CreateCourseRequest,
  CreateChapterRequest,
  CreateAssignmentRequest,
  SubmitAssignmentRequest,
  CreateQuizRequest,
  SubmitQuizRequest,
  CreateMediaFileRequest,
} from '../types';

class ApiService {
  private api: AxiosInstance;

  constructor() {
    this.api = axios.create({
      baseURL: process.env.REACT_APP_API_URL || 'http://localhost:3000',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Add request interceptor to include auth token
    this.api.interceptors.request.use((config) => {
      const token = localStorage.getItem('token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    });

    // Add response interceptor to handle errors
    this.api.interceptors.response.use(
      (response) => response,
      (error) => {
        // Don't automatically redirect to login - let components handle auth errors
        if (error.response?.status === 401) {
          // Only clear tokens, don't redirect
          localStorage.removeItem('token');
          localStorage.removeItem('user');
        }
        return Promise.reject(error);
      }
    );
  }

  // Auth endpoints
  async login(credentials: LoginRequest): Promise<{ user: User; token: string }> {
    const response: AxiosResponse<{ user: User; token: string }> = await this.api.post('/auth/login', credentials);
    return response.data;
  }

  async register(userData: RegisterRequest): Promise<{ user: User; message: string; verificationToken?: string }> {
    const response: AxiosResponse<{ user: User; message: string; verificationToken?: string }> = await this.api.post('/auth/register', userData);
    return response.data;
  }

  async getCurrentUser(): Promise<User> {
    const response: AxiosResponse<User> = await this.api.get('/auth/me');
    return response.data;
  }

  async verifyEmail(token: string): Promise<{ message: string; user: User }> {
    const response: AxiosResponse<{ message: string; user: User }> = await this.api.post('/auth/verify-email', { token });
    return response.data;
  }

  // Courses endpoints
  async getCourses(): Promise<Course[]> {
    const response: AxiosResponse<Course[]> = await this.api.get('/courses');
    return response.data;
  }

  async getAllCourses(): Promise<Course[]> {
    console.log('📋 API: Getting all courses (admin)');
    const response: AxiosResponse<Course[]> = await this.api.get('/admin/courses');
    console.log('✅ API: Got all courses:', response.data);
    return response.data;
  }

  async getCourse(id: string): Promise<Course> {
    const response: AxiosResponse<Course> = await this.api.get(`/courses/${id}`);
    return response.data;
  }

  async createCourse(courseData: CreateCourseRequest): Promise<Course> {
    console.log('🚀 API: Creating course with data:', courseData);
    const response: AxiosResponse<Course> = await this.api.post('/admin/courses', courseData);
    console.log('✅ API: Course created successfully:', response.data);
    return response.data;
  }

  async updateCourse(id: string, courseData: Partial<CreateCourseRequest>): Promise<Course> {
    const response: AxiosResponse<Course> = await this.api.patch(`/admin/courses/${id}`, courseData);
    return response.data;
  }

  async deleteCourse(id: string): Promise<void> {
    await this.api.delete(`/admin/courses/${id}`);
  }

  async publishCourse(id: string): Promise<Course> {
    const response: AxiosResponse<Course> = await this.api.patch(`/admin/courses/${id}/publish`);
    return response.data;
  }

  // Chapters endpoints
  async getChapters(courseId: string): Promise<Chapter[]> {
    const response: AxiosResponse<Chapter[]> = await this.api.get(`/courses/${courseId}/chapters`);
    return response.data;
  }

  async createChapter(courseId: string, chapterData: CreateChapterRequest): Promise<Chapter> {
    const response: AxiosResponse<Chapter> = await this.api.post(`/courses/${courseId}/chapters`, chapterData);
    return response.data;
  }

  async updateChapter(courseId: string, chapterId: number, chapterData: Partial<CreateChapterRequest>): Promise<Chapter> {
    const response: AxiosResponse<Chapter> = await this.api.patch(`/courses/${courseId}/chapters/${chapterId}`, chapterData);
    return response.data;
  }

  async deleteChapter(courseId: string, chapterId: number): Promise<void> {
    await this.api.delete(`/courses/${courseId}/chapters/${chapterId}`);
  }

  // Assignments endpoints
  async getAssignments(courseId: string): Promise<Assignment[]> {
    const response: AxiosResponse<Assignment[]> = await this.api.get(`/courses/${courseId}/assignments`);
    return response.data;
  }

  async getAssignmentSubmissions(courseId: string, assignmentId: string): Promise<any[]> {
    const response: AxiosResponse<any[]> = await this.api.get(`/courses/${courseId}/assignments/${assignmentId}/submissions`);
    return response.data;
  }

  async gradeAssignmentSubmission(courseId: string, submissionId: string, gradeData: { grade: number; feedback?: string }): Promise<any> {
    const response: AxiosResponse<any> = await this.api.post(`/courses/${courseId}/assignments/grade`, {
      submissionId,
      ...gradeData,
    });
    return response.data;
  }

  async getMySubmissions(): Promise<any[]> {
    const response: AxiosResponse<any[]> = await this.api.get('/assignments/my/submissions');
    return response.data;
  }

  async createAssignment(courseId: string, assignmentData: CreateAssignmentRequest): Promise<Assignment> {
    const response: AxiosResponse<Assignment> = await this.api.post(`/courses/${courseId}/assignments`, assignmentData);
    return response.data;
  }

  async updateAssignment(courseId: string, assignmentId: string, assignmentData: Partial<CreateAssignmentRequest>): Promise<Assignment> {
    const response: AxiosResponse<Assignment> = await this.api.patch(`/courses/${courseId}/assignments/${assignmentId}`, assignmentData);
    return response.data;
  }

  async deleteAssignment(courseId: string, assignmentId: string): Promise<void> {
    await this.api.delete(`/courses/${courseId}/assignments/${assignmentId}`);
  }

  async submitAssignment(courseId: string, assignmentId: string, submissionData: SubmitAssignmentRequest): Promise<any> {
    const response: AxiosResponse<any> = await this.api.post(`/courses/${courseId}/assignments/submit`, {
      ...submissionData,
      assignmentId,
    });
    return response.data;
  }

  // Quizzes endpoints
  async getQuizzes(courseId: string): Promise<Quiz[]> {
    const response: AxiosResponse<Quiz[]> = await this.api.get(`/courses/${courseId}/quizzes`);
    return response.data;
  }

  async createQuiz(courseId: string, quizData: CreateQuizRequest): Promise<Quiz> {
    const response: AxiosResponse<Quiz> = await this.api.post(`/courses/${courseId}/quizzes`, quizData);
    return response.data;
  }

  async updateQuiz(courseId: string, quizId: number, quizData: Partial<CreateQuizRequest>): Promise<Quiz> {
    const response: AxiosResponse<Quiz> = await this.api.patch(`/courses/${courseId}/quizzes/${quizId}`, quizData);
    return response.data;
  }

  async deleteQuiz(courseId: string, quizId: number): Promise<void> {
    await this.api.delete(`/courses/${courseId}/quizzes/${quizId}`);
  }

  async submitQuiz(courseId: string, submissionData: SubmitQuizRequest): Promise<any> {
    const response: AxiosResponse<any> = await this.api.post(`/courses/${courseId}/quizzes/submit`, submissionData);
    return response.data;
  }

  // Email verification endpoints
  async resendVerificationEmail(email: string): Promise<any> {
    const response: AxiosResponse<any> = await this.api.post('/auth/resend-verification', { email });
    return response.data;
  }

  // Enrollment endpoints (external enrollment - no longer used)
  // async enrollInCourse(courseId: string): Promise<Enrollment> {
  //   const response: AxiosResponse<Enrollment> = await this.api.post(`/enrollments/${courseId}/enroll`);
  //   return response.data;
  // }

  async getEnrollments(): Promise<Enrollment[]> {
    const response: AxiosResponse<Enrollment[]> = await this.api.get('/enrollments');
    return response.data;
  }

  // Reviews endpoints
  async getReviews(courseId: string): Promise<Review[]> {
    const response: AxiosResponse<Review[]> = await this.api.get(`/courses/${courseId}/reviews`);
    return response.data;
  }

  async createReview(courseId: string, reviewData: { rating: number; comment: string }): Promise<Review> {
    const response: AxiosResponse<Review> = await this.api.post(`/courses/${courseId}/reviews`, reviewData);
    return response.data;
  }

  // Progress endpoints
  async getProgress(courseId: string): Promise<any> {
    const response: AxiosResponse<any> = await this.api.get(`/courses/${courseId}/progress`);
    return response.data;
  }

  async markChapterComplete(courseId: string, chapterId: string): Promise<any> {
    const response: AxiosResponse<any> = await this.api.post(`/courses/${courseId}/chapters/${chapterId}/complete`);
    return response.data;
  }

  async unmarkChapterComplete(courseId: string, chapterId: string): Promise<any> {
    const response: AxiosResponse<any> = await this.api.post(`/courses/${courseId}/chapters/${chapterId}/uncomplete`);
    return response.data;
  }

  async getChapterProgress(courseId: string, chapterId: string): Promise<any> {
    const response: AxiosResponse<any> = await this.api.get(`/courses/${courseId}/chapters/${chapterId}/progress`);
    return response.data;
  }



  // Certificates endpoints
  async getCertificates(): Promise<Certificate[]> {
    const response: AxiosResponse<Certificate[]> = await this.api.get('/certificates');
    return response.data;
  }

  // Applications endpoints
  async applyForCourse(courseId: string, message?: string): Promise<Application> {
    const response: AxiosResponse<Application> = await this.api.post(`/courses/${courseId}/apply`, { message });
    return response.data;
  }

  async getApplications(): Promise<Application[]> {
    const response: AxiosResponse<Application[]> = await this.api.get('/applications');
    return response.data;
  }

  // Admin endpoints
  async getAdminStats(): Promise<any> {
    const response: AxiosResponse<any> = await this.api.get('/admin/analytics');
    return response.data;
  }

  async approveEnrollment(enrollmentId: string): Promise<void> {
    await this.api.patch(`/admin/enrollments/${enrollmentId}/approve`);
  }

  async rejectEnrollment(enrollmentId: string): Promise<void> {
    await this.api.patch(`/admin/enrollments/${enrollmentId}/reject`);
  }

  // Course access management
  async grantCourseAccess(userId: string, courseId: string): Promise<any> {
    const response: AxiosResponse<any> = await this.api.post('/admin/grant-course', { userId, courseId });
    return response.data;
  }

  async revokeCourseAccess(userId: string, courseId: string): Promise<any> {
    const response: AxiosResponse<any> = await this.api.delete(`/admin/users/${userId}/courses/${courseId}/access`);
    return response.data;
  }

  async getUserEnrollments(userId: string): Promise<any[]> {
    const response: AxiosResponse<any[]> = await this.api.get(`/admin/users/${userId}/enrollments`);
    return response.data;
  }

  async getAllEnrollments(): Promise<any[]> {
    const response: AxiosResponse<any[]> = await this.api.get('/admin/enrollments');
    return response.data;
  }

  async getAllUsers(): Promise<User[]> {
    const response: AxiosResponse<User[]> = await this.api.get('/admin/users');
    return response.data;
  }

  // Media files endpoints
  async getMediaFiles(courseId: string): Promise<MediaFile[]> {
    const response: AxiosResponse<MediaFile[]> = await this.api.get(`/courses/${courseId}/media`);
    return response.data;
  }

  async createMediaFile(courseId: string, mediaData: CreateMediaFileRequest): Promise<MediaFile> {
    const response: AxiosResponse<MediaFile> = await this.api.post(`/courses/${courseId}/media`, mediaData);
    return response.data;
  }

  async updateMediaFile(courseId: string, mediaId: string, mediaData: Partial<CreateMediaFileRequest>): Promise<MediaFile> {
    const response: AxiosResponse<MediaFile> = await this.api.patch(`/courses/${courseId}/media/${mediaId}`, mediaData);
    return response.data;
  }

  async deleteMediaFile(courseId: string, mediaId: string): Promise<void> {
    await this.api.delete(`/courses/${courseId}/media/${mediaId}`);
  }

  // Upload file endpoint
  async uploadFile(file: File): Promise<{ url: string; size: number }> {
    const formData = new FormData();
    formData.append('file', file);
    
    const response: AxiosResponse<{ url: string; size: number }> = await this.api.post('/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  }
}

export default new ApiService(); 
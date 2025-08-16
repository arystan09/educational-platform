export interface User {
  id: string;
  name: string;
  email: string;
  role: 'STUDENT' | 'INSTRUCTOR' | 'ADMIN';
  emailVerified: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Course {
  id: string;
  title: string;
  description: string;
  duration: number;
  price: number;
  category: string;
  thumbnailUrl?: string;
  createdBy: User;
  isPublished: boolean;
  chapters: Chapter[];
  reviews: Review[];
  progress: CourseProgress[];
  assignments: Assignment[];
  enrollments: Enrollment[];
  certificates: Certificate[];
  quizzes: Quiz[];
  createdAt: string;
  updatedAt: string;
}

export interface Chapter {
  id: number;
  title: string;
  content: string;
  order: number;
  videoUrl?: string;
  course: Course;
  createdAt: string;
  updatedAt: string;
}

export interface Review {
  id: string;
  rating: number;
  comment: string;
  user: User;
  course: Course;
  createdAt: string;
  updatedAt: string;
}

export interface CourseProgress {
  id: string;
  user: User;
  course: Course;
  completedChapters: number;
  totalChapters: number;
  progressPercentage: number;
  createdAt: string;
  updatedAt: string;
}

export interface Assignment {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  course: Course;
  submissions: AssignmentSubmission[];
  createdAt: string;
  updatedAt: string;
}

export interface AssignmentSubmission {
  id: string;
  content: string;
  grade?: number;
  feedback?: string;
  status: 'SUBMITTED' | 'GRADED' | 'LATE';
  student: User;
  assignment: Assignment;
  createdAt: string;
  updatedAt: string;
}

export interface Quiz {
  id: number;
  title: string;
  description: string;
  course: Course;
  questions: QuizQuestion[];
  results: QuizResult[];
  createdAt: string;
  updatedAt: string;
}

export interface QuizQuestion {
  id: number;
  question: string;
  type: 'MULTIPLE_CHOICE' | 'TRUE_FALSE';
  options: QuizOption[];
  quiz: Quiz;
}

export interface QuizOption {
  id: number;
  text: string;
  isCorrect: boolean;
  question: QuizQuestion;
}

export interface QuizResult {
  id: string;
  user: User;
  quiz: Quiz;
  score: number;
  totalQuestions: number;
  answers: any[];
  createdAt: string;
}

export interface Enrollment {
  id: string;
  user: User;
  course: Course;
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
  createdAt: string;
  updatedAt: string;
}

export interface Certificate {
  id: string;
  user: User;
  course: Course;
  issuedAt: string;
  certificateUrl: string;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'ASSIGNMENT' | 'QUIZ' | 'CERTIFICATE' | 'GENERAL';
  isRead: boolean;
  user: User;
  createdAt: string;
}

export interface Application {
  id: string;
  user: User;
  course: Course;
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
  message?: string;
  createdAt: string;
  updatedAt: string;
}

// API Response types
export interface ApiResponse<T> {
  data: T;
  message?: string;
  success: boolean;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
}

export interface CreateCourseRequest {
  title: string;
  description: string;
  duration: number;
  price?: number;
  category: string;
  thumbnailUrl?: string;
}

export interface CreateChapterRequest {
  title: string;
  content: string;
  order: number;
  videoUrl?: string;
}

export interface CreateAssignmentRequest {
  title: string;
  description: string;
  dueDate: string;
}

export interface SubmitAssignmentRequest {
  textAnswer?: string;
  fileUrl?: string;
}

export interface CreateQuizRequest {
  title: string;
  description: string;
  questions: {
    question: string;
    type: 'MULTIPLE_CHOICE' | 'TRUE_FALSE';
    options: {
      text: string;
      isCorrect: boolean;
    }[];
  }[];
}

export interface SubmitQuizRequest {
  quizId: string;
  answers: {
    questionId: number;
    selectedOptionId?: number;
    answer?: boolean;
  }[];
}

export interface MediaFile {
  id: string;
  title: string;
  description?: string;
  type: 'VIDEO' | 'AUDIO' | 'DOCUMENT' | 'IMAGE' | 'PDF';
  url: string;
  size: number;
  duration?: number; // for video/audio files
  chapter?: Chapter;
  course: Course;
  createdAt: string;
  updatedAt: string;
}

export interface CreateMediaFileRequest {
  title: string;
  description?: string;
  type: 'VIDEO' | 'AUDIO' | 'DOCUMENT' | 'IMAGE' | 'PDF';
  url: string;
  size: number;
  duration?: number;
  chapterId?: string;
} 
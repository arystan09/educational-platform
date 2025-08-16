import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import apiService from '../services/api';
import { Course, Chapter, Assignment, Quiz, Review } from '../types';
import { getEnrollmentUrl } from '../config/enrollment';
import {
  AcademicCapIcon,
  BookOpenIcon,
  ClockIcon,
  StarIcon,
  UserIcon,
  CalendarIcon,
  PlayIcon,
  CheckCircleIcon,
  DocumentTextIcon,
  QuestionMarkCircleIcon,
  EyeIcon,
  LockClosedIcon,
  ArrowTopRightOnSquareIcon,
} from '@heroicons/react/24/outline';

const CourseDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [course, setCourse] = useState<Course | null>(null);
  const [chapters, setChapters] = useState<Chapter[]>([]);
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [chapterProgress, setChapterProgress] = useState<{ [chapterId: number]: boolean }>({});
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'overview' | 'chapters' | 'assignments' | 'quizzes' | 'reviews'>('overview');

  // External enrollment form URL
  const externalEnrollmentUrl = getEnrollmentUrl(id);

  useEffect(() => {
    const fetchCourseData = async () => {
      if (!id) return;
      
      try {
        const [courseData, chaptersData, assignmentsData, quizzesData, reviewsData] = await Promise.all([
          apiService.getCourse(id),
          apiService.getChapters(id),
          apiService.getAssignments(id),
          apiService.getQuizzes(id),
          apiService.getReviews(id),
        ]);
        
        setCourse(courseData);
        setChapters(chaptersData);
        setAssignments(assignmentsData);
        setQuizzes(quizzesData);
        setReviews(reviewsData);
      } catch (error) {
        console.error('Failed to fetch course data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourseData();
  }, [id]);

  useEffect(() => {
    if (chapters.length > 0 && user) {
      fetchChapterProgress();
    }
  }, [chapters, user]);

  const handleExternalEnrollment = () => {
    // Redirect to external Google Form
    window.open(externalEnrollmentUrl, '_blank');
  };

  const handleStartChapter = (chapter: Chapter) => {
    // Navigate to chapter viewer page
    navigate(`/courses/${id}/chapters/${chapter.id}`);
  };

  const handleTakeQuiz = (quiz: Quiz) => {
    // Navigate to quiz page
    navigate(`/courses/${id}/quizzes/${quiz.id}`);
  };

  const handleSubmitAssignment = (assignment: Assignment) => {
    // Navigate to assignment submission page
    navigate(`/courses/${id}/assignments/${assignment.id}`);
  };

  const handleWatchVideo = (mediaUrl: string) => {
    // Open video in a modal or new window
    window.open(mediaUrl, '_blank');
  };

  const fetchChapterProgress = async () => {
    if (!id || !user) return;
    
    const progress: { [chapterId: number]: boolean } = {};
    
    for (const chapter of chapters) {
      try {
        const chapterProgress = await apiService.getChapterProgress(id, chapter.id.toString());
        progress[chapter.id] = chapterProgress.completed;
      } catch (error) {
        console.error(`Failed to fetch progress for chapter ${chapter.id}:`, error);
        progress[chapter.id] = false;
      }
    }
    
    setChapterProgress(progress);
  };

  const userEnrollment = course?.enrollments?.find(
    enrollment => enrollment.user.id === user?.id
  );
  const isEnrolled = userEnrollment?.status === 'APPROVED';
  const isPending = userEnrollment?.status === 'PENDING';
  const isInstructor = course?.createdBy?.id === user?.id;
  const isAdmin = user?.role === 'ADMIN';
  const averageRating = reviews.length > 0
    ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length
    : 0;

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-900">Курс не найден</h2>
        <p className="text-gray-600 mt-2">Курс, который вы ищете, не существует.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Course Header */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        {course.thumbnailUrl && (
          <div className="h-64 bg-gray-200">
            <img
              src={course.thumbnailUrl}
              alt={course.title}
              className="w-full h-full object-cover"
            />
          </div>
        )}
        <div className="p-6">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-gray-900">{course.title}</h1>
              <p className="text-gray-600 mt-2">{course.description}</p>
              
              <div className="flex items-center mt-4 space-x-6 text-sm text-gray-500">
                <div className="flex items-center">
                  <UserIcon className="h-4 w-4 mr-1" />
                  <span>{course.createdBy?.name}</span>
                </div>
                <div className="flex items-center">
                  <CalendarIcon className="h-4 w-4 mr-1" />
                  <span>{new Date(course.createdAt).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center">
                  <StarIcon className="h-4 w-4 mr-1 text-yellow-400" />
                  <span>{averageRating.toFixed(1)} ({reviews.length} отзывов)</span>
                </div>
                <div className="flex items-center">
                  <BookOpenIcon className="h-4 w-4 mr-1" />
                  <span>{chapters.length} глав</span>
                </div>
              </div>
            </div>
            
            <div className="ml-6">
              {!isEnrolled && !isPending && !isInstructor && !isAdmin && (
                <div className="text-center">
                  <button
                    onClick={handleExternalEnrollment}
                    className="btn-primary flex items-center"
                  >
                    <ArrowTopRightOnSquareIcon className="h-5 w-5 mr-2" />
                    Подать заявку
                  </button>
                  <p className="text-xs text-gray-500 mt-2">
                    Заявка будет рассмотрена администратором
                  </p>
                </div>
              )}
              {isEnrolled && (
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                  <CheckCircleIcon className="h-4 w-4 mr-1" />
                  Доступ предоставлен
                </span>
              )}
              {isPending && (
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-yellow-100 text-yellow-800">
                  <ClockIcon className="h-4 w-4 mr-1" />
                  Заявка на рассмотрении
                </span>
              )}
              {isInstructor && (
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                  Ваш курс
                </span>
              )}
              {isAdmin && (
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-purple-100 text-purple-800">
                  Администратор
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white rounded-lg shadow">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8 px-6">
            {[
              { id: 'overview', name: 'Обзор', icon: BookOpenIcon },
              { id: 'chapters', name: 'Главы', icon: PlayIcon },
              { id: 'assignments', name: 'Задания', icon: DocumentTextIcon },
              { id: 'quizzes', name: 'Тесты', icon: QuestionMarkCircleIcon },
              { id: 'reviews', name: 'Отзывы', icon: StarIcon },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center ${
                  activeTab === tab.id
                    ? 'border-primary-500 text-primary-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <tab.icon className="h-4 w-4 mr-2" />
                {tab.name}
              </button>
            ))}
          </nav>
        </div>

        <div className="p-6">
          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">Описание курса</h3>
                <p className="text-gray-600">{course.description}</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center">
                    <BookOpenIcon className="h-6 w-6 text-primary-600" />
                    <div className="ml-3">
                      <p className="text-sm font-medium text-gray-900">Главы</p>
                      <p className="text-2xl font-bold text-gray-900">{chapters.length}</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center">
                    <DocumentTextIcon className="h-6 w-6 text-green-600" />
                    <div className="ml-3">
                      <p className="text-sm font-medium text-gray-900">Задания</p>
                      <p className="text-2xl font-bold text-gray-900">{assignments.length}</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center">
                    <QuestionMarkCircleIcon className="h-6 w-6 text-blue-600" />
                    <div className="ml-3">
                      <p className="text-sm font-medium text-gray-900">Тесты</p>
                      <p className="text-2xl font-bold text-gray-900">{quizzes.length}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Chapters Tab */}
          {activeTab === 'chapters' && (
            <div className="space-y-4">
              {!isEnrolled && !isInstructor && !isAdmin ? (
                <div className="text-center py-8">
                  <LockClosedIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Доступ ограничен</h3>
                  <p className="text-gray-600 mb-4">
                    Для просмотра глав курса необходимо подать заявку и получить одобрение администратора.
                  </p>
                  <button
                    onClick={handleExternalEnrollment}
                    className="btn-primary flex items-center mx-auto"
                  >
                    <ArrowTopRightOnSquareIcon className="h-5 w-5 mr-2" />
                    Подать заявку
                  </button>
                </div>
              ) : chapters.length === 0 ? (
                <p className="text-gray-500 text-center py-4">Главы пока недоступны.</p>
              ) : (
                chapters.map((chapter, index) => {
                  const isCompleted = chapterProgress[chapter.id];
                  return (
                    <div key={chapter.id} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="h-8 w-8 rounded-full bg-primary-100 flex items-center justify-center">
                            <span className="text-sm font-medium text-primary-600">{index + 1}</span>
                          </div>
                          <div>
                            <div className="flex items-center space-x-2">
                              <h4 className="font-medium text-gray-900">{chapter.title}</h4>
                              {isCompleted && (
                                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                  <CheckCircleIcon className="h-3 w-3 mr-1" />
                                  Завершено
                                </span>
                              )}
                            </div>
                            <p className="text-sm text-gray-500">
                              {chapter.content.length > 100 
                                ? `${chapter.content.substring(0, 100)}...` 
                                : chapter.content
                              }
                            </p>
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          {chapter.videoUrl && (
                            <button 
                              onClick={() => handleWatchVideo(chapter.videoUrl!)}
                              className="btn-secondary flex items-center"
                            >
                              <EyeIcon className="h-4 w-4 mr-1" />
                              Смотреть видео
                            </button>
                          )}
                          <button 
                            onClick={() => handleStartChapter(chapter)}
                            className={`flex items-center ${
                              isCompleted 
                                ? 'bg-green-100 text-green-800 hover:bg-green-200' 
                                : 'btn-primary'
                            }`}
                          >
                            {isCompleted ? (
                              <>
                                <CheckCircleIcon className="h-4 w-4 mr-1" />
                                Просмотрено
                              </>
                            ) : (
                              <>
                                <PlayIcon className="h-4 w-4 mr-1" />
                                Начать
                              </>
                            )}
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          )}

          {/* Assignments Tab */}
          {activeTab === 'assignments' && (
            <div className="space-y-4">
              {!isEnrolled && !isInstructor && !isAdmin ? (
                <div className="text-center py-8">
                  <LockClosedIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Доступ ограничен</h3>
                  <p className="text-gray-600 mb-4">
                    Для просмотра заданий необходимо подать заявку и получить одобрение администратора.
                  </p>
                  <button
                    onClick={handleExternalEnrollment}
                    className="btn-primary flex items-center mx-auto"
                  >
                    <ArrowTopRightOnSquareIcon className="h-5 w-5 mr-2" />
                    Подать заявку
                  </button>
                </div>
              ) : assignments.length === 0 ? (
                <p className="text-gray-500 text-center py-4">Задания пока недоступны.</p>
              ) : (
                assignments.map((assignment) => (
                  <div key={assignment.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium text-gray-900">{assignment.title}</h4>
                        <p className="text-sm text-gray-500 mt-1">{assignment.description}</p>
                        <div className="flex items-center mt-2 text-sm text-gray-500">
                          <ClockIcon className="h-4 w-4 mr-1" />
                          <span>Срок: {new Date(assignment.dueDate).toLocaleDateString()}</span>
                        </div>
                      </div>
                      <button 
                        onClick={() => handleSubmitAssignment(assignment)}
                        className="btn-primary"
                      >
                        Отправить
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          {/* Quizzes Tab */}
          {activeTab === 'quizzes' && (
            <div className="space-y-4">
              {!isEnrolled && !isInstructor && !isAdmin ? (
                <div className="text-center py-8">
                  <LockClosedIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Доступ ограничен</h3>
                  <p className="text-gray-600 mb-4">
                    Для прохождения тестов необходимо подать заявку и получить одобрение администратора.
                  </p>
                  <button
                    onClick={handleExternalEnrollment}
                    className="btn-primary flex items-center mx-auto"
                  >
                    <ArrowTopRightOnSquareIcon className="h-5 w-5 mr-2" />
                    Подать заявку
                  </button>
                </div>
              ) : quizzes.length === 0 ? (
                <p className="text-gray-500 text-center py-4">Тесты пока недоступны.</p>
              ) : (
                quizzes.map((quiz) => (
                  <div key={quiz.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium text-gray-900">{quiz.title}</h4>
                        <p className="text-sm text-gray-500 mt-1">{quiz.description}</p>
                        <p className="text-sm text-gray-500 mt-1">
                          {quiz.questions?.length || 0} вопросов
                        </p>
                      </div>
                      <button 
                        onClick={() => handleTakeQuiz(quiz)}
                        className="btn-primary"
                      >
                        Пройти тест
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          {/* Reviews Tab */}
          {activeTab === 'reviews' && (
            <div className="space-y-4">
              {reviews.length === 0 ? (
                <p className="text-gray-500 text-center py-4">Пока нет отзывов.</p>
              ) : (
                reviews.map((review) => (
                  <div key={review.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-start space-x-3">
                      <div className="h-8 w-8 rounded-full bg-primary-600 flex items-center justify-center">
                        <span className="text-sm font-medium text-white">
                          {review.user.name.charAt(0).toUpperCase()}
                        </span>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2">
                          <h4 className="font-medium text-gray-900">{review.user.name}</h4>
                          <div className="flex items-center">
                            {[...Array(5)].map((_, i) => (
                              <StarIcon
                                key={i}
                                className={`h-4 w-4 ${
                                  i < review.rating ? 'text-yellow-400' : 'text-gray-300'
                                }`}
                              />
                            ))}
                          </div>
                        </div>
                        <p className="text-gray-600 mt-1">{review.comment}</p>
                        <p className="text-sm text-gray-500 mt-2">
                          {new Date(review.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CourseDetail; 
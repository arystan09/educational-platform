import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import apiService from '../services/api';
import { Course, Chapter, Assignment, Quiz, MediaFile } from '../types';
import {
  PlusIcon,
  PencilIcon,
  TrashIcon,
  PlayIcon,
  DocumentIcon,
  PhotoIcon,
  FolderIcon,
  VideoCameraIcon,
  MusicalNoteIcon,
  DocumentTextIcon,
  QuestionMarkCircleIcon,
  AcademicCapIcon,
  EyeIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';

type TabType = 'chapters' | 'media' | 'assignments' | 'quizzes';

const AdminCourseDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [course, setCourse] = useState<Course | null>(null);
  const [chapters, setChapters] = useState<Chapter[]>([]);
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [mediaFiles, setMediaFiles] = useState<MediaFile[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>('');
  const [activeTab, setActiveTab] = useState<TabType>('chapters');

  // Form states
  const [showChapterForm, setShowChapterForm] = useState(false);
  const [showAssignmentForm, setShowAssignmentForm] = useState(false);
  const [showQuizForm, setShowQuizForm] = useState(false);
  const [showMediaForm, setShowMediaForm] = useState(false);
  
  // Editing states
  const [editingChapter, setEditingChapter] = useState<Chapter | null>(null);
  const [editingAssignment, setEditingAssignment] = useState<Assignment | null>(null);
  const [editingQuiz, setEditingQuiz] = useState<Quiz | null>(null);
  const [editingMedia, setEditingMedia] = useState<MediaFile | null>(null);

  // Submission viewing state
  const [viewingSubmissions, setViewingSubmissions] = useState<Assignment | null>(null);
  const [submissions, setSubmissions] = useState<any[]>([]);
  const [loadingSubmissions, setLoadingSubmissions] = useState(false);

  // Grading state
  const [gradingSubmission, setGradingSubmission] = useState<any>(null);
  const [gradeFormData, setGradeFormData] = useState({
    grade: '',
    feedback: '',
  });

  // Form data
  const [chapterFormData, setChapterFormData] = useState({
    title: '',
    content: '',
    order: 1,
    videoUrl: '',
  });

  const [assignmentFormData, setAssignmentFormData] = useState({
    title: '',
    description: '',
    dueDate: '',
  });

  const [quizFormData, setQuizFormData] = useState({
    title: '',
    description: '',
    questions: [{ question: '', type: 'MULTIPLE_CHOICE' as 'MULTIPLE_CHOICE' | 'TRUE_FALSE', options: [{ text: '', isCorrect: false }] }],
  });

  const [mediaFormData, setMediaFormData] = useState({
    title: '',
    description: '',
    type: 'VIDEO' as 'VIDEO' | 'AUDIO' | 'DOCUMENT' | 'IMAGE' | 'PDF',
    url: '',
    size: 0,
    duration: 0,
    chapterId: '',
  });

  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  useEffect(() => {
    if (id) {
      fetchCourseData();
    }
  }, [id]);

  const fetchCourseData = async () => {
    try {
      const [courseData, chaptersData, assignmentsData, quizzesData, mediaData] = await Promise.all([
        apiService.getCourse(id!),
        apiService.getChapters(id!),
        apiService.getAssignments(id!),
        apiService.getQuizzes(id!),
        apiService.getMediaFiles(id!),
      ]);
      setCourse(courseData);
      setChapters(chaptersData);
      setAssignments(assignmentsData);
      setQuizzes(quizzesData);
      setMediaFiles(mediaData);
    } catch (error) {
      console.error('Failed to fetch course data:', error);
      setError('Ошибка загрузки данных курса');
    } finally {
      setLoading(false);
    }
  };

  const handleFileUpload = async (file: File) => {
    try {
      const uploadResult = await apiService.uploadFile(file);
      setMediaFormData(prev => ({
        ...prev,
        url: uploadResult.url,
        size: uploadResult.size,
      }));
    } catch (error) {
      console.error('File upload failed:', error);
      setError('Ошибка загрузки файла');
    }
  };

  const handleChapterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingChapter) {
        await apiService.updateChapter(id!, editingChapter.id, chapterFormData);
      } else {
        await apiService.createChapter(id!, chapterFormData);
      }
      
      await fetchCourseData();
      setShowChapterForm(false);
      setEditingChapter(null);
      setChapterFormData({ title: '', content: '', order: 1, videoUrl: '' });
    } catch (error: any) {
      console.error('Chapter operation failed:', error);
      setError(error.response?.data?.message || 'Ошибка операции с главой');
    }
  };

  const handleAssignmentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingAssignment) {
        await apiService.updateAssignment(id!, editingAssignment.id, assignmentFormData);
      } else {
        await apiService.createAssignment(id!, assignmentFormData);
      }
      
      await fetchCourseData();
      setShowAssignmentForm(false);
      setEditingAssignment(null);
      setAssignmentFormData({ title: '', description: '', dueDate: '' });
    } catch (error: any) {
      console.error('Assignment operation failed:', error);
      setError(error.response?.data?.message || 'Ошибка операции с заданием');
    }
  };

  const handleQuizSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingQuiz) {
        await apiService.updateQuiz(id!, editingQuiz.id, quizFormData);
      } else {
        await apiService.createQuiz(id!, quizFormData);
      }
      
      await fetchCourseData();
      setShowQuizForm(false);
      setEditingQuiz(null);
      setQuizFormData({
        title: '',
        description: '',
        questions: [{ question: '', type: 'MULTIPLE_CHOICE', options: [{ text: '', isCorrect: false }] }],
      });
    } catch (error: any) {
      console.error('Quiz operation failed:', error);
      setError(error.response?.data?.message || 'Ошибка операции с тестом');
    }
  };

  const handleMediaSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (selectedFile) {
        await handleFileUpload(selectedFile);
      }

      if (editingMedia) {
        await apiService.updateMediaFile(id!, editingMedia.id, mediaFormData);
      } else {
        await apiService.createMediaFile(id!, mediaFormData);
      }
      
      await fetchCourseData();
      setShowMediaForm(false);
      setEditingMedia(null);
      setMediaFormData({
        title: '',
        description: '',
        type: 'VIDEO',
        url: '',
        size: 0,
        duration: 0,
        chapterId: '',
      });
      setSelectedFile(null);
    } catch (error: any) {
      console.error('Media operation failed:', error);
      setError(error.response?.data?.message || 'Ошибка операции с медиа файлом');
    }
  };

  const handleDeleteChapter = async (chapterId: number) => {
    if (!id) return;
    
    try {
      await apiService.deleteChapter(id, chapterId);
      setChapters(chapters.filter(c => c.id !== chapterId));
    } catch (error) {
      console.error('Failed to delete chapter:', error);
      setError('Ошибка удаления главы');
    }
  };

  const handleDeleteAssignment = async (assignmentId: string) => {
    if (window.confirm('Вы уверены, что хотите удалить это задание?')) {
      try {
        await apiService.deleteAssignment(id!, assignmentId);
        await fetchCourseData();
      } catch (error) {
        console.error('Failed to delete assignment:', error);
        setError('Ошибка удаления задания');
      }
    }
  };

  const handleDeleteQuiz = async (quizId: number) => {
    if (!id) return;
    
    try {
      await apiService.deleteQuiz(id, quizId);
      setQuizzes(quizzes.filter(q => q.id !== quizId));
    } catch (error) {
      console.error('Failed to delete quiz:', error);
      setError('Ошибка удаления теста');
    }
  };

  const handleDeleteMedia = async (mediaId: string) => {
    if (window.confirm('Вы уверены, что хотите удалить этот медиа файл?')) {
      try {
        await apiService.deleteMediaFile(id!, mediaId);
        await fetchCourseData();
      } catch (error) {
        console.error('Failed to delete media file:', error);
        setError('Ошибка удаления медиа файла');
      }
    }
  };

  const handleEditChapter = (chapter: Chapter) => {
    setEditingChapter(chapter);
    setChapterFormData({
      title: chapter.title,
      content: chapter.content,
      order: chapter.order,
      videoUrl: chapter.videoUrl || '',
    });
    setShowChapterForm(true);
  };

  const handleEditAssignment = (assignment: Assignment) => {
    setEditingAssignment(assignment);
    setAssignmentFormData({
      title: assignment.title,
      description: assignment.description,
      dueDate: assignment.dueDate.split('T')[0],
    });
    setShowAssignmentForm(true);
  };

  const handleEditQuiz = (quiz: Quiz) => {
    setEditingQuiz(quiz);
    setQuizFormData({
      title: quiz.title,
      description: quiz.description,
      questions: quiz.questions.map(q => ({
        question: q.question,
        type: q.type,
        options: q.options.map(o => ({ text: o.text, isCorrect: o.isCorrect })),
      })),
    });
    setShowQuizForm(true);
  };

  const handleEditMedia = (media: MediaFile) => {
    setEditingMedia(media);
    setMediaFormData({
      title: media.title,
      description: media.description || '',
      type: media.type,
      url: media.url,
      size: media.size,
      duration: media.duration || 0,
      chapterId: media.chapter?.id?.toString() || '',
    });
    setShowMediaForm(true);
  };

  const addQuizQuestion = () => {
    setQuizFormData(prev => ({
      ...prev,
      questions: [...prev.questions, { question: '', type: 'MULTIPLE_CHOICE' as 'MULTIPLE_CHOICE' | 'TRUE_FALSE', options: [{ text: '', isCorrect: false }] }],
    }));
  };

  const addQuizOption = (questionIndex: number) => {
    setQuizFormData(prev => ({
      ...prev,
      questions: prev.questions.map((q, i) => 
        i === questionIndex 
          ? { ...q, options: [...q.options, { text: '', isCorrect: false }] }
          : q
      ),
    }));
  };

  const getMediaIcon = (type: string) => {
    switch (type) {
      case 'VIDEO': return <VideoCameraIcon className="h-5 w-5" />;
      case 'AUDIO': return <MusicalNoteIcon className="h-5 w-5" />;
      case 'DOCUMENT': return <DocumentIcon className="h-5 w-5" />;
      case 'IMAGE': return <PhotoIcon className="h-5 w-5" />;
      case 'PDF': return <DocumentTextIcon className="h-5 w-5" />;
      default: return <FolderIcon className="h-5 w-5" />;
    }
  };

  const handleViewSubmissions = async (assignment: Assignment) => {
    if (!id) return;
    
    setViewingSubmissions(assignment);
    setLoadingSubmissions(true);
    try {
      const submissionsData = await apiService.getAssignmentSubmissions(id, assignment.id);
      setSubmissions(submissionsData);
    } catch (error) {
      console.error('Failed to fetch submissions:', error);
      setError('Ошибка загрузки отправок');
    } finally {
      setLoadingSubmissions(false);
    }
  };

  const handleGradeSubmission = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!id || !gradingSubmission) return;

    try {
      await apiService.gradeAssignmentSubmission(id, gradingSubmission.id, {
        grade: parseFloat(gradeFormData.grade),
        feedback: gradeFormData.feedback,
      });
      
      // Refresh submissions
      const submissionsData = await apiService.getAssignmentSubmissions(id, viewingSubmissions!.id);
      setSubmissions(submissionsData);
      
      // Close grading modal
      setGradingSubmission(null);
      setGradeFormData({ grade: '', feedback: '' });
    } catch (error) {
      console.error('Failed to grade submission:', error);
      setError('Ошибка оценки отправки');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">Курс не найден</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Course Header */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{course.title}</h1>
            <p className="text-gray-600 mt-1">{course.description}</p>
            <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
              <span>Категория: {course.category}</span>
              <span>Длительность: {course.duration} часов</span>
              <span>Цена: {course.price} тенге</span>
              <span className={`px-2 py-1 rounded-full text-xs ${
                course.isPublished 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-yellow-100 text-yellow-800'
              }`}>
                {course.isPublished ? 'Опубликован' : 'Черновик'}
              </span>
            </div>
          </div>
          <button
            onClick={() => navigate('/admin/courses')}
            className="btn-secondary"
          >
            Назад к курсам
          </button>
        </div>
      </div>

      {/* Content Management Tabs */}
      <div className="bg-white rounded-lg shadow">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            {[
              { id: 'chapters', label: 'Главы и контент', icon: DocumentIcon },
              { id: 'media', label: 'Медиа файлы', icon: VideoCameraIcon },
              { id: 'assignments', label: 'Задания', icon: AcademicCapIcon },
              { id: 'quizzes', label: 'Тесты', icon: QuestionMarkCircleIcon },
            ].map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setActiveTab(id as TabType)}
                className={`flex items-center space-x-2 border-b-2 py-4 px-1 text-sm font-medium ${
                  activeTab === id
                    ? 'border-primary-500 text-primary-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                <Icon className="h-5 w-5" />
                <span>{label}</span>
              </button>
            ))}
          </nav>
        </div>

        <div className="p-6">
          {error && (
            <div className="rounded-md bg-red-50 p-4 mb-4">
              <div className="text-sm text-red-700">{error}</div>
            </div>
          )}

          {/* Chapters Tab */}
          {activeTab === 'chapters' && (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium text-gray-900">Главы курса</h3>
                <button
                  onClick={() => {
                    setShowChapterForm(true);
                    setEditingChapter(null);
                    setChapterFormData({ title: '', content: '', order: chapters.length + 1, videoUrl: '' });
                  }}
                  className="btn-primary flex items-center"
                >
                  <PlusIcon className="h-5 w-5 mr-2" />
                  Добавить главу
                </button>
              </div>

              {/* Chapter Form */}
              {showChapterForm && (
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="text-md font-medium text-gray-900 mb-4">
                    {editingChapter ? 'Редактировать главу' : 'Новая глава'}
                  </h4>
                  
                  <form onSubmit={handleChapterSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Название главы</label>
                        <input
                          type="text"
                          value={chapterFormData.title}
                          onChange={(e) => setChapterFormData({ ...chapterFormData, title: e.target.value })}
                          className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                          placeholder="Введите название главы"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Порядок</label>
                        <input
                          type="number"
                          value={chapterFormData.order}
                          onChange={(e) => setChapterFormData({ ...chapterFormData, order: parseInt(e.target.value) })}
                          className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                          min="1"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700">Содержание главы</label>
                      <textarea
                        value={chapterFormData.content}
                        onChange={(e) => setChapterFormData({ ...chapterFormData, content: e.target.value })}
                        rows={6}
                        className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                        placeholder="Введите содержание главы..."
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700">URL видео (опционально)</label>
                      <input
                        type="url"
                        value={chapterFormData.videoUrl}
                        onChange={(e) => setChapterFormData({ ...chapterFormData, videoUrl: e.target.value })}
                        className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                        placeholder="https://example.com/video.mp4 или /uploads/video.mp4"
                      />
                      <p className="text-xs text-gray-500 mt-1">
                        Можете указать внешнюю ссылку или путь к загруженному файлу (например: /uploads/video.mp4)
                      </p>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700">Или загрузить видео файл</label>
                      <input
                        type="file"
                        accept="video/*"
                        onChange={async (e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            try {
                              console.log('Uploading file:', file.name, file.size);
                              const uploadResult = await apiService.uploadFile(file);
                              console.log('Upload successful:', uploadResult);
                              setChapterFormData({ ...chapterFormData, videoUrl: uploadResult.url });
                              setError(''); // Clear any previous errors
                            } catch (error) {
                              console.error('Failed to upload video:', error);
                              setError('Ошибка загрузки видео: ' + (error as any).message);
                            }
                          }
                        }}
                        className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                      />
                      {chapterFormData.videoUrl && (
                        <div className="mt-2 p-2 bg-green-50 border border-green-200 rounded-md">
                          <p className="text-sm text-green-700">
                            ✅ Видео загружено: {chapterFormData.videoUrl}
                          </p>
                        </div>
                      )}
                    </div>

                    <div className="flex justify-end space-x-3">
                      <button
                        type="button"
                        onClick={() => {
                          setShowChapterForm(false);
                          setEditingChapter(null);
                          setChapterFormData({ title: '', content: '', order: 1, videoUrl: '' });
                        }}
                        className="btn-secondary"
                      >
                        Отмена
                      </button>
                      <button type="submit" className="btn-primary">
                        {editingChapter ? 'Обновить главу' : 'Создать главу'}
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {/* Chapters List */}
              <div className="space-y-3">
                {chapters.length === 0 ? (
                  <p className="text-gray-500 text-center py-8">Главы не найдены. Добавьте первую главу!</p>
                ) : (
                  chapters
                    .sort((a, b) => a.order - b.order)
                    .map((chapter) => (
                      <div key={chapter.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2">
                            <span className="text-sm text-gray-500">Глава {chapter.order}</span>
                            <h4 className="font-medium text-gray-900">{chapter.title}</h4>
                          </div>
                          <p className="text-sm text-gray-500 mt-1 line-clamp-2">
                            {chapter.content.substring(0, 150)}...
                          </p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => handleEditChapter(chapter)}
                            className="p-2 text-blue-600 hover:bg-blue-50 rounded-md"
                            title="Редактировать"
                          >
                            <PencilIcon className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteChapter(chapter.id)}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-md"
                            title="Удалить"
                          >
                            <TrashIcon className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    ))
                )}
              </div>
            </div>
          )}

          {/* Media Files Tab */}
          {activeTab === 'media' && (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium text-gray-900">Медиа файлы</h3>
                <button
                  onClick={() => {
                    setShowMediaForm(true);
                    setEditingMedia(null);
                    setMediaFormData({
                      title: '',
                      description: '',
                      type: 'VIDEO',
                      url: '',
                      size: 0,
                      duration: 0,
                      chapterId: '',
                    });
                  }}
                  className="btn-primary flex items-center"
                >
                  <PlusIcon className="h-5 w-5 mr-2" />
                  Добавить медиа файл
                </button>
              </div>

              {/* Media Form */}
              {showMediaForm && (
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="text-md font-medium text-gray-900 mb-4">
                    {editingMedia ? 'Редактировать медиа файл' : 'Новый медиа файл'}
                  </h4>
                  
                  <form onSubmit={handleMediaSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Название</label>
                        <input
                          type="text"
                          value={mediaFormData.title}
                          onChange={(e) => setMediaFormData({ ...mediaFormData, title: e.target.value })}
                          className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                          placeholder="Введите название файла"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Тип файла</label>
                        <select
                          value={mediaFormData.type}
                          onChange={(e) => setMediaFormData({ ...mediaFormData, type: e.target.value as any })}
                          className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                        >
                          <option value="VIDEO">Видео</option>
                          <option value="AUDIO">Аудио</option>
                          <option value="IMAGE">Изображение</option>
                          <option value="PDF">PDF документ</option>
                          <option value="DOCUMENT">Документ</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700">Описание</label>
                      <textarea
                        value={mediaFormData.description}
                        onChange={(e) => setMediaFormData({ ...mediaFormData, description: e.target.value })}
                        rows={3}
                        className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                        placeholder="Введите описание файла..."
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Файл</label>
                        <input
                          type="file"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                              setSelectedFile(file);
                              setMediaFormData({ ...mediaFormData, title: file.name });
                            }
                          }}
                          className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                          accept="video/*,audio/*,image/*,.pdf,.doc,.docx"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">URL (если файл уже загружен)</label>
                        <input
                          type="url"
                          value={mediaFormData.url}
                          onChange={(e) => setMediaFormData({ ...mediaFormData, url: e.target.value })}
                          className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                          placeholder="https://example.com/file.mp4"
                        />
                      </div>
                    </div>

                    <div className="flex justify-end space-x-3">
                      <button
                        type="button"
                        onClick={() => {
                          setShowMediaForm(false);
                          setEditingMedia(null);
                          setMediaFormData({
                            title: '',
                            description: '',
                            type: 'VIDEO',
                            url: '',
                            size: 0,
                            duration: 0,
                            chapterId: '',
                          });
                        }}
                        className="btn-secondary"
                      >
                        Отмена
                      </button>
                      <button type="submit" className="btn-primary">
                        {editingMedia ? 'Обновить файл' : 'Добавить файл'}
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {/* Media Files List */}
              <div className="space-y-3">
                {mediaFiles.length === 0 ? (
                  <p className="text-gray-500 text-center py-8">Медиа файлы не найдены. Добавьте первый файл!</p>
                ) : (
                  mediaFiles.map((media) => (
                    <div key={media.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                      <div className="flex items-center space-x-3">
                        {getMediaIcon(media.type)}
                        <div>
                          <h4 className="font-medium text-gray-900">{media.title}</h4>
                          {media.description && (
                            <p className="text-sm text-gray-500">{media.description}</p>
                          )}
                          <div className="flex items-center space-x-4 mt-1 text-xs text-gray-400">
                            <span>Размер: {(media.size / 1024 / 1024).toFixed(2)} MB</span>
                            {media.duration && <span>Длительность: {media.duration} сек</span>}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => handleEditMedia(media)}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-md"
                          title="Редактировать"
                        >
                          <PencilIcon className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteMedia(media.id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-md"
                          title="Удалить"
                        >
                          <TrashIcon className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          {/* Assignments Tab */}
          {activeTab === 'assignments' && (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium text-gray-900">Задания</h3>
                <button
                  onClick={() => {
                    setShowAssignmentForm(true);
                    setEditingAssignment(null);
                    setAssignmentFormData({ title: '', description: '', dueDate: '' });
                  }}
                  className="btn-primary flex items-center"
                >
                  <PlusIcon className="h-5 w-5 mr-2" />
                  Добавить задание
                </button>
              </div>

              {/* Assignment Form */}
              {showAssignmentForm && (
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="text-md font-medium text-gray-900 mb-4">
                    {editingAssignment ? 'Редактировать задание' : 'Новое задание'}
                  </h4>
                  
                  <form onSubmit={handleAssignmentSubmit} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Название задания</label>
                      <input
                        type="text"
                        value={assignmentFormData.title}
                        onChange={(e) => setAssignmentFormData({ ...assignmentFormData, title: e.target.value })}
                        className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                        placeholder="Введите название задания"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700">Описание</label>
                      <textarea
                        value={assignmentFormData.description}
                        onChange={(e) => setAssignmentFormData({ ...assignmentFormData, description: e.target.value })}
                        rows={4}
                        className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                        placeholder="Введите описание задания..."
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700">Срок сдачи</label>
                      <input
                        type="date"
                        value={assignmentFormData.dueDate}
                        onChange={(e) => setAssignmentFormData({ ...assignmentFormData, dueDate: e.target.value })}
                        className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                        required
                      />
                    </div>

                    <div className="flex justify-end space-x-3">
                      <button
                        type="button"
                        onClick={() => {
                          setShowAssignmentForm(false);
                          setEditingAssignment(null);
                          setAssignmentFormData({ title: '', description: '', dueDate: '' });
                        }}
                        className="btn-secondary"
                      >
                        Отмена
                      </button>
                      <button type="submit" className="btn-primary">
                        {editingAssignment ? 'Обновить задание' : 'Создать задание'}
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {/* Assignments List */}
              <div className="space-y-3">
                {assignments.length === 0 ? (
                  <p className="text-gray-500 text-center py-8">Задания не найдены. Добавьте первое задание!</p>
                ) : (
                  assignments.map((assignment) => (
                    <div key={assignment.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900">{assignment.title}</h4>
                        <p className="text-sm text-gray-500 mt-1">{assignment.description}</p>
                        <div className="flex items-center space-x-4 mt-2 text-xs text-gray-400">
                          <span>Срок: {new Date(assignment.dueDate).toLocaleDateString()}</span>
                          <span>Заявок: {assignment.submissions?.length || 0}</span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => handleViewSubmissions(assignment)}
                          className="p-2 text-green-600 hover:bg-green-50 rounded-md"
                          title="Просмотр отправок"
                        >
                          <EyeIcon className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleEditAssignment(assignment)}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-md"
                          title="Редактировать"
                        >
                          <PencilIcon className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteAssignment(assignment.id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-md"
                          title="Удалить"
                        >
                          <TrashIcon className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          {/* Quizzes Tab */}
          {activeTab === 'quizzes' && (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium text-gray-900">Тесты</h3>
                <button
                  onClick={() => {
                    setShowQuizForm(true);
                    setEditingQuiz(null);
                    setQuizFormData({
                      title: '',
                      description: '',
                      questions: [{ question: '', type: 'MULTIPLE_CHOICE', options: [{ text: '', isCorrect: false }] }],
                    });
                  }}
                  className="btn-primary flex items-center"
                >
                  <PlusIcon className="h-5 w-5 mr-2" />
                  Добавить тест
                </button>
              </div>

              {/* Quiz Form */}
              {showQuizForm && (
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="text-md font-medium text-gray-900 mb-4">
                    {editingQuiz ? 'Редактировать тест' : 'Новый тест'}
                  </h4>
                  
                  <form onSubmit={handleQuizSubmit} className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Название теста</label>
                      <input
                        type="text"
                        value={quizFormData.title}
                        onChange={(e) => setQuizFormData({ ...quizFormData, title: e.target.value })}
                        className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                        placeholder="Введите название теста"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700">Описание</label>
                      <textarea
                        value={quizFormData.description}
                        onChange={(e) => setQuizFormData({ ...quizFormData, description: e.target.value })}
                        rows={3}
                        className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                        placeholder="Введите описание теста..."
                        required
                      />
                    </div>

                    {/* Questions */}
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <h5 className="text-sm font-medium text-gray-700">Вопросы</h5>
                        <button
                          type="button"
                          onClick={addQuizQuestion}
                          className="text-sm text-primary-600 hover:text-primary-500"
                        >
                          + Добавить вопрос
                        </button>
                      </div>

                      {quizFormData.questions.map((question, questionIndex) => (
                        <div key={questionIndex} className="border border-gray-200 rounded-lg p-4">
                          <div className="space-y-3">
                            <div>
                              <label className="block text-sm font-medium text-gray-700">
                                Вопрос {questionIndex + 1}
                              </label>
                              <input
                                type="text"
                                value={question.question}
                                onChange={(e) => {
                                  const newQuestions = [...quizFormData.questions];
                                  newQuestions[questionIndex].question = e.target.value;
                                  setQuizFormData({ ...quizFormData, questions: newQuestions });
                                }}
                                className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                                placeholder="Введите вопрос"
                                required
                              />
                            </div>

                            <div>
                              <label className="block text-sm font-medium text-gray-700">Тип вопроса</label>
                              <select
                                value={question.type}
                                onChange={(e) => {
                                  const newQuestions = [...quizFormData.questions];
                                  newQuestions[questionIndex].type = e.target.value as any;
                                  setQuizFormData({ ...quizFormData, questions: newQuestions });
                                }}
                                className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                              >
                                <option value="MULTIPLE_CHOICE">Множественный выбор</option>
                                <option value="TRUE_FALSE">Верно/Неверно</option>
                              </select>
                            </div>

                            {/* Options */}
                            <div className="space-y-2">
                              <div className="flex justify-between items-center">
                                <label className="block text-sm font-medium text-gray-700">Варианты ответов</label>
                                <button
                                  type="button"
                                  onClick={() => addQuizOption(questionIndex)}
                                  className="text-xs text-primary-600 hover:text-primary-500"
                                >
                                  + Добавить вариант
                                </button>
                              </div>

                              {question.options.map((option, optionIndex) => (
                                <div key={optionIndex} className="flex items-center space-x-2">
                                  <input
                                    type="text"
                                    value={option.text}
                                    onChange={(e) => {
                                      const newQuestions = [...quizFormData.questions];
                                      newQuestions[questionIndex].options[optionIndex].text = e.target.value;
                                      setQuizFormData({ ...quizFormData, questions: newQuestions });
                                    }}
                                    className="flex-1 border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                                    placeholder="Вариант ответа"
                                    required
                                  />
                                  <input
                                    type="radio"
                                    name={`correct-${questionIndex}`}
                                    checked={option.isCorrect}
                                    onChange={() => {
                                      const newQuestions = [...quizFormData.questions];
                                      newQuestions[questionIndex].options.forEach((opt, i) => {
                                        opt.isCorrect = i === optionIndex;
                                      });
                                      setQuizFormData({ ...quizFormData, questions: newQuestions });
                                    }}
                                    className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300"
                                  />
                                  <span className="text-xs text-gray-500">Правильный</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="flex justify-end space-x-3">
                      <button
                        type="button"
                        onClick={() => {
                          setShowQuizForm(false);
                          setEditingQuiz(null);
                          setQuizFormData({
                            title: '',
                            description: '',
                            questions: [{ question: '', type: 'MULTIPLE_CHOICE', options: [{ text: '', isCorrect: false }] }],
                          });
                        }}
                        className="btn-secondary"
                      >
                        Отмена
                      </button>
                      <button type="submit" className="btn-primary">
                        {editingQuiz ? 'Обновить тест' : 'Создать тест'}
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {/* Quizzes List */}
              <div className="space-y-3">
                {quizzes.length === 0 ? (
                  <p className="text-gray-500 text-center py-8">Тесты не найдены. Добавьте первый тест!</p>
                ) : (
                  quizzes.map((quiz) => (
                    <div key={quiz.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900">{quiz.title}</h4>
                        <p className="text-sm text-gray-500 mt-1">{quiz.description}</p>
                        <div className="flex items-center space-x-4 mt-2 text-xs text-gray-400">
                          <span>Вопросов: {quiz.questions?.length || 0}</span>
                          <span>Результатов: {quiz.results?.length || 0}</span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => handleEditQuiz(quiz)}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-md"
                          title="Редактировать"
                        >
                          <PencilIcon className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteQuiz(quiz.id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-md"
                          title="Удалить"
                        >
                          <TrashIcon className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Submissions Modal */}
      {viewingSubmissions && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-4xl w-full mx-4 max-h-[80vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-gray-900">
                Отправки для задания: {viewingSubmissions.title}
              </h3>
              <button
                onClick={() => {
                  setViewingSubmissions(null);
                  setSubmissions([]);
                }}
                className="text-gray-400 hover:text-gray-600"
              >
                <XMarkIcon className="h-6 w-6" />
              </button>
            </div>

            {loadingSubmissions ? (
              <div className="flex items-center justify-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
              </div>
            ) : submissions.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-500">Пока нет отправок для этого задания.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {submissions.map((submission) => (
                  <div key={submission.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h4 className="font-medium text-gray-900">
                          {submission.student?.name || 'Неизвестный студент'}
                        </h4>
                        <p className="text-sm text-gray-500">
                          Отправлено: {new Date(submission.submittedAt).toLocaleString()}
                        </p>
                        <p className="text-sm text-gray-500">
                          Статус: {submission.status}
                        </p>
                        {submission.grade && (
                          <p className="text-sm text-gray-500">
                            Оценка: {submission.grade}
                          </p>
                        )}
                      </div>
                      <div className="text-right">
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                          submission.status === 'GRADED' ? 'bg-green-100 text-green-800' :
                          submission.status === 'PENDING' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {submission.status}
                        </span>
                      </div>
                    </div>
                    
                    {submission.textAnswer && (
                      <div className="mb-3">
                        <h5 className="font-medium text-gray-900 mb-2">Ответ студента:</h5>
                        <div className="bg-gray-50 rounded-lg p-3">
                          <p className="text-gray-700 whitespace-pre-wrap">{submission.textAnswer}</p>
                        </div>
                      </div>
                    )}

                    {submission.fileUrl && (
                      <div className="mb-3">
                        <h5 className="font-medium text-gray-900 mb-2">Прикрепленный файл:</h5>
                        <a
                          href={submission.fileUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:text-blue-800 underline"
                        >
                          Скачать файл
                        </a>
                      </div>
                    )}

                    {submission.feedback && (
                      <div className="mb-3">
                        <h5 className="font-medium text-gray-900 mb-2">Обратная связь:</h5>
                        <div className="bg-blue-50 rounded-lg p-3">
                          <p className="text-gray-700">{submission.feedback}</p>
                        </div>
                      </div>
                    )}

                    {submission.status !== 'GRADED' && (
                      <div className="mt-3">
                        <button
                          onClick={() => {
                            setGradingSubmission(submission);
                            setGradeFormData({ grade: '', feedback: '' });
                          }}
                          className="btn-primary text-sm"
                        >
                          Оценить
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Grading Modal */}
      {gradingSubmission && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-gray-900">
                Оценка отправки
              </h3>
              <button
                onClick={() => {
                  setGradingSubmission(null);
                  setGradeFormData({ grade: '', feedback: '' });
                }}
                className="text-gray-400 hover:text-gray-600"
              >
                <XMarkIcon className="h-6 w-6" />
              </button>
            </div>

            <div className="mb-4">
              <p className="text-sm text-gray-600 mb-2">
                Студент: {gradingSubmission.student?.name || 'Неизвестный студент'}
              </p>
              <p className="text-sm text-gray-600">
                Отправлено: {new Date(gradingSubmission.submittedAt).toLocaleString()}
              </p>
            </div>

            <form onSubmit={handleGradeSubmission} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Оценка
                </label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  step="0.1"
                  value={gradeFormData.grade}
                  onChange={(e) => setGradeFormData({ ...gradeFormData, grade: e.target.value })}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                  placeholder="Введите оценку (0-100)"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Обратная связь
                </label>
                <textarea
                  value={gradeFormData.feedback}
                  onChange={(e) => setGradeFormData({ ...gradeFormData, feedback: e.target.value })}
                  rows={4}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                  placeholder="Введите обратную связь..."
                />
              </div>

              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => {
                    setGradingSubmission(null);
                    setGradeFormData({ grade: '', feedback: '' });
                  }}
                  className="btn-secondary"
                >
                  Отмена
                </button>
                <button type="submit" className="btn-primary">
                  Сохранить оценку
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminCourseDetail; 
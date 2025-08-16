import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import apiService from '../services/api';
import { Chapter } from '../types';
import {
  ArrowLeftIcon,
  PlayIcon,
  DocumentTextIcon,
  CheckCircleIcon,
} from '@heroicons/react/24/outline';

const ChapterViewer: React.FC = () => {
  const { courseId, chapterId } = useParams<{ courseId: string; chapterId: string }>();
  const navigate = useNavigate();
  const [chapter, setChapter] = useState<Chapter | null>(null);
  const [loading, setLoading] = useState(true);
  const [completed, setCompleted] = useState(false);
  const [showVideo, setShowVideo] = useState(false);

  useEffect(() => {
    const fetchChapter = async () => {
      if (!courseId || !chapterId) return;
      
      try {
        console.log('🔍 Fetching chapters for course:', courseId);
        console.log('🔍 Looking for chapter ID:', chapterId, 'type:', typeof chapterId);
        const chapters = await apiService.getChapters(courseId);
        console.log('📋 All chapters:', chapters);
        console.log('📋 Chapter IDs:', chapters.map(c => ({ id: c.id, type: typeof c.id, title: c.title })));
        const currentChapter = chapters.find(c => c.id === Number(chapterId));
        console.log('🎯 Found chapter:', currentChapter);
        if (currentChapter) {
          setChapter(currentChapter);
          
          // Fetch chapter progress
          try {
            const progress = await apiService.getChapterProgress(courseId, chapterId);
            setCompleted(progress.completed);
          } catch (error) {
            console.error('Failed to fetch chapter progress:', error);
          }
        }
      } catch (error) {
        console.error('Failed to fetch chapter:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchChapter();
  }, [courseId, chapterId]);

  const handleComplete = async () => {
    if (!courseId || !chapterId) return;
    
    try {
      await apiService.markChapterComplete(courseId, chapterId);
      setCompleted(true);
    } catch (error) {
      console.error('Failed to mark chapter as complete:', error);
    }
  };

  const handleUncomplete = async () => {
    if (!courseId || !chapterId) return;
    
    try {
      await apiService.unmarkChapterComplete(courseId, chapterId);
      setCompleted(false);
    } catch (error) {
      console.error('Failed to unmark chapter as complete:', error);
    }
  };

  const handleWatchVideo = () => {
    if (chapter?.videoUrl) {
      // If it's a local file, construct the full URL
      const videoUrl = chapter.videoUrl.startsWith('http') 
        ? chapter.videoUrl 
        : `http://localhost:3000${chapter.videoUrl}`;
      window.open(videoUrl, '_blank');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (!chapter) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-900">Глава не найдена</h2>
        <p className="text-gray-600 mt-2">Глава, которую вы ищете, не существует.</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => navigate(`/courses/${courseId}`)}
          className="btn-secondary flex items-center"
        >
          <ArrowLeftIcon className="h-4 w-4 mr-2" />
          Назад к курсу
        </button>
        
        {completed && (
          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
            <CheckCircleIcon className="h-4 w-4 mr-1" />
            Завершено
          </span>
        )}
      </div>

      {/* Chapter Content */}
      <div className="bg-white rounded-lg shadow p-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">{chapter.title}</h1>
        
        {/* Video Section */}
        {chapter.videoUrl && (
          <div className="mb-6">
            <div className="bg-gray-100 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <PlayIcon className="h-6 w-6 text-primary-600 mr-3" />
                  <div>
                    <h3 className="font-medium text-gray-900">Видео материал</h3>
                    <p className="text-sm text-gray-500">Дополнительное видео к главе</p>
                  </div>
                </div>
                <button
                  onClick={() => setShowVideo(!showVideo)}
                  className="btn-primary flex items-center"
                >
                  <PlayIcon className="h-4 w-4 mr-2" />
                  {showVideo ? 'Скрыть видео' : 'Смотреть видео'}
                </button>
              </div>
              
              {showVideo && (
                <div className="mt-4">
                  <video 
                    controls 
                    className="w-full rounded-lg"
                    src={chapter.videoUrl.startsWith('http') 
                      ? chapter.videoUrl 
                      : `http://localhost:3000${chapter.videoUrl}`
                    }
                  >
                    Ваш браузер не поддерживает видео.
                  </video>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Text Content */}
        <div className="prose max-w-none">
          <div className="flex items-center mb-4">
            <DocumentTextIcon className="h-5 w-5 text-gray-500 mr-2" />
            <h3 className="text-lg font-medium text-gray-900">Содержание главы</h3>
          </div>
          <div className="text-gray-700 leading-relaxed whitespace-pre-wrap">
            {chapter.content}
          </div>
        </div>

        {/* Completion Button */}
        <div className="mt-8 pt-6 border-t border-gray-200">
          <button
            onClick={completed ? handleUncomplete : handleComplete}
            className={`w-full py-3 px-4 rounded-md font-medium ${
              completed
                ? 'bg-red-100 text-red-800 hover:bg-red-200'
                : 'btn-primary'
            }`}
          >
            {completed ? 'Отменить завершение' : 'Отметить как завершенную'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChapterViewer; 
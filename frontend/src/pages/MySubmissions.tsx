import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import apiService from '../services/api';
import {
  ArrowLeftIcon,
  DocumentTextIcon,
  ClockIcon,
  CheckCircleIcon,
  XCircleIcon,
  ExclamationTriangleIcon,
} from '@heroicons/react/24/outline';

const MySubmissions: React.FC = () => {
  const navigate = useNavigate();
  const [submissions, setSubmissions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSubmissions();
  }, []);

  const fetchSubmissions = async () => {
    try {
      const submissionsData = await apiService.getMySubmissions();
      setSubmissions(submissionsData);
    } catch (error) {
      console.error('Failed to fetch submissions:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'GRADED':
        return <CheckCircleIcon className="h-5 w-5 text-green-500" />;
      case 'PENDING':
        return <ClockIcon className="h-5 w-5 text-yellow-500" />;
      case 'REJECTED':
        return <XCircleIcon className="h-5 w-5 text-red-500" />;
      default:
        return <ExclamationTriangleIcon className="h-5 w-5 text-gray-500" />;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'GRADED':
        return 'Оценено';
      case 'PENDING':
        return 'На рассмотрении';
      case 'REJECTED':
        return 'Отклонено';
      default:
        return status;
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => navigate('/dashboard')}
          className="btn-secondary flex items-center"
        >
          <ArrowLeftIcon className="h-4 w-4 mr-2" />
          Назад к дашборду
        </button>
        <h1 className="text-2xl font-bold text-gray-900">Мои отправки</h1>
      </div>

      {/* Submissions List */}
      <div className="space-y-4">
        {submissions.length === 0 ? (
          <div className="text-center py-12">
            <DocumentTextIcon className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h2 className="text-xl font-medium text-gray-900 mb-2">Нет отправок</h2>
            <p className="text-gray-600">У вас пока нет отправленных заданий.</p>
          </div>
        ) : (
          submissions.map((submission) => (
            <div key={submission.id} className="bg-white rounded-lg shadow p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-medium text-gray-900">
                    {submission.assignment?.title || 'Неизвестное задание'}
                  </h3>
                  <p className="text-sm text-gray-500 mt-1">
                    Курс: {submission.assignment?.course?.title || 'Неизвестный курс'}
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  {getStatusIcon(submission.status)}
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                    submission.status === 'GRADED' ? 'bg-green-100 text-green-800' :
                    submission.status === 'PENDING' ? 'bg-yellow-100 text-yellow-800' :
                    submission.status === 'REJECTED' ? 'bg-red-100 text-red-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {getStatusText(submission.status)}
                  </span>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center text-sm text-gray-500">
                  <ClockIcon className="h-4 w-4 mr-1" />
                  <span>Отправлено: {new Date(submission.submittedAt).toLocaleString()}</span>
                </div>

                {submission.textAnswer && (
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Ваш ответ:</h4>
                    <div className="bg-gray-50 rounded-lg p-3">
                      <p className="text-gray-700 whitespace-pre-wrap">{submission.textAnswer}</p>
                    </div>
                  </div>
                )}

                {submission.fileUrl && (
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Прикрепленный файл:</h4>
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

                {submission.grade && (
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Оценка:</h4>
                    <div className="bg-blue-50 rounded-lg p-3">
                      <p className="text-lg font-semibold text-blue-900">{submission.grade}/100</p>
                    </div>
                  </div>
                )}

                {submission.feedback && (
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Обратная связь:</h4>
                    <div className="bg-blue-50 rounded-lg p-3">
                      <p className="text-gray-700">{submission.feedback}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default MySubmissions; 
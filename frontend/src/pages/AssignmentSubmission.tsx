import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import apiService from '../services/api';
import { Assignment } from '../types';
import {
  ArrowLeftIcon,
  DocumentTextIcon,
  ClockIcon,
  CheckCircleIcon,
} from '@heroicons/react/24/outline';

const AssignmentSubmission: React.FC = () => {
  const { courseId, assignmentId } = useParams<{ courseId: string; assignmentId: string }>();
  const navigate = useNavigate();
  const [assignment, setAssignment] = useState<Assignment | null>(null);
  const [content, setContent] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAssignment = async () => {
      if (!courseId || !assignmentId) return;
      
      try {
        const assignments = await apiService.getAssignments(courseId);
        const currentAssignment = assignments.find(a => a.id === assignmentId);
        if (currentAssignment) {
          setAssignment(currentAssignment);
        }
      } catch (error) {
        console.error('Failed to fetch assignment:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAssignment();
  }, [courseId, assignmentId]);

  const handleSubmit = async () => {
    if (!courseId || !assignmentId || !content.trim()) return;
    
    try {
      await apiService.submitAssignment(courseId, assignmentId, { textAnswer: content });
      setSubmitted(true);
    } catch (error) {
      console.error('Failed to submit assignment:', error);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (!assignment) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-900">Задание не найдено</h2>
        <p className="text-gray-600 mt-2">Задание, которое вы ищете, не существует.</p>
      </div>
    );
  }

  if (submitted) {
    return (
      <div className="max-w-2xl mx-auto text-center py-12">
        <CheckCircleIcon className="h-16 w-16 text-green-500 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Задание отправлено!</h2>
        <p className="text-gray-600 mb-6">Ваше решение было успешно отправлено.</p>
        <button
          onClick={() => navigate(`/courses/${courseId}`)}
          className="btn-primary"
        >
          Вернуться к курсу
        </button>
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
      </div>

      {/* Assignment Content */}
      <div className="bg-white rounded-lg shadow p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">{assignment.title}</h1>
        
        {/* Assignment Details */}
        <div className="mb-6 p-4 bg-gray-50 rounded-lg">
          <div className="flex items-center mb-2">
            <DocumentTextIcon className="h-5 w-5 text-gray-500 mr-2" />
            <h3 className="font-medium text-gray-900">Описание задания</h3>
          </div>
          <p className="text-gray-700 mb-4">{assignment.description}</p>
          
          <div className="flex items-center text-sm text-gray-500">
            <ClockIcon className="h-4 w-4 mr-1" />
            <span>Срок сдачи: {new Date(assignment.dueDate).toLocaleDateString()}</span>
          </div>
        </div>

        {/* Submission Form */}
        <div className="space-y-4">
          <div>
            <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-2">
              Ваше решение
            </label>
            <textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={10}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
              placeholder="Введите ваше решение здесь..."
            />
          </div>
          
          <div className="flex justify-end">
            <button
              onClick={handleSubmit}
              disabled={!content.trim()}
              className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Отправить решение
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssignmentSubmission; 
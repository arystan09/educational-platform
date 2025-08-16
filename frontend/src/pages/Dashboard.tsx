import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import {
  AcademicCapIcon,
  BookOpenIcon,
  UserGroupIcon,
  ChartBarIcon,
  PlusIcon,
} from '@heroicons/react/24/outline';

const Dashboard: React.FC = () => {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    enrolledCourses: 0,
    pendingEnrollments: 0,
    completedCourses: 0,
  });

  useEffect(() => {
    // Mock data for demonstration
    setStats({
      enrolledCourses: 3,
      pendingEnrollments: 1,
      completedCourses: 1,
    });
  }, []);

  const handleViewCourses = () => {
    navigate('/courses');
  };

  const handleViewProfile = () => {
    navigate('/profile');
  };

  const handleCreateCourse = () => {
    // Mock functionality for instructor
    alert('Функция создания курса пока не реализована');
  };

  return (
    <div className="space-y-6">
      {/* Debug Information */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
        <h3 className="text-lg font-medium text-yellow-800 mb-2">Отладочная информация</h3>
        <div className="text-sm text-yellow-700">
          <p><strong>Аутентифицирован:</strong> {isAuthenticated ? 'Да' : 'Нет'}</p>
          <p><strong>Пользователь:</strong> {user ? JSON.stringify(user, null, 2) : 'Нет'}</p>
          <p><strong>Роль пользователя:</strong> {user?.role || 'Нет'}</p>
        </div>
      </div>

      {/* Welcome Section */}
      <div className="bg-white rounded-lg shadow p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Добро пожаловать, {user?.name || 'Пользователь'}!
        </h1>
        <p className="text-gray-600">
          Вот что происходит с вашим обучением.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <BookOpenIcon className="h-8 w-8 text-primary-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Записанные курсы</p>
              <p className="text-2xl font-semibold text-gray-900">{stats.enrolledCourses}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <AcademicCapIcon className="h-8 w-8 text-yellow-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Ожидающие записи</p>
              <p className="text-2xl font-semibold text-gray-900">{stats.pendingEnrollments}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <ChartBarIcon className="h-8 w-8 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Завершенные курсы</p>
              <p className="text-2xl font-semibold text-gray-900">{stats.completedCourses}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Быстрые действия</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <button 
            onClick={handleViewCourses}
            className="flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 transition-colors"
          >
            <BookOpenIcon className="h-5 w-5 mr-2" />
            Просмотреть курсы
          </button>
          
          {user?.role === 'INSTRUCTOR' && (
            <button 
              onClick={handleCreateCourse}
              className="flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 transition-colors"
            >
              <PlusIcon className="h-5 w-5 mr-2" />
              Создать курс
            </button>
          )}
          
          <button 
            onClick={handleViewProfile}
            className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors"
          >
            <UserGroupIcon className="h-5 w-5 mr-2" />
            Просмотреть профиль
          </button>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Недавняя активность</h2>
        <div className="space-y-4">
          <div className="flex items-center space-x-3">
            <div className="flex-shrink-0">
              <div className="h-8 w-8 rounded-full bg-primary-100 flex items-center justify-center">
                <BookOpenIcon className="h-4 w-4 text-primary-600" />
              </div>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900">
                Записался на курс "Основы React"
              </p>
              <p className="text-sm text-gray-500">2 дня назад</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <div className="flex-shrink-0">
              <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center">
                <AcademicCapIcon className="h-4 w-4 text-green-600" />
              </div>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900">
                Завершил курс "Основы JavaScript"
              </p>
              <p className="text-sm text-gray-500">1 неделю назад</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 
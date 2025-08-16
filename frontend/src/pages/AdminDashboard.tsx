import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import apiService from '../services/api';
import {
  UsersIcon,
  AcademicCapIcon,
  ChartBarIcon,
  DocumentTextIcon,
  ClockIcon,
  CheckCircleIcon,
  XCircleIcon,
} from '@heroicons/react/24/outline';

const AdminDashboard: React.FC = () => {
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAdminStats = async () => {
      try {
        const statsData = await apiService.getAdminStats();
        setStats(statsData);
      } catch (error) {
        console.error('Failed to fetch admin stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAdminStats();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow p-6">
        <h1 className="text-2xl font-bold text-gray-900">Панель администратора</h1>
        <p className="text-gray-600 mt-1">Обзор образовательной платформы</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <UsersIcon className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Всего пользователей</dt>
                  <dd className="text-lg font-medium text-gray-900">
                    {stats?.totalUsers || 0}
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <AcademicCapIcon className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Всего курсов</dt>
                  <dd className="text-lg font-medium text-gray-900">
                    {stats?.totalCourses || 0}
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <DocumentTextIcon className="h-6 w-6 text-yellow-600" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Всего записей</dt>
                  <dd className="text-lg font-medium text-gray-900">
                    {stats?.totalEnrollments || 0}
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <ChartBarIcon className="h-6 w-6 text-purple-600" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Активные студенты</dt>
                  <dd className="text-lg font-medium text-gray-900">
                    {stats?.activeStudents || 0}
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Pending Enrollments */}
        <div className="bg-white shadow rounded-lg">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">Ожидающие записи</h3>
          </div>
          <div className="p-6">
            {stats?.pendingEnrollments?.length === 0 ? (
              <p className="text-gray-500 text-center py-4">Нет ожидающих записей.</p>
            ) : (
              <div className="space-y-4">
                {stats?.pendingEnrollments?.slice(0, 5).map((enrollment: any) => (
                  <div key={enrollment.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                    <div>
                      <p className="font-medium text-gray-900">{enrollment.user.name}</p>
                      <p className="text-sm text-gray-500">{enrollment.course.title}</p>
                      <p className="text-xs text-gray-400">
                        {new Date(enrollment.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="flex space-x-2">
                      <button className="btn-primary text-sm">Одобрить</button>
                      <button className="btn-secondary text-sm">Отклонить</button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Recent Courses */}
        <div className="bg-white shadow rounded-lg">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">Недавние курсы</h3>
          </div>
          <div className="p-6">
            {stats?.recentCourses?.length === 0 ? (
              <p className="text-gray-500 text-center py-4">Нет недавних курсов.</p>
            ) : (
              <div className="space-y-4">
                {stats?.recentCourses?.slice(0, 5).map((course: any) => (
                  <div key={course.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                    <div>
                      <p className="font-medium text-gray-900">{course.title}</p>
                      <p className="text-sm text-gray-500">от {course.createdBy.name}</p>
                      <p className="text-xs text-gray-400">
                        {new Date(course.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        course.isPublished 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {course.isPublished ? 'Опубликован' : 'Черновик'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white shadow rounded-lg">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">Быстрые действия</h3>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <button 
              onClick={() => navigate('/admin/users')}
              className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
            >
              <UsersIcon className="h-6 w-6 text-blue-600 mr-3" />
              <div>
                <p className="text-sm font-medium text-gray-900">Управление пользователями</p>
                <p className="text-xs text-gray-500">Просмотр и редактирование аккаунтов</p>
              </div>
            </button>
            
            <button 
              onClick={() => navigate('/admin/courses')}
              className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
            >
              <AcademicCapIcon className="h-6 w-6 text-green-600 mr-3" />
              <div>
                <p className="text-sm font-medium text-gray-900">Управление курсами</p>
                <p className="text-xs text-gray-500">Создание и редактирование курсов</p>
              </div>
            </button>
            
            <button 
              onClick={() => navigate('/admin/course-access')}
              className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
            >
              <DocumentTextIcon className="h-6 w-6 text-yellow-600 mr-3" />
              <div>
                <p className="text-sm font-medium text-gray-900">Управление доступом</p>
                <p className="text-xs text-gray-500">Предоставление доступа к курсам</p>
              </div>
            </button>
            
            <button className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <ChartBarIcon className="h-6 w-6 text-purple-600 mr-3" />
              <div>
                <p className="text-sm font-medium text-gray-900">Аналитика</p>
                <p className="text-xs text-gray-500">Просмотр детальных отчетов</p>
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* System Status */}
      <div className="bg-white shadow rounded-lg">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">Статус системы</h3>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center p-4 bg-green-50 rounded-lg">
              <CheckCircleIcon className="h-6 w-6 text-green-600 mr-3" />
              <div>
                <p className="text-sm font-medium text-gray-900">Backend API</p>
                <p className="text-xs text-gray-500">Онлайн</p>
              </div>
            </div>
            
            <div className="flex items-center p-4 bg-green-50 rounded-lg">
              <CheckCircleIcon className="h-6 w-6 text-green-600 mr-3" />
              <div>
                <p className="text-sm font-medium text-gray-900">База данных</p>
                <p className="text-xs text-gray-500">Подключена</p>
              </div>
            </div>
            
            <div className="flex items-center p-4 bg-green-50 rounded-lg">
              <CheckCircleIcon className="h-6 w-6 text-green-600 mr-3" />
              <div>
                <p className="text-sm font-medium text-gray-900">Email сервис</p>
                <p className="text-xs text-gray-500">Активен</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard; 
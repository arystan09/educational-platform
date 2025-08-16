import React, { useState, useEffect } from 'react';
import apiService from '../services/api';
import { User, Course } from '../types';
import {
  UserPlusIcon,
  UserMinusIcon,
  AcademicCapIcon,
  UsersIcon,
  CheckCircleIcon,
  XCircleIcon,
  MagnifyingGlassIcon,
} from '@heroicons/react/24/outline';

const AdminCourseAccess: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [courses, setCourses] = useState<Course[]>([]);
  const [enrollments, setEnrollments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState<string>('');
  const [selectedUser, setSelectedUser] = useState<string>('');
  const [selectedCourse, setSelectedCourse] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [usersData, coursesData, enrollmentsData] = await Promise.all([
        apiService.getAllUsers(),
        apiService.getAllCourses(),
        apiService.getAllEnrollments(),
      ]);
      setUsers(usersData);
      setCourses(coursesData);
      setEnrollments(enrollmentsData);
    } catch (error) {
      console.error('Failed to fetch data:', error);
      setError('Ошибка загрузки данных');
    } finally {
      setLoading(false);
    }
  };

  const handleGrantAccess = async () => {
    if (!selectedUser || !selectedCourse) {
      setError('Пожалуйста, выберите пользователя и курс');
      return;
    }

    try {
      await apiService.grantCourseAccess(selectedUser, selectedCourse);
      setSuccess('Доступ к курсу предоставлен успешно');
      setSelectedUser('');
      setSelectedCourse('');
      fetchData(); // Refresh data
    } catch (error) {
      console.error('Failed to grant access:', error);
      setError('Ошибка предоставления доступа');
    }
  };

  const handleRevokeAccess = async (userId: string, courseId: string) => {
    try {
      await apiService.revokeCourseAccess(userId, courseId);
      setSuccess('Доступ к курсу отозван успешно');
      fetchData(); // Refresh data
    } catch (error) {
      console.error('Failed to revoke access:', error);
      setError('Ошибка отзыва доступа');
    }
  };

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getEnrollmentStatus = (userId: string, courseId: string) => {
    const enrollment = enrollments.find(
      e => e.user.id === userId && e.course.id === courseId
    );
    return enrollment ? enrollment.status : null;
  };

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
        <h1 className="text-2xl font-bold text-gray-900">Управление доступом к курсам</h1>
        <p className="text-gray-600 mt-1">Предоставление и отзыв доступа к курсам для пользователей</p>
      </div>

      {/* Error/Success Messages */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-md p-4">
          <div className="flex">
            <XCircleIcon className="h-5 w-5 text-red-400" />
            <p className="text-red-700 ml-3">{error}</p>
          </div>
        </div>
      )}

      {success && (
        <div className="bg-green-50 border border-green-200 rounded-md p-4">
          <div className="flex">
            <CheckCircleIcon className="h-5 w-5 text-green-400" />
            <p className="text-green-700 ml-3">{success}</p>
          </div>
        </div>
      )}

      {/* Grant Access Form */}
      <div className="bg-white shadow rounded-lg">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">Предоставить доступ к курсу</h3>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Пользователь
              </label>
              <select
                value={selectedUser}
                onChange={(e) => setSelectedUser(e.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-primary-500 focus:border-primary-500"
              >
                <option value="">Выберите пользователя</option>
                {users.map((user) => (
                  <option key={user.id} value={user.id}>
                    {user.name} ({user.email})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Курс
              </label>
              <select
                value={selectedCourse}
                onChange={(e) => setSelectedCourse(e.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-primary-500 focus:border-primary-500"
              >
                <option value="">Выберите курс</option>
                {courses.map((course) => (
                  <option key={course.id} value={course.id}>
                    {course.title}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-end">
              <button
                onClick={handleGrantAccess}
                disabled={!selectedUser || !selectedCourse}
                className="w-full bg-primary-600 text-white px-4 py-2 rounded-md hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              >
                <UserPlusIcon className="h-5 w-5 mr-2" />
                Предоставить доступ
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Users List */}
      <div className="bg-white shadow rounded-lg">
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-medium text-gray-900">Пользователи и их доступы</h3>
            <div className="relative">
              <MagnifyingGlassIcon className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Поиск пользователей..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500"
              />
            </div>
          </div>
        </div>
        <div className="p-6">
          {filteredUsers.length === 0 ? (
            <p className="text-gray-500 text-center py-8">Пользователи не найдены</p>
          ) : (
            <div className="space-y-4">
              {filteredUsers.map((user) => (
                <div key={user.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h4 className="font-medium text-gray-900">{user.name}</h4>
                      <p className="text-sm text-gray-500">{user.email}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <UsersIcon className="h-5 w-5 text-gray-400" />
                      <span className="text-sm text-gray-500">
                        {enrollments.filter(e => e.user.id === user.id).length} курсов
                      </span>
                    </div>
                  </div>

                  {/* User's Course Access */}
                  <div className="space-y-2">
                    <h5 className="text-sm font-medium text-gray-700 mb-2">Доступ к курсам:</h5>
                    {courses.length === 0 ? (
                      <p className="text-gray-500 text-sm">Нет доступных курсов</p>
                    ) : (
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                        {courses.map((course) => {
                          const hasAccess = getEnrollmentStatus(user.id, course.id);
                          return (
                            <div
                              key={course.id}
                              className={`p-3 rounded-md border ${
                                hasAccess
                                  ? 'bg-green-50 border-green-200'
                                  : 'bg-gray-50 border-gray-200'
                              }`}
                            >
                              <div className="flex items-center justify-between">
                                <div className="flex-1">
                                  <p className="text-sm font-medium text-gray-900">{course.title}</p>
                                  <p className="text-xs text-gray-500">
                                    {hasAccess ? 'Доступ предоставлен' : 'Нет доступа'}
                                  </p>
                                </div>
                                <div className="flex items-center space-x-2">
                                  {hasAccess ? (
                                    <button
                                      onClick={() => handleRevokeAccess(user.id, course.id)}
                                      className="text-red-600 hover:text-red-800 text-sm flex items-center"
                                    >
                                      <UserMinusIcon className="h-4 w-4 mr-1" />
                                      Отозвать
                                    </button>
                                  ) : (
                                    <button
                                      onClick={() => {
                                        setSelectedUser(user.id);
                                        setSelectedCourse(course.id);
                                        handleGrantAccess();
                                      }}
                                      className="text-green-600 hover:text-green-800 text-sm flex items-center"
                                    >
                                      <UserPlusIcon className="h-4 w-4 mr-1" />
                                      Предоставить
                                    </button>
                                  )}
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminCourseAccess; 
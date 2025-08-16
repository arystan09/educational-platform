import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import apiService from '../services/api';
import { Course } from '../types';
import {
  PlusIcon,
  MagnifyingGlassIcon,
  AcademicCapIcon,
  StarIcon,
  UserIcon,
  CalendarIcon,
} from '@heroicons/react/24/outline';

const Courses: React.FC = () => {
  const { user } = useAuth();
  const [courses, setCourses] = useState<Course[]>([]);
  const [filteredCourses, setFilteredCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState<'all' | 'enrolled' | 'available'>('all');

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const coursesData = await apiService.getCourses();
        setCourses(coursesData);
        setFilteredCourses(coursesData);
      } catch (error) {
        console.error('Failed to fetch courses:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  useEffect(() => {
    let filtered = courses;

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(course =>
        course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply status filter
    if (filter === 'enrolled') {
      filtered = filtered.filter(course => 
        course.enrollments?.some(enrollment => 
          enrollment.user.id === user?.id && enrollment.status === 'APPROVED'
        )
      );
    } else if (filter === 'available') {
      filtered = filtered.filter(course => 
        !course.enrollments?.some(enrollment => 
          enrollment.user.id === user?.id && enrollment.status === 'APPROVED'
        )
      );
    }

    setFilteredCourses(filtered);
  }, [courses, searchTerm, filter, user?.id]);



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
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Курсы</h1>
          <p className="text-gray-600 mt-1">Откройте и запишитесь на курсы</p>
        </div>
        {user?.role === 'INSTRUCTOR' && (
          <Link
            to="/courses/create"
            className="btn-primary inline-flex items-center mt-4 sm:mt-0"
          >
            <PlusIcon className="h-5 w-5 mr-2" />
            Создать курс
          </Link>
        )}
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Поиск курсов..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="input-field pl-10"
              />
            </div>
          </div>
          <div className="flex gap-2">
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value as 'all' | 'enrolled' | 'available')}
              className="input-field"
            >
              <option value="all">Все курсы</option>
              <option value="enrolled">Записанные</option>
              <option value="available">Доступные</option>
            </select>
          </div>
        </div>
      </div>

      {/* Course Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCourses.map((course) => {
          const isEnrolled = course.enrollments?.some(
            enrollment => enrollment.user.id === user?.id && enrollment.status === 'APPROVED'
          );
          const isInstructor = course.createdBy?.id === user?.id;
          const averageRating = course.reviews?.length > 0
            ? course.reviews.reduce((sum, review) => sum + review.rating, 0) / course.reviews.length
            : 0;

          return (
            <div key={course.id} className="card overflow-hidden">
              {course.thumbnailUrl && (
                <div className="aspect-w-16 aspect-h-9 bg-gray-200">
                  <img
                    src={course.thumbnailUrl}
                    alt={course.title}
                    className="w-full h-48 object-cover"
                  />
                </div>
              )}
              <div className="p-6">
                <div className="flex items-start justify-between">
                  <h3 className="text-lg font-semibold text-gray-900 line-clamp-2">
                    {course.title}
                  </h3>
                  {isInstructor && (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      Ваш курс
                    </span>
                  )}
                </div>
                
                <p className="text-gray-600 text-sm mt-2 line-clamp-3">
                  {course.description}
                </p>

                <div className="mt-4 flex items-center justify-between text-sm text-gray-500">
                  <div className="flex items-center">
                    <UserIcon className="h-4 w-4 mr-1" />
                    <span>{course.createdBy?.name}</span>
                  </div>
                  <div className="flex items-center">
                    <StarIcon className="h-4 w-4 mr-1 text-yellow-400" />
                    <span>{averageRating.toFixed(1)}</span>
                  </div>
                </div>

                <div className="mt-4 flex items-center justify-between">
                  <div className="flex items-center text-sm text-gray-500">
                    <CalendarIcon className="h-4 w-4 mr-1" />
                    <span>{new Date(course.createdAt).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center">
                    <AcademicCapIcon className="h-4 w-4 mr-1 text-gray-400" />
                    <span className="text-sm text-gray-500">
                      {course.chapters?.length || 0} глав
                    </span>
                  </div>
                </div>

                <div className="mt-6">
                  <Link
                    to={`/courses/${course.id}`}
                    className="btn-primary w-full text-center"
                  >
                    Просмотреть курс
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {filteredCourses.length === 0 && (
        <div className="text-center py-12">
          <AcademicCapIcon className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">Курсы не найдены</h3>
          <p className="mt-1 text-sm text-gray-500">
            {searchTerm || filter !== 'all' 
              ? 'Попробуйте изменить поиск или фильтры.'
              : 'Начните с создания вашего первого курса.'
            }
          </p>
        </div>
      )}
    </div>
  );
};

export default Courses; 
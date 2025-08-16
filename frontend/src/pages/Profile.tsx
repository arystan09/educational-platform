import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import apiService from '../services/api';
import { Certificate, Enrollment } from '../types';
import EmailVerification from '../components/EmailVerification';
import {
  UserIcon,
  AcademicCapIcon,
  DocumentTextIcon,
  CalendarIcon,
  EnvelopeIcon,
} from '@heroicons/react/24/outline';

const Profile: React.FC = () => {
  const { user } = useAuth();
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [enrollments, setEnrollments] = useState<Enrollment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const [certificatesData, enrollmentsData] = await Promise.all([
          apiService.getCertificates(),
          apiService.getEnrollments(),
        ]);
        setCertificates(certificatesData);
        setEnrollments(enrollmentsData);
      } catch (error) {
        console.error('Failed to fetch profile data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfileData();
  }, []);

  const getRoleDisplay = (role?: string) => {
    switch (role) {
      case 'STUDENT':
        return 'Студент';
      case 'INSTRUCTOR':
        return 'Преподаватель';
      case 'ADMIN':
        return 'Администратор';
      default:
        return role?.toLowerCase() || '';
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
    <div className="space-y-6">
      {/* Profile Header */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center space-x-6">
          <div className="h-20 w-20 rounded-full bg-primary-600 flex items-center justify-center">
            <span className="text-2xl font-bold text-white">
              {user?.name?.charAt(0)?.toUpperCase()}
            </span>
          </div>
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-gray-900">{user?.name}</h1>
            <p className="text-gray-600">{getRoleDisplay(user?.role)}</p>
            <div className="flex items-center mt-2 text-sm text-gray-500">
              <EnvelopeIcon className="h-4 w-4 mr-2" />
              <span>{user?.email}</span>
            </div>
            <div className="flex items-center mt-1 text-sm text-gray-500">
              <CalendarIcon className="h-4 w-4 mr-2" />
              <span>Участник с {new Date(user?.createdAt || '').toLocaleDateString()}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <AcademicCapIcon className="h-8 w-8 text-primary-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Записанные курсы</p>
              <p className="text-2xl font-bold text-gray-900">
                {enrollments.filter(e => e.status === 'APPROVED').length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <DocumentTextIcon className="h-8 w-8 text-green-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Сертификаты</p>
              <p className="text-2xl font-bold text-gray-900">{certificates.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <UserIcon className="h-8 w-8 text-blue-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Тип аккаунта</p>
              <p className="text-2xl font-bold text-gray-900">
                {getRoleDisplay(user?.role)}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Enrolled Courses */}
      <div className="bg-white rounded-lg shadow">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-medium text-gray-900">Записанные курсы</h2>
        </div>
        <div className="p-6">
          {enrollments.filter(e => e.status === 'APPROVED').length === 0 ? (
            <p className="text-gray-500 text-center py-4">Пока нет записанных курсов.</p>
          ) : (
            <div className="space-y-4">
              {enrollments
                .filter(e => e.status === 'APPROVED')
                .map((enrollment) => (
                  <div key={enrollment.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                    <div className="flex items-center space-x-4">
                      <AcademicCapIcon className="h-8 w-8 text-primary-600" />
                      <div>
                        <h3 className="font-medium text-gray-900">{enrollment.course.title}</h3>
                        <p className="text-sm text-gray-500">
                          Записан {new Date(enrollment.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <div className="text-sm text-gray-500">
                      Доступ предоставлен
                    </div>
                  </div>
                ))}
            </div>
          )}
        </div>
      </div>

      {/* Certificates */}
      {certificates.length > 0 && (
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-medium text-gray-900">Сертификаты</h2>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {certificates.map((certificate) => (
                <div key={certificate.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium text-gray-900">{certificate.course.title}</h3>
                      <p className="text-sm text-gray-500">
                        Выдан {new Date(certificate.issuedAt).toLocaleDateString()}
                      </p>
                    </div>
                    <a
                      href={certificate.certificateUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-secondary"
                    >
                      Скачать
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Email Verification */}
      <EmailVerification />

      {/* Account Information */}
      <div className="bg-white rounded-lg shadow">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-medium text-gray-900">Информация об аккаунте</h2>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium text-gray-900">Email</h3>
                <p className="text-sm text-gray-500">{user?.email}</p>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium text-gray-900">Роль</h3>
                <p className="text-sm text-gray-500">{getRoleDisplay(user?.role)}</p>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium text-gray-900">Дата регистрации</h3>
                <p className="text-sm text-gray-500">
                  {new Date(user?.createdAt || '').toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile; 
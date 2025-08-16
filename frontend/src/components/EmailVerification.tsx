import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import apiService from '../services/api';
import {
  EnvelopeIcon,
  ExclamationTriangleIcon,
  CheckCircleIcon,
  ArrowPathIcon,
} from '@heroicons/react/24/outline';

interface EmailVerificationProps {
  onVerified?: () => void;
}

const EmailVerification: React.FC<EmailVerificationProps> = ({ onVerified }) => {
  const { user, updateUser } = useAuth();
  const [verificationToken, setVerificationToken] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState<'success' | 'error' | 'info'>('info');

  const handleVerifyEmail = async () => {
    if (!verificationToken.trim()) {
      setMessage('Введите токен подтверждения');
      setMessageType('error');
      return;
    }

    setIsVerifying(true);
    try {
      const response = await apiService.verifyEmail(verificationToken);
      setMessage(response.message);
      setMessageType('success');
      
      // Update user context
      if (updateUser && user) {
        updateUser({ ...user, emailVerified: true });
      }
      
      // Call callback if provided
      if (onVerified) {
        onVerified();
      }
    } catch (error: any) {
      setMessage(error.response?.data?.message || 'Ошибка подтверждения email');
      setMessageType('error');
    } finally {
      setIsVerifying(false);
    }
  };

  const handleResendVerification = async () => {
    if (!user?.email) {
      setMessage('Email не найден');
      setMessageType('error');
      return;
    }

    setIsResending(true);
    try {
      const response = await apiService.resendVerificationEmail(user.email);
      setMessage(response.message);
      setMessageType('success');
    } catch (error: any) {
      setMessage(error.response?.data?.message || 'Ошибка отправки email');
      setMessageType('error');
    } finally {
      setIsResending(false);
    }
  };

  if (user?.emailVerified) {
    return (
      <div className="bg-green-50 border border-green-200 rounded-lg p-4">
        <div className="flex items-center">
          <CheckCircleIcon className="h-5 w-5 text-green-600 mr-2" />
          <span className="text-green-800">Email подтвержден</span>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
      <div className="flex items-start">
        <ExclamationTriangleIcon className="h-6 w-6 text-yellow-600 mr-3 mt-0.5" />
        <div className="flex-1">
          <h3 className="text-lg font-medium text-yellow-800 mb-2">
            Подтвердите ваш email
          </h3>
          <p className="text-yellow-700 mb-4">
            Для полного доступа к системе необходимо подтвердить ваш email адрес.
          </p>

          {message && (
            <div className={`mb-4 p-3 rounded-md ${
              messageType === 'success' ? 'bg-green-100 text-green-800' :
              messageType === 'error' ? 'bg-red-100 text-red-800' :
              'bg-blue-100 text-blue-800'
            }`}>
              {message}
            </div>
          )}

          <div className="space-y-4">
            {/* Verification Token Input */}
            <div>
              <label htmlFor="verificationToken" className="block text-sm font-medium text-yellow-800 mb-1">
                Код подтверждения
              </label>
              <div className="flex space-x-2">
                <input
                  type="text"
                  id="verificationToken"
                  value={verificationToken}
                  onChange={(e) => setVerificationToken(e.target.value)}
                  placeholder="Введите код из email"
                  className="flex-1 input-field"
                />
                <button
                  onClick={handleVerifyEmail}
                  disabled={isVerifying}
                  className="btn-primary whitespace-nowrap"
                >
                  {isVerifying ? 'Проверка...' : 'Подтвердить'}
                </button>
              </div>
            </div>

            {/* Resend Verification */}
            <div className="flex items-center justify-between">
              <div className="text-sm text-yellow-700">
                Не получили код? Проверьте папку "Спам" или
              </div>
              <button
                onClick={handleResendVerification}
                disabled={isResending}
                className="btn-secondary flex items-center"
              >
                <ArrowPathIcon className={`h-4 w-4 mr-1 ${isResending ? 'animate-spin' : ''}`} />
                {isResending ? 'Отправка...' : 'Отправить повторно'}
              </button>
            </div>

            {/* Development Info */}
            {process.env.NODE_ENV === 'development' && (
              <div className="mt-4 p-3 bg-gray-100 rounded-md">
                <p className="text-sm text-gray-600">
                  <strong>Для разработки:</strong> Код подтверждения отправляется в консоль сервера.
                  Проверьте логи backend для получения токена.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmailVerification; 
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import apiService from '../services/api';
import { Quiz, QuizQuestion } from '../types';
import {
  ArrowLeftIcon,
  QuestionMarkCircleIcon,
  CheckCircleIcon,
  XCircleIcon,
} from '@heroicons/react/24/outline';

const QuizTaker: React.FC = () => {
  const { courseId, quizId } = useParams<{ courseId: string; quizId: string }>();
  const navigate = useNavigate();
  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<{ [questionId: number]: number }>({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [quizResults, setQuizResults] = useState<any>(null);

  useEffect(() => {
    const fetchQuiz = async () => {
      if (!courseId || !quizId) return;
      
      try {
        console.log('🔍 Fetching quizzes for course:', courseId);
        console.log('🔍 Looking for quiz ID:', quizId, 'type:', typeof quizId);
        const quizzes = await apiService.getQuizzes(courseId);
        console.log('📋 All quizzes:', quizzes);
        console.log('📋 Quiz IDs:', quizzes.map(q => ({ id: q.id, type: typeof q.id, title: q.title })));
        const currentQuiz = quizzes.find(q => q.id === Number(quizId));
        console.log('🎯 Found quiz:', currentQuiz);
        if (currentQuiz) {
          setQuiz(currentQuiz);
        }
      } catch (error) {
        console.error('Failed to fetch quiz:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchQuiz();
  }, [courseId, quizId]);

  const handleAnswerSelect = (questionId: number, optionId: number) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: optionId,
    }));
  };

  const handleSubmit = async () => {
    if (!quiz || !courseId) return;
    setLoading(true);
    setError('');
    try {
      const submissionData = {
        quizId: quiz.id.toString(),
        answers: Object.entries(answers).map(([questionId, selectedOptionId]) => ({
          questionId: Number(questionId),
          selectedOptionId,
        })),
      };
      
      const results = await apiService.submitQuiz(courseId!, submissionData);
      setQuizResults(results);
      setSubmitted(true);
    } catch (error: any) {
      console.error('Failed to submit quiz:', error);
      setError(error.response?.data?.message || 'Ошибка отправки теста');
    } finally {
      setLoading(false);
    }
  };

  const currentQuestion = quiz?.questions?.[currentQuestionIndex];

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (!quiz) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-900">Тест не найден</h2>
        <p className="text-gray-600 mt-2">Тест, который вы ищете, не существует.</p>
      </div>
    );
  }

  if (submitted) {
    return (
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="text-center mb-6">
            <CheckCircleIcon className="h-16 w-16 text-green-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Тест завершен!</h2>
            {quizResults && (
              <div className="mb-4">
                <p className="text-lg text-gray-600">
                  Ваш результат: {quizResults.score} из {quizResults.totalQuestions} ({quizResults.percentage}%)
                </p>
                <div className={`text-lg font-semibold mt-2 ${
                  quizResults.percentage >= 70 ? 'text-green-600' : 'text-red-600'
                }`}>
                  {quizResults.percentage >= 70 ? 'Отлично!' : 'Попробуйте еще раз'}
                </div>
              </div>
            )}
          </div>

          {quizResults?.details && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">Детали результатов:</h3>
              {quizResults.details.map((detail: any, index: number) => (
                <div key={index} className="border rounded-lg p-4">
                  <h4 className="font-medium text-gray-900 mb-2">{detail.question}</h4>
                  <div className="space-y-2">
                    <div className={`p-2 rounded ${
                      detail.isCorrect ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'
                    }`}>
                      <span className="font-medium">Ваш ответ:</span> {detail.selectedOption}
                      {detail.isCorrect ? (
                        <span className="text-green-600 ml-2">✓ Правильно</span>
                      ) : (
                        <span className="text-red-600 ml-2">✗ Неправильно</span>
                      )}
                    </div>
                    {!detail.isCorrect && detail.correctOption && (
                      <div className="p-2 rounded bg-green-50 border border-green-200">
                        <span className="font-medium">Правильный ответ:</span> {detail.correctOption}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="mt-6 text-center">
            <button
              onClick={() => navigate(`/courses/${courseId}`)}
              className="btn-primary"
            >
              Вернуться к курсу
            </button>
          </div>
        </div>
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
        
        <div className="text-sm text-gray-500">
          Вопрос {currentQuestionIndex + 1} из {quiz.questions?.length || 0}
        </div>
      </div>

      {/* Quiz Content */}
      <div className="bg-white rounded-lg shadow p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">{quiz.title}</h1>
        
        {currentQuestion && (
          <div className="space-y-6">
            {/* Question */}
            <div className="flex items-start space-x-3">
              <QuestionMarkCircleIcon className="h-6 w-6 text-primary-600 mt-1" />
              <div className="flex-1">
                <h3 className="text-lg font-medium text-gray-900 mb-4">
                  {currentQuestion.question}
                </h3>
                
                {/* Options */}
                <div className="space-y-3">
                  {currentQuestion.options?.map((option) => (
                    <label
                      key={option.id}
                      className={`flex items-center p-3 border rounded-lg cursor-pointer transition-colors ${
                        answers[currentQuestion.id] === option.id
                          ? 'border-primary-500 bg-primary-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <input
                        type="radio"
                        name={`question-${currentQuestion.id}`}
                        value={option.id.toString()}
                        checked={answers[currentQuestion.id] === option.id}
                        onChange={() => handleAnswerSelect(currentQuestion.id, option.id)}
                        className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300"
                      />
                      <span className="ml-3 text-gray-900">{option.text}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Navigation */}
        <div className="flex justify-between mt-8 pt-6 border-t border-gray-200">
          <button
            onClick={() => setCurrentQuestionIndex(prev => Math.max(0, prev - 1))}
            disabled={currentQuestionIndex === 0}
            className="btn-secondary disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Предыдущий
          </button>
          
          {currentQuestionIndex < (quiz.questions?.length || 0) - 1 ? (
            <button
              onClick={() => setCurrentQuestionIndex(prev => prev + 1)}
              className="btn-primary"
            >
              Следующий
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              disabled={Object.keys(answers).length < (quiz.questions?.length || 0)}
              className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Завершить тест
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuizTaker; 
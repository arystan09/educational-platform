import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Homepage: React.FC = () => {
  const { isAuthenticated } = useAuth();

  // Updated featured courses data based on the provided programs
  const featuredCourses = [
    {
      id: 1,
      title: 'Развитие профессиональных компетенций педагогов',
      subtitle: 'в условиях трансформации системы дошкольного образования',
      description: 'Программа повышения квалификации для педагогов дошкольных организаций с акцентом на современные подходы к образованию',
      instructor: 'Эксперты в области дошкольного образования',
      duration: '108 часов',
      format: 'Оффлайн / Онлайн',
      target: 'Педагоги дошкольных организаций',
      image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400&h=250&fit=crop'
    },
    {
      id: 2,
      title: 'Профориентология и карьера',
      subtitle: 'Профориентатор в школе',
      description: 'Современные методики профориентационной работы с учащимися в условиях цифровой трансформации',
      instructor: 'Специалисты по профориентации',
      duration: '108 часов',
      format: 'Оффлайн / Онлайн',
      target: 'Педагоги основного среднего и общего среднего образования',
      image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=250&fit=crop'
    },
    {
      id: 3,
      title: 'Методист 5.0',
      subtitle: 'Профессиональный рост и цифровая трансформация',
      description: 'Программа для методистов по сопровождению педагогов в новой цифровой реальности',
      instructor: 'Эксперты в области методической работы',
      duration: '108 часов',
      format: 'Оффлайн / Онлайн',
      target: 'Методисты и заместители руководителей',
      image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=250&fit=crop'
    },
    {
      id: 4,
      title: 'Инновационная математика',
      subtitle: 'Цифровые инструменты и системное мышление',
      description: 'Новые стандарты преподавания математики с использованием современных технологий',
      instructor: 'Эксперты в области математического образования',
      duration: '108 часов',
      format: 'Оффлайн / Онлайн',
      target: 'Педагоги начального и среднего образования',
      image: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=400&h=250&fit=crop'
    }
  ];

  const features = [
    {
      icon: '🎓',
      title: 'Повышение квалификации',
      description: 'Современные программы для педагогов всех уровней образования'
    },
    {
      icon: '💻',
      title: 'Цифровая трансформация',
      description: 'Инновационные подходы и цифровые инструменты в образовании'
    },
    {
      icon: '📚',
      title: 'Практические методики',
      description: 'Реальные инструменты и методики для применения в работе'
    },
    {
      icon: '🏆',
      title: 'Сертификация',
      description: 'Официальные документы о повышении квалификации'
    }
  ];

  const stats = [
    { number: 'N/A+', label: 'Педагогов' },
    { number: 'N/A+', label: 'Программ' },
    { number: 'N/A+', label: 'Экспертов' },
    { number: 'N/A%', label: 'Довольных слушателей' }
  ];

  const targetAudiences = [
    'Педагоги дошкольных организаций',
    'Учителя начальных классов',
    'Преподаватели среднего образования',
    'Методисты и координаторы',
    'Заместители руководителей',
    'Специалисты по профориентации'
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                  <span className="text-white text-xl font-bold">ОП</span>
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">Образовательная программа</h1>
                  <p className="text-sm text-gray-600">Повышение квалификации педагогов</p>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              {isAuthenticated ? (
                <Link
                  to="/dashboard"
                  className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium"
                >
                  Личный кабинет
                </Link>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="text-gray-600 hover:text-gray-900 transition-colors font-medium"
                  >
                    Войти
                  </Link>
                  <Link
                    to="/register"
                    className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium"
                  >
                    Регистрация
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <div className="mb-6">
              <span className="inline-block bg-white bg-opacity-20 text-white px-4 py-2 rounded-full text-sm font-medium mb-4">
                Программы повышения квалификации
              </span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Развитие профессиональных
              <span className="block text-blue-200">компетенций педагогов</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100 max-w-3xl mx-auto">
              Современные программы повышения квалификации для педагогов всех уровней образования с акцентом на цифровую трансформацию
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/courses"
                className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors text-lg"
              >
                Посмотреть программы
              </Link>
              <Link
                to="/register"
                className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors text-lg"
              >
                Зарегистрироваться
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Наши достижения
            </h2>
            <p className="text-xl text-gray-600">
              Тысячи педагогов уже повысили свою квалификацию с нами
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-blue-600 mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Target Audience Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Для кого наши программы
            </h2>
            <p className="text-xl text-gray-600">
              Программы повышения квалификации для всех уровней образования
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {targetAudiences.map((audience, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition-shadow">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-blue-600 rounded-full mr-4"></div>
                  <span className="text-gray-900 font-medium">{audience}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Преимущества наших программ
            </h2>
            <p className="text-xl text-gray-600">
              Современный подход к повышению квалификации педагогов
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Programs Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Популярные программы
            </h2>
            <p className="text-xl text-gray-600">
              Актуальные программы повышения квалификации для современного педагога
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {featuredCourses.map((course) => (
              <div key={course.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow border border-gray-200">
                <div className="relative">
                  <img
                    src={course.image}
                    alt={course.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute top-4 right-4 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                    {course.duration}
                  </div>
                </div>
                <div className="p-6">
                  <div className="mb-3">
                    <h3 className="text-xl font-bold text-gray-900 mb-1">
                      {course.title}
                    </h3>
                    <p className="text-blue-600 font-medium text-sm">
                      {course.subtitle}
                    </p>
                  </div>
                  <p className="text-gray-600 mb-4">
                    {course.description}
                  </p>
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-sm text-gray-500">
                      <span className="font-medium mr-2">Формат:</span>
                      {course.format}
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                      <span className="font-medium mr-2">Целевая аудитория:</span>
                      {course.target}
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                      <span className="font-medium mr-2">Преподаватели:</span>
                      {course.instructor}
                    </div>
                  </div>
                  <Link
                    to={`/courses/${course.id}`}
                    className="block w-full bg-blue-600 text-white text-center py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
                  >
                    Подробнее о программе
                  </Link>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link
              to="/courses"
              className="inline-block bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors text-lg"
            >
              Все программы повышения квалификации
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-indigo-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Готовы повысить свою квалификацию?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Присоединяйтесь к тысячам педагогов, которые уже развили свои профессиональные компетенции с нашими программами
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/register"
              className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors text-lg"
            >
              Зарегистрироваться
            </Link>
            <Link
              to="/courses"
              className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors text-lg"
            >
              Посмотреть программы
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                  <span className="text-white text-sm font-bold">ОП</span>
                </div>
                <div>
                  <h3 className="text-xl font-semibold">Образовательная программа</h3>
                  <p className="text-sm text-gray-400">Повышение квалификации педагогов</p>
                </div>
              </div>
              <p className="text-gray-400">
                Современные программы повышения квалификации для педагогов всех уровней образования
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Программы</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link to="/courses" className="hover:text-white">Все программы</Link></li>
                <li><Link to="/courses" className="hover:text-white">Дошкольное образование</Link></li>
                <li><Link to="/courses" className="hover:text-white">Профориентация</Link></li>
                <li><Link to="/courses" className="hover:text-white">Методическая работа</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Поддержка</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">Помощь</a></li>
                <li><a href="#" className="hover:text-white">Контакты</a></li>
                <li><a href="#" className="hover:text-white">FAQ</a></li>
                <li><a href="#" className="hover:text-white">Документы</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">О нас</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">О платформе</a></li>
                <li><a href="#" className="hover:text-white">Эксперты</a></li>
                <li><a href="#" className="hover:text-white">Новости</a></li>
                <li><a href="#" className="hover:text-white">Партнеры</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Образовательная программа. Все права защищены.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Homepage; 
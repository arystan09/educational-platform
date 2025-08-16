import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Course } from '../api/courses/entites/course.entity';
import { Chapter } from '../api/chapters/chapter.entity';
import { Assignment } from '../api/assignments/entites/assignment.entity';
import { Quiz } from '../api/quizzes/entities/quiz.entity';
import { QuizQuestion } from '../api/quizzes/entities/quiz-question.entity';
import { QuizOption } from '../api/quizzes/entities/quiz-option.entity';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class SeederService {
  constructor(
    @InjectRepository(Course)
    private readonly courseRepository: Repository<Course>,
    @InjectRepository(Chapter)
    private readonly chapterRepository: Repository<Chapter>,
    @InjectRepository(Assignment)
    private readonly assignmentRepository: Repository<Assignment>,
    @InjectRepository(Quiz)
    private readonly quizRepository: Repository<Quiz>,
    @InjectRepository(QuizQuestion)
    private readonly quizQuestionRepository: Repository<QuizQuestion>,
    @InjectRepository(QuizOption)
    private readonly quizOptionRepository: Repository<QuizOption>,
  ) {}

  async seed() {
    console.log('🌱 Starting database seeding...');

    try {
      // Check if courses already exist
      const existingCourses = await this.courseRepository.count();
      if (existingCourses > 0) {
        console.log('✅ Courses already exist, skipping seeding');
        return;
      }

      // Course data
      const coursesData = [
        {
          id: '1',
          title: 'Развитие профессиональных компетенций педагогов',
          description: 'Программа повышения квалификации для педагогов дошкольных организаций с акцентом на современные подходы к образованию',
          duration: 108,
          category: 'в условиях трансформации системы дошкольного образования',
          thumbnailUrl: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400&h=250&fit=crop',
          isPublished: true,
          chapters: [
            {
              title: 'Введение в современное дошкольное образование',
              content: 'В данной главе мы рассмотрим основные принципы современного дошкольного образования, его цели и задачи в условиях цифровой трансформации общества.',
              order: 1,
              videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
            },
            {
              title: 'Цифровые технологии в дошкольном образовании',
              content: 'Изучим современные цифровые инструменты и технологии, которые можно эффективно использовать в работе с дошкольниками.',
              order: 2,
              videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
            },
            {
              title: 'Практические методики работы с детьми',
              content: 'Рассмотрим конкретные методики и приемы работы с дошкольниками, направленные на развитие их познавательных способностей.',
              order: 3,
              videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
            }
          ],
          assignments: [
            {
              id: uuidv4(),
              title: 'Разработка образовательного проекта',
              description: 'Создайте образовательный проект для дошкольников с использованием современных технологий',
              dueDate: new Date('2024-12-31')
            },
            {
              id: uuidv4(),
              title: 'Анализ педагогической ситуации',
              description: 'Проанализируйте предложенную педагогическую ситуацию и предложите решение',
              dueDate: new Date('2024-12-31')
            }
          ],
          quizzes: [
            {
              title: 'Основы дошкольного образования',
              description: 'Тест по основам современного дошкольного образования',
              questions: [
                {
                  question: 'Какой возраст является оптимальным для начала обучения чтению?',
                  type: 'MULTIPLE_CHOICE',
                  options: [
                    { text: '3-4 года', isCorrect: false },
                    { text: '5-6 лет', isCorrect: true },
                    { text: '7-8 лет', isCorrect: false },
                    { text: '9-10 лет', isCorrect: false }
                  ]
                },
                {
                  question: 'Какая из перечисленных технологий НЕ подходит для дошкольников?',
                  type: 'MULTIPLE_CHOICE',
                  options: [
                    { text: 'Интерактивные доски', isCorrect: false },
                    { text: 'Образовательные приложения', isCorrect: false },
                    { text: 'Социальные сети', isCorrect: true },
                    { text: 'Обучающие игры', isCorrect: false }
                  ]
                }
              ]
            }
          ]
        },
        {
          id: '2',
          title: 'Профориентология и карьера',
          description: 'Современные методики профориентационной работы с учащимися в условиях цифровой трансформации',
          duration: 108,
          category: 'Профориентатор в школе',
          thumbnailUrl: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=250&fit=crop',
          isPublished: true,
          chapters: [
            {
              title: 'Основы профориентологии',
              content: 'Изучим теоретические основы профориентологии, ее цели, задачи и принципы работы с учащимися.',
              order: 1,
              videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
            },
            {
              title: 'Современные методики профориентации',
              content: 'Рассмотрим актуальные методики и технологии профориентационной работы в цифровую эпоху.',
              order: 2,
              videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
            },
            {
              title: 'Практикум по профориентации',
              content: 'Практические занятия по проведению профориентационных мероприятий с учащимися.',
              order: 3,
              videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
            }
          ],
          assignments: [
            {
              id: uuidv4(),
              title: 'Разработка профориентационного мероприятия',
              description: 'Создайте план и проведите профориентационное мероприятие для учащихся',
              dueDate: new Date('2024-12-31')
            },
            {
              id: uuidv4(),
              title: 'Анализ рынка труда',
              description: 'Проведите анализ современного рынка труда и составьте отчет',
              dueDate: new Date('2024-12-31')
            }
          ],
          quizzes: [
            {
              title: 'Профориентология в современной школе',
              description: 'Тест по основам профориентологической работы',
              questions: [
                {
                  question: 'В каком возрасте рекомендуется начинать профориентационную работу?',
                  type: 'MULTIPLE_CHOICE',
                  options: [
                    { text: '5-6 класс', isCorrect: true },
                    { text: '9-10 класс', isCorrect: false },
                    { text: '11 класс', isCorrect: false },
                    { text: 'После школы', isCorrect: false }
                  ]
                },
                {
                  question: 'Какие методы профориентации наиболее эффективны?',
                  type: 'MULTIPLE_CHOICE',
                  options: [
                    { text: 'Тестирование', isCorrect: true },
                    { text: 'Экскурсии на предприятия', isCorrect: true },
                    { text: 'Встречи с профессионалами', isCorrect: true },
                    { text: 'Только лекции', isCorrect: false }
                  ]
                }
              ]
            }
          ]
        },
        {
          id: '3',
          title: 'Методист 5.0',
          description: 'Программа для методистов по сопровождению педагогов в новой цифровой реальности',
          duration: 108,
          category: 'Профессиональный рост и цифровая трансформация',
          thumbnailUrl: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=250&fit=crop',
          isPublished: true,
          chapters: [
            {
              title: 'Роль методиста в цифровую эпоху',
              content: 'Изучим трансформацию роли методиста в условиях цифровизации образования.',
              order: 1,
              videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
            },
            {
              title: 'Цифровые инструменты для методической работы',
              content: 'Рассмотрим современные цифровые инструменты и платформы для методической работы.',
              order: 2,
              videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
            },
            {
              title: 'Сопровождение педагогов в цифровой среде',
              content: 'Изучим методики сопровождения и поддержки педагогов в процессе цифровой трансформации.',
              order: 3,
              videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
            }
          ],
          assignments: [
            {
              id: uuidv4(),
              title: 'Разработка цифровой методической системы',
              description: 'Создайте концепцию цифровой методической системы для образовательной организации',
              dueDate: new Date('2024-12-31')
            },
            {
              id: uuidv4(),
              title: 'План цифровой трансформации',
              description: 'Разработайте план цифровой трансформации для педагогического коллектива',
              dueDate: new Date('2024-12-31')
            }
          ],
          quizzes: [
            {
              title: 'Методическая работа в цифровую эпоху',
              description: 'Тест по современным подходам к методической работе',
              questions: [
                {
                  question: 'Какие компетенции необходимы современному методисту?',
                  type: 'MULTIPLE_CHOICE',
                  options: [
                    { text: 'Цифровая грамотность', isCorrect: true },
                    { text: 'Педагогическое мастерство', isCorrect: true },
                    { text: 'Управленческие навыки', isCorrect: true },
                    { text: 'Только педагогическое образование', isCorrect: false }
                  ]
                },
                {
                  question: 'Какой процент времени методист должен уделять цифровым технологиям?',
                  type: 'MULTIPLE_CHOICE',
                  options: [
                    { text: '10-20%', isCorrect: false },
                    { text: '30-40%', isCorrect: false },
                    { text: '50-60%', isCorrect: true },
                    { text: '80-90%', isCorrect: false }
                  ]
                }
              ]
            }
          ]
        },
        {
          id: '4',
          title: 'Инновационная математика',
          description: 'Новые стандарты преподавания математики с использованием современных технологий',
          duration: 108,
          category: 'Цифровые инструменты и системное мышление',
          thumbnailUrl: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=400&h=250&fit=crop',
          isPublished: true,
          chapters: [
            {
              title: 'Современные подходы к преподаванию математики',
              content: 'Изучим инновационные подходы к преподаванию математики в условиях цифровой трансформации.',
              order: 1,
              videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
            },
            {
              title: 'Цифровые инструменты в математическом образовании',
              content: 'Рассмотрим современные цифровые инструменты и программы для преподавания математики.',
              order: 2,
              videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
            },
            {
              title: 'Развитие системного мышления через математику',
              content: 'Изучим методики развития системного мышления учащихся через математические задачи.',
              order: 3,
              videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
            }
          ],
          assignments: [
            {
              id: uuidv4(),
              title: 'Разработка интерактивного урока математики',
              description: 'Создайте план интерактивного урока математики с использованием цифровых технологий',
              dueDate: new Date('2024-12-31')
            },
            {
              id: uuidv4(),
              title: 'Математический проект',
              description: 'Разработайте математический проект для учащихся с применением современных технологий',
              dueDate: new Date('2024-12-31')
            }
          ],
          quizzes: [
            {
              title: 'Инновационная математика',
              description: 'Тест по современным подходам к преподаванию математики',
              questions: [
                {
                  question: 'Какие цифровые инструменты наиболее эффективны для преподавания математики?',
                  type: 'MULTIPLE_CHOICE',
                  options: [
                    { text: 'Геогебра', isCorrect: true },
                    { text: 'Wolfram Alpha', isCorrect: true },
                    { text: 'Социальные сети', isCorrect: false },
                    { text: 'Интерактивные доски', isCorrect: true }
                  ]
                },
                {
                  question: 'Какой подход к преподаванию математики является наиболее современным?',
                  type: 'MULTIPLE_CHOICE',
                  options: [
                    { text: 'Только лекции', isCorrect: false },
                    { text: 'Практико-ориентированный подход', isCorrect: true },
                    { text: 'Только тесты', isCorrect: false },
                    { text: 'Самостоятельное изучение', isCorrect: false }
                  ]
                }
              ]
            }
          ]
        }
      ];

      // Create courses
      for (const courseData of coursesData) {
        console.log(`📚 Creating course: ${courseData.title}`);
        
        // Create course
        const course = this.courseRepository.create({
          id: courseData.id,
          title: courseData.title,
          description: courseData.description,
          duration: courseData.duration,
          category: courseData.category,
          thumbnailUrl: courseData.thumbnailUrl,
          isPublished: courseData.isPublished,
        });
        
        const savedCourse = await this.courseRepository.save(course);
        console.log(`✅ Course created with ID: ${savedCourse.id}`);

        // Create chapters
        for (const chapterData of courseData.chapters) {
          console.log(`📖 Creating chapter: ${chapterData.title}`);
          
          const chapter = this.chapterRepository.create({
            ...chapterData,
            course: savedCourse,
          });
          
          await this.chapterRepository.save(chapter);
        }

        // Create assignments
        for (const assignmentData of courseData.assignments) {
          console.log(`📝 Creating assignment: ${assignmentData.title}`);
          
          const assignment = this.assignmentRepository.create({
            ...assignmentData,
            course: savedCourse,
          });
          
          await this.assignmentRepository.save(assignment);
        }

        // Create quizzes
        for (const quizData of courseData.quizzes) {
          console.log(`🧠 Creating quiz: ${quizData.title}`);
          
          const quiz = this.quizRepository.create({
            title: quizData.title,
            description: quizData.description,
            course: savedCourse,
          });
          
          const savedQuiz = await this.quizRepository.save(quiz);

          // Create questions
          for (const questionData of quizData.questions) {
            console.log(`❓ Creating question: ${questionData.question}`);
            
                         const question = this.quizQuestionRepository.create({
               question: questionData.question,
               type: questionData.type as 'MULTIPLE_CHOICE' | 'TRUE_FALSE',
               quiz: savedQuiz,
             });
            
            const savedQuestion = await this.quizQuestionRepository.save(question);

            // Create options
            for (const optionData of questionData.options) {
              const option = this.quizOptionRepository.create({
                text: optionData.text,
                isCorrect: optionData.isCorrect,
                question: savedQuestion,
              });
              
              await this.quizOptionRepository.save(option);
            }
          }
        }

        console.log(`✅ Course "${courseData.title}" completed successfully!`);
      }

      console.log('🎉 Database seeding completed successfully!');
      console.log('\n📋 Summary:');
      console.log(`- Created ${coursesData.length} courses`);
      console.log(`- Created ${coursesData.reduce((sum, c) => sum + c.chapters.length, 0)} chapters`);
      console.log(`- Created ${coursesData.reduce((sum, c) => sum + c.assignments.length, 0)} assignments`);
      console.log(`- Created ${coursesData.reduce((sum, c) => sum + c.quizzes.length, 0)} quizzes`);

    } catch (error) {
      console.error('❌ Error during seeding:', error);
      throw error;
    }
  }
} 
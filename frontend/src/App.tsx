import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Layout from './components/Layout';
import Homepage from './pages/Homepage';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Courses from './pages/Courses';
import CourseDetail from './pages/CourseDetail';
import ChapterViewer from './pages/ChapterViewer';
import QuizTaker from './pages/QuizTaker';
import AssignmentSubmission from './pages/AssignmentSubmission';
import Profile from './pages/Profile';
import AdminDashboard from './pages/AdminDashboard';
import AdminCourseManagement from './pages/AdminCourseManagement';
import AdminCourseDetail from './pages/AdminCourseDetail';
import AdminCourseAccess from './pages/AdminCourseAccess';
import AdminUserManagement from './pages/AdminUserManagement';
import EmailVerification from './pages/EmailVerification';
import LoadingSpinner from './components/LoadingSpinner';
import MySubmissions from './pages/MySubmissions';

const PrivateRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return <LoadingSpinner />;
  }

  return isAuthenticated ? <>{children}</> : <Navigate to="/login" />;
};

const AdminRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <LoadingSpinner />;
  }

  return user?.role === 'ADMIN' ? <>{children}</> : <Navigate to="/dashboard" />;
};

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <Routes>
            {/* Public routes */}
            <Route path="/" element={<Homepage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/verify-email" element={<EmailVerification />} />
            
            {/* Protected routes */}
            <Route
              path="/dashboard"
              element={
                <PrivateRoute>
                  <Layout>
                    <Dashboard />
                  </Layout>
                </PrivateRoute>
              }
            />
            <Route
              path="/courses"
              element={
                <PrivateRoute>
                  <Layout>
                    <Courses />
                  </Layout>
                </PrivateRoute>
              }
            />
            <Route
              path="/courses/:id"
              element={
                <PrivateRoute>
                  <Layout>
                    <CourseDetail />
                  </Layout>
                </PrivateRoute>
              }
            />
            <Route
              path="/courses/:courseId/chapters/:chapterId"
              element={
                <PrivateRoute>
                  <Layout>
                    <ChapterViewer />
                  </Layout>
                </PrivateRoute>
              }
            />
            <Route
              path="/courses/:courseId/quizzes/:quizId"
              element={
                <PrivateRoute>
                  <Layout>
                    <QuizTaker />
                  </Layout>
                </PrivateRoute>
              }
            />
            <Route
              path="/courses/:courseId/assignments/:assignmentId"
              element={
                <PrivateRoute>
                  <Layout>
                    <AssignmentSubmission />
                  </Layout>
                </PrivateRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <PrivateRoute>
                  <Layout>
                    <Profile />
                  </Layout>
                </PrivateRoute>
              }
            />
            <Route
              path="/admin"
              element={
                <AdminRoute>
                  <Layout>
                    <AdminDashboard />
                  </Layout>
                </AdminRoute>
              }
            />
            <Route
              path="/admin/courses"
              element={
                <AdminRoute>
                  <Layout>
                    <AdminCourseManagement />
                  </Layout>
                </AdminRoute>
              }
            />
            <Route
              path="/admin/courses/:id"
              element={
                <AdminRoute>
                  <Layout>
                    <AdminCourseDetail />
                  </Layout>
                </AdminRoute>
              }
            />
            <Route
              path="/admin/course-access"
              element={
                <AdminRoute>
                  <Layout>
                    <AdminCourseAccess />
                  </Layout>
                </AdminRoute>
              }
            />
            <Route
              path="/admin/users"
              element={
                <AdminRoute>
                  <Layout>
                    <AdminUserManagement />
                  </Layout>
                </AdminRoute>
              }
            />
            <Route
              path="/my-submissions"
              element={
                <PrivateRoute>
                  <Layout>
                    <MySubmissions />
                  </Layout>
                </PrivateRoute>
              }
            />
            
            {/* Catch-all route - redirect to homepage */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;

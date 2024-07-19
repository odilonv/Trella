import React from 'react';
import './assets/css/App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { FooterComponent, HeaderComponent } from './components';
import {
  HomePage,
  LoginPage,
  NotFoundPage,
  SettingsPage,
  SignUpPage,
  UserPage,
  VerifyEmailPage,
  BoardPage,
  BoardListPage,
  BoardCreationPage,
  CardCreationPage,
  CardListPage
} from './pages';
import { NotificationProvider, UserProvider } from './contexts';

function App() {
  return (
    <Router>
      <UserProvider>
        <HeaderComponent />
        <NotificationProvider>
          <Routes>
            <Route exact path="/" element={<HomePage />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/boards/:id" element={<BoardPage />} />
            <Route path="/boards/create" element={<BoardCreationPage />} />
            <Route path="/boards" element={<BoardListPage />} />
            <Route path="/boards/:id/cards" element={<CardListPage />} />
            <Route path="/boards/:id/cards/create" element={<CardCreationPage />} />
            <Route path="/logout" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/verifyEmail/:token" element={<VerifyEmailPage />} />
            <Route path="/signUp" element={<SignUpPage />} />
            <Route path="/settings" element={<SettingsPage />} />
            <Route path="/user" element={<UserPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </NotificationProvider>
        <FooterComponent />
      </UserProvider>
    </Router>
  );
}

export default App;

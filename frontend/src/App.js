import React from 'react';
import './assets/css/App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { FooterComponent, HeaderComponent } from './components';
import {
  BetsPage,
  ChangePasswordPage,
  ForgotPasswordPage,
  GameListPage,
  HomePage,
  LoginPage,
  MatchesPage,
  MatchPage,
  NotFoundPage,
  SettingsPage,
  SignUpPage,
  TeamListPage,
  TeamPage,
  TournamentsPage,
  UserPage,
  VerifyEmailPage,
  AboutPage,
  TermsOfUsePage
} from './pages';
import { CartProvider, NotificationProvider, UserProvider } from './contexts';

function App() {
  return (
    <Router>
      <UserProvider>
        <HeaderComponent />
        <CartProvider>
          <NotificationProvider>
            <Routes>
              <Route exact path="/" element={<HomePage />} />
              <Route path="/home" element={<HomePage />} />
              <Route path="/a-propos" element={<AboutPage />} />
              <Route path="/conditions" element={<TermsOfUsePage />} />
              <Route path="/logout" element={<HomePage />} />
              <Route path="/matches" element={<MatchesPage />} />
              <Route path="/match/:matchId" element={<MatchPage />} />
              <Route path="/games" element={<GameListPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/verifyEmail/:token" element={<VerifyEmailPage />} />
              <Route path="/signUp" element={<SignUpPage />} />
              <Route path="/settings" element={<SettingsPage />} />
              <Route path="/tournaments" element={<TournamentsPage />} />
              <Route path="/user" element={<UserPage />} />
              <Route path="/forgotPassword" element={<ForgotPasswordPage />} />
              <Route path="/changePassword" element={<ChangePasswordPage />} />
              <Route path="/bets" element={<BetsPage />} />
              <Route path="/team/:teamId" element={<TeamPage />} />
              <Route path="/teams" element={<TeamListPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </NotificationProvider>
        </CartProvider>
        <FooterComponent />
      </UserProvider>
    </Router>
  );
}

export default App;

import React from "react";
import { Navigate, Route, Routes } from "react-router";
import HomePage from "./pages/HomePage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import SignupPage from "./pages/SignUpPage.jsx";
import NotificationPage from "./pages/NotificationPage.jsx";
import ChatPage from "./pages/ChatPage.jsx";
import CallPage from "./pages/CallPage.jsx";
import { Toaster } from "react-hot-toast";

import PageLoader from "./components/PageLoader.jsx";

import useAuthUser from "./hooks/useAuthUser.js";
import OnboardingPage from "./pages/OnBoardingPage.jsx";
import Layout from "./components/Layout.jsx";

const App = () => {
  const { isLoading, authUser, isError } = useAuthUser();

  const isAuthenticated = Boolean(authUser);
  const isOnboarded = authUser?.isOnboarded;

  // If there's an error (like 401), user is not authenticated
  if (isLoading) return <PageLoader />;
  console.log("Auth user:", authUser);

  return (
    <div className="h-screen" data-theme="dim">
      <Routes>
        {/* Home Page */}
        <Route
          path="/"
          element={
            isAuthenticated && isOnboarded ? (
              <Layout showSidebar={true}>
                <HomePage />
              </Layout>
            ) : (
              <Navigate to={!isAuthenticated ? "/login" : "/onboarding"} />
            )
          }
        />

        {/* Sign Up Page */}
        <Route
          path="/signup"
          element={
            !isAuthenticated ? (
              <SignupPage />
            ) : (
              <Navigate to={isOnboarded ? "/" : "/onboarding"} />
            )
          }
        />

        {/* Login Page */}
        <Route
          path="/login"
          element={
            !isAuthenticated ? (
              <LoginPage />
            ) : (
              <Navigate to={isOnboarded ? "/" : "/onboarding"} />
            )
          }
        />

        {/* Notification Page */}
        <Route
          path="/notifications"
          element={
            isAuthenticated && isOnboarded ? (
              <NotificationPage />
            ) : (
              <Navigate to={!isAuthenticated ? "/login" : "/onboarding"} />
            )
          }
        />

        {/* Chat Page (with sidebar hidden) */}
        <Route
          path="/chat/:id"
          element={
            isAuthenticated && isOnboarded ? (
              <ChatPage />
            ) : (
              <Navigate to={!isAuthenticated ? "/login" : "/onboarding"} />
            )
          }
        />

        {/* Call Page (full screen, no layout) */}
        <Route
          path="/call/:id"
          element={
            isAuthenticated && isOnboarded ? (
              <CallPage />
            ) : (
              <Navigate to={!isAuthenticated ? "/login" : "/onboarding"} />
            )
          }
        />

        {/* Onboarding Page */}
        <Route
          path="/onboarding"
          element={
            isAuthenticated ? (
              !isOnboarded ? (
                <OnboardingPage />
              ) : (
                <Navigate to="/" />
              )
            ) : (
              <Navigate to="/login" />
            )
          }
        />
      </Routes>

      <Toaster />
    </div>
  );
};

export default App;

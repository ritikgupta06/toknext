import React from "react";
import { Route, Routes } from "react-router";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import NotificationPage from "./pages/NotificationPage";
import OnBoardingPage from "./pages/OnBoardingPage";
import ChatPage from "./pages/ChatPage";
import CallPage from "./pages/CallPage";
import { Toaster } from "react-hot-toast";
const App = () => {
  return (
    <div className=" h-screen" data-theme="dim">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/notification" element={<NotificationPage />} />
        <Route path="/onboarding" element={<OnBoardingPage />} />
        <Route path="/chat" element={<ChatPage />} />
        <Route path="/call" element={<CallPage />} />
      </Routes>
      <Toaster />
    </div>
  );
};

export default App;

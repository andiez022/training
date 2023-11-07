import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React, { lazy, useState } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { PersistGate } from 'redux-persist/integration/react';

import { unAuthGuard } from './common/utils/routes';
import LoadingView from './components/Loading/LoadingModal';
import PrivateRoute from './components/Route/PrivateRoute';
import store, { persistor } from './store';

import Header from './views/header/Header';
import Footer from './components/Footer/Footer';
import { storage } from './common/utils/storage';

const HomeView = lazy(() => import('./views/home/HomeView'));
const IntroView = lazy(() => import('./views/intro/IntroView'));
const AnnView = lazy(() => import('./views/announcement/AnnView'));
const FacilityView = lazy(() => import('./views/facility/FacilityView'));
const ContentView = lazy(() => import('./views/contents/ContentView'));
const LabView = lazy(() => import('./views/lab/LabView'));
const CampaignView = lazy(() => import('./views/campaign/CampaignView'));
const BoardView = lazy(() => import('./views/board/BoardView'));
const LoginView = lazy(() => import('./views/authentication/LoginView'));
const RegisterView = lazy(() => import('./views/authentication/RegisterView'));
const UserManagementView = lazy(() => import('./views/user_management/UserManagementView'));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

const App: React.FC = () => {
  console.log('start');

  const isLoggedIn = storage.getToken() !== null;

  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <React.Suspense fallback={<LoadingView open />}>
            <BrowserRouter>
              <ToastContainer />
              <LoadingView />
              <div className="container">
                <Header isLoggedIn={isLoggedIn} />
                <Routes>
                  <Route path="/login" element={<PrivateRoute guards={[unAuthGuard]} element={<LoginView />} />} />
                  <Route path="/register" element={<PrivateRoute guards={[unAuthGuard]} element={<RegisterView />} />} />
                  <Route path="/" element={<PrivateRoute guards={[]} element={<HomeView />} />} />
                  <Route path="/intro" element={<PrivateRoute guards={[]} element={<IntroView />} />} />
                  <Route path="/announcement" element={<PrivateRoute guards={[]} element={<AnnView isLoggedIn={isLoggedIn} />} />} />
                  <Route
                    path="/announcement/:contentType"
                    element={<PrivateRoute guards={[]} element={<AnnView isLoggedIn={isLoggedIn} />} />}
                  />
                  <Route
                    path="/announcement/edit/:contentType"
                    element={<PrivateRoute guards={[]} element={<AnnView isLoggedIn={isLoggedIn} />} />}
                  />
                  <Route path="/facility" element={<PrivateRoute guards={[]} element={<FacilityView isLoggedIn={isLoggedIn} />} />} />
                  <Route path="/content" element={<PrivateRoute guards={[]} element={<ContentView isLoggedIn={isLoggedIn} />} />} />
                  <Route
                    path="/content/:contentType"
                    element={<PrivateRoute guards={[]} element={<ContentView isLoggedIn={isLoggedIn} />} />}
                  />
                  <Route
                    path="/content/edit/:contentType"
                    element={<PrivateRoute guards={[]} element={<ContentView isLoggedIn={isLoggedIn} />} />}
                  />
                  <Route path="/lab" element={<PrivateRoute guards={[]} element={<LabView isLoggedIn={isLoggedIn} />} />} />
                  <Route path="/lab/:contentType" element={<PrivateRoute guards={[]} element={<LabView isLoggedIn={isLoggedIn} />} />} />
                  <Route
                    path="/lab/edit/:contentType"
                    element={<PrivateRoute guards={[]} element={<LabView isLoggedIn={isLoggedIn} />} />}
                  />
                  <Route
                    path="/user-management"
                    element={<PrivateRoute guards={[]} element={<UserManagementView isLoggedIn={isLoggedIn} />} />}
                  />
                  <Route path="/campaign" element={<PrivateRoute guards={[]} element={<CampaignView isLoggedIn={isLoggedIn} />} />} />
                  <Route
                    path="/campaign/:contentType"
                    element={<PrivateRoute guards={[]} element={<CampaignView isLoggedIn={isLoggedIn} />} />}
                  />
                  <Route
                    path="/campaign/edit/:contentType"
                    element={<PrivateRoute guards={[]} element={<CampaignView isLoggedIn={isLoggedIn} />} />}
                  />
                  <Route path="/board" element={<PrivateRoute guards={[]} element={<BoardView isLoggedIn={isLoggedIn} />} />} />
                  <Route
                    path="/board/:contentType"
                    element={<PrivateRoute guards={[]} element={<BoardView isLoggedIn={isLoggedIn} />} />}
                  />
                  <Route
                    path="/board/edit/:contentType"
                    element={<PrivateRoute guards={[]} element={<BoardView isLoggedIn={isLoggedIn} />} />}
                  />
                </Routes>
                <Footer />
              </div>
            </BrowserRouter>
          </React.Suspense>
        </PersistGate>
      </Provider>
    </QueryClientProvider>
  );
};

export default App;

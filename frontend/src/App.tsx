import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React, { lazy } from 'react';
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
import ItemDetail from './components/ImageGallery/ItemDetail';

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

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

const App: React.FC = () => {
  console.log('start');

  const userRole = 'admin';

  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <React.Suspense fallback={<LoadingView open />}>
            <BrowserRouter>
              <ToastContainer />
              <LoadingView />
              <div className="container">
                <Header userRole={userRole} />
                <Routes>
                  <Route path="/login" element={<PrivateRoute guards={[unAuthGuard]} element={<LoginView />} />} />
                  <Route path="/register" element={<PrivateRoute guards={[]} element={<RegisterView />} />} />
                  <Route path="/" element={<PrivateRoute guards={[]} element={<HomeView />} />} />
                  <Route path="/intro" element={<PrivateRoute guards={[]} element={<IntroView />} />} />
                  <Route path="/announcement" element={<PrivateRoute guards={[]} element={<AnnView userRole={userRole} />} />} />
                  <Route path="/facility" element={<PrivateRoute guards={[]} element={<FacilityView userRole={userRole} />} />} />
                  <Route path="/content" element={<PrivateRoute guards={[]} element={<ContentView userRole={userRole} />} />} />
                  <Route path="/lab" element={<PrivateRoute guards={[]} element={<LabView userRole={userRole} />} />} />
                  <Route path="/campaign" element={<PrivateRoute guards={[]} element={<CampaignView userRole={userRole} />} />} />
                  <Route path="/campaign/:id" element={<PrivateRoute guards={[]} element={<CampaignView userRole={userRole} />} />} />
                  <Route path="/board" element={<PrivateRoute guards={[]} element={<BoardView userRole={userRole} />} />} />
                  <Route path="/board/:contentType" element={<PrivateRoute guards={[]} element={<BoardView userRole={userRole} />} />} />
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

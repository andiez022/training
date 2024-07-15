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

const HomeView = lazy(() => import('./views/home/HomeView'));
const IntroductionView = lazy(() => import('./views/introduction/Introduction'));
const AnnouncementView = lazy(() => import('./views/announcement/Announcement'));
const FacilityView = lazy(() => import('./views/facility/Facility'));
const ContentView = lazy(() => import('./views/content/Content'));
const LabView = lazy(() => import('./views/lab/Lab'));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

const App: React.FC = () => {
  console.log('start');
  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <React.Suspense fallback={<LoadingView open />}>
            <BrowserRouter>
              <ToastContainer />
              <LoadingView />
              <div className="container">
                <Routes>
                  <Route path="/login" element={<PrivateRoute guards={[unAuthGuard]} element={<div>login</div>} />} />
                  <Route path="/" element={<PrivateRoute guards={[]} element={<HomeView />} />} />
                  <Route path="/introduction" element={<PrivateRoute guards={[]} element={<IntroductionView />} />} />
                  <Route path="/announcement" element={<PrivateRoute guards={[]} element={<AnnouncementView />} />} />
                  <Route path="/facility" element={<PrivateRoute guards={[]} element={<FacilityView />} />} />
                  <Route path="/content" element={<PrivateRoute guards={[]} element={<ContentView />} />} />
                  <Route path="/living-lab" element={<PrivateRoute guards={[]} element={<LabView />} />} />
                </Routes>
              </div>
            </BrowserRouter>
          </React.Suspense>
        </PersistGate>
      </Provider>
    </QueryClientProvider>
  );
};

export default App;

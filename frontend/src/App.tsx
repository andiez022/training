import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React, { lazy, useEffect } from 'react';
import { Provider } from 'react-redux';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { PersistGate } from 'redux-persist/integration/react';
import { unAuthGuard } from './common/utils/routes';
import LoadingView from './components/Loading/LoadingModal';
import PrivateRoute from './components/Route/PrivateRoute';
import store, { persistor } from './store';

const HomeView = lazy(() => import('./views/home/HomeView'));
const IntroductionView = lazy(() => import('./views/introduction/IntroductionView'));
const AnnouncementView = lazy(() => import('./views/announcement/AnnouncementView'));
const AnnouncementItem = lazy(() => import('./views/announcement/AnnouncementItem'));
const AnnouncementCreate = lazy(() => import('./views/announcement/AnnCreate'));
const AnnouncementEdit = lazy(() => import('./views/announcement/AnnEdit'));
const FacilityView = lazy(() => import('./views/facility/FacilityView'));
const ContentView = lazy(() => import('./views/content/ContentView'));
const ContentEdit = lazy(() => import('./views/content/ContentEdit'));
const ContentCreate = lazy(() => import('./views/content/ContentCreate'));
const LabView = lazy(() => import('./views/lab/LabView'));
const LabItem = lazy(() => import('./views/lab/LabItem'));
const LabCreate = lazy(() => import('./views/lab/LabCreate'));
const LabEdit = lazy(() => import('./views/lab/LabEdit'));
const CampainView = lazy(() => import('./views/campain/CampainView'));
const CampainCreate = lazy(() => import('./views/campain/CampainCreate'));
const CampainItem = lazy(() => import('./views/campain/CampainItem'));
const CampainEdit = lazy(() => import('./views/campain/CampainEdit'));
const FreeBoardView = lazy(() => import('./views/freeboard/FreeBoardView'));
const BoardItem = lazy(() => import('./views/freeboard/BoardItem'));
const BoardCreate = lazy(() => import('./views/freeboard/BoardCreate'));
const BoardEdit = lazy(() => import('./views/freeboard/BoardEdit'));
const LoginView = lazy(() => import('./views/login/LoginView'));
const RegisterView = lazy(() => import('./views/register/RegisterView'));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

const App: React.FC = () => {
  useEffect(() => {
    AOS.init({ duration: 1000, easing: 'ease-out' });
    AOS.refresh();
  }, []);
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
                  <Route path="/login" element={<PrivateRoute guards={[unAuthGuard]} element={<LoginView />} />} />
                  <Route path="/register" element={<PrivateRoute guards={[unAuthGuard]} element={<RegisterView />} />} />
                  <Route path="/" element={<PrivateRoute guards={[]} element={<HomeView />} />} />
                  <Route path="/introduction" element={<PrivateRoute guards={[]} element={<IntroductionView />} />} />
                  <Route path="/announcement" element={<PrivateRoute guards={[]} element={<AnnouncementView />} />} />
                  <Route path="/announcement/create" element={<PrivateRoute guards={[]} element={<AnnouncementCreate />} />} />
                  <Route path="/announcement/edit/:id" element={<PrivateRoute guards={[]} element={<AnnouncementEdit />} />} />
                  <Route path="/announcement/:id" element={<PrivateRoute guards={[]} element={<AnnouncementItem />} />} />
                  <Route path="/facility" element={<PrivateRoute guards={[]} element={<FacilityView />} />} />
                  <Route path="/content" element={<PrivateRoute guards={[]} element={<ContentView />} />} />
                  <Route path="/content/create" element={<PrivateRoute guards={[]} element={<ContentCreate />} />} />
                  <Route path="/content/edit/:id" element={<PrivateRoute guards={[]} element={<ContentEdit />} />} />
                  <Route path="/living-lab" element={<PrivateRoute guards={[]} element={<LabView />} />} />
                  <Route path="/living-lab/create" element={<PrivateRoute guards={[]} element={<LabCreate />} />} />
                  <Route path="/living-lab/:id" element={<PrivateRoute guards={[]} element={<LabItem />} />} />
                  <Route path="/living-lab/edit/:id" element={<PrivateRoute guards={[]} element={<LabEdit />} />} />
                  <Route path="/campain" element={<PrivateRoute guards={[]} element={<CampainView />} />} />
                  <Route path="/campain/create" element={<PrivateRoute guards={[]} element={<CampainCreate />} />} />
                  <Route path="/campain/:id" element={<PrivateRoute guards={[]} element={<CampainItem />} />} />
                  <Route path="/campain/edit/:id" element={<PrivateRoute guards={[]} element={<CampainEdit />} />} />
                  <Route path="/free-board" element={<PrivateRoute guards={[]} element={<FreeBoardView />} />} />
                  <Route path="/free-board/:id" element={<PrivateRoute guards={[]} element={<BoardItem />} />} />
                  <Route path="/free-board/edit/:id" element={<PrivateRoute guards={[]} element={<BoardEdit />} />} />
                  <Route path="/free-board/create" element={<PrivateRoute guards={[]} element={<BoardCreate />} />} />
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

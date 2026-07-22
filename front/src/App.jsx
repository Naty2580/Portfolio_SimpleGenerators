import React, { Suspense } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import BentoHome from './pages/BentoHome';

// Lazy loaded feature modules
const PasswordGen = React.lazy(() => import('./modules/PasswordGenerator'));
const QRCodeGen = React.lazy(() => import('./modules/QRCodeGenerator'));
const RandomUserGen = React.lazy(() => import('./modules/RandomUserGenerator'));
const JokeGenerator = React.lazy(() => import('./modules/JokeGenerator'));
const ProfileCardGenerator = React.lazy(() => import('./modules/ProfileCardGenerator'));

const PageTransition = ({ children }) => {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
        animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        exit={{ opacity: 0, y: -20, filter: 'blur(10px)' }}
        transition={{ duration: 0.4, type: 'spring', bounce: 0 }}
        className="min-h-screen p-4 md:p-10 lg:p-[80px]"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

const SkeletonLoader = () => (
  <div className="w-full h-[60vh] glass-panel rounded-3xl animate-pulse flex items-center justify-center">
    <div className="w-16 h-16 border-4 border-accent border-t-transparent rounded-full animate-spin" />
  </div>
);

export default function App() {
  return (
    <BrowserRouter>
      <div className="fixed inset-0 pointer-events-none bg-[url('/noise.png')] opacity-[0.03] z-50" />
      <Routes>
        <Route path="/" element={<PageTransition><BentoHome /></PageTransition>} />
        <Route path="/password" element={<PageTransition><Suspense fallback={<SkeletonLoader />}><PasswordGen /></Suspense></PageTransition>} />
        <Route path="/qrcode" element={<PageTransition><Suspense fallback={<SkeletonLoader />}><QRCodeGen /></Suspense></PageTransition>} />
        <Route path="/random-user" element={<PageTransition><Suspense fallback={<SkeletonLoader />}><RandomUserGen /></Suspense></PageTransition>} />
        <Route path="/joke" element={<PageTransition><Suspense fallback={<SkeletonLoader />}><JokeGenerator /></Suspense></PageTransition>} />
        <Route path="/profile-card" element={<PageTransition><Suspense fallback={<SkeletonLoader />}><ProfileCardGenerator /></Suspense></PageTransition>} />
      </Routes>
    </BrowserRouter>
  );
}
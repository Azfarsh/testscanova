import { Route, Switch } from "wouter";
import { Toaster } from "@/components/ui/toaster";
import { lazy, Suspense } from "react";
import Layout from "./components/Layout";
import HomePage from "./pages/HomePage";
import NotFound from "./pages/not-found";
import { motion, AnimatePresence } from "framer-motion";

// Lazy-loaded pages
const Dashboard = lazy(() => import("./pages/Dashboard"));
const DoctorsPage = lazy(() => import("./pages/DoctorsPage"));
const ServicesPage = lazy(() => import("./pages/ServicesPage"));
const MedicalRecordsPage = lazy(() => import("./pages/MedicalRecordsPage"));
const AssistantPage = lazy(() => import("./pages/AssistantPage"));
const VocalAnalysisPage = lazy(() => import("./pages/VocalAnalysisPage"));
const GovernmentSchemes = lazy(() => import("./pages/GovernmentSchemes"));
const ParkinsonRecorder = lazy(() => import("./pages/ParkinsonRecorder"));



function App() {
  const pageVariants = {
    initial: { opacity: 0, y: 20 },
    animate: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeInOut" }
    },
    exit: {
      opacity: 0,
      y: -20,
      transition: { duration: 0.3 }
    }
  };

  return (
    <>
      <Layout>
        <AnimatePresence mode="wait">
          <Suspense
            fallback={
              <div className="flex items-center justify-center min-h-[calc(100vh-64px)]">
                <div className="flex space-x-2">
                  {[...Array(5)].map((_, i) => (
                    <div
                      key={i}
                      className="w-1 h-10 bg-cyan-500 rounded-full animate-pulse"
                      style={{ animationDelay: `${i * 0.1}s` }}
                    ></div>
                  ))}
                </div>
              </div>
            }
          >
            <Switch>
              <Route path="/">
                {() => (
                  <motion.div initial="initial" animate="animate" exit="exit" variants={pageVariants}>
                    <HomePage />
                  </motion.div>
                )}
              </Route>

              <Route path="/dashboard">
                {() => (
                  <motion.div initial="initial" animate="animate" exit="exit" variants={pageVariants}>
                    <Dashboard />
                  </motion.div>
                )}
              </Route>

              <Route path="/doctors">
                {() => (
                  <motion.div initial="initial" animate="animate" exit="exit" variants={pageVariants}>
                    <DoctorsPage />
                  </motion.div>
                )}
              </Route>

              <Route path="/services">
                {() => (
                  <motion.div initial="initial" animate="animate" exit="exit" variants={pageVariants}>
                    <ServicesPage />
                  </motion.div>
                )}
              </Route>

              <Route path="/records">
                {() => (
                  <motion.div initial="initial" animate="animate" exit="exit" variants={pageVariants}>
                    <MedicalRecordsPage />
                  </motion.div>
                )}
              </Route>

              <Route path="/assistant">
                {() => (
                  <motion.div initial="initial" animate="animate" exit="exit" variants={pageVariants}>
                    <AssistantPage />
                  </motion.div>
                )}
              </Route>

              <Route path="/services/voice-screening">
                {() => (
                  <motion.div initial="initial" animate="animate" exit="exit" variants={pageVariants}>
                    <VocalAnalysisPage />
                  </motion.div>
                )}
              </Route>

              {/* 👇 Parkinson Recorder Route */}
              <Route path="/parkinson-recorder">
                {() => (
                  <motion.div initial="initial" animate="animate" exit="exit" variants={pageVariants}>
                    <ParkinsonRecorder />
                  </motion.div>
                )}
              </Route>

              {/* 👇 Tuberculosis Page Route */}
             
         

              {/* 👇 Government Schemes Route */}
              <Route path="/schemes">
                {() => (
                  <motion.div initial="initial" animate="animate" exit="exit" variants={pageVariants}>
                    <GovernmentSchemes />
                  </motion.div>
                )}
              </Route>

              {/* Not Found */}
              <Route component={NotFound} />
            </Switch>
          </Suspense>
        </AnimatePresence>
      </Layout>
      <Toaster />
    </>
  );
}

export default App;

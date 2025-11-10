import { useState } from "react";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import { NotificationProvider } from "./contexts/NotificationContext";
import { WeatherProvider } from "./contexts/WeatherContext";
import { NewHeroSection } from "./components/NewHeroSection";
import { DirectorySection } from "./components/DirectorySection";
import { AuthSectionLanding } from "./components/AuthSectionLanding";
import { AboutSection } from "./components/AboutSection";
import { FeaturesSection } from "./components/FeaturesSection";
import { Footer } from "./components/Footer";
import { UMKMDetailPage } from "./components/UMKMDetailPage";
import { RoleSelectionPage } from "./components/auth/RoleSelectionPage";
import { DriverLoginPage } from "./components/auth/DriverLoginPage";
import { DriverRegisterPage } from "./components/auth/DriverRegisterPage";
import { UMKMLoginPage } from "./components/auth/UMKMLoginPage";
import { UMKMRegisterPage } from "./components/auth/UMKMRegisterPage";
import { UserLoginPage } from "./components/auth/UserLoginPage";
import { UserRegisterPage } from "./components/auth/UserRegisterPage";
import { UMKMOnboarding } from "./components/onboarding/UMKMOnboarding";
import { DriverOnboarding } from "./components/onboarding/DriverOnboarding";
import { DashboardWrapper } from "./components/dashboard/DashboardWrapper";
import { NotificationToast } from "./components/NotificationToast";
import { WeatherAnimation } from "./components/WeatherAnimation";
import { WeatherAlert } from "./components/WeatherAlert";
import { Toaster } from "./components/ui/sonner";

interface UMKMItem {
  id: number;
  name: string;
  category: string;
  address: string;
  image: string;
  description: string;
}

type AuthView = 
  | null 
  | 'role-selection'
  | 'driver-login' 
  | 'driver-register'
  | 'umkm-login'
  | 'umkm-register'
  | 'user-login'
  | 'user-register';

function AppContent() {
  const { user } = useAuth();
  const [selectedUMKM, setSelectedUMKM] = useState<UMKMItem | null>(null);
  const [authView, setAuthView] = useState<AuthView>(null);

  const handleSelectUMKM = (umkm: UMKMItem) => {
    setSelectedUMKM(umkm);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToDirectory = () => {
    setSelectedUMKM(null);
    setTimeout(() => {
      const element = document.getElementById('direktori');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  const handleRoleSelect = (role: 'user' | 'umkm' | 'driver') => {
    setAuthView('role-selection');
    setTimeout(() => {
      if (role === 'user') setAuthView('user-login');
      else if (role === 'umkm') setAuthView('umkm-login');
      else if (role === 'driver') setAuthView('driver-login');
    }, 100);
  };

  // Show onboarding if user is logged in but not onboarded
  if (user && !user.isOnboarded) {
    if (user.role === 'umkm') {
      return <UMKMOnboarding />;
    }
    if (user.role === 'driver') {
      return <DriverOnboarding />;
    }
  }

  // Show dashboard if user is logged in
  if (user) {
    return (
      <>
        <DashboardWrapper />
        <NotificationToast />
        <WeatherAnimation />
        <WeatherAlert />
      </>
    );
  }

  // Show auth pages
  if (authView === 'role-selection') {
    return (
      <RoleSelectionPage
        onSelectRole={(role) => {
          if (role === 'user') setAuthView('user-login');
          else if (role === 'umkm') setAuthView('umkm-login');
          else if (role === 'driver') setAuthView('driver-login');
        }}
        onClose={() => setAuthView(null)}
      />
    );
  }

  if (authView === 'driver-login') {
    return (
      <DriverLoginPage
        onSwitchToRegister={() => setAuthView('driver-register')}
        onBack={() => setAuthView('role-selection')}
      />
    );
  }

  if (authView === 'driver-register') {
    return (
      <DriverRegisterPage
        onSwitchToLogin={() => setAuthView('driver-login')}
        onBack={() => setAuthView('role-selection')}
      />
    );
  }

  if (authView === 'umkm-login') {
    return (
      <UMKMLoginPage
        onSwitchToRegister={() => setAuthView('umkm-register')}
        onBack={() => setAuthView('role-selection')}
      />
    );
  }

  if (authView === 'umkm-register') {
    return (
      <UMKMRegisterPage
        onSwitchToLogin={() => setAuthView('umkm-login')}
        onBack={() => setAuthView('role-selection')}
      />
    );
  }

  if (authView === 'user-login') {
    return (
      <UserLoginPage
        onSwitchToRegister={() => setAuthView('user-register')}
        onBack={() => setAuthView('role-selection')}
      />
    );
  }

  if (authView === 'user-register') {
    return (
      <UserRegisterPage
        onSwitchToLogin={() => setAuthView('user-login')}
        onBack={() => setAuthView('role-selection')}
      />
    );
  }

  // Show UMKM detail page if selected
  if (selectedUMKM) {
    return (
      <>
        <UMKMDetailPage umkm={selectedUMKM} onBack={handleBackToDirectory} />
        <Footer />
      </>
    );
  }

  // Show landing page
  return (
    <div className="min-h-screen">
      <NewHeroSection />
      <DirectorySection onSelectUMKM={handleSelectUMKM} />
      <AuthSectionLanding onRoleSelect={handleRoleSelect} />
      <AboutSection />
      <FeaturesSection />
      <Footer />
    </div>
  );
}



export default function App() {
  return (
    <AuthProvider>
      <NotificationProvider>
        <WeatherProvider>
          <AppContent />
          <Toaster />
        </WeatherProvider>
      </NotificationProvider>
    </AuthProvider>
  );
}

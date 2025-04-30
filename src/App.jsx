import Footer from './components/Footer.jsx';
import DopeyHeader from './components/DopeyHeader.jsx';
import NavigationTabsContainer from './components/NavigationTabs/NavigationTabsContainer.jsx';
import ActiveTabRender from './components/NavigationTabs/ActiveTabRender.jsx';
import { useEffect } from 'react';
import useStartupSeeding from '@hooks/loadStartupData'; // ✅ Import just the hook

function App() {
  // Set document title when component mounts
  useEffect(() => {
    document.title = "Dopeonomics Vite";
  }, []);

  useStartupSeeding();

  return (
    <div className="App flex flex-col min-h-screen">
      <DopeyHeader />
      <main className="flex-grow">
        <ActiveTabRender />
      </main>
      <Footer />
    </div>
  );
}

export default App;

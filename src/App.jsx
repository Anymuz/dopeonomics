import Header from '@features/layout/ui/Header';
import Footer from '@features/layout/ui/Footer';
import NavigationBar from '@features/layout/ui/NavigationBar';
import RenderSection from '@features/layout/ui/RenderSection';
import { useEffect } from 'react';
// Main App component
function App() {
  // Set document title when component mounts
  useEffect(() => {
    document.title = "Dopeonomics Vite";
  }, []);

  return (
    <div className="App flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <NavigationBar />
        <RenderSection />
      </main>
      <Footer />
    </div>
  );
}

export default App;

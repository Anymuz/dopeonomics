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
      <main className="flex-grow">
        <div className="bg-gradient-to-br from-gray-100 to-gray-50 min-h-screen flex justify-center items-start py-8">
          <div className="w-full max-w-5xl mx-auto p-4">
            <Header />
            <NavigationBar />
            <RenderSection />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default App;

import Footer from '@components/Footer.jsx';
import DopeyHeader from '@components/DopeyHeader.jsx';
import ApplicationContainer from '@components/ApplicationContainer.jsx';
import { useEffect } from 'react';

function App() {
  // Set document title when component mounts
  useEffect(() => {
    document.title = "Dopeonomics Vite";
  }, []);


  return (
    <div className="App flex flex-col min-h-screen">
      <DopeyHeader />
      <main className="flex-grow">
        <ApplicationContainer />
      </main>
      <Footer />
    </div>
  );
}

export default App;

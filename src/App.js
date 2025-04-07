import StrainCreator from './StrainCreator';
import Footer from './Footer';
import { useEffect } from 'react';

function App() {
  // Set document title when component mounts
  useEffect(() => {
    document.title = "Dopey";
  }, []);

  return (
    <div className="App flex flex-col min-h-screen">
      <main className="flex-grow">
        <StrainCreator />
      </main>
      <Footer />
    </div>
  );
}

export default App;
import React from 'react';

function App() {
  return (
    <div style={{ padding: '2rem' }}>
      <h1>Fustashon's Dopeonomics - Vite Rebuild by Anymuz</h1>
      <p>Welcome to the upgraded setup.
         Original design and concept by Fustashon, mirgation to vite implemented by Anymuz</p>
    </div>
  );
}

export default App;

/* 
  Original app.js code for reuse and reference:
  
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
*/
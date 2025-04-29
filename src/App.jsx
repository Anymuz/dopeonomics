//import StrainCreator from './components/StrainCreator.jsx';
import Footer from './components/Footer.jsx';
import DopeyHeader from './components/DopeyHeader.jsx'
import StrainCreator from './components/StrainCreator/StrainCreator.jsx';
import NavigationTabsContainer from  './components/NavigationTabs/NavigationTabsContainer.jsx';
import ActiveTabRender from './components/NavigationTabs/ActiveTabRender.jsx';
import { useEffect } from 'react';
import { useSeeds, useIngredients } from '@hooks';

function App() {
  // Set document title when component mounts
  useEffect(() => {
    document.title = "Dopeonomics Vite";
  }, []);

  const { setSeeds } = useSeeds();
  const { setIngredients } = useIngredients();

  useEffect(() => {
    setSeeds([
      { id: 1, name: 'Northern Lights', type: 'Indica' },
      { id: 2, name: 'Sour Diesel', type: 'Sativa' },
    ]);

    setIngredients([
      { id: 1, name: 'THC Crystal', effect: 'Potent' },
      { id: 2, name: 'CBD Oil', effect: 'Relaxing' },
    ]);
  }, []);

  return (
    <div className="App flex flex-col min-h-screen">
      <DopeyHeader />
      <main className="flex-grow">
        <ActiveTabRender  />
      </main>
      <Footer />
    </div>
  );
}




// function App() {
//   // Set document title when component mounts
//   useEffect(() => {
//     document.title = "Dopey";
//   }, []);

//   return (
//     <div className="App flex flex-col min-h-screen">
//       <main className="flex-grow">
//         <StrainCreator />
//       </main>
//       <Footer />
//     </div>
//   );
// }

export default App;
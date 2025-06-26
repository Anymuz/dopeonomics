import SettingsButton from '@features/layout/ui/SettingsButton';
import SettingsModal from '@features/layout/ui/SettingsModal';
import useSettingsModal from '@features/layout/Hooks/useSettingsModal';
import useDonateModal from '@features/layout/Hooks/useDonateModal';
import DonateButton from '@features/layout/ui/DonateButton';
import DonateModal from '@features/layout/ui/DonateModal';
import { FlaskConical, TrendingUp, DollarSign, BarChart, Settings, Heart, ExternalLink } from 'lucide-react';
export const Header = () => {
  const { 
    open: showDonateModal, 
    closeModal: closedonateModal, 
    openModal: openDonationModal 
  } = useDonateModal();

  const {
    open: showSettingsModal,
    confirm,
    err,
    closeModal: closeSettingsModal,
    exportData,
    importData,
    openModal: openSettingsModal,
    reset,
  } = useSettingsModal();

  // Handler for file input change
  const handleImport = (event) => {
    const file = event.target.files[0];
    importData(file);
    event.target.value = "";
  };

  return (
    <>
      <div className="w-full flex flex-col items-center py-6 relative">
        {/* Settings button (top right) */}
        <SettingsButton onClick={openSettingsModal} />
        
        {/* Donate button (top left) */}
        <DonateButton onClick={openDonationModal} />
        
        {/* Main Title with Gradient and Character */}
        <div className="flex items-center justify-center mb-2">
          <div className="relative mr-4">
            {/* Character image in a nice frame */}
            <div className="w-14 h-14 relative">
              {/* Your character image */}
              <div className="w-full h-full overflow-hidden rounded-full border-2 border-green-500 shadow-md">
                <img 
                  src="/images/dopey-character.png" 
                  alt="Dopey Character" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
          
          <h1 className="text-4xl font-extrabold text-center bg-gradient-to-r from-purple-600 via-green-500 to-blue-500 text-transparent bg-clip-text">
            Dopeonomics
          </h1>
        </div>
        
        {/* Decorative Line */}
        <div className="flex items-center w-full max-w-md mt-4">
          <div className="flex-grow h-0.5 bg-gradient-to-r from-purple-200 via-green-200 to-blue-200"></div>
          <div className="flex space-x-3 px-4">
            <FlaskConical className="w-5 h-5 text-purple-500" />
            <TrendingUp className="w-5 h-5 text-green-500" />
            <DollarSign className="w-5 h-5 text-blue-500" />
            <BarChart className="w-5 h-5 text-indigo-500" />
          </div>
          <div className="flex-grow h-0.5 bg-gradient-to-l from-purple-200 via-green-200 to-blue-200"></div>
        </div>
        
        {/* Tagline */}
        <div className="mt-2 text-sm text-gray-500 italic">
          Building empires, one strain at a time
        </div>
      </div>
      
      {/* Settings Modal */}
      {showSettingsModal && (
        <SettingsModal
          confirm={confirm}
          error={err}
          onClose={closeSettingsModal}
          onExport={exportData}
          onImport={handleImport}
          onReset={reset}
        />
      )}

      {/* Donate Modal */}
      {showDonateModal && ( <DonateModal onClose={closedonateModal} /> )}
    </>
  );
};

export default Header;
import React, { useState } from 'react';
import { FlaskConical, TrendingUp, DollarSign, BarChart, Settings, Heart, ExternalLink } from 'lucide-react';
import SettingsModal from './SettingsModal';

const DopeyHeader = () => {
  const [showSettings, setShowSettings] = useState(false);
  const [showDonateModal, setShowDonateModal] = useState(false);

  return (
    <>
      <div className="w-full flex flex-col items-center py-6 relative">
        {/* Settings button (top right) */}
        <button 
          onClick={() => setShowSettings(true)}
          className="absolute top-0 right-0 p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-colors"
          title="Game Settings"
        >
          <Settings className="w-5 h-5" />
        </button>
        
        {/* Donate button (top left) */}
        <button 
          onClick={() => setShowDonateModal(true)}
          className="absolute top-0 left-0 p-2 flex items-center bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-full shadow-md hover:from-pink-600 hover:to-purple-600 transition-colors"
          title="Support this project"
        >
          <Heart className="w-4 h-4 mr-1" fill="currentColor" />
          <span className="text-sm font-medium">Donate</span>
        </button>
        
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
      <SettingsModal 
        isOpen={showSettings} 
        onClose={() => setShowSettings(false)} 
      />

      {/* Donate Modal */}
      {showDonateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-800 flex items-center">
                <Heart className="mr-2 w-5 h-5 text-pink-500" fill="currentColor" />
                Support Dopeonomics
              </h2>
              <button
                onClick={() => setShowDonateModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <p className="text-gray-600 mb-4">
              If you're enjoying Dopeonomics and would like to support its continued development, 
              consider making a small donation. Your support helps keep the servers running and 
              enables new features and improvements!
            </p>

            <div className="space-y-4">
              <a 
                href="https://buymeacoffee.com/fustahsonlabs" 
                target="_blank" 
                rel="noopener noreferrer"
                className="block w-full py-3 bg-yellow-400 hover:bg-yellow-500 text-white rounded-md font-medium text-center flex items-center justify-center"
              >
                ☕ Buy me a coffee
                <ExternalLink className="w-4 h-4 ml-2" />
              </a>
            </div>

            <div className="mt-6 text-sm text-gray-500 text-center">
              Thank you for your support! ❤️
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DopeyHeader;
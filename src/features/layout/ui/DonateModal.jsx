import { Heart, ExternalLink } from 'lucide-react';

export default function DonateModal({ onClose }) { 
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-800 flex items-center">
            <Heart className="mr-2 w-5 h-5 text-pink-500" fill="currentColor" />
            Support Dopeonomics
          </h2>
          <button
            onClick={onClose} className="text-gray-500 hover:text-gray-700">
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
            className="w-full py-3 bg-yellow-400 hover:bg-yellow-500 text-white rounded-md font-medium text-center flex items-center justify-center"
          >
            ☕ Buy me a coffee <ExternalLink className="w-4 h-4 ml-2" />
          </a>
        </div>

        <div className="mt-6 text-sm text-gray-500 text-center">
          Thank you for your support! ❤️
        </div>
      </div>
    </div>
  );
};

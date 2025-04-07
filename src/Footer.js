// Footer.js
import React from 'react';
import { Info, Heart, Github } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-100 border-t border-gray-200 py-6 mt-8">
      <div className="max-w-5xl mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          {/* Disclaimer */}
          <div className="flex items-start gap-2 max-w-3xl">
            <Info className="w-5 h-5 text-gray-500 shrink-0 mt-0.5" />
            <p className="text-sm text-gray-600">
              <span className="font-medium text-gray-700">Disclaimer:</span> This is a fan-made tool created for use with the game "Schedule 1" and is not affiliated with the official game developers. This application is for entertainment purposes only and is not intended to promote or facilitate real drug production or distribution.
            </p>
          </div>
          
          {/* Creator Credit */}
          <div className="text-sm text-gray-600 flex items-center gap-2">
            <span>Created with</span>
            <Heart className="w-4 h-4 text-red-500" fill="currentColor" />
            <span>by</span>
            <span className="font-medium text-gray-700">Fustahson</span>
          </div>
        </div>
        
        {/* Copyright */}
        <div className="mt-4 text-center text-xs text-gray-500">
          &copy; {new Date().getFullYear()} Dopeonomics Fan Tool. All game-related content belongs to their respective owners.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
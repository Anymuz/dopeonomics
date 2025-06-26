import { Heart } from 'lucide-react';

export default function DonateButton({ onClick }) {
  return (
    <button
      onClick={onClick}
      className="absolute top-0 left-0 flex items-center p-2 text-white bg-gradient-to-r from-pink-500 to-purple-500 rounded-full shadow-md hover:from-pink-600 hover:to-purple-600"
      title="Support this project"
    >
      <Heart className="w-4 h-4 mr-1" fill="currentColor" />
      <span className="text-sm font-medium">Donate</span>
    </button> 
  );
};

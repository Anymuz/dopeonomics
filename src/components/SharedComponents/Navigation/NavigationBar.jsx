
import React from 'react';
import {
  FlaskConical,
  Sparkles,
  Leaf,
  Factory,
  Users,
  DollarSign,
  Package,
} from 'lucide-react'; // Adjust if you're using a different icon pack
import NavigationTab from '@components/SharedComponents/Navigation/NavigationTab';

export const NavigationBar = ({ activeTab, setActiveTab, tabList }) => {
  return (
    <div className="flex space-x-2 mb-4">
      {Object.entries(tabList).map(
        ([key, { label, icon: Icon }]) => (
          <NavigationTab
            key={key}
            tabKey={key}
            activeTab={activeTab}
            Icon={Icon}
            label={label}
            setActiveTab={setActiveTab}
          />
        ) 
      )}
    </div>
  )
};
export default NavigationBar;

          // <button
          //   key={key}
          //   className={`py-2 px-4 font-medium text-sm ${
          //     activeTab === key ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700' 
          //   }`}
          //   onClick={() => onTabChange(key)}
          // >
          //   <Icon className="inline-block mr-1 w-4 h-4" />
          //   {label}
          // </button>
// const tabList = {
//   'Creator': FlaskConical,
//   'Effect Builder': Sparkles,
//   'My Strains': Leaf,
//   'Production': Factory,
//   'Crew': Users,
//   'Sales': DollarSign,
//   'Supplies': Package,
// };
/*
const iconMap = {
  FlaskConical,
  Sparkles,
  Leaf,
  Factory,
  Users,
  DollarSign,
  Package,
};

function formatLabel(key) {
  return key
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

export default function TabbedNav({ activeTab, onTabChange }) {
  return (
    <div className="flex space-x-2 mb-4">
      {Object.entries(tabList).map(([key, IconComponent]) => {
        return (
          <button
            key={key}
            className={`py-2 px-4 font-medium text-sm ${
              activeTab === key
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => onTabChange(key)}
          >
            <IconComponent className="inline-block mr-1 w-4 h-4" />
            {formatLabel(key)}
          </button>
        );
      })}
    </div>
  );
}





*/





// src/components/NavigationTabs/NavigationTabs.jsx
// const NavigationTab = ({ activeTab, handleTabChange }) => {
//   return ( 
    
  






//    <div className="flex space-x-2 mb-4">
//       {tabs.map((tab) => ( 
//         <button
//           key={tab}
//           onClick={() => onTabChange(tab)}
//           className={`px-4 py-2 rounded-md font-semibold transition-all duration-150
//             ${tab === activeTab ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-800 hover:bg-gray-300'}`}
//         >
//           {tab}
//         </button>
//       ))}
//     </div>
//   );
// };
// export default NavigationTabs;

/*

// // {/* Main Navigation Tabs */
//     <div className="flex border-b border-gray-200 mb-6 overflow-x-auto">
//       {/* Creator */}
//       <button
//         className={`py-2 px-4 font-medium text-sm ${
//           activeTab === 'creator'
//             ? 'text-blue-600 border-b-2 border-blue-600'
//             : 'text-gray-500 hover:text-gray-700'
//         }`}
//         onClick={() => handleTabChange('creator')}
//       >        
//         <FlaskConical className="inline-block mr-1 w-4 h-4" />
//         Creator
//       </button>

//       <button
//         className={`py-2 px-4 font-medium text-sm ${
//           activeTab === 'effects'
//             ? 'text-purple-600 border-b-2 border-purple-600'
//             : 'text-gray-500 hover:text-gray-700'
//         }`}
//         onClick={() => handleTabChange('effects')}
//       >
//         <Beaker className="inline-block mr-1 w-4 h-4" />
//         Effect Builder
//       </button>
//       <button
//         className={`py-2 px-4 font-medium text-sm ${
//           activeTab === 'saved'
//             ? 'text-green-600 border-b-2 border-green-600'
//             : 'text-gray-500 hover:text-gray-700'
//         }`}
//         onClick={() => {
//           handleTabChange('saved');
//         }}
//       >
//         <Heart className="inline-block mr-1 w-4 h-4" />
//         My Strains
//       </button>
//       <button
//         className={`py-2 px-4 font-medium text-sm ${
//           activeTab === 'production'
//             ? 'text-indigo-600 border-b-2 border-indigo-600'
//             : 'text-gray-500 hover:text-gray-700'
//         }`}
//         onClick={() => handleTabChange('production')}
//       >
//         <Factory className="inline-block mr-1 w-4 h-4" />
//         Production
//       </button>
//       <button
//         className={`py-2 px-4 font-medium text-sm ${
//           activeTab === 'crew'
//             ? 'text-teal-600 border-b-2 border-teal-600'
//             : 'text-gray-500 hover:text-gray-700'
//         }`}
//         onClick={() => handleTabChange('crew')}
//       >
//         <Users className="inline-block mr-1 w-4 h-4" />
//         Crew
//       </button>
//       <button
//         className={`py-2 px-4 font-medium text-sm ${
//           activeTab === 'sales'
//             ? 'text-orange-600 border-b-2 border-orange-600'
//             : 'text-gray-500 hover:text-gray-700'
//         }`}
//         onClick={() => handleTabChange('sales')}
//       >
//         <BarChart2 className="inline-block mr-1 w-4 h-4" />
//         Sales
//       </button>
//       <button
//         className={`py-2 px-4 font-medium text-sm ${
//           activeTab === 'supply'
//             ? 'text-purple-600 border-b-2 border-purple-600'
//             : 'text-gray-500 hover:text-gray-700'
//         }`}
//         onClick={() => handleTabChange('supply')}
//       >
//         <Package className="inline-block mr-1 w-4 h-4" />
//         Supplies
//       </button>
//     </div>


// */
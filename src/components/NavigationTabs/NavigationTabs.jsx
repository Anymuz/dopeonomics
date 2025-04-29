// src/components/NavigationTabs/NavigationTabs.jsx
const NavigationTabs = ({ tabs, activeTab, onTabChange }) => {
  return (
    <div className="flex space-x-2 mb-4">
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => onTabChange(tab)}
          className={`px-4 py-2 rounded-md font-semibold transition-all duration-150
            ${tab === activeTab ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-800 hover:bg-gray-300'}`}
        >
          {tab}
        </button>
      ))}
    </div>
  );
};
export default NavigationTabs;
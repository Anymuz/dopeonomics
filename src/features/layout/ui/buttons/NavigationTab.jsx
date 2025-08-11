// NavigationTab component to render individual navigation tabs.
// It includes an icon, label, the colour, and click handler to set the active tab.

/* eslint-disable no-unused-vars */ // Mistakenly flags the Icon component prop being unused var
const NavigationTab = ({activeTab, color, Icon, label, setActiveTab, tabKey})  => {
	return (
		<button
			key={tabKey}
			className={`py-2 px-4 font-medium text-sm ${
				activeTab === tabKey ? color: 'text-gray-500 hover:text-gray-700' 
			}`}
			onClick={() => setActiveTab(tabKey)}
		>
			<Icon className="inline-block mr-1 w-4 h-4" />
			{label}
		</button>
	);
};
export default NavigationTab;



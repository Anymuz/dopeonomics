// Navigation Button Format
/*eslint-disable no-unused-vars*/
const NavigationTab = ({activeTab, Icon, label, setActiveTab, tabKey})  => {
	console.log(tabKey)
	return (
		
		<button
			key={tabKey}
			className={`py-2 px-4 font-medium text-sm ${
				activeTab === tabKey ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700' 
			}`}
			onClick={() => setActiveTab(tabKey)}
		>

			<Icon className="inline-block mr-1 w-4 h-4" />
			{label}
		</button>
	)
};    
export default NavigationTab        
          
          
          

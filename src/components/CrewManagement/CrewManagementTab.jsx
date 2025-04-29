// src/components/CrewManagement/CrewManagementTab.jsx
const CrewManagementTab = ({ crewMembers, dealers }) => {
    return (
      <div className="space-y-6">
        <h2 className="text-2xl font-bold">Crew Management</h2>
  
        <div>
          <h3 className="text-xl font-semibold mb-2">Crew Members</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {crewMembers.map((member) => (
              <div
                key={member.id}
                className="p-4 border-2 rounded-lg bg-white shadow-sm hover:border-green-400 transition-all duration-150"
              >
                <div className="font-bold">{member.name}</div>
                <div className="text-gray-600 text-sm">{member.role}</div>
              </div>
            ))}
          </div>
        </div>
  
        <div>
          <h3 className="text-xl font-semibold mb-2">Dealers</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {dealers.map((dealer) => (
              <div
                key={dealer.id}
                className="p-4 border-2 rounded-lg bg-white shadow-sm hover:border-yellow-400 transition-all duration-150"
              >
                <div className="font-bold">{dealer.name}</div>
                <div className="text-gray-600 text-sm">{dealer.region}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };
  
  export default CrewManagementTab;
// src/components/CrewManagement/tabs/CrewMembersTab.jsx
import { calculateDailyCost } from '@/utils/crewMetrics';
import PersonalSalesForm from '@components/SharedComponents/Forms/PersonalSalesForm.jsx'
import { Plus, Minus } from 'lucide-react';

const CrewMembersTab = ({addPersonalSale, adjustCrewCount, crew, crewCosts}) => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {Object.entries(crewCosts).map(([type, costs]) => (
          <div key={type} className="bg-white p-4 rounded-lg border border-gray-200">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-gray-800 capitalize">{type}s</h3>
              <div className="flex items-center space-x-1">
                <button
                  onClick={() => adjustCrewCount(type, -1)}
                  className="p-1 rounded-full bg-red-100 text-red-600 hover:bg-red-200"
                  disabled={crew[type] <= 0}
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="w-8 text-center font-medium">{crew[type]}</span>
                <button
                  onClick={() => adjustCrewCount(type, 1)}
                  className="p-1 rounded-full bg-green-100 text-green-600 hover:bg-green-200"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>
            <div className="space-y-2 text-sm text-gray-600">
              <div className="flex justify-between">
                <span>Initial Hiring Cost:</span>
                <span className="font-medium">${costs.initial}</span>
              </div>
              <div className="flex justify-between">
                <span>Daily Cost:</span>
                <span className="font-medium">${costs.daily}</span>
              </div>
              <div className="flex justify-between">
                <span>Current Daily Total:</span>
                <span className="font-medium">${costs.daily * crew[type]}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
        <h3 className="text-lg font-medium text-gray-800 mb-4">Crew Cost Summary</h3>
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span>Total Crew Members:</span>
            <span className="font-medium">
              {Object.values(crew).reduce((sum, count) => sum + count, 0)}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span>Daily Crew Cost:</span>
            <span className="font-medium text-red-600">${calculateDailyCost(crew)}</span>
          </div>
          <div className="flex justify-between items-center">
            <span>Weekly Crew Cost:</span>
            <span className="font-medium text-red-600">${calculateDailyCost(crew) * 7}</span>
          </div>
          <div className="flex justify-between items-center">
            <span>Monthly Crew Cost:</span>
            <span className="font-medium text-red-600">${calculateDailyCost(crew) * 30}</span>
          </div>
        </div>
      </div>

      <PersonalSalesForm addPersonalSale={addPersonalSale} />
    </div>
  );
};

export default CrewMembersTab;
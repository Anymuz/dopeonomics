// src/components/CrewManagement/CrewManagementContainer.jsx
import React, { useState } from 'react';
import CrewManagementTab from './CrewManagementTab';
import CrewOverviewTab from './tabs/CrewOverviewTab';
import CrewDealersTab from './tabs/CrewDealersTab';
import CrewMembersTab from './tabs/CrewMembersTab';
import CrewTransactionsTab from './tabs/CrewTransactionsTab';
import { useCrew } from '@/hooks'; // Custom hook interfacing store for crew data

const CrewManagementContainer = () => {
    const [activeTab, setActiveTab] = useState('overview');
    const {
        dealers,
        crewRoles,
        sales,
        efficiency,
        hireCrewMember,
        fireCrewMember,
        toggleDealerStatus,
        addSale,
    } = useCrew();

    const renderTab = () => {
        switch (activeTab) {
            case 'overview':
                return <CrewOverviewTab efficiency={efficiency} dealers={dealers} crewRoles={crewRoles} sales={sales} />;
            case 'dealers':
                return <CrewDealersTab dealers={dealers} toggleDealerStatus={toggleDealerStatus} />;
            case 'crew':
                return <CrewMembersTab crewRoles={crewRoles} hire={hireCrewMember} fire={fireCrewMember} />;
            case 'transactions':
                return <CrewTransactionsTab addSale={addSale} />;
            default:
                return null;
        };
    };

    return (
        <CrewManagementTab activeTab={activeTab} setActiveTab={setActiveTab}>
            {renderTab()}
        </CrewManagementTab>
    );
};

export default CrewManagementContainer;
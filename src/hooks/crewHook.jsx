// src/hooks/crewHook.jsx
import useGameStore from '@stores/GameStore';

const useCrew = () => {
    const {
        getCrewMembers, setCrewMembers, updateCrewMember, resetCrewMembers,
    } = useGameStore((state) => ({
        getCrewMembers: state.getCrewMembers,
        setCrewMembers: state.setCrewMembers,
        updateCrewMember: state.updateCrewMember,
        resetCrewMembers: state.resetCrewMembers,
    }));

    return {
        getCrewMembers,
        setCrewMembers,
        updateCrewMember,
        resetCrewMembers,
    };
};
export default useCrew;


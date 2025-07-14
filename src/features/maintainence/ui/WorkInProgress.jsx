// Fallback component to display when a section is under maintenance or not yet implemented

// Importing utility function to format labels to title case for better readability
import { formatTitle } from '@shared/utils/stringUtils';

const WorkInProgress = ({ label }) => {
  return (
    <div className="flex flex-col items-center justify-center h-64 text-gray-500">
      <h2 className="text-2xl font-semibold mb-2">Work In Progress</h2>
      <p>{label ? `${formatTitle(label)} section is not yet available.` : "This section is not yet available."}</p>
    </div>
  )
};
export default WorkInProgress;
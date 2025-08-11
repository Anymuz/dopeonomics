// Data for the navigation tabs in the application.
// Defines the structure and icons for each tab in the navigation bar.

// Importing necessary icons from lucide-react for UI representation.
// Used to visually represent each tab in the navigation bar.
import {
  FlaskConical,
  Beaker,
  Heart,
  Factory,
  Users,
  BarChart2,
  Package,
} from 'lucide-react';

export const tabList = {
  creator: { color: 'blue', tabColor: 'text-blue-600 border-b-2 border-blue-600', label: 'Creator', icon: FlaskConical },
  effectBuilder: { color: 'purple', tabColor: 'text-purple-600 border-b-2 border-purple-600', label: 'Effect Builder', icon: Beaker },
  myStrains: { color: 'green', tabColor: 'text-green-600 border-b-2 border-green-600', label: 'My Strains', icon: Heart },
  production: { color: 'indigo', tabColor: 'text-indigo-600 border-b-2 border-indigo-600', label: 'Production', icon: Factory },
  crew: { color: 'teal', tabColor: 'text-teal-600 border-b-2 border-teal-600', label: 'Crew', icon: Users },
  sales: { color: 'orange', tabColor: 'text-orange-600 border-b-2 border-orange-600', label: 'Sales', icon: BarChart2 },
  supplies: { color: 'purple', tabColor: 'text-purple-600 border-b-2 border-purple-600', label: 'Supplies', icon: Package },
};

// export const tabColours = {
//   creator: 'text-blue-600 border-blue-600',
//   effectBuilder: 'text-purple-600 border-purple-600',
//   green: 'text-green-600 border-green-600',
//   indigo: 'text-indigo-600 border-indigo-600',
//   teal: 'text-teal-600 border-teal-600',
//   orange: 'text-orange-600 border-orange-600',
// };

export default tabList;
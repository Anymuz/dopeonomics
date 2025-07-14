// Data for the navigation tabs in the application.
// Defines the structure and icons for each tab in the navigation bar.

// Importing necessary icons from lucide-react for UI representation.
// Used to visually represent each tab in the navigation bar.
import {
  FlaskConical,
  Sparkles,
  Leaf,
  Factory,
  Users,
  DollarSign,
  Package,
} from 'lucide-react';

export const tabList = {
  creator: { label: 'Creator', icon: FlaskConical },
  effectBuilder: { label: 'Effect Builder', icon: Sparkles },
  myStrains: { label: 'My Strains', icon: Leaf },
  production: { label: 'Production', icon: Factory },
  crew: { label: 'Crew', icon: Users },
  sales: { label: 'Sales', icon: DollarSign },
  supplies: { label: 'Supplies', icon: Package },
}; 
export default tabList;
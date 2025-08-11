# UI Components Documentation

A collection of reusable UI components for the Dopeonomics application. These components follow a consistent design system and eliminate CSS repetition across the application.

## Table of Contents

- [Alert](#alert)
- [Button](#button)
- [Input](#input)
- [Modal](#modal)
- [Search](#search)
- [TabContainer](#tabcontainer)
- [TabHeader](#tabheader)
- [Table](#table)

---

## Alert

Displays contextual messages with different severity levels and optional icons.

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `type` | `'success' \| 'warning' \| 'error' \| 'info'` | `'info'` | Alert type/severity |
| `icon` | `React.Component` | `undefined` | Optional icon component |
| `title` | `string` | `undefined` | Optional title text |
| `children` | `React.ReactNode` | `undefined` | Alert content |
| `className` | `string` | `''` | Additional CSS classes |

### Usage Examples

```jsx
import Alert from '../ui/Alert.jsx';
import { CheckCircle, AlertTriangle } from 'lucide-react';

// Basic info alert
<Alert type="info">
  This is an informational message.
</Alert>

// Success alert with icon and title
<Alert 
  type="success" 
  icon={CheckCircle} 
  title="Success!"
>
  Your strain has been saved successfully.
</Alert>

// Error alert
<Alert type="error" title="Error">
  Something went wrong. Please try again.
</Alert>

// Warning with custom styling
<Alert 
  type="warning" 
  icon={AlertTriangle}
  className="mb-4"
>
  Your inventory is running low.
</Alert>
```

---

## Button

A collection of button variants with consistent styling and behavior.

### Components

- `PrimaryButton` - Main action buttons
- `SecondaryButton` - Secondary actions
- `GrayButton` - Utility actions
- `IconButton` - Icon-only buttons

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `React.ReactNode` | - | Button content |
| `className` | `string` | `''` | Additional CSS classes |
| `icon` | `React.Component` | `undefined` | Icon component (IconButton only) |
| `title` | `string` | `undefined` | Tooltip text (IconButton only) |
| ...props | - | - | Standard button props |

**Note**: `IconButton` supports both icon-only and icon+text combinations via the `children` prop.

### Usage Examples

```jsx
import { PrimaryButton, SecondaryButton, GrayButton, IconButton } from '../ui/Button.jsx';
import { Save, Edit, Trash2 } from 'lucide-react';

// Primary action
<PrimaryButton onClick={handleSave}>
  Save Strain
</PrimaryButton>

// Secondary action
<SecondaryButton onClick={handleCancel}>
  Cancel
</SecondaryButton>

// Utility button
<GrayButton className="text-xs">
  Filter: All
</GrayButton>

// Icon button
<IconButton 
  icon={Edit} 
  title="Edit strain"
  onClick={handleEdit}
  className="text-blue-600 hover:text-blue-800"
/>

// Icon button with text
<IconButton 
  icon={Heart} 
  title="Support this project"
  onClick={handleDonate}
  className="flex items-center p-2 text-white bg-gradient-to-r from-pink-500 to-purple-500 rounded-full"
>
  <span className="ml-1">Donate</span>
</IconButton>

// Button groups
<div className="flex gap-2">
  <PrimaryButton>Save</PrimaryButton>
  <SecondaryButton>Cancel</SecondaryButton>
  <IconButton icon={Trash2} title="Delete" />
</div>
```

---

## Input

Form input components with consistent styling and labeling.

### Components

- `InputField` - Text input with optional label
- `Select` - Dropdown select with optional label

### Props

#### InputField

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `label` | `string` | `undefined` | Input label |
| `type` | `string` | `'text'` | Input type (text, email, password, file, etc.) |
| `className` | `string` | `''` | Additional CSS classes |
| ...props | - | - | Standard input props |

**Note**: For `type="file"`, the component uses only the provided `className` for styling, allowing custom file input styling.

#### Select

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `label` | `string` | `undefined` | Select label |
| `children` | `React.ReactNode` | - | Option elements |
| `className` | `string` | `''` | Additional CSS classes |
| ...props | - | - | Standard select props |

### Usage Examples

```jsx
import { InputField, Select } from '../ui/Input.jsx';

// Basic text input
<InputField
  label="Strain Name"
  type="text"
  placeholder="Enter strain name"
  value={strainName}
  onChange={(e) => setStrainName(e.target.value)}
/>

// Number input with validation
<InputField
  label="Price ($)"
  type="number"
  min="0"
  step="0.01"
  value={price}
  onChange={handlePriceChange}
  className="focus:ring-2 focus:ring-blue-500"
/>

// Select dropdown
<Select
  label="Product Type"
  value={productType}
  onChange={(e) => setProductType(e.target.value)}
>
  <option value="">Select type...</option>
  <option value="flower">Flower</option>
  <option value="edibles">Edibles</option>
  <option value="concentrates">Concentrates</option>
</Select>

// Required field
<InputField
  label="Required Field *"
  required
  value={value}
  onChange={onChange}
/>

// File input with custom styling
<InputField
  label="Choose save file"
  type="file"
  accept=".json"
  onChange={handleFileChange}
  className="block w-full text-sm text-gray-500
    file:mr-4 file:py-2 file:px-4
    file:rounded file:border-0
    file:text-sm file:font-semibold
    file:bg-blue-50 file:text-blue-700
    hover:file:bg-blue-100"
/>
```

---

## Modal

Modal dialog component with header and button sections.

### Components

- `Modal` - Main modal container
- `Modal.Header` - Modal header/title
- `Modal.Buttons` - Button container for modal actions

### Props

#### Modal

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `React.ReactNode` | - | Modal content |
| `className` | `string` | `''` | Additional CSS classes |
| `onClose` | `function` | `undefined` | Close handler - shows auto close button if provided |
| ...props | - | - | Standard div props |

#### Modal.Header

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `React.ReactNode` | - | Header content |
| `className` | `string` | `''` | Additional CSS classes |
| `hasCloseButton` | `boolean` | `false` | Adds right padding to avoid overlap with close button |
| ...props | - | - | Standard h3 props |

### Usage Examples

```jsx
import Modal from '../ui/Modal.jsx';
import { PrimaryButton, SecondaryButton } from '../ui/Button.jsx';

// Basic modal
<Modal>
  <Modal.Header>Confirm Action</Modal.Header>
  <p>Are you sure you want to delete this strain?</p>
  <Modal.Buttons>
    <SecondaryButton onClick={onCancel}>Cancel</SecondaryButton>
    <PrimaryButton onClick={onConfirm}>Delete</PrimaryButton>
  </Modal.Buttons>
</Modal>

// Modal with automatic close button
<Modal onClose={onClose} className="shadow-xl">
  <Modal.Header hasCloseButton className="text-xl flex items-center">
    <Settings className="mr-2 w-5 h-5" />
    Game Settings
  </Modal.Header>
  <p>Modal content with auto close button in top-right corner.</p>
</Modal>

// Custom styled modal
<Modal className="max-w-lg">
  <div className="flex justify-between items-center mb-4">
    <Modal.Header>Edit Strain</Modal.Header>
    <button onClick={onClose}>×</button>
  </div>
  
  <form onSubmit={handleSubmit}>
    <InputField label="Name" value={name} onChange={setName} />
    <Modal.Buttons>
      <SecondaryButton type="button" onClick={onClose}>
        Cancel
      </SecondaryButton>
      <PrimaryButton type="submit">
        Save Changes
      </PrimaryButton>
    </Modal.Buttons>
  </form>
</Modal>

// Conditional modal
{showModal && (
  <Modal>
    <Modal.Header>Welcome!</Modal.Header>
    <p>Welcome to the strain creator.</p>
    <Modal.Buttons>
      <PrimaryButton onClick={() => setShowModal(false)}>
        Get Started
      </PrimaryButton>
    </Modal.Buttons>
  </Modal>
)}
```

---

## Search

Search input component with built-in search icon and optional clear functionality.

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `string` | - | Search input value |
| `onChange` | `function` | - | Change handler |
| `onClear` | `function` | `undefined` | Clear button handler |
| `placeholder` | `string` | `'Search...'` | Placeholder text |
| `className` | `string` | `''` | Additional CSS classes |
| ...props | - | - | Standard input props |

### Usage Examples

```jsx
import SearchInput from '../ui/Search.jsx';

// Basic search
<SearchInput
  value={searchTerm}
  onChange={(e) => setSearchTerm(e.target.value)}
  placeholder="Search strains..."
/>

// Search with clear functionality
<SearchInput
  value={searchTerm}
  onChange={(e) => setSearchTerm(e.target.value)}
  onClear={() => setSearchTerm('')}
  placeholder="Search by name or effects..."
/>

// Full-width search
<SearchInput
  value={query}
  onChange={handleSearch}
  onClear={handleClear}
  className="w-full"
  placeholder="Search everything..."
/>

// Search with debouncing
const [searchTerm, setSearchTerm] = useState('');
const debouncedSearch = useDebounce(searchTerm, 300);

<SearchInput
  value={searchTerm}
  onChange={(e) => setSearchTerm(e.target.value)}
  onClear={() => setSearchTerm('')}
  placeholder="Search with debouncing..."
/>
```

---

## TabContainer

Consistent container styling for tab content sections.

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `className` | `string` | `''` | Additional CSS classes |
| `withTopMargin` | `boolean` | `true` | Whether to include top margin |
| ...props | - | - | Standard div props |

### Usage Examples

```jsx
import TabContainer from '../ui/TabContainer.jsx';

// Basic container
<TabContainer>
  <h3>Section Title</h3>
  <p>Section content goes here.</p>
</TabContainer>

// Container without top margin
<TabContainer withTopMargin={false}>
  <div>First section with no top margin</div>
</TabContainer>

// Custom styled container
<TabContainer className="border-l-4 border-blue-500">
  <h3>Highlighted Section</h3>
  <p>This section has a blue left border.</p>
</TabContainer>

// Multiple containers
<div className="space-y-6">
  <TabContainer>
    <h3>Settings</h3>
    <p>Application settings</p>
  </TabContainer>
  
  <TabContainer>
    <h3>Preferences</h3>
    <p>User preferences</p>
  </TabContainer>
</div>
```

---

## TabHeader

Consistent header styling for tab sections with optional icons.

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `icon` | `React.Component` | `undefined` | Optional icon component |
| `children` | `React.ReactNode` | - | Header content |
| `className` | `string` | `''` | Additional CSS classes |
| ...props | - | - | Standard h2 props |

### Usage Examples

```jsx
import TabHeader from '../ui/TabHeader.jsx';
import { FlaskConical, Package, BarChart } from 'lucide-react';

// Basic header
<TabHeader>Strain Creator</TabHeader>

// Header with icon
<TabHeader icon={FlaskConical}>
  Strain Creator
</TabHeader>

// Multiple headers with different icons
<TabHeader icon={Package}>My Strains</TabHeader>
<TabHeader icon={BarChart}>Analytics</TabHeader>

// Custom styled header
<TabHeader 
  icon={FlaskConical}
  className="text-blue-800 border-b-2 border-blue-200 pb-2"
>
  Advanced Strain Creator
</TabHeader>
```

---

## Table

Comprehensive table component system with consistent styling and behavior.

### Components

- `Table` - Main table wrapper
- `Table.Head` - Table header section
- `Table.Body` - Table body section
- `Table.Header` - Individual header cell
- `Table.Row` - Table row
- `Table.Cell` - Table cell

### Props

#### Table.Header

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `sortable` | `boolean` | `false` | Whether column is sortable |
| `onClick` | `function` | `undefined` | Click handler for sorting |
| `className` | `string` | `''` | Additional CSS classes |

### Usage Examples

```jsx
import Table from '../ui/Table.jsx';

// Basic table
<Table>
  <Table.Head>
    <Table.Row>
      <Table.Header>Name</Table.Header>
      <Table.Header>Type</Table.Header>
      <Table.Header>Price</Table.Header>
    </Table.Row>
  </Table.Head>
  <Table.Body>
    <Table.Row>
      <Table.Cell>Purple Haze</Table.Cell>
      <Table.Cell>Flower</Table.Cell>
      <Table.Cell>$25.00</Table.Cell>
    </Table.Row>
  </Table.Body>
</Table>

// Sortable table
<Table>
  <Table.Head>
    <Table.Row>
      <Table.Header 
        sortable 
        onClick={() => handleSort('name')}
      >
        Name ↕️
      </Table.Header>
      <Table.Header 
        sortable 
        onClick={() => handleSort('price')}
      >
        Price ↕️
      </Table.Header>
      <Table.Header>Actions</Table.Header>
    </Table.Row>
  </Table.Head>
  <Table.Body>
    {strains.map(strain => (
      <Table.Row key={strain.id}>
        <Table.Cell>{strain.name}</Table.Cell>
        <Table.Cell>${strain.price}</Table.Cell>
        <Table.Cell>
          <button>Edit</button>
        </Table.Cell>
      </Table.Row>
    ))}
  </Table.Body>
</Table>

// Custom styled table
<Table className="shadow-lg">
  <Table.Head className="bg-blue-100">
    <Table.Row>
      <Table.Header className="text-blue-800">
        Strain Details
      </Table.Header>
    </Table.Row>
  </Table.Head>
  <Table.Body>
    <Table.Row className="hover:bg-blue-50">
      <Table.Cell className="font-medium">
        Premium Strain
      </Table.Cell>
    </Table.Row>
  </Table.Body>
</Table>
```

---

## Best Practices

### Consistent Usage
- Always use these components instead of custom styled elements
- Combine components for complex UIs (e.g., Modal + InputField + Button)
- Use className prop for customization rather than inline styles

### Accessibility
- All components support standard HTML attributes
- Use proper semantic HTML (buttons, inputs, etc.)
- Include aria-labels and titles where appropriate

### Performance
- Components are lightweight and optimized
- Use React.memo() for frequently re-rendered components
- Pass stable references for event handlers

### Styling
- Components use Tailwind CSS classes
- Extend with additional classes via className prop
- Maintain design system consistency across the application

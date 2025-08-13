# Changelog

All notable changes to this project will be documented in this file.

## Setup

### Added
- Project iteration roadmap defined in [3-Development-Roadmap](https://github.com/Anymuz/dopeonomics/wiki/3-Development-Roadmap)
- Development workflow and contribution guide established in [2-Architecture-Overview](https://github.com/Anymuz/dopeonomics/wiki/2-Architecture-Overview)
- Wiki content structure created and populated
- GitHub Project board configured with iterations and priorities
- Issues imported and organized across development phases

---
*This file will be updated with each completed iteration.*


---

## Iteration 1: Core Infrastructure + Critical Bugs

### Vite Rebuild - Branch: `iteration/1-core-infrastructure/vite-migration`
- Migrated build system from Create React App (CRA) to Vite
- Installed and configured Tailwind CSS + PostCSS
- Cleaned project structure and removed CRA legacy
- Updated project scripts for Vite
- Preserved original Dopeonomics core styles
#### Pull Request Completed.
----
### Full Refactor (ongoing) - Branch: `iteration/1-core-infrastructure/total-rebuild`
#### *Commit: Base Layout + Work In Progress failsafe*
  - Began to refactor using modern industry standards
  - Replaced unessiary large zustand slices and hooks with feature specific stores and hooks
  - Re-organised directory Structure
  - Constructed base foundation for app as features/layout to include:
    - Header
    - Footer
    - Navigation Bar 
    - Render Active Section
    - Donate 
    - Settings
  - Per feature: now use `/data` for constant data, `/hooks` for state mutation, `/models` for Zustand stores, `utils` for stateless helper functions and `/ui` for react components.
  - Added `maintainence` feature as section to default to when the active tab references a non-existant section. This keeps the app usable as each section is restored and can be used during maintainence futher down the line.
  - Restored the usage of this neglected changelog.

#### *Commit: Strain Creator - Selectors, mix.store.js, Data, Utils and Hooks*
  - Added `features/strain-creator` directory.
  - Split `/data` files for better organisation.
    - `effectData.js` stores `effectColors` and `effectDetails`.
    - `ingredientData.js` has all ingredients and related data to them.
    - `strainData.js` stores `drugTypes`, `seedTypes` and `packagingTypes`.
  - Custom `/hook` files to manage states.
    - `useFinalizeMix.js` handles saving the current mix to `shared/model/mixes.store.js`
    - `useIngredientSelecction.js` hanndles hover effect states and selected ingredient state.
    - `useMixing.js` manages states for `currentMix`, `currentEffects` and `mixingHistory` aswell as adding and removing ingredients and `resetMix` along with needed `useEffect`
    - `useNamingModal.js` handles the state for naming modal and `pendingMix`.
    - `usePackaging.js`, `usePricing.js`, `useStrainSelection.js` all for their respective states and handling
  - Added utility files `determineEffects.js` for ingredient/effect functions
  - `filterIngredients.js` and `priceCalculations.js` in `/utils` with relevent functions.
  - Made `/ui/selectors` with all selector UI commponents added with originnal html/css interface styles
  - Created `StrainCreatorTab` in `/ui` to render existing components and test in
  - Began UI refactoring with `/ui/buttons` containing dynamic `packagingButton.jsx`
  - Fixed bugs with navigation bar and tab rendering.
  - Create a versitile `stringUtils.js` in `/shared/utils` to easily convert string data tags and labels to human-friendly text for when used in the UI.
  - Temporarily invented `box` as a packaging type to test scalability (will be removed once feature is complete)
  - Commented, organised and standardised all code files to prevent confusion.
  - Added new title attribute to `drugTypes` to display seed section titles in the `SequentialSeedSelector` UI 
  - Added 'specificality' to `ingredients` to work with the `filterIngedients` utiliy function to optimise filtering seeds based on selected drug type.

#### *Commit: Hotfix for SequentialIngredientsSelector*
  - Added small change to  `simulateAddIngredient` function to track what changed based on ingredient interactions when simulating adding the ingredient.
  - Added preview block for hoveredIngredient to display the preview within the ingredients selection menu
  - Removed redundent Hovered Effects Preview from Current Mix status seection (it was remaining even after selection menu closed)
  - Added CSS class to `base.css` to fix the ingredients selection dialogue showing a fully black background

#### *Commit: Shared UI Components System + Modal/Button Refactoring*
  - Created comprehensive shared UI component system in `/src/shared/ui/` with 8 reusable components:
    - `Alert.jsx` - Contextual messages with severity levels (success, warning, error, info)
    - `Button.jsx` - Collection of button variants (Primary, Secondary, Gray, Icon) with consistent styling
    - `Input.jsx` - Smart input components (InputField, Select) with automatic file input detection
    - `Modal.jsx` - Enhanced modal system with auto close button functionality
    - `Search.jsx` - Search input with built-in icons and clear functionality
    - `TabContainer.jsx` - Consistent container styling for tab sections
    - `TabHeader.jsx` - Section headers with optional icons
    - `Table.jsx` - Comprehensive table system with sortable headers
  - Enhanced `Modal` component to support automatic close button when `onClose` prop provided
  - Enhanced `InputField` component with smart file input detection and flexible styling
  - Enhanced `IconButton` component to support both icon-only and icon+text combinations
  - Refactored layout components to use shared UI system:
    - `DonateModal` now uses enhanced Modal component with auto close functionality
    - `SettingsModal` completely refactored using Modal, Button, InputField, and Alert components
    - `SettingsButton` refactored to use IconButton component
  - Created comprehensive documentation in `/src/shared/ui/README.md` with:
    - Complete API reference for all components
    - Real-world usage examples
    - Props tables and component descriptions
    - Best practices and accessibility guidelines
  - Created example component implementations in `/src/shared/components/examples/`:
    - Enhanced navigation, strain creator, and MyStrains components using shared UI system
    - Demonstrates proper component composition and reusability patterns
  - Followed "Rule of Three" principle - avoided over-engineering by keeping simple repeated patterns local
  - Eliminated ~60% of duplicate CSS and HTML structure across modals and forms
  - Established consistent design system foundation for future component development

#### *Commit: Display Components Refactoring + Primitive Component System*
  - **Refactored display components** using shared primitive components to eliminate code duplication:
    - `CurrentMixDisplay.jsx` - Enhanced with consistent card styling and effect tags
    - `MixingHistoryDisplay.jsx` - Streamlined with shared primitives 
    - `MixSummaryDisplay.jsx` - Unified styling with other display components
    - `ProfitInfoDisplay.jsx` - Updated to use new display utilities and moved ProfitRow to primitives
  - **Created essential primitive components** in `/ui/primitives/`:
    - `DisplayCard.jsx` - Shared container component with consistent border/padding/background
    - `EffectTag.jsx` - Green effect tags used across all display components
    - `ProfitRow.jsx` - Specialized row component for profit displays (moved from existing location)
    - `SelectorHeader.jsx` - Consistent section headers for selectors (moved from existing location)
  - **Created specialized button components** in `/ui/buttons/`:
    - `DrugTypeButton.jsx` - Drug type selection with emoji, name, and pricing information
    - `SeedButton.jsx` - Seed selection with detailed information display (emoji, cost, effect, description)
  - **Created new UI components**:
    - `NamePromptModal.jsx` - Modal for naming and saving strain creations
    - `PriceMarginInputs.jsx` - Comprehensive pricing input component with sale price, target margin, and price multiplier slider
  - **Major StrainCreatorTab.jsx updates**:
    - Integrated all new components (selectors, displays, modals, pricing inputs)
    - Connected all hooks (usePricing, useNamingModal, useMixing, useStrainSelection)
    - Implemented complete strain creation workflow from selection to saving
  - **Created display utility functions** for consistent formatting:
    - `shared/utils/displayUtils.js` - Universal formatting utility with type-based display options
      - `formatDisplayValue()` - Handles currency, percentage, number, and text formatting with options
      - Auto-detection and explicit type formatting for backward compatibility
    - `strain-creator/utils/profitDisplayUtils.js` - Specialized profit display utilities
      - `getProfitColor()` - Dynamic color coding for profit/loss values
      - `formatPackagingDisplay()` - Dynamic packaging type display with cost and capacity
  - **Restored missing Price Multiplier functionality**:
    - Added price multiplier slider (1-20x range) back to `PriceMarginInputs.jsx`
    - Connected to existing pricing state management via `usePricing` hook
    - Updated `StrainCreatorTab.jsx` to pass required `priceMultiplier` and `handleMultiplierChange` props
  - **Enhanced pricing hooks** with missing handler functions:
    - `usePricing.js` - Added `handleMarginChange` handler for consistent form handling
    - Updated hook exports to include both `handlePriceChange` and `handleMarginChange`
    - `useNamingModal.js` - Enhanced with additional handlers (`handleConfirm`, `handleKeyPress`) and improved state management
  - **Standardized import patterns** across all components using `@features/strain-creator` alias
  - **Code quality improvements**: Removed unused imports and enhanced component maintainability



## Iteration 2: Base Planning Setup

_(no tasks completed yet)_

---

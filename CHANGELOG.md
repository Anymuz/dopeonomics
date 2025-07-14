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


  **Plan for next commit**:
  - Continue to see if refactoring button components is viable
  - Look into further refactoring the large UI code for `SequentialIngredientsSelector` provided it doesnt break everything.
  - Add display UI components and finish strain-creator UI
  - Test and complete rebuild of strain-creator feature and tab

## Iteration 2: Base Planning Setup

_(no tasks completed yet)_

---

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
---

## Iteration 2: Base Planning Setup

_(no tasks completed yet)_

---

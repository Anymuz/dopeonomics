# Dopeonomics - Strain Creator Companion

An unofficial companion app for Schedule 1 — helping you plan, manage, and expand your empire one strain at a time.

It serves as standalone planning and simulation tool intended for use alongside the Schedule 1 video game. It supports decision-making, inventory tracking, sales planning, and gameplay strategy through interactive, data-driven interfaces.

For more information, including technical information, please [read the wiki here](https://github.com/Anymuz/dopeonomics/wik)

## Project Setup
Ensure you are using the latest version of [node.js](https://nodejs.org/en/download). Then copy or clone the repo into a directory of your choice either via download or open a terminal inside the directory of your choice and input the following:
```bash
git clone https://github.com/Anymuz/dopeonomics.git
```

### Install dependencies
```bash
npm install
```

### Run development server
```bash
npm run dev
```

The app will be available at [http://localhost:3000](http://localhost:3000).

## 🚀 Build for Production

```bash
npm run build
```

## Project Structure
The application is based in two folderes inside the project directory as detailed below, with the public folder being for assets, and the src folder containing the project code itself. Files outside of these folders in the main directory are configuration files and the main `index.html`S file.

```plaintext
/public                # Static files for browser to fetch directly e.g. favicon.ico
/src
  ├── assets/          # Assets used inside components e.g. logo.png for <Logo /> 
  ├── components/      # React components
  ├── pages/           # Pages/screens
  ├── store/           # Zustand game state stores
  ├── styles/          # Tailwind and base.css
  ├── utils/           # Utility functions
  ├── App.jsx          # Core application
  └── main.jsx         # Entry point
index.html
```

## Contribution & Workflow
For those who wish to contribute, please first [read and understand the full wiki](https://github.com/Anymuz/dopeonomics/wiki) and then select and assign the contribution you wish to work on to yourself from the currently active development iteration found in [this project](https://github.com/Anymuz/dopeonomics/projects?query=is%3Aopen). 

When making contributions please stick to the following workflow to keep things well tracked and organised and prevent conflicts in the program code:

- Branch from `iteration/{number}-{short-description}-main` using the current ongoing iteration for each new feature, fix, or task.
- Use the naming convention:  
  `iteration/{number}-{short-description}/{feature-name}`

  Examples:
  - `iteration/1-core-infrastructure/vite-rebuild`
  - `iteration/1-core-infrastructure/refactor-supply-tab`

- Push your branch to GitHub.
- Open a Pull Request (PR) into `iteration/{number}-{short-description}-main`.
- Self-review your PR and link it to related issues.
- Merge after approval.

- More detail on the [wiki](https://github.com/Anymuz/dopeonomics/wiki)

## Changelog
When a PR is approved and added, the project task will be then added to the changelog.

See [CHANGELOG.md](./CHANGELOG.md) for iteration progress and project history.

## License

_To be determined._

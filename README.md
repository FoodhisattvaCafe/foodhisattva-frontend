# Project Setup Documentation

## Table of Contents
1. [Introduction](#introduction)
2. [Project Structure](#project-structure)
3. [Installation](#installation)
4. [ESLint Configuration](#eslint-configuration)
5. [Prettier Setup](#prettier-setup)
6. [Git Workflow](#git-workflow)
7. [Component Documentation](#component-documentation)
8. [Best Practices](#best-practices)

---

## Introduction
This document outlines the setup and development workflow for the project, ensuring maintainability, consistency, and high performance.

## Project Structure
```
📦 project-root
 ┣ 📂 src
 ┃ ┣ 📂 components  # Reusable UI components
 ┃ ┣ 📂 pages       # Page components
 ┃ ┣ 📂 assets      # Images, icons, etc.
 ┃ ┣ 📂 hooks       # Custom hooks
 ┃ ┣ 📂 utils       # Helper functions
 ┃ ┣ 📜 App.js      # Main app component
 ┃ ┣ 📜 index.js    # Entry point
 ┣ 📜 .eslintrc.js  # ESLint configuration
 ┣ 📜 .prettierrc   # Prettier configuration
 ┣ 📜 package.json  # Dependencies
 ┣ 📜 README.md     # Project documentation
 ┣ 📜 .gitignore    # Git ignore file
```

## Installation

### Prerequisites
- Node.js (>=14.x)
- npm or yarn

### Setup
1. Clone the repository:
   ```sh
   git clone https://github.com/your-repo/project.git
   cd project
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Start the development server:
   ```sh
   npm start
   ```

## ESLint Configuration
We use ESLint to enforce code consistency and best practices.

- Install ESLint:
  ```sh
  npm install eslint --save-dev
  ```
- Create a `.eslintrc.js` file with the following configuration:
  ```js
  module.exports = {
    env: {
      browser: true,
      es2021: true,
    },
    extends: [
      'eslint:recommended',
      'plugin:react/recommended',
      'prettier'
    ],
    parserOptions: {
      ecmaVersion: 12,
      sourceType: 'module',
    },
    plugins: ['react'],
    rules: {
      'react/prop-types': 0,
      'no-unused-vars': 'warn',
    },
  };
  ```
- Run ESLint:
  ```sh
  npx eslint .
  ```

## Prettier Setup
We use Prettier for consistent code formatting.

- Install Prettier:
  ```sh
  npm install --save-dev --save-exact prettier
  ```
- Create a `.prettierrc` file:
  ```json
  {
    "semi": true,
    "singleQuote": true,
    "trailingComma": "es5",
    "printWidth": 80
  }
  ```
- Format files:
  ```sh
  npx prettier --write .
  ```

## Git Workflow
A structured Git workflow ensures code quality and consistency.

### Branching Strategy
- `main`: Production-ready code
- `dev`: Ongoing development
- `feature/<feature-name>`: New features
- `bugfix/<issue>`: Bug fixes

### Commit Messages Format
Use conventional commits:
```
feat: Add new feature
fix: Fix a bug
refactor: Improve existing code
style: Format code (no code changes)
docs: Update documentation
```

### Pull Requests
1. Create a new branch: `git checkout -b feature/new-feature`
2. Make changes and commit: `git commit -m "feat: Added new feature"`
3. Push to GitHub: `git push origin feature/new-feature`
4. Create a pull request to `dev`

## Component Documentation
Each component should have clear documentation:

### Example Component: `Button.js`
```jsx
/**
 * Button Component
 * @param {string} label - Text inside the button
 * @param {Function} onClick - Function to execute on click
 * @param {string} [type="button"] - Button type
 * @returns JSX.Element
 */
const Button = ({ label, onClick, type = 'button' }) => {
  return <button type={type} onClick={onClick}>{label}</button>;
};
export default Button;
```

## Best Practices
- Keep components reusable and modular
- Use functional components and hooks
- Optimize images and lazy load assets
- Follow naming conventions (`camelCase` for variables, `PascalCase` for components)
- Always test and review code before merging

---

This setup ensures a smooth development workflow while maintaining high code quality and performance. 🚀

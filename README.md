# Foodhisattva Café Website

## DEMO 2 (Week of FEB 18) Development Goals

### 1. Menu System Implementation
- [ ] Menu items database integration
- [ ] Category filtering and search
- [ ] Item detail modals
- [ ] Customization options
- [ ] Pricing calculations
- [ ] Menu management interface

### 2. Order System Development
- [ ] Shopping cart functionality
- [ ] Order customization options
- [ ] Quantity adjustments
- [ ] Price calculations
- [ ] Order summary view
- [ ] Cart persistence

### 3. User Profile & Account
- [ ] Profile dashboard implementation
- [ ] Order history display
- [ ] Saved preferences
- [ ] Address management
- [ ] Account settings
- [ ] Password reset functionality

### 4. Reservation System
- [ ] Calendar integration
- [ ] Time slot selection
- [ ] Party size handling
- [ ] Special requests form
- [ ] Confirmation system
- [ ] Reservation management

### 5. Admin Features
- [ ] Admin dashboard layout
- [ ] Menu item management (CRUD)
- [ ] Basic inventory tracking
- [ ] Order management view
- [ ] Reservation overview

## Project Structure

FOODHISATTVA-FRONTEND/ ├── .next/ ├── node_modules/ ├── public/ ├── src/ │ ├── app/ │ │ ├── dashboard/ │ │ │ └── page.tsx │ │ ├── login/ │ │ │ └── page.tsx │ │ ├── favicon.ico │ │ ├── globals.css │ │ ├── layout.tsx │ │ └── page.tsx │ ├── components/ │ │ ├── features/ │ │ │ └── ModernVeganHeader.tsx │ │ └── ui/ │ │ ├── AuthCard.tsx │ │ ├── AuthModal.tsx │ │ ├── InteractiveMap.tsx │ │ ├── ProtectedRoute.tsx │ │ ├── Providers.tsx │ │ └── SignOutButton.tsx │ ├── contexts/ │ │ └── AuthContext.tsx │ ├── images/ │ │ ├── food-1.png │ │ ├── food-2.png │ │ ├── food-3.png │ │ ├── food-4.png │ │ ├── food-5.png │ │ ├── hero-bg.png │ │ ├── story-1.png │ │ ├── story-2.png │ │ ├── story-3.png │ │ └── story-4.png │ ├── lib/ │ └── styles/ │ └── globals.css ├── .env.local ├── .eslintrc.json ├── .gitignore ├── eslint.config.mjs ├── LICENSE ├── next-env.d.ts ├── next.config.mjs ├── package-lock.json ├── package.json ├── postcss.config.cjs ├── postcss.config.mjs ├── README.md ├── tailwind.config.js └── tsconfig.json

shell
Copy

## Getting Started

### Prerequisites

```bash
node >= 18.0.0
npm >= 9.0.0
Installation
Clone the repository

bash
Copy
git clone https://github.com/FoodhisattvaCafe/foodhisattva-frontend.git
cd foodhisattva-frontend
Install dependencies

bash
Copy
npm install
Create a .env file in the root directory and add necessary environment variables:

env
Copy
NEXT_PUBLIC_GOOGLE_CLIENT_ID=your_google_client_id
NEXT_PUBLIC_API_URL=your_api_url
Run the development server

bash
Copy
npm run dev
Git Workflow
Create your feature branch

bash
Copy
git checkout -b feature/your-feature-name
Commit your changes

bash
Copy
git add .
git commit -m "Add your commit message"
Push to your branch

bash
Copy
git push origin feature/your-feature-name
Create a Pull Request

Code Style Guide
Use ESLint and Prettier for code formatting.
Follow component naming convention: PascalCase for components.
Use camelCase for variables and functions.
Write meaningful commit messages.
Tech Stack
Next.js 14
React 18
TypeScript
Tailwind CSS
shadcn/ui
NextAuth.js
Team Members
[Member 1] - Frontend Developer
[Member 2] - Database Developer
[Member 3] - Backend Developer
Prasanna Kumar Peram - Backend Developer
Koushik Mannam - Full Stack Developer
License
This project is licensed under the MIT License - see the LICENSE file for details.

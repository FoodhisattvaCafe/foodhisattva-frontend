# Foodhisattva Café Website

## DEMO 1 week of FEB 11 Development Goals

### 1. Basic Layout & Navigation
- [ ] Responsive navbar implementation
- [ ] Footer with contact information
- [ ] Basic page routing setup
- [ ] Mobile-friendly design implementation
- [ ] Layout grid system setup

### 2. Authentication
- [ ] Login/Register forms
- [ ] Google OAuth integration
- [ ] User session management
- [ ] Protected routes setup

### 3. Theme & UI
- [ ] Dark/Light mode toggle
- [ ] Color scheme setup
- [ ] Basic animations library
- [ ] Global styles implementation
- [ ] Loading states

### 4. Homepage Components
- [ ] Hero section with main buttons
  - Dine in
  - Order
  - Catering
  - Menu
- [ ] Popular foods slider
- [ ] Quick links section
- [ ] Restaurant info section

### 5. Information Sections
- [ ] Hours of operation
- [ ] Contact information
- [ ] Google Maps integration
- [ ] Social media links
- [ ] FAQ accordion

## Additional Important Items

### Error Handling
- [ ] 404 page
- [ ] Error boundaries
- [ ] Form validation feedback

### Performance
- [ ] Image optimization
- [ ] Lazy loading
- [ ] Route pre-fetching

### Project Setup
- [ ] ESLint configuration
- [ ] Prettier setup
- [ ] Git workflow documentation
- [ ] Component documentation

## Getting Started

### Prerequisites
```bash
node >= 18.0.0
npm >= 9.0.0
```

### Installation
1. Clone the repository
```bash
git clone https://github.com/FoodhisattvaCafe/foodhisattva-frontend.git
cd foodhisattva-frontend
```

2. Install dependencies
```bash
npm install
```

3. Create a .env file in the root directory and add necessary environment variables
```env
NEXT_PUBLIC_GOOGLE_CLIENT_ID=your_google_client_id
NEXT_PUBLIC_API_URL=your_api_url
```

4. Run the development server
```bash
npm run dev
```

### Git Workflow

1. Create your feature branch
```bash
git checkout -b feature/your-feature-name
```

2. Commit your changes
```bash
git add .
git commit -m "Add your commit message"
```

3. Push to your branch
```bash
git push origin feature/your-feature-name
```

4. Create a Pull Request

### Code Style Guide

- Use ESLint and Prettier for code formatting
- Follow component naming convention: PascalCase for components
- Use camelCase for variables and functions
- Write meaningful commit messages

### Project Structure
```
src/
├── app/                   # Next.js app directory
├── components/            # Reusable components
│   ├── layout/           # Layout components
│   ├── ui/               # UI components
│   └── features/         # Feature-specific components
├── lib/                  # Utility functions
├── styles/               # Global styles
└── types/                # TypeScript types
```

### Available Scripts
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run format       # Run Prettier
```

### Tech Stack
- Next.js 14
- React 18
- TypeScript
- Tailwind CSS
- shadcn/ui
- NextAuth.js



### Team Members
- [Member 1] - Frontend Developer
- [Member 2] - Database Developer
- [Member 3] - Backend Developer
- [Member 4] - Backend Developer
- Koushik Mannam - Full Stack Developer

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details

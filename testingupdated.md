# 🧪 Testing Documentation

This file describes **where** our unit tests live, **how** to run them, our **coverage** results, and **all** the test cases by feature.

---

## 1. Test Locations

All tests are organized into two folders:


foodhisattva-frontend/
├── client/                   # Frontend (React)
│   └── tests/
│       ├── auth.test.tsx
│       ├── menu.test.tsx
│       ├── customization.test.tsx
│       ├── cart.test.tsx
│       ├── checkout.test.tsx
│       ├── orderTracking.test.tsx
│       ├── reservation.test.tsx
│       ├── payment.test.tsx
│       └── notification.test.tsx
└── server/                   # Backend (Node/Express)
    └── tests/
        ├── auth.test.ts
        ├── menu.test.ts
        ├── cart.test.ts
        ├── order.test.ts
        ├── reservation.test.ts
        ├── payment.test.ts
        ├── inventory.test.ts
        └── notification.test.ts

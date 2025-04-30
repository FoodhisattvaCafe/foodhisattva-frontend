# 🧪 Testing Documentation

This document shows **where** our tests live, **how** to run them, our **coverage** results, and **all** the unit test cases by feature.

---

## 1. Test Locations

**Frontend tests** live under `client/tests/`:
client/tests/ ├── auth.test.tsx ├── menu.test.tsx ├── customization.test.tsx ├── cart.test.tsx ├── checkout.test.tsx ├── orderTracking.test.tsx ├── reservation.test.tsx ├── payment.test.tsx └── notification.test.tsx

**Backend tests** live under `server/tests/`:
server/tests/ ├── auth.test.ts ├── menu.test.ts ├── cart.test.ts ├── order.test.ts ├── reservation.test.ts ├── payment.test.ts ├── inventory.test.ts └── notification.test.ts
---

## 2. How to Run & View Coverage

### Frontend  
```bash
cd client
npm install
npm test          # runs all frontend tests
npm run coverage  # generates HTML report in client/coverage/lcov-report/
cd server
npm install
npm test          # runs all backend tests
npm run coverage  # generates HTML report in server/coverage/lcov-report/

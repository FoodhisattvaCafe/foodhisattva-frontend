# 🧪 Testing Documentation

This file describes **where** our unit tests live, **how** to run them, our **coverage** results, and **all** the test cases by feature.

---

## 1. Test Locations

All tests are organized into two folders:

```text
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

```

        
## 2. How to Run & View Coverage

### Frontend
```bash
cd client
npm install
npm test          # runs Jest + React Testing Library
npm run coverage  # generates HTML report in client/coverage/lcov-report/

###Backend
cd server
npm install
npm test          # runs Jest + Supertest
npm run coverage  # generates HTML report in server/coverage/lcov-report/




## 3. Coverage Summary

**Frontend**  
- Statements: ~92%  
- Branches: ~89%  
- Functions: ~95%  
- Lines: ~90%  

**Backend**  
- Statements: ~90%  
- Branches: ~87%  
- Functions: ~93%  
- Lines: ~91%  

*(Open `*/coverage/lcov-report/index.html` in each folder to inspect full details.)*






## 4. Feature → Test File Map

| Feature                   | Frontend File                         | Backend File                     |
|---------------------------|---------------------------------------|----------------------------------|
| Authentication            | `client/tests/auth.test.tsx`          | `server/tests/auth.test.ts`      |
| Menu & Filtering          | `client/tests/menu.test.tsx`          | `server/tests/menu.test.ts`      |
| Food Customization        | `client/tests/customization.test.tsx` | *(covered in menu tests)*        |
| Shopping Cart             | `client/tests/cart.test.tsx`          | `server/tests/cart.test.ts`      |
| Checkout & Order          | `client/tests/checkout.test.tsx`      | `server/tests/order.test.ts`     |
| Order Tracking            | `client/tests/orderTracking.test.tsx` | `server/tests/order.test.ts`     |
| Table Reservations        | `client/tests/reservation.test.tsx`   | `server/tests/reservation.test.ts`|
| Payment Processing        | `client/tests/payment.test.tsx`       | `server/tests/payment.test.ts`   |
| Inventory Management      | —                                     | `server/tests/inventory.test.ts` |
| Notifications & Alerts    | `client/tests/notification.test.tsx`  | `server/tests/notification.test.ts`|






## 5. Unit Test Cases by Feature

### Authentication
- **TC-LA-01**: Login with valid credentials  
- **TC-LA-02**: Login with invalid credentials  
- **TC-LA-03**: Social login (Google OAuth)  
- **TC-LA-04**: Session timeout handling  

### Interactive Menu
- **TC-IM-01**: Display menu categories  
- **TC-IM-02**: Load high-resolution images  
- **TC-IM-03**: Dynamic price update  
- **TC-IM-04**: Real-time availability  
- **TC-IM-05**: Responsiveness  

### Food Item Customization
- **TC-FIC-01**: Choose spice level & toppings  
- **TC-FIC-02**: Invalid customization option  
- **TC-FIC-03**: Multiple customizations  
- **TC-FIC-04**: Cancel/revert customization  

### Shopping Cart
- **TC-SC-01**: Add item to cart  
- **TC-SC-02**: Remove item from cart  
- **TC-SC-03**: Update quantity  
- **TC-SC-04**: Cart persistence  
- **TC-SC-05**: Clear cart  

### Order Processing
- **TC-OP-01**: Place order successfully  
- **TC-OP-02**: Order status updates  
- **TC-OP-03**: Scheduled order  
- **TC-OP-04**: Cancel order before prep  
- **TC-OP-05**: Invalid payment handling  

### Payment Processing
- **TC-PP-01**: Valid card  
- **TC-PP-02**: Invalid card  
- **TC-PP-03**: Multi-gateway support  
- **TC-PP-04**: Automatic retry on failure  
- **TC-PP-05**: Security compliance  

### Table Reservation System
- **TC-TR-01**: Create reservation  
- **TC-TR-02**: Prevent double-booking  
- **TC-TR-03**: Modify reservation  
- **TC-TR-04**: Cancel reservation  
- **TC-TR-05**: Reminder notification  

### Staff Dashboard
- **TC-SD-01**: Staff login & access  
- **TC-SD-02**: View & update orders  
- **TC-SD-03**: Reservation management  
- **TC-SD-04**: Low-stock alerts  
- **TC-SD-05**: Role-based access control  

### Inventory Management System
- **TC-IMS-01**: Deduct stock on completion  
- **TC-IMS-02**: Demand prediction  
- **TC-IMS-03**: Low-stock notification  
- **TC-IMS-04**: Mark out-of-stock  

### Admin Panel
- **TC-AP-01**: Admin login & access  
- **TC-AP-02**: CRUD menu items  
- **TC-AP-03**: Approve/reject reservations  
- **TC-AP-04**: Generate reports  
- **TC-AP-05**: Manage user roles  

### Customer Order Tracking
- **TC-COT-01**: Real-time status updates  
- **TC-COT-02**: Delivery tracking  
- **TC-COT-03**: Completion notification  

### Notifications & Alerts
- **TC-NA-01**: Email/SMS on order placement  
- **TC-NA-02**: Push notification on status change  
- **TC-NA-03**: Low-stock alert to staff  
- **TC-NA-04**: Reservation reminder  

### Theme Adaptation
- **TC-TA-01**: Detect OS theme  
- **TC-TA-02**: Manual theme toggle  

### Google Maps Integration
- **TC-GMI-01**: Restaurant location display  
- **TC-GMI-02**: Directions link  
- **TC-GMI-03**: Driver tracking (simulated)  


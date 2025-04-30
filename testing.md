# 🧪 Unit Test Cases for All Features

This document lists all unit test cases for **FoodSattva**, organized by feature.

---

## 1. Authentication

#### TC-LA-01: Login with valid credentials
- **Pre-Conditions**  
  - User account exists in database.  
  - App is running.  
- **Steps**  
  1. Open `/login` page.  
  2. Enter valid email and password.  
  3. Click **Login**.  
- **Expected Result**  
  - User is redirected to Home/Dashboard.  
  - JWT token stored in localStorage.

#### TC-LA-02: Login with invalid credentials
- **Pre-Conditions**  
  - User account exists.  
- **Steps**  
  1. Open `/login`.  
  2. Enter invalid email or wrong password.  
  3. Click **Login**.  
- **Expected Result**  
  - Error message “Invalid username or password”.  
  - Remains on login page.

#### TC-LA-03: Social login (Google OAuth)
- **Pre-Conditions**  
  - Google OAuth configured.  
- **Steps**  
  1. Click **Login with Google**.  
  2. Grant permissions in popup.  
- **Expected Result**  
  - User is authenticated and redirected to Home.

#### TC-LA-04: Session timeout handling
- **Pre-Conditions**  
  - User is logged in.  
  - Session timeout set to 1 minute (test mode).  
- **Steps**  
  1. Log in.  
  2. Remain idle over one minute.  
  3. Navigate to a protected route.  
- **Expected Result**  
  - Redirect to `/login` or re-authentication prompt.

---

## 2. Interactive Menu

#### TC-IM-01: Display menu categories
- **Pre-Conditions**  
  - Menu items seeded in DB.  
- **Steps**  
  1. Navigate to `/menu`.  
- **Expected Result**  
  - Categories (Starters, Mains, Desserts) are shown.

#### TC-IM-02: Load high-resolution images
- **Pre-Conditions**  
  - CDN hosting enabled.  
- **Steps**  
  1. View any menu item.  
- **Expected Result**  
  - Image loads without broken link.

#### TC-IM-03: Dynamic price update
- **Pre-Conditions**  
  - Item has add-ons (e.g., extra cheese).  
- **Steps**  
  1. Open customization modal.  
  2. Add or remove an add-on.  
- **Expected Result**  
  - Price updates instantly.

#### TC-IM-04: Real-time availability
- **Pre-Conditions**  
  - Admin marks an item out-of-stock via API.  
- **Steps**  
  1. Refresh `/menu`.  
- **Expected Result**  
  - Out-of-stock items are hidden or flagged.

#### TC-IM-05: Responsiveness
- **Pre-Conditions**  
  - None.  
- **Steps**  
  1. Resize viewport to mobile/tablet/desktop widths.  
- **Expected Result**  
  - Layout adapts correctly.

---

## 3. Food Item Customization

#### TC-FIC-01: Choose spice level & toppings
- **Pre-Conditions**  
  - Item supports customization.  
- **Steps**  
  1. Select an item.  
  2. Pick spice level & toppings.  
- **Expected Result**  
  - Selections reflected in modal and cart.

#### TC-FIC-02: Invalid customization option
- **Pre-Conditions**  
  - Item does not support that option.  
- **Steps**  
  1. Attempt to select unavailable topping.  
- **Expected Result**  
  - Option disabled or error shown.

#### TC-FIC-03: Multiple customizations
- **Pre-Conditions**  
  - Item has more than one add-on.  
- **Steps**  
  1. Select multiple add-ons.  
- **Expected Result**  
  - All selections applied, price correct.

#### TC-FIC-04: Cancel/revert customization
- **Pre-Conditions**  
  - Customization modal open.  
- **Steps**  
  1. Make changes.  
  2. Click **Cancel**.  
- **Expected Result**  
  - No changes persisted.

---

## 4. Shopping Cart

#### TC-SC-01: Add item to cart
- **Pre-Conditions**  
  - Menu visible.  
- **Steps**  
  1. Click **Add to Cart** on an item.  
- **Expected Result**  
  - Item appears in cart with correct details.

#### TC-SC-02: Remove item from cart
- **Pre-Conditions**  
  - Cart contains at least one item.  
- **Steps**  
  1. Click remove icon next to item.  
- **Expected Result**  
  - Item removed, subtotal updates.

#### TC-SC-03: Update quantity
- **Pre-Conditions**  
  - Item in cart.  
- **Steps**  
  1. Change quantity input (e.g., 1 → 2).  
- **Expected Result**  
  - Quantity and total price update.

#### TC-SC-04: Cart persistence
- **Pre-Conditions**  
  - User logged in.  
- **Steps**  
  1. Add items.  
  2. Refresh page or restart browser.  
- **Expected Result**  
  - Cart state restored.

#### TC-SC-05: Clear cart
- **Pre-Conditions**  
  - Cart non-empty.  
- **Steps**  
  1. Click **Clear Cart**.  
  2. Confirm if prompted.  
- **Expected Result**  
  - Cart empties, total resets.

---

## 5. Order Processing

#### TC-OP-01: Place order successfully
- **Pre-Conditions**  
  - User logged in, valid cart, payment gateway stubbed.  
- **Steps**  
  1. Go to checkout.  
  2. Submit order.  
- **Expected Result**  
  - Confirmation message and order ID shown.

#### TC-OP-02: Order status updates
- **Pre-Conditions**  
  - Order exists.  
- **Steps**  
  1. Simulate backend status change (Preparing → Ready).  
  2. Poll `/order/:id/status`.  
- **Expected Result**  
  - UI reflects new status.

#### TC-OP-03: Scheduled order
- **Pre-Conditions**  
  - Scheduling feature enabled.  
- **Steps**  
  1. Select future pickup/delivery time.  
  2. Place order.  
- **Expected Result**  
  - Order queued, not processed immediately.

#### TC-OP-04: Cancel order before prep
- **Pre-Conditions**  
  - Order placed but not yet preparing.  
- **Steps**  
  1. Click **Cancel** in order history.  
- **Expected Result**  
  - Order status changes to “Cancelled.”

#### TC-OP-05: Invalid payment handling
- **Pre-Conditions**  
  - Payment gateway configured.  
- **Steps**  
  1. Supply invalid card details.  
  2. Submit payment.  
- **Expected Result**  
  - Error shown, no order created.

---

## 6. Payment Processing

#### TC-PP-01: Valid card
- **Pre-Conditions**  
  - Stripe/PayPal sandbox keys in place.  
- **Steps**  
  1. Enter valid test card details.  
  2. Submit payment.  
- **Expected Result**  
  - PaymentSuccess response.

#### TC-PP-02: Invalid card
- **Pre-Conditions**  
  - Payment gateway operational.  
- **Steps**  
  1. Enter expired or incorrect card details.  
  2. Submit payment.  
- **Expected Result**  
  - Error displayed, remain on checkout.

#### TC-PP-03: Multi-gateway support
- **Pre-Conditions**  
  - Both Stripe and PayPal configured.  
- **Steps**  
  1. Select each gateway and complete a payment flow.  
- **Expected Result**  
  - Both gateways succeed independently.

#### TC-PP-04: Automatic retry on transient failure
- **Pre-Conditions**  
  - Simulated network error.  
- **Steps**  
  1. Trigger network drop during payment.  
- **Expected Result**  
  - System retries or prompts user to retry.

#### TC-PP-05: Security compliance
- **Pre-Conditions**  
  - HTTPS enabled.  
- **Steps**  
  1. Inspect network traffic in dev tools.  
- **Expected Result**  
  - No plaintext card data; TLS in use.

---

## 7. Table Reservation System

#### TC-TR-01: Create reservation
- **Pre-Conditions**  
  - User logged in.  
- **Steps**  
  1. Navigate to `/reservations`.  
  2. Select date, time, number of guests.  
  3. Submit reservation.  
- **Expected Result**  
  - Confirmation displayed.

#### TC-TR-02: Prevent double-booking
- **Pre-Conditions**  
  - Slot already booked in DB.  
- **Steps**  
  1. Attempt to book same slot again.  
- **Expected Result**  
  - Conflict error message.

#### TC-TR-03: Modify reservation
- **Pre-Conditions**  
  - Existing reservation present.  
- **Steps**  
  1. Edit reservation details.  
  2. Save changes.  
- **Expected Result**  
  - Updated confirmation displayed.

#### TC-TR-04: Cancel reservation
- **Pre-Conditions**  
  - Reservation within cancellation window.  
- **Steps**  
  1. Click **Cancel** on reservation.  
- **Expected Result**  
  - Reservation removed; slot freed.

#### TC-TR-05: Reminder notification
- **Pre-Conditions**  
  - Reminder service active.  
- **Steps**  
  1. Simulate time to 1 hour before reservation.  
- **Expected Result**  
  - Email/SMS reminder sent.

---

## 8. Staff Dashboard

#### TC-SD-01: Staff login & access
- **Pre-Conditions**  
  - Staff account exists.  
- **Steps**  
  1. Log in with staff credentials.  
- **Expected Result**  
  - Redirected to staff dashboard; no admin controls visible.

#### TC-SD-02: View & update orders
- **Pre-Conditions**  
  - Pending orders exist.  
- **Steps**  
  1. Update order status (e.g., Preparing → Ready).  
- **Expected Result**  
  - Status updates propagate to customer UI.

#### TC-SD-03: Reservation management
- **Pre-Conditions**  
  - Reservations pending approval.  
- **Steps**  
  1. Approve or reject reservation.  
- **Expected Result**  
  - Customer sees updated status.

#### TC-SD-04: Low-stock alerts
- **Pre-Conditions**  
  - Inventory threshold configured.  
- **Steps**  
  1. Deplete item stock below threshold.  
- **Expected Result**  
  - Staff dashboard shows low stock alert.

#### TC-SD-05: Role-based access control
- **Pre-Conditions**  
  - Staff and admin roles exist.  
- **Steps**  
  1. Log in as staff; attempt admin-only action.  
- **Expected Result**  
  - Access denied or error returned.

---

## 9. Inventory Management System

#### TC-IMS-01: Deduct stock on completion
- **Pre-Conditions**  
  - Inventory levels set.  
- **Steps**  
  1. Complete an order.  
- **Expected Result**  
  - Correct deduction in database.

#### TC-IMS-02: Demand prediction
- **Pre-Conditions**  
  - Historical data present.  
- **Steps**  
  1. Run the forecasting function.  
- **Expected Result**  
  - Reasonable restock amounts returned.

#### TC-IMS-03: Low-stock notification
- **Pre-Conditions**  
  - Threshold configured.  
- **Steps**  
  1. Reduce stock below threshold.  
- **Expected Result**  
  - Notification event emitted.

#### TC-IMS-04: Mark out-of-stock
- **Pre-Conditions**  
  - Stock for item = 0.  
- **Steps**  
  1. Refresh `/menu`.  
- **Expected Result**  
  - Item hidden or flagged as unavailable.

---

## 10. Admin Panel

#### TC-AP-01: Admin login & access
- **Pre-Conditions**  
  - Admin user exists.  
- **Steps**  
  1. Log in as admin.  
- **Expected Result**  
  - Access to admin panel granted.

#### TC-AP-02: CRUD menu items
- **Pre-Conditions**  
  - Existing menu entries.  
- **Steps**  
  1. Create, update, and delete a menu item.  
- **Expected Result**  
  - Changes persist and reflect on client menu.

#### TC-AP-03: Approve/reject reservations
- **Pre-Conditions**  
  - Pending reservations exist.  
- **Steps**  
  1. Approve or reject a reservation request.  
- **Expected Result**  
  - Customer sees updated reservation status.

#### TC-AP-04: Generate reports
- **Pre-Conditions**  
  - Order history available.  
- **Steps**  
  1. Select date range and generate sales report.  
- **Expected Result**  
  - Accurate analytics displayed.

#### TC-AP-05: Manage user roles
- **Pre-Conditions**  
  - Multiple user roles defined.  
- **Steps**  
  1. Change a user’s role (e.g., staff → admin).  
- **Expected Result**  
  - Permissions update on next login.

---

## 11. Customer Order Tracking

#### TC-COT-01: Real-time status updates
- **Pre-Conditions**  
  - Active order in system.  
- **Steps**  
  1. Poll `/order/:id/status`.  
- **Expected Result**  
  - UI shows the latest status.

#### TC-COT-02: Delivery tracking
- **Pre-Conditions**  
  - GPS integration stubbed.  
- **Steps**  
  1. View the order tracking map.  
- **Expected Result**  
  - Driver location marker displayed.

#### TC-COT-03: Completion notification
- **Pre-Conditions**  
  - Order marked “Completed.”  
- **Steps**  
  1. Check notification area.  
- **Expected Result**  
  - “Your order is complete” message shown.

---

## 12. Notifications & Alerts

#### TC-NA-01: Email/SMS on order placement
- **Pre-Conditions**  
  - Twilio/SendGrid configured.  
- **Steps**  
  1. Place an order.  
- **Expected Result**  
  - Confirmation sent via email/SMS.

#### TC-NA-02: Push notification on status change
- **Pre-Conditions**  
  - Browser notifications enabled.  
- **Steps**  
  1. Change order status (Preparing → Ready).  
- **Expected Result**  
  - Push notification received.

#### TC-NA-03: Low-stock alert to staff
- **Pre-Conditions**  
  - Inventory threshold configured.  
- **Steps**  
  1. Deplete stock below threshold.  
- **Expected Result**  
  - Staff sees low-stock alert.

#### TC-NA-04: Reservation reminder
- **Pre-Conditions**  
  - Reminder schedule configured.  
- **Steps**  
  1. Fast-forward to reminder time.  
- **Expected Result**  
  - Email/SMS reminder sent to user.

---

## 13. Theme Adaptation

#### TC-TA-01: Detect OS theme
- **Pre-Conditions**  
  - Browser set to dark mode.  
- **Steps**  
  1. Load the site.  
- **Expected Result**  
  - UI switches to dark theme automatically.

#### TC-TA-02: Manual theme toggle
- **Pre-Conditions**  
  - Toggle switch present in UI.  
- **Steps**  
  1. Click theme toggle.  
- **Expected Result**  
  - UI instantly switches between light/dark themes.

---

## 14. Google Maps Integration

#### TC-GMI-01: Restaurant location display
- **Pre-Conditions**  
  - Valid Google Maps API key.  
- **Steps**  
  1. Navigate to `/contact` or “Locations” page.  
- **Expected Result**  
  - Map centers on the restaurant’s address.

#### TC-GMI-02: Directions link
- **Pre-Conditions**  
  - Geolocation permission granted.  
- **Steps**  
  1. Click **Get Directions**.  
- **Expected Result**  
  - External Google Maps opens with route.

#### TC-GMI-03: Driver tracking (simulated)
- **Pre-Conditions**  
  - Driver location stub available.  
- **Steps**  
  1. View live order tracking.  
- **Expected Result**  
  - Driver marker moves on map.


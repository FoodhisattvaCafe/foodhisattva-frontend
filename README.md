
# FoodSattva (Foodhisattva V2)

## Project Name and Brief Description
**FoodSattva** (previously known as Foodhisattva V2) is a smart, web-based restaurant management platform designed to improve customer experience and streamline restaurant operations. It helps customers to browse menus, customize and place orders, reserve tables, and track orders. For restaurant staff and managers, it provides dashboards to manage orders, inventory, and reservations.

**Who is it for?**
- Customers of Foodhisattva Café
- Restaurant staff and administrators

**GitHub Repository:** [Foodhisattva Frontend Repository](https://github.com/FoodhisattvaCafe/foodhisattva-frontend)

---

## Architecture

**System Overview:**
- **Frontend:** React.js + Next.js (with Redux for state management)
- **Backend:** Node.js + Express.js (with TypeScript)
- **Database:** MongoDB/Firebase
- **Deployment:** AWS EC2 / Google Cloud Platform
- **External Services:** Stripe/PayPal (Payments), Google Maps API (Location), WebSockets (Real-time updates)

```
[ User ] <==> [ Frontend (React + Redux + Next.js) ] <==> [ Backend (Node.js + Express + TypeScript) ] <==> [ MongoDB / Firebase ]
                                                    \
                                                     --> [ 3rd Party APIs: Stripe, PayPal, Google Maps, WebSockets ]
```

---

## Getting Started / Installation

### Prerequisites:
- Node.js (v18+)
- npm or yarn
- MongoDB Atlas account or Firebase setup
- AWS/GCP account (for deployment)

### Installation Steps:

1. **Clone the Repository**
```bash
git clone https://github.com/FoodhisattvaCafe/foodhisattva-frontend
cd foodhisattva-frontend
```

2. **Install Frontend Dependencies**
```bash
cd client
npm install
```

3. **Install Backend Dependencies**
```bash
cd ../server
npm install
```

4. **Set up Environment Variables**
Create `.env` files in both `client/` and `server/` directories for API keys, database URIs, etc.

5. **Run Frontend**
```bash
cd client
npm run dev
```

6. **Run Backend**
```bash
cd ../server
npm run dev
```

The app will be available at `http://localhost:3000`.


##  Inventory Prediction Service (Prophet)

We use a lightweight Python-based microservice to predict future inventory needs using Meta's `Prophet` forecasting library. This helps reduce waste and improve stock planning.

###  How to Run the Inventory Prediction Server

1. **Navigate to the model directory**

```bash
cd foodhisattva-frontend/src/app/predict/ml-model
```

2. **Start the FastAPI server with Uvicorn**

```bash
uvicorn predict:app --reload --port 5000
```

Once started, the API will be accessible at:

```
http://localhost:3000/predict
```

You can now make HTTP requests from your frontend or backend to fetch inventory forecasts.

###  API Endpoints for Inventory Management Dashboard

| Method | Endpoint       | Description                                      |
|--------|----------------|--------------------------------------------------|
| POST   | `/predict`     | Accepts historical data and returns forecast     |
| GET    | `/predicts`    | Gets historical data and returns forecast        |
| GET    | `/recipies`    | Allows us to peform CRUD Operations on recipies  |
| GET    | `/recipies`    | Allows us to peform  CRUD Operations on sales    |


---

## Usage / Examples

- Visit the homepage to browse menus and view today's specials.
- Customize your order (choose toppings, spice levels).
- Add items to the cart and place your order with secure payment options.
- Track your order in real-time through the "My Orders" page.
- Reserve a table for future dining through the "Reservations" section.
- Admins can log into the dashboard to manage menus, inventory, and reservations.

---

## Folder Structure Overview
```
/
|-- client/                # Frontend (React/Next.js)
|    |-- components/       # Reusable UI components
|    |-- pages/            # Next.js pages
|    |-- public/           # Static assets
|    |-- redux/            # State management
|    |-- tests/            # Frontend unit tests
|
|-- server/                # Backend (Node.js/Express)
|    |-- controllers/      # API logic
|    |-- models/           # MongoDB schemas
|    |-- routes/           # API endpoints
|    |-- utils/            # Helper functions
|    |-- tests/            # Backend unit and integration tests
|
|-- docs/                  # Architecture diagrams, design documents
|-- README.md              # Project documentation
|-- testing.md             # Test strategy and cases
```

---

## Tech Stack / Dependencies
- **Frontend:** React.js, Next.js, Redux, Tailwind CSS, Framer Motion
- **Backend:** Node.js, Express.js, TypeScript
- **Database:** MongoDB Atlas, Firebase (optional)
- **Payments:** Stripe, PayPal
- **Authentication:** Firebase Authentication
- **Real-Time Updates:** WebSockets
- **Location Services:** Google Maps API
- **Testing:** Jest, React Testing Library, Postman, JMeter, Newman

---

## Contribution

| Name                  | Main Role                             |
|:----------------------|:--------------------------------------|
| Koushik Mannam         | Backend Development, API Integration  |
| Shikhara Pagadala      | Backend Development, API Integration  |
| Prasanna Kumar Peram   | Backend Development, Performance Testing |
| Vishnupriya Bathini    | Database Architecture & Optimization |
| Narasimha Lakavath     | Frontend Design & Development         |

---

## Development Retrospective

**Mistakes That Could Be Avoided:**
- Initially underestimated the effort needed for real-time order tracking and notifications.
- Delayed setting up proper CI/CD pipelines and automated testing.

**Cost-Effective Improvements:**
- Started implementing WebSocket-based updates earlier to reduce integration issues.
- Better separation between frontend and backend deployments from the beginning.
- Planned more robust error handling upfront for payment failures and inventory shortages.

---

## License

**License
This project is licensed under the MIT License - see the LICENSE file for details.**



---

# Financial Portfolio Management System

A **web-based application** built with **Angular** for managing financial portfolios.  
It allows users to track investments, view performance reports, and make informed decisions with the help of interactive charts and responsive UI design.

---

## Features

### 1. **Dashboard**

- Displays **asset allocation, market trends, and performance metrics**.
- **Interactive charts** to visualize portfolio performance over time.
- Responsive design for **mobile, tablet, and desktop** devices.

### 2. **Investment Form**

- Add investment details such as:
  - Asset type
  - Asset Name
  - Symbol
  - Quantity
  - Purchase price
  - Purchase date
- **Review inputs** before submission.
- **Validation** using Angular Reactive Forms.

### 3. **Best Practices Implemented**

-  Client-side **form validations**
-  **TypeScript type checks**
-  **Custom Pipes & Directives**
-  **HTTP Interceptors** for request handling
-  **Observables & Subjects** for data flow
-  **Lazy Loading** for optimized performance

---

##  Project Structure

```
financial-portfolio-management/
│── src/
│   ├── app/
│   │   ├── components/    # Dashboard, Forms, Charts
│   │   ├── services/      # Mock Services, API handling
│   │   ├── interceptors/  # State management
│   │   ├── pipes/         # Custom Pipes
│   │   ├── directives/    # Custom Directives
│   │   └── app.config.ts
│   └── assets/
│
│── angular.json
│── package.json
│── README.md
```

---

##  Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/Mercyglaret/financial-portfolio-management.git
cd financial-portfolio-management
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Run the Application

```bash
ng serve
```

The app will run at  **http://localhost:4200/**

---

##  Tech Stack

- **Frontend:** Angular, TypeScript, RxJS, HTML, SCSS
- **Charts:** ngx-echarts echarts
- **State Management:** Angular Store (BehaviorSubjects)
- **Testing:** Jasmine + Karma

---

##  Notes

- Backend is **mocked** using Angular services.

---

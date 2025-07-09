import React from "react";
import { Link } from "react-router-dom";
import "./Dashboard.css";

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      <main className="main-content">
        <h1>Welcome to Order & Inventory Management</h1>
        <div className="stats">
          <div className="card blue">
            <h3>Total Sales</h3>
            <p>$11,500</p>
          </div>
          <div className="card orange">
            <h3>Total Orders</h3>
            <p>420</p>
          </div>
          <div className="card purple">
            <h3>Total Revenue</h3>
            <p>$2,200</p>
          </div>
          <div className="card green">
            <h3>Visitors</h3>
            <p>4,320</p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;

import React from "react";
import Card from "../components/Card";
import LayoutCenter from "../components/LayoutCenter";
import MainPageNav from "../components/MainPageNav";
import "../css/home.css";
import { Navigate } from "react-router-dom";
import Logo from "../components/Logo";

export const DashboardPage = ({user}) => {
  if (!user) {
    return <Navigate to="/login" replace />;
  } else {
  return (
    <div>
      <MainPageNav />
      <LayoutCenter>
        <Card>
          <Logo/>
          <div style={{marginBottom:'30px'}}></div>
          <p>Hello {user.firstName}. Welcome!</p>
        </Card>
      </LayoutCenter>
    </div>
  );
  }
};

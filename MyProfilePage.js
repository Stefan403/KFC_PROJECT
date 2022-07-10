import React, { useEffect, useState } from "react";
import Card from "../components/Card";
import FormTitle from "../components/FormTitle";
import LayoutCenter from "../components/LayoutCenter";
import Logo from "../components/Logo";
import MainPageNav from "../components/MainPageNav";
import { Navigate } from "react-router-dom";

export const MyProfilePage = ( {user} ) => {
  if (!user) {
    return <Navigate to="/login" replace />;
  } else  {
    return (
      <div>
        <MainPageNav />
        <LayoutCenter>
          <Card>
          <Logo/>
          <div style={{marginTop:"15px"}}></div>
          <FormTitle title= "Account details"/>
          <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            justifyContent: "center",
          }}
        >
            <p>
              <b>First Name:</b> {user.firstName}
            </p>
            <p>
              <b>Last Name:</b> {user.lastName}
            </p>
            <p>
              <b>Email:</b> {user.email}
            </p>
            <p>
              <b>Function:</b> {user.function}
            </p>
            <p>
              <b>Joined since:</b> {user.createdAt}
            </p>
            </div>
          </Card>
        </LayoutCenter>
      </div>
 
    );
        }
     

};

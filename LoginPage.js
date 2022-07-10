import React from "react";
import LayoutCenter from "../components/LayoutCenter";
import Card from "../components/Card";
import LoginForm from "../components/LoginForm";
import FormPageHeader from "../components/FormPageHeader";

export const LoginPage = ({ ...props }) => {
  return (
    <div>
      <FormPageHeader />
      <LayoutCenter>
        <Card>
          <p className="mb-5 mt-5">Please login before continue.</p>
          <LoginForm {...props} />
        </Card>
      </LayoutCenter>
    </div>
  );
};

import React from "react";
import LayoutCenter from "../components/LayoutCenter";
import Card from "../components/Card";
import FormTitle from "../components/FormTitle";
import ForggotPasswordForm from "../components/ForggotPasswordForm";
import FormPageHeader from "../components/FormPageHeader";

export const ForggotPasswordPage = () => (
  <div>
    <FormPageHeader />
    <LayoutCenter>
      <Card>
        <FormTitle title="Forggot Password" />
        <p>Enter your email address</p>
        <ForggotPasswordForm />
      </Card>
    </LayoutCenter>
  </div>
);

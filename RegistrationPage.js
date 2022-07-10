import React from "react";
import LayoutCenter from "../components/LayoutCenter";
import Card from "../components/Card";
import RegisterForm from "../components/RegisterForm";
import FormTitle from "../components/FormTitle";
import FormPageHeader from "../components/FormPageHeader";

export const RegistrationPage = () => (
   <div>
   <FormPageHeader/>
  <LayoutCenter>
   <Card>
      <FormTitle title="Register"/>
      <RegisterForm/>
   </Card>
    </LayoutCenter>
    </div>
);

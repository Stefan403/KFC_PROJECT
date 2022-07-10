import React from "react";
import LayoutCenter from "../components/LayoutCenter";
import Card from "../components/Card";
import ChangePasswordForm from "../components/ChangePasswordForm";
import FormTitle from "../components/FormTitle";
import FormPageHeader from "../components/FormPageHeader";

export const ChangePasswordPage = () => (
  <div>
  <FormPageHeader/>
  <LayoutCenter>
   <Card>
      <FormTitle title="Change Password"/>
      <ChangePasswordForm/>
    </Card>
    </LayoutCenter>
    </div>
);

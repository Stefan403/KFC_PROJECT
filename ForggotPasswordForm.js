import React, { Fragment } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import useErrorSuccesReset from "./useErrorSuccesReset";
import ErrorMessage from "./ErrorMessage";
import SuccesMessage from "./SuccesMessage";
const ForggotPasswordForm = () => {
  
  const auth = useErrorSuccesReset();

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email address").required("Required"),
    }),
    onSubmit: async (values, actions) => {
      const result = await fetch('http://localhost:4000/api/users/forggot-password', {
         method: 'POST',
         headers: {
           Accept: '*/*',
           'Access-Control-Allow-Origin': '*',
           'Content-Type': 'application/json',
         },
         body : JSON.stringify({
           ...values
          })
       }).then(res=> res.json())

       if(result.status === 'ok'){
        auth.setSucces();
        actions.resetForm();
       } else {
         auth.setError();
         actions.resetForm();
       }
     },
  });
  return (
    <Fragment>
      {auth.errorText && <ErrorMessage message="No account for that email"/>  }
    {auth.succesText && <SuccesMessage message="Email has been sent"/>}

    <form style={{ width: "100%" }} onSubmit={formik.handleSubmit}>
      <div className="form-outline mb-4">
        <input
          type="email"
          id="email"
          className="form-control"
          onChange={formik.handleChange}
          value={formik.values.email}
        />
        {formik.errors.email ? (
          <div style={{ color: "red" }}>{formik.errors.email}</div>
        ) : null}
        <label className="form-label" htmFor="email">
          Email
        </label>
      </div>

      <button
        type="submit"
        className="btn btn-primary mb-4"
        style={{
          width: "100%",
          backgroundColor: "#d82122",
          borderColor: "#d82122",
        }}
      >
        Continue
      </button>

      <a
        href="/"
        style={{
          color: "#d82122",
          marginLeft: "10px",
          cursor: "pointer",
          textDecoration: "none",
        }}
      >
        Back to login
      </a>
    </form>
    </Fragment>
  );
};

export default ForggotPasswordForm;

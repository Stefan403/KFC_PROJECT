import React, { Fragment, useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import useErrorSuccesReset from "./useErrorSuccesReset";
import ErrorMessage from "./ErrorMessage";
import SuccesMessage from "./SuccesMessage";
import { useParams, useSearchParams } from "react-router-dom";
const ChangePasswordForm = () => {
const [localToken, setLoaclToken] = useState();
const params = useParams();
  useEffect(()=> {
     setLoaclToken(localStorage.getItem("toket"));
     console.log(params.token)
     let token = params.token.slice(6,params.token.length)
     setLoaclToken(token);

  }, [])
  const auth = useErrorSuccesReset();
  const formik = useFormik({
    initialValues: {
      password: "",
      passwordConfirmation: "",
    },
    validationSchema: Yup.object({
      password: Yup.string()
        .required("No password provided.")
        .min(8, "Password is too short - should be 8 chars minimum.")
        .matches(/[a-zA-Z]/, "Password can only contain Latin letters."),
      passwordConfirmation: Yup.string()
        .required("No password provided.")
        .min(8, "Password is too short - should be 8 chars minimum.")
        .matches(/[a-zA-Z]/, "Password can only contain Latin letters.")
        .oneOf([Yup.ref("password"), null], "Passwords must match"),
    }),

    onSubmit: async (values, actions ) => {
      const result = await fetch('http://localhost:4000/api/users/change-password', {
         method: 'POST',
         headers: {
           Accept: '*/*',
           'Access-Control-Allow-Origin': '*',
           'Content-Type': 'application/json',
         },
         body : JSON.stringify({
           newPassword:values.password,
           token:localToken
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
      {auth.errorText && <ErrorMessage message="Wrong signature"/>  }
    {auth.succesText && <SuccesMessage message="Password has been changed."/>}
    <form style={{ width: "100%" }} onSubmit={formik.handleSubmit}>
      <div className="form-outline mb-4">
        <input
          id="password"
          name="password"
          type="password"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.password}
          className="form-control"
        />
        {formik.errors.password ? (
          <div style={{ color: "red" }}>{formik.errors.password}</div>
        ) : null}
        <label className="form-label" htmlFor="password">
          Password
        </label>
      </div>
      <div className="form-outline mb-4">
        <input
          id="passwordConfirmation"
          name="passwordConfirmation"
          type="passwordConfirmation"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.passwordConfirmation}
          className="form-control"
        />
        {formik.errors.passwordConfirmation ? (
          <div style={{ color: "red" }}>
            {formik.errors.passwordConfirmation}
          </div>
        ) : null}
        <label className="form-label" htmlFor="passwordConfirmation">
          Confirm Password
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
       Submit
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
export default ChangePasswordForm;

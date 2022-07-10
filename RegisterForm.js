import React, { Fragment } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import ErrorMessage from "./ErrorMessage";
import SuccesMessage from "./SuccesMessage";
import useErrorSuccesReset from "./useErrorSuccesReset";

const RegisterForm = () => {
  
  const auth = useErrorSuccesReset();
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
    },
    validationSchema: Yup.object({
      firstName: Yup.string()
        .max(15, "Must be 15 characters or less")
        .required("Required"),
      lastName: Yup.string()
        .max(20, "Must be 20 characters or less")
        .required("Required"),
      email: Yup.string().email("Invalid email address").required("Required"),
      password: Yup.string()
        .required("No password provided.")
        .min(8, "Password is too short - should be 8 chars minimum.")
        .matches(/[a-zA-Z]/, "Password can only contain Latin letters."),
    }),

    onSubmit: async (values, actions) => {
     const result = await fetch('http://localhost:4000/api/users/register', {
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
    }
    },
  );
  return (
    <Fragment>
    {auth.errorText && <ErrorMessage message="Email already in use."/>  }
    {auth.succesText && <SuccesMessage message="Succesfully registered."/>}

    <form style={{ width: "100%" }} onSubmit={formik.handleSubmit}>
      <div class="row mb-4">
        <div class="col">
          <div class="form-outline">
            <input
              id="firstName"
              name="firstName"
              type="text"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.firstName}
              class="form-control"
            />
            {formik.errors.firstName ? (
              <div style={{ color: "red" }}>{formik.errors.firstName}</div>
            ) : null}
            <label class="form-label" htmlFor="firstName">
              First name
            </label>
          </div>
        </div>
        <div class="col">
          <div class="form-outline">
            <input
              id="lastName"
              name="lastName"
              type="text"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.lastName}
              class="form-control"
              
            />
            {formik.errors.lastName ? (
              <div style={{ color: "red" }}>{formik.errors.lastName}</div>
            ) : null}
            <label class="form-label" htmlFor="lastName">
              Last name
            </label>
          </div>
        </div>
      </div>
      <div className="form-outline mb-4">
        <input
          id="email"
          name="email"
          type="text"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.email}
          className="form-control"
        />
        {formik.errors.email ? (
          <div style={{ color: "red" }}>{formik.errors.email}</div>
        ) : null}
        <label className="form-label" htmlFor="email">
          Email address
        </label>
      </div>

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
        <label className="form-label" for="form2Example2">
          Password
        </label>
      </div>

      <div className="row mb-2">
        <div className="col d-flex justify-content-center"></div>
      </div>

      <button
        type="submit"
        className="btn btn-primary mb-3"
        style={{
          width: "100%",
          backgroundColor: "#d82122",
          borderColor: "#d82122",
        }}
      >
        Register
      </button>
      <a href="/" style={{ color: "#d82122", marginLeft:"10px", cursor:'pointer', textDecoration:"none" }} >
           Back to login
          </a>
    </form>
    </Fragment>
  );
};

export default RegisterForm;

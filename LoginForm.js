import React, { Fragment} from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import useErrorSuccesReset from "./useErrorSuccesReset";
import ErrorMessage from "./ErrorMessage";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";
const LoginForm = ({user}) => {
 const authMessage = useErrorSuccesReset();
 const auth = useAuth();
 const history = useNavigate();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email address").required("Required"),
      password: Yup.string()
        .required("No password provided.")
        .min(8, "Password is too short - should be 8 chars minimum.")
        .matches(/[a-zA-Z]/, "Password can only contain Latin letters."),
    }),
    onSubmit: async (values, actions) => {
      const result = await fetch('http://localhost:4000/api/users/login', {
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
         auth.signIn(result.user, result.token);
         history('/dashboard')
       } else {
         authMessage.setError();
         actions.resetForm();
       }
     }
  });

  return (
<Fragment>
    {authMessage.errorText && <ErrorMessage message="Sorry, incorrect email/password combination."/>}
    <form style={{ width: "100%" }} onSubmit={formik.handleSubmit}>
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
        <label className="form-label" htmlFor="form2Example2">
          Password
        </label>
      </div>

      <div className="row mb-4">
        <div className="col d-flex justify-content-center">
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              value=""
              id="form2Example31"
              style={{ backgroundColor: "#d82122", borderColor: "#d82122" }}
            />
            <label className="form-check-label" htmlFor="form2Example31">
              Remember me
            </label>
          </div>
        </div>

        <div className="col">
          <a
            href="/forggotpassword"
            style={{ color: "#d82122", marginLeft: "10px", cursor: "pointer" }}
          >
            Forgot password?
          </a>
        </div>
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
        Sign in
      </button>

      <div className="text-center">
        <p>
          Not a member?
          <a
            href="/registration"
            style={{ color: "#d82122", marginLeft: "10px", cursor: "pointer" }}
          >
            Register
          </a>
        </p>
      </div>
    </form>
    </Fragment>

  );
};

export default LoginForm;

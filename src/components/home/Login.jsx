import React, { useState } from "react";
import { registerUser, signIn, updateDocRequest } from "../../db/ops/authOps";

function Login({ docRequests }) {
  const initState = {
    email: "",
    password: "",
  };
  const [loading, setLoading] = useState(false);
  const [loginState, setLoginState] = useState(initState);

  const handleChange = (e) => {
    setLoginState((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let foundDocReq = null;
    if (docRequests) {
      docRequests.forEach((docReq, i) => {
        if (
          docReq.email === loginState.email &&
          docReq.password === loginState.password &&
          docReq.pendingApproval === false
        ) {
          foundDocReq = docReq;
          console.log(docReq);
        }
      });
    }

    if (foundDocReq === null) {
      console.log("not doc found");
      setLoginState({
        ...initState,
      });
      setLoading(true);
      await signIn(loginState.email, loginState.password);
      setLoading(false);
    } else if (foundDocReq !== null) {
      console.log("doc found");
      if (!foundDocReq.userCreated) {
        setLoginState({
          ...initState,
        });
        setLoading(true);
        await registerUser(foundDocReq);
        await updateDocRequest(foundDocReq, true);
        setLoading(false);
      } else {
        setLoginState({
          ...initState,
        });
        setLoading(true);
        await signIn(loginState.email, loginState.password);
        setLoading(false);
      }
    }
  };

  return (
    <div className="container-fluid">
      <div className="mt-20"></div>
      <div className="row">
        <div className="col"></div>
        <div className="col-8 col-lg-6">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="required">Email</label>
              <input
                type="email"
                className="form-control"
                id="email"
                name="email"
                placeholder="Enter Email"
                required="required"
                value={loginState.email}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label className="required">Password</label>
              <input
                type="password"
                className="form-control"
                id="password"
                name="password"
                pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                title="Must contain at least one  number and one uppercase and lowercase letter, and at least 8 or more characters"
                placeholder="Enter Password"
                required="required"
                value={loginState.password}
                onChange={handleChange}
              />
            </div>

            <button
              className="btn btn-danger btn-sm"
              type="submit"
              disabled={loading || (docRequests && !docRequests.length > 0)}
            >
              Login
            </button>
          </form>
        </div>
        <div className="col"></div>
      </div>
    </div>
  );
}
export default Login;

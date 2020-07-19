import { useState } from "react";
import useRequest from "../../hooks/useRequest";
import Router from "next/router";

export default () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [doRequest, errors] = useRequest({
    url: "/api/users/signup",
    method: "post",
    body: {
      email,
      password,
    },
    onSuccess: () => {
      Router.push("/");
    },
  });
  const onSubmit = async (e) => {
    e.preventDefault();
    doRequest();
  };
  return (
    <div className="row">
      <div className="col-md-6 mt-2 mx-auto">
        {errors}
        <form onSubmit={onSubmit}>
          <div className="card">
            <h3 className="card-header text-center">Signup</h3>
            <div className="card-body">
              <div className="form-group">
                <label htmlFor="email" className="form-label">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="form-control"
                />
              </div>
              <div className="form-group">
                <label htmlFor="password" className="form-label">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="form-control"
                />
              </div>
            </div>
            <div className="card-footer">
              <input
                type="submit"
                value="Signup"
                className="btn btn-sm btn-primary"
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

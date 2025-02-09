import React, { useState } from "react";
import { Link } from "react-router-dom";
import { signupUser } from "../../api/auth";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { hiddenLoader, showLoader } from "../../redux/loaderSlice";

export default function SignUp() {
  const dispatch = useDispatch();
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const handleSubmit = async (e) => {
    e.preventDefault();
    let res = null;
    try {
      dispatch(showLoader());
      res = await signupUser(user);
      dispatch(hiddenLoader());
      if (res.success) {
        toast.success(res.message);
      } else {
        toast.error(res.response.data.message);
      }
    } catch (error) {
      dispatch(hiddenLoader());
      toast.error(res.message);
    }
  };

  return (
    <div className="container">
      <div className="container-back-img"></div>
      <div className="container-back-color"></div>
      <div className="card">
        <div className="card_title">
          <h1>Create Account</h1>
        </div>
        <div className="form">
          <form onSubmit={handleSubmit}>
            <div className="column">
              <input
                onChange={(e) =>
                  setUser({ ...user, firstName: e.target.value })
                }
                value={user.firstName}
                type="text"
                placeholder="First Name"
              />
              <input
                onChange={(e) => setUser({ ...user, lastName: e.target.value })}
                value={user.lastName}
                type="text"
                placeholder="Last Name"
              />
            </div>
            <input
              onChange={(e) => setUser({ ...user, email: e.target.value })}
              value={user.email}
              type="email"
              placeholder="Email"
            />
            <input
              onChange={(e) => setUser({ ...user, password: e.target.value })}
              value={user.password}
              type="password"
              placeholder="Password"
            />
            <button>Sign Up</button>
          </form>
        </div>
        <div className="card_terms">
          <span>
            Already have an account?
            <Link to={"/login"}>Login</Link>
          </span>
        </div>
      </div>
    </div>
  );
}

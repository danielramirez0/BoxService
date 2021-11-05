import { useNavigate } from "react-router-dom";
import useForm from "../../components/useForm/useForm";
import { useEffect, useState } from "react";
import { loginUser } from "../../services/user";
import FloatingLabelInput from "../../components/FormGroups/FloatingLabelInput";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";

const Login = () => {
  const { values, handleChange, handleSubmit, clearValues } = useForm(login);

  const [jwt, setJwt] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    clearValues();
  }, [jwt]);

  const getJwt = async () => {
    let credentials = {
      username: values.loginUsername,
      password: values.loginPassword,
    };
    const response = await loginUser(
      credentials,
      "http://localhost:8000/api/auth/login/"
    );
    if (response) {
      const { access } = response.data;
      setJwt(access);
    } else {
      console.log("Unable to login");
      setLoading(false)
      return false;
    }
    setLoading(false);
    return true;
  };

  function login() {
    getJwt();
    setLoading(true);
    while (isLoading) {}
  }
  if (jwt) {
    navigate("/");
  }

  return (
    <div className="row mb-4" id="login-container">
      <h1>Account Login</h1>
      <small>
        Manage your subscription & other information regarding your account
      </small>
      <form onSubmit={handleSubmit} className="col-md-4 ms-auto me-auto">
        <fieldset>
          <div className="form-group">
            <label className="form-label mt-4">Don't have an account?</label>
            <span className="p-3">
              <a href="/register">Register</a>
            </span>

            <FloatingLabelInput
              inputType="text"
              divClasses="form-floating mb-3"
              inputId="loginUsername"
              inputValue={values.loginUsername}
              handleChange={handleChange}
              labelText="Username"
              placeholderText="Username"
            />

            <FloatingLabelInput
              inputType="password"
              divClasses="form-floating"
              inputId="loginPassword"
              inputValue={values.loginPassword}
              handleChange={handleChange}
              labelText="Password"
              placeholderText="Password"
            />
          </div>
          <div className="form-input m-3">
            <Button
              variant="primary"
              type="submit"
              disabled={isLoading ? true : false}
            >
              {isLoading ? (
                <>
                  <Spinner
                    as="span"
                    animation="border"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                  />
                  <span className="visually-hidden">Loading...</span>
                </>
              ) : (
                "Login"
              )}
            </Button>
          </div>
        </fieldset>
      </form>
    </div>
  );
};

export default Login;

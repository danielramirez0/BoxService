import { useNavigate } from "react-router-dom";
import useForm from "../../components/useForm/useForm";
import { useEffect, useState } from "react";
import { getUser, loginUser } from "../../services/user";
import FloatingLabelInput from "../../components/FormGroups/FloatingLabelInput";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
import jwtDecode from "jwt-decode";

const Login = (props) => {
  const { values, handleChange, handleSubmit, clearValues } = useForm(login);

  const [jwt, setJwt] = useState(localStorage.getItem("JWT"));
  const [isLoading, setLoading] = useState(false);
  const [baseURL] = useState("http://localhost:8000/api/");
  const navigate = useNavigate();

  useEffect(() => {
    onLoad();
  }, []);

  useEffect(() => {
    clearValues();
    if (jwt) {
      localStorage.setItem("JWT", jwt);
      props.toggleAuth();
      navigate("/profile");
    }
  }, [jwt]);

  const getJwt = async () => {
    setLoading(true);
    let credentials = {
      username: values.loginUsername,
      password: values.loginPassword,
    };
    const response = await loginUser(credentials, `${baseURL}auth/login/`);
    if (response) {
      const { access, refresh } = response.data;
      setJwt(access);
      localStorage.setItem("refreshToken", refresh);
    } else {
      //TODO Toast or modal with bad credentials, prompt to register
    }
    setLoading(false);
  };

  function login() {
    getJwt();
  }

  function onLoad() {
    if (jwt) {
      const decode = jwtDecode(jwt);
      let user = getUser(`${baseURL}auth/user/?user=${decode.user_id}`);
      if (user.survey_complete) {
        navigate("/profile");
      }
    }
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

            <div className="form-floating mb-3">
              <FloatingLabelInput
                inputClasses="form-control"
                inputType="text"
                inputId="loginUsername"
                inputValue={values.loginUsername}
                handleChange={handleChange}
                labelText="Username"
                placeholderText="Username"
              />
            </div>

            <div className="form-floating">
              <FloatingLabelInput
                inputClasses="form-control"
                inputType="password"
                inputId="loginPassword"
                inputValue={values.loginPassword}
                handleChange={handleChange}
                labelText="Password"
                placeholderText="Password"
              />
            </div>
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

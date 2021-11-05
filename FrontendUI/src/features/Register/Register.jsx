import { useNavigate } from "react-router-dom";
import useForm from "../../components/useForm/useForm";
import LabeledInput from "../../components/FormGroups/LabeledInput";
import { useEffect, useState } from "react";
import isOkPass, { registerNewUser, postNewProfile } from "../../services/user";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";

const Register = () => {
  const { errors, values, handleChange, handleSubmit, clearValues } =
    useForm(registerUser);

  const [isRegistered, setIsRegistered] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (isRegistered) {
      navigate("/");
    }
  }, [isRegistered]);

  async function registerUser() {
    if (values.setupPassword) {
      if (isOkPass(values.setupPassword)) {
        // Formats the object with structure needed for backend
        const { confirmPassword, setupPassword, ...newUser } = {
          password: values.setupPassword,
          ...values,
        };

        setLoading(true);
        const response = await registerNewUser(
          newUser,
          "http://127.0.0.1:8000/api/auth/register/"
        );

        if (response) {
          //TODO Toast here registration successfull
        } else {
          //TODO Modal with issue
        }
      } else {
        //TODO Toast invalid password
      }
      setIsRegistered(true);
    }
  }

  return (
    <div className="row mb-4" id="register-container">
      <form onSubmit={handleSubmit} className="col-md-4 ms-auto me-auto">
        <fieldset>
          <legend>New User Registration</legend>

          {!isRegistered && (
            <>
              <LabeledInput
                inputId="username"
                labelText="Username"
                inputType="text"
                inputValue={values.username}
                handleChange={handleChange}
                required={true}
              />

              <LabeledInput
                inputId="setupPassword"
                labelText="Password"
                inputType="password"
                inputValue={values.setupPassword}
                handleChange={handleChange}
                required={true}
              />

              {<small>{errors.setupPassword}</small> || !errors.setupPassword}

              <LabeledInput
                inputId="confirmPassword"
                labelText="Confirm Password"
                inputType="password"
                inputValue={values.confirmPassword}
                handleChange={handleChange}
                required={true}
              />

              {<small>{errors.confirmPassword}</small> ||
                !errors.confirmPassword}

              <LabeledInput
                inputId="email"
                labelText="Email address"
                inputType="email"
                inputValue={values.email}
                handleChange={handleChange}
                required={true}
              />

              <LabeledInput
                inputId="first_name"
                labelText="First Name"
                inputType="text"
                inputValue={values.first_name}
                handleChange={handleChange}
                required={true}
              />

              <LabeledInput
                inputId="middle_name"
                labelText="Middle Name"
                inputType="text"
                inputValue={values.middle_name}
                handleChange={handleChange}
                required={true}
              />

              <LabeledInput
                inputId="last_name"
                labelText="Last Name"
                inputType="text"
                inputValue={values.last_name}
                handleChange={handleChange}
                required={true}
              />
            </>
          )}
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
                "Register"
              )}
            </Button>
          </div>
        </fieldset>
      </form>
    </div>
  );
};

export default Register;

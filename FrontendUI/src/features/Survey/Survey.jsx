import { useNavigate } from "react-router-dom";
import useForm from "../../components/useForm/useForm";
import LabeledInput from "../../components/FormGroups/LabeledInput";
import { useEffect, useState } from "react";
import isOkPass, { registerNewUser, postNewProfile } from "../../services/user";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import FloatingLabelInput from "../../components/FormGroups/FloatingLabelInput";

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
      <h1>Complete this surey with your interests</h1>
      <form onSubmit={handleSubmit} className="col-md-4 ms-auto me-auto">
        <fieldset className="form-group">
          {!isRegistered && (
            <>
              <legend>Desired Platforms</legend>
              <small className="m-3">Check all that apply</small>

              <div className="row">
                <div className="col">
                  <FloatingLabelInput
                    divClasses="form-check mt-2 text-left"
                    inputId="NES"
                    labelText="NES"
                    inputType="checkbox"
                    inputValue="NES"
                    inputClasses="form-check-input"
                    handleChange={handleChange}
                  />
                </div>
                <div className="col">
                  <FloatingLabelInput
                    divClasses="form-check mt-2 text-left"
                    inputId="NES"
                    labelText="NES"
                    inputType="checkbox"
                    inputValue="NES"
                    inputClasses="form-check-input"
                    handleChange={handleChange}
                  />
                </div>
                <div className="col">
                  <FloatingLabelInput
                    divClasses="form-check mt-2 text-left"
                    inputId="NES"
                    labelText="NES"
                    inputType="checkbox"
                    inputValue="NES"
                    inputClasses="form-check-input"
                    handleChange={handleChange}
                  />
                </div>
              </div>
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
                "Next"
              )}
            </Button>
          </div>
        </fieldset>
      </form>
    </div>
  );
};

export default Register;

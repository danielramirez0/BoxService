import { useNavigate } from "react-router-dom";
import useForm from "../../components/useForm/useForm";
import LabeledInput from "../../components/FormGroups/LabeledInput";
import { useEffect, useState } from "react";
import isOkPass, { registerNewUser, postNewProfile } from "../../services/user";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
import FloatingLabelInput from "../../components/FormGroups/FloatingLabelInput";
import { getAllPlatforms } from "../../services/games";

const Survey = () => {
  const { errors, values, handleChange, handleSubmit, clearValues } =
    useForm(submitSurvey);

  const [isLoading, setLoading] = useState(false);
  const [platforms, setPlatforms] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    onLoad();
  }, []);

  async function onLoad() {
    setLoading(true);
    let platforms = await getAllPlatforms(
      "http://127.0.0.1:8000/api/games/platforms/all/"
    );
    if (platforms) {
      setPlatforms(platforms);
    }
    setLoading(false);
  }

  function submitSurvey() {}

  return (
    <div className="row mb-4" id="register-container">
      <h1>Complete this surey with your interests</h1>
      <form onSubmit={handleSubmit} className="col-md-4 ms-auto me-auto">
        <fieldset className="form-group">
          <legend>Desired Platforms</legend>
          <small className="m-3">Check all that apply</small>

          <div className="row">
            {platforms.map((platform, index) => (
              <div key={index} className="col">
                <FloatingLabelInput
                  divClasses="form-check mt-2 text-left"
                  inputId={platform.platform_name}
                  labelText={platform.platform_name}
                  inputType="checkbox"
                  inputValue={platform.platform_name}
                  inputClasses="form-check-input"
                  handleChange={handleChange}
                />
              </div>
            ))}
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
                "Next"
              )}
            </Button>
          </div>
        </fieldset>
      </form>
    </div>
  );
};

export default Survey;

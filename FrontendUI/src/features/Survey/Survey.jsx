import { useNavigate } from "react-router-dom";
import useForm from "../../components/useForm/useForm";
import LabeledInput from "../../components/FormGroups/LabeledInput";
import { useEffect, useState } from "react";
import { postSurveyAnswers } from "../../services/user";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
import FloatingLabelInput from "../../components/FormGroups/FloatingLabelInput";
import { getAllObjectsAt } from "../../services/games";
import jwtDecode from "jwt-decode";
import "./survey.css";
import axios from "axios";

const Survey = () => {
  const { errors, values, handleChange, handleSubmit, clearValues } =
    useForm(submitSurvey);

  const [isLoading, setLoading] = useState(false);
  const [showPlatforms, setShowPlatforms] = useState(true);
  const [showPublishers, setShowPublishers] = useState(false);
  const [showGenres, setShowGenres] = useState(false);
  const [platforms, setPlatforms] = useState([]);
  const [publishers, setPublishers] = useState([]);
  const [genres, setGenres] = useState([]);
  const [user, setUser] = useState({});
  const [answers, setAnswers] = useState({
    platforms: [],
    publishers: [],
    genres: [],
  });

  const navigate = useNavigate();

  useEffect(() => {
    onLoad();
  }, []);

  useEffect(() => {
    console.log(answers);
  }, [answers]);

  async function onLoad() {
    setLoading(true);
    let jwt = localStorage.getItem("JWT");
    if (jwt) {
      const decoded = jwtDecode(jwt);
      setUser(decoded);
    }
    let platforms = await getAllObjectsAt(
      "http://127.0.0.1:8000/api/games/platforms/all/"
    );
    let publishers = await getAllObjectsAt(
      "http://127.0.0.1:8000/api/games/publishers/all/"
    );
    let genres = await getAllObjectsAt(
      "http://127.0.0.1:8000/api/games/genres/all/"
    );
    if (platforms && publishers && genres) {
      setPlatforms(platforms);
      setPublishers(publishers);
      setGenres(genres);
      setLoading(false);
    }
  }

  function updateAnswers() {
    if (showPlatforms) {
      let selectedPlatforms = [];
      for (const value in values) {
        selectedPlatforms.push({
          id: value,
          platform_name: values[value],
        });
      }
      setAnswers({ ...answers, platforms: selectedPlatforms });
      setShowPlatforms(false);
      setShowPublishers(true);
      clearValues();
    }
    if (showPublishers) {
      let selectedPublishers = [];
      for (const value in values) {
        selectedPublishers.push({
          id: value,
          publisher_name: values[value],
        });
      }
      setAnswers({ ...answers, publishers: selectedPublishers });
      setShowPublishers(false);
      setShowGenres(true);
      clearValues();
    }
    if (showGenres) {
      let selectedGenres = [];
      for (const value in values) {
        selectedGenres.push({ id: value, genre_name: values[value] });
      }
      setAnswers({ ...answers, genres: selectedGenres });
      clearValues();
      setShowGenres(false);
    }
  }

  async function submitSurvey() {
    setLoading(true);
    await postSurveyAnswers(user, "http://127.0.0.1:8000/api/surveys/submit/");
    setLoading(false);
  }

  return (
    <div className="row mb-4">
      <h1>Tell us what you like</h1>
      <form onSubmit={handleSubmit} className="col-md ms-auto me-auto">
        <fieldset className="form-group">
          {showPlatforms || showPublishers || showGenres ? (
            <>
              <legend>
                Choose your favorite
                {showPlatforms
                  ? " platforms!"
                  : showPublishers
                  ? " publishers!"
                  : " genres!"}
              </legend>
              <small className="m-3">Select 1 or more</small>
            </>
          ) : (
            <h3>Here are your selections</h3>
          )}

          <div className="row mt-4">
            {showPlatforms && (
              //   <div className="col-6 ms-auto me-auto mt-4">
              <div className="col-4 ms-auto me-auto mt-2 list-wrapper">
                {platforms.map((platform) => (
                  <div key={platform.id} className="form-check">
                    <FloatingLabelInput
                      inputId={platform.platform_name}
                      databaseId={platform.id}
                      labelText={platform.platform_name}
                      inputType="checkbox"
                      inputValue={platform.platform_name}
                      inputClasses="form-check-input"
                      handleChange={handleChange}
                    />
                  </div>
                ))}
              </div>
            )}

            {showPublishers && (
              <div className="col-4 ms-auto me-auto mt-4 list-wrapper">
                {publishers.map((publisher) => (
                  <div key={publisher.id} className="form-check mt-2">
                    <FloatingLabelInput
                      inputId={publisher.publisher_name}
                      databaseId={publisher.id}
                      labelText={publisher.publisher_name}
                      inputType="checkbox"
                      inputValue={publisher.publisher_name}
                      inputClasses="form-check-input"
                      handleChange={handleChange}
                    />
                  </div>
                ))}
              </div>
            )}

            {showGenres && (
              <div className="col-4 ms-auto me-auto mt-4 list-wrapper">
                {genres.map((genre) => (
                  <div key={genre.id} className="form-check mt-2">
                    <FloatingLabelInput
                      inputId={genre.genre_name}
                      databaseId={genre.id}
                      labelText={genre.genre_name}
                      inputType="checkbox"
                      inputValue={genre.genre_name}
                      inputClasses="form-check-input"
                      handleChange={handleChange}
                    />
                  </div>
                ))}
              </div>
            )}

            {!showPlatforms && !showPublishers && !showGenres && (
              <>
                <div className="col-4">
                  <div className="ms-auto me-auto card text-white bg-dark mb-3">
                    <div className="card-header">Platform(s)</div>
                    <div className="card-body">
                      {answers.platforms.map((platform) => (
                        <h4 className="card-title">{platform.platformName}</h4>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="col-4">
                  <div className="ms-auto me-auto card text-white bg-dark mb-3">
                    <div className="card-header">Publisher(s)</div>
                    <div className="card-body">
                      {answers.publishers.map((publisher) => (
                        <h4 className="card-title">
                          {publisher.publisherName}
                        </h4>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="col-4">
                  <div className="ms-auto me-auto card text-white bg-dark mb-3">
                    <div className="card-header">Genre(s)</div>
                    <div className="card-body">
                      {answers.genres.map((genre) => (
                        <h4 className="card-title">{genre.genreName}</h4>
                      ))}
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>

          <div className="form-input m-3">
            {showPlatforms || showPublishers || showGenres ? (
              <Button
                variant="primary"
                type="button"
                disabled={isLoading ? true : false}
                onClick={() => updateAnswers()}
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
                  </>
                ) : (
                  "Next"
                )}
              </Button>
            ) : (
              <>
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
                    </>
                  ) : (
                    "Submit"
                  )}
                </Button>
              </>
            )}
          </div>
          <small className="m-3">
            You can always update your preferences from your profile later
          </small>
        </fieldset>
      </form>
    </div>
  );
};

export default Survey;

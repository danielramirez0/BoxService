import { useNavigate } from "react-router-dom";
import useForm from "../../components/useForm/useForm";
import LabeledInput from "../../components/FormGroups/LabeledInput";
import { useState } from "react";
// import { setJWT, selectAuth, setHeaders } from "../login/LoginSlice";
// import { selectList } from "../characters/CharactersSlice";
import isOkPass, { registerNewUser, postNewProfile } from "../../services/user";
// import "./Register.css";
// import ListSelection from "../../components/ListSelection/ListSelection";
// import { getProfile } from "../profile/ProfileSlice";

const Register = () => {
  const { errors, values, handleChange, handleSubmit, clearValues } =
    useForm(registerUser);

  const [loading, setLoading] = useState([true]);

  const navigate = useNavigate();

  async function registerUser() {
    // const { setupPassword, confirmPassword, ...newUser } = values;
    // newUser.password = setupPassword;
    let registered;

    if (values.setupPassword) {
      let testPass = isOkPass(values.setupPassword);

      if (testPass.result === true) {
        const { confirmPassword, setupPassword, ...newUser } = {
          password: values.setupPassword,
          ...values,
        };
        registered = await registerNewUser(
          newUser,
          "http://127.0.0.1:8000/api/auth/register/"
        );
      } else {
        alert(testPass.error);
      }
    }
    if (registered) {
      //   dispatch(setJWT(user.headers["x-auth-token"]));
      //   const newProfile = await buildProfile(user.data._id);
      //   let newProfile;
      //   const profile = await postNewProfile(newProfile);
      //   if (profile) {
      // const headers = {
      //   userId: user.data._id,
      //   "Content-Type": "application/json",
      //   "x-auth-token": user.headers["x-auth-token"],
      // };
      // await dispatch(setHeaders(headers));
      // await dispatch(getProfile(headers));
      //   }
      navigate("/");
      //   clearValues();
      //   setLoading(false);
    }
    else {
        alert('There was an issue registering. See the console.')
    }
  }

  return (
    // !authenticated && (
    <div className="row mb-4" id="register-container">
      {/* <div className="center full-box"> */}
      <form onSubmit={handleSubmit} className="col-md-4 ms-auto me-auto">
        <fieldset>
          <legend>New User Registration</legend>

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

          {<small>{errors.confirmPassword}</small> || !errors.confirmPassword}

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

          <div className="form-input mt-3">
            <button type="submit" className="btn btn-primary">
              Register
            </button>
          </div>
        </fieldset>
      </form>
    </div>
    // )
  );
};

export default Register;

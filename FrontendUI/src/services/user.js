import axios from "axios";
import getErrorMessage from "./errorHandlers";

export async function loginUser(credentials, endpoint) {
  const errorHandler = getErrorMessage;
  const result = await axios
    .post(endpoint, credentials)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      if (error.response) {
        errorHandler(error);
      } else {
        console.log("Failed to login:", error);
      }
      return false;
    });
  return result;
}

export async function registerNewUser(user, endpoint) {
  const errorHandler = getErrorMessage;
  const result = await axios
    .post(endpoint, user)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      if (error.response) {
        errorHandler(error);
      } else {
        console.log("Failed to register user:", error);
      }
      return false;
    });
  return result;
}

export default function isOkPass(p) {
  const anUpperCase = new RegExp(/[A-Z]/);
  const aLowerCase = new RegExp(/[a-z]/);
  const aNumber = new RegExp(/[0-9]/);
  const aSpecial = new RegExp(/[!|@|#|$|%|^|&|*|(|)|-|_]/);
  const obj = {};
  obj.result = true;

  if (p.length < 8) {
    obj.result = false;
    obj.error = "Password is not long enough";
    return obj;
  }

  let numUpper = 0;
  let numLower = 0;
  let numNums = 0;
  let numSpecials = 0;
  for (let i = 0; i < p.length; i++) {
    if (anUpperCase.test(p[i])) numUpper++;
    else if (aLowerCase.test(p[i])) numLower++;
    else if (aNumber.test(p[i])) numNums++;
    else if (aSpecial.test(p[i])) numSpecials++;
  }

  if (numUpper < 1 || numLower < 1 || numNums < 1 || numSpecials < 1) {
    obj.result = false;
    obj.error = "Password is not complex enough";
    return obj;
  }
  return obj;
}
// export async function testCredentials(credentials) {
//   const result = await axios
//     .post("http://localhost:5000/api/auth", credentials)
//     .then((response) => response.data)
//     .catch((error) => {
//       console.log(error);
//       if (error.response) {
//         alert(error.response.data);
//       } else if (error.request) {
//         console.log(error.request);
//       } else {
//         console.log("Error", error.message);
//         console.log(error);
//       }
//       return false;
//     });
//   return result;
// }

// export async function postNewProfile(profile) {
//   const result = await axios
//     .post("http://localhost:5000/api/profiles/", profile)
//     .then((response) => response)
//     .catch((error) => {
//       console.log(error);
//       if (error.response) {
//         alert(error.response.data);
//       } else if (error.request) {
//         console.log(error.request);
//       } else {
//         console.log("Error", error.message);
//         console.log(error);
//       }
//       throw "Unable to create new profile...";
//     });
//   return result;
// }

// export async function putProfile(id, profile, headers) {
//   const { userId, ...jwt } = headers;
//   const result = await axios
//     .put(`http://localhost:5000/api/profiles/${id}`, profile, { headers: jwt })
//     .then((response) => response)
//     .catch((error) => {
//       console.log(error);
//       if (error.response) {
//         alert(error.response.data);
//       } else if (error.request) {
//         console.log(error.request);
//       } else {
//         console.log("Error", error.message);
//         console.log(error);
//       }
//     });
//   return result;
// }

// export async function getProfileAPI(headers) {
//   const { userId, ...jwt } = headers;
//   return await axios
//     .get(`http://localhost:5000/api/profiles/ref/${userId}`, { headers: jwt })
//     .then((response) => response);
// }

// export async function getGoalsAPI(headers) {
//   const { userId, ...jwt } = headers;
//   return await axios
//     .get(`http://localhost:5000/api/goals/ref/${userId}`, { headers: jwt })
//     .then((response) => response);
// }

// export async function postGoalAPI(goal) {
//   const result = await axios
//     .post("http://localhost:5000/api/goals/", goal)
//     .then((response) => response);
//   return result;
// }

// export async function generateJWT(credentials) {
//   return await axios.post("http://localhost:5000/api/auth", credentials).then((response) => {
//     localStorage.setItem("token", response.data);
//     return response;
//   });
// }


import axios from "axios";
import "./errorHandlers";
import errorHandler from "./errorHandlers";

export async function loginUser(credentials, endpoint) {
  const result = await axios
    .post(endpoint, credentials)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      errorHandler(error);
      return false;
    });
  return result;
}

export async function registerNewUser(user, endpoint) {
  const result = await axios
    .post(endpoint, user)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      errorHandler(error);
      return false;
    });
  return result;
}

export async function getUser(endpoint) {
  const result = await axios
    .get(endpoint)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      errorHandler(error);
      return false;
    });
  return result;
}

export async function updateUser(endpoint, data) {
  const result = await axios
    .put(endpoint, data)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      errorHandler(error);
      return false;
    });
  return result;
}

export async function postSurveyAnswers(data, endpoint) {
  const result = await axios
    .post(endpoint, data)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      errorHandler(error);
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

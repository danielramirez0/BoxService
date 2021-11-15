import axios from "axios";
import errorHandler from "./errorHandlers";

export async function getAllObjectsAt(endpoint) {
  const result = await axios
    .get(endpoint)
    .then((response) => response.data)
    .catch((error) => {
      errorHandler(error);
      return false;
    });
  return result;
}

export async function getDetailAt(endpoint, id, type) {
  const result = await axios
    .get(`${endpoint}${id}/?type=${type}`)
    .then((response) => response.data)
    .catch((error) => {
      errorHandler(error);
      return false;
    });
  return result;
}

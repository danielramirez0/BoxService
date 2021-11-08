import axios from "axios";
import getErrorMessage from "./errorHandlers";

export async function getAllObjectsAt(endpoint) {
  const errorHandler = getErrorMessage;
  const result = await axios
    .get(endpoint)
    .then((response) => response.data)
    .catch((error) => {
      if (error.response) {
        errorHandler(error);
      } else {
        console.log("Failed to get objects", error);
      }
      return false;
    });
  return result;
}

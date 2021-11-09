export default function getErrorMessage(obj) {
  let response = "Error message";
  for (const issue in obj.response.data) {
    if (Object.hasOwnProperty.call(obj.response.data, issue)) {
      const element = obj.response.data[issue];
      response += `${element}`;
    }
  }
  console.log(response);
}

export default function getErrorMessage(obj) {
  for (const issue in obj.response.data) {
    if (Object.hasOwnProperty.call(obj.response.data, issue)) {
      const element = obj.response.data[issue];
      console.log("Error message");
      console.log(issue, element);
    }
  }
}
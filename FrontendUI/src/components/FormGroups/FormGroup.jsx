const FormGroups = (props) => {
  let renderedComponent;
  let isGroup = False;
  let isCheckbox = False;
  let isDisabled = False;
  let isReadOnly = False;

  for (let prop = 0; prop < props.length; prop++) {
    if (props[prop] == "form-group") {
      isGroup = True;
    } else if (props[prop] == "form-check") {
      isCheckbox = True;
    } else if (props[prop] == "disabled") {
      isDisabled = True;
    } else if (props[prop] == "readonly") {
      isReadOnly = True;
    }
  }

  return renderedComponent;
};

export default FormGroups;

const FloatingLabelInput = (props) => {
  return (
    <>
      <input
        type={props.inputType}
        name={props.inputId}
        className={props.inputClasses}
        id={props.inputId}
        value={props.inputValue || ""}
        onChange={(e) => props.handleChange(e)}
        data-dbid={props.databaseId}
        placeholder={props.placeholderText}
      />
      <label htmlFor={props.inputId}>{props.labelText}</label>
    </>
  );
};

export default FloatingLabelInput;

const FloatingLabelInput = (props) => {
  return (
    <div className={props.divClasses}>
      <input
        type={props.inputType}
        name={props.inputId}
        className={props.inputClasses}
        id={props.inputId}
        value={props.inputValue || ""}
        onChange={(e) => props.handleChange(e)}
        placeholder={props.placeholderText}
      />
      <label htmlFor={props.inputId}>{props.labelText}</label>
    </div>
  );
};

export default FloatingLabelInput;

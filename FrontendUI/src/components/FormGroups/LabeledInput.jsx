const LabeledInput = (props) => {
  return (
    <div className="form-group">
      <label htmlFor={props.inputId} className="form-label mt-4">
        {props.labelText}
      </label>
      <input
        type={props.inputType}
        name={props.inputId}
        className="form-control text-center"
        id={props.inputId}
        value={props.inputValue || ''}
        onChange={(event) => props.handleChange(event)}
        required={props.isRequired}
        placeholder={props.placeholder}
      />
    </div>
  );
};

export default LabeledInput;

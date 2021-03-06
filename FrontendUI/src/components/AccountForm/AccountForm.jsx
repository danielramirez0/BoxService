import useForm from "../../components/useForm/useForm";
import LabeledInput from "../../components/FormGroups/LabeledInput";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";

const AccountForm = (props) => {
  const { values, handleChange, handleSubmit} =
    useForm(sendUpdates);

  const [isLoading] = useState(false);
  function sendUpdates() {
      props.formCallback(values, 'Account')
  }

  return (
    <form onSubmit={handleSubmit} className="col-md-6 ms-auto me-auto">
      <fieldset>
        <legend>{props.legend}</legend>
        {props.data.map((item, index) => (
          <LabeledInput
            key={index}
            inputId={item.inputId}
            labelText={item.labelText}
            inputType={item.inputType}
            inputValue={values[item.inputId]}
            handleChange={handleChange}
            required={true}
            placeholder={item.placeholder}
          />
        ))}
      </fieldset>
      <div className="form-input m-3">
        <Button
          variant="primary"
          type="submit"
          disabled={isLoading ? true : false}
        >
          {isLoading ? (
            <>
              <Spinner
                as="span"
                animation="border"
                size="sm"
                role="status"
                aria-hidden="true"
              />
              <span className="visually-hidden">Loading...</span>
            </>
          ) : (
            props.buttonText
          )}
        </Button>
      </div>
    </form>
  );
};

export default AccountForm;

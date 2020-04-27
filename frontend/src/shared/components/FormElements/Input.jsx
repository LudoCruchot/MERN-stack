import React, { useReducer, useEffect } from "react";

import { validate } from "../../utils/validators";
import "./Input.css";

const inputReducer = (state, action) => {
  switch (action.type) {
    case "CHANGE":
      return {
        ...state,
        value: action.val,
        isValid: validate(action.val, action.validators),
      };
    case "TOUCH":
      return {
        ...state,
        isTouched: true,
      };
    default:
      return state;
  }
};

const Input = (props) => {
  const {
    label,
    id,
    element,
    type,
    placeHolder,
    rows,
    errorText,
    validators,
    onInput,
  } = props;

  const [inputState, dispatch] = useReducer(inputReducer, {
    value: "",
    isValid: false,
    isTouched: false,
  });

  const { value, isValid } = inputState;

  useEffect(() => {
    onInput(id, value, isValid);
  }, [id, value, isValid, onInput]);

  const changeHandler = (event) => {
    dispatch({
      type: "CHANGE",
      val: event.target.value,
      validators: validators,
    });
  };

  const touchHandler = () => {
    dispatch({
      type: "TOUCH",
    });
  };

  const formElement =
    element === "input" ? (
      <input
        id={id}
        type={type}
        placeholder={placeHolder}
        onChange={changeHandler}
        onBlur={touchHandler}
        value={inputState.value}
      />
    ) : (
      <textarea
        id={id}
        rows={rows || 3}
        onChange={changeHandler}
        onBlur={touchHandler}
        value={inputState.value}
      />
    );

  return (
    <div
      className={`form-control ${
        !inputState.isValid && inputState.isTouched && "form-control--invalid"
      }`}
    >
      <label htmlFor={id}>{label}</label>
      {formElement}
      {!inputState.isValid && inputState.isTouched && <p>{errorText}</p>}
    </div>
  );
};

export default Input;

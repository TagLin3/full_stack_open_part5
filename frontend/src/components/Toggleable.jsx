import { useState, forwardRef, useImperativeHandle } from "react";

const Toggleable = forwardRef((props, ref) => {
  const { buttonLabel, children } = props;
  const [visibility, setVisibility] = useState();

  const showWhenHidden = { display: visibility ? "none" : "" };
  const showWhenVisible = { display: visibility ? "" : "none" };

  const toggleVisibility = () => {
    setVisibility(!visibility);
  };

  useImperativeHandle(ref, () => ({ toggleVisibility }));

  return (
    <div>
      <div style={showWhenHidden}>
        <button type="button" onClick={toggleVisibility} id={props.buttonId}>{buttonLabel}</button>
      </div>
      <div style={showWhenVisible}>
        {children}
        <button type="button" onClick={toggleVisibility}>cancel</button>
      </div>
    </div>
  );
});

export default Toggleable;

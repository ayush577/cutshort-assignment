import React from "react";

const Stepper = ({ value, numberSteps }) => {
  // console.log("value", value);

  let numSteps;

  if (numberSteps === null || undefined) {
    numSteps = arrayofDigits(numberSteps);
  } else {
    numSteps = arrayofDigits(4);
  }

  // Convert Number to array
  function arrayofDigits(num) {
    let arr = [];
    for (let i = 1; i <= num; i++) {
      arr.push(i);
    }
    return arr;
  }

  return (
    <div className="stepper mt-3">
      <ul className="steps">
        {numSteps.map((item) => {
          // console.log("value===item", value, item);

          return (
            <li
              className={
                "step " +
                (value === item
                  ? "step--incomplete step--active"
                  : value < item
                  ? "step--incomplete step--inactive"
                  : "step--complete step--inactive")
              }
              key={item}
            >
              <span className="step__icon">{item}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Stepper;

/*
<li className="step step--incomplete step--active">
          <span className="step__icon">1</span>
        </li>
        <li className="step step--incomplete step--inactive">
          <span className="step__icon">2</span>
        </li>
        <li className="step step--incomplete step--inactive">
          <span className="step__icon">3</span>
        </li>
        <li className="step step--incomplete step--inactive">
          <span className="step__icon">4</span>
        </li>
*/

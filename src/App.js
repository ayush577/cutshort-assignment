import React, { useState } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { Stepper } from "./components";

import logo from "../src/assets/img/logo.png";
import person from "../src/assets/img/person-fill.svg";
import people from "../src/assets/img/people-fill.svg";
import check from "../src/assets/img/check-lg.svg";

function App() {
  const [page, setPage] = useState(1);
  const [data, setData] = useState({
    user: {},
    workspace: {},
    setup: {},
  });

  console.log(data);

  function goNextPage() {
    if (page === 4) return;
    setPage((page) => page + 1);
  }

  function updateData(type, newData) {
    setData((data) => {
      return { ...data, [type]: newData };
    });
  }

  function submit() {
    alert(`Congratulations ${data.user.fullName}`);
    fetch("/api/form", { method: "POST", body: JSON.stringify(data) });
  }

  return (
    <div className="container">
      <div className="form__wrapper">
        {/* //* Logo */}
        <div className="logo ">
          <img src={logo} alt="logo" />
        </div>

        {/* //* Stepper */}
        <Stepper value={page} numberSteps={4} />

        {/* //* Forms */}
        <div className="mt-5">
          {page === 1 && (
            <OnboardingOne
              data={data.user}
              update={updateData}
              onClick={goNextPage}
            />
          )}
          {page === 2 && (
            <OnboardingTwo
              data={data.workspace}
              update={updateData}
              onClick={goNextPage}
            />
          )}
          {page === 3 && (
            <OnboardingThree
              data={data.setup}
              update={updateData}
              onClick={goNextPage}
            />
          )}
          {page === 4 && <OnboardingFour data={data} />}
        </div>

        {/* {page !== 4 && (
          <button className="big__btn" onClick={goNextPage}>
            Create Workspace
          </button>
        )} */}
        {page === 4 && (
          <button className="big__btn" type="submit" onClick={submit}>
            Launch Eden
          </button>
        )}
      </div>
    </div>
  );
}

export default App;

const OnboardingOne = ({ data, update, onClick }) => {
  const OnboardOneSchema = Yup.object().shape({
    fullName: Yup.string()
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .required("Required"),
    displayName: Yup.string()
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .required("Required"),
  });

  return (
    <div className="formWrapper">
      <div className="formWrapper__header mb-3">
        <h1>Welcome! First things first...</h1>
        <p>You can always change them later</p>
      </div>
      <div className="formWrapper__body">
        <div>
          <Formik
            initialValues={{
              fullName: "",
              displayName: "",
            }}
            validationSchema={OnboardOneSchema}
            onSubmit={(values) => {
              update("user", values);
              onClick();
            }}
          >
            {({ errors, touched }) => (
              <Form className="d-flex flex-column">
                <div className="form__group">
                  <label htmlFor="fullName" className="form__label">
                    Full Name
                  </label>
                  <Field
                    name="fullName"
                    placeholder="Full Name"
                    className="form__input"
                  />
                  {errors.fullName && touched.fullName ? (
                    <div className="form__error">{errors.fullName}</div>
                  ) : null}
                </div>

                <div className="form__group">
                  <label htmlFor="displayName" className="form__label">
                    Display Name
                  </label>
                  <Field
                    name="displayName"
                    placeholder="Display Name"
                    className="form__input"
                  />
                  {errors.displayName && touched.displayName ? (
                    <div className="form__error">{errors.displayName}</div>
                  ) : null}
                </div>
                <button className="big__btn" type="submit">
                  Create Workspace
                </button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

const OnboardingTwo = ({ data, update, onClick }) => {
  const OnboardTwoSchema = Yup.object().shape({
    workspaceName: Yup.string()
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .required("Required"),
    workspaceUrl: Yup.string().min(2, "Too Short!").max(50, "Too Long!"),
  });

  return (
    <div className="formWrapper">
      <div className="formWrapper__header mb-3">
        <h1>Let's set up a home for all your work</h1>
        <p>You can always create another workspace later.</p>
      </div>
      <div className="formWrapper__body">
        <div>
          <Formik
            initialValues={{
              workspaceName: "",
              workspaceUrl: "",
            }}
            validationSchema={OnboardTwoSchema}
            onSubmit={(values) => {
              update("workspace", values);
              onClick();
            }}
          >
            {({ errors, touched }) => (
              <Form className="d-flex flex-column">
                <div className="form__group">
                  <label htmlFor="workspaceName" className="form__label">
                    Workspace Name
                  </label>
                  <Field
                    name="workspaceName"
                    placeholder="Eden"
                    className="form__input"
                  />
                  {errors.workspaceName && touched.workspaceName ? (
                    <div className="form__error">{errors.workspaceName}</div>
                  ) : null}
                </div>

                <div className="form__group ">
                  <label htmlFor="workspaceUrl" className="form__label">
                    Workspace URL <span>(Optional)</span>
                  </label>
                  <div className="input-group">
                    <span className="input-group-text" id="basic-addon3">
                      www.eden.com/
                    </span>
                    <Field
                      name="workspaceUrl"
                      placeholder="Example"
                      className="form-control form__input"
                      id="basic-url"
                      aria-describedby="basic-addon3"
                    />
                  </div>
                  {errors.workspaceUrl && touched.workspaceUrl ? (
                    <div className="form__error">{errors.workspaceUrl}</div>
                  ) : null}
                </div>
                <button className="big__btn" type="submit">
                  Create Workspace
                </button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

const OnboardingThree = ({ data, update, onClick }) => {
  return (
    <div className="formWrapper">
      <div className="formWrapper__header mb-3">
        <h1>How are you planning to use Eden?</h1>
        <p>We'll streamline your setup experience accordingly.</p>
      </div>
      <div className="formWrapper__body">
        <div>
          <Formik
            initialValues={{
              picked: "",
            }}
            onSubmit={(values) => {
              console.log("packed", values);
              if (values) {
                update("setup", values);
                onClick();
              }
            }}
          >
            {({ values }) => (
              <Form className="d-flex flex-column form">
                <div className="d-flex flex-row justify-content-between">
                  {/* First Card */}
                  <div className="form__card">
                    <label>
                      <Field
                        name="picked"
                        className="form__radio"
                        type="radio"
                        value="myself"
                      />

                      <span className="plan__details">
                        <img src={person} alt="person" className="plan__type" />
                        <span className="plan__title">For myself</span>
                        <span className="plan__text">
                          Write better. Think more clearly. Stay organized
                        </span>
                      </span>
                    </label>
                  </div>

                  {/* Second Card */}
                  <div className="form__card">
                    <label>
                      <Field
                        name="picked"
                        className="form__radio"
                        type="radio"
                        value="team"
                      />

                      <span className="plan__details" aria-hidden="true">
                        <img src={people} alt="people" className="plan__type" />
                        <span className="plan__title">With my team</span>
                        <span className="plan__text">
                          Wikis, docs, tasks & projects, all in one place.
                        </span>
                      </span>
                    </label>
                  </div>
                </div>

                {/* Picked One */}
                {/* <div>Picked: {values.picked}</div> */}

                <button className="big__btn mt-4" type="submit">
                  Create Workspace
                </button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

const OnboardingFour = ({ data }) => {
  return (
    <div className="formWrapper">
      <div className="formWrapper__header mb-3">
        <div className="formWrapper__header-icon mb-5">
          <img src={check} alt="check" />
        </div>
        <h1>Congratulations, {data.user.fullName}</h1>
        <p>You have completed onboarding, you can start using the Eden!</p>
      </div>
    </div>
  );
};

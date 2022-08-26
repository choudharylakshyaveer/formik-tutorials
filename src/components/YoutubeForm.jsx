import React from "react";
import { FormikConsumer, useFormik } from "formik";

function YoutubeForm(props) {
  const initialValues = {
    name: "",
    email: "",
    channel: "",
  };

  const onSubmit = (values) => {
    console.log("Form errors: " + JSON.stringify(formik.errors));
  };

  const validate = (values) => {
    console.log("Validate called...");
    let errors = {};
    if (!values.name) {
      errors.name = "Required";
    }
    if (!values.email) {
      errors.email = "Required";
    }
    if (!values.channel) {
      errors.channel = "Required";
    } else if (
      !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(values.email)
    ) {
      errors.email = "Invalid email address";
    }
    return errors;
  };

  const formik = useFormik({
    initialValues,
    onSubmit,
    validate,
  });

  console.log("Visited fields: " + JSON.stringify(formik.touched));

  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        <div className="form-control">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.name}
          />
          {formik.touched.name && formik.errors.name ? (
            <div className="error">{formik.errors.name}</div>
          ) : null}
          <div className="form-control">
            <label htmlFor="email">Email</label>
            <input
              type="text"
              id="email"
              name="email"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
            />
            {formik.touched.email && formik.errors.email ? (
              <div className="error">{formik.errors.email}</div>
            ) : null}
          </div>
          <div className="form-control">
            <label htmlFor="channel">Channel</label>
            <input
              type="text"
              id="channel"
              name="channel"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur} //onBlur is stored in formik's touched object
              value={formik.values.channel}
            />
            {formik.touched.channel && formik.errors.channel ? (
              <div className="error">{formik.errors.channel}</div>
            ) : null}
          </div>
          <button type="submit" value="Submit">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

export default YoutubeForm;

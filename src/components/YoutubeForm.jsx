import React from "react";
import {  Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from 'yup';
import TextError from "./TextError";

function YoutubeForm(props) {
  const initialValues = {
    name: "",
    email: "",
    channel: "",
    comments: "",
    address: "",
    social:{
      facebook:'',
      twitter:''
    },
    phoneNumbers: ['', '']
  };

  const onSubmit = (values) => {
     console.log("Form values: " + JSON.stringify(values));
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

  const validationSchema = Yup.object({
    name: Yup.string().required('Required'),
    email: Yup.string()
      .email('Invalid email format')
      .required('Required'),
    channel: Yup.string().required('Required')
  })
/*
  const formik = useFormik({
    initialValues,
    onSubmit,
    //validate
    validationSchema
  });
*/
 
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      <Form> {/* we removed onSubmit method as formik's Form component wraps <form> inside it */}
        <div className="form-control">
          <label htmlFor="name">Name</label>
          <Field
            type="text"
            id="name"
            name="name"
            /*
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.name}
            */
            placeholder='Youtube channel name'
          />
          <ErrorMessage name='name' component={TextError}/>

          <div className="form-control">
            <label htmlFor="email">Email</label>
            <Field
              type="text"
              id="email"
              name="email"
              /*
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
              */
            />
            <ErrorMessage name='email'>
              {
                (errorMsg) => <div className="error">{errorMsg}</div>
              }
            </ErrorMessage>
          </div>
          <div className="form-control">
            <label htmlFor="channel">Channel</label>
            <Field
              type="text"
              id="channel"
              name="channel"
              /*
              onChange={formik.handleChange}
              onBlur={formik.handleBlur} //onBlur is stored in formik's touched object
              value={formik.values.channel}
              */
            />
            <ErrorMessage name='channel'  component={TextError}/>
          </div>
          <div className="form-control">
            <label htmlFor="comments">Comments</label>
            <Field as='textarea' id='comments' name='comments' /> {/*instead of 'as' we can also use 'component'*/}

          </div>
          <div className="form-control">
            <label htmlFor='address'>Address</label>
            <Field name='address' >
              {
                (props) =>{
                  const {field, form, meta} =props
                  console.log('Render props :'+ JSON.stringify( props));
                  return (
                    <div>
                      <input type='text' id='address' {...field}/>
                      {meta.touched && meta.error ? <div>{meta.error}</div> : null}
                    </div>
                  )
                }
              }
            </Field>
          </div>

          <div className="form-control">
              <label htmlFor="facebook">Facebool Profile</label>
              <Field type='text' id='facebook' name='social.facebook' />
          </div>
          <div className="form-control">
              <label htmlFor="twitter">Twitter Profile</label>
              <Field type='text' id='twittter' name='social.twittter' />
          </div>
          
          <div className="form-control">
              <label htmlFor="primaryPh">Primary phone number</label>
              <Field type="text" id="primaryPh" name='phoneNumbers[0]' />
          </div>
          <div className="form-control">
              <label htmlFor="secondaryPh">Secondary phone number</label>
              <Field type="text" id="secondaryPh" name='phoneNumbers[1]' />
          </div>
          
          <button type="submit" value="Submit">
            Submit
          </button>
        </div>
      </Form>
    </Formik>
  );
}

export default YoutubeForm;

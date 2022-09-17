import {React, useState} from "react";
import { Formik, Form, Field, ErrorMessage, FieldArray, FastField } from "formik";
import * as Yup from 'yup';
import TextError from "./TextError";

function YoutubeForm(props) {
  const [formValues, setFormValues] = useState(null);
  const initialValues = {
    name: "Lvs",
    email: "",
    channel: "",
    comments: "",
    address: "",
    social: {
      facebook: '',
      twitter: ''
    },
    phoneNumbers: ['', ''],
    phNumbers: ['']
  };

  const savedValues = {
    name: "Lakshyaveer Singh",
    email: "choudharylakshyaveer@gmail.com",
    channel: "Reactjs Developers",
    comments: "Welcome to react js world",
    address: "New Delhi",
    social: {
      facebook: '',
      twitter: ''
    },
    phoneNumbers: ['', ''],
    phNumbers: ['']
  };


  const onSubmit = (values, onSubmitProps) => {
    console.log("Form values: " + JSON.stringify(values));
    console.log("Submit props: " + JSON.stringify(onSubmitProps));
    onSubmitProps.setSubmitting(false); //will enable the submit button after clicking
    onSubmitProps.resetForm();
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
    //comments: Yup.string().required('Required') //commented as we will do field level validation
  })

  const validateComments = value => {
    let error;
    if(!value){
      error='Required'
    }
    return error;
  }

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
      initialValues={initialValues || formValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
      //validateOnChange={false} //this will instruct the formik to not run validation on every change
      //validateOnBlur={false} //onBlur will not run validation
      //validateOnMount
      enableReinitialize //it decides whether form can change initial values after the form has been initialized once
    >
      {
        formik => { 
          console.log("formik obj: "+ JSON.stringify(formik));
          return(
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
              <ErrorMessage name='name' component={TextError} />

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
                <ErrorMessage name='channel' component={TextError} />
              </div>
              <div className="form-control">
                <label htmlFor="comments">Comments</label>
                <Field as='textarea' id='comments' name='comments' validate={validateComments} /> {/*instead of 'as' we can also use 'component'*/}
                <ErrorMessage name='comments' component={TextError} />
              </div>
              <div className="form-control">
                <label htmlFor='address'>Address</label>
                <FastField name='address' >{/* By using the FastField component, the page will not update the render on every change(as in case of Field every change renders complete page) */}
                  {
                    (props) => {
                      const { field, form, meta } = props
                      console.log('Render props :' + JSON.stringify(props));
                      return (
                        <div>
                          <input type='text' id='address' {...field} />
                          {meta.touched && meta.error ? <div>{meta.error}</div> : null}
                        </div>
                      )
                    }
                  }
                </FastField>
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

              <div className="form-control">
                <label>List of Phone Numbers</label>
                <FieldArray name='phNumbers'>
                  {
                    (fieldArrayProps) => {
                      //console.log('fieldArrayProps: ' + JSON.stringify(fieldArrayProps));
                      const { push, remove, form } = fieldArrayProps;
                      const { values } = form;
                      const { phNumbers } = values;
                      console.log('Form errors: '+ JSON.stringify(form.errors) );
                      return (<div>{
                        phNumbers.map((phNumber, index) => (
                          <div key={index}>
                            <Field name={`phNumbers[${index}]`} />
                            {index > 0 && <button type="button" onClick={() => remove(index)}> - </button>}

                            <button type="button" onClick={() => push('')}> + </button>

                          </div>
                        ))
                      }</div>
                      )
                    }
                  }
                </FieldArray>
              </div>
              {/*
              <button type='button' onClick={() => formik.validateField('comments')}>Validate Comments</button>
              <button type='button' onClick={() => formik.validateForm()} >Validate All</button>

              <button type='button' onClick={() => formik.setFieldTouched('comments')}>Visit Comments</button>
              <button type='button' onClick={() => formik.setTouched({name: true, email: true, channel: true, comments: true})} >Validate All</button>
                */}
              
              <button type="button" onClick={() => formik.setValues(savedValues)}>Load saved data</button>
              <button type="button" >Reset</button>
              <button type="submit" value="Submit" disabled={!formik.isValid || formik.isSubmitting}>Submit</button> {/* can add !(formik.dirty && formik.isValid) to diable submit */}
            </div>
          </Form>
          )
        }
      }
      
    </Formik>
  );
}

export default YoutubeForm;

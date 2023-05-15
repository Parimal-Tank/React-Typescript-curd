import { Button, Container, Grid } from '@mui/material';
import { Field, Form, Formik, FormikHelpers, FormikProps } from 'formik';
import React, { useState } from 'react'
import * as yup from "yup"
import FormTextField from './FormTextField'
import { IBaseUser } from './Interface'

interface Iprops {
    onAddUser: (user: IBaseUser) => void;
}

interface FormValues {
    firstName : string;
    lastName : string;
    email : string;
    password : string
}

const initUser = {   
    firstName : '',
    lastName : '',
    email : '',
    password : ''
};

const validationSchema = yup.object().shape({
    firstName : yup.string().required("Required"),
    lastName : yup.string().required("Required"),
    email : yup.string().email('Invalid Email').required("Required"),
    password : yup.string().required("Required")
})

const AddUser: React.FunctionComponent<Iprops>  = (props) => {

    const [ formData , setFormData] = useState(initUser);


    const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name , value } = e.target;
        console.log('This is Called');
        console.log(e.target);
        setFormData({ ...formData , [name] : value});
    }

  return (
    <Container maxWidth='md'>
       
       <Formik 

        initialValues={{
            firstName: '',
            lastName: '',
            email: '',
            password: ''
        }}

        validationSchema={validationSchema}
        onSubmit={(
            values : FormValues,
            formikHelpers : FormikHelpers<FormValues>
        ) => {
            // alert(JSON.stringify(values, null, 2));
            props.onAddUser(values);
            setFormData(initUser);
            formikHelpers.setSubmitting(false);
        }}
       >
        {(formikProps: FormikProps<FormValues>) => (
          <Form noValidate autoComplete="off">
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Field
                  name="firstName"
                  label="FirstName"
                  size="small"
                  component={FormTextField}
                  value={formData.firstName}
                  onChange={() => onInputChange}
                />
              </Grid>
              <Grid item xs={12}>
                <Field
                  name="lastName"
                  label="LastName"
                  size="small"
                  component={FormTextField}
                  value={formData.lastName}
                  onChange={onInputChange}
                />
              </Grid>
              <Grid item xs={12}>
                <Field
                  name="email"
                  label="Email"
                  size="small"
                  type='email'
                  value={formData.email}
                  component={FormTextField}
                  onChange={onInputChange}
                />
              </Grid>
              <Grid item xs={12}>
                <Field
                  name="password"
                  label="Password"
                  type='password'
                  size="small"
                  component={FormTextField}
                  value={formData.password}
                  onChange={onInputChange}
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  type="submit"
                  variant="outlined"
                  size="large"
                  color="primary"
                  disabled={formikProps.isSubmitting}
                >
                  Submit
                </Button>
              </Grid>
            </Grid>
          </Form>
        )}
      </Formik>


    </Container>
  )
}

export default AddUser

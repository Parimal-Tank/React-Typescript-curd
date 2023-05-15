import React, { useEffect, useState } from 'react'
import { IUser } from './Interface'
import { Field, Form, Formik, FormikProps } from 'formik';
import { Button, Container, Grid } from '@mui/material';
import * as yup from "yup"
import FormTextField from './FormTextField'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface IProps {
   user: IUser;
   onUpdateUser: (id: number, user: IUser) => void;
   setEdit: (bool: boolean) => void;
}

interface FormValues {
   firstName : string;
   lastName : string;
   email : string;
   password : string
}


const validationSchema = yup.object().shape({
   firstName : yup.string().required("Required"),
   lastName : yup.string().required("Required"),
   email : yup.string().email('Invalid Email').required("Required"),
   password : yup.string().required("Required")
})

const EditUser = (props: IProps) => {

   const [user, setUser] = useState(props.user);

   useEffect(() => setUser(props.user), [props]);

   const notify = () => toast.success("User Updated Successfully");

   const onFormSubmitNew = (e: any) => {
      console.log('e: ', e);
      props.onUpdateUser(user.id, e);
   }
   
   const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      console.log('This is Updated User');
      const { name, value } = e.target;
      setUser({ ...user, [name]: value });
   }


   return (

      <>
      <Container maxWidth='md'>
       
       <Formik 

        initialValues={{
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            password: user.password
        }}

        validationSchema={validationSchema}
        onSubmit={(e:any)=>onFormSubmitNew(e)}
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
                  defaultValue={user.firstName}
                  onChange={onInputChange}
                />
              </Grid>
              <Grid item xs={12}>
                <Field
                  name="lastName"
                  label="LastName"
                  size="small"
                  component={FormTextField}
                  value={user.lastName}
                  onChange={onInputChange}
                />
              </Grid>
              <Grid item xs={12}>
                <Field
                  name="email"
                  label="Email"
                  size="small"
                  type='email'
                  component={FormTextField}
                  value={user.email}
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
                  value={user.password}
                  onChange={onInputChange}
                />
              </Grid>
              <Grid item xs={12}>

                <Button
                  type="submit"
                  variant="outlined"
                  size="large"
                  color="primary"
                  className='mx-2'
                  disabled={formikProps.isSubmitting}
                  onClick={notify}
                >
                  Update
                </Button>

                <Button
                  type="button"
                  variant="outlined"
                  size="large"
                  color="error"
                  onClick={() => props.setEdit(false)}
                >
                  Cancel
                </Button>
                
              </Grid>
            </Grid>
          </Form>
        )}
      </Formik>


    </Container>
      </>
   )
}

export default EditUser

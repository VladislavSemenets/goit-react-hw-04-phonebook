import React from 'react';
import { Formik, Field, ErrorMessage, useFormik } from 'formik';
import { Block, StyledField, StyledForm } from './FormPhonebook.styled';
import { nanoid } from 'nanoid';
import * as Yup from 'yup';

const schema = Yup.object().shape({
  name: Yup.string().min(1, 'Too Short!').required('Required'),
  number: Yup.string().min(3, 'Too Short!').required('Required'),
});

const FormPhonebook = ({ onAdd }) => {
  const formik = useFormik({
    initialValues: {
      name: '',
      number: '',
    },
    validationSchema: schema,
    onSubmit: (values, actions) => {
      onAdd({ ...values, id: nanoid() });
      actions.resetForm();
    },
  });

  return (
    <Block>
      <form onSubmit={formik.handleSubmit}>
        <StyledForm>
          <label htmlFor="name">Name</label>
          <Field
            type="text"
            id="name"
            name="name"
            as={StyledField}
            required
          />
          <ErrorMessage name="name" component="div" />
          <label htmlFor="number">Number</label>
          <Field
            type="tel"
            id="number"
            name="number"
            as={StyledField}
            required
          />
          <ErrorMessage name="number" component="div" />

          <button type="submit">Add contact</button>
        </StyledForm>
      </form>
    </Block>
  );
};

export default FormPhonebook;

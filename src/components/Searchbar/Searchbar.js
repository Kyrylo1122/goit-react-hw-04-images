import { Formik, Form, Field } from 'formik';
const Searchbar = ({ onSubmit }) => {
  return (
    <header className="Searchbar">
      <Formik
        initialValues={{ query: '' }}
        onSubmit={(values, action) => {
          onSubmit(values.query);
          action.resetForm();
        }}
      >
        <Form className="SearchForm">
          <Field
            className="SearchForm-input"
            name="query"
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
          <button type="submit" className="SearchForm-button">
            Search
          </button>
        </Form>
      </Formik>
    </header>
  );
};
export default Searchbar;

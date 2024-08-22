// External Libraries
import { FaSearch } from 'react-icons/fa';
import { Formik, ErrorMessage, Field, Form } from 'formik';
import { useSearchParams } from 'react-router-dom';
// Styles 
import styles from './SearchBox.module.css';

const SearchBox = ({ onQueryChange }) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const handleSearchSubmit = (values, { resetForm }) => {
    const query = values.query.trim();
    const nextParams = query ? { query } : {};
    setSearchParams(nextParams);
    if (onQueryChange) {
      onQueryChange(query);
    }
    resetForm();
  };

  return (
    <Formik initialValues={{ query: '' }} onSubmit={handleSearchSubmit}>
      {({ isSubmitting }) => (
        <Form className={styles.wrapper}>
          <Field
            type="text"
            name="query"
            placeholder="Movie name"
            title="Please enter movie name."
            required
            className={styles.input}
          />
          <button
            type="submit"
            disabled={isSubmitting}
            className={styles['search-button']}
          >
            <FaSearch className={styles['icon']} />
            Search
          </button>
          <ErrorMessage name="query" component="div" className={styles['error-message']} />
        </Form>
      )}
    </Formik>
  );
};

export default SearchBox;

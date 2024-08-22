// External Libraries
import { HiChevronLeft } from 'react-icons/hi';
import { Link } from 'react-router-dom';
// Styles
import css from './BackLink.module.css';

const BackLink = ({ to, children }) => {
  return (
    <Link to={to} className={css.link}>
      <HiChevronLeft size="24" />
      {children}
    </Link>
  );
};

export default BackLink;

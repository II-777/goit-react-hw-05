// External Libraries
import { Grid } from 'react-loader-spinner';
// Styles 
import css from './Loader.module.css';

const Loader = () => {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100px' }}>
      <Grid
        visible={true}
        height="80"
        width="80"
        color="orangered"
        ariaLabel="grid-loading"
        radius="12.5"
        wrapperStyle={{}}
        wrapperClass="grid-wrapper"
      />
    </div>
  );
};

export default Loader;

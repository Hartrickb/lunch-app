import PropTypes from 'prop-types';
import Place from './Place';

const Places = ({ places, onDirections }) => {
  return (
    <>
      {places.map((place) => (
        <Place key={place.scores.total} place={place} onDirections={onDirections} />
      ))}
    </>
  );
};

Places.propTypes = {
  places: PropTypes.array.isRequired,
  onDirections: PropTypes.string.isRequired,
};

export default Places;

import PropTypes from 'prop-types';
import { Grid, GridItem, Text } from '@chakra-ui/react';
import { FiCornerUpRight } from 'react-icons/fi';

const Place = ({ place, onDirections }) => {
  return (
    <GridItem
      colSpan={6}
      background='blackAlpha.200'
      borderRadius='md'
      border='1px'
      borderColor='gray.200'
    >
      <Grid templateRows='repeat(2, 1fr)' templateColumns='repeat(5, 1fr)'>
        <GridItem colSpan={4}>
          <Text fontSize='lg' color='gray'>
            {place.name}
          </Text>
        </GridItem>
        <GridItem
          colSpan={1}
          rowSpan={2}
          alignItems='center'
          display='flex'
          justifyContent='center'
        >
          <FiCornerUpRight color='gray' onClick={() => onDirections(place.location.address)} />
        </GridItem>
        <GridItem colSpan={4}>
          <Text fontSize='lg' color='gray'>
            {place.location.address}
          </Text>
        </GridItem>
      </Grid>
    </GridItem>
  );
};

Place.propTypes = {
  place: PropTypes.object.isRequired,
  onDirections: PropTypes.string.isRequired,
};

export default Place;

import PropTypes from 'prop-types';
import { Button } from '@chakra-ui/react';

const PickButton = ({ text }) => {
  const onClick = () => {
    console.log('hey poop');
  };

  return (
    <div>
      <Button
        onClick={onClick}
        className='btn'
        colorShceme='blue'
        variant='outline'
        backgroundColor='gray.100'
        textColor='black'
        width='full'
      >
        {text}
      </Button>
    </div>
  );
};

PickButton.propTypes = {
  text: PropTypes.string,
};

export default PickButton;

import { useState } from 'react';
// import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';
// import { TextField, Button, Grid } from '@mui/material';
import {
  Button,
  ChakraProvider,
  Container,
  Flex,
  Grid,
  GridItem,
  Heading,
  Input,
  Spinner,
} from '@chakra-ui/react';
import { AwesomeButton } from 'react-awesome-button';
import 'react-awesome-button/dist/styles.css';

import PickButton from './components/Button';
import Places from './components/Places';

const App = function () {
  const [zipCode, setZipCode] = useState('');
  const [places, setPlaces] = useState([]);
  const [waiting, setWaiting] = useState(false);

  // useEffect(() => {
  //   const getPlace = async () => {
  //     const placeFromServer = await pickForMe();
  //     setPlaces(placeFromServer);
  //   }
  //   getPlace();
  // }, [])

  const letMeChooseSetPlaces = async () => {
    setPlaces([]);
    setWaiting(true);
    const response = await fetch(
      'https://us-central1-lunchapp-330918.cloudfunctions.net/zipCode/letMeChoose',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          zipCode,
        }),
      },
    );

    console.log('hey');

    const data = await response.json();

    setWaiting(false);
    setPlaces([...data]);
  };

  const pickForMe = async () => {
    setPlaces([]);
    setWaiting(true);
    const response = await fetch(
      'https://us-central1-lunchapp-330918.cloudfunctions.net/zipCode/pickForMe',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
        body: JSON.stringify({
          zipCode,
        }),
      },
    );

    const data = await response.json();
    setWaiting(false);
    setPlaces([data]);
  };

  const getDirections = async (address) => {
    console.log('address', address);
    // console.log(
    //   `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(address)}`,
    // );
    window.open(`http://maps.apple.com/?daddr=${encodeURIComponent(address)}`);
    return;
  };

  return (
    <div className='App'>
      <header className='App-header'>
        <ChakraProvider>
          <Container maxWidth='lg' marginBottom='auto' paddingTop='20px'>
            <Grid
              width='full'
              templateRows='repeat(3, 1fr)'
              templateColumns='repeat(2, 1fr)'
              gap={4}
            >
              <GridItem colSpan={2}>
                <Heading textColor='black'>Lunch Finder</Heading>
              </GridItem>
              <GridItem colSpan={2}>
                <Input
                  backgroundColor={isValidZip(zipCode) || zipCode === '' ? 'white' : 'red.100'}
                  textColor='black'
                  placeholder='Zip Code'
                  size='md'
                  onChange={(event) => setZipCode(event.target.value)}
                />
              </GridItem>
              <GridItem colSpan={1}>
                <Button
                  onClick={letMeChooseSetPlaces}
                  isDisabled={!isValidZip(zipCode) || waiting}
                  colorShceme='blue'
                  variant='outline'
                  backgroundColor='gray.100'
                  textColor='black'
                  width='full'
                >
                  Let Me Choose
                </Button>
              </GridItem>
              <GridItem colSpan={1}>
                <Button
                  onClick={async () => await pickForMe()}
                  isDisabled={!isValidZip(zipCode) || waiting}
                  colorScheme='blue'
                  width='full'
                >
                  Pick for me
                </Button>
              </GridItem>
              {/* <GridItem colSpan={2}>
                  <p>{zipCode}</p>
                </GridItem> */}
              {waiting ? (
                <GridItem colSpan={2}>
                  <Spinner
                    thickness='4px'
                    speed='.7s'
                    emptyColor='white'
                    color='blue.500'
                    size='xl'
                  />
                </GridItem>
              ) : undefined}
              <Places places={places} onDirections={getDirections} />
            </Grid>
          </Container>
        </ChakraProvider>
        {/* <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField id="zip-code" label="Zip Code" variant="outlined" />
          </Grid>
          <Grid container spacing={12} justifyContent='center'>
            <Grid item xs={4}>
              <AwesomeButton type="primary">Pick for me</AwesomeButton>
            </Grid>
            <Grid item xs={4}>
              <AwesomeButton type="instagram">Let me choose</AwesomeButton>
            </Grid>
          </Grid>
        </Grid> */}
      </header>
    </div>
  );
};

function isValidZip(zipCode) {
  return /^\d{5}(-\d{4})?$/.test(zipCode);
}

export default App;

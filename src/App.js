import { useState } from 'react';
// import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';
// import { TextField, Button, Grid } from '@mui/material';
import { FiMapPin } from 'react-icons/fi';
import {
  Alert,
  AlertIcon,
  Button,
  ChakraProvider,
  Container,
  Grid,
  GridItem,
  Heading,
  IconButton,
  Input,
  Spinner,
} from '@chakra-ui/react';
import { AwesomeButton } from 'react-awesome-button';
import 'react-awesome-button/dist/styles.css';

import PickButton from './components/Button';
import Places from './components/Places';

const App = function () {
  const [location, setLocation] = useState('');
  const [places, setPlaces] = useState([]);
  const [waiting, setWaiting] = useState(false);
  const [userLocation, setUserLocation] = useState({});
  const [geoError, setGeoError] = useState(false);
  const [geoErrorMessage, setGeoErrorMessage] = useState('');

  // useEffect(() => {
  //   const getPlace = async () => {
  //     const placeFromServer = await pickForMe();
  //     setPlaces(placeFromServer);
  //   }
  //   getPlace();
  // }, [])
  const getLocation = async () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        console.log(position);
        setUserLocation({
          lat: position.coords.latitude,
          long: position.coords.longitude,
        });
        setLocation(`${position.coords.latitude}, ${position.coords.longitude}`);
      },
      (error) => {
        setGeoError(true);
        setGeoErrorMessage(error.message);
      },
    );
  };

  const letMeChooseSetPlaces = async () => {
    setGeoError(false);
    setPlaces([]);
    setWaiting(true);
    const response = await fetch(
      'https://us-central1-lunchapp-330918.cloudfunctions.net/zipCode/letMeChoose',
      // 'http://localhost:3001/letMeChoose',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          location,
        }),
      },
    );

    const data = await response.json();

    setWaiting(false);
    setPlaces([...data]);
  };

  const pickForMe = async () => {
    setGeoError(false);
    setPlaces([]);
    setWaiting(true);
    const response = await fetch(
      'https://us-central1-lunchapp-330918.cloudfunctions.net/zipCode/pickForMe',
      // 'http://localhost:3001/pickForMe',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
        body: JSON.stringify({
          location,
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
            <Grid width='full' autoRows='auto' templateColumns='repeat(6, 1fr)' gap={4}>
              <GridItem colSpan={6}>
                <Heading textColor='black'>Lunch Finder</Heading>
              </GridItem>
              {geoError ? (
                <GridItem colSpan={6}>
                  <Alert status='error' textColor='black' fontSize='md' borderRadius='md'>
                    <AlertIcon /> {geoErrorMessage}
                  </Alert>
                </GridItem>
              ) : undefined}
              <GridItem colSpan={5}>
                <Input
                  backgroundColor={isValidZip(location) || location === '' ? 'white' : 'red.100'}
                  textColor='black'
                  placeholder='Zip Code'
                  size='md'
                  onChange={(event) => {
                    setLocation(event.target.value);
                    setGeoError(false);
                  }}
                  value={location}
                />
              </GridItem>
              <GridItem colSpan={1}>
                <IconButton
                  icon={<FiMapPin />}
                  colorScheme='blue'
                  onClick={getLocation}
                  isDisabled={waiting}
                />
              </GridItem>
              <GridItem colSpan={3}>
                <Button
                  onClick={letMeChooseSetPlaces}
                  isDisabled={!isValidZip(location) || waiting}
                  colorScheme='teal'
                  // variant='outline'
                  width='full'
                >
                  Let Me Choose
                </Button>
              </GridItem>
              <GridItem colSpan={3}>
                <Button
                  onClick={async () => await pickForMe()}
                  isDisabled={!isValidZip(location) || waiting}
                  colorScheme='blue'
                  width='full'
                >
                  Pick for me
                </Button>
              </GridItem>
              {/* <GridItem colSpan={2}>
                  <p>{location}</p>
                </GridItem> */}
              {waiting ? (
                <GridItem colSpan={6}>
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

function isValidZip(location) {
  return (
    /^\d{5}(-\d{4})?$/.test(location) ||
    /^[+-]?([1-8]?\d(\.\d+)?|90(\.0+)?),\s[+-]?(180(\.0+)?|((1[0-7]\d)|([1-9]?\d))(\.\d+)?)$/.test(
      location,
    )
  );
}

export default App;

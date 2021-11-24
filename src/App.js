import { useState, useEffect } from 'react';
// import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';
// import { TextField, Button, Grid } from '@mui/material';
import { Button, ChakraProvider, Container, Flex, Grid, GridItem, Heading, Input } from '@chakra-ui/react';
import { AwesomeButton } from 'react-awesome-button';
import "react-awesome-button/dist/styles.css";

import PickButton from './components/Button';
import Places from './components/Places';

function App() {
  const [zipCode, setZipCode] = useState('');
  const [places, setPlaces] = useState([]);

  // useEffect(() => {
  //   const getPlace = async () => {
  //     const placeFromServer = await pickForMe();
  //     setPlaces(placeFromServer);
  //   }
  //   getPlace();
  // }, [])

  const pickForMe = async () => {
    const response = await fetch('https://us-central1-lunchapp-330918.cloudfunctions.net/zipCode/pickForMe', {
      method: 'POST',
      'headers': {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "zipCode": 27518
      })})
    const data = await response.json();
    
    console.log('hey');
    alert(zipCode);
    return data;
  }

  return (
    <div className="App">
      <header className="App-header">
        <ChakraProvider>
          <Container maxWidth='lg' marginBottom='auto' paddingTop='20px'>
              <Grid width='full' templateRows='repeat(3, 1fr)' templateColumns='repeat(2, 1fr)' gap={4}>
                <GridItem colSpan={2}>
                  <Heading textColor='black'>Lunch Finder</Heading>
                </GridItem>
                <GridItem colSpan={2}>
                  <Input backgroundColor={isValidZip(zipCode) || zipCode === '' ? 'white': 'red.100'} textColor='black' placeholder="Zip Code" size='md'onChange={(e) => setZipCode(e.target.value)} />
                </GridItem>
                <GridItem colSpan={1}>
                  <Button onClick={() => console.log('hey pup')} isDisabled={!isValidZip(zipCode)} colorShceme='blue' variant='outline' backgroundColor='gray.100' textColor='black' width='full'>Pick For Me</Button>
                  {/* <PickButton text='Let Me Choose'/> */}
                </GridItem>
                <GridItem colSpan={1}>
                  <Button isDisabled={!isValidZip(zipCode)} colorScheme='blue' width='full'>Pick for me</Button>
                </GridItem>
                <GridItem colSpan={2}>
                  <p>{zipCode}</p>
                </GridItem>
                <Places />
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
}

function isValidZip(zipCode) {
  return /^\d{5}(-\d{4})?$/.test(zipCode);
}


export default App;

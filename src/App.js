import { useState, useEffect } from 'react';
import './App.css';
// import { TextField, Button, Grid } from '@mui/material';
import { Button, ChakraProvider, Container, Flex, Grid, GridItem, Heading, Input } from '@chakra-ui/react';
import { AwesomeButton } from 'react-awesome-button';
import "react-awesome-button/dist/styles.css";

function App() {
  const [zipCode, setZipCode] = useState('');

  const pickForMe = (event) => {
    event.preventDefault();
    
    console.log('hey');
    alert(zipCode);
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
                  <Button onClick={pickForMe} isDisabled={!isValidZip(zipCode)} colorShceme='blue' variant='outline' backgroundColor='gray.100' textColor='black' width='full'>Let me choose</Button>
                </GridItem>
                <GridItem colSpan={1}>
                  <Button isDisabled={!isValidZip(zipCode)} colorScheme='blue' width='full'>Pick for me</Button>
                </GridItem>
                <GridItem colSpan={2}>
                  <p>{zipCode}</p>
                </GridItem>
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

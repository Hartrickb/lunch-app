import './App.css';
// import { TextField, Button, Grid } from '@mui/material';
import { Button, ChakraProvider, Container, Flex, Grid, GridItem, Heading, Input } from '@chakra-ui/react';
import { AwesomeButton } from 'react-awesome-button';
import "react-awesome-button/dist/styles.css";

function App() {
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
                  <Input backgroundColor='white' textColor='black' placeholder="Zip Code" size='md'/>
                </GridItem>
                <GridItem colSpan={1}>
                  <Button colorShceme='blue' variant='outline' backgroundColor='gray.100' textColor='black' width='full'>Let me choose</Button>
                </GridItem>
                <GridItem colSpan={1}>
                  <Button colorScheme='blue' width='full'>Pick for me</Button>
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

export default App;

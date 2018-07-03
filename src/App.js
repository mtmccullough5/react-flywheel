import React, { Component } from 'react';
import { Container, Grid, Header, Segment } from 'semantic-ui-react';
import './App.css';
import FlyBuild from './FlyBuild';
import FlySim from './FlySim';

class App extends Component {

  flywheelDataCall = (energyStorage) => {
    this.setState({energyStorage})
  }

  render() {
    return (
      <Container>
          <Segment className='margery'><Header as='h1'>Try a Flywheel</Header></Segment>
          <Grid stretched>
            <Grid.Column width={4}>
              <FlyBuild getEnergyStorage = {this.flywheelDataCall}/>
            </Grid.Column>
            <Grid.Column width={12}>
              <FlySim />
            </Grid.Column>
          </Grid>
      </Container>
    );
  }
}

export default App;

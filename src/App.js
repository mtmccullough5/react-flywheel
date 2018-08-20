import React, { Component } from 'react';
import { Container, Grid, Header, Segment } from 'semantic-ui-react';
import './App.css';
import FlyBuild from './FlyBuild';
import FlySim from './FlySim';

class App extends Component {
  state = {
    flywheelStorage: 0.0,
    baseProfile: []
  }
  baseProfileCall = (baseProfile) => {
    this.setState({baseProfile})
  }
  flywheelStorageCall = (flywheelStorage) => {
    this.setState({flywheelStorage})
  }
  render() {
    return (
      <Container>
        <Container>
            <Segment className='margery' color='blue'>
              <Header as='h1'>
                Build and Simulate an Energy Storage Flywheel
              </Header>
            </Segment>
            <Grid stackable stretched>
              <Grid.Column width={4}>
                <FlyBuild 
                  getFlywheelStorage = {this.flywheelStorageCall}
                  getBaseProfile = {this.baseProfileCall}
                />
              </Grid.Column>
              <Grid.Column width={12}>
                <FlySim 
                  flywheelStorage = {this.state.flywheelStorage}
                  baseProfile = {this.state.baseProfile}
                />
              </Grid.Column>
            </Grid>
        </Container>
        <br />
        <span>Version 1.0 Copyright &copy; 2018  Matthew McCullough </span>
        <a href="https://github.com/mtmccullough5/react-flywheel">Source</a>
      </Container>
    );
  }
}

export default App;

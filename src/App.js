import React, { Component } from 'react';
import { Container, Grid, Header, Segment } from 'semantic-ui-react';
import './App.css';
import FlyBuild from './FlyBuild';
import FlyStats from './FlyStats';
import FlySim from './FlySim';

class App extends Component {
  render() {
    return (
      <Container>
          <Segment><Header as='h1'>Try a Flywheel</Header></Segment>
          <Grid stretched>
            <Grid.Column width={4}>
              <FlyBuild />
              <FlyStats />
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

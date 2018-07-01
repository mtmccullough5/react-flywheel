import React from 'react'
import { Card, Segment, Label } from 'semantic-ui-react'

class FlySim extends React.Component {
  render (){
    return (
      <Segment>
        <Card.Header as='h2'>Flywheel Stats</Card.Header>
        <Card.Content>
          <Label>Max Speed</Label>
          <Segment raised>1000</Segment>
          <Label>Energy Capacity</Label>
          <Segment raised>133000</Segment>
        </Card.Content>
      </Segment>
    )
  }
}

export default FlySim
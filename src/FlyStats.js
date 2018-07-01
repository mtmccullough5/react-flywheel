import React from 'react'
import { Card, Segment, Label } from 'semantic-ui-react'

class FlyStats extends React.Component {
  render (){
    return (
      <Card>
        <Card.Header as='h2'>Flywheel Stats</Card.Header>
        <Card.Content>
          <Label>Max Speed</Label>
          <Segment raised>1000</Segment>
          <Label>Energy Capacity</Label>
          <Segment raised>133000</Segment>
        </Card.Content>
      </Card>
    )
  }
}

export default FlyStats
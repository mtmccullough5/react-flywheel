import React from 'react'
import { 
  Form,
  Header, 
  Segment, 
  Label, 
  Container,
  Dropdown } from 'semantic-ui-react'
import appData from './Data.json'

class FlyBuild extends React.Component {
  state = { 
    radius: 0.0, 
    height: 0.0,
    quantity: 0,
    energyStorage:0,
    maxSpeed:0 
  }

  handleChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value });
  }

  handleBlur = (e) => {
    e.preventDefault();
    let { radius, height, quantity} = this.state
    if (radius > 0 && height > 0 && quantity > 0) {
      const density = appData.steel.density_kgm3
      const yieldStrength = appData.steel.yield_strength_Pa
      const poissonRatio = appData.steel.poisson_ratio
      let { radius, height, quantity} = this.state
      const denominator = (3+poissonRatio/8)*density*Math.pow(radius,2) //kg/m^3*m^2 = kg/m
      const omegaMax = Math.sqrt(yieldStrength/denominator) // J/m^3*m/kg = J/(m^2*kg)
      const maxSpeed = omegaMax/(2*Math.PI)*60 //
      const volume = Math.PI*Math.pow(radius,2)*height //m^3
      const mass = volume*density //kg
      const momentOfInertia = 0.5*mass*Math.pow(radius,2) //kg*m^2
      const energyStorage = 0.5*momentOfInertia*Math.pow(omegaMax,2)*quantity/1000/3600 // kgm^2*J/(m^2*kg)= J
      this.props.getFlywheelStorage(energyStorage)
      this.setState({maxSpeed, energyStorage})
    }
  }

  onSimSelect = ( e, data) => {
    let simType = data.value
    let baseProfile = []
    appData.simulation.map( hour => {
      baseProfile.push({ hour: hour.Hour, energy: hour[simType]})
      return baseProfile
    })
    this.props.getBaseProfile(baseProfile)
    this.setState({baseProfile:baseProfile})
  }


  render() {
    const { radius, height, quantity} = this.state
    return (
      <Container>
        <Segment color="olive">
          <Header as='h2'>Choose Flywheel Properties</Header>
          <Container>
            <Form>
              <Label>Radius (m)</Label>    
              <Form.Input
                className='inputMargery' 
                fluid
                placeholder="Radius"
                name="radius"
                value={radius}
                onChange={this.handleChange}
                onBlur={this.handleBlur}
              />
              <Label>Height (m)</Label>
              <Form.Input 
                className='inputMargery'
                fluid 
                placeholder='Height' 
                name='height'
                value={height}
                onChange={this.handleChange}
                onBlur={this.handleBlur}
              />
              <Label>Quantity</Label>    
              <Form.Input
                className='inputMargery' 
                fluid
                placeholder="Quantity"
                name="quantity"
                value={quantity}
                onChange={this.handleChange}
                onBlur={this.handleBlur}
              />
            </Form>
          </Container>
        </Segment>
        <Segment color="olive">
        <Header>Simulation Type</Header>
          <Dropdown
            className='inputMargery'
            placeholder='Select Simulation Type' 
            fluid
            selection
            onChange={this.onSimSelect}
            options={appData.simOptions}
          />
        </Segment>
      </Container>
    )
  }
}
export default FlyBuild
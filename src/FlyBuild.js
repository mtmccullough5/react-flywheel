import React from 'react'
import { 
  Dropdown, 
  Form, 
  Card, 
  Segment, 
  Label, 
  Container
  } from 'semantic-ui-react'
import data from './Data.json'

class FlyBuild extends React.Component {
  state = { 
    materials: data.materials, 
    material: [], 
    materialOptions: [],
    radius: 0.0, 
    height: 0.0,
    energyStorage:0,
    maxSpeed:0 
  }

  componentDidMount() {
    const materialOptions = this.state.materials.map((mat) => {
      mat.text = mat.key;
      mat.value = mat.key;
      return mat;
    });
    this.setState({materialOptions:materialOptions})
  }

  handleChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    let res = this.calculateParameters()
    console.log(res)
    this.props.getEnergyStorage(this.state.energyStorage)
  }

  onMaterialSelect = ( e, data ) => {
    let material = []
    data.options.map( mat => {
      if (mat.key === data.value) {
        material = mat
      }
      return material
    })
    this.setState({material})
  }

  calculateParameters = () => {
    let density = this.state.material.density
    let yieldStrength = this.state.material.yield_strength
    let poissonRatio = this.state.material.poisson_ratio
    let { radius, height } = this.state
    const sigmaMax = yieldStrength
    const denominator = (((3+poissonRatio)/8)*density*radius^2)
    //flash if radius is zero/find out what the cals output compared to 
    //what they should
    const omegaMax = Math.sqrt(sigmaMax/denominator)
    const maxSpeed = omegaMax/(2*Math.PI)*60
    const volume = Math.PI*radius^2*height
    const mass = volume*density
    const momentOfInertia = 0.5*mass*radius^2
    const energyStorage = 0.5*momentOfInertia*omegaMax^2
    return [ maxSpeed, energyStorage ]
  }
  render() {
    const { materialOptions, material, radius, height} = this.state
    return (
      <Container>
        <Segment>
          <Card.Header as='h2'>Choose Flywheel Properties</Card.Header>
          <Card.Content>
            <Form>
              <Label>Material Selection</Label>
              <Dropdown
                className='inputMargery'
                placeholder='Select Material' 
                fluid
                selection
                onChange={this.onMaterialSelect}
                options={materialOptions}
                id='material'
                name='material'
                value={material.key}
              >
              </Dropdown>
              <Label>Radius (m)</Label>    
              <Form.Input
                className='inputMargery' 
                fluid
                placeholder="Radius"
                name="radius"
                value={radius}
                onChange={this.handleChange}
              />
              <Label>Height (m)</Label>
              <Form.Input 
                className='inputMargery'
                fluid 
                placeholder='Height' 
                name='height'
                value={height}
                onChange={this.handleChange}
              />
              <Form.Button content='Test' onClick={this.handleSubmit}/>
            </Form>
          </Card.Content>
        </Segment>
        <Segment>
          <Card.Header as='h2'>Flywheel Stats</Card.Header>
          <Card.Content>
            <Label>Max Speed (RPM)</Label>
            <Segment raised>{this.state.maxSpeed}</Segment>
            <Label>Energy Capacity (kWh)</Label>
            <Segment raised>{this.state.energyStorage}</Segment>
          </Card.Content>
        </Segment>
      </Container>
    )
  }
}
export default FlyBuild
import React from 'react'
import { Dropdown, Form, Card, Container } from 'semantic-ui-react'
import data from './Data.json'

class FlyBuild extends React.Component {
  state = { 
    materials: data.materials, 
    material: [], 
    materialOptions: [],
    radius: 0.0, 
    height: 0.0 
  }
  componentDidMount() {
    const materialOptions = this.state.materials.map((mat) => {
      mat.text = mat.key;
      mat.value = mat.key;
      return mat;
    });
    console.log(materialOptions)
    this.setState({materialOptions:materialOptions})
  }
  handleChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const app = { ...this.state };
    this.props.submit(app)
    this.setState({ ...this.defaultValue });
  }

  onMaterialSelect = ( e, data ) => {
    let material = []
    console.log(data)
    data.options.map( mat => {
      if (mat.key === data.value) {
        material = mat
      }
      return material
    })
    this.setState({material});
  }

  render() {
    const { materialOptions, material, radius, height} = this.state
    return (
      <div>
        <Container textAlign='center' >
          <Card className="margery">
            <Card.Header as='h2'>Choose Flywheel Properties</Card.Header>
            <Card.Content>
              <Form>
                <Form.Field>
                  <Dropdown 
                    placeholder='Select Material' 
                    fluid
                    selection
                    onChange={this.onMaterialSelect}
                    options={materialOptions}
                    id='material'
                    name='material'
                    value={material.name}
                  >
                  </Dropdown>
                </Form.Field>    
                <Form.Input 
                  fluid 
                  label="Radius" 
                  placeholder="Radius"
                  name="radius"
                  value={radius}
                  onChange={this.handleChange}
                />
                <Form.Input 
                  fluid 
                  label='Height' 
                  placeholder='Height' 
                  name='height'
                  value={height}
                  onChange={this.handleChange}
                />
              </Form>
            </Card.Content>
          </Card>
        </Container>
      </div>
    )
  }
}
export default FlyBuild
import React from 'react'
import { connect } from 'react-redux';
import axios from 'axios';
import { Link } from 'react-router-dom'
import { Dropdown, Form, Card, Container } from 'semantic-ui-react'

class FlyBuild extends React.Component {
  state = { materials: [], material: [], radius: 0.0, height: 0.0 }

  componentDidMount() {
    axios.get('/api/materials/index')
      .then( ({ data }) => {
        const newMaterials = data.map((mat) => {
          mat.key = mat.name;
          mat.text = mat.name;
          mat.value = mat.name;
          return mat;
        });
        this.setState({materials: newMaterials });
      });
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
    data.options.map( mat => {
      if (mat.name === data.value) {
        material = mat
      }
      return material
    })
    this.setState({material});
  }

  render() {
    const { materials, material, radius, height} = this.state
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
                    options={materials}
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
        <Link to="/Stats">See The Stats</Link>
      </div>
    )
  }
}
const mapStateToProps = (state) => {
  return { material: state.material }
}
export default connect(mapStateToProps)(FlyBuild)
import React from 'react'
import { Segment, Dropdown, Header } from 'semantic-ui-react'
import { AreaChart, XAxis, YAxis, Area } from 'recharts'
import appData from './Data.json'

class FlySim extends React.Component {
  state = {
    simProfile: []
  }

  onSimSelect = (e, data) => {
    let simType = data.value
    let simProfile = []
    appData.simulation.map( hour => {
      simProfile.push({ hour: hour.Hour, energy: hour[simType]})
      return simProfile
    })
    this.setState({simProfile:simProfile})
  }

  render (){
    console.log(this.state.simProfile)
    return (
      <Segment>
        <Header>Simulation</Header>
        <Dropdown
                className='inputMargery'
                placeholder='Select Material' 
                fluid
                selection
                onChange={this.onSimSelect}
                options={appData.simOptions}
              >
        </Dropdown>
        <AreaChart 
          width={730} 
          height={250} 
          data={this.state.simProfile}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
            <defs>
              <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
              </linearGradient>
            </defs>
          <XAxis dataKey="hour" />
          <YAxis dataKey="energy"/>
          <Area type="monotone" dataKey="energy" stroke="#8884d8" fillOpacity={1} fill="url(#colorUv)" />
        </AreaChart>
      </Segment>
    )
  }
}

export default FlySim
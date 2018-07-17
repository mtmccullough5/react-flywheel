import React from 'react'
import { Segment, Dropdown, Header, Form } from 'semantic-ui-react'
import { AreaChart, XAxis, YAxis, Area } from 'recharts'
import appData from './Data.json'

class FlySim extends React.Component {
  state = {
    simProfile: []
  }

  onSimSelect = ( e, data) => {
    let simType = data.value
    let simProfile = []
    appData.simulation.map( hour => {
      simProfile.push({ hour: hour.Hour, energy: hour[simType]})
      return simProfile
    })
    this.setState({simProfile:simProfile})
  }


  maxFinder = (demandProfile,storage,iter) => {
    let max = Math.max(...demandProfile)
    demandProfile = demandProfile.filter( e => e!== max )
    let max2 = Math.max(...demandProfile)
    if ((max-max2)*iter > storage){
        var newMax = (max*iter-storage)/iter
        return newMax
     } 
    else {
        storage = storage-(max-max2)*iter
        iter+=1
        return this.maxFinder(demandProfile, storage, iter)
     }
  }


  onSimRun = () => {
    let simProfile = this.state.simProfile
    let demandProfile = []
    simProfile.map(hour =>{
      return demandProfile.push(hour.energy)
    })
    let energyStorage = this.props.energyStorage
    let max = this.maxFinder(demandProfile, energyStorage, 1) //add in actual storage
    let newDemandProfile = []
    simProfile.map( hour => {
      if (hour.energy >= max) {
        return newDemandProfile.push({hour: hour.hour, energy: max})
      } else {
        return newDemandProfile.push({hour: hour.hour, energy: hour.energy})
      }
    })
    console.log(simProfile)
    console.log(newDemandProfile)
  }

  render (){
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
        <Form.Button content='Test' onClick={this.onSimRun}/>
      </Segment>
    )
  }
}

export default FlySim
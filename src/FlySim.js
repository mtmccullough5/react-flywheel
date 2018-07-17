import React from 'react'
import { Segment, Dropdown, Header, Form } from 'semantic-ui-react'
import { AreaChart, XAxis, YAxis, Area, Tooltip } from 'recharts'
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

  average = (arr) => {
    return arr.reduce(( p, c ) => p + c, 0 ) / arr.length
  }

  maxFinder = (demandProfile,storage,iter) => {
    let max = Math.max(...demandProfile)
    demandProfile = demandProfile.filter( e => e!== max )
    let max2 = Math.max(...demandProfile)
    if ((max-max2)*iter > storage){
        let newMax = (max*iter-storage)/iter
        return newMax
     } 
    else {
        storage = storage-(max-max2)*iter
        iter+=1
        return this.maxFinder(demandProfile, storage, iter)
     }
  }

  minFinder = (demandProfile,storage,iter,demandAverage) => {
    let min = Math.min(...demandProfile)
    demandProfile = demandProfile.filter( e => e!== min )
    let min2 = Math.min(...demandProfile)
    if ((min2-min)*iter > storage){
        let newMin = (min*iter+storage)/iter
        return newMin
     } 
    else {
        storage = storage-(min2-min)*iter
        iter+=1
        return this.minFinder(demandProfile, storage, iter)
     }
  }

  determineStorage = (demandProfile,flywheelStorage) => {
    const demandAverage = this.average(demandProfile)
    let [dischargeStorage,chargeStorage] = demandProfile.map( value => {
      let dischargeStorage = 0
      let chargeStorage = 0
      if (value > demandAverage) {
        return dischargeStorage+=value
      }
      else if (value < demandAverage) {
        return chargeStorage+=value
      }
      return [dischargeStorage,chargeStorage]
    })
    return Math.min(dischargeStorage, chargeStorage, flywheelStorage)
  }

  onSimRun = () => {
    let simProfile = this.state.simProfile
    let demandProfile = []
    simProfile.map(hour =>{
      return demandProfile.push(hour.energy)
    })
    let flywheelStorage = this.props.flywheelStorage
    let storage = this.determineStorage(demandProfile,flywheelStorage)
    let max = this.maxFinder(demandProfile, storage, 1)
    let min = this.minFinder(demandProfile, storage, 1)
    let newDemandProfile = []
    simProfile.map( hour => {
      if (hour.energy >= max) {
        return newDemandProfile.push({hour: hour.hour, energy: max})
      } else if (hour.energy <= min) {
        return newDemandProfile.push({hour: hour.hour, energy: min})
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
        <Form.Button content='Test' onClick={this.onSimRun}/>
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
              <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#82ca9d" stopOpacity={0}/>
              </linearGradient>
            </defs>
          <XAxis dataKey="hour" />
          <YAxis dataKey="energy"/>
          <Tooltip />
          <Area type="monotone" dataKey="baseline" stroke="#8884d8" fillOpacity={1} fill="url(#colorUv)" />
          
        </AreaChart>

      </Segment>
    )
  }
}
//<Area type="monotone" dataKey="withStorage" stroke="#82ca9d" fillOpacity={1} fill="url(#colorPv)" />
export default FlySim
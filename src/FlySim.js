import React from 'react'
import { 
  Segment, 
  Label, 
  Divider,
  Container,
  Grid
} from 'semantic-ui-react'
import { 
  AreaChart, 
  XAxis, 
  YAxis, 
  Area, 
  Tooltip,
  Legend,
  ResponsiveContainer} from 'recharts'


class FlySim extends React.Component {
  state = {
    baseProfile: [],
    chartData: [],
    flywheelStorage: 0.0,
  }

  componentDidUpdate(prevProps) {
    
  } 

  average = (arr) => {
    return arr.reduce(( p, c ) => p + c, 0 ) / arr.length
  }

  maxFinder = (profile,storage,iter) => {
    let max = Math.max(...profile)
    profile = profile.filter( e => e!== max )
    let max2 = Math.max(...profile)
    if ((max-max2)*iter > storage){
        let newMax = (max*iter-storage)/iter
        return newMax
     } 
    else {
        storage = storage-(max-max2)*iter
        iter+=1
        return this.maxFinder(profile, storage, iter)
     }
  }

  minFinder = (profile,storage,iter) => {
    let min = Math.min(...profile)
    profile = profile.filter( e => e!== min )
    let min2 = Math.min(...profile)
    if ((min2-min)*iter > storage){
        let newMin = (min*iter+storage)/iter
        return newMin
     } 
    else {
        storage = storage-(min2-min)*iter
        iter+=1
        return this.minFinder(profile, storage, iter)
     }
  }

  determineStorage = (profile,flywheelStorage) => {
    const demandAverage = this.average(profile)
    let [dischargeStorage,chargeStorage] = profile.map( value => {
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
  //<Form.Button content='Test' onClick={this.onSimRun}/>
  onSimRun = () => {
    let baseProfile = this.props.baseProfile
    let simProfile = []
    let profile = []
    baseProfile.map(hour => {
      return profile.push(hour.energy)
    })
    let flywheelStorage = this.props.flywheelStorage
    let storage = this.determineStorage(profile,flywheelStorage)
    let max = this.maxFinder(profile, storage, 1)
    let min = this.minFinder(profile, storage, 1)
    baseProfile.map( hour => {
      if (hour.energy >= max) {
        return simProfile.push({hour: hour.hour, energy: max})
      } else if (hour.energy <= min) {
        return simProfile.push({hour: hour.hour, energy: min})
      } else {
        return simProfile.push({hour: hour.hour, energy: hour.energy})
      }
    })
    let chartData = []
    baseProfile.map( (hour,index) => {
      chartData.push({
        hour:hour.hour, 
        baseline:hour.energy, 
        simulation:simProfile[index].energy
      })
      return chartData
    }) 

    this.setState({chartData:chartData})
  }

  render (){
    return (
      <Segment color="blue">
        <Grid columns={3}>
        <Grid.Row>
        <ResponsiveContainer 
          minWidth={200} 
          minHeight={300}
          height="80%">
          <AreaChart 
              data={this.state.chartData}
              margin={{ top: 20, right: 10, left: 0, bottom: 20 }}
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
            <YAxis dataKey="baseline"/>
            <Tooltip />
            <Legend verticalAlign="bottom" height={36}/>
            <Area type="monotone" dataKey="baseline" stroke="#8884d8" fillOpacity={1} fill="url(#colorUv)" />
            <Area type="monotone" dataKey="simulation" stroke="#82ca9d" fillOpacity={1} fill="url(#colorPv)" />
          </AreaChart>
        </ResponsiveContainer>
        </Grid.Row>
        <Divider/>
        <Grid.Row>
        <Grid.Column>
            <Container>
              <Label>Energy Capacity (kWh)</Label>
              <Segment raised>{this.props.flywheelStorage.toFixed(1)}</Segment>
            </Container>
        </Grid.Column>
        <Grid.Column>
            <Container>
              <Label>Energy Capacity (kWh)</Label>
              <Segment raised>{this.props.flywheelStorage.toFixed(1)}</Segment>
            </Container>
        </Grid.Column>
        <Grid.Column>
            <Container>
              <Label>Energy Capacity (kWh)</Label>
              <Segment raised>{this.props.flywheelStorage.toFixed(1)}</Segment>
            </Container>
        </Grid.Column>
        </Grid.Row>
        </Grid>
      </Segment>
    )
  }
}

export default FlySim
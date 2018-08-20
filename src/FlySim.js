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
  ResponsiveContainer
} from 'recharts'


class FlySim extends React.Component {
  state = {
    peakStart:13,
    peakEnd:19,
    offPeakStart:21,
    offPeakEnd: 9,
    rateSchedule: {
      offPeak: 0.217,
      onPeak: 0.268
    }
  }
  shouldComponentUpdate(nextProps) {
    if (nextProps.flywheelStorage !== 0 && nextProps.baseProfile.length === 24) {
      return true
    }
    return false
  } 
  
  simProfileBuild = (baseProfile,energyStorage) => {
    let simProfile = []
    const peakPeriod = this.state.peakEnd-this.state.peakStart
    baseProfile.map( (demand,index) => {
      if (index > this.state.peakStart && index < this.state.peakEnd) {
        simProfile.push(demand-energyStorage/(peakPeriod))
      } else {
        simProfile.push(demand+energyStorage/(baseProfile.length-(peakPeriod)))
      } return simProfile
    })
    return simProfile
  }

  chartDataBuild = (baseProfile,simProfile) => {
    let chartData = []
    baseProfile.map( (value,index) => {
      chartData.push({
        hour:index, 
        baseline:value, 
        simulation:simProfile[index]
      })
      return chartData
    })
    return chartData
  }

  render () {
    let baseProfile = []
    let simProfile = []
    let flywheelStorage = 0
    let chartData = []
    let costSavings = 0
    const offPeakRate = this.state.rateSchedule.offPeak
    const onPeakRate = this.state.rateSchedule.onPeak
    const daysPerYear = 365
    if (this.props.flywheelStorage !== 0 && this.props.baseProfile.length === 24) {
      baseProfile = this.props.baseProfile
      flywheelStorage = this.props.flywheelStorage
      simProfile = this.simProfileBuild(baseProfile,flywheelStorage)
      chartData = this.chartDataBuild(baseProfile,simProfile)
      costSavings = flywheelStorage*(onPeakRate-offPeakRate)*daysPerYear
    }
    

    return (
      <Segment color="blue">
        <Grid columns={2}>
        <Grid.Row>
          <ResponsiveContainer 
            minWidth={200} 
            minHeight={320}
            height="100%">
            <AreaChart 
                data={chartData}
                margin={{ top: 20, right: 30, left: 0, bottom: 0 }}
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
              <XAxis dataKey="hour"/>
              <YAxis 
                dataKey="simulation" 
                label={{ value: "kWh", angle: -90, position: 'insideLeft', offset:15 }}
              />
              <Tooltip />
              <Legend verticalAlign="bottom" height={30}/>
              <Area type="monotone" dataKey="baseline" stroke="#8884d8" fillOpacity={1} fill="url(#colorUv)" />
              <Area type="monotone" dataKey="simulation" stroke="#82ca9d" fillOpacity={1} fill="url(#colorPv)" />
            </AreaChart>
          </ResponsiveContainer>
        </Grid.Row>
        <Divider />
        <Grid.Row>
        <Grid.Column>
            <Container>
              <Label>Energy Capacity (kWh)</Label>
              <Segment raised>{this.props.flywheelStorage.toFixed(1)}</Segment>
            </Container>
        </Grid.Column>
        <Grid.Column>
            <Container>
              <Label>Energy Cost Savings($/year)</Label>
              <Segment raised>{costSavings.toFixed(0)}</Segment>
            </Container>
        </Grid.Column>
        </Grid.Row>
        </Grid>
      </Segment>
    )
  }
}

export default FlySim
import React from 'react'
import { Segment } from 'semantic-ui-react'
import { AreaChart, XAxis, YAxis, Area } from 'recharts'
import data from './Data.json'

class FlySim extends React.Component {
  render (){
    console.log(data.simulation)
    return (
      <Segment>
        <AreaChart width={730} height={250} data={data.simulation}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
              </linearGradient>
            </defs>
          <XAxis dataKey="Hour" />
          <YAxis dataKey="Medium Office"/>
          <Area type="monotone" dataKey="Medium Office" stroke="#8884d8" fillOpacity={1} fill="url(#colorUv)" />
        </AreaChart>
      </Segment>
    )
  }
}

export default FlySim
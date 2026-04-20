import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { debrisData } from '../data/debrisData.js'

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="rounded-lg border border-aurora/30 bg-black/90 p-3 shadow-lg backdrop-blur-sm">
        <p className="text-sm text-aurora">{`年份: ${label}`}</p>
        <p className="text-sm text-white">{`碎片数量: ${payload[0].value}`}</p>
      </div>
    )
  }
  return null
}

export default function DebrisChart() {
  return (
    <div className="h-80 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={debrisData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#00F3FF20" />
          <XAxis
            dataKey="year"
            stroke="#00F3FF"
            fontSize={12}
            tick={{ fill: '#00F3FF' }}
          />
          <YAxis
            stroke="#00F3FF"
            fontSize={12}
            tick={{ fill: '#00F3FF' }}
          />
          <Tooltip content={<CustomTooltip />} />
          <Line
            type="monotone"
            dataKey="count"
            stroke="#FF4B2B"
            strokeWidth={3}
            dot={{ fill: '#FF4B2B', strokeWidth: 2, r: 4 }}
            activeDot={{ r: 6, fill: '#00F3FF' }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
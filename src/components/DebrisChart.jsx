import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { debrisData } from '../data/debrisData.js'

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="rounded-card border border-border bg-surface px-3 py-2 shadow-card text-sm">
        <p className="font-medium text-ink">年份: {label}</p>
        <p className="text-space">碎片数量: {payload[0].value.toLocaleString()}</p>
      </div>
    )
  }
  return null
}

export default function DebrisChart() {
  return (
    <div className="h-72 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={debrisData} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#E5E4E0" />
          <XAxis dataKey="year" stroke="#8A8A87" fontSize={11} tick={{ fill: '#6B6B68' }} />
          <YAxis stroke="#8A8A87" fontSize={11} tick={{ fill: '#6B6B68' }} />
          <Tooltip content={<CustomTooltip />} />
          <Line
            type="monotone" dataKey="count" stroke="#3C5488" strokeWidth={2.5}
            dot={{ fill: '#3C5488', strokeWidth: 2, stroke: '#fff', r: 3.5 }}
            activeDot={{ r: 5, fill: '#E64B35', stroke: '#fff', strokeWidth: 2 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

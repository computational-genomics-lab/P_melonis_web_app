// js to generate the barplot or barchart

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const Barchart = ({ data }) => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="order" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="strainCount" fill="#8884d8" />
      </BarChart>
    </ResponsiveContainer>
  );
};
export default Barchart;

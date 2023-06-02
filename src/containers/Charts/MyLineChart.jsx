import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from "recharts";
const data = [
    { time: '12:00', uv: 55 },
    { time: '1:00', uv: 40 },
    { time: '2:00', uv: 66 },
    { time: '3:00', uv: 10 },
    { time: '4:00', uv: 50 },
    { time: '5:00', uv: 45 },
    { time: '6:00', uv: 66 },
    { time: '7:00', uv: 80 },
    { time: '8:00', uv: 37 },
    { time: '9:00', uv: 64 },
    { time: '10:00', uv: 40 },
    { time: '11:00', uv: 40 },
];

export const MyLineChart = () => {
    return <>
        <p style={{ color: "#4A4A65", fontWeight: 700, fontSize: "32px", marginLeft: "50px"}} >
            Token Price
        </p>
        <LineChart width={1057} height={425} data={data} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
            <defs>
                <linearGradient id="colorUv" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="50%" stopColor="#9747FF" stopOpacity={1} />       {/* offset: % chiem lay */}
                    <stop offset="95%" stopColor="#14F4C9" stopOpacity={0.4} />
                </linearGradient>
            </defs>

            <Line type="monotone" dataKey="uv" dot={false} strokeWidth={5} stroke="url(#colorUv)" />
            <Tooltip />
            <CartesianGrid stroke="#ccc" vertical={false} />
            <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{ fill: "#ccc", fontSize: 12  }}/>
            <YAxis dataKey="uv" axisLine={false} tickLine={false} tick={{ fill: "#ccc", fontSize: 12 }}/>
        </LineChart>
    </>
}
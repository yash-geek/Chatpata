import {
    ArcElement,
    CategoryScale,
    Chart as ChartJS,
    Filler,
    Legend,
    LinearScale,
    LineElement,
    PointElement,
    Tooltip
} from 'chart.js';
import { Doughnut, Line } from 'react-chartjs-2';
import { grayColor, purple, purpleLight } from '../../constants/color';
import { getLast7Days } from '../../lib/features';
ChartJS.register(
    Tooltip,
    Filler,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    ArcElement,
    Legend
);

const labels = getLast7Days()
const lineChartOptions = {
    responsive:true,
    plugins:{
        legend:{
            display:false,
        },
        title:{
            display:false,
        },
    },
    scales:{
        x:{
            grid:{
                display:false
            }
        },
        y:{
            beginAtZero:true,
            grid:{
                display:false
            }
        },
    }
}


const LineChart = ({value = []}) => {
    const data = {
        labels,
        datasets:[{
            data:value,
            label:'Revenue',
            fill:true,
            backgroundColor:'rgba(75,192,192,0.2)',
            borderColor:purple
        }],
    }
  return (
    <Line data={data} options={lineChartOptions}/>
  )
}

const doughNutChartOptions = {
    responsive:true,
    plugins:{
        legend:{
            display:false,
        },
        title:{
            display:false,
        },
    },
    cutout:120,
}

const DoughnutChart = ({value = [], labels = []}) => {
    const data = {
        labels,
        datasets:[{
            data:value,
            backgroundColor:['rgba(75,192,192,0.2)',purpleLight],
            borderColor:[purple,grayColor],
            offset:20,
        }],
    }
  return (
    <Doughnut
    style={{
        zIndex:10
    }}
    data = {data}  options={doughNutChartOptions}/>
  )
}

export { DoughnutChart, LineChart };


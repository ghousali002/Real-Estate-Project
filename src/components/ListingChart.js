import React, {useState, useEffect} from 'react'
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import styled from 'styled-components';
import Heading from './ui/Heading';
import axios from 'axios';
import { useSale } from './section-components/Listing/useSale';

const ChartBox = styled.div`
  padding: 2.4rem 2.2rem;
  grid-column: 3 / span 2;
  background-color: var(--color-grey-0);
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1); 

  & .recharts-pie-label-text {
    font-size: 0.5rem;
    font-weight: 600;
  }

  .recharts-legend-text {
    font-size: 12px; // Adjusted for readability
  }
`;

export default function ListingChart() {

  const activeSalesCount = useSale();
  const [activeRentCount, setActiveRentCount] = useState(0); 

  useEffect(() => {
      fetchActiveRentCount();
  }, []);

  const  fetchActiveRentCount = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get('http://localhost:5000/getlistingrent', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
    
        setActiveRentCount(response.data.properties.length);
      } catch (error) {
        console.error('Error fetching rent properties:', error);
      }
    }


    const assignmentData = [
        { name: 'Sale Property', value: activeSalesCount, color: '#07ff51' },
        { name: 'Rent Property', value: activeRentCount, color: '#FFC107' },
      ];
      

  return (
    <ChartBox>
    <Heading as="head1">Property Listings Pie Chart</Heading>
    
   <ResponsiveContainer width='100%' height={300}>
   {activeSalesCount && activeRentCount ? 
     <PieChart>
       <Pie
         data={assignmentData}
         dataKey='value'
         nameKey='name'
         cx='50%'
         cy='50%'
         outerRadius={100}
         fill='#8884d8'
         isAnimationActive={true} 
         animationBegin={0} 
         animationDuration={800} 
         label
         paddingAngle={3}
         startAngle={180}
         endAngle={-180}
       >
         {assignmentData.map((entry, index) => (
           <Cell key={`cell-${index}`} fill={entry.color} />
         ))}
       </Pie>
       <Tooltip />
       <Legend />
     </PieChart>
     : <h6 style={{textAlign: "center", paddingTop: '100px'}}> No Data there</h6>
}
   </ResponsiveContainer>

 </ChartBox>
  )
}

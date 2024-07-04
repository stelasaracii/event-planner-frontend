// import { SimpleGrid } from "@chakra-ui/react";
// import React from "react";
// import EventCard from "../EventCard";
// import { Event } from "../../types/Event";

// const EventList: React.FC<{ eventsData: Event[] }> = ({
//   eventsData
// }) => {
//   // function toggleEventSelection(id: number): void {
//     console.log("selected");
//   }

//   return (
//     <div>
//       <SimpleGrid columns={{ base: 1, md: 4, lg: 6 }} spacing={4}>
//         {eventsData ? (eventsData.map((event) => (
//           <EventCard
//             key={event.id}
//             event={event}
//             isSelected={eventsData.includes(event)}
//             onToggleSelection={() => toggleEventSelection(event.id)}
//           />
//           ))) : (
//             <p>No events available.</p>
//           )}
//       </SimpleGrid>
//     </div>
//   );
// };

// export default EventList;

// import Subtitle from "../Typography/Subtitle"

  
//   function TitleCard({title, children, topMargin, TopSideButtons, TopSideTimKiem }){
//       return(
//           <div className={"card w-full p-6 bg-base-100 shadow-xl " + (topMargin || "mt-6")}>

//             {/* Title for Card */}
//               <Subtitle styleClass={TopSideButtons ? "inline-block" : ""}>
//                 {title}

//                 {/* Top side button, show only if present */}
//                 {
//                     TopSideButtons && <div className="inline-block float-right">{TopSideButtons}</div>
//                 }
//               </Subtitle>
//               <Subtitle styleClass={TopSideButtons ? "inline-block" : ""}>

//                 {/* Top side button, show only if present */}
//                 {
//                     TopSideTimKiem && <div className="inline-block float-right">{TopSideTimKiem}</div>
//                 }
//               </Subtitle>
              
//               <div className="divider mt-2"></div>
          
//               {/** Card Body */}
//               <div className='h-full w-full pb-6 bg-base-100'>
//                   {children}
//               </div>
//           </div>
          
//       )
//   }
  
  
//   export default TitleCard
import Subtitle from "../Typography/Subtitle";

function TitleCard({ title, children, topMargin, TopSideButtons, TopSideTimKiem , ImportExcel }) {
    return (
        <div className={"card w-full p-6 bg-base-100 shadow-xl " + (topMargin || "mt-6")}>

            {/* Title for Card */}
            <Subtitle styleClass="flex items-center justify-between mb-4">
                {title}

                {/* Top side buttons */}
                <div className="flex items-center space-x-4">
                    {TopSideButtons && <div className="inline-block">{TopSideButtons}</div>}
                    {TopSideTimKiem && <div className="inline-block">{TopSideTimKiem}</div>}
                    {ImportExcel && <div className="inline-block">{ImportExcel}</div>}
                </div>
            </Subtitle>

            <div className="divider mt-2"></div>

            {/* Card Body */}
            <div className='h-full w-full pb-6 bg-base-100'>
                {children}
            </div>
        </div>
    );
}

export default TitleCard;

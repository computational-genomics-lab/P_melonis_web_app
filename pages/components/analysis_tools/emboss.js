import React from "react";


const Emboss = () => {
return(
    <div>
<iframe src="https://www.bioinformatics.nl/emboss-explorer/" width="1400px" height="800px"/>
</div>)
}
export default Emboss;

// import { useState } from 'react';

// export default function EmbossTool() {
//     const [sequence, setSequence] = useState('');
//     const [result, setResult] = useState(null);

//     const handleSubmit = async (e) => {
//         e.preventDefault();

//         const response = await fetch('/api/emboss', {
//             method: 'POST',
//             headers: { 'Content-Type': 'application/json' },
//             body: JSON.stringify({ sequence })
//         });
//         const data = await response.json();

//         if (response.ok) {
//             setResult(data.result);
//         } else {
//             console.error(data.error);
//         }
//     };

//     return (
//         <div>
//             <h1>EMBOSS Tool</h1>
//             <form onSubmit={handleSubmit}>
//                 <textarea
//                     value={sequence}
//                     onChange={(e) => setSequence(e.target.value)}
//                     placeholder="Enter your DNA sequence"
//                 />
//                 <button type="submit">Run EMBOSS</button>
//             </form>
//             {result && (
//                 <div>
//                     <h2>Result:</h2>
//                     <pre>{result}</pre>
//                 </div>
//             )}
//         </div>
//     );
// }

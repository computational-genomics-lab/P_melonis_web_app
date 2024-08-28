import OrganismList from './components/viewTypes/listview'
import Treeviewer from './components/viewTypes/newtree'
import { useState, useEffect} from 'react'
import styles from '../styles/Home.module.css';


export default function Home() {

  const [view, setView] = useState('list');



  const treeClick = () => {
    setView('tree');
  };
  const listClick = () => {
    setView('list');
  }

//below is the title for the button
  //const title = isTreeView ? 'Switch to list view' : 'Switch to tree view';

  return (
    <>
      <main >
    
        <div>
        <h1 className={styles.title}>
         <i>Phytophthora melonis</i> genomes
          </h1>

          {/* <button title={title} className='Button' onClick={handleClick}>{isTreeView ? 'List' : 'Tree'}</button> */}
           <button className={`Button ${view === 'list' ? 'Highlighted' : ''}`} onClick={listClick}>List </button>
           <button className={`Button ${view === 'tree' ? 'Highlighted' : ''}`} onClick={treeClick}>Tree</button>
         
      <p>    </p>
      <div>
      {(view == 'list') ?  <OrganismList  /> : <Treeviewer /> }</div>
       
       </div>
     
        <div className='rightcolumn'>
        <h3> There are 4 strains of <i>Phytophthora melonis</i> </h3>
        <br></br>
        <h4>these are the number of scaffolds in each : </h4>
        <p>
          
        <i>Phytophthora melonis</i> strain CJ26: 94 <br></br>
        <i>Phytophthora melonis</i> strain CPHST: 2091 <br></br>
        <i>Phytophthora melonis</i> strain Pmelo_OSU-2014: 11350 <br></br>
        <i>Phytophthora melonis</i> strain WB: 158 <br></br>

        </p>
        <h4>these are the sizes of each : </h4>
        <p>
          
        <i>Phytophthora melonis</i> strain CJ26: 102M <br></br>
        <i>Phytophthora melonis</i> strain CPHST: 109M <br></br>
        <i>Phytophthora melonis</i> strain Pmelo_OSU-2014: 73M <br></br>
        <i>Phytophthora melonis</i> strain WB: 60M <br></br>

        </p>
        </div>
     
      </main>
    </>
  )
}

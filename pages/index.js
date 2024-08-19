import OrganismList from './components/viewTypes/listview'
import Treeviewer from './components/viewTypes/newtree'
import { useState, useEffect} from 'react'
import Statistics from './nav_pages/statistics';
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
        &emsp;  In-house <i>Phytophthora melonis</i> genomes
          </h1>

          <h2> Organisms available in database </h2>
          {/* <button title={title} className='Button' onClick={handleClick}>{isTreeView ? 'List' : 'Tree'}</button> */}
           <button className={`Button ${view === 'list' ? 'Highlighted' : ''}`} onClick={listClick}>List </button>
           <button className={`Button ${view === 'tree' ? 'Highlighted' : ''}`} onClick={treeClick}>Tree</button>
         
      <p>    </p>
      <div>
      {(view == 'list') ?  <OrganismList  /> : <Treeviewer /> }</div>
       
       </div>
     
        <div className='rightcolumn'>
          {/* <Statistics/> */}
        {/* <h3> There are 3 strains of Phytophthora melonis </h3>
        <br></br>
        <h4>these are the number of scaffolds in each : </h4>
        <p>
          
        Phytophthora melonis strain CJ26: 94 <br></br>
        Phytophthora melonis strain CPHST: 2091 <br></br>
        Phytophthora melonis strain Pmelo_OSU-2014: 11350 <br></br>

        </p> */}
        </div>
     
      </main>
    </>
  )
}

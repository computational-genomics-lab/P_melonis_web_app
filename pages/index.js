import OrganismList from './components/viewTypes/listview'
import Treeviewer from './components/viewTypes/newtree'
import { useState} from 'react'
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
        Uploaded Genomes 
          </h1>
          {/* <button title={title} className='Button' onClick={handleClick}>{isTreeView ? 'List' : 'Tree'}</button> */}
           <button className={`Button ${view === 'list' ? 'Highlighted' : ''}`} onClick={listClick}>List </button>
           <button className={`Button ${view === 'tree' ? 'Highlighted' : ''}`} onClick={treeClick}>Tree</button>
         
      <p>    </p>
      <div>
      {(view == 'list') ?  <OrganismList  /> : <Treeviewer /> }</div>
       
       </div>
     
        <div className='rightcolumn'>
        <table>
          <thead>
            <tr>
              <th>Strain</th>
              <th>Number of Scaffolds</th>
              <th>Size</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><i><i>Phytophthora melonis </i> </i>strain CJ26</td>
              <td>94</td>
              <td>105M</td>
            </tr>
            <tr>
              <td><i>Phytophthora melonis </i> strain CPHST BL23</td>
              <td>2091</td>
              <td>112M</td>
            </tr>
            <tr>
              <td><i>Phytophthora melonis </i> strain Pmelo_OSU-2014</td>
              <td>11350</td>
              <td>73M</td>
            </tr>
            <tr>
              <td><i>Phytophthora melonis </i> strain MCC 9865 WB</td>
              <td>158</td>
              <td>63M</td>
            </tr>
          </tbody>
        </table>
        </div>

      </main>
    </>
  )
}

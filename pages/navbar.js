import React from 'react'
import styles from '../styles/Home.module.css'
import Link from 'next/link'

  function Navbar() {

    const mystyle = {
      fontFamily: 'Sans-serif', padding: '20px', fontSize: '35px', marginBottom: '30px'
    }
    return (
   
  
        <nav style= {mystyle} className={styles.mainnav}>

            <ul>
      
          <Link href="/"><li>Home</li></Link>
         <Link href="/nav_pages/query"><li>Query </li></Link>
         {/* <Link href="/nav_pages/statistics"><li>Statistics</li></Link> */}
         <Link href="/nav_pages/tools"><li>Tools</li></Link>
          <Link href="/nav_pages/contact"><li> JBrowse2 </li></Link>
          <Link href="/nav_pages/about"><li>About Us</li></Link>
          
          </ul>
       
      </nav>
      
    )}
  
export default Navbar
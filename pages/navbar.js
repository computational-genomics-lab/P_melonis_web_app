import React from 'react'
import styles from '../styles/Home.module.css'
import Link from 'next/link'


function Navbar() {
  const mystyle = {
    fontFamily: 'Sans-serif',
    padding: '20px',
    fontSize: '35px',
    marginBottom: '30px',
  };

  return (
    <nav style={mystyle} className={styles.mainnav}>
      <ul>
        <li>
          <Link href="/">Home</Link>
        </li>
        <li>
          <Link href="/nav_pages/query" legacyBehavior>
            <a target="_blank" rel="noopener noreferrer">
              Query
            </a>
          </Link>
        </li>
        <li>
          <Link href="/nav_pages/statistics" legacyBehavior>
            <a target="_blank" rel="noopener noreferrer">
              Statistics
            </a>
          </Link>
        </li>
        <li>
          <Link href="/nav_pages/tools" legacyBehavior>
            <a target="_blank" rel="noopener noreferrer">
              Tools
            </a>
          </Link>
        </li>
        <li>
          <Link href="/nav_pages/contact" legacyBehavior>
            <a target="_blank" rel="noopener noreferrer">
              JBrowse2
            </a>
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;


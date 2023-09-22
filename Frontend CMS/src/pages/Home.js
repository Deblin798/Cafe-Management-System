import React from 'react'
import Layout from '../components/common/Layout'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <Layout>
        <div className='home'>
          <div className='headerContainer'>
            <Link to="/menu">
              <button>ORDER NOW</button>
            </Link>
          </div>
        </div>
    </Layout>
  )
}

export default Home
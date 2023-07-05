import React, { Component } from 'react';
import classes from './Transport.module.css';
import Layout from  '../../hoc/Layout/Layout'
import SearchBox from '../../components/SearchBox/SearchBox'

class Transport extends Component {
  render() {

    return(
      <div className={classes.App}>
        <Layout>
          <SearchBox />
        </Layout>
      </div>
    )
  }
}

export default Transport;

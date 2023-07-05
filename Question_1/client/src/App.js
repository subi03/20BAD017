import React, { Component, useState } from 'react';
import Layout from './hoc/Layout/Layout';
import { Route, Switch } from 'react-router-dom';

import SearchForm from './containers/SearchForm/SearchForm'
import TrainDetails from './containers/TrainDetails/TrainDetails'
import BusDetails from './containers/BusDetails/BusDetails'
import Login from './containers/Login/Login'
import Register from './containers/Register/Register'

class Transport extends Component {
  render() {

    return (
      <div>
        <Layout>
          <Switch>
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
            <Route path="/trains" component={TrainDetails} />
            <Route path="/"  exact component={SearchForm} />
          </Switch>
        </Layout>
      </div>
    )
  }
}

export default Transport;

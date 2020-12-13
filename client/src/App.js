import React from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import Web from './components/Web/Web';
import axios from 'axios';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pages: [],
    }

    this.getPages = this.getPages.bind(this);
  }

  getPages = () => {
    axios.get('/api/pages').then(res => this.setState({ pages: res.data}));
  }

  componentDidMount() {
    this.getPages();
  }

  render() {
    return (
      <Router>
        <div>
          <Web pages={this.state.pages} getpages={this.getPages} />
        </div>
      </Router>
    )
  };
};

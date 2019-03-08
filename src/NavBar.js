import React from 'react';

class NavBar extends React.Component {
    render() {
      return (
        <div className="navbar navbar-expand-lg fixed-top navbar-dark bg-dark">
            <div className="container">
                <a href="/" className="navbar-brand">CS 1332 AVL Homework Tester</a>
                <ul class="nav navbar-nav navbar-right">
                  <li className="nav-item"><a href="https://github.com/tillson/avl-test-visualizer">Source</a></li>
                </ul>
            </div>
        </div>
      )
    }
  }

  export default NavBar;
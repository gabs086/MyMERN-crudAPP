import React, { Component } from 'react';// Imports Component module from react
import { Link } from 'react-router-dom';//allows to link to different routes

export default class Navbar extends Component {
    render() {
        return (
            <nav className="purple darken-2">
                <div className="nav-wrapper container">
                    <Link to="/" className="brand-logo"><span className="black-text">M</span>E<span className="blue-text">R</span><span
                        className="green-text">N</span>-CRUD
        App</Link>
                    <ul id="nav-mobile" className="right hide-on-med-and-down">
                        <li>
                            <Link to="/">Add info</Link>
                        </li>
                        <li>
                            <Link to="/list">View Info List</Link>
                        </li>
                    </ul>
                </div>
            </nav>
        )
    }
}
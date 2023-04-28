import React, { Component } from 'react';

class NavbarItem extends Component {
    render() {

        if (this.props.render) {
            return (
                <li className="nav-item">
                    <a onClick={this.props.onClick} className="nav-link" href={this.props.href}>{this.props.label}</a>
                </li>
            );
        } else {
            return false;
        }
    }
}

export default NavbarItem;
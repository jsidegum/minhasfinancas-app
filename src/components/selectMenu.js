import React, { Component } from "react";

class SelectMenu extends Component {

    render() {

        const options = this.props.lista.map((option, index) => {
            return (
                <option key={index} value={option.value} > {option.label} </option>
            )
        })


        return (

            <div>
                <select className="form-control" {...this.props} >
                    {options}
                </select>
            </div >

        )

    }

}

export default SelectMenu
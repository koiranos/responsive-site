import React from 'react';
import './Page.css';

export default class Page extends React.Component {
    render() {
        return (
            <div className=" container-fluid page-style">
                <div className = "row text-center">
                    <div className ="page-row mt-5">
                        <div className = "col-12">
                            <h1 className="page-title pt-5 pb-3"> {this.props.title}</h1>
                        </div>
                        <div className = "col-12">
                            <p className="page-description mt-3 pb-5" >{this.props.description}</p>
                        </div> 
                    </div>
                </div>
            </div>
        )
    }
}
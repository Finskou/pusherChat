import React, { Component } from 'react'
import './UsernameForm.css'

export default class UsernameForm extends Component {
    constructor(props){
        super(props)
        this.state={
            username:'',
        }
        this.onSubmit = this.onSubmit.bind(this)
        this.onChange = this.onChange.bind(this)
    }

onSubmit(event) {
    event.preventDefault()
    this.props.onSubmit(this.state.username)
}

onChange(event){
    this.setState({ username: event.target.value})
}

render() {
    return (
        <div className="inputusername">
        <form id="userform" onSubmit={this.onSubmit} >
            <div className="form-group">
                <label> Enter Username </label>
                <input 
                    type="text" 
                    className="form-control" 
                    value={this.state.value} 
                    onChange={this.onChange}>
                </input>
                    <br />
                <input type="submit" className="btn btn-primary" value="Submit"></input>
            </div>
        </form>
      </div>
    ) 
}}
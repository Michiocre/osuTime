import React, { Component } from 'react';
import '../style/Login.css';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            errorMessage: ''
        };
        this.submitHandler = this.submitHandler.bind(this);
    }

    submitHandler(event) {
        event.preventDefault();

        if (this.state.username.trim() == '') {
            this.setState({errorMessage: 'Username cant be empty.'});
        } else {
            this.props.history.push({
                pathname: '/main/' + this.state.username
            });
        }
    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <form onSubmit={this.submitHandler}>
                            <div className="form-group">
                                <label htmlFor="username">Username</label>
                                <input type="text" className="form-control" id="username" value={this.state.username} onChange={e => this.setState({username: e.target.value})} />
                            </div>
                            <button type="submit" className="btn btn-primary">Submit</button>
                        </form>
                    </div>
                </div>
                <div className="row errorDiv">
                    <div className="col-md-12">
                        <span className=" text-danger">{this.state.errorMessage}</span>
                    </div>
                </div>
            </div>
        );
    }
}

export default Login;

import React, { Component } from 'react';
import { Link} from 'react-router-dom';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: ''
        };
    }

    render() {
        return (
            <div className="container">
                <form>
                    <div className="form-group">
                        <label htmlFor="username">Username</label>
                        <input type="text" className="form-control" id="username" value={this.state.username} onChange={e => this.setState({username: e.target.value})} />
                    </div>
                    <Link to={{pathname: '/main/' + this.state.username}}><button type="submit" className="btn btn-primary">Submit</button></Link>
                </form>
            </div>
        );
    }
}

export default Login;

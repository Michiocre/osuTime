import React, { Component } from 'react';
const config = require('./config/config.json');

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            responseToPost: '',
            response: ''
        };
    }

    componentDidMount() {
        this.callApi()
            .then(res => this.setState({ response: res }))
            .catch(err => console.log(err));
    }

    callApi = async () => {
        const response = await fetch(config.backend + '/hello');
        const body = await response.text();
        console.log(await response);
        if (response.status !== 200) throw Error(body.message);
            return body;
    };

    handleSubmit = async e => {
        e.preventDefault();
        const response = await fetch(config.backend + '/user/' + this.state.username, {
            method: 'GET',
            header: {
                'Content-Type': 'application/json'
            }
        });
        const body = await response.text();

        this.setState({responseToPost: body});
    }

    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <h1>{this.state.response}</h1>
                    <form onSubmit={this.handleSubmit}>
                        <strong>Username:</strong>
                        <input
                            type="text"
                            value={this.state.username}
                            onChange={e => this.setState({username: e.target.value})}
                        />
                        <button type="submit">Nicer</button>
                    </form>
                    <p>{this.state.responseToPost}</p>
                </header>
            </div>
        );
    }
}

export default App;

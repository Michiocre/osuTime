import React, { Component } from 'react';
import Config from '../config/config.json';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { Container} from 'reactstrap';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            response: ''
        };

        this.handleSubmit = async e => {
            e.preventDefault();
            if (this.state.username.trim() !== '') {
                const response = await fetch(Config.backend + '/user/' + this.state.username.trim(), {
                    method: 'GET',
                    header: {
                        'Content-Type': 'application/json'
                    }
                });
                const body = await response.text();

                this.setState({responseToPost: body});
            }
        };
    }

    render() {
        return (
            <Container>
                <Form onSubmit={this.handleSubmit}>
                    <FormGroup>
                        <Label for="username">Username</Label>
                        <Input type="text" name="username" id="username" value={this.state.username} onChange={e => this.setState({username: e.target.value})}/>
                    </FormGroup>
                    <Button type="submit">Submit</Button>
                </Form>

                <p>{this.state.responseToPost}</p>
            </Container>
        );
    }
}

export default Login;

import React, { Component } from 'react';
import { Link} from 'react-router-dom';
import { Container, Button, Form, FormGroup, Label, Input } from 'reactstrap';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: ''
        }
    }

    render() {
        return (
            <Container>
                <Form>
                    <FormGroup>
                        <Label for="username">Username</Label>
                        <Input type="text" name="username" id="username" value={this.state.username} onChange={e => this.setState({username: e.target.value})}/>
                    </FormGroup>
                    <Link to={{pathname: "/main", data: this.state.username}}><Button type="submit">Submit</Button></Link>
                </Form>
            </Container>
        );
    }
}

export default Login;

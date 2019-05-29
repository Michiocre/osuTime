import React, { Component } from 'react';
import Config from '../config/config.json';
import { Table, Container} from 'reactstrap';

class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: this.props.location.data,
            scores: []
        };
    }

    async componentDidMount() {
        this.state.username = 'Michiocre'; //THIS IS DEBUG ONLY
        if (this.state.username !== undefined) {
            if (this.state.username.trim() !== '') {
                const request = await fetch(Config.backend + '/user/' + this.state.username.trim(), {
                    method: 'GET',
                    header: {
                        'Content-Type': 'application/json'
                    }
                });
                let response = await request.text();
                response = JSON.parse(response);
                console.log(response);
                if (response.code === 200) {
                    this.setState({scores: response.body});
                } else {
                    this.props.history.push({
                        pathname: '/'
                    });
                }
            } else {
                this.props.history.push({
                    pathname: '/'
                });
            }
        } else {
            this.props.history.push({
                pathname: '/'
            });
        }
    }

    render() {
        const scores = this.state.scores.map((item, key) =>
            <tr key={item.score_id}>
                <th scope="row">{item.pp}</th>
                <td>{item.date}</td>
            </tr>
        );

        return (
            <Container>
                <Table>
                    <thead>
                        <tr>
                            <th>PP</th>
                            <th>Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {scores}
                    </tbody>
                </Table>
            </Container>
        );
    }
}

export default Main;

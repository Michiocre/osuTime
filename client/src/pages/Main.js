import React, { Component } from 'react';
import Config from '../config/config.json';
import CanvasJSReact from '../lib/canvasjs.react';
import '../style/Main.css';

let myMath = require('../lib/math');
//let CanvasJS = CanvasJSReact.CanvasJS;
let CanvasJSChart = CanvasJSReact.CanvasJSChart;

class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: props.match.params[0],
            scores: [],
            selectedSortOption: 'date',
            selectedSortDirection: 'decending',
            error: 0
        };

        this.radioChangeHandler = this.radioChangeHandler.bind(this);
    }

    radioChangeHandler(event) {

        switch (event.target.name) {
            case 'sortRadio':
                this.setState({
                    selectedSortOption: event.target.id
                });
                break;

            case 'ascRadio':
                this.setState({
                    selectedSortDirection: event.target.id
                });
                break;

            default:
                break;
        }
    }

    async componentDidMount() {
        if (this.state.username !== undefined) {
            if (this.state.username.trim() !== '') {
                const request = await fetch(Config.backend + '/user/' + this.state.username.trim(), {
                    method: 'GET',
                    header: {
                        'Content-Type': 'application/json'
                    }
                });
                switch (request.status) {
                    case 200:                        
                        this.setState({scores: JSON.parse(await request.text())});
                        break;
                    default:
                        this.setState({error: 2});
                        break;
                }
            } else {
                this.setState({error: 1});
            }
        } else {
            this.setState({error: 1});
        }
    }

    render() {
        switch (this.state.error) {
            case 1:
                this.props.history.push({
                    pathname: '/'
                });
                return null;

            case 2:
                this.props.history.push({
                    pathname: '/'
                });
                return null;
        
            default:
                break;
        }

        if (this.state.selectedSortDirection === 'ascending') {
            this.state.scores.sort(myMath.dynamicSort(this.state.selectedSortOption));
        } else if (this.state.selectedSortDirection === 'decending') {
            this.state.scores.sort(myMath.dynamicSort('-' + this.state.selectedSortOption));
        }
        

        const scores = this.state.scores.map((item, key) =>
            <tr key={item.score_id}>
                <th scope="row">{key}</th>
                <td>{item.pp}</td>
                <td>{item.date}</td>
            </tr>
        );

        let averages = myMath.allTimeAverage(this.state.scores);
        let dataPoints = [];

        for (let i = 0; i < this.state.scores.length; i++) {
            dataPoints[i] = {
                x: i,
                y: averages[i],
                pp: this.state.scores[i].pp,
                date: myMath.dateConvert(this.state.scores[i].date)
            };
        }

        let options = {
            animationEnabled: true,
            theme: 'light2',
            title: {
                text: 'Average Time'
            },
            axisY: {
                title: 'Average Time',
                labelFormatter: function (e) {
                    let string = (e.value/3600).toString().padStart(2, '0') + ':00';
                    return string;
                },
                minimum: 0,
                maximum: 86400,
                interval: 10800
            },
            axisX: {
                title: 'Date'
            },
            toolTip: {
                contentFormatter: function (e) {
                    let dataPoint = e.entries[0].dataPoint;
                    let hours = Math.floor(dataPoint.y/3600);
                    let minutes = Math.floor((dataPoint.y - (hours*3600)) /60);
                    let dHours = Math.floor(dataPoint.date/3600);
                    let dMinutes = Math.floor((dataPoint.date - (dHours*3600)) /60);
                    return 'PP: ' + dataPoint.pp +
                        '<br/>Actual Time: ' + dHours.toString().padStart(2, '0') + ':' + dMinutes.toString().padStart(2, '0') +
                        '<br/>Averaging #0 - #' + dataPoint.x +
                        '<br/>Avrg. Time: ' + hours.toString().padStart(2, '0') + ':' + minutes.toString().padStart(2, '0');
                }
            },
            data: [{
                type: 'line',
                dataPoints: dataPoints
            }]
        };

        if (dataPoints.length < 1) {
            return (
                <div className="container vertical-center">
                    <div className="row spinner-row">
                        <div className="col-sm text-center">
                            <div className="spinner-border" role="status">
                                <span className="sr-only">Loading...</span>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }

        return (
            <div className="container">
                <div className="row">
                    <div className="col-sm-2">
                        <form>
                            <div className="form-check">
                                <input className="form-check-input" type="radio" name="sortRadio" id="date"
                                    checked={this.state.selectedSortOption === 'date'}
                                    onChange={this.radioChangeHandler}/>
                                <label className="form-check-label" htmlFor="date">
                                    Sort by date
                                </label>
                            </div>
                            <div className="form-check">
                                <input className="form-check-input" type="radio" name="sortRadio" id="pp"
                                    checked={this.state.selectedSortOption === 'pp'}
                                    onChange={this.radioChangeHandler}/>
                                <label className="form-check-label" htmlFor="pp">
                                    Sort by pp
                                </label>
                            </div>
                            <div className="form-check">
                                <input className="form-check-input" type="radio" name="ascRadio" id="ascending"
                                    checked={this.state.selectedSortDirection === 'ascending'}
                                    onChange={this.radioChangeHandler}/>
                                <label className="form-check-label" htmlFor="ascending">
                                    Ascending
                                </label>
                            </div>
                            <div className="form-check">
                                <input className="form-check-input" type="radio" name="ascRadio" id="decending"
                                    checked={this.state.selectedSortDirection === 'decending'}
                                    onChange={this.radioChangeHandler}/>
                                <label className="form-check-label" htmlFor="decending">
                                    Decending
                                </label>
                            </div>
                        </form>
                    </div>
                    <div className="col-sm-auto">
                        <CanvasJSChart options = {options} />
                    </div>
                </div>
                <div className="row">
                    <div className ="col-sm">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th scope="col"> # </th>
                                    <th scope="col">PP</th>
                                    <th scope="col">Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                {scores}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        );
    }
}

export default Main;

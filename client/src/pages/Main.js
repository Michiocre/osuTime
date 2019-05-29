import React, { Component } from 'react';
import Config from '../config/config.json';
import CanvasJSReact from '../lib/canvasjs.react';
var myMath = require('../lib/math');
//var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: props.match.params[0],
            scores: [],
            selectedSortOption: 'date'
        };

        this.radioChangeHandler = this.radioChangeHandler.bind(this);
    }

    radioChangeHandler(event) {
        this.setState({
            selectedSortOption: event.target.id
        });
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
                let response = await request.text();
                response = JSON.parse(response);
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
        this.state.scores.sort(myMath.dynamicSort(this.state.selectedSortOption));


        const scores = this.state.scores.map((item) =>
            <tr key={item.score_id}>
                <th scope="row">{item.pp}</th>
                <td>{item.date}</td>
            </tr>
        );

        let averages = myMath.allTimeAverage(this.state.scores);
        let dataPoints = [];

        for (var i = 0; i < this.state.scores.length; i++) {
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
                <div className="container">
                    <div className="row">
                        <div className="col-sm">
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

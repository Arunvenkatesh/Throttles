import React from "react";
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css';
import { map, filter } from "lodash"
import moment from "moment"

export default class Details extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            date: new Date(),
            openCalender: false,
            user: this.props.history.location.state.user,
            todaysActivityLabel: '',
            calendarActivityLabel: ''
        }
        this.onChange = this.onChange.bind(this);
        this.todaysActivity = this.todaysActivity.bind(this);
        this.calendarActivity = this.calendarActivity.bind(this);
        this.onClickYear = this.onClickYear.bind(this);
        this.onClickMonth = this.onClickMonth.bind(this);
        this.onClickDay = this.onClickDay.bind(this);
    }

    componentDidMount() {
        this.todaysActivity();
        this.calendarActivity();
    }
    onChange(date) {
        this.setState({ date: date })
        this.todaysActivity();
        this.calendarActivity();
    }
    onClickMonth(date) {
        this.setState({ date: date })
    }
    onClickDay(date) {
        this.setState({ date: date })
    }

    onClickYear(date) {
        this.setState({ date: date })
    }

    async calendarActivity() {
        var selectedDate = moment((this.state.date).toString()).format('L');

        map(this.state.user.activity_periods, (activity, key) => {
            activity.start_time = moment(activity.start_time).format('L')
        })

        var ss = filter(this.state.user.activity_periods, { 'start_time': selectedDate })
        this.setState({
            calendarActivityLabel: ss ? ss[0] : "nil"
        })
    }
    todaysActivity() {
        var today = moment().format('"MM-DD-YYYY"');

        this.state.user.activity_periods && map(this.state.user.activity_periods, (activity, key) => {
            var activityDay = moment(activity.start_time).format('"MM-DD-YYYY"');
            if (moment(today).isSame(activityDay, 'day')) {
                this.setState({
                    todaysActivityLabel: activity
                })

            }
        })

    }
    render() {

        return (<div style={stylesSheet.mainView} >
            <div className="row" style={stylesSheet.containerBox}>
                <div className="col-lg-4">
                    <div className="card m-b-30">
                        <div className="card-body">
                            <div className="media">
                                <img className="d-flex mr-3 rounded-circle img-thumbnail thumb-lg" src={require("../assets/images/user.jpg")} alt="Profile" />
                                <div className="media-body">
                                    <h5 className="mt-0 font-18 mb-1"> Name: {"  " + this.state.user.real_name}</h5>
                                    <p className="text-muted font-14">Id: {"  " + this.state.user.id}</p>
                                    <p className="text-muted font-14">TimeZone: {"  " + this.state.user.tz}</p>
                                    <h5 className="mt-0 font-18 mb-1"> Activity periods</h5>

                                    {this.state.user.activity_periods && map(this.state.user.activity_periods, (activity, key) => {

                                        return (
                                            <p className="text-muted font-14">{"  " + moment(activity.start_time).format('lll') + "  -  " + activity.end_time}</p>
                                        )
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>
                    <button type="button" onClick={() => { this.setState({ openCalender: true }) }} class="btn btn-primary">View calender</button>

                </div>
                <div className="col-lg-4">
                    <div className="card m-b-30">
                        <div className="card-body">
                            <h6 className="mt-0 font-18 mb-1">Today's Activity period</h6>
                            <p className="text-muted font-14"> {this.state.todaysActivityLabel ? this.state.todaysActivityLabel.start_time + "  -  " + this.state.todaysActivityLabel.end_time : "nil"}</p>


                        </div>
                    </div>
                </div>
                {this.state.openCalender &&
                    <div className="col-lg-4">
                        <div className="card m-b-30">
                            <div className="card-body">
                                <h6 className="mt-0 font-18 mb-1"> Activity Selected in calenders</h6>
                                <p className="text-muted font-14"> {this.state.calendarActivityLabel ? moment(this.state.calendarActivityLabel.start_time).format('lll') + "  -  " + this.state.calendarActivityLabel.end_time : "nil"}</p>
                            </div>
                        </div>
                    </div>}
                {this.state.openCalender &&
                    <div style={stylesSheet.calenderActivity}>
                        <button type="button" onClick={() => { this.setState({ openCalender: false }) }} class="btn btn-danger">close calender</button>

                        <Calendar
                            onChange={this.onChange}
                            value={this.state.date}
                            activeStartDate={this.state.date}

                            onClickYear={this.onClickYear}
                            onClickDay={this.onClickDay}
                            onClickMonth={this.onClickMonth}
                        /> </div>}
            </div>



        </div >);
    }
}
var stylesSheet = {
    mainView: {
        backgroundColor: "#17181D",
        display: "flex",
        flexDirection: "column",
    },
    containerBox: {
        width: "110%",
        alignContent: "center",
        justifyContent: "center",
        alignItems: "center",
        marginTop: 50,
        marginLeft: 10
    },
    calenderActivity: {
        width: "50%",
        alignContent: "center",
        justifyContent: "center",
        alignItems: "center"
    }
}



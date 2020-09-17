import React from 'react';
import styles from "../styles/main.css"
import axios from "axios"
import { map } from "lodash"


class Home extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            value: '',
            userList: [],
            searchWord: '',
            viewDetails: true
        }
        this.handleClick = this.handleClick.bind(this);
        this.searchFieldChange = this.searchFieldChange.bind(this);
    }
    searchFieldChange = (passKey) => {
        this.setState({ searchWord: passKey.nativeEvent.data })
        debugger;
    }
    componentDidMount() {
        // GET request using axios with headers
        const headers = {
            'secret-key': '$2b$10$Fn4NEbqnTOlEXvOmhBleAuz0UMsFzAZrSKzZqdUTv7F6Unz3OYWMy'
        };
        axios.get('https://api.jsonbin.io/b/5f60c446302a837e9566c263/4', { headers })
            .then(response => this.setState({ userList: response.data.members }));
    }
    handleClick = (user) => {
        this.props.history.push("/details", { user })

    }
    render() {
        var filterUser = (userList, search, name) => {
            if (userList) {
                search = search && search.toUpperCase();
                return search
                    ? userList.filter(user => user[name].trim().toUpperCase().includes(search.trim()))
                    : userList;
            }
            debugger;
        }
        var userList = filterUser(this.state.userList, this.state.searchWord, "real_name");
        return (
            <div style={stylesSheet.mainView} >
                <div id="search">
                    <input type="text" name="search" id="search_box" placeholder="Type here to search" onChange={this.searchFieldChange} />
                    <input type="button" value="Search" id="search_btn" />
                </div>

                {map(userList, (user, key) => {
                    return (
                        <div key={key} className="row" style={stylesSheet.containerBox} onClick={() => { this.handleClick(user) }} value={this.state.searchWord}>
                            <div className="col-lg-4">
                                <div className="card m-b-30">
                                    <div className="card-body">
                                        <div className="media">
                                            <img className="d-flex mr-3 rounded-circle img-thumbnail thumb-lg" src={require("../assets/images/user.jpg")} alt="Profile" />
                                            <div className="media-body">
                                                <h5 className="mt-0 font-18 mb-1"> Name: {"  " + user.real_name}</h5>
                                                <p className="text-muted font-14">Id: {"  " + user.id}</p>
                                                <p className="text-muted font-14">TimeZone: {"  " + user.tz}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                })
                }
            </div>

        );
    }
}
var stylesSheet = {
    mainView: {
        backgroundColor: "#17181D",
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
    },
    containerBox: {
        width: "100%",
        alignContent: "center",
        justifyContent: "center",
        alignItems: "center",
        marginTop: 50
    }
}
export default Home;

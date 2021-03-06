import React, { Component } from "react";
// import { Link } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css"
import axios from "axios";

export default class InfoUpdate extends Component {
    constructor(props) {
        super(props);

        this.onChangeFname = this.onChangeFname.bind(this);
        this.onChangeLname = this.onChangeLname.bind(this);
        this.onChangeSuffix = this.onChangeSuffix.bind(this);
        this.onChangeDob = this.onChangeDob.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            fName: '',
            lName: '',
            suffixes: '',
            age: new Date(),
            infos: []
        }
    }
    componentDidMount() {
        axios.get(`http://localhost:5000/info/${this.props.match.params.id}`)
            .then(res => {
                this.setState({
                    fName: res.data.fName,
                    lName: res.data.lName,
                    suffixes: res.data.suffixes
                });
            })
            .catch(err => console.log(err));

        axios.get('http://localhost:5000/info')
            .then(res => {
                //check if reponse data is not empty
                if (res.data.length > 0) {
                    this.setState({
                        infos: res.data.map(info => info.fName)// fetch all user in the database
                    })

                }
            })
            .catch(err => console.log(err));
    }

    onChangeFname(e) {
        this.setState({
            fName: e.target.value
        });
    }

    onChangeLname(e) {
        this.setState({
            lName: e.target.value
        });
    }
    onChangeSuffix(e) {
        this.setState({
            suffixes: e.target.value
        });
    }

    onChangeDob(age) {
        this.setState({
            age: age
        })
    }

    onSubmit(e) {
        e.preventDefault();

        if (window.confirm('Update the info?')) {
            const ageCalculate = {
                age: this.state.age

            }
            //Function for calculating the age
            function calculateAge() {

                const diff = Date.now() - ageCalculate.age.getTime();
                const ageDate = new Date(diff);
                return Math.abs(ageDate.getUTCFullYear() - 1970);
            }
            const infos = {
                fName: this.state.fName,
                lName: this.state.lName,
                suffixes: this.state.suffixes,
                age: calculateAge(ageCalculate)
            }
            console.log(infos);
            axios.post(`http://localhost:5000/info/update/${this.props.match.params.id}`, infos)
                .then(res => console.log(res.data))
                .catch(err => console.log(err));

            window.location = '/list';

        }

    }


    render() {
        return (
            <div className="container">
                {/* <h1 className="center"> Simple MERN crud system </h1>{" "} */}
                <div className="center">
                    <div className="row">
                        <div className="col s8 offset-s2"><br></br>
                            <div className="card">
                                <div className="card-content">
                                    <span className="card-title"> Fill up the following: </span>{" "}

                                    {" "}
                                    <div className="row">
                                        <form onSubmit={this.onSubmit} className="col s12">
                                            <div className="row">
                                                <div className="input-field col s6">
                                                    <input
                                                        onChange={this.onChangeFname}
                                                        id="fName"
                                                        type="text"
                                                        className="validate"
                                                        value={this.state.fName}
                                                    />
                                                    <label htmlFor="first_name"> First Name </label>{" "}
                                                </div>{" "}
                                                <div className="input-field col s6">
                                                    <input
                                                        onChange={this.onChangeLname}
                                                        id="last_name"
                                                        type="text"
                                                        className="validate"
                                                        value={this.state.lName}
                                                    />
                                                    <label htmlFor="lName"> Last Name </label>{" "}
                                                </div>{" "}


                                                <div className="input-field col s12">
                                                    Suffix (if any)
                            <select onChange={this.onChangeSuffix} className="browser-default">
                                                        <option>{this.state.suffixes}</option>
                                                        <option value="none">none</option>
                                                        <option value="Jr.">Jr.</option>
                                                        <option value="Sr.">Sr.</option>
                                                        <option value="III">III</option>
                                                        <option value="so.on">IV onwards...</option>
                                                    </select>
                                                    {/* <label for="last_name"> Last Name </label>{" "} */}
                                                </div>{" "}

                                                <div className="input-field col s12">
                                                    Date of Birth: <DatePicker onChange={this.onChangeDob} selected={this.state.age}></DatePicker>
                                                </div>
                                                <input type="submit" value="Register" className="btn btn-large purple" />

                                            </div>{" "}
                                        </form>{" "}
                                    </div>{" "}

                                </div>{" "}
                            </div>{" "}
                        </div>{" "}
                    </div>{" "}
                </div>{" "}
            </div >
        );
    }
}

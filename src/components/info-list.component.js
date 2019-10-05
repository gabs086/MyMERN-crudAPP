import React, { Component } from "react";
import { Link } from 'react-router-dom';
import axios from "axios";

const List = props => (
    <tr>
        <td>{props.info.fName}</td>
        <td>{props.info.lName}</td>
        <td>{props.info.suffixes}</td>
        <td>{props.info.age}</td>
        <td>
            {/* creates a link that redirects to the edit-exercise component */}
            <Link to={"/update/" + props.info._id} className="btn green">edit</Link> |
        {/* deletes the exercise that matches the props.exercise._id */}
            &nbsp;  <a href="/list" onClick={() => { props.deleteInfo(props.info._id) }} className="btn red">delete</a>
        </td>
    </tr>
)

export default class InfoList extends Component {
    constructor(props) {
        super(props)

        this.state = { infos: [] }
    }
    componentDidMount() {
        axios.get('http://localhost:5000/info/')
            .then(res => {
                this.setState({
                    infos: res.data
                })
            })
            .catch(err => console.log(err))
    }

    deleteInfo(id) {

        if (window.confirm('Are you sure')) {
            axios.delete(`http://localhost:5000/info/delete/${id}`)
                .then(res => console.log(res.data))
                .catch(err => console.log(err));

            this.setState({
                //updates the state of the 'exercise' array with the updated list of exercises
                infos: this.state.infos.filter(el => el._id !== id)//filters the exercises that did not match the 'id'
            });
        }


    }
    infoList() {
        return this.state.infos.map(allInfoList => {
            return <List info={allInfoList} deleteInfo={this.deleteInfo} key={allInfoList._id} />

        });
    }
    render() {
        return (
            <div className="container">
                <h3>Infomations</h3>
                <table>
                    <thead>
                        <tr>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Suffixes (if any)</th>
                            <th>Age</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.infoList()}
                    </tbody>
                </table>
                <p>Input info again? Click <a href='/'>Here</a></p>
            </div>

        );
    }
}
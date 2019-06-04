import React, { Component } from "react";
import axios from "axios";
import { withRouter } from "react-router-dom";
import AdminUserDisplay from "./AdminUserDisplay";

class AdminUserList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      users: [],
      featured: false,
      button: true
    };
  }

  componentDidMount = () => {
    this.getUsers();
  };

  getUsers = () => {
    axios
      .get("/api/users/all")
      .then(res =>
        this.setState({ users: res.data }, () => {
          console.log(this.state.users);
        })
      )
      .catch(err => console.log(err));
  };

  editUser = e => {
    e.preventDefault();
    let current = e.currentTarget.getAttribute("_id");
    console.log(current);
    this.props.history.push(`/dashboard/users/${current}`);
  };

  render() {
    return (
      <div>
        {this.state.users.map((user, index) => {
          return (
            <div key={index}>
              <AdminUserDisplay
                _id={user._id}
                index={index}
                first_name={user.first_name}
                last_name={user.last_name}
                email={user.email}
                date={user.date}
                isAdmin={user.isAdmin}
                loggedIn={user.loggedIn}
                recentlyViewed={user.recentyViewed}
                editUser={this.editUser}
              />
              {console.log(user._id)}
            </div>
          );
        })}
      </div>
    );
  }
}

export default withRouter(AdminUserList);

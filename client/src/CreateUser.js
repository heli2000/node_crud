import React, { Component } from 'react';

export class CreateUser extends Component {

  constructor(props) {
    super(props);
    this.state = {
      fields: {},
      errors: {},
    };
  }

  handleChange(field, e) {
    let fields = this.state.fields;
    fields[field] = e.target.value;
    this.setState({ fields });
  }

  handleValidation() {
    let fields = this.state.fields;
    let errors = {};
    let formIsValid = true;

    //Name
    if (!fields["name"]) {
      formIsValid = false;
      errors["name"] = "Cannot be empty";
    }

    if (typeof fields["name"] !== "undefined") {
      if (!fields["name"].match(/^[a-zA-Z]+$/)) {
        formIsValid = false;
        errors["name"] = "Only letters";
      }
    }

    //pass
    if (!fields["password"]) {
      formIsValid = false;
      errors["password"] = "Cannot be empty";
    }

    //profession
    if (!fields["profession"]) {
      formIsValid = false;
      errors["profession"] = "Cannot be empty";
    }

    this.setState({ errors: errors });
    return formIsValid;
  }

  handleSubmit(event) {
    if (this.handleValidation()) {
      fetch('/addUser', {
        method: 'POST',
        headers: {"Content-type": "application/json; charset=UTF-8"},
        body: JSON.stringify(this.state.fields)
      }).then(function(response) {
        return response.json();
      });

      alert("Form submitted");
      event.target.reset();
      // console.log(JSON.stringify(this.state));
      event.preventDefault();
      this.setState({
        fields: {}
      });
    }
  }

  render() {
    return(
      <form onSubmit={this.handleSubmit.bind(this)}>
        <label>
          Name:
          <input type="text" name="name" value={this.state.fields["name"]} onChange={this.handleChange.bind(this,"name")}/>
          <span style={{ color: "red" }}>{this.state.errors["name"]}</span>
        </label>
        <label>
          Password:
          <input type="password" name="password" value={this.state.fields["password"]} onChange={this.handleChange.bind(this,"password")}/>
          <span style={{ color: "red" }}>{this.state.errors["password"]}</span>
        </label>
        <label>
          Description:
          <input type="text" name="profession" value={this.state.fields["profession"]} onChange={this.handleChange.bind(this,"profession")}/>
          <span style={{ color: "red" }}>{this.state.errors["profession"]}</span>
        </label>
        <input type="submit" value="Submit" />
      </form>
    )
  }

}
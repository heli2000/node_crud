import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button,Modal} from 'react-bootstrap'; 

export class CreateUser extends Component {

  constructor(props) {
    super(props);
    this.state = {
      fields: {},
      errors: {},
      show:false
    };
  }
  
  //on off model
  handleModal(){ 
    if(this.state.show) {
      this.setState({
        errors: {},
      });
    } 
    this.setState({show:!this.state.show});
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
      this.setState({show:!this.state.show})
      event.preventDefault();
      this.setState({
        fields: {},
      });
    }
  }

  render() {
    return(
      <div id="user_creation"> 
        <div className="modalClass">  
            <Button onClick={()=>this.handleModal()}>Create User</Button>
        </div>
        <Modal show={this.state.show} onHide={()=>this.handleModal()}  className='user_creation'>  
          <Modal.Header closeButton>Create User</Modal.Header>  
          <Modal.Body>
            <form onSubmit={this.handleSubmit.bind(this)} id="create-user">
              <div class="row">
                <div class="col-25">
                  <label>Name</label>
                </div>
                <div class="col-75">
                  <input type="text" name="name" value={this.state.fields["name"]} onChange={this.handleChange.bind(this,"name")} placeholder="Your name"/>
                  <span style={{ color: "red" }}>{this.state.errors["name"]}</span>
                </div>
              </div>
              <div class="row">
                <div class="col-25">
                  <label>Password</label>
                </div>
                <div class="col-75">
                  <input type="password" name="password" value={this.state.fields["password"]} onChange={this.handleChange.bind(this,"password")} placeholder="Password"/>
                  <span style={{ color: "red" }}>{this.state.errors["password"]}</span>
                </div>
              </div>
              <div class="row">
                <div class="col-25">
                  <label>Profession</label>
                </div>
                <div class="col-75">
                  <input type="text" name="profession" value={this.state.fields["profession"]} onChange={this.handleChange.bind(this,"profession")} placeholder="Your Profession"/>
                  <span style={{ color: "red" }}>{this.state.errors["profession"]}</span>
                </div>
              </div>
              {/* <input type="submit" value="Submit"/> */}
            </form>
          </Modal.Body>  
          <Modal.Footer>  
            <Button onClick={()=>this.handleModal()}>Close</Button>  
            <Button onClick={this.handleSubmit.bind(this)}>Save</Button>  
          </Modal.Footer>  
        </Modal>
      </div>
    )
  }
}
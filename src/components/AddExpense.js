import React, { Component } from "react";
import { Modal, Button, Form, Row, Col, Alert } from "react-bootstrap";
import { login } from "../redux/actions/auth";
import { connect } from "react-redux";
import { addExpense } from "../redux/actions/group";
import { clearMessage } from "../redux/actions/message";

class AddExpense extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lgShow: false,
      SplitName: { formHorizontalRadios: "equal" },
      totalAmount: "",
      members: [this.props.user, ...this.props.members],
      tempMembers: this.props.members,
      user: this.props.user,
      selectedMembers: [],
      name: "",
      message: this.props.message,
      id: this.props.params.id,
    };
    this.handleText = this.handleText.bind(this);
    this.handleAmount = this.handleAmount.bind(this);
    this.handleAdd = this.handleAdd.bind(this);
    this.clearMessage = this.clearMessage.bind(this);
    this.clearMessage();
  }

  clearMessage = () => {
    const { dispatch } = this.props;
    dispatch(clearMessage());
  }

  handleAdd = () => {
    if(this.state.name === "" || this.state.totalAmount === "") {
      alert("Please fill in all the details!");
      return
    }
    if (this.state.SplitName.formHorizontalRadios !== "equal") {
      let total = 0
      this.state.tempMembers.map((item) => {
        total += (item.amountValue * 1)
      });
      if(total !== (this.state.totalAmount * 1)) {
        alert("Please fill appropriate amount for distribution!");
        return;
      }
    } else if (this.state.selectedMembers.length <= 0) {
      alert("Please fill in all the details!");
      return
    }
    const obj = {}
    obj["name"] = this.state.name
    obj["division"] = []
    if (this.state.SplitName.formHorizontalRadios === "equal") {
      this.state.selectedMembers.map((item) => {
        item.amountValue = (this.state.totalAmount * 1)/(this.state.selectedMembers.length);
        let division = {
          lender: this.state.user._id,
          borrower: item._id,
          amount: item.amountValue,
        }
        obj["division"].push(division);
      });
    } else {
      this.state.tempMembers.map((item) => {
        if(item.amountValue != 0) {
          let division = {
            lender: this.state.user._id,
            borrower: item._id,
            amount: item.amountValue,
          }
          obj["division"].push(division);
        }
      });
    }
    obj["amount"] = this.state.totalAmount * 1;
    console.log(obj);
    const { dispatch } = this.props
    dispatch(addExpense(this.state.id, obj))
    .then(() => {
      this.handleClose();
    })
    .catch(() => {
    });
  }

  handleClose = () => {
    this.setState({
      lgShow: false,
      SplitName: {
        formHorizontalRadios: "equal",
      },
      totalAmount: "",
      members: this.props.members,
      tempMembers: this.props.members,
      user: this.props.user,
      selectedMembers: [],
      name: "",
      message: this.props.message,
    });
    window.location.reload();
  };

  handleName = (e) => {
    this.setState({ name: e.target.value});
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    this.state.tempMembers.map((item) => {
      item.amountValue = "";
    });
    this.setState({
      SplitName: {
        [name]: value,
      },
      tempMembers: this.state.tempMembers
    });
  };
  handleText = (evt, val) => {
    const re = /^[+-]?\d*(?:[.]\d*)?$/;
    if (re.test(evt.target.value) || evt.target.value === "") {
      // const amountValue = evt.target.validity.valid
      //   ? evt.target.value
      //   : this.state.amountValue;
      //this.setState({ amountValue: evt.target.value });
      var array = [...this.state.tempMembers];
      var index = array.indexOf(val)
      if (index !== -1) {
        array[index].amountValue = evt.target.value;
        this.setState({tempMembers: array});
      }
    }
  };

  handleAmount = (e) => {
    const re = /^[+-]?\d*(?:[.]\d*)?$/;
    if (re.test(e.target.value) || e.target.value === "") {
      // const amountValue = evt.target.validity.valid
      //   ? evt.target.value
      //   : this.state.amountValue;
      this.setState({ totalAmount: e.target.value });
    }
  };

  handleCheck = (e, val) => {
    if (e.target.checked) {
      this.setState({selectedMembers: [...this.state.selectedMembers, val]});
    } else {
      var array = [...this.state.selectedMembers];
      var index = array.indexOf(val)
      if (index !== -1) {
        array.splice(index, 1);
        this.setState({selectedMembers: array});
      }
    }
  };

  render() {
    return (
      <>
        <Button onClick={() => this.setState({ lgShow: true })}>
          Large modal
        </Button>
        <Modal
          size="lg"
          show={this.state.lgShow}
          onHide={() => this.setState({ lgShow: false })}
          aria-labelledby="example-modal-sizes-title-lg"
        >
          <Modal.Header closeButton>
            <Modal.Title id="example-modal-sizes-title-lg">
              Add Expense
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>Enter Expense Name</Form.Label>
                <Form.Control type="text" placeholder="Walmart, Uber, etc." onChange={this.handleName} value={this.state.name}/>
              </Form.Group>
              <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>Enter Amount</Form.Label>
                <Form.Control type="text" placeholder="$0.00" onChange={this.handleAmount} value={this.state.totalAmount}/>
              </Form.Group>
              <Form.Group controlId="formFileMultiple" className="mb-3">
                <Form.Label>Upload Bill(Optional)</Form.Label>
                <Form.Control type="file" multiple />
              </Form.Group>
              <fieldset>
                <Form.Group as={Row} className="mb-3">
                  <Form.Label>Split</Form.Label>
                  <Col sm={10} className="d-flex flex-row">
                    <Form.Check
                      className="m-2"
                      type="radio"
                      label="Equally"
                      value="equal"
                      name="formHorizontalRadios"
                      id="formHorizontalRadios1"
                      onChange={this.handleChange}
                      checked={
                        this.state.SplitName.formHorizontalRadios === "equal"
                      }
                    />
                    <Form.Check
                      className="m-2"
                      type="radio"
                      label="Unequally"
                      value="unequal"
                      name="formHorizontalRadios"
                      id="formHorizontalRadios2"
                      onChange={this.handleChange}
                    />
                  </Col>
                </Form.Group>
              </fieldset>
              <Form.Label>Members: </Form.Label>
              <div className="d-flex flex-row" style={{ overflowY: "auto" }}>
                {this.state.SplitName["formHorizontalRadios"] === "equal"
                  ? this.state.members.map((val, index) => (
                      <div key={index} className="mb-3">
                        <Form.Check
                          inline
                          label={val.displayName}
                          title={"Hello"}
                          name="group1"
                          type="checkbox"
                          id="inline-checkbox-1"
                          onChange={(event) => this.handleCheck(event, val)}
                        />
                      </div>
                    ))
                  : this.state.members.map((val, index) => (
                      <div key={index} className="mb-3">
                        <label>{val.displayName}</label>
                        <input
                          id={index}
                          type="text"
                          name="number"
                          placeholder="$0.00"
                          className="m-2"
                          onChange={(event) => this.handleText(event, val)}
                          value={val.amountValue}
                        />
                      </div>
                    ))}
              </div>
            </Form>
            {this.state.message && (
              <>
                <Alert variant={"danger"}>{this.state.message}</Alert>
              </>
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button
              onClick={this.handleClose}
              variant="danger"
              className="rounded-pill"
            >
              Close
            </Button>
            <Button
              onClick={this.handleAdd}
              variant="primary"
              className="rounded-pill"
            >
              Add
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
}

const mapStateToProps = state => ({
  members: state.auth.members,
  user: state.auth.user,
  message: state.message.message
});

export default connect(mapStateToProps, { login, addExpense })(AddExpense);

//export default AddExpense;

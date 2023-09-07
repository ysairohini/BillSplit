import React, { Component } from "react";
import { Container, Row, Col } from "react-bootstrap";
import GroupComponent from "./GroupComponent";
import ReactPaginate from "react-paginate";
import "./styles/Home.css";

class HomeFinal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      offset: 0,
      data: [],
      perPage: 4,
      currentPage: 0,
      archived: [],
      nonArchived: [],
    };

    this.handlePageClick = this.handlePageClick.bind(this);
    this.props.Data.map((val) => {
      if (val.is_archived) {
        console.log(val);
        this.state.archived.push(val);
      } else {
        this.state.nonArchived.push(val);
      }
    });
  }

  receivedData() {
    const data = this.state.nonArchived.concat(this.state.archived);
    const slice = data.slice(
      this.state.offset,
      this.state.offset + this.state.perPage
    );
    const postData = slice.map((val, index) => (
      <GroupComponent data={val} key={index} />
    ));

    this.setState({
      pageCount: Math.ceil(data.length / this.state.perPage),

      postData,
    });
  }

  handlePageClick = (e) => {
    const selectedPage = e.selected;
    const offset = selectedPage * this.state.perPage;

    this.setState(
      {
        currentPage: selectedPage,
        offset: offset,
      },
      () => {
        this.receivedData();
      }
    );
  };

  componentDidMount() {
    this.receivedData();
  }
  render() {
    return (
      <>
        <Container>
          <Row>
            <Col></Col>
            <Col lg="10">
              <div>
                {this.state.postData}
                <ReactPaginate
                  previousLabel={"prev"}
                  nextLabel={"next"}
                  breakLabel={"..."}
                  breakClassName={"break-me"}
                  pageCount={this.state.pageCount}
                  marginPagesDisplayed={2}
                  pageRangeDisplayed={5}
                  onPageChange={this.handlePageClick}
                  containerClassName={"pagination"}
                  subContainerClassName={"pages pagination"}
                  activeClassName={"active"}
                />
              </div>
            </Col>
            <Col></Col>
          </Row>
        </Container>
      </>
    );
  }
}

export default HomeFinal;

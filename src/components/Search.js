import React from "react";
import { Form, FormControl, Button } from "react-bootstrap";

const Search = () => {
  return (
    <Form className="d-flex">
      <FormControl
        type="search"
        placeholder="Search Members"
        className="m-2"
        aria-label="Search"
      />
      <Button variant="outline-success" className="m-2">
        Search
      </Button>
    </Form>
  );
};

export default Search;

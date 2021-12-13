import React, { useState } from "react";
import FormControl from "react-bootstrap/FormControl";
// import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import { Slider, Form, Input, DatePicker } from "antd";
import "./Filter.css";
import { useNavigate } from "react-router";
function Filter({ handleFormSubmission }) {
  const navigate = useNavigate();
  const [artist, setArtist] = useState("");
  const [popularityH, setPopularityH] = useState(0);
  const [popularityL, setPopularityL] = useState(0);

  const handlePopularityChange = (value) => {
    setPopularityL(value[0]);
    setPopularityH(value[1]);
  };

  // const handleChange = () => {
  //   setArtist(e.target.value);
  // };
  const onFinish = (values) => {
    handleFormSubmission(values);
  };
  const [form] = Form.useForm();
  const handleFormSubmit = () => {
    form
      .validateFields()
      .then((values) => {
        console.log(values.startYear);

        // Submit values
        // submitValues(values);
      })
      .catch((errorInfo) => {});
  };

  return (
    <div>
      <Form onFinish={onFinish} layout="vertical">
        <Form.Item name="name" label="Field A">
          <Input placeholder="Artist name" />
        </Form.Item>
        <Form.Item name="startYear" label="Start year">
          <DatePicker picker="year" />
        </Form.Item>
        <Form.Item name="endYear" label="End year">
          <DatePicker picker="year" />
        </Form.Item>
        <Form.Item name="popularity" label="popularity">
          <Slider onChange={handlePopularityChange} range />
        </Form.Item>
        <Form.Item>
          <Button className="editor-form__btn" type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
    // <div
    //   id="filter-container"
    //   style={{ margin: "auto", padding: "20px 0 10px 0" }}
    // >
    //   <div style={{ width: "90%", textAlign: "center", margin: "auto" }}>
    //     <div
    //       style={{
    //         fontWeight: "bolder",
    //         textAlign: "center",
    //         color: "#0D6EFD",
    //       }}
    //     >
    //       Filter options
    //     </div>
    //     <Form>
    //       <InputGroup>
    //         <FormControl
    //           type="search"
    //           placeholder="Search by artist"
    //           className="me-2"
    //           aria-label="Search"
    //           name="name"
    //           onChange={handleChange}
    //         />
    //         <Button onClick={onFormSubmit} variant="outline-primary">
    //           Search
    //         </Button>
    //       </InputGroup>
    //       <div style={{ fontWeight: "bold", textAlign: "left" }}>
    //         {" "}
    //         Release year range{" "}
    //       </div>
    //       <Form.Group
    //         style={{
    //           padding: "10px 0px 10px 0px",
    //           justifyContent: "space-evenly",
    //         }}
    //         className="d-flex"
    //       >
    //         <Form.Label>Start year: </Form.Label>
    //         <Form.Select
    //           name="startyear"
    //           style={{ width: "25%" }}
    //           aria-label="Default select example"
    //         >
    //           <option>2020</option>
    //           <option value="1">One</option>
    //           <option value="2">Two</option>
    //           <option value="3">Three</option>
    //         </Form.Select>
    //         <Form.Label>End year: </Form.Label>
    //         <Form.Select
    //           name="endyear"
    //           style={{ width: "25%" }}
    //           aria-label="Default select example"
    //         >
    //           <option>2020</option>
    //           <option value="1">One</option>
    //           <option value="2">Two</option>
    //           <option value="3">Three</option>
    //         </Form.Select>
    //       </Form.Group>
    //       <div style={{ fontWeight: "bold", textAlign: "left" }}>
    //         {" "}
    //         Songs attributes{" "}
    //       </div>
    //       <Form.Group style={{ width: "90%" }}>
    //         <Form.Label> Danceability</Form.Label>
    //         <Slider
    //           range
    //           defaultValue={[0, 1]}
    //           onChange={handleDanceabilityChange}
    //         />
    //       </Form.Group>
    //       <Form.Group style={{ width: "90%" }}>
    //         <Form.Label> Energy</Form.Label>
    //         <Slider range defaultValue={[0, 1]} onChange={handleEnergyChange} />
    //       </Form.Group>
    //       <Form.Group style={{ width: "90%" }}>
    //         <Form.Label> Liveliness</Form.Label>
    //         <Slider
    //           name="loo"
    //           range
    //           defaultValue={[0, 1]}
    //           onChange={handleLivelinessChange}
    //         />
    //       </Form.Group>
    //       <Form.Group style={{ width: "90%" }}>
    //         <Form.Label> Tempo</Form.Label>
    //         <Slider range defaultValue={[0, 1]} onChange={handleTempoChange} />
    //       </Form.Group>
    //     </Form>
    //   </div>
    // </div>
  );
}

export default Filter;

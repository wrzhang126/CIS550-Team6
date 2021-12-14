import React, { useState } from "react";

import Button from "react-bootstrap/Button";
import { Slider, Form, Input, DatePicker } from "antd";
import "./Filter.css";
function Filter({ handleFormSubmission }) {
  const onFinish = (values) => {
    handleFormSubmission(values);
  };
  return (
    <div style={{ padding: "30px" }}>
      <Form onFinish={onFinish} layout="vertical">
        <Form.Item name="name" label="Song name">
          <Input placeholder="Song name" />
        </Form.Item>
        <Form.Item name="startYear" label="Start year">
          <DatePicker picker="year" />
        </Form.Item>
        <Form.Item name="endYear" label="End year">
          <DatePicker picker="year" />
        </Form.Item>
        <Form.Item name="danceability" label="Danceability">
          <Slider range />
        </Form.Item>
        <Form.Item name="energy" label="Energy">
          <Slider range />
        </Form.Item>
        <Form.Item name="liveness" label="liveness">
          <Slider range />
        </Form.Item>
        <Form.Item name="tempo" label="Tempo">
          <Slider range />
        </Form.Item>
        <Form.Item name="valence" label="Valence">
          <Slider range />
        </Form.Item>
        <Form.Item>
          <Button className="editor-form__btn" type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default Filter;

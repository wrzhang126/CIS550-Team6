import React, { useState } from "react";

import { Button } from "antd";
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
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Form.Item name="startYear" label="Start year">
            <DatePicker picker="year" />
          </Form.Item>
          <Form.Item name="endYear" label="End year">
            <DatePicker picker="year" />
          </Form.Item>
        </div>

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

        <div style={{ width: "fit-content", margin: "auto" }}>
          <Button
            shape="round"
            className="editor-form__btn"
            type="primary"
            htmlType="submit"
          >
            Submit
          </Button>
        </div>
      </Form>
    </div>
  );
}

export default Filter;

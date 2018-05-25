import React, { Component } from 'react';
import { Radio } from "@icedesign/base";

const { Group: RadioGroup } = Radio;

const list = [
  {
    value: "1",
    label: "男"
  },
  {
    value: "0",
    label: "女"
  }
];

export default class ControlApp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value1: "1",
      value2: ""
    };

    this.onNestChange = this.onNestChange.bind(this);
    this.onNormalChange = this.onNormalChange.bind(this);
  }

  onNormalChange(value) {
    this.setState({
      value1: value
    });
  }

  onNestChange(value) {
    this.setState({
      value2: value
    });
  }

  render() {
    return (
      <div>
        <RadioGroup
          shape="button"
          size="large"
          value={this.state.value1}
          onChange={this.onNormalChange}
        >
          <Radio id="nan" value="1">
            男
          </Radio>
          <Radio id="nv" value="0">
            女
          </Radio>
        </RadioGroup>
      </div>
    );
  }
}

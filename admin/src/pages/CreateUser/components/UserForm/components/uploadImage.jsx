import React, { Component } from 'react';
import { Upload, Button, Dialog } from "@icedesign/base";

const { CropUpload } = Upload;

export default class CropUploadApp extends Component {
  constructor(props) {
    super(props);

    this.onSuccess = this.onSuccess.bind(this);
  }

  beforeCrop(file) {
    console.log("beforeCrop callback : ", file);

    // 返回 `false` 的方式
    if (file.size > 1024 * 1024 * 3) {
      Dialog.alert({
        content: "图片尺寸超过最大限制 3MB，请重新选择！",
        closable: false,
        title: "裁剪提醒"
      });
      return false;
    }

    // 返回 `promise` 的方式
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const img = new Image();
        img.onload = () => {
          if (img.width <= 1200) {
            resolve();
          } else {
            Dialog.alert({
              content: `图片宽度为${
                img.width
              }px, 超过最大限制 1200px，请重新选择！`,
              closable: false,
              title: "裁剪提醒"
            });
            reject(); // resolve(false) 也能阻断流程
          }
        };
        img.src = reader.result;
      };
      reader.readAsDataURL(file);
    });
  }

  onCrop(dataUrl) {
    console.log("onCrop callback : ", dataUrl);
  }

  beforeUpload(file) {
    console.log("beforeUpload callback : ", file);
  }

  onChange(file) {
    console.log("onChange callback : ", file);
  }

  onSuccess(res, dataUrl) {
    console.log("onSuccess callback : ", res);
    this.refs.targetViewer.src = dataUrl;
  }

  render() {
    return (
      <CropUpload
        action="//next-upload.shuttle.alibaba.net/upload" // 该接口仅作测试使用，业务请勿使用
        preview
        previewList={[80, 60, 40]}
        minCropBoxSize={100}
        beforeCrop={this.beforeCrop}
        onCrop={this.onCrop}
        beforeUpload={this.beforeUpload}
        onChange={this.onChange}
        onSuccess={this.onSuccess}
      >
        {/* CropUpload 内嵌的标签会成为呼出系统弹窗的 trigger */}
        <Button type="primary" style={{ margin: 0 }}>
          上传头像
        </Button>
        <div style={{ marginTop: "20px" }}>
          <img
            ref="targetViewer"
            src="http://120.79.224.26:3000/images/boy.jpg"
            width="120px"
            height="120px"
          />
        </div>
        {/* trigger end */}
      </CropUpload>
    );
  }
}
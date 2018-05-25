/* eslint react/no-string-refs:0 */
import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import { Input, Grid, Button, Select, Feedback,Upload,Dialog } from '@icedesign/base';
import {
  FormBinderWrapper as IceFormBinderWrapper,
  FormBinder as IceFormBinder,
  FormError as IceFormError,
} from '@icedesign/form-binder';
import './UserForm.scss';
import UploadImage from './components/uploadImage'
import Radio from './components/radio'

const { Row, Col } = Grid;
const Toast = Feedback.toast;

const { CropUpload } = Upload;
export default class UserForm extends Component {
  static displayName = 'UserForm';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
      value: {
        username: '',
        nickName: '',
        roles: 'tourist',
        password: '',
        avatar:"",
        sex:"1",
        introduction:"",  // 用户描述
        isPassword: ''
      },
    };
  }

  checkPasswd = (rule, values, callback) => {
    if (!values) {
      callback('请输入新密码');
    } else if (values.length < 8) {
      callback('密码必须大于8位');
    } else if (values.length > 16) {
      callback('密码必须小于16位');
    } else {
      callback();
    }
  };

  checkPasswd2 = (rule, values, callback, stateValues) => {
    if (values && values !== stateValues.password) {
      callback('两次输入密码不一致');
    } else {
      callback();
    }
  };

  formChange = (value) => {
    this.setState({
      value,
    });
  };

  validateAllFormField = () => {
    this.refs.form.validateAll((errors, values) => {
      if (errors) {
        console.log('errors', errors);
        return;
      }

      console.log('values:', values);
      Toast.success('添加成功');
    });
  };

  render() {
    return (
      <div className="user-form">
        <IceContainer>
          <IceFormBinderWrapper
            value={this.state.value}
            onChange={this.formChange}
            ref="form"
          >
            <div style={styles.formContent}>
              <h2 style={styles.formTitle}>添加用户</h2>

              <Row style={styles.formItem}>
                <Col xxs="6" s="4" l="3" style={styles.formLabel}>
                  用户名：
                </Col>
                <Col xxs="16" s="12" l="10">
                  <IceFormBinder name="username" required message="必填">
                    <Input size="large" placeholder="请输入用户名" />
                  </IceFormBinder>
                  <IceFormError name="username" />
                </Col>
              </Row>

              <Row style={styles.formItem}>
                <Col xxs="6" s="4" l="3" style={styles.formLabel}>
                  昵称：
                </Col>
                <Col xxs="16" s="12" l="10">
                  <IceFormBinder name="nickName">
                    <Input size="large" placeholder="请输入昵称" />
                  </IceFormBinder>
                  <IceFormError name="nickName" />
                </Col>
              </Row>
              <Row style={styles.formItem}>
                <Col xxs="6" s="4" l="3" style={styles.formLabel}>
                  性别：
                </Col>
                <Col xxs="16" s="12" l="10">
                  <IceFormBinder name="sex">
                    <Select
                      size="large"
                      placeholder="请选择..."
                      >
                      <Select.Option value="1">男</Select.Option>
                      <Select.Option value="0">女</Select.Option>
                    </Select>
                  </IceFormBinder>
                </Col>
              </Row>
              <Row style={styles.formItem}>
                <Col xxs="6" s="4" l="3" style={styles.formLabel}>
                  头像：
                </Col>
                <Col xxs="16" s="12" l="10">
                  {/* <IceFormBinder
                    type="email"
                    name="email"
                    required
                    message="请输入正确的邮箱"
                  >
                    <Input
                      size="large"
                      placeholder="ice-admin@alibaba-inc.com"
                    />
                  </IceFormBinder>
                  <IceFormError name="email" /> */}
                  <IceFormBinder name="avatar">
                    <UploadImage></UploadImage>
                  </IceFormBinder>
                </Col>
              </Row>

              <Row style={styles.formItem}>
                <Col xxs="6" s="4" l="3" style={styles.formLabel}>
                  用户权限：
                </Col>
                <Col xxs="16" s="12" l="10">
                  <IceFormBinder name="roles">
                    <Select
                      size="large"
                      placeholder="请选择..."
                      >
                      <Select.Option value="admin">管理员</Select.Option>
                      <Select.Option value="tourist">普通用户</Select.Option>
                    </Select>
                  </IceFormBinder>
                </Col>
              </Row>

              <Row style={styles.formItem}>
                <Col xxs="6" s="4" l="3" style={styles.formLabel}>
                  新密码：
                </Col>
                <Col xxs="16" s="12" l="10">
                  <IceFormBinder
                    name="password"
                    required
                    validator={this.checkPasswd}
                  >
                    <Input
                      htmlType="password"
                      size="large"
                      placeholder="请重新输入新密码"
                    />
                  </IceFormBinder>
                  <IceFormError name="password" />
                </Col>
              </Row>

              <Row style={styles.formItem}>
                <Col xxs="6" s="4" l="3" style={styles.formLabel}>
                  确认密码：
                </Col>
                <Col xxs="16" s="12" l="10">
                  <IceFormBinder
                    name="isPassword"
                    required
                    validator={(rule, values, callback) =>
                      this.checkPasswd2(
                        rule,
                        values,
                        callback,
                        this.state.value
                      )
                    }
                  >
                    <Input
                      htmlType="password"
                      size="large"
                      placeholder="两次输入密码保持一致"
                    />
                  </IceFormBinder>
                  <IceFormError name="isPassword" />
                </Col>
              </Row>
            </div>
          </IceFormBinderWrapper>

          <Row style={{ marginTop: 20 }}>
            <Col offset="3">
              <Button
                size="large"
                type="primary"
                onClick={this.validateAllFormField}
              >
                提 交
              </Button>
            </Col>
          </Row>
        </IceContainer>
      </div>
    );
  }
}

const styles = {
  formContent: {
    width: '100%',
    position: 'relative',
  },
  formItem: {
    marginBottom: 25,
  },
  formLabel: {
    height: '32px',
    lineHeight: '32px',
    textAlign: 'right',
  },
  formTitle: {
    margin: '0 0 20px',
    paddingBottom: '10px',
    borderBottom: '1px solid #eee',
  },
};

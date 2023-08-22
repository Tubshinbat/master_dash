import React, { useEffect, useState } from "react";
import {
  Form,
  Input,
  Button,
  Switch,
  Upload,
  message,
  Select,
  InputNumber,
} from "antd";
import { connect } from "react-redux";
import { Editor } from "@tinymce/tinymce-react";

//Components
import PageTitle from "../../../Components/PageTitle";
import { InboxOutlined } from "@ant-design/icons";
import Loader from "../../../Components/Generals/Loader";

//Actions
import { tinymceAddPhoto } from "../../../redux/actions/imageActions";

import * as actions from "../../../redux/actions/userActions";

// Lib
import base from "../../../base";
import axios from "../../../axios-base";
import { toastControl } from "src/lib/toasControl";
import { convertFromdata } from "../../../lib/handleFunction";

const requiredRule = {
  required: true,
  message: "Тус талбарыг заавал бөглөнө үү",
};

const { Dragger } = Upload;

const Add = (props) => {
  const [form] = Form.useForm();
  const { Option } = Select;
  const [avatar, setAvatar] = useState({});
  const [status, setStatus] = useState(true);
  const [setProgress] = useState(0);
  const [loading, setLoading] = useState({
    visible: false,
    message: "",
  });

  // FUNCTIONS
  const init = () => {};

  const clear = () => {
    props.clear();
    form.resetFields();
    setAvatar({});
    setLoading(false);
  };

  // -- TREE FUNCTIONS

  const handleChange = (event) => {
    form.setFieldsValue({ details: event });
  };

  const handleAdd = (values, status = null) => {
    if (!values.status) values.status = true;
    if (status == "draft") values.status = false;
    if (avatar && avatar.name) values.image = avatar.name;

    const data = {
      ...values,
    };
    const sendData = convertFromdata(data);
    props.createUser(sendData);
  };

  const handleRemove = (stType, file) => {
    let index;

    setAvatar({});

    axios
      .delete("/imgupload", { data: { file: file.name } })
      .then((succ) => {
        toastControl("success", "Амжилттай файл устгагдлаа");
      })
      .catch((error) =>
        toastControl("error", "Файл устгах явцад алдаа гарлаа")
      );
  };

  // CONFIGS

  const uploadImage = async (options) => {
    const { onSuccess, onError, file, onProgress } = options;
    const fmData = new FormData();
    const config = {
      headers: { "content-type": "multipart/form-data" },
      onUploadProgress: (event) => {
        const percent = Math.floor((event.loaded / event.total) * 100);
        setProgress(percent);
        if (percent === 100) {
          setTimeout(() => setProgress(0), 1000);
        }
        onProgress({ percent: (event.loaded / event.total) * 100 });
      },
    };

    fmData.append("file", file);
    try {
      const res = await axios.post("/imgupload", fmData, config);
      const img = {
        name: res.data.data,
        url: `${base.cdnUrl}${res.data.data}`,
      };
      setAvatar(img);

      onSuccess("Ok");
      message.success(res.data.data + " Хуулагдлаа");
      return img;
    } catch (err) {
      toastControl("error", err);
      onError({ err });
      return false;
    }
  };

  const uploadOptions = {
    onRemove: (file) => handleRemove("cover", file),
    fileList: avatar && avatar.name && [avatar],
    customRequest: (options) => uploadImage(options),
    accept: "image/*",
    name: "avatar",
    listType: "picture",
    maxCount: 1,
  };

  // USEEFFECT
  useEffect(() => {
    init();
    return () => clear();
  }, []);

  // Ямар нэгэн алдаа эсвэл амжилттай үйлдэл хийгдвэл энд useEffect барьж аваад TOAST харуулна
  useEffect(() => {
    toastControl("error", props.error);
  }, [props.error]);

  useEffect(() => {
    if (props.success) {
      toastControl("success", props.success);
      setTimeout(() => props.history.replace("/users"), 2000);
    }
  }, [props.success]);

  return (
    <>
      <div className="content-wrapper">
        <PageTitle name="Хамтрагч нэмэх" />
        <div className="page-sub-menu"></div>
        <div className="content">
          <Loader show={loading.visible}> {loading.message} </Loader>
          <div className="container-fluid">
            <Form layout="vertical" form={form}>
              <div className="row">
                <div className="col-8">
                  <div className="card card-primary">
                    <div className="card-body">
                      <div className="row">
                        <div className="row">
                          <div className="col-12">
                            <Form.Item
                              label="Эрх"
                              name="role"
                              rules={[
                                {
                                  required: true,
                                  message: "Тус талбарыг заавал бөглөнө үү",
                                },
                              ]}
                              tooltip="Ажилтан зөвхөн нэмэх харах эрхтэй мөн зарим нэг модалын датаг засах боломжтой. харин админ устгах засварлах бүрэн эрхтэй."
                            >
                              <Select showSearch placeholder="Эрх сонгоно уу">
                                <Option value="operator">Ажилтан</Option>
                                <Option value="admin">Админ</Option>
                              </Select>
                            </Form.Item>
                          </div>

                          <div className="col-6">
                            <Form.Item
                              label="Нэр"
                              rules={[
                                {
                                  required: true,
                                  message: "Тус талбарыг заавал бөглөнө үү",
                                },
                                {
                                  min: 2,
                                  message: "2 -оос дээш утга оруулна уу",
                                },
                              ]}
                              name="firstName"
                              hasFeedback
                            >
                              <Input placeholder="Нэр оруулна уу" />
                            </Form.Item>
                          </div>
                          <div className="col-6">
                            <Form.Item
                              name="lastName"
                              label="Эцэг (эх)-н нэр"
                              rules={[
                                {
                                  required: true,
                                  message: "Тус талбарыг заавал бөглөнө үү",
                                },
                                {
                                  min: 2,
                                  message: "2 -оос дээш утга оруулна уу",
                                },
                              ]}
                              hasFeedback
                            >
                              <Input placeholder="Эцэг (эх)-н нэр оруулна уу" />
                            </Form.Item>
                          </div>
                          <div className="col-6">
                            <Form.Item
                              name="position"
                              label="Албан тушаал"
                              hasFeedback
                            >
                              <Input placeholder="Албан тушаал оруулна уу" />
                            </Form.Item>
                          </div>
                          <div className="col-6">
                            <Form.Item
                              name="gender"
                              label="Хүйс"
                              rules={[
                                {
                                  required: true,
                                  message: "Тус талбарыг заавал бөглөнө үү",
                                },
                              ]}
                              hasFeedback
                            >
                              <Select showSearch placeholder="Хүйс сонгоно уу">
                                <Option value="female">Эмэгтэй</Option>
                                <Option value="male">Эрэгтэй</Option>
                              </Select>
                            </Form.Item>
                          </div>
                          <div className="col-6">
                            <Form.Item
                              name="email"
                              label="Имэйл хаяг"
                              hasFeedback
                              rules={[
                                {
                                  required: true,
                                  message: "Тус талбарыг заавал бөглөнө үү",
                                },
                                {
                                  type: "email",
                                  message: "Имэйл хаяг буруу байна!",
                                },
                              ]}
                            >
                              <Input placeholder="Имэйл хаягаа оруулна уу" />
                            </Form.Item>
                          </div>
                          <div className="col-6">
                            <Form.Item
                              label="Утасны дугаар"
                              name="phoneNumber"
                              rules={[
                                {
                                  required: true,
                                  message: "Тус талбарыг заавал бөглөнө үү",
                                },
                              ]}
                              hasFeedback
                            >
                              <InputNumber
                                placeholder="Утасны дугаараа оруулна уу"
                                style={{ width: "100%" }}
                              />
                            </Form.Item>
                          </div>

                          <div className="col-6">
                            <Form.Item
                              label="Нууц үг оруулах"
                              name="password"
                              rules={[
                                {
                                  required: true,
                                  message: "Тус талбарыг заавал бөглөнө үү",
                                },
                              ]}
                              hasFeedback
                            >
                              <Input.Password placeholder="Нууц үгээ оруулна уу" />
                            </Form.Item>
                          </div>
                          <div className="col-6">
                            <Form.Item
                              name="confirm"
                              label="Нууц үгээ давтан оруулна уу"
                              dependencies={["password"]}
                              rules={[
                                {
                                  required: true,
                                  message: "Тус талбарыг заавал бөглөнө үү",
                                },
                                ({ getFieldValue }) => ({
                                  validator(_, value) {
                                    if (
                                      !value ||
                                      getFieldValue("password") === value
                                    ) {
                                      return Promise.resolve();
                                    }

                                    return Promise.reject(
                                      new Error(
                                        "Эхний оруулсан нууц үгтэй тохирохгүй байна!"
                                      )
                                    );
                                  },
                                }),
                              ]}
                              hasFeedback
                            >
                              <Input.Password placeholder="Нууц үгээ давтан оруулна уу" />
                            </Form.Item>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-4">
                  <div className="card">
                    <div class="card-header">
                      <h3 class="card-title">ТОХИРГОО</h3>
                    </div>
                    <div className="card-body">
                      <div className="row">
                        <div className="col-6">
                          <Form.Item label="Идэвхтэй эсэх" name="status">
                            <Switch
                              checkedChildren="Идэвхтэй"
                              unCheckedChildren="Идэвхгүй"
                              size="medium"
                              onChange={(value) => setStatus(value)}
                              checked={status}
                            />
                          </Form.Item>
                        </div>
                      </div>
                    </div>
                    <div className="card-footer">
                      <div className="control-bottons">
                        <Button
                          key="submit"
                          htmlType="submit"
                          className="add-button"
                          loading={props.loading}
                          onClick={() => {
                            form
                              .validateFields()
                              .then((values) => {
                                handleAdd(values);
                              })
                              .catch((info) => {
                                // console.log(info);
                              });
                          }}
                        >
                          Нэмэх
                        </Button>
                        <Button
                          key="draft"
                          type="primary"
                          onClick={() => {
                            form
                              .validateFields()
                              .then((values) => {
                                handleAdd(values, "draft");
                              })
                              .catch((info) => {
                                // console.log(info);
                              });
                          }}
                        >
                          Ноороглох
                        </Button>
                        <Button onClick={() => props.history.goBack()}>
                          Буцах
                        </Button>
                      </div>
                    </div>
                  </div>

                  <div className="card">
                    <div class="card-header">
                      <h3 class="card-title">Нүүр зураг оруулах</h3>
                    </div>
                    <div className="card-body">
                      <Dragger
                        {...uploadOptions}
                        className="upload-list-inline"
                      >
                        <p className="ant-upload-drag-icon">
                          <InboxOutlined />
                        </p>
                        <p className="ant-upload-text">
                          Зургаа энэ хэсэг рүү чирч оруулна уу
                        </p>
                        <p className="ant-upload-hint">
                          Нэг болон түүнээс дээш файл хуулах боломжтой
                        </p>
                      </Dragger>
                    </div>
                  </div>
                </div>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    success: state.userReducer.success,
    error: state.userReducer.error,
    loading: state.userReducer.loading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    tinymceAddPhoto: (file) => dispatch(tinymceAddPhoto(file)),
    createUser: (data) => dispatch(actions.createUser(data)),
    clear: () => dispatch(actions.clear()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Add);

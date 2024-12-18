import React, { useEffect, useState } from "react";
import { Form, Input, Button, Upload, message } from "antd";
import { connect } from "react-redux";
import { Editor } from "@tinymce/tinymce-react";

//Components
import PageTitle from "../../Components/PageTitle";
import { InboxOutlined } from "@ant-design/icons";
import Loader from "../../Components/Generals/Loader";
import Menus from "./menu";

//Actions
import { tinymceAddPhoto } from "../../redux/actions/imageActions";

import * as actions from "../../redux/actions/webinfoActions";

// Lib
import base from "../../base";
import axios from "../../axios-base";
import { toastControl } from "src/lib/toasControl";
import { menuGenerateData } from "../../lib/menuGenerate";
import { convertFromdata } from "../../lib/handleFunction";

const requiredRule = {
  required: true,
  message: "Тус талбарыг заавал бөглөнө үү",
};

const { Dragger } = Upload;

const WebSettings = (props) => {
  const [form] = Form.useForm();
  const { TextArea } = Input;
  const [deleteFile, setDeleteFile] = useState([]);
  const [logo, setLogo] = useState({});
  const [whiteLogo, setWhiteLogo] = useState({});

  const [setProgress] = useState(0);
  const [loading, setLoading] = useState({
    visible: false,
    message: "",
  });

  // FUNCTIONS
  const init = () => {
    props.loadWebinfo();
  };

  const clear = () => {
    form.resetFields();
    setLogo({});
    setWhiteLogo({});
    setLoading(false);
  };

  const handleChange = (event) => {
    form.setFieldsValue({ policy: event });
  };

  const handleAdd = (values, status = null) => {
    const type = values.type || "default";

    if (logo && logo.name) values.logo = logo.name;
    if (whiteLogo && whiteLogo.name) values.whiteLogo = whiteLogo.name;

    if (!whiteLogo.name || !logo.name) {
      toastControl("error", "Лого оруулна уу");
    } else {
      if (deleteFile && deleteFile.length > 0) {
        deleteFile.map(async (file) => {
          await axios.delete("/imgupload", { data: { file: file } });
        });
      }

      const data = {
        ...values,
      };

      const sendData = convertFromdata(data);
      props.createWebinfo(sendData);
    }
  };

  const handleRemove = (stType, file) => {
    switch (stType) {
      case "logo":
        setLogo({});
        break;
      case "whiteLogo":
        setWhiteLogo({});
        break;
      default:
        break;
    }

    setDeleteFile((bf) => [...bf, file.name]);
  };

  // CONFIGS

  const uploadImage = async (options, stType) => {
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
      setLoading({ visible: true, message: "Түр хүлээнэ үү файл хуулж байна" });
      const res = await axios.post("/imgupload", fmData, config);
      const data = {
        name: res.data.data,
        url: `${base.cdnUrl}${res.data.data}`,
        status: "done",
      };
      if (stType === "logo") setLogo(data);
      if (stType === "whiteLogo") setWhiteLogo(data);
      onSuccess("Ok");
      message.success(res.data.data + " Хуулагдлаа");
      setLoading({ visible: false, message: "" });
    } catch (error) {
      toastControl("error", error);
      onError({ error });
    }
  };

  const logoOptions = {
    onRemove: (file) => handleRemove("logo", file),
    fileList: logo && logo.name && [logo],
    customRequest: (options) => uploadImage(options, "logo"),
    accept: "image/*",
    name: "picture",
    maxCount: 1,
    listType: "picture",
  };

  const whiteLogoOptions = {
    onRemove: (file) => handleRemove("whiteLogo", file),
    fileList: whiteLogo && whiteLogo.name && [whiteLogo],
    customRequest: (options) => uploadImage(options, "whiteLogo"),
    accept: "image/*",
    name: "picture",
    maxCount: 1,
    listType: "picture",
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
      setTimeout(() => props.history.replace("/web_settings"), 2000);
    }
  }, [props.success]);

  useEffect(() => {
    if (props.webInfo) {
      form.setFieldsValue({ ...props.webInfo });
      if (props.webInfo && props.webInfo.logo) {
        const data = {
          name: props.webInfo.logo,
          url: `${base.cdnUrl}${props.webInfo.logo}`,
        };
        setLogo(data);
      }
      if (props.webInfo && props.webInfo.whiteLogo) {
        const data = {
          name: props.webInfo.whiteLogo,
          url: `${base.cdnUrl}${props.webInfo.whiteLogo}`,
        };
        setWhiteLogo(data);
      }
    }
  }, [props.webInfo]);

  return (
    <>
      <div className="content-wrapper">
        <div className="page-sub-menu">
          <Menus />
        </div>
        <div className="content">
          <Loader show={loading.visible}> {loading.message} </Loader>
          <div className="container-fluid">
            <Form layout="vertical" form={form}>
              <div className="row">
                <div className="col-12">
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
                      Хадгалах
                    </Button>

                    <Button onClick={() => props.history.goBack()}>
                      Буцах
                    </Button>
                  </div>
                  <div className="row">
                    <div className="col-6">
                      <div className="card">
                        <div class="card-header">
                          <h3 class="card-title">Лого оруулах</h3>
                        </div>
                        <div className="card-body">
                          <Dragger
                            {...logoOptions}
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
                    <div className="col-6">
                      <div className="card">
                        <div class="card-header">
                          <h3 class="card-title">Цагаан лого оруулах</h3>
                        </div>
                        <div className="card-body">
                          <Dragger
                            {...whiteLogoOptions}
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
                  <div className="card card-primary">
                    <div className="card-body">
                      <div className="row">
                        <div className="col-6">
                          <Form.Item
                            label="Сайтын нэр"
                            name="name"
                            rules={[requiredRule]}
                            hasFeedback
                          >
                            <Input placeholder="Сайтын нэр оруулна уу" />
                          </Form.Item>
                        </div>
                        <div className="col-6">
                          <Form.Item
                            label="Утасны дугаар"
                            name="phone"
                            hasFeedback
                            tooltip=" (,) тавиад олон дугаар холбох боломжтой"
                          >
                            <Input placeholder="Холбоо барих утасны дугаараа оруулна уу" />
                          </Form.Item>
                        </div>
                        <div className="col-6">
                          <Form.Item
                            label="Имэйл хаяг"
                            name="email"
                            hasFeedback
                          >
                            <Input placeholder="Имэйл хаягаа оруулна уу" />
                          </Form.Item>
                        </div>
                        <div className="col-12">
                          <Form.Item
                            label="Сайтын товч мэдээлэл"
                            name="siteInfo"
                            hasFeedback
                          >
                            <TextArea rows={4} />
                          </Form.Item>
                        </div>
                        <div className="col-12">
                          <Form.Item label="Хаяг" name="address" hasFeedback>
                            <TextArea rows={2} />
                          </Form.Item>
                        </div>
                        <div className="col-12">
                          <Form.Item
                            label="Дэлгэрэнгүй мэдээлэл"
                            name="policy"
                            getValueFromEvent={(e) =>
                              e.target && e.target.getContent()
                            }
                          >
                            <Editor
                              apiKey="2nubq7tdhudthiy6wfb88xgs36os4z3f4tbtscdayg10vo1o"
                              init={{
                                height: 300,
                                menubar: false,
                                plugins: [
                                  "advlist autolink lists link image charmap print preview anchor",
                                  "searchreplace visualblocks code fullscreen",
                                  "insertdatetime media table paste code help wordcount image media  code  table  ",
                                ],
                                toolbar:
                                  "undo redo | fontselect fontsizeselect formatselect blockquote  | bold italic backcolor | \
                        alignleft aligncenter alignright alignjustify | \
                        bullist numlist outdent indent | removeformat | help | link image | quickbars | media | code | tableprops tabledelete | tableinsertrowbefore tableinsertrowafter tabledeleterow | tableinsertcolbefore tableinsertcolafter tabledeletecol",
                                file_picker_types: "image",
                                automatic_uploads: false,
                                file_picker_callback: function (
                                  cb,
                                  value,
                                  meta
                                ) {
                                  var input = document.createElement("input");
                                  input.setAttribute("type", "file");
                                  input.setAttribute("accept", "image/*");
                                  input.onchange = async function () {
                                    var file = this.files[0];
                                    const fData = new FormData();
                                    fData.append("file", file);
                                    const res = await axios.post(
                                      "/imgupload",
                                      fData
                                    );
                                    const url =
                                      `${base.cdnUrl}` + res.data.data;
                                    cb(url);
                                  };
                                  input.click();
                                },
                              }}
                              onEditorChange={(event) => handleChange(event)}
                            />
                          </Form.Item>
                        </div>
                      </div>
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
    webInfo: state.webInfoReducer.webInfo,
    success: state.webInfoReducer.success,
    error: state.webInfoReducer.error,
    loading: state.webInfoReducer.loading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    tinymceAddPhoto: (file) => dispatch(tinymceAddPhoto(file)),
    createWebinfo: (data) => dispatch(actions.updateWebinfo(data)),
    loadWebinfo: () => dispatch(actions.loadWebinfo()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(WebSettings);

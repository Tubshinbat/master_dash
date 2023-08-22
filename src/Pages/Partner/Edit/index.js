import React, { useEffect, useState } from "react";
import { Form, Input, Button, Switch, Upload, message, Tag, Modal } from "antd";
import { connect } from "react-redux";
import { Editor } from "@tinymce/tinymce-react";

//Components
import PageTitle from "../../../Components/PageTitle";
import { InboxOutlined } from "@ant-design/icons";
import Loader from "../../../Components/Generals/Loader";

//Actions
import { tinymceAddPhoto } from "../../../redux/actions/imageActions";

import * as actions from "../../../redux/actions/partnerActions";

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

const Edit = (props) => {
  const [form] = Form.useForm();
  const [logo, setLogo] = useState({});
  const [setProgress] = useState(0);
  const [deleteFiles, setDeleteFiles] = useState([]);
  const [linkInput, setInput] = useState({
    name: "",
    link: "",
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [links, setLinks] = useState([]);
  const [loading, setLoading] = useState({
    visible: false,
    message: "",
  });
  const [checkedRadio, setCheckedRadio] = useState({
    status: true,
  });

  // Modal functions
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    if (linkInput.name && linkInput.link) {
      setLinks((bl) => [...bl, { name: linkInput.name, link: linkInput.link }]);
      setInput({ name: "", link: "" });
      setIsModalOpen(false);
    } else {
      toastControl("error", "Талбаруудыг гүйцэт бөглөнө үү");
    }
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const deleteLink = (index) => {
    const copyLinks = links;
    copyLinks.splice(index, 1);
    setLinks(() => [...copyLinks]);
  };

  // FUNCTIONS
  const init = () => {
    props.getPartner(props.match.params.id);
  };

  const clear = () => {
    props.clear();
    form.resetFields();
    setLogo({});
    setLoading(false);
  };

  // -- TREE FUNCTIONS

  const handleChange = (event) => {
    form.setFieldsValue({ about: event });
  };

  const handleAdd = (values, status = null) => {
    if (status == "draft") values.status = false;
    if (logo && logo.name) values.logo = logo.name;
    else {
      values.logo = "";
    }

    values.links = JSON.stringify(links);

    if (deleteFiles && deleteFiles.length > 0) {
      deleteFiles.map(async (deleteFile) => {
        await axios.delete("/imgupload", { data: { file: deleteFile } });
      });
    }

    const data = {
      ...values,
    };

    const sendData = convertFromdata(data);
    props.updatePartner(props.match.params.id, sendData);
  };

  const handleRemove = (stType, file) => {
    if (stType === "logo") setLogo({});
    setDeleteFiles((bf) => [...bf, file.name]);
  };

  // CONFIGS

  const uploadImage = async (options, type) => {
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
      if (type == "logo") setLogo(img);
      onSuccess("Ok");
      message.success(res.data.data + " Хуулагдлаа");
      return img;
    } catch (err) {
      toastControl("error", err);
      onError({ err });
      return false;
    }
  };

  const logoOptions = {
    onRemove: (file) => handleRemove("logo", file),
    fileList: logo && logo.name && [logo],
    customRequest: (options) => uploadImage(options, "logo"),
    accept: "image/*",
    name: "logo",
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
      setTimeout(() => props.history.replace("/partners"), 2000);
    }
  }, [props.success]);

  useEffect(() => {
    if (props.partner) {
      form.setFieldsValue({ ...props.partner });

      if (props.partner.links) setLinks(() => JSON.parse(props.partner.links));

      props.partner.logo &&
        setLogo({
          name: props.partner.logo,
          url: `${base.cdnUrl}${props.partner.logo}`,
        });

      setCheckedRadio((bc) => ({
        ...bc,
        status: props.partner.status,
      }));
    }
  }, [props.partner]);

  return (
    <>
      <div className="content-wrapper">
        <PageTitle name="Хамтрагчийн мэдээлэл шинчлэх" />
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
                        <div className="col-12">
                          <Form.Item
                            label="Компаний нэр"
                            name="name"
                            rules={[requiredRule]}
                          >
                            <Input placeholder="Компаний нэрийг оруулна уу" />
                          </Form.Item>
                        </div>

                        <div className="col-12">
                          <Form.Item
                            label="Дэлгэрэнгүй"
                            name="about"
                            getValueFromEvent={(e) =>
                              e.target && e.target.getContent()
                            }
                            rules={[requiredRule]}
                          >
                            <Editor
                              apiKey="2nubq7tdhudthiy6wfb88xgs36os4z3f4tbtscdayg10vo1o"
                              init={{
                                height: 300,
                                menubar: false,
                                plugins: [
                                  "advlist textcolor autolink lists link image charmap print preview anchor tinydrive ",
                                  "searchreplace visualblocks code fullscreen",
                                  "insertdatetime media table paste code help wordcount image media  code  table  ",
                                ],
                                toolbar:
                                  "mybutton | addPdf |  image | undo redo | fontselect fontsizeselect formatselect blockquote  | bold italic forecolor  backcolor | \
                        alignleft aligncenter alignright alignjustify | \
                        bullist numlist outdent indent | removeformat | help | link  | quickbars | media | code | tableprops tabledelete | tableinsertrowbefore tableinsertrowafter tabledeleterow | tableinsertcolbefore tableinsertcolafter tabledeletecol",
                                file_picker_types: "image",
                                tinydrive_token_provider: `${base.apiUrl}users/jwt`,
                                automatic_uploads: false,
                                setup: (editor) => {
                                  editor.ui.registry.addButton("mybutton", {
                                    text: "Файл оруулах",
                                    onAction: () => {
                                      var input =
                                        document.createElement("input");
                                      input.setAttribute("type", "file");
                                      input.onchange = async function () {
                                        var file = this.files[0];
                                        const fData = new FormData();
                                        fData.append("file", file);
                                        setLoading({
                                          visible: true,
                                          message:
                                            "Түр хүлээнэ үү файл хуулж байна",
                                        });
                                        const res = await axios.post(
                                          "/file",
                                          fData
                                        );
                                        const url =
                                          `${base.cdnUrl}` + res.data.data;
                                        editor.insertContent(
                                          `<a href="${url}"> ${res.data.data} </a>`
                                        );
                                        setLoading({
                                          visible: false,
                                        });
                                      };
                                      input.click();
                                    },
                                  });
                                  editor.ui.registry.addButton("addPdf", {
                                    text: "PDF Файл оруулах",
                                    onAction: () => {
                                      let input =
                                        document.createElement("input");
                                      input.setAttribute("type", "file");
                                      input.setAttribute("accept", ".pdf");
                                      input.onchange = async function () {
                                        let file = this.files[0];
                                        const fData = new FormData();
                                        fData.append("file", file);
                                        setLoading({
                                          visible: true,
                                          message:
                                            "Түр хүлээнэ үү файл хуулж байна",
                                        });
                                        const res = await axios.post(
                                          "/file",
                                          fData
                                        );
                                        const url = base.cdnUrl + res.data.data;
                                        editor.insertContent(
                                          `<iframe src="${url}" style="width:100%; min-height: 500px"> </iframe>`
                                        );
                                        setLoading({
                                          visible: false,
                                        });
                                      };
                                      input.click();
                                    },
                                  });
                                },
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
                        <div className="col-12">
                          <Form.Item label="Холбоос линкүүд">
                            <div className="head-link">
                              <Button type="primary" onClick={showModal}>
                                Линк нэмэх
                              </Button>
                            </div>
                            <div className="links-list">
                              {links.map((link, index) => (
                                <div
                                  className="link-item"
                                  key={index + "_" + link.name}
                                >
                                  <a href={link.link} targer="_blank">
                                    {link.name}
                                  </a>
                                  <div
                                    className="link-delete"
                                    onClick={() => deleteLink(index)}
                                  >
                                    <i className="fa fa-trash" />
                                  </div>
                                </div>
                              ))}
                            </div>
                          </Form.Item>
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
                              checked={checkedRadio.status}
                              onChange={(checked) =>
                                setCheckedRadio((bc) => ({
                                  ...bc,
                                  status: checked,
                                }))
                              }
                              size="medium"
                              defaultChecked
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
                          Хадгалах
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
                      <h3 class="card-title">Лого оруулах</h3>
                    </div>
                    <div className="card-body">
                      <Dragger {...logoOptions} className="upload-list-inline">
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
      <Modal
        title="Холбоос нэмэх"
        open={isModalOpen}
        footer={[
          <Button key="back" onClick={handleCancel}>
            Болих
          </Button>,
          <Button key="submit" type="primary" onClick={handleOk}>
            Нэмэх
          </Button>,
        ]}
      >
        <div className="input-box">
          <label>Сайтын нэр</label>
          <input
            type="text"
            placeholder="facebook, twitter, website... гэх мэт"
            value={linkInput.name}
            onChange={(e) =>
              setInput((bi) => ({ ...bi, name: e.target.value }))
            }
          />
        </div>
        <div className="input-box">
          <label>Линк</label>
          <input
            type="text"
            placeholder="https://facebook.com/webr ...."
            value={linkInput.link}
            onChange={(e) =>
              setInput((bi) => ({ ...bi, link: e.target.value }))
            }
          />
        </div>
      </Modal>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    success: state.partnerReducer.success,
    error: state.partnerReducer.error,
    loading: state.partnerReducer.loading,
    partner: state.partnerReducer.partner,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    tinymceAddPhoto: (file) => dispatch(tinymceAddPhoto(file)),
    updatePartner: (id, data) => dispatch(actions.updatePartner(id, data)),
    getPartner: (id) => dispatch(actions.getPartner(id)),
    clear: () => dispatch(actions.clear()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Edit);

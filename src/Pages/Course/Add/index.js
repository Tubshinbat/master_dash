import React, { useEffect, useState } from "react";
import {
  Form,
  Input,
  Button,
  Switch,
  Upload,
  message,
  Modal,
  Tree,
  Select,
} from "antd";
import { connect } from "react-redux";
import { Editor } from "@tinymce/tinymce-react";
import debounce from "lodash/debounce";

//Components
import PageTitle from "../../../Components/PageTitle";
import { InboxOutlined } from "@ant-design/icons";
import Loader from "../../../Components/Generals/Loader";

//Actions
import { loadMenus } from "../../../redux/actions/memberCategoryActions";
import * as actions from "../../../redux/actions/courseActions";
import { loadPartner } from "../../../redux/actions/partnerActions";
import { loadMember } from "../../../redux/actions/memberActions";

// Lib
import base from "../../../base";
import axios from "../../../axios-base";
import { toastControl } from "src/lib/toasControl";
import { convertFromdata } from "../../../lib/handleFunction";
import { menuGenerateData } from "src/lib/menuGenerate";

const requiredRule = {
  required: true,
  message: "Тус талбарыг заавал бөглөнө үү",
};

const { Dragger } = Upload;

const Add = (props) => {
  const [form] = Form.useForm();
  const [logo, setLogo] = useState({});
  const [linkInput, setInput] = useState({
    name: "",
    link: "",
  });
  const [gData, setGData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [links, setLinks] = useState([]);
  const [setProgress] = useState(0);
  const [expandedKeys, setExpandedKeys] = useState([]);
  const [checkedKeys, setCheckedKeys] = useState([]);
  const [selectedKeys, setSelectedKeys] = useState([]);
  const [autoExpandParent, setAutoExpandParent] = useState(true);
  const [partners, setPartners] = useState([]);
  const [members, setMembers] = useState([]);

  const [loading, setLoading] = useState({
    visible: false,
    message: "",
  });

  // Modal functions

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

  // FUNCTIONS
  const init = () => {
    props.loadPartner();
    props.loadMenus();
    props.loadMember();
    setInput({ name: "", link: "" });
  };

  const clear = () => {
    props.clear();
    setInput({ name: "", link: "" });
    form.resetFields();
    setLogo({});
    setLoading(false);
  };

  // -- TREE FUNCTIONS
  const onExpand = (expandedKeysValue) => {
    setExpandedKeys(expandedKeysValue);
    setAutoExpandParent(false);
  };
  const onCheck = (checkedKeysValue) => {
    // console.log(checkedKeysValue);
    setCheckedKeys(checkedKeysValue);
  };

  const onSelect = (selectedKeysValue, info) => {
    // console.log("onSelect", info);
    setSelectedKeys(selectedKeysValue);
  };

  const handleSearch = debounce((value) => {
    if (!value) return;
    props.loadPartner(`name=${value}`);
  }, 300);

  const handleMemberSearch = debounce((value) => {
    if (!value) return;
    props.loadMember(`name=${value}`);
  }, 300);

  const handleChange = (event) => {
    form.setFieldsValue({ about: event });
  };

  const handleAdd = (values, status = null) => {
    if (!values.status) values.status = true;
    if (status == "draft") values.status = false;
    if (logo && logo.name) values.picture = logo.name;
    else {
      return toastControl("error", "Сургалтын зураг оруулна уу");
    }

    values.links = JSON.stringify(links);
    if (checkedKeys && checkedKeys.length > 0)
      values.category = [...checkedKeys];
    const data = {
      ...values,
    };

    const sendData = convertFromdata(data);
    props.saveCourse(sendData);
  };

  const handleRemove = (stType, file) => {
    let index;

    if (stType === "logo") setLogo({});

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
      if (type === "logo") setLogo(img);

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
      setTimeout(() => props.history.replace("/course"), 2000);
    }
  }, [props.success]);

  useEffect(() => {
    const data = menuGenerateData(props.menus);
    setGData(data);
  }, [props.menus]);

  useEffect(() => {
    if (props.partners && props.partners.length > 0) {
      const data = props.partners.map((item) => {
        return {
          value: item._id,
          label: item.name,
        };
      });
      setPartners(data);
    }
  }, [props.partners]);

  useEffect(() => {
    if (props.members && props.members.length > 0) {
      const data = props.members.map((item) => {
        let label = item?.lastName || "";
        item.name && (label += " " + item.name);
        item.partner &&
          item.partner.name &&
          (label += " (" + item.partner.name + ")");
        return {
          value: item._id,
          label,
        };
      });
      setMembers(data);
    }
  }, [props.members]);

  return (
    <>
      <div className="content-wrapper">
        <PageTitle name="Сургалт нэмэх" />
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
                            label="Сургалтын нэр"
                            name="name"
                            rules={[requiredRule]}
                          >
                            <Input placeholder="Сургалтын нэрийг оруулна уу" />
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
                              apiKey="p3ooelc5v0jqfzosggvh1ug9vc9yqyipicx8qd90s45tqsho"
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
                          <Form.Item
                            label="Сургалт зохион байгуулагч"
                            name="partner"
                            rules={[requiredRule]}
                          >
                            <Select
                              showSearch
                              placeholder="Байгуулга хайх..."
                              options={partners}
                              onSearch={handleSearch}
                              filterOption={false}
                            />
                          </Form.Item>
                        </div>{" "}
                        <div className="col-12">
                          <Form.Item
                            label="Сургалты багш нар"
                            name="teachers"
                            rules={[requiredRule]}
                          >
                            <Select
                              showSearch
                              mode="multiple"
                              placeholder="Гишүүд хайх..."
                              options={members}
                              onSearch={handleMemberSearch}
                              filterOption={false}
                            />
                          </Form.Item>
                        </div>
                        <div className="col-12">
                          <Form.Item
                            label="Шавь нар"
                            name="students"
                            rules={[requiredRule]}
                          >
                            <Select
                              showSearch
                              mode="multiple"
                              placeholder="Гишүүд хайх..."
                              options={members}
                              onSearch={handleMemberSearch}
                              filterOption={false}
                            />
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
                      <h3 class="card-title">Ангилал</h3>
                    </div>
                    <div className="card-body">
                      <Form.Item name="category">
                        <Tree
                          checkable
                          onExpand={onExpand}
                          expandedKeys={expandedKeys}
                          autoExpandParent={autoExpandParent}
                          onCheck={onCheck}
                          checkedKeys={checkedKeys}
                          onSelect={onSelect}
                          selectedKeys={selectedKeys}
                          treeData={gData}
                        />
                      </Form.Item>
                    </div>
                  </div>
                  <div className="card">
                    <div class="card-header">
                      <h3 class="card-title">Сургалтын зураг оруулах</h3>
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
    success: state.courseReducer.success,
    error: state.courseReducer.error,
    loading: state.courseReducer.loading,
    menus: state.memberCategoryReducer.menus,
    partners: state.partnerReducer.partners,
    members: state.memberReducer.members,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    saveCourse: (data) => dispatch(actions.saveCourse(data)),
    loadPartner: (query) => dispatch(loadPartner(query)),
    loadMember: (query) => dispatch(loadMember(query)),
    loadMenus: () => dispatch(loadMenus()),
    clear: () => dispatch(actions.clear()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Add);

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
  Tree,
  Modal,
} from "antd";
import { connect } from "react-redux";
import { Editor } from "@tinymce/tinymce-react";

//Components
import PageTitle from "../../../Components/PageTitle";
import { InboxOutlined } from "@ant-design/icons";
import Loader from "../../../Components/Generals/Loader";

//Actions
import { tinymceAddPhoto } from "../../../redux/actions/imageActions";

import { loadPartner } from "../../../redux/actions/partnerActions";
import { loadMenus } from "../../../redux/actions/memberCategoryActions";
import * as actions from "../../../redux/actions/memberActions";

// Lib
import base from "../../../base";
import axios from "../../../axios-base";
import { toastControl } from "src/lib/toasControl";
import { convertFromdata } from "../../../lib/handleFunction";
import TextArea from "antd/lib/input/TextArea";
import { menuGenerateData } from "src/lib/menuGenerate";

const requiredRule = {
  required: true,
  message: "Тус талбарыг заавал бөглөнө үү",
};

const { Dragger } = Upload;

const Add = (props) => {
  const [form] = Form.useForm();
  const { Option } = Select;
  const [avatar, setAvatar] = useState({});
  const [deleteFile, setDeleteFile] = useState([]);
  const [status, setStatus] = useState(false);
  const [memberShip, setMemberShip] = useState(false);
  const [gData, setGData] = useState([]);
  const [partners, setPartners] = useState([]);
  const [expandedKeys, setExpandedKeys] = useState([]);
  const [checkedKeys, setCheckedKeys] = useState([]);
  const [selectedKeys, setSelectedKeys] = useState([]);
  const [autoExpandParent, setAutoExpandParent] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModal, setModal] = useState(false);
  const [links, setLinks] = useState([]);
  const [experience, setExperience] = useState([]);
  const [experienceInput, setExperienceInput] = useState({
    companyName: "",
    date: "",
    position: "",
    about: "",
  });
  const [linkInput, setInput] = useState({
    name: "",
    link: "",
  });
  const [setProgress] = useState(0);
  const [loading, setLoading] = useState({
    visible: false,
    message: "",
  });

  // FUNCTIONS
  const init = () => {
    setAvatar({});
    setInput({ name: "", link: "" });
    setExperienceInput(() => ({
      companyName: "",
      about: "",
      date: "",
      position: "",
    }));
    props.loadPartner(`limit=1000`);
    props.loadMenus();
    props.getMember(props.match.params.id);
  };

  useEffect(() => {
    const data = menuGenerateData(props.menus);
    setGData(data);
  }, [props.menus]);

  const clear = () => {
    props.clear();
    setInput({ name: "", link: "" });
    setExperienceInput(() => ({
      companyName: "",
      about: "",
      date: "",
      position: "",
    }));
    form.resetFields();
    setAvatar({});
    setLoading(false);
  };
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
    setInput({ name: "", link: "" });
  };

  // Modal exp
  const handleModal = () => {
    setModal(true);
    setExperienceInput(() => ({
      companyName: "",
      about: "",
      date: "",
      position: "",
    }));
  };

  const handleSave = () => {
    if (
      experienceInput.about &&
      experienceInput.companyName &&
      experienceInput.date &&
      experienceInput.position
    ) {
      setExperience((bi) => [
        ...bi,
        {
          companyName: experienceInput.companyName,
          about: experienceInput.about,
          date: experienceInput.date,
          position: experienceInput.position,
        },
      ]);
      setExperienceInput(() => ({
        companyName: "",
        about: "",
        date: "",
        position: "",
      }));
      setModal(false);
    } else {
      toastControl("error", "Талбаруудыг гүйцэт бөглөнө үү");
    }
  };

  const handleModalClose = () => {
    setExperienceInput(() => ({
      companyName: "",
      about: "",
      date: "",
      position: "",
    }));
    setModal(false);
  };

  const deleteLink = (index) => {
    const copyLinks = links;
    copyLinks.splice(index, 1);
    setLinks(() => [...copyLinks]);
  };

  const deleteExp = (index) => {
    const copyExp = experience;
    copyExp.splice(index, 1);
    setExperience(() => [...copyExp]);
  };

  // -- TREE FUNCTIONS
  const onExpand = (expandedKeysValue) => {
    setExpandedKeys(expandedKeysValue);
    setAutoExpandParent(false);
  };

  const handleChange = (event) => {
    form.setFieldsValue({ about: event });
  };

  const handleAdd = (values, st = null) => {
    values.status = status;
    if (st == "draft") values.status = false;
    if (avatar && avatar.name) values.picture = avatar.name;
    else values.picture = "";
    values.links = JSON.stringify(links);
    values.experience = JSON.stringify(experience);

    const data = {
      ...values,
      category: [...checkedKeys],
    };

    if (data.category.length === 0) {
      data.category = [];
    }

    if (!data.partner) {
      data.partner = "";
    }

    if (deleteFile && deleteFile.length > 0) {
      deleteFile.map((file) => {
        axios
          .delete("/imgupload", { data: { file: file } })
          .then((succ) => {
            toastControl("success", "Амжилттай файл устгагдлаа");
          })
          .catch((error) =>
            toastControl("error", "Файл устгах явцад алдаа гарлаа")
          );
      });
    }

    const sendData = convertFromdata(data);
    props.updateMember(props.match.params.id, sendData);
  };

  const handleRemove = (stType, file) => {
    let index;

    setAvatar({});
    setDeleteFile((bf) => [...bf, file.name]);
  };

  const onCheck = (checkedKeysValue) => {
    // console.log(checkedKeysValue);
    setCheckedKeys(checkedKeysValue);
  };

  const onSelect = (selectedKeysValue, info) => {
    // console.log("onSelect", info);
    setSelectedKeys(selectedKeysValue);
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
      setTimeout(() => props.history.replace("/members"), 2000);
    }
  }, [props.success]);

  useEffect(() => {
    if (props.member) {
      if (props.member.partner) props.member.partner = props.member.partner._id;
      form.setFieldsValue({ ...props.member });
      if (props.member.category && props.member.category.length > 0)
        setCheckedKeys(props.member.category.map((el) => el._id));
      setStatus(props.member.status);

      setMemberShip(props.member.memberShip);
      props.member.experience &&
        setExperience(JSON.parse(props.member.experience));
      props.member.links && setLinks(JSON.parse(props.member.links));
      if (props.member.picture) {
        const url = base.cdnUrl + props.member.picture;
        const img = {
          name: props.member.picture,
          url,
        };
        setAvatar(img);
      }
    }
  }, [props.member]);

  useEffect(() => {
    if (props.partners) {
      let data = [];
      data = props.partners.map((el) => ({
        value: el._id,
        label: el.name,
      }));
      setPartners(data);
    }
  }, [props.partners]);

  return (
    <>
      <div className="content-wrapper">
        <PageTitle name="Хамт олон" />
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
                              tooltip="Хэрэглэгч зөвхөн өөрийн мэдээллийг засах боломжтой компани админ давхар гишүүдийн мэдээллүүдийг удирдана."
                            >
                              <Select showSearch placeholder="Эрх сонгоно уу">
                                <Option value="member">Хэрэглэгч</Option>
                                <Option value="partner">Компани админ</Option>
                              </Select>
                            </Form.Item>
                          </div>

                          <div className="col-6">
                            <Form.Item
                              label="Бүтэн нэр"
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
                              name="name"
                              hasFeedback
                            >
                              <Input placeholder="Нэр оруулна уу" />
                            </Form.Item>
                          </div>

                          <div className="col-6">
                            <Form.Item
                              name="position"
                              label="Цол гуншин"
                              hasFeedback
                            >
                              <Input placeholder="АЦол гуншин оруулна уу" />
                            </Form.Item>
                          </div>
                          <div className="col-12">
                            <Form.Item
                              name="partner"
                              label="Байгууллага холбох"
                            >
                              <Select
                                showSearch
                                style={{ width: "100%" }}
                                placeholder="Байгууллага холбоно уу"
                                options={partners}
                              ></Select>
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
                          <div className="col-12">
                            <Form.Item
                              label="Товч танилцуулга"
                              name="shortAbout"
                            >
                              <TextArea
                                placeholder="Товч танилцуулга"
                                autoSize={{
                                  minRows: 2,
                                  maxRows: 6,
                                }}
                              />
                            </Form.Item>
                          </div>
                          <div className="col-12">
                            <Form.Item
                              label="Дэлгэрэнгүй танилцуулга"
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
                                          const url =
                                            base.cdnUrl + res.data.data;
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
                          <div className="col-6">
                            <Form.Item name="long" label="Уртраг" hasFeedback>
                              <Input placeholder="Уртраг оруулна уу" />
                            </Form.Item>
                          </div>
                          <div className="col-6">
                            <Form.Item name="lat" label="Өргөрөг" hasFeedback>
                              <Input placeholder="Өргөрөг оруулна уу" />
                            </Form.Item>
                          </div>
                          <div className="col-12">
                            <Form.Item label="Туршилга ">
                              <div className="head-link">
                                <Button type="primary" onClick={handleModal}>
                                  Туршилга нэмэх
                                </Button>
                              </div>
                            </Form.Item>
                            <div className="links-list">
                              {experience.map((el, index) => (
                                <div
                                  className="link-item"
                                  key={index + "_" + el.companyName}
                                >
                                  {el.companyName} - {el.position}
                                  <div
                                    className="link-delete"
                                    onClick={() => deleteExp(index)}
                                  >
                                    <i className="fa fa-trash" />
                                  </div>
                                </div>
                              ))}
                            </div>
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
                        <div className="col-6">
                          <Form.Item label="ЭКСПЕРТ" name="memberShip">
                            <Switch
                              size="medium"
                              onChange={(value) => setMemberShip(value)}
                              checked={memberShip}
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
      <Modal
        title="Туршилга нэмэх"
        open={isModal}
        onCancel={handleModalClose}
        footer={[
          <Button key="back" onClick={handleModalClose}>
            {" "}
            Болих{" "}
          </Button>,
          <Button key="submit" type="primary" onClick={handleSave}>
            {" "}
            Нэмэх{" "}
          </Button>,
        ]}
      >
        <div className="input-box">
          <label>Байгууллагын нэр</label>
          <input
            type="text"
            placeholder="Байгууллагын нэр оруулна уу"
            value={experienceInput.companyName}
            onChange={(e) =>
              setExperienceInput((bi) => ({
                ...bi,
                companyName: e.target.value,
              }))
            }
          />
        </div>
        <div className="input-box">
          <label>Албан тушаал</label>
          <input
            type="text"
            placeholder="Албан тушаалаа оруулна уу"
            value={experienceInput.position}
            onChange={(e) =>
              setExperienceInput((bi) => ({
                ...bi,
                position: e.target.value,
              }))
            }
          />
        </div>
        <div className="input-box">
          <label>Байгууллагын товч танилцуулга</label>
          <textarea
            type="text"
            placeholder="Байгууллагын товч танилцуулга оруулна уу"
            value={experienceInput.about}
            onChange={(e) =>
              setExperienceInput((bi) => ({
                ...bi,
                about: e.target.value,
              }))
            }
          />
        </div>
        <div className="input-box">
          <label>Ажилласан огноо</label>
          <input
            type="text"
            placeholder="2020 - 2023 он хүртэл... ажиллаж байгаа гэх мэт"
            value={experienceInput.date}
            onChange={(e) =>
              setExperienceInput((bi) => ({
                ...bi,
                date: e.target.value,
              }))
            }
          />
        </div>
      </Modal>
      <Modal
        title="Холбоос нэмэх"
        open={isModalOpen}
        onCancel={handleCancel}
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
    success: state.memberReducer.success,
    error: state.memberReducer.error,
    loading: state.memberReducer.loading,
    member: state.memberReducer.member,
    partners: state.partnerReducer.partners,
    menus: state.memberCategoryReducer.menus,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    tinymceAddPhoto: (file) => dispatch(tinymceAddPhoto(file)),
    getMember: (id) => dispatch(actions.getMember(id)),
    updateMember: (id, data) => dispatch(actions.updateMember(id, data)),
    loadPartner: (query) => dispatch(loadPartner(query)),
    loadMenus: () => dispatch(loadMenus()),
    clear: () => dispatch(actions.clear()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Add);

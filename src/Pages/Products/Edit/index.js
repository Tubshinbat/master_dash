import React, { useEffect, useState } from "react";
import { Form, Input, Button, Switch, Tree, Upload, message } from "antd";
import { connect } from "react-redux";
import { Editor } from "@tinymce/tinymce-react";

//Components
import PageTitle from "../../../Components/PageTitle";
import { InboxOutlined } from "@ant-design/icons";
import Loader from "../../../Components/Generals/Loader";

//Actions
import * as actions from "../../../redux/actions/productActions";
import { loadMenus } from "../../../redux/actions/memberCategoryActions";

// Lib
import base from "../../../base";
import axios from "../../../axios-base";
import { toastControl } from "src/lib/toasControl";
import { menuGenerateData } from "../../../lib/menuGenerate";
import { convertFromdata } from "../../../lib/handleFunction";

const requiredRule = {
  required: true,
  message: "Тус талбарыг заавал бөглөнө үү",
};

const { Dragger } = Upload;

const Edit = (props) => {
  const [form] = Form.useForm();
  const [pictures, setPictures] = useState([]);
  const [setProgress] = useState(0);
  const [deleteFiles, setDeleteFiles] = useState([]);

  const [loading, setLoading] = useState({
    visible: false,
    message: "",
  });
  const [expandedKeys, setExpandedKeys] = useState([]);
  const [checkedKeys, setCheckedKeys] = useState([]);
  const [selectedKeys, setSelectedKeys] = useState([]);
  const [autoExpandParent, setAutoExpandParent] = useState(true);
  const [gData, setGData] = useState([]);

  const [checkedRadio, setCheckedRadio] = useState({
    status: true,
    star: false,
    isDiscount: false,
    isNew: false,
  });

  // FUNCTIONS
  const init = () => {
    props.getProduct(props.match.params.id);
    props.loadMenus();
  };

  const clear = () => {
    props.clear();
    form.resetFields();

    setGData([]);
    setExpandedKeys([]);
    setSelectedKeys([]);
    setCheckedKeys([]);
    setPictures([]);
    setLoading(false);
  };

  const handleChange = (event) => {
    form.setFieldsValue({ details: event });
  };

  const handleEdit = (values, status = null) => {
    if (pictures.length > 0) {
      values.pictures = pictures.map((el) => el.name);
    } else {
      values.pictures = [];
    }

    if (deleteFiles && deleteFiles.length > 0) {
      deleteFiles.map(async (deleteFile) => {
        await axios.delete("/imgupload", { data: { file: deleteFile } });
      });
    }

    const data = {
      ...values,
      star: values.star || false,
      isDiscount: values.isDiscount || false,
      isNew: values.isNew || false,
      productCategories: [...checkedKeys],
    };

    if (data.productCategories.length === 0) {
      data.productCategories = "";
    }

    if (status === "draft") data.status = false;
    const sendData = convertFromdata(data);
    props.updateProduct(props.match.params.id, sendData);
  };

  const handleRemove = (stType, file) => {
    let index = pictures.indexOf(file);
    let deleteFile = pictures[index].name;
    let list = pictures.slice();
    list.splice(index, 1);
    setPictures(list);

    setDeleteFiles((bf) => [...bf, deleteFile]);
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

  const handleRadio = (value, type) => {
    setCheckedRadio((bc) => ({ ...bc, [type]: value }));
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
      setPictures((bfPicture) => [...bfPicture, img]);
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
    onRemove: (file) => handleRemove("pictures", file),
    fileList: [...pictures],
    customRequest: uploadImage,
    accept: "image/*",
    name: "picture",
    multiple: true,
    listType: "picture",
  };

  // USEEFFECT
  useEffect(() => {
    const fetchData = async () => {};

    fetchData().catch((err) => console.log(err));
    init();

    return () => clear();
  }, []);

  useEffect(() => {
    if (props.product) {
      form.setFieldsValue({ ...props.product });

      setCheckedRadio({
        status: props.product.status,
        star: props.product.star,
        isDiscount: props.product.isDiscount,
        isNew: props.product.isNew,
      });

      if (
        props.product.productCategories &&
        props.product.productCategories.length > 0
      ) {
        setCheckedKeys(() => {
          return props.product.productCategories.map((cat) => cat._id);
        });
      }

      props.product.pictures &&
        props.product.pictures.length > 0 &&
        setPictures(
          props.product.pictures.map((img) => ({
            name: img,
            url: `${base.cdnUrl}${img}`,
          }))
        );
    }
  }, [props.product]);

  // Ямар нэгэн алдаа эсвэл амжилттай үйлдэл хийгдвэл энд useEffect барьж аваад TOAST харуулна
  useEffect(() => {
    toastControl("error", props.error);
  }, [props.error]);

  useEffect(() => {
    if (props.success) {
      toastControl("success", props.success);
      setTimeout(() => props.history.replace("/product"), 2000);
    }
  }, [props.success]);

  useEffect(() => {
    const data = menuGenerateData(props.categories);
    setGData(data);
  }, [props.categories]);

  return (
    <>
      <div className="content-wrapper">
        <PageTitle name="Бүтээгдэхүүн шинэчлэх" />
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
                            label="Бүтээгдэхүүний нэр"
                            name="name"
                            rules={[requiredRule]}
                            hasFeedback
                          >
                            <Input placeholder="Бүтээгдэхүүний нэр оруулна уу" />
                          </Form.Item>
                        </div>

                        <div className="col-12">
                          <Form.Item
                            label="Үнэ"
                            name="price"
                            rules={[requiredRule]}
                            hasFeedback
                          >
                            <Input placeholder="Нэг ширхэгийн үнийг оруулна уу" />
                          </Form.Item>
                        </div>
                        {checkedRadio.isDiscount == true && (
                          <div className="col-12">
                            <Form.Item
                              label="Хөнгөлөлтэй үнэ"
                              name="discount"
                              rules={[requiredRule]}
                              hasFeedback
                            >
                              <Input placeholder="Хөнгөлөлтэй үнэ оруулна уу" />
                            </Form.Item>
                          </div>
                        )}

                        <div className="col-12">
                          <Form.Item
                            label="Дэлгэрэнгүй"
                            name="details"
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
                                  "advlist autolink lists link image  tinydrive charmap print preview anchor",
                                  "searchreplace visualblocks code fullscreen",
                                  "insertdatetime media table paste code help wordcount image media  code  table  ",
                                ],
                                toolbar:
                                  "mybutton image | undo redo | fontselect fontsizeselect formatselect blockquote  | bold italic backcolor | \
                        alignleft aligncenter alignright alignjustify | \
                        bullist numlist outdent indent | removeformat | help | link  | quickbars | media | code | tableprops tabledelete | tableinsertrowbefore tableinsertrowafter tabledeleterow | tableinsertcolbefore tableinsertcolafter tabledeletecol",
                                tinydrive_token_provider: `${base.apiUrl}users/jwt`,
                                file_picker_types: "image",
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
                        <div className="col-12">
                          <Form.Item label="Зарсан эсэх" name="status">
                            <Switch
                              size="medium"
                              checkedChildren="Зарагдаагүй"
                              unCheckedChildren="Зарагдсан"
                              checked={checkedRadio.status}
                              onChange={(checked) =>
                                setCheckedRadio((bc) => ({
                                  ...bc,
                                  status: checked,
                                }))
                              }
                            />
                          </Form.Item>
                        </div>
                        <div className="col-12">
                          <Form.Item label="Онцлох" name="star">
                            <Switch
                              size="medium"
                              checked={checkedRadio.star}
                              onChange={(checked) =>
                                setCheckedRadio((bc) => ({
                                  ...bc,
                                  star: checked,
                                }))
                              }
                            />
                          </Form.Item>
                        </div>

                        <div className="col-12">
                          <Form.Item label="Хямдрал зарлах" name="isDiscount">
                            <Switch
                              size="medium"
                              checked={checkedRadio.isDiscount}
                              onChange={(checked) =>
                                setCheckedRadio((bc) => ({
                                  ...bc,
                                  isDiscount: checked,
                                }))
                              }
                            />
                          </Form.Item>
                        </div>
                        <div className="col-12">
                          <Form.Item label="Шинэ хуучин эсэх" name="isNew">
                            <Switch
                              checkedChildren="Шинэ"
                              unCheckedChildren="Хуучин"
                              size="medium"
                              checked={checkedRadio.isNew}
                              onChange={(checked) =>
                                setCheckedRadio((bc) => ({
                                  ...bc,
                                  isNew: checked,
                                }))
                              }
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
                                handleEdit(values);
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
                                handleEdit(values, "draft");
                              })
                              .catch((info) => {
                                // console.log(info);
                              });
                          }}
                        >
                          Зарагдсан
                        </Button>
                        <Button onClick={() => props.history.goBack()}>
                          Буцах
                        </Button>
                      </div>
                    </div>
                  </div>
                  <div className="card">
                    <div class="card-header">
                      <h3 class="card-title">АНГИЛАЛ</h3>
                    </div>
                    <div className="card-body">
                      <Form.Item name="categories">
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
                      <h3 class="card-title">Зураг оруулах</h3>
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
    success: state.productReducer.success,
    error: state.productReducer.error,
    loading: state.productReducer.loading,
    product: state.productReducer.product,
    categories: state.memberCategoryReducer.menus,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateProduct: (id, data) => dispatch(actions.updateProduct(id, data)),
    loadMenus: () => dispatch(loadMenus()),
    getProduct: (id) => dispatch(actions.getProduct(id)),
    clear: () => dispatch(actions.clear()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Edit);

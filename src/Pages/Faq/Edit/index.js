import React, { useEffect, useState, useRef } from "react";
import {
  Form,
  Input,
  Button,
  Switch,
  Upload,
  Tag,
  Tooltip,
  Select,
  InputNumber,
} from "antd";
import { connect } from "react-redux";

//Components
import PageTitle from "../../../Components/PageTitle";
import Loader from "../../../Components/Generals/Loader";
import { PlusOutlined } from "@ant-design/icons";

//Actions
import { tinymceAddPhoto } from "../../../redux/actions/imageActions";
import * as actions from "../../../redux/actions/faqActions";

// Lib
import { toastControl } from "src/lib/toasControl";
import { convertFromdata } from "../../../lib/handleFunction";

const requiredRule = {
  required: true,
  message: "Тус талбарыг заавал бөглөнө үү",
};

const { Dragger } = Upload;

const Add = (props) => {
  const [form] = Form.useForm();
  const { TextArea } = Input;

  // Tags
  const [tags, setTags] = useState([]);
  const [checkedStatus, setCheckedStatus] = useState(true);
  const [inputVisible, setInputVisible] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [editInputIndex, setEditInputIndex] = useState(-1);
  const [editInputValue, setEditInputValue] = useState("");
  const inputRef = useRef(null);
  const editInputRef = useRef(null);

  const [loading, setLoading] = useState({
    visible: false,
    message: "",
  });

  // FUNCTIONS
  const init = () => {
    props.getFaq(props.match.params.id);
    setTags([]);
  };

  const clear = () => {
    props.clear();
    form.resetFields();
    setTags([]);
    setLoading(false);
  };

  // -- TREE FUNCTIONS

  const handleAdd = (values, status = null) => {
    if (!values.status) values.status = true;
    if (status == "draft") values.status = false;

    const data = {
      ...values,
    };
    if (tags.length > 0) data.tags = tags;

    const sendData = convertFromdata(data);
    props.updateFaq(props.match.params.id, sendData);
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
      setTimeout(() => props.history.replace("/faqs"), 2000);
    }
  }, [props.success]);

  useEffect(() => {
    if (inputVisible) {
      inputRef.current?.focus();
    }
  }, [inputVisible]);
  useEffect(() => {
    editInputRef.current?.focus();
  }, [inputValue]);
  const handleClose = (removedTag) => {
    const newTags = tags.filter((tag) => tag !== removedTag);

    setTags(newTags);
  };
  const showInput = () => {
    setInputVisible(true);
  };
  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };
  const handleInputConfirm = () => {
    if (inputValue && tags.indexOf(inputValue) === -1) {
      setTags([...tags, inputValue]);
    }
    setInputVisible(false);
    setInputValue("");
  };
  const handleEditInputChange = (e) => {
    setEditInputValue(e.target.value);
  };
  const handleEditInputConfirm = () => {
    const newTags = [...tags];
    newTags[editInputIndex] = editInputValue;
    setTags(newTags);
    setEditInputIndex(-1);
    setInputValue("");
  };

  useEffect(() => {
    if (props.faq) {
      form.setFieldsValue({ ...props.faq });
      if (props.faq && props.faq.tags) setTags(props.faq.tags);
      setCheckedStatus(props.faq.status);
    }
  }, [props.faq]);

  const types = [
    {
      value: "Санал",
      label: "Санал",
    },
    {
      value: "Хүсэлт",
      label: "Хүсэлт",
    },
    {
      value: "Талархал",
      label: "Талархал",
    },
    {
      value: "Гомдол",
      label: "Гомдол",
    },
  ];

  return (
    <>
      <div className="content-wrapper">
        <PageTitle name="Түгээмэл асуулт хариулт шинэчлэх" />
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
                            label="Асуулт"
                            name="question"
                            rules={[requiredRule]}
                          >
                            <TextArea rows={4} />
                          </Form.Item>
                        </div>
                        <div className="col-12">
                          <Form.Item
                            label="Хариулт"
                            name="answer"
                            rules={[requiredRule]}
                          >
                            <TextArea rows={4} />
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
                              onChange={(value) => setCheckedStatus(value)}
                              checked={checkedStatus}
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
    success: state.faqReducer.success,
    error: state.faqReducer.error,
    loading: state.faqReducer.loading,
    faq: state.faqReducer.faq,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    tinymceAddPhoto: (file) => dispatch(tinymceAddPhoto(file)),
    updateFaq: (id, data) => dispatch(actions.updateFaq(id, data)),
    getFaq: (id) => dispatch(actions.getFaq(id)),
    clear: () => dispatch(actions.clear()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Add);

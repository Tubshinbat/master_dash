import React, { useEffect, useState } from "react";
import {
  Form,
  Input,
  Button,
  Switch,
  Tree,
  Upload,
  message,
  Select,
} from "antd";
import { connect } from "react-redux";
import { Editor } from "@tinymce/tinymce-react";
//Components
import PageTitle from "../../../Components/PageTitle";
import { InboxOutlined } from "@ant-design/icons";
import Loader from "../../../Components/Generals/Loader";

//Actions
import { tinymceAddPhoto } from "../../../redux/actions/imageActions";
import { loadMenus } from "../../../redux/actions/menuActions";
import { loadFooterMenus } from "../../../redux/actions/footerMenuActions";
import { loadNewsCategories } from "../../../redux/actions/newsCategoryActions";
import * as actions from "../../../redux/actions/pageActions";

import { getExcelData as loadServices } from "../../../redux/actions/serviceActions";
import { getExcelData as loadPages } from "../../../redux/actions/pageActions";
import { getExcelData as loadPartners } from "../../../redux/actions/partnerActions";

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

const Add = (props) => {
  const [form] = Form.useForm();
  const [pictures, setPictures] = useState([]);

  const [checkedKeys, setCheckedKeys] = useState([]);
  const [checkedMenu, setCheckedMenu] = useState([]);
  const [checkedFooterMenu, setCheckedFooterMenu] = useState([]);

  const [gData, setGData] = useState([]);
  const [menuData, setMenuData] = useState([]);
  const [footerMenuData, setFooterMenuData] = useState([]);

  const [status, setStatus] = useState(true);
  const [newsActive, setNewsActive] = useState(false);
  const [listActive, setListActive] = useState(false);
  const [pageActive, setPageActive] = useState(false);
  const [modalActive, setModalActive] = useState(false);
  const [mainLink, setMainLink] = useState(false);
  const [pageParentActive, setPageParentActive] = useState(false);
  const [choiseData, setChoiseData] = useState();
  const [modal, setModal] = useState(null);
  const [pages, setPages] = useState();
  const [setProgress] = useState(0);
  const [loading, setLoading] = useState({
    visible: false,
    message: "",
  });

  // FUNCTIONS
  const init = () => {
    props.getPage(props.match.params.id);
    props.loadFooterMenus();
    props.loadMenus();
    props.loadServices();
    props.loadPages();
    props.loadPartners();
    props.loadNewsCategories();
  };

  const clear = () => {
    props.clear();
    form.resetFields();
    setPictures([]);
    setCheckedKeys([]);
    setCheckedFooterMenu([]);
    setCheckedMenu([]);
    setGData([]);
    setMenuData([]);
    setFooterMenuData([]);
    setLoading(false);
  };

  // -- TREE FUNCTIONS

  const onCheck = (checkedKeysValue) => {
    setCheckedKeys(checkedKeysValue);
  };

  const onCheckMenu = (values) => {
    setCheckedMenu(values);
  };

  const onCheckFooterMenu = (values) => {
    setCheckedFooterMenu(values);
  };

  const handleChange = (event) => {
    form.setFieldsValue({ pageInfo: event });
  };

  const handleAdd = (values, st = null) => {
    console.log(values);
    if (pictures && pictures.length > 0) {
      const imgs = pictures.map((el) => el.name);
      values.pictures = imgs;
    } else {
      values.pictures = "";
    }
    if (!values.status) values.status = true;
    values.status = status;
    if (st == "draft") values.status = false;

    if (checkedKeys && checkedKeys.length > 0)
      values.categories = [...checkedKeys];
    if (checkedMenu && checkedMenu.length > 0) values.menu = [...checkedMenu];
    if (checkedFooterMenu && checkedFooterMenu.length > 0)
      values.footerMenu = [...checkedFooterMenu];
    values.pageActive = pageActive;
    values.listActive = listActive;
    values.newsActive = newsActive;
    values.choiseModal = modal;
    values.parent = pageParentActive;
    values.mainLink = mainLink;
    // console.log(values);

    const data = {
      ...values,
    };

    delete values.date;

    const sendData = convertFromdata(data);
    props.updatePage(props.match.params.id, sendData);
  };

  const handleRemove = (stType, file) => {
    let index;
    let deleteFile;
    let list;

    index = pictures.indexOf(file);
    deleteFile = pictures[index].name;
    list = pictures.slice();
    list.splice(index, 1);
    setPictures(list);

    axios
      .delete("/imgupload", { data: { file: deleteFile } })
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
      setPictures((bp) => [...bp, img]);
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
    init();
    return () => clear();
  }, []);

  useEffect(() => {
    const data = menuGenerateData(props.categories);
    setGData(data);
  }, [props.categories]);

  useEffect(() => {
    const data = menuGenerateData(props.menus);
    setMenuData(data);
  }, [props.menus]);

  useEffect(() => {
    const data = menuGenerateData(props.footerMenus);
    setFooterMenuData(data);
  }, [props.footerMenus]);

  // Ямар нэгэн алдаа эсвэл амжилттай үйлдэл хийгдвэл энд useEffect барьж аваад TOAST харуулна
  useEffect(() => {
    toastControl("error", props.error);
  }, [props.error]);

  useEffect(() => {
    if (props.success) {
      toastControl("success", props.success);
      setTimeout(() => props.history.replace("/pages"), 2000);
    }
  }, [props.success]);

  useEffect(() => {
    if (props.page) {
      console.log(props.page);
      form.setFieldsValue({
        ...props.page,
        page: props.page.page && props.page.page._id,
      });
      // console.log(props.page);
      setStatus(props.page.status);
      setNewsActive(props.page.newsActive);
      setListActive(props.page.listActive);
      setPageActive(props.page.pageActive);
      setModalActive(props.page.modalActive);
      setPageParentActive(props.page.pageParentActive);
      setMainLink(props.page.mainLink);
      setModal(props.page.choiseModal);

      form.setFieldValue({ modal: props.page.modal });

      if (props.page.footerMenu && props.page.footerMenu.length > 0)
        setCheckedFooterMenu(props.page.footerMenu.map((el) => el._id));
      if (props.page.menu && props.page.menu.length > 0)
        setCheckedMenu(props.page.menu.map((el) => el._id));
      if (props.page.categories && props.page.categories.length > 0)
        setCheckedKeys(props.page.categories.map((el) => el._id));
      if (props.page.pictures && props.page.pictures.length > 0) {
        setPictures(
          props.page.pictures.map((el) => ({
            name: el,
            url: `${base.cdnUrl}150x150/${el}`,
          }))
        );
      }
    }
  }, [props.page]);

  useEffect(() => {
    let data = [];
    switch (modal) {
      case "services": {
        data = props.services.map((service) => ({
          value: service._id,
          label: service.name,
        }));
        break;
      }

      case "partners": {
        data = props.partners.map((partner) => ({
          value: partner._id,
          label: partner.name,
        }));
        break;
      }
      default: {
        data = [];
        break;
      }
    }
    setChoiseData(data);
  }, [modal]);

  useEffect(() => {
    if (props.pages && props.pages.length > 0) {
      let data = [];
      data = props.pages.map((el) => ({
        value: el._id,
        label: el.name,
      }));
      setPages(data);
    }
  }, [props.pages]);

  return (
    <>
      <div className="content-wrapper">
        <PageTitle name="Сайтын хуудас засварлах" />
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
                            label="Хуудасны нэр"
                            name="name"
                            rules={[requiredRule]}
                          >
                            <Input placeholder="Сайтын хуудасны нэр оруулна уу" />
                          </Form.Item>
                        </div>
                        <div
                          className="col-12"
                          style={{
                            display:
                              pageParentActive == true ? "block" : "none",
                          }}
                        >
                          <Form.Item
                            label="Хуудастай холбох"
                            name="page"
                            rules={pageParentActive == true && [requiredRule]}
                          >
                            <Select
                              showSearch
                              style={{ width: "100%" }}
                              options={pages}
                            ></Select>
                          </Form.Item>
                        </div>

                        <div className="col-12">
                          <Form.Item
                            label="Модал"
                            name="choiseModal"
                            rules={modalActive == true && [requiredRule]}
                            style={{
                              display: modalActive == true ? "block" : "none",
                            }}
                          >
                            <Select
                              showSearch
                              style={{ width: "100%" }}
                              placeholder="Модал сонгох"
                              onChange={(value) => setModal(value)}
                              options={[
                                {
                                  value: "platforms",
                                  label: "Платформууд",
                                },
                                {
                                  value: "services",
                                  label: "Үйлчилгээнүүд",
                                },
                                {
                                  value: "costs",
                                  label: "Үнийн мэдээлэл",
                                },
                                {
                                  value: "partners",
                                  label: "Хамтрагч компани",
                                },
                                {
                                  value: "contact",
                                  label: "Холбоо барих",
                                },
                              ]}
                            />
                          </Form.Item>
                        </div>
                        <div className="col-12">
                          <Form.Item
                            label="Холбох модалын өгөгдлүүд"
                            name="modal"
                            rules={
                              modalActive &&
                              modalActive !== "contact" &&
                              modalActive !== "costs" && [requiredRule]
                            }
                            style={{
                              display:
                                modalActive &&
                                modalActive !== "contact" &&
                                modalActive !== "costs"
                                  ? "block"
                                  : "none",
                            }}
                          >
                            <Select
                              showSearch
                              style={{ width: "100%" }}
                              placeholder="Холбох модал өгөгдлүүд"
                              options={choiseData}
                            />
                          </Form.Item>
                        </div>
                        <div className="col-12">
                          <Form.Item
                            label="Дэлгэрэнгүй"
                            name="pageInfo"
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
                                  "advlist autolink lists link image charmap print preview anchor tinydrive",
                                  "searchreplace visualblocks code fullscreen",
                                  "insertdatetime media table paste code help wordcount image media  code  table  ",
                                ],
                                toolbar:
                                  "mybutton | addPdf | image | undo redo | fontselect fontsizeselect formatselect blockquote  | bold italic backcolor | \
                        alignleft aligncenter alignright alignjustify | \
                        bullist numlist outdent indent | removeformat | help | link image | quickbars | media | code | tableprops tabledelete | tableinsertrowbefore tableinsertrowafter tabledeleterow | tableinsertcolbefore tableinsertcolafter tabledeletecol",
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
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-4">
                      <div className="card">
                        <div class="card-header">
                          <h3 class="card-title">САЙТЫН ҮНДСЭН ЦЭС</h3>
                        </div>
                        <div className="card-body">
                          <Form.Item name="menu">
                            <Tree
                              checkable
                              onCheck={onCheckMenu}
                              checkedKeys={checkedMenu}
                              treeData={menuData}
                            />
                          </Form.Item>
                        </div>
                      </div>
                    </div>

                    <div className="col-4">
                      <div className="card">
                        <div class="card-header">
                          <h3 class="card-title"> ХӨЛНИЙ ЦЭС</h3>
                        </div>
                        <div className="card-body">
                          <Form.Item name="footermenu">
                            <Tree
                              checkable
                              onCheck={onCheckFooterMenu}
                              checkedKeys={checkedFooterMenu}
                              treeData={footerMenuData}
                            />
                          </Form.Item>
                        </div>
                      </div>
                    </div>

                    <div className="col-4">
                      <div className="card">
                        <div class="card-header">
                          <h3 class="card-title">МЭДЭЭНИЙ АНГИЛАЛ</h3>
                        </div>
                        <div
                          className="card-body"
                          style={{
                            display: newsActive == true ? "block" : "none",
                          }}
                        >
                          <Form.Item name="type">
                            <Tree
                              checkable
                              onCheck={onCheck}
                              checkedKeys={checkedKeys}
                              treeData={gData}
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
                          <Form.Item label="Идэвхтэй эсэх" name="status">
                            <Switch
                              checkedChildren="Идэвхтэй"
                              unCheckedChildren="Идэвхгүй"
                              size="medium"
                              checked={status}
                              onChange={(value) => setStatus(value)}
                            />
                          </Form.Item>
                        </div>

                        <div className="col-12">
                          <Form.Item
                            label="Модалтой холбох"
                            name="modalActive"
                            checked={modalActive}
                            tooltip="Платформ, Үйлчилгээ, үнийн мэдээлэл гэх мэт модалуудтай холбох боломжтой холбосоноор үүсгэсэн сайтын хуудас тэдгээр хэсэгт жагсаалт хэлбэртэй харагдана"
                          >
                            <Switch
                              checkedChildren="Холбосон"
                              unCheckedChildren="Холбоогүй"
                              size="medium"
                              checked={modalActive}
                              onChange={(value) => {
                                setModalActive(value);

                                form.setFieldValue("choiseModal", "");
                              }}
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
                                console.log(values);
                                handleAdd(values);
                              })
                              .catch((info) => {
                                console.log(info);
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
                      <h3 class="card-title">Мэдээний хэсэгтэй холбох</h3>
                    </div>
                    <div className="card-body">
                      <div className="col-12">
                        <Form.Item
                          label="Мэдээний ангилал холбох"
                          name="newsActive"
                          tooltip="Сонгосон мэдээний ангилалын хамгийн сүүлд орсон 3 мэдээ тухайн хуудас харагдана мөн бүх мэдээллийг харах гээд мэдээний ангилалруу үсрэх линк давхар харагдана "
                        >
                          <Switch
                            checkedChildren="Холбосон"
                            unCheckedChildren="Холбоогүй"
                            size="medium"
                            checked={newsActive}
                            onChange={(value) => setNewsActive(value)}
                          />
                        </Form.Item>
                      </div>
                    </div>
                  </div>
                  <div className="card">
                    <div class="card-header">
                      <h3 class="card-title">ЦЭСТЭЙ ХОЛБОХ</h3>
                    </div>
                    <div className="card-body">
                      <div className="col-12">
                        <Form.Item
                          label="Цэстэй холбоотой тохиргоог идэвхжүүлэх"
                          name="mainLink"
                          tooltip="Энэ тохиргоог идэвхжүүлвэл цэстэй холбоотой бүх тохиргоо тухайн цэс дээр ажиллана"
                        >
                          <Switch
                            checkedChildren="Идэвхтэй"
                            unCheckedChildren="Идэвхгүй"
                            size="medium"
                            checked={mainLink}
                            onChange={(value) => setMainLink(value)}
                          />
                        </Form.Item>
                      </div>
                      {mainLink === true && (
                        <>
                          <div className="col-12">
                            <Form.Item
                              label="Дэд цэсүүдийг жагсаалтаар байдалтай харуулах"
                              name="listActive"
                              tooltip="Таны сонгосон цэс үндсэн цэс бол түүнд хамааргаадах дэд цэсүүд жагсаалт хэлбэртэй харагдана"
                            >
                              <Switch
                                checkedChildren="Идэвхтэй"
                                unCheckedChildren="Идэвхгүй"
                                size="medium"
                                checked={listActive}
                                onChange={(value) => setListActive(value)}
                              />
                            </Form.Item>
                          </div>
                          <div className="col-12">
                            <Form.Item
                              label="Цэс дотор жагсааж хуудсыг цааш үсрэхээр харуулах"
                              name="pageActive"
                              tooltip="Цэс дотор тухайн хуудсыг цааш үсрэх боломжтойгоор харуулна"
                            >
                              <Switch
                                checkedChildren="Идэвхтэй"
                                unCheckedChildren="Идэвхгүй"
                                size="medium"
                                checked={pageActive}
                                onChange={(value) => setPageActive(value)}
                              />
                            </Form.Item>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                  <div className="card">
                    <div class="card-header">
                      <h3 class="card-title">ХУУДАС ХОЛБОХ</h3>
                    </div>
                    <div className="card-body">
                      <p>
                        {" "}
                        Хэрэв тухайн хуудсыг цэстэй холбох шаардлагагүй, зөвхөн
                        сонгосон хуудас дотроо цааш үсрэх боломжтой харуулах бол
                        энэ тохиргоог идэвхжүүлэнэ
                      </p>
                      <div className="col-12">
                        <Form.Item
                          label="Хуудас дотор дахиад хуудас үүсгэх"
                          name="pageParentActive"
                          tooltip="Урд нь үүсгэсэн хуудас дотор дахин дамжих хуудас үүсгэх боломжтой"
                        >
                          <Switch
                            checkedChildren="Холбосон"
                            unCheckedChildren="Холбоогүй"
                            size="medium"
                            checked={pageParentActive}
                            onChange={(value) => {
                              if (
                                pageActive == true &&
                                checkedMenu.length <= 0 &&
                                checkedFooterMenu.length <= 0
                              ) {
                                toastControl(
                                  "error",
                                  "Цэстэй холбогдсон бүх хуудсыг жагсаалт болгосон байна"
                                );
                              } else setPageParentActive(value);
                            }}
                          />
                        </Form.Item>
                      </div>
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
    categories: state.newsCategoryReducer.categories,
    menus: state.menuReducer.menus,
    footerMenus: state.footerMenuReducer.footerMenus,
    success: state.pageReducer.success,
    error: state.pageReducer.error,
    loading: state.pageReducer.loading,
    page: state.pageReducer.page,
    services: state.serviceReducer.excelData,
    partners: state.partnerReducer.excelData,
    pages: state.pageReducer.excelData,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    tinymceAddPhoto: (file) => dispatch(tinymceAddPhoto(file)),
    loadFooterMenus: () => dispatch(loadFooterMenus()),
    loadMenus: () => dispatch(loadMenus()),
    loadNewsCategories: () => dispatch(loadNewsCategories()),
    updatePage: (id, data) => dispatch(actions.updatePage(id, data)),
    loadServices: (query) => dispatch(loadServices(query)),
    loadPartners: (query) => dispatch(loadPartners(query)),
    loadPages: (query) => dispatch(loadPages(query)),
    getPage: (id) => dispatch(actions.getPage(id)),
    clear: () => dispatch(actions.clear()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Add);

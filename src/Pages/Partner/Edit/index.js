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
import { InboxOutlined } from "@ant-design/icons";
import { Editor } from "@tinymce/tinymce-react";
import axios from "../../../axios-base";
import base from "../../../base";
import { toastControl } from "src/lib/toasControl";
import { menuGenerateData } from "src/lib/menuGenerate";
import PageTitle from "../../../Components/PageTitle";

const { Dragger } = Upload;
const requiredRule = {
  required: true,
  message: "Тус талбарыг заавал бөглөнө үү",
};

export default function PartnerEdit(props) {
  const id = props.match.params.id;
  const [form] = Form.useForm();
  const [logo, setLogo] = useState(null);
  const [cover, setCover] = useState(null);
  const [linkInput, setLinkInput] = useState({ name: "", url: "" });
  const [links, setLinks] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checkedKeys, setCheckedKeys] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchData();
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    const res = await axios.get("/member-categories");
    setCategories(menuGenerateData(res.data.data));
  };

  const fetchData = async () => {
    try {
      const res = await axios.get(`/partners/${id}`);
      const partner = res.data.data;

      form.setFieldsValue({
        name: partner.name,
        email: partner.email,
        phoneNumber: partner.phoneNumber,
        about: partner.about,
        long: partner?.location?.coordinates[0] || "",
        lat: partner?.location?.coordinates[1] || "",
        status: partner.status,
      });

      setLinks(partner.links || []);
      setCheckedKeys(partner.category?.map((el) => el._id));
      setLogo(
        partner.logo
          ? { name: partner.logo, url: `${base.cdnUrl}${partner.logo}` }
          : null
      );
      setCover(
        partner.cover
          ? { name: partner.cover, url: `${base.cdnUrl}${partner.cover}` }
          : null
      );
    } catch (err) {
      toastControl("error", err);
    }
  };

  const uploadImage = async (options, type) => {
    const { onSuccess, onError, file } = options;
    const fmData = new FormData();
    fmData.append("file", file);
    try {
      const res = await axios.post("/imgupload", fmData);
      const img = {
        name: res.data.data,
        url: `${base.cdnUrl}${res.data.data}`,
      };
      if (type === "logo") setLogo(img);
      if (type === "cover") setCover(img);
      onSuccess("Ok");
      message.success(`${res.data.data} хуулагдлаа`);
    } catch (err) {
      toastControl("error", err);
      onError(err);
    }
  };

  const handleSubmit = async (values) => {
    const data = {
      ...values,
      logo: logo?.name,
      cover: cover?.name,
      links: links,
      category: checkedKeys,
      location:
        values.long && values.lat
          ? {
              type: "Point",
              coordinates: [parseFloat(values.long), parseFloat(values.lat)],
            }
          : undefined,
    };

    delete data.long;
    delete data.lat;

    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      if (value === undefined || value === null || value === "") return;
      if (Array.isArray(value) || typeof value === "object") {
        formData.append(key, JSON.stringify(value));
      } else {
        formData.append(key, value);
      }
    });

    try {
      setLoading(true);
      await axios.put(`/partners/${id}`, formData);
      toastControl("success", "Амжилттай шинэчлэгдлээ");
    } catch (err) {
      toastControl("error", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="content-wrapper">
        <PageTitle name="Хамтрагч засах" />
        <div className="container-fluid">
          <Form layout="vertical" form={form}>
            <div className="row">
              <div className="col-md-8">
                <div className="card card-primary">
                  <div className="card-body">
                    <Form.Item
                      label="Компаний нэр"
                      name="name"
                      rules={[requiredRule]}
                    >
                      <Input placeholder="Компаний нэр" />
                    </Form.Item>

                    <Form.Item
                      label="Имэйл"
                      name="email"
                      rules={[{ type: "email" }]}
                    >
                      <Input placeholder="Имэйл" />
                    </Form.Item>

                    <Form.Item
                      label="Утас"
                      name="phoneNumber"
                      rules={[requiredRule]}
                    >
                      <Input placeholder="Утасны дугаар" />
                    </Form.Item>

                    <Form.Item
                      label="Дэлгэрэнгүй"
                      name="about"
                      getValueFromEvent={(e) => e?.target?.getContent()}
                      rules={[requiredRule]}
                    >
                      <Editor
                        apiKey="p3ooelc5v0jqfzosggvh1ug9vc9yqyipicx8qd90s45tqsho"
                        init={{ height: 300, menubar: false }}
                      />
                    </Form.Item>

                    <div className="row">
                      <div className="col-6">
                        <Form.Item label="Уртраг" name="long">
                          <Input />
                        </Form.Item>
                      </div>
                      <div className="col-6">
                        <Form.Item label="Өргөрөг" name="lat">
                          <Input />
                        </Form.Item>
                      </div>
                    </div>

                    <Form.Item label="Холбоос линкүүд">
                      <Button onClick={() => setIsModalOpen(true)}>
                        Линк нэмэх
                      </Button>
                      <div>
                        {links.map((link, idx) => (
                          <div key={idx}>
                            {link.name} - {link.url}
                            <Button
                              danger
                              size="small"
                              onClick={() =>
                                setLinks(links.filter((_, i) => i !== idx))
                              }
                            >
                              Устгах
                            </Button>
                          </div>
                        ))}
                      </div>
                    </Form.Item>
                  </div>
                </div>
              </div>

              <div className="col-md-4">
                <div className="card card-primary">
                  <div className="card-body">
                    <Form.Item
                      label="Статус"
                      name="status"
                      valuePropName="checked"
                    >
                      <Switch defaultChecked />
                    </Form.Item>

                    <Form.Item label="Ангилал">
                      <Tree
                        checkable
                        checkedKeys={checkedKeys}
                        onCheck={setCheckedKeys}
                        treeData={categories}
                      />
                    </Form.Item>

                    <Dragger
                      {...{
                        onRemove: () => setLogo(null),
                        fileList: logo ? [logo] : [],
                        customRequest: (options) =>
                          uploadImage(options, "logo"),
                        accept: "image/*",
                        listType: "picture",
                        maxCount: 1,
                      }}
                    >
                      <p>Лого оруулах</p>
                    </Dragger>

                    <Dragger
                      {...{
                        onRemove: () => setCover(null),
                        fileList: cover ? [cover] : [],
                        customRequest: (options) =>
                          uploadImage(options, "cover"),
                        accept: "image/*",
                        listType: "picture",
                        maxCount: 1,
                      }}
                    >
                      <p>Cover оруулах</p>
                    </Dragger>
                  </div>

                  <div className="card-footer">
                    <Button
                      type="primary"
                      loading={loading}
                      onClick={() => form.validateFields().then(handleSubmit)}
                    >
                      Хадгалах
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </Form>
        </div>

        <Modal
          title="Линк нэмэх"
          open={isModalOpen}
          onCancel={() => setIsModalOpen(false)}
          onOk={() => {
            if (linkInput.name && linkInput.url) {
              setLinks([...links, linkInput]);
              setLinkInput({ name: "", url: "" });
              setIsModalOpen(false);
            } else toastControl("error", "Бүх талбарыг бөглөнө үү");
          }}
        >
          <Input
            placeholder="Сайтын нэр"
            value={linkInput.name}
            onChange={(e) =>
              setLinkInput((p) => ({ ...p, name: e.target.value }))
            }
          />
          <Input
            placeholder="Линк"
            value={linkInput.url}
            onChange={(e) =>
              setLinkInput((p) => ({ ...p, url: e.target.value }))
            }
          />
        </Modal>
      </div>
    </>
  );
}

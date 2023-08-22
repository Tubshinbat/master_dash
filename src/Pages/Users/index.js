import React, { useEffect, useState, useRef } from "react";
import { useHistory } from "react-router-dom";
import { Button, Modal, Input, Table, Tag, Space, Tooltip, Form } from "antd";
import { connect } from "react-redux";
import Highlighter from "react-highlight-words";
import moment from "moment";
import * as XLSX from "xlsx";
import { SearchOutlined } from "@ant-design/icons";

//Lib
import base from "../../base";

//Components
import PageTitle from "../../Components/PageTitle";
import axios from "../../axios-base";
import { toastControl } from "../../lib/toasControl";
import Loader from "../../Components/Generals/Loader";

// Actions
import * as actions from "../../redux/actions/userActions";

const Users = (props) => {
  const searchInput = useRef(null);
  const [form] = Form.useForm();

  //STATES
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [selectedKey, setSelectedKey] = useState(null);
  const [loading, setLoading] = useState({
    visible: false,
    message: "",
  });
  const [data, setData] = useState([]);

  // -- FILTER STATE
  const [querys, setQuerys] = useState({});
  const [filterdColumns, setFilterdColumns] = useState([]);
  // -- TABLE STATE
  const [tableParams, setTableParams] = useState({
    pagination: {
      current: 1,
    },
  });

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }) => (
      <div
        style={{
          padding: 8,
        }}
      >
        <Input
          ref={searchInput}
          placeholder={`Хайлт хийх`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: "block",
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Хайх
          </Button>
          <Button
            onClick={() => handleReset(clearFilters, selectedKeys, dataIndex)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Шинэчлэх
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? "#1890ff" : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{
            backgroundColor: "#ffc069",
            padding: 0,
          }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });

  const [columns, setColumns] = useState([
    {
      dataIndex: "status",
      key: "status",
      title: "Төлөв",
      status: true,
      filterMode: "tree",
      filters: [
        {
          text: "Идэвхтэй",
          value: "true",
        },
        {
          text: "Эрх хаасан",
          value: "false",
        },
      ],
      sorter: (a, b) => handleSort(),
    },

    {
      dataIndex: "role",
      key: "role",
      title: "Эрх",
      status: true,
      filterMode: "tree",
      filters: [
        {
          text: "Админ",
          value: "admin",
        },
        {
          text: "Ажилтан",
          value: "operator",
        },
        {
          text: "Хэрэглэгч",
          value: "user",
        },
      ],
      sorter: (a, b) => handleSort(),
    },

    {
      dataIndex: "lastName",
      key: "lastName",
      title: "Овог",
      status: true,
      ...getColumnSearchProps("lastName"),
      sorter: (a, b) => handleSort(),
    },

    {
      dataIndex: "firstName",
      key: "firstName",
      title: "Нэр",
      status: true,
      ...getColumnSearchProps("firstName"),
      sorter: (a, b) => handleSort(),
    },

    {
      dataIndex: "email",
      key: "email",
      title: "Имэйл",
      status: false,
      ...getColumnSearchProps("email"),
      sorter: (a, b) => handleSort(),
    },

    {
      dataIndex: "phoneNumber",
      key: "phoneNumber",
      title: "Утасны дугаар",
      status: true,
      ...getColumnSearchProps("phoneNumber"),
      sorter: (a, b) => handleSort(),
    },

    {
      dataIndex: "image",
      key: "image",
      title: "Зураг",
      status: true,
      render: (text, record) => {
        return (
          <div className="table-image">
            {record.image ? (
              <img src={`${base.cdnUrl}150x150/${record.image}`} />
            ) : (
              "Зураг оруулаагүй байна"
            )}
          </div>
        );
      },
    },
    {
      dataIndex: "gender",
      key: "gender",
      title: "Хүйс",
      status: true,
      filterMode: "tree",
      filters: [
        {
          text: "Эрэгтэй",
          value: "male",
        },
        {
          text: "Эмэгтэй",
          value: "female",
        },
      ],
      sorter: (a, b) => handleSort(),
    },
    {
      key: "keyPassword",
      title: "Нууц үг өөрчлөх",
      status: true,
      render: (text, record) => {
        return (
          <button
            className="changePasswordBtn"
            onClick={() => changePasswrodModal(record.key)}
          >
            Нууц үг солих
          </button>
        );
      },
    },
    {
      dataIndex: "age",
      key: "age",
      title: "Нас",
      status: false,
      ...getColumnSearchProps("age"),
      sorter: (a, b) => handleSort(),
    },
    {
      dataIndex: "entryDate",
      key: "entryDate",
      title: "Сүүлд нэвтэрсэн",
      status: false,
      ...getColumnSearchProps("entryDate"),
      sorter: (a, b) => handleSort(),
    },
    {
      dataIndex: "createUser",
      key: "createUser",
      title: "Бүртгэсэн",
      status: true,
      ...getColumnSearchProps("createUser"),
      sorter: (a, b) => handleSort(),
    },
    {
      dataIndex: "updateUser",
      key: "updateUser",
      title: "Өөрчлөлт хийсэн",
      status: false,
      ...getColumnSearchProps("updateUser"),
      sorter: (a, b) => handleSort(),
    },
    {
      dataIndex: "createAt",
      key: "createAt",
      title: "Үүсгэсэн огноо",
      status: true,
      sorter: (a, b) => handleSort(),
    },
    {
      dataIndex: "updateAt",
      key: "updateAt",
      title: "Өөрчлөлт хийсэн огноо",
      status: false,
      sorter: (a, b) => handleSort(),
    },
  ]);

  const [cloneColumns, setCloneColumns] = useState(columns);

  const handleEdit = () => {
    if (selectedRowKeys.length != 1) {
      toastControl("error", "Нэг өгөгдөл сонгоно уу");
    } else {
      history.push(`/users/edit/${selectedRowKeys[0]}`);
    }
  };

  const handleDelete = () => {
    props.deleteMultUsers(selectedRowKeys);
  };

  const handleChangePassowrd = (values) => {
    props.resetPasswordControl(selectedKey, values);
  };

  // -- MODAL STATE
  const [visible, setVisible] = useState({
    delete: false,
    column: false,
    password: false,
  });

  // -- TOAST CONTROL SUCCESS AND ERROR
  useEffect(() => {
    if (props.error) {
      toastControl("error", props.error);
      props.clear();
    }
  }, [props.error]);

  useEffect(() => {
    if (props.success !== null) {
      toastControl("success", props.success);
      handleCancel();
      props.clear();
      setSelectedRowKeys([]);
      init();
    }
  }, [props.success]);

  // QUERY CHANGES AND FEATCH DATA
  useEffect(() => {
    if (querys) {
      const query = queryBuild();
      props.getUsers(query);
    }
  }, [querys]);

  // -- SEARCH FILTER AND COLUMNS
  useEffect(() => {
    setFilterdColumns(columns.filter((col) => col.status === true));
  }, [columns]);

  useEffect(() => {
    const select = [];
    select.push(filterdColumns.map((col) => col.dataIndex));
    setQuerys((bquery) => ({ ...bquery, select: select }));
  }, [filterdColumns]);

  // -- LOADING
  useEffect(() => {
    setLoading({ visible: props.loading, message: "Түр хүлээнэ үү" });
  }, [props.loading]);

  // -- SERVICES GET DONE EFFECT
  useEffect(() => {
    if (props.users) {
      const refData = [];

      props.users.length > 0 &&
        props.users.map((el) => {
          const key = el._id;
          delete el._id;
          el.role =
            el.role === "admin"
              ? "Админ"
              : el.role === "operator"
              ? "Ажилтан"
              : "Хэрэглэгч";

          el.gender = el.gender === "male" ? "Эрэгтэй" : "Эмэгтэй";
          el.status = el.status == true ? "Идэвхтэй" : "Эрх хаасан";
          el.createUser = el.createUser && el.createUser.firstName;
          el.updateUser = el.updateUser && el.updateUser.firstName;
          el.createAt = moment(el.createAt)
            .utcOffset("+0800")
            .format("YYYY-MM-DD HH:mm:ss");
          el.updateAt = moment(el.updateAt)
            .utcOffset("+0800")
            .format("YYYY-MM-DD HH:mm:ss");

          refData.push({
            dataIndex: key,
            key,
            ...el,
          });
        });
      // console.log(refData);
      setData(refData);
    }
  }, [props.users]);

  // Start moment
  useEffect(() => {
    init();
    return () => {
      clear();
    };
  }, []);
  useEffect(() => {
    const total = props.pagination.total;
    const pageSize = props.pagination.limit;
    setTableParams((tbf) => ({
      ...tbf,
      pagination: { ...tbf.pagination, total, pageSize },
    }));
  }, [props.pagination]);
  // -- INIT
  const init = () => {
    const query = queryBuild();
    props.getUsers(`${query}`);
  };

  const clear = () => {
    setSelectedKey(null);
    form.resetFields();
  };

  // -- HANDLE FUNCTIONS

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
    setQuerys((bquerys) => ({ ...bquerys, [dataIndex]: selectedKeys[0] }));
  };

  const handleReset = (clearFilters, selectedKeys, dataIndex) => {
    clearFilters();
    setQuerys((bquery) => ({ ...bquery, [dataIndex]: "" }));
    setSearchText("");
  };

  const handleSort = () => {};

  // -- TABLE SELECTED AND CHANGE

  const handleColumn = (e) => {
    const newArr = [...cloneColumns];
    const checkElmt = newArr.findIndex((col) => col.key == e.target.name);
    const toggle = newArr[checkElmt].status === true ? false : true;
    newArr[checkElmt] = { ...newArr[checkElmt], status: toggle };
    setCloneColumns(() => [...newArr]);
    const json_str = JSON.stringify(newArr);
  };

  const handleTableChange = (pagination, filters, sorter) => {
    setTableParams({
      pagination,
      filters,
      ...sorter,
    });

    if (pagination) {
      setQuerys((bq) => ({
        ...bq,
        page: pagination.current,
        limit: pagination.pageSize,
      }));
    }

    if (sorter) {
      const clkey = sorter.columnKey;
      setQuerys((bquery) => ({
        ...bquery,
        sort: `${clkey + ":" + sorter.order}`,
      }));
    } else {
      setQuerys((bquery) => {
        delete bquery.sort;
        return { ...bquery };
      });
    }

    if (filters) {
      // console.log("end");
      Object.keys(filters).map((key) => {
        let str = null;
        if (filters[key]) {
          str = filters[key].toString();
          setQuerys((bq) => ({ ...bq, [key]: str }));
        } else {
          setQuerys((bq) => {
            delete bq[key];
            return { ...bq };
          });
        }
      });
      //
    }
  };

  // Repeat functions
  const queryBuild = () => {
    let query = "";
    Object.keys(querys).map((key) => {
      key !== "select" && (query += `${key}=${querys[key]}&`);
    });
    // query += `select=${
    //   querys && querys.select && querys.select[0].join(" ").replaceAll(",", " ")
    // }`;
    return query;
  };

  // -- MODAL SHOW AND CLOSE
  const showModal = (modal) => {
    switch (modal) {
      case "delete": {
        if (selectedRowKeys && selectedRowKeys.length > 0) {
          setVisible((sb) => ({ ...sb, [modal]: true }));
        } else {
          toastControl("error", "Өгөгдөл сонгоно уу");
        }
        break;
      }
      case "edit": {
        if (selectedRowKeys && selectedRowKeys.length === 1) {
          props.history.replace("/users/edit/" + selectedRowKeys[0]);
        } else {
          toastControl("error", "Нэг өгөгдөл сонгоно уу");
        }
        break;
      }
      default: {
        setVisible((sb) => ({ ...sb, [modal]: true }));
        break;
      }
    }
  };

  const handleCancel = () => {
    clear();
    setVisible((sb) => Object.keys(sb).map((el) => (sb[el] = false)));
  };

  // -- ROW SELECT FUNCTIONS
  const onSelectChange = (newSelectedRowKeys) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };
  const hasSelected = selectedRowKeys.length > 0;

  // -- PLUS FUNCTION REFRESH, TO EXCEL, COLUMN
  const refreshTable = () => {
    props.clear();
    setQuerys((bqr) => ({ select: bqr["select"] }));
    setTableParams(() => ({
      ...{
        pagination: {
          current: 1,
        },
      },
    }));
    setSearchText(() => "");
    setSearchedColumn("");
    init();
  };

  // -- CONVER JSON  TO EXCEL
  const exportExcel = async () => {
    const query = queryBuild();
    const response = await axios.get("users/excel?" + query);
    let excelData = [];
    if (response) {
      const data = response.data.data;
      excelData = data.map((el) => {
        el.status = el.status && el.status == true ? "Идэвхтэй" : "Эрх хаасан";
        el.createUser = el.createUser && el.createUser.firstName;
        el.updateUser = el.updateUser && el.updateUser.firstName;
        el.createAt = moment(el.createAt)
          .utcOffset("+0800")
          .format("YYYY-MM-DD HH:mm:ss");
        el.updateAt = moment(el.updateAt)
          .utcOffset("+0800")
          .format("YYYY-MM-DD HH:mm:ss");
        return el;
      });
    }
    const head = [];
    cloneColumns.map((col) => {
      head.push(col.title);
    });
    const Header = [["id", ...head]];
    setLoading({
      visible: true,
      message: "Түр хүлээнэ үү excel файлруу хөрвүүлж байна",
    });
    if (excelData && excelData.length > 0) {
      const worksheet = XLSX.utils.json_to_sheet(excelData);
      const workbook = XLSX.utils.book_new();
      const date = new Date().toLocaleDateString();
      XLSX.utils.sheet_add_aoa(worksheet, Header);
      XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
      XLSX.writeFile(workbook, `${date}.xlsx`);
    }
    setLoading({
      visible: false,
      message: "",
    });
  };

  const history = useHistory();
  const changePasswrodModal = (value) => {
    setVisible((bv) => ({ ...bv, password: true }));
    setSelectedKey(value);
  };

  return (
    <>
      <div className="content-wrapper">
        <PageTitle name="Хэрэглэгчид" />

        <div className="content">
          <Loader show={loading.visible}> {loading.message}</Loader>
          <div className="container-fluid">
            <div className="card datatable-card">
              <div className="card-header">
                <h3 className="card-title">Бүх хэрэглэгч</h3>
              </div>
              <div className="card-body datatable-card-body">
                <div className="datatable-header-tools">
                  <div className="datatable-actions">
                    <button
                      className="datatable-action add-bg"
                      onClick={() => history.push(`/users/add`)}
                    >
                      <i className="fa fa-plus"></i> Нэмэх
                    </button>
                    <button
                      className="datatable-action edit-bg"
                      onClick={() => handleEdit()}
                    >
                      <i className="fa fa-edit"></i> Засах
                    </button>
                    <button
                      className="datatable-action delete-bg"
                      onClick={() => showModal("delete")}
                    >
                      <i className="fa fa-trash"></i> Устгах
                    </button>
                  </div>
                  <div className="datatable-tools">
                    <Tooltip placement="left" title="Шинэчлэх">
                      <button
                        className="datatable-tool"
                        onClick={() => refreshTable()}
                      >
                        <i className="fas fa-redo"></i>
                      </button>
                    </Tooltip>

                    <Tooltip placement="left" title="Баганын тохиргоо">
                      <button
                        className="datatable-tool"
                        onClick={() => showModal("column")}
                      >
                        <i className="fas fa-columns"></i>
                      </button>
                    </Tooltip>
                  </div>
                </div>
                <div className="tableBox">
                  <Table
                    rowSelection={rowSelection}
                    columns={filterdColumns}
                    dataSource={data}
                    onChange={handleTableChange}
                    pagination={tableParams.pagination}
                    loading={props.loading}
                    size="small"
                  />
                </div>
                <div className="talbeFooter">
                  Нийт <b> {props.pagination.total} </b> өгөгдөл байна
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Modal col */}

      <Modal
        visible={visible && visible.column}
        title="Тохиргоо"
        onCancel={() => handleCancel()}
        footer={[
          <Button key="back" onClick={() => handleCancel()}>
            Буцах
          </Button>,
          <Button
            key="submit"
            htmlType="submit"
            type="primary"
            loading={loading.visible}
            onClick={() => setColumns(cloneColumns)}
          >
            Хадгалах
          </Button>,
        ]}
      >
        <div className="tableBox">
          <table className="custom-table">
            <tr>
              <th>№</th>
              <th>Нэр</th>
              <th>Харагдах эсэх</th>
            </tr>
            {cloneColumns.map((col, index) => (
              <tr>
                <td>{index + 1}</td>
                <td>{col.title}</td>
                <td>
                  <input
                    type="checkbox"
                    checked={col.status}
                    name={col.key}
                    onChange={handleColumn.bind()}
                  />{" "}
                </td>
              </tr>
            ))}
          </table>
        </div>
      </Modal>
      {/* Delete modal */}
      {/* DELETE MODAL */}
      <Modal
        visible={visible && visible.delete}
        title="Устгах"
        onCancel={() => handleCancel()}
        footer={[
          <Button key="back" onClick={() => handleCancel()}>
            Буцах
          </Button>,
          <Button
            key="submit"
            htmlType="submit"
            type="danger"
            loading={loading.visible}
            onClick={() => handleDelete(cloneColumns)}
          >
            Устгах
          </Button>,
        ]}
      >
        <div className="tableBox">
          <p>
            {" "}
            Та нийт <b> {selectedRowKeys.length} </b> мэдээлэл сонгосон байна
            устгахдаа итгэлтэй байна уу? <br /> Хэрэв устгавал дахин сэргээх
            боломжгүйг анхаарна уу.{" "}
          </p>
        </div>
      </Modal>
      {/* Password */}
      <Modal
        visible={visible && visible.password}
        title="Нууц үг солих"
        onCancel={() => handleCancel()}
        footer={[
          <Button key="back" onClick={() => handleCancel()}>
            Буцах
          </Button>,
          <Button
            key="submit"
            htmlType="submit"
            type="primary"
            loading={loading.visible}
            onClick={() => {
              form
                .validateFields()
                .then((values) => {
                  handleChangePassowrd(values);
                })
                .catch(() => {});
            }}
          >
            Шинэчлэх
          </Button>,
        ]}
      >
        <div className="tableBox">
          <Form layout="vertical" form={form}>
            <div className="col-12">
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
            <div className="col-12">
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
                      if (!value || getFieldValue("password") === value) {
                        return Promise.resolve();
                      }

                      return Promise.reject(
                        new Error("Эхний оруулсан нууц үгтэй тохирохгүй байна!")
                      );
                    },
                  }),
                ]}
                hasFeedback
              >
                <Input.Password placeholder="Нууц үгээ давтан оруулна уу" />
              </Form.Item>
            </div>
          </Form>
        </div>
      </Modal>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    loading: state.userReducer.loading,
    success: state.userReducer.success,
    error: state.userReducer.error,
    users: state.userReducer.users,
    pagination: state.userReducer.paginationLast,
    excelData: state.userReducer.excelData,
  };
};

const mapDispatchToProp = (dispatch) => {
  return {
    getUsers: (query) => dispatch(actions.getUsers(query)),
    deleteMultUsers: (ids) => dispatch(actions.deleteMultUsers(ids)),
    getExcelData: (query) => dispatch(actions.getExcelData(query)),
    resetPasswordControl: (id, data) =>
      dispatch(actions.resetPasswordControl(id, data)),
    clear: () => dispatch(actions.clear()),
  };
};

export default connect(mapStateToProps, mapDispatchToProp)(Users);

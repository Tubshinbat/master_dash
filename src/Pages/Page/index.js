import React, { useEffect, useState, useRef } from "react";
import { useHistory } from "react-router-dom";
import { Button, Modal, Input, Select, Table, Tag, Space, Tooltip } from "antd";
import { connect } from "react-redux";
import Highlighter from "react-highlight-words";
import moment from "moment";
import * as XLSX from "xlsx";
import { SearchOutlined } from "@ant-design/icons";

//Lib
import base from "../../base";

//Components
import PageTitle from "../../Components/PageTitle";
import Menus from "./menu";
import axios from "../../axios-base";
import { toastControl } from "../../lib/toasControl";
import Loader from "../../Components/Generals/Loader";

// Actions
import * as actions from "../../redux/actions/pageActions";
import { loadNewsCategories } from "../../redux/actions/newsCategoryActions";
import { loadMenus } from "../../redux/actions/menuActions";
import { loadFooterMenus } from "../../redux/actions/footerMenuActions";

const Page = (props) => {
  const searchInput = useRef(null);
  //STATES
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const { Option } = Select;
  const [loading, setLoading] = useState({
    visible: false,
    message: "",
  });
  const [data, setData] = useState([]);
  const [error, setError] = useState("");

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
            Шинчлэх
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
      filters: [
        {
          text: "Нийтлэгдсэн",
          value: "true",
        },
        {
          text: "Ноорог",
          value: "false",
        },
      ],
      sorter: (a, b) => handleSort(),
    },
    {
      dataIndex: "mainLink",
      key: "mainLink",
      title: "Цэсний тохиргоо",
      status: true,
      filters: [
        {
          text: "Цэсний тохиргоотой",
          value: "true",
        },
        {
          text: "Цэсний тохиргоогүй",
          value: "false",
        },
      ],
    },
    {
      dataIndex: "newsActive",
      key: "newsActive",
      title: "Мэдээний ангилал холбосон эсэх",
      status: false,
      filters: [
        {
          text: "Мэдээ холбох",
          value: "true",
        },
        {
          text: "Мэдээ холбохгүй",
          value: "false",
        },
      ],
      sorter: (a, b) => handleSort(),
    },
    {
      dataIndex: "listActive",
      key: "listActive",
      title: "Цэсний дэд цэсүүдийг харуулсан эсэх",
      status: false,

      filters: [
        {
          text: "Идэвхтэй",
          value: "true",
        },
        {
          text: "Идэвхгүй",
          value: "false",
        },
      ],
      sorter: (a, b) => handleSort(),
    },

    {
      dataIndex: "pageActive",
      key: "pageActive",
      title: "Цэс дотор үүссэн хуудсуудыг жагсаалт болгосон эсэх",
      status: false,

      filters: [
        {
          text: "Идэвхтэй",
          value: "true",
        },
        {
          text: "Идэвхгүй",
          value: "false",
        },
      ],
      sorter: (a, b) => handleSort(),
    },

    {
      dataIndex: "pageParentActive",
      key: "pageParentActive",
      title: "Хуудас дотор хуудас үүсгэсэн эсэх",
      status: false,

      filters: [
        {
          text: "Идэвхтэй",
          value: "true",
        },
        {
          text: "Идэвхгүй",
          value: "false",
        },
      ],
      sorter: (a, b) => handleSort(),
    },

    {
      dataIndex: "modalActive",
      key: "modalActive",
      title: "Модал холбосон эсэх",
      status: false,

      filters: [
        {
          text: "Идэвхтэй",
          value: "true",
        },
        {
          text: "Идэвхгүй",
          value: "false",
        },
      ],
      sorter: (a, b) => handleSort(),
    },

    {
      dataIndex: "choiseModal",
      key: "choiseModal",
      title: "Сонгосон модал ",
      status: false,
      ...getColumnSearchProps("choiseModal"),
      sorter: (a, b) => handleSort(),
    },

    {
      dataIndex: "page",
      key: "page",
      title: "Сонгосон хуудас ",
      status: false,
      ...getColumnSearchProps("page"),
      sorter: (a, b) => handleSort(),
    },

    {
      dataIndex: "name",
      key: "name",
      title: "Хуудасны нэр",
      status: true,
      ...getColumnSearchProps("name"),
      sorter: (a, b) => handleSort(),
    },
    {
      dataIndex: "menu",
      key: "menu",
      title: "Цэс",
      status: true,
      ...getColumnSearchProps("menu"),
      render: (text, record) => {
        return (
          record.menu &&
          record.menu.length > 0 &&
          record.menu.map((el) => <Tag color="blue"> {el} </Tag>)
        );
      },
      sorter: (a, b) => handleSort(),
    },
    {
      dataIndex: "footerMenu",
      key: "footerMenu",
      title: "Хөлны цэс",
      status: false,
      ...getColumnSearchProps("footerMenu"),
      render: (text, record) => {
        return (
          record.footerMenu &&
          record.footerMenu.length > 0 &&
          record.footerMenu.map((el) => <Tag color="blue"> {el} </Tag>)
        );
      },
      sorter: (a, b) => handleSort(),
    },
    {
      dataIndex: "categories",
      key: "categories",
      title: "Холбосон мэдээний ангилал",
      status: false,
      ...getColumnSearchProps("categories"),
      render: (text, record) => {
        return (
          record.categories &&
          record.categories.length > 0 &&
          record.categories.map((el) => <Tag color="blue"> {el} </Tag>)
        );
      },
      sorter: (a, b) => handleSort(),
    },
    {
      dataIndex: "pictures",
      key: "pictures",
      title: "Зураг",
      status: true,
      render: (text, record) => {
        return (
          <div className="table-image">
            {record.pictures && record.pictures.length > 0 ? (
              <img src={`${base.cdnUrl}150x150/${record.pictures[0]}`} />
            ) : (
              "Зураг оруулаагүй байна"
            )}
          </div>
        );
      },
    },

    {
      dataIndex: "views",
      key: "views",
      title: "Үзсэн",
      status: true,
      ...getColumnSearchProps("views"),
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
      history.push(`/pages/edit/${selectedRowKeys[0]}`);
    }
  };

  const handleDelete = () => {
    props.deleteMultPage(selectedRowKeys);
  };

  // -- MODAL STATE
  const [visible, setVisible] = useState({
    delete: false,
    column: false,
  });

  // -- TOAST CONTROL SUCCESS AND ERROR
  useEffect(() => {
    if (props.error) {
      toastControl("error", props.error);
      props.clear();
    }
    if (error) {
      toastControl("error", error);
      props.clear();
    }
  }, [props.error, error]);

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
      props.loadPage(query);
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

  // -- NEWS GET DONE EFFECT
  useEffect(() => {
    if (props.pages) {
      const refData = [];
      props.pages.length > 0 &&
        props.pages.map((el) => {
          const key = el._id;
          delete el._id;
          el.status = el.status == true ? "Нийтлэгдсэн" : "Ноорог";
          el.newsActive = el.newsActive == true ? "Холбосон" : "Холбоогүй";
          el.listActive = el.listActive == true ? "Холбосон" : "Холбоогүй";
          el.pageActive = el.pageActive == true ? "Холбосон" : "Холбоогүй";
          el.mainLink =
            el.mainLink == true
              ? "Цэсний үндсэн тохиргоо хийгдсэн"
              : "Цэсний тохиргоо хийгдээгүй";
          el.pageParentActive =
            el.pageParentActive == true ? "Холбосон" : "Холбоогүй";
          el.modalActive = el.modalActive == true ? "Холбосон" : "Холбоогүй";
          el.choiseModal = el.choiseModal == true ? "Холбосон" : "Холбоогүй";
          el.createUser = el.createUser && el.createUser.firstName;
          el.updateUser = el.updateUser && el.updateUser.firstName;
          el.createAt = moment(el.createAt)
            .utcOffset("+0800")
            .format("YYYY-MM-DD HH:mm:ss");
          el.updateAt = moment(el.updateAt)
            .utcOffset("+0800")
            .format("YYYY-MM-DD HH:mm:ss");

          el.menu =
            el.menu && el.menu.length > 0 && el.menu.map((el) => el.name);

          el.footerMenu =
            el.footerMenu &&
            el.footerMenu.length > 0 &&
            el.footerMenu.map((el) => el.name);

          el.categories =
            el.categories &&
            el.categories.length > 0 &&
            el.categories.map((el) => el.name);

          el.page = el.page && el.page.name && el.page.name;

          refData.push({
            dataIndex: key,
            key,
            ...el,
          });
        });
      setData(refData);
    }
  }, [props.pages]);

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
    props.loadPage(`${query}`);
  };

  const clear = () => {};

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
        pageNumber: pagination.current,
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
    if (querys.select && querys.select[0])
      query += `select=${
        querys &&
        querys.select &&
        querys.select[0].join(" ").replaceAll(",", " ")
      }`;
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
          props.history.replace("/news/edit/" + selectedRowKeys[0]);
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
    setVisible((sb) => Object.keys(sb).map((el) => (sb[el] = false)));
    clear();
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
    const response = await axios.get("pages/excel?" + query);
    let excelData = [];
    if (response) {
      const data = response.data.data;
      excelData = data.map((el) => {
        cloneColumns.map((col) => {
          const keys = Object.keys(el);
          keys.map(
            (key) => col.key === key && col.status === false && delete el[key]
          );
          if (col.key === "status" && col.status === true) {
            el.status =
              el.status && el.status == true ? "Нийтлэгдсэн" : "Ноорог";
          }
          if (col.key === "createUser" && col.status === true) {
            el.createUser = el.createUser && el.createUser.firstname;
          }
          if (col.key === "updateUser" && col.status === true) {
            el.updateUser = el.updateUser && el.updateUser.firstname;
          }
          if (col.key === "menu" && col.status === true) {
            el.menu =
              el.menu && el.menu.length > 0 && el.menu.map((el) => el.name);
          }
          if (col.key === "footerMenu" && col.status === true) {
            el.footerMenu =
              el.footerMenu &&
              el.footerMenu.length > 0 &&
              el.footerMenu.map((el) => el.name);
          }
          if (col.key === "categories" && col.status === true) {
            el.categories =
              el.categories &&
              el.categories.length > 0 &&
              el.categories.map((el) => el.name);
          }
          if (col.key === "createAt" && col.status === true) {
            el.createAt = moment(el.createAt)
              .utcOffset("+0800")
              .format("YYYY-MM-DD HH:mm:ss");
          }
          if (col.key === "updateAt" && col.status === true) {
            el.updateAt = moment(el.updateAt)
              .utcOffset("+0800")
              .format("YYYY-MM-DD HH:mm:ss");
          }
        });
        return el;
      });
    }
    const head = [];
    cloneColumns.map((col) => {
      if (col.status === true) head.push(col.title);
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

  return (
    <>
      <div className="content-wrapper">
        <PageTitle name="Сайтын хуудас" />

        <div className="content">
          <Loader show={loading.visible}> {loading.message}</Loader>
          <div className="container-fluid">
            <div className="card datatable-card">
              <div className="card-header">
                <h3 className="card-title">Бүгд</h3>
              </div>
              <div className="card-body datatable-card-body">
                <div className="datatable-header-tools">
                  <div className="datatable-actions">
                    <button
                      className="datatable-action add-bg"
                      onClick={() => history.push(`/pages/add`)}
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
                    <Tooltip placement="left" title="Шинчлэх">
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
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    loading: state.pageReducer.loading,
    success: state.pageReducer.success,
    error: state.pageReducer.error,
    pages: state.pageReducer.pages,
    pagination: state.pageReducer.paginationLast,
    excelData: state.pageReducer.excelData,
  };
};

const mapDispatchToProp = (dispatch) => {
  return {
    loadPage: (query) => dispatch(actions.loadPage(query)),
    deleteMultPage: (ids) => dispatch(actions.deleteMultPage(ids)),
    getExcelData: (query) => dispatch(actions.getExcelData(query)),
    clear: () => dispatch(actions.clear()),
  };
};

export default connect(mapStateToProps, mapDispatchToProp)(Page);

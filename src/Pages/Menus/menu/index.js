import React, { useEffect, useState } from "react";
import { Menu } from "antd";
import { useHistory } from "react-router-dom";
//Hooks
import { usePathname } from "../../../hooks/use-url";

//Sub menu init data
const subItems = [
  {
    label: "Сайтын үндсэн цэс",
    key: "/menus",
  },
  {
    label: "Хөлний цэс",
    key: "/menus/footer",
  },
];

const Index = () => {
  const pathname = usePathname();
  const [current, setCurrent] = useState(pathname);
  const history = useHistory();
  const handleClick = (el) => {
    history.push(el.key);
  };

  useEffect(() => {
    setCurrent(pathname);
  }, [pathname]);

  return (
    <Menu
      onClick={handleClick}
      selectedKeys={[current]}
      mode="horizontal"
      items={subItems}
    />
  );
};

export default Index;

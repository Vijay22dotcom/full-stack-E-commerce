import React from "react";
import "./SlideBar.css";
import { Link } from "react-router-dom";
import { TreeView, TreeItem } from "@mui/x-tree-view";
import { LuLayoutDashboard } from "react-icons/lu";
import { MdExpandLess } from "react-icons/md";
import { MdExpandMore } from "react-icons/md";
import { IoMdAdd } from "react-icons/io";
import { MdSelectAll } from "react-icons/md";
import { BsBoxSeam } from "react-icons/bs";
import { MdOutlinePeopleAlt } from "react-icons/md";
import { MdOutlineRateReview } from "react-icons/md";
// import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
// import PostAddIcon from "@material-ui/icons/PostAdd";
// import AddIcon from "@material-ui/icons/Add";
// import ImportExportIcon from "@material-ui/icons/ImportExport";
// import ListAltIcon from "@material-ui/icons/ListAlt";
// import DashboardIcon from "@material-ui/icons/Dashboard";
// import PeopleIcon from "@material-ui/icons/People";
// import RateReviewIcon from "@material-ui/icons/RateReview";

const Sidebar = () => {
  return (
    <div className="sidebar bg-[#1C2536]  text-[#a8a7a7] flex flex-col p-8 max-[800px]:p-4  max-[500px]:p-2">
      <Link to="/" className="mb-4">
        {/* <img
          src={logo}
          alt="Ecommerce"
          className="w-full transition-transform duration-500 transform hover:scale-105"
        /> */}
      </Link>
      <Link
        to="/admin/dashboard"
        className="p-8 transition-all duration-500 hover:text-tomato max-[500px]:p-2 "
      >
        <span className="flex items-center  text-sm ">
          <LuLayoutDashboard className="mr-2 text-lg" />
          <p className="text-lg"> Dashboard</p>
        </span>
      </Link>
      <div className="  p-4 text-lg max-[500px]:p-0  ">
        <TreeView
          defaultCollapseIcon={<MdExpandLess />}
          defaultExpandIcon={<MdExpandMore />}
        >
          <TreeItem nodeId="1" label="Products">
            <Link
              to="/admin/products"
              className="p-4 transition-all duration-500 hover:text-tomato  max-[500px]:p-2"
            >
              <TreeItem
                nodeId="2"
                label="All"
                icon={<MdSelectAll className="mr-2 text-lg" />}
              />
            </Link>

            <Link
              to="/admin/addproduct"
              className="p-4 transition-all duration-500 hover:text-tomato max-[500px]:p-2"
            >
              <TreeItem
                nodeId="3"
                label="Create"
                icon={<IoMdAdd className="mr-2 text-lg" />}
              />
            </Link>
          </TreeItem>
        </TreeView>
      </div>
      <Link
        to="/admin/orders"
        className="p-8 transition-all duration-500 hover:text-tomato max-[500px]:p-2"
      >
        <span className="flex items-center">
          <BsBoxSeam className="mr-2 text-lg" />
          <p className="text-lg"> Orders</p>
        </span>
      </Link>
      <Link
        to="/admin/users"
        className="p-8 transition-all duration-500 hover:text-tomato max-[500px]:p-2"
      >
        <span className="flex items-center">
          <MdOutlinePeopleAlt className="mr-2 text-lg" />
          <p className="text-lg">Users</p>
        </span>
      </Link>
      <Link
        to="/admin/reviews"
        className="p-8 transition-all duration-500 hover:text-tomato max-[500px]:p-2"
      >
        <span className="flex items-center">
          <MdOutlineRateReview className="mr-2 text-lg " />
          <p className="text-lg">Reviews</p>
        </span>
      </Link>
    </div>
  );
};

export default Sidebar;

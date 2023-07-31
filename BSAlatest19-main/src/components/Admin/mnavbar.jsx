import React, { useEffect, useState } from "react";
import { BsChatDots, BsSearch } from "react-icons/bs";
import {
  Navbar,
  MobileNav,
  Typography,
  Button,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Avatar,
  Card,
  Input,
  IconButton,
} from "@material-tailwind/react";
import {
  CubeTransparentIcon,
  UserCircleIcon,
  CodeBracketSquareIcon,
  Square3Stack3DIcon,
  ChevronDownIcon,
  Cog6ToothIcon,
  InboxArrowDownIcon,
  LifebuoyIcon,
  PowerIcon,
  RocketLaunchIcon,
  Bars2Icon,
} from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import { IoMdNotificationsOutline } from "react-icons/io";


// profile menu component
const profileMenuItems = [
  {
    label: "My Profile",
    icon: UserCircleIcon,
  },
  {
    label: "Edit Profile",
    icon: Cog6ToothIcon,
  },

  {
    label: "Sign Out",
    icon: PowerIcon,
  },
];


function ProfileMenu() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <Menu open={isMenuOpen} handler={setIsMenuOpen} placement="bottom-end">
      <MenuHandler>
        <Button
          variant="text"
          color="blue-gray"
          className="flex items-center gap-1 rounded-full py-0.5 pr-2 pl-0.5 lg:ml-auto"
        >
          <Avatar
            variant="circular"
            size="sm"
            alt="tania andrew"
            className="border border-blue-500 p-0.5"
            src="./adminsidebar/RS.jpg"
          />
          <ChevronDownIcon
            strokeWidth={2.5}
            className={`h-3 w-3 transition-transform ${
              isMenuOpen ? "rotate-180" : ""
            }`}
          />
        </Button>
      </MenuHandler>
    
    </Menu>
  );
}

function NavList() {
  return (
    <ul className="mb-4 mt-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center">
      <div className="relative flex w-full gap-2 md:w-max float">
        <Input
          type="search"
          label="Search..."
          className="pr-20"
          containerProps={{
            className: "min-w-[288px]",
          }}
        />
        <Button
          size="sm"
          className="  !absolute right-1 translate-y-1.5 rounded"
        >
          <BsSearch className="" />
        </Button>
      </div>
    </ul>
  );
}

export default function Mnavbar() {
  const [isNavOpen, setIsNavOpen] = React.useState(false);
  const toggleIsNavOpen = () => setIsNavOpen((cur) => !cur);
  const[products,setProducts]=useState([])

  React.useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setIsNavOpen(false)
    );
  }, []);

  useEffect(()=>{
  
    const getproduct = async ()=>{
      const product = await fetch(`http://localhost:5000/products/`)
      const data = await product.json()
      console.log(data)
      setProducts(data)
    }
    getproduct()
    
      },[]);
    
    
      const  filter = products.filter((item)=>{
        return item.status === "Pending" && item.status !== "accept" && item.type !== "donate"
      })
      const  filter2 = products.filter((item)=>{
        return item.type === "donate"  && item.status !== "accept"
      })
      console.log(filter)

  return (
    <Navbar className="  p-2 top-0 left-0 right-0 max-w-full  sticky-top ">
      <div className="relative justify-between  flex items-center text-blue-gray-900">
        <Typography
          as="a"
          href="#"
          className=" ml-6  py-1.5 font-medium"
        >
          <Link to="/">
            <img src="./images/logo.jpeg" className="h-12" alt="LOGO" />
          </Link>
        </Typography>
        <div className="absolute top-2/4 left-2/4 hidden -translate-x-2/4 -translate-y-2/4 lg:block">
          <NavList />
        </div>

        <IconButton
          size="sm"
          color="blue-gray"
          variant="text"
          onClick={toggleIsNavOpen}
          className="ml-auto mr-2 lg:hidden"
        >
          <Bars2Icon className="h-6 w-6" />
        </IconButton>
        <div className="flex gap-2 ">
          <Typography as="a" variant="small" className="font-normal">
          <Link to="/arequest">
  <IconButton className="flex items-center gap-2 py-2 -mt-1 pr-10 hover:bg-green-700 hover:text-white">
    S  <sup>{filter.length}</sup>
  </IconButton>
</Link>
          </Typography>
          <Typography as="a" variant="small" className="font-normal">
          <Link to="/drequest">
  <IconButton className="flex items-center gap-2 py-2 -mt-1 pr-10 hover:bg-green-700 hover:text-white">
    D <sup>{filter2.length}</sup>
  </IconButton>
</Link>
          </Typography>

          <ProfileMenu />
        </div>
      </div>

      {/* overflow-scroll       */}
      <MobileNav open={isNavOpen} className="">
        <NavList />
      </MobileNav>
    </Navbar>
  );
}

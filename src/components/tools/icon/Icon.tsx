import React from "react";
import type { IconType } from "react-icons";
import { FaRegEyeSlash } from "react-icons/fa";
import { FaRegEye } from "react-icons/fa";
import { CiGlobe } from "react-icons/ci";
import { TbTable } from "react-icons/tb";
import { GrDashboard } from "react-icons/gr";
import { GiPartyPopper } from "react-icons/gi";
import { IoRestaurantOutline } from "react-icons/io5";
import { CiSettings } from "react-icons/ci";
import { MdOutlinePayment } from "react-icons/md";
import { MdOutlineMovieCreation } from "react-icons/md";
import { IoCreateOutline } from "react-icons/io5";
import { MdEventAvailable } from "react-icons/md";
import { MdOutlineLocalGroceryStore } from "react-icons/md";
import { CiLocationOn } from "react-icons/ci";
import { FaRegCalendar } from "react-icons/fa";
import { CiTimer } from "react-icons/ci";
import { FaStar } from "react-icons/fa6";
import { LuPhone } from "react-icons/lu";
import { CiCirclePlus } from "react-icons/ci";
import { FaCircle } from "react-icons/fa";
import { FaRegTimesCircle } from "react-icons/fa";
import { FaCircleCheck } from "react-icons/fa6";
import { IoIosLogOut } from "react-icons/io";
import { IoIosSend } from "react-icons/io";

const iconsMap: Record<string, IconType> = {
  eyeOff: FaRegEyeSlash,
  eye: FaRegEye,
  globe: CiGlobe,
  tabBar: TbTable,
  dashboard: GrDashboard,
  events: GiPartyPopper,
  restaurnats: IoRestaurantOutline,
  supermarkets: MdOutlineLocalGroceryStore,
  settings: CiSettings,
  payments: MdOutlinePayment,
  createdEvents: MdOutlineMovieCreation,
  registeredEvents: IoCreateOutline,
  myReservations: MdEventAvailable,
  location: CiLocationOn,
  calendar: FaRegCalendar,
  time: CiTimer,
  star: FaStar,
  phone: LuPhone,
  add: CiCirclePlus,
  totalCircle: FaCircle,
  usedCircle: FaRegTimesCircle,
  remainingCircle: FaCircleCheck,
  logout: IoIosLogOut,
  send: IoIosSend,
};

interface IIcon {
  name: keyof typeof iconsMap;
  size?: number;
  color?: string;
  className?: string;
  onClick?: () => void;
}

const Icon: React.FC<IIcon> = ({
  name,
  size = 16,
  color = "black",
  className,
  onClick,
}) => {
  const IconComponent: IconType = iconsMap[name];

  if (!IconComponent) return null;

  const Component = IconComponent as React.FC<{
    size?: number;
    color?: string;
    className?: string;
    onClick?: () => void;
  }>;

  return (
    <Component
      onClick={onClick}
      className={`icon ${className}`}
      size={size}
      color={color}
    />
  );
};

export default Icon;

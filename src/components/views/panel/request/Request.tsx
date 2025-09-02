import { useState } from "react";

import { toast } from "react-toastify";

import AuthForm from "@tools/authForm/AuthForm";
import { IField } from "@tools/field/Field";
import { EInput } from "@tools/input/Input";
import InfoCard from "@tools/infoCard/InfoCard";
import Icon from "@tools/icon/Icon";

import axiosClient from "../../../../axios-client";

import "./request.css";

const Request = () => {
  const [formData, setFormData] = useState({
    requestType: "full",
    start_date: "",
    end_date: "",
    date:"",
    note: "",
    start_time: "",
    end_time: "",
  });
  

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement |HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const payload = formData.requestType === "full"
      ? {
          start_date: formData.start_date,
          end_date: formData.end_date,
          note: formData.note,
        }
      : {
          date: formData.date,
          start_time: formData.start_time,
          end_time: formData.end_time,
          note: formData.note,
        };

    axiosClient
      .post("/create-request", payload)
      .then((response) => {
        toast.success("Vacation request created successfully!");
      }).catch((err) => {
        const errorData = JSON.parse(err.request.response)
        toast.error(errorData);
    });
  };

  const requestFullDayFields: IField[] = [
    {
      label: "Request Type",
      inputName: "requestType",
      inputId: "requestType",
      inputType: EInput.radio,
      inputRequired: true,
      inputValue: formData.requestType,
      onInputChange: handleInputChange,
      options: [
        { label: "Full Day(s)", value: "full" },
        { label: "Hourly", value: "hourly" },
      ],
    },
    {
      label: "Start Date",
      inputName: "start_date",
      inputId: "requestStartDate",
      inputType: EInput.date,
      inputRequired: true,
      inputValue: formData.start_date,
      onInputChange: handleInputChange,
      min: new Date().toISOString().split("T")[0],
    },
    {
      label: "End Date",
      inputName: "end_date",
      inputId: "requestEndDate",
      inputType: EInput.date,
      inputRequired: true,
      inputValue: formData.end_date,
      onInputChange: handleInputChange,
      min: formData.start_date,
    },
    {
      label: "Note",
      inputName: "note",
      inputId: "requestDescription",
      inputType: EInput.textarea,
      inputRequired: true,
      inputValue: formData.note,
      onInputChange: handleInputChange,
      placeholder: "Add any additional details about your vacation request...",
    },
  ];

  const requestHourlyFields: IField[] = [
    {
      label: "Request Type",
      inputName: "requestType",
      inputId: "requestType",
      inputType: EInput.radio,
      inputRequired: true,
      inputValue: formData.requestType,
      onInputChange: handleInputChange,
      options: [
        { label: "Full Day(s)", value: "full" },
        { label: "Hourly", value: "hourly" },
      ],
    },
    {
      label: "Date",
      inputName: "date",
      inputId: "requestDate",
      inputType: EInput.date,
      inputRequired: true,
      inputValue: formData.date,
      onInputChange: handleInputChange,
      min: new Date().toISOString().split("T")[0],
    },
    {
      label: "Start Time",
      inputName: "start_time",
      inputId: "requestStartTime",
      inputType: EInput.time,
      inputRequired: true,
      inputValue: formData.start_time,
      onInputChange: handleInputChange,
    },
    {
      label: "End Time",
      inputName: "end_time",
      inputId: "requestEndTime",
      inputType: EInput.time,
      inputRequired: true,
      inputValue: formData.end_time,
      onInputChange: handleInputChange,
      min: formData.start_time,
    },
    {
      label: "Note",
      inputName: "note",
      inputId: "requestDescription",
      inputType: EInput.textarea,
      inputRequired: true,
      inputValue: formData.note,
      onInputChange: handleInputChange,
      placeholder: "Add any additional details about your vacation request...",
    },
  ];

  return (
    <>
      <InfoCard
        className="request_info-card"
        title="Vacation Hours Overview"
        subTitle="You can see an overview of your vacations here."
      >
        <div className="request_info-card__section">
          <div className="request_info-card__section___title">
            Current Month Overview
          </div>
          <div className="request_info-card__section___tiles">
            <Tile
              title="Total Vacation Hours"
              value="16"
              iconName="totalCircle"
              iconColor="#3C83F6"
              valueColor="#3C83F6"
            />

            <Tile
              title="Used Vacation Hours"
              value="0"
              iconName="usedCircle"
              iconColor="#EF4343"
              valueColor="#EF4343"
            />

            <Tile
              title="Remaining Vacation Hours"
              value="16"
              iconName="remainingCircle"
              iconColor="#0d9488"
              valueColor="#0d9488"
            />
          </div>
        </div>

        <div className="request_info-card__section">
          <div className="request_info-card__section___title">
            Current Year Overview
          </div>
          <div className="request_info-card__section___tiles">
            <Tile
              title="Total Vacation Hours"
              value="120"
              iconName="totalCircle"
              iconColor="#3C83F6"
              valueColor="#3C83F6"
            />

            <Tile
              title="Used Vacation Hours"
              value="0"
              iconName="usedCircle"
              iconColor="#EF4343"
              valueColor="#EF4343"
            />

            <Tile
              title="Remaining Vacation Hours"
              value="120"
              iconName="remainingCircle"
              iconColor="#0d9488"
              valueColor="#0d9488"
            />
          </div>
        </div>
      </InfoCard>

      <AuthForm
        header="Request Vacation Time"
        subHeader="Submit a new vacation request for approval by your manager."
        fields={
          formData.requestType === "full"
            ? requestFullDayFields
            : requestHourlyFields
        }
        buttonText="Submit request"
        buttonIcon="send"
        onSubmit={handleSubmit}
      />
    </>
  );
};

export default Request;

interface ITile {
  title: string;
  value: string;
  iconName: string;
  iconColor: string;
  valueColor: string;
}

const Tile: React.FC<ITile> = ({ title, value, iconName, valueColor }) => {
  return (
    <div className="tile">
      <div className="tile_title">
        <Icon name={iconName} size={15} color={valueColor} />
        {title}
      </div>

      <div className="tile_value" style={{ color: valueColor }}>
        {value}
      </div>
    </div>
  );
};

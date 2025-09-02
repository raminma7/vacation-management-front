import { useEffect, useState } from "react";

import Icon from "@tools/icon/Icon";
import InfoCard from "@tools/infoCard/InfoCard";
import Spinner from "@tools/spinner/Spinner";

import { toast } from "react-toastify";

import axiosClient from "../../../../axios-client";

import "./myRequests.css";

interface IRequest {
  id: number;
  start_date?: string;
  end_date?: string;
  date?: string;
  start_time?: string;
  end_time?: string;
  note?: string;
  status: string;
  admin_note?: string;
  created_at: string;
}

const MyRequests = () => {
  const [requests, setRequests] = useState<IRequest[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = () => {
    setLoading(true);
    axiosClient
      .get("/get-requests")
      .then((response) => setRequests(response.data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  };

  const handleCancel = (id: number) => {
    if (!window.confirm("Are you sure you want to cancel this request?")) return;

    axiosClient
      .post(`/cancel-request/${id}`)
      .then(() => {
        fetchRequests();
      })
      .catch((err) => {
        const errorData = JSON.parse(err.request.response)
        toast.error(errorData);
      });
  };

  return (
    <InfoCard
      title="My Requests"
      subTitle="View and track the status of your vacation requests."
    >
      <div className="my-requests_content">
      {loading ? (
        <Spinner />
      ) : requests.length > 0 ? (
        <ul className="my-requests_list">
          {requests.map((req) => (
            <li key={req.id} className="request_item">
              <div className="request_item_content">
                <div>
                  {req.date || req.start_date}{" "}
                  {req.end_date ? `- ${req.end_date}` : ""}
                  {req.start_time && ` (${req.start_time} - ${req.end_time})`}
                </div>
                {req.note && <div className="note">Note: {req.note}</div>}
                {req.admin_note && <div className="admin_note">Admin Note: {req.admin_note}</div>}
              </div>

              <div className="request_actions">
                <div className={`status_badge status_${req.status}`}>
                  {req.status}
                </div>

                {req.status === "pending" && (
                  <button
                    className="cancel_button"
                    onClick={() => handleCancel(req.id)}
                  >
                    Cancel
                  </button>
                )}
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <div className="no-requests">
          <Icon name="calendar" size={48} color="#676F7E" />
          <div className="no-requests_text">No vacation requests yet!</div>
          <div className="no-requests_subtext">
            You haven't submitted any vacation requests. Start by creating your first request.
          </div>
        </div>
      )}
      </div>
    </InfoCard>
  );
};

export default MyRequests;

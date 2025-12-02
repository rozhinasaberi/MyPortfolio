import { useEffect, useState } from "react";
import axios from "axios";

export default function CustomerDashboard() {
  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user?._id;

  const [services, setServices] = useState([]);
  const [selectedServices, setSelectedServices] = useState({});
  const [loading, setLoading] = useState(true);

  // Fetch available services only (no contacts/projects)
  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await axios.get("/api/services");
        setServices(res.data);
      } catch (err) {
        console.error("Service fetch error", err);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  // Toggle service checkbox
  const toggleService = (serviceId) => {
    setSelectedServices((prev) => ({
      ...prev,
      [serviceId]: {
        ...prev[serviceId],
        checked: !prev[serviceId]?.checked,
      },
    }));
  };

  // Add description
  const handleDescChange = (serviceId, text) => {
    setSelectedServices((prev) => ({
      ...prev,
      [serviceId]: {
        ...prev[serviceId],
        desc: text,
      },
    }));
  };

  // Send service request
  const submitServiceRequest = async () => {
    const finalPayload = Object.entries(selectedServices)
      .filter(([id, data]) => data.checked)
      .map(([id, data]) => ({
        serviceId: id,
        description: data.desc || "",
      }));

    if (finalPayload.length === 0) {
      alert("Please select at least one service.");
      return;
    }

    try {
      await axios.post(`/api/user/${userId}/request-services`, finalPayload);
      alert("Service request sent!");
    } catch (err) {
      console.error(err);
      alert("Error sending request.");
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div style={{ width: "70%", margin: "auto", marginTop: "30px" }}>
      <h2>Welcome back, {user?.name}</h2>

      <h3 style={{ marginTop: "40px" }}>Your Available Services</h3>

      {services.map((service) => {
        const checked = selectedServices[service._id]?.checked || false;
        const desc = selectedServices[service._id]?.desc || "";

        return (
          <div
            key={service._id}
            style={{
              border: "1px solid #ddd",
              padding: "16px",
              borderRadius: "8px",
              marginBottom: "15px",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <input
                type="checkbox"
                checked={checked}
                onChange={() => toggleService(service._id)}
              />
              <h4>{service.title}</h4>
            </div>

            <p style={{ opacity: 0.8 }}>{service.shortDescription}</p>

            {/* Description textarea only shows when checked */}
            {checked && (
              <textarea
                placeholder="Describe what you need..."
                value={desc}
                onChange={(e) => handleDescChange(service._id, e.target.value)}
                style={{
                  width: "100%",
                  marginTop: "10px",
                  minHeight: "70px",
                  padding: "8px",
                }}
              />
            )}
          </div>
        );
      })}

      <button
        onClick={submitServiceRequest}
        style={{
          background: "black",
          color: "white",
          padding: "12px 18px",
          borderRadius: "6px",
          marginTop: "10px",
          cursor: "pointer",
        }}
      >
        Send Service Request
      </button>
    </div>
  );
}

import { useEffect, useState } from "react";
import Header from "../../components/Header/Header";
import BackButton from "../../components/BackButton/BackButton";
import { fetchVendors, type Vendor } from "../../api/vendors";
import "./Vendors.css";

type Status = "idle" | "loading" | "error" | "success";

export default function Vendors() {
  const [vendors, setVendors] = useState<Vendor[]>([]);
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    let cancelled = false;
    setStatus("loading");
    setErrorMessage("");

    fetchVendors()
      .then((data) => {
        if (cancelled) return;
        setVendors(data);
        setStatus("success");
      })
      .catch((error) => {
        if (cancelled) return;
        setStatus("error");
        setErrorMessage(
          error instanceof Error ? error.message : "Unable to load vendors right now.",
        );
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <>
      <Header
        title="Vendors"
        showTagline={false}
        background="alt"
        leftSlot={<BackButton />}
      />
      <div className="vendors-page">
        {status === "loading" && <p className="vendors-message">Loading vendors…</p>}
        {status === "error" && (
          <p className="vendors-message error">{errorMessage}</p>
        )}

        {status === "success" && vendors.length === 0 && (
          <p className="vendors-message">No vendors available yet.</p>
        )}

        {vendors.length > 0 && (
          <ul className="vendors-grid">
            {vendors.map((vendor) => (
              <li key={vendor.vendor_id} className="vendor-card">
                <div className="vendor-image-frame">
                  <img
                    src={vendor.image_url}
                    alt={vendor.vendor_name}
                    className="vendor-image"
                  />
                </div>
                <div className="vendor-details">
                  <h3>{vendor.vendor_name}</h3>
                  {vendor.website && (
                    <a
                      href={vendor.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="vendor-link"
                    >
                      {vendor.website.replace(/^https?:\/\//, "")}
                    </a>
                  )}
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
}
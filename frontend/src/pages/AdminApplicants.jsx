import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

export default function AdminApplicants() {
  const { jobId } = useParams();
  const [applicants, setApplicants] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:8000/api/v1/application/${jobId}/applicants`, { credentials: "include" })
      .then(res => res.json())
      .then(data => setApplicants(data.applicants || []));
  }, [jobId]);

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded shadow mt-10">
      <h2 className="text-2xl font-bold mb-6">Applicants</h2>
      {applicants.length === 0 ? (
        <p>No applicants found</p>
      ) : (
        <ul className="space-y-4">
          {applicants.map(app => (
            <li key={app._id} className="border p-4 rounded flex justify-between items-center">
              <div>
                <p className="font-bold">{app.applicant.fullname || app.applicant.email}</p>
                <p>{app.applicant.email}</p>
              </div>
              <a
                href={`http://localhost:8000/${app.cv}`}
                target="_blank"
                rel="noreferrer"
                className="text-blue-600 underline"
              >
                View CV
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

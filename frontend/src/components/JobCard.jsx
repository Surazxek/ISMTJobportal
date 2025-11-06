import { Link } from "react-router-dom";

export default function JobCard({ job }) {
  return (
    <div className="p-6 rounded-xl shadow-lg bg-white border hover:shadow-2xl transition-shadow flex flex-col justify-between h-full">
      <div>
        <h3 className="text-xl font-semibold mb-1">{job.title}</h3>
        <p className="text-gray-700 mb-1">{job.description}</p>
        <span className="text-sm text-gray-500 block mb-3">{job.location}</span>
      </div>
      <Link
        to={`/apply/${job._id}`}
        className="mt-auto inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 text-center"
      >
        Apply
      </Link>
    </div>
  );
}

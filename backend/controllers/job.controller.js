import { Job } from "../models/job.model.js";


export const postJob = async (req, res) => {
  try {
    const {
      title, description, requirements, salary,
      location, jobType, experience, position, companyId
    } = req.body;

    const userId = req.id; // should come from your auth middleware

    // Validate required fields
    if (!title || !description || !requirements || !salary ||
        !location || !jobType || !experience || !position || !companyId) {
      return res.status(400).json({
        message: "Something is missing.",
        success: false
      });
    }

    // Create job
    const job = await Job.create({
      title,
      description,
      requirements: requirements.split(","),
      salary: Number(salary),
      location,
      jobType,
      experienceLevel: experience,
      position,
      company: companyId,
      created_by: userId
    });

    return res.status(201).json({
      message: "New job created successfully.",
      job,
      success: true
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Server error." });
  }
};


// export const postJob = async (req, res) => {
//     try {
//         const { title, description, requirements, salary, location, jobType, experience, position, companyId } = req.body;
//         const userId = req.id;

//         if (!title || !description || !requirements || !salary || !location || !jobType || !experience || !position || !companyId) {
//             return res.status(400).json({
//                 message: "Somethin is missing.",
//                 success: false
//             })
//         };
//         const job = await Job.create({
//             title,
//             description,
//             requirements: requirements.split(","),
//             salary: Number(salary),
//             location,
//             jobType,
//             experienceLevel: experience,
//             position,
//             company: companyId,
//             created_by: userId
//         });
//         return res.status(201).json({
//             message: "New job created successfully.",
//             job,
//             success: true
//         });
//     } catch (error) {
//         console.log(error);
//     }
// }
// 
export const getAllJobs = async (req, res) => {
    try {
        const keyword = req.query.keyword || "";
        const query = {
            $or: [
                { title: { $regex: keyword, $options: "i" } },
                { description: { $regex: keyword, $options: "i" } },
            ]
        };
        const jobs = await Job.find(query).populate({
            path: "company"
        }).sort({ createdAt: -1 });
        if (!jobs) {
            return res.status(404).json({
                message: "Jobs not found.",
                success: false
            })
        };
        return res.status(200).json({
            jobs,
            success: true
        })
    } catch (error) {
        console.log(error);
    }
}
// student
export const getJobById = async (req, res) => {
  try {
    const jobId = req.params.id;
    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({
        message: "Jobs not found.",
        success: false
      });
    }
    return res.status(200).json({ job, success: true });
  } catch (error) {
    console.log(error);
  }
};

export const getAdminJobs = async (req, res) => {
    try {
        const adminId = req.id;
        const jobs = await Job.find({ created_by: adminId }).populate({
            path:'company',
            createdAt:-1
        });
        if (!jobs) {
            return res.status(404).json({
                message: "Jobs not found.",
                success: false
            })
        };
        return res.status(200).json({
            jobs,
            success: true
        })
    } catch (error) {
        console.log(error);
    }
}


// Edit job controller
export const editJob = async (req, res) => {
  const jobId = req.params.id;
  const userId = req.id;
  try {
    const job = await Job.findById(jobId);
    if (!job) return res.status(404).json({ message: "Job not found" });

    if (job.created_by.toString() !== userId) {
      return res.status(403).json({ message: "Not authorized" });
    }

    // Update fields from req.body (add validation as needed)
    Object.assign(job, req.body);
    await job.save();

    res.json({ success: true, job });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete job controller
export const deleteJob = async (req, res) => {
  const jobId = req.params.id;
  const userId = req.id;
  const userRole = req.role; // get from auth middleware

  try {
    const job = await Job.findById(jobId);
    if (!job) return res.status(404).json({ message: "Job not found" });

    // Only admin can delete, recruiters cannot
    if (userRole !== "admin") {
      return res.status(403).json({ message: "Not authorized to delete jobs" });
    }

    await job.remove();
    res.json({ success: true, message: "Job deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

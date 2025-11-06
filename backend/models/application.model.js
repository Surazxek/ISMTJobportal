// import mongoose from "mongoose";

// const applicationSchema = new mongoose.Schema({
//     job:{
//         type:mongoose.Schema.Types.ObjectId,
//         ref:'Job',
//         required:true
//     },
//     applicant:{
//         type:mongoose.Schema.Types.ObjectId,
//         ref:'User',
//         required:true
//     },
//     status:{
//         type:String,
//         enum:['pending', 'accepted', 'rejected'],
//         default:'pending'
//     }
// },{timestamps:true});
// export const Application  = mongoose.model("Application", applicationSchema);

// import mongoose from "mongoose";

// const applicationSchema = new mongoose.Schema({
//   job: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "Job",
//     required: true
//   },
//   applicant: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "User",
//     required: true
//   },
//     cv: {
//     type: String,
//     required: true // This means the path/URL to the uploaded CV is mandatory
//   },
//   status: {
//     type: String,
//     enum: ["pending", "accepted", "rejected"],
//     default: "pending"
//   }
// }, { timestamps: true });

// export const Application = mongoose.model("Application", applicationSchema);


import mongoose from "mongoose";

const applicationSchema = new mongoose.Schema({
  job: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Job",
    required: true
  },
  applicant: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  cv: {
    type: String,
    required: true // Path to saved CV file
  },
  cvOriginalName: {
    type: String // Original filename for reference
  },
  status: {
    type: String,
    enum: ["pending", "accepted", "rejected"],
    default: "pending"
  }
}, { timestamps: true });

export const Application = mongoose.model("Application", applicationSchema);


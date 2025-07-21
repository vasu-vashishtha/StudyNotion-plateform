const CourseProgress = require("../models/CourseProgress");
const SubSection = require("../models/SubSection");


exports.updateCourseProgress = async(req,res) => {
    const {courseId, subSectionId} = req.body;
    const userId = req.user.id;

    try{
        //check if the subsection is valid
        const subSection = await SubSection.findById(subSectionId);

        if(!subSection) {
            return res.status(404).json({error:"Invalid SUbSection"});
        }

        //console.log("SubSection Validation Done");

        // Find the course progress document for the user and course
        let courseProgress = await CourseProgress.findOne({
            courseID:courseId,
            userId:userId,
        });
        if(!courseProgress) {
            // If course progress doesn't exist, create a new one
            return res.status(404).json({
                success:false,
                message:"Course Progress does not exist"
            });
        }
        else {
            //console.log("Course Progress Validation Done");
         // If course progress exists, check if the subsection is already completed
         if(courseProgress.completedVideos.includes(subSectionId)) {
                return res.status(400).json({
                    error:"Subsection already completed",
                });
            }

        // Push the subsection into the completedVideos array
        courseProgress.completedVideos.push(subSectionId);
            //console.log("Copurse Progress Push Done");
        }
        
        // Save the updated course progress
        await courseProgress.save();
        //console.log("Course Progress Save call Done");
        return res.status(200).json({
            success:true,
            message:"Course Progress Updated Successfully",
        })
    }
    catch(error) {
        console.error(error);
        return res.status(400).json({error:"Internal Server Error"});
    }
}


// exports.getProgressPercentage = async (req, res) => {
//   const { courseId } = req.body
//   const userId = req.user.id

//   if (!courseId) {
//     return res.status(400).json({ error: "Course ID not provided." })
//   }

//   try {
//     // Find the course progress document for the user and course
//     let courseProgress = await CourseProgress.findOne({
//       courseID: courseId,
//       userId: userId,
//     })
//       .populate({
//         path: "courseID",
//         populate: {
//           path: "courseContent",
//         },
//       })
//       .exec()

//     if (!courseProgress) {
//       return res
//         .status(400)
//         .json({ error: "Can not find Course Progress with these IDs." })
//     }
//     console.log(courseProgress, userId)
//     let lectures = 0
//     courseProgress.courseID.courseContent?.forEach((sec) => {
//       lectures += sec.subSection.length || 0
//     })

//     let progressPercentage =
//       (courseProgress.completedVideos.length / lectures) * 100

//     // To make it up to 2 decimal point
//     const multiplier = Math.pow(10, 2)
//     progressPercentage =
//       Math.round(progressPercentage * multiplier) / multiplier

//     return res.status(200).json({
//       data: progressPercentage,
//       message: "Succesfully fetched Course progress",
//     })
//   } catch (error) {
//     console.error(error)
//     return res.status(500).json({ error: "Internal server error" })
//   }
// }
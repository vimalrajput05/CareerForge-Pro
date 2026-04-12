import { useState } from "react";
import { motion } from "framer-motion";
import FormInput from "../components/FormInput";
import ResumePreview from "../components/ResumePreview";
import html2pdf from "html2pdf.js";
import "../styles/ResumeBuilder.css";

function ResumeBuilder() {

const [photo,setPhoto] = useState(null)
const [name,setName] = useState("")
const [email,setEmail] = useState("")
const [phone,setPhone] = useState("")
const [address,setAddress] = useState("")
const [education,setEducation] = useState("")
const [skills,setSkills] = useState("")
const [experience,setExperience] = useState("")
const [projects,setProjects] = useState("")
const [template,setTemplate] = useState("template1")

const downloadResume = () => {

const element = document.getElementById("resume")

const options = {
margin:0.5,
filename:"My_Resume.pdf",
image:{type:"jpeg",quality:0.98},
html2canvas:{scale:2},
jsPDF:{unit:"in",format:"letter",orientation:"portrait"}
}

html2pdf().set(options).from(element).save()

}

return(

<div className="container">

<div className="builder">

{/* LEFT FORM */}

<motion.div
className="form-section"
initial={{opacity:0,y:40}}
animate={{opacity:1,y:0}}
transition={{duration:0.5}}
>

<h2>Build Your Resume</h2>

<div className="templates">

<button onClick={()=>setTemplate("template1")}>Template 1</button>
<button onClick={()=>setTemplate("template2")}>Template 2</button>
<button onClick={()=>setTemplate("template3")}>Template 3</button>

</div>

<div className="form">

{/* PHOTO UPLOAD */}

<div className="photo-upload">

<label className="upload-label">Profile Photo</label>

<label className="upload-box">

<input
type="file"
accept="image/*"
onChange={(e)=>setPhoto(URL.createObjectURL(e.target.files[0]))}
/>

<span>Click to Upload Photo</span>

</label>

</div>

<FormInput
placeholder="Full Name"
onChange={(e)=>setName(e.target.value)}
/>

<FormInput
placeholder="Email"
onChange={(e)=>setEmail(e.target.value)}
/>

<FormInput
placeholder="Phone"
onChange={(e)=>setPhone(e.target.value)}
/>

<FormInput
placeholder="Address"
onChange={(e)=>setAddress(e.target.value)}
/>

<FormInput
placeholder="Education"
textarea={true}
onChange={(e)=>setEducation(e.target.value)}
/>

<FormInput
placeholder="Skills (comma separated)"
textarea={true}
onChange={(e)=>setSkills(e.target.value)}
/>

<FormInput
placeholder="Experience"
textarea={true}
onChange={(e)=>setExperience(e.target.value)}
/>

<FormInput
placeholder="Projects"
textarea={true}
onChange={(e)=>setProjects(e.target.value)}
/>

</div>

<motion.button
className="download"
whileHover={{scale:1.05}}
whileTap={{scale:0.95}}
onClick={downloadResume}
>
Download Resume
</motion.button>

</motion.div>

{/* RIGHT PREVIEW */}

<ResumePreview
name={name}
email={email}
phone={phone}
address={address}
education={education}
skills={skills}
experience={experience}
projects={projects}
photo={photo}
template={template}
/>

</div>

</div>

)

}

export default ResumeBuilder;
import { motion } from "framer-motion";

function ResumePreview({
  name,
  email,
  phone,
  address,
  education,
  skills,
  experience,
  projects,
  photo,
  template
}) {

  const skillList = skills ? skills.split(",") : [];

  return (

    <motion.div
      id="resume"
      className={`preview ${template}`}
      initial={{ opacity: 0, x: 80 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6 }}
    >

      {/* HEADER */}

      <div className="resume-header">

        <div className="header-left">

          {photo && (
            <img src={photo} alt="profile" className="profile-photo" />
          )}

        </div>

        <div className="header-right">

          <h1>{name || "Your Name"}</h1>

          <p className="contact">
            {email} | {phone}
          </p>

          <p className="address">{address}</p>

        </div>

      </div>

      {/* EDUCATION */}

      <h3>Education</h3>
      <p>{education}</p>

      {/* SKILLS */}

      <h3>Skills</h3>

      <div className="skills">

        {skillList.length === 0
          ? <p>No skills added</p>
          : skillList.map((skill, index) => (
              <span key={index} className="skill-tag">
                {skill}
              </span>
            ))
        }

      </div>

      {/* EXPERIENCE */}

      <h3>Experience</h3>
      <p>{experience}</p>

      {/* PROJECTS */}

      <h3>Projects</h3>
      <p>{projects}</p>

    </motion.div>

  );

}

export default ResumePreview;
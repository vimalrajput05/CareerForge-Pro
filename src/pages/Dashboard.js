import { Link } from "react-router-dom";

function Dashboard() {
  return (
    <div className="dashboard">

      <h1>CareerForge Pro</h1>

      <div className="cards">

        <Link to="/builder" className="card">
          Create Resume
        </Link>

        <div className="card">ATS Analyzer</div>

        <div className="card">My Resumes</div>

        <div className="card">Job Match</div>

      </div>

    </div>
  );
}

export default Dashboard;
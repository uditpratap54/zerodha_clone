import React from "react";

function Team() {
  return (
    <div className="container">
      <div className="row p-3 mt-5 border-top">
        <h1 className="text-center">People</h1>
      </div>

      <div
        className="row p-3 text-muted"
        style={{ lineHeight: "1.8", fontSize: "1.2em" }}
      >
        <div className="col-6 p-3 text-center">
          <img
            src="media/images/uditpratapsingh.jpeg"
            style={{ borderRadius: "100%", width: "50%" }}
            alt="Udit Pratap Singh"
          />
          <h4 className="mt-5">Udit Pratap singh</h4>
          <h6>Full Stack Developer</h6>
        </div>

        <div className="col-6 p-3">
          <p>
            👋 <strong>Hi, I’m Udit pratap singh</strong>
            <br />
            Currently pursuing <strong>B.Tech in Information Technology</strong>,
            with a strong interest in <strong>Full-Stack Web Development</strong>{" "}
            and building real-world, scalable applications using modern
            technologies.
          </p>

          <p>
            🚀 <strong>Skills</strong>
          </p>

          <ul>
            <li>
              <strong>Frontend:</strong> HTML, CSS, JavaScript, React, Responsive
              Web Design
            </li>
            <li>
              <strong>Backend:</strong> Node.js, Express.js, REST APIs
            </li>
            <li>
              <strong>Database:</strong> MongoDB , MySQL
            </li>
            <li>
              <strong>Tools & Technologies:</strong> Git, GitHub, VS Code
            </li>
            <li>
              <strong>Programming Languages:</strong> Java, Python
            </li>
            <li>
              <strong>Core Concepts:</strong> OOPs, DSA, Problem Solving
            </li>
          </ul>

          <p>
            Connect on{" "}
            <a
              href="@UditPra75647758"
              target="_blank"
              rel="noopener noreferrer"
            >
              Twitter
            
            </a>{" "}
            /{" "}
            <a
              href="https://github.com/uditpratap54"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Team;

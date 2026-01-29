import "./About.css";

export default function About() {
  return (
    <section className="about">
      <div className="about-container">
        <h1>About LifeBytes</h1>

        <p>
          LifeBytes was created with a simple belief —  
          <strong> small thoughts can create big changes.</strong>
        </p>

        <p>
          In a world full of noise, we often forget to pause and reflect.
          LifeBytes brings short stories and reflections that help you
          slow down, think deeper, and reconnect with yourself.
        </p>

        <p>
          These are not motivational speeches.
          These are quiet thoughts — meant to stay with you long after
          you finish reading.
        </p>

        <p className="highlight">
          One honest thought at the right moment  
          can change a lifetime.
        </p>
      </div>
    </section>
  );
}

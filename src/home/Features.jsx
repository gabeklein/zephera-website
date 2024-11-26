export const Features = () => {
  section: {
    maxWidth: 1000;
    margin: auto;
    gridColumns: "repeat(3, 1fr)";
    gap: 20;
    padding: 20, 40, 40;
  }

  feature: {
    textAlign: center;
    padding: 20;
    background: 0xf9f9f9;
    border: 0xddd;
    radius: 10;
  }

  <section>
    <feature>
      <img src="https://via.placeholder.com/60" alt="Scalability" />
      <h3>Scalability</h3>
      <p>Expand and scale your cloud infrastructure seamlessly.</p>
    </feature>
    <feature>
      <img src="https://via.placeholder.com/60" alt="Security" />
      <h3>Advanced Security</h3>
      <p>Keep your data secure with industry-leading measures.</p>
    </feature>
    <feature>
      <img src="https://via.placeholder.com/60" alt="Support" />
      <h3>24/7 Expert Support</h3>
      <p>Get round-the-clock assistance from our cloud experts.</p>
    </feature>
  </section>;
};

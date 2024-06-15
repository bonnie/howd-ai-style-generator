import React from "react";

import styles from "./Footer.module.css";

const Footer = ({ ...delegated }: React.ComponentProps<"footer">) => {
  return (
    <footer className={styles.wrapper} {...delegated}>
      <p>Learn how to create this app!</p>
      <p>
        Visit{" "}
        <a href="https://newsletter.howd.dev" target="_blank">
          Hands-on Web Dev Challenges
        </a>
      </p>
    </footer>
  );
};

export default Footer;

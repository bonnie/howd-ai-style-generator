import React from "react";

import styles from "./QuoteStyleItem.module.css";

type QuoteStyleItemProps = {
  name: string;
  value: string;
};

const QuoteStyleItem = ({ name, value }: QuoteStyleItemProps) => {
  return (
    <>
      <div className={styles.propertyTitle}>{name}</div>
      <div>{value}</div>
    </>
  );
};

export default QuoteStyleItem;

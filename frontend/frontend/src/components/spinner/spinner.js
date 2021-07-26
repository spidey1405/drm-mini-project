import React from 'react';
import classes from './spinner.module.scss';
export default function Spinner() {
  return (
    <div className={classes.Covered}>
      <div className={classes.loader}>Loading...</div>
    </div>
  );
}

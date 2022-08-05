import React from 'react';
import PropTypes from 'prop-types';
import styles from './Button.module.css';

export const BUTTON_TYPES = {
  PRIMARY: 'primary',
  SECONDARY: 'secondary',
  OUTLINE: 'outline',
  PLAIN: 'plain',
  WARNING: 'warning',
  DANGER: 'danger',
  SUCCESS: 'success',
};

export const BUTTON_SIZES = {
  SMALL: 'small',
  MEDIUM: 'medium',
  LARGE: 'large',
  XLARGE: 'xlarge',
};

export const Button = (props) => {
  const {
    type = BUTTON_TYPES.PRIMARY,
    size = BUTTON_SIZES.MEDIUM,
    className = '',
    onClick = () => {},
    icon,
    fullWidth = false,
  } = props;

  return (
    <button
      className={`${styles.button} ${type} ${size} ${
        fullWidth ? 'fullWidth' : ''
      } ${className}`}
      onClick={onClick}
    >
      {icon ? <div className={styles.buttonIcon}>{icon}</div> : null}
      {props.children}
    </button>
  );
};

Button.propTypes = {
  size: PropTypes.oneOf(Object.values(BUTTON_SIZES)),
  type: PropTypes.oneOf(Object.values(BUTTON_TYPES)),
  onClick: PropTypes.func,
  className: PropTypes.object,
  icon: PropTypes.node,
};

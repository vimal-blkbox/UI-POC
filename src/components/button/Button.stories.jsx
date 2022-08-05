import React from 'react';
import { Button, BUTTON_SIZES, BUTTON_TYPES } from './Button';
import RoundAddIcon from 'assets/RoundAddIcon.svg';

export default {
  title: 'Primitives/Button',
  component: Button,
  argTypes: {
    type: {
      options: Object.values(BUTTON_TYPES),
      control: { type: 'select' },
    },
    size: {
      options: Object.values(BUTTON_SIZES),
      control: { type: 'select' },
    },
    className: {
      table: { disable: true },
    },
    icon: {
      table: { disable: true },
    },
    onClick: {
      table: { disable: true },
    },
    fullWidth: {
      control: {
        type: 'boolean',
      },
    },
    label: {
      control: {
        type: 'text',
      },
    },
    withIcon: {
      control: {
        type: 'boolean',
      },
    },
  },
};

export const Primary = (args) => {
  var conditionalProps = {
    icon: <RoundAddIcon />,
  };

  if (!args.withIcon) {
    conditionalProps.icon = false;
  }

  return (
    <Button {...args} {...conditionalProps}>
      {args.label}
    </Button>
  );
};

Primary.args = {
  size: BUTTON_SIZES.MEDIUM,
  type: BUTTON_TYPES.PRIMARY,
  label: 'Button',
};

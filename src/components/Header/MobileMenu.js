// @flow
import React, { type Node } from 'react';

type MobileMenuProps = {
  className?: ?string
};

export default function MobileMenu(props: MobileMenuProps): Node {
  const { className } = props;
  return (
    <div className={className}>
      Mobile Menu
    </div>
  )
}
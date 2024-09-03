import React from "react";

export const ChipsetDesigns = [
  'outlined',
  'filled'
];

export default interface ChipsetProps {
  children: React.ReactNode,
  design: string
}

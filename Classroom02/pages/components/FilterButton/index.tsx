import React from "react";

interface IFilterButton {
  key: string; 
  name: string;
  isPressed: boolean;
  setFilter(name: any): void;
}

export function FilterButton(props: IFilterButton) {
  return (
    <button
      type="button"
      className="btn toggle-btn"
      aria-pressed={props.isPressed}
      onClick={() => props.setFilter(props.name)}
    >
      <span className="visually-hidden">Show </span>
      <span>{props.name}</span>
      <span className="visually-hidden"> tasks</span>
    </button>
  );
}

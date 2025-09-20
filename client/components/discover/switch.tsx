"use client";

import React from "react";

interface SwitchProps {
  value: string | null;
  onClick: (name: string) => void;
  options?: string[];
}

export function Switch({ value, onClick, options = [] }: SwitchProps) {
  return (
    <div>
      <div className="flex">
        {options.map((name) => (
          <SwitchButton
            key={name}
            name={name}
            onClick={onClick}
            current={value}
          />
        ))}
      </div>
    </div>
  );
}

interface SwitchButtonProps {
  name: string;
  onClick: (name: string) => void;
  current: string | null;
}

function SwitchButton({ name, onClick, current }: SwitchButtonProps) {
  const selected = name === current;

  return (
    <h1
      onClick={() => onClick(name)}
      className={`border b-2 p-1 cursor-pointer ${
        selected ? "font-bold bg-red-500" : ""
      }`}
    >
      {name}
    </h1>
  );
}

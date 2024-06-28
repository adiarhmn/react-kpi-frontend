import React from 'react';

interface Props {
  children: React.ReactNode;
  title: string | React.ReactNode;
  subtitle?: string | React.ReactNode;
}

export const TitleSection: React.FC<Props> = ({ children, title, subtitle }) => {
  return (
    <div>
      <h1 className="font-semibold">title</h1>
      <div className="text-slate-400 text-xs -mt-1">Berikut daftar shift yang sudah terdaftar</div>
    </div>
  );
};

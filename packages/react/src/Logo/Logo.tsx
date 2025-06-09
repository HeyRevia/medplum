import { JSX } from 'react';

export interface LogoProps {
  readonly size: number;
  readonly fill?: string;
}

export function Logo(props: LogoProps): JSX.Element {
  return (
    <img
      src="/img/heyrevia-logo-512x512.png"
      alt="HeyRevia Logo"
      style={{
        width: props.size,
        height: props.size,
        objectFit: 'contain',
      }}
    />
  );
}

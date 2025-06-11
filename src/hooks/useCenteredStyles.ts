import { CSSProperties, useMemo } from 'react';

export interface CenteredStyles {
  containerStyle: CSSProperties;
  wrapperStyle: CSSProperties;
}

export const useCenteredStyles = (): CenteredStyles => {
  const containerStyle = useMemo<CSSProperties>(
    () => ({
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: '100%',
      height: '100%'
    }),
    []
  );

  const wrapperStyle = useMemo<CSSProperties>(
    () => ({
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'column',
      gap: '20px',
      width: '100%',
      height: '100%'
    }),
    []
  );

  return { containerStyle, wrapperStyle };
};

export default useCenteredStyles;

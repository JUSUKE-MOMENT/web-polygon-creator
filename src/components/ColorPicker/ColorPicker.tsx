import React from 'react';
import { HexColorPicker } from 'react-colorful';

interface Props {
  onChangeColor: (colorString: string) => void;
  onClose: () => void;
}

export const ColorPicker = ({ onChangeColor, onClose }: Props) => {
  const ref = React.useRef<HTMLDivElement | null>(null);

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [onClose]);

  const onChange = (changedColor: string) => {
    console.log(changedColor);
    onChangeColor(changedColor);
  };

  return (
    <div
      ref={ref}
      style={{
        position: 'absolute',
        bottom: '-210px',
        right: '-55px',
        zIndex: 9999,
        background: 'white',
        boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
        padding: '8px',
        borderRadius: '8px',
      }}>
      <HexColorPicker onChange={onChangeColor} />
    </div>
  );
};

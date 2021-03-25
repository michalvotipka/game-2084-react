import { useEffect } from 'react';
import { Direction } from '../../types';

export default function useKeypress(action: (key: Direction) => void) {
    useEffect(() => {
        function onKeyup(e: KeyboardEvent) {
            if (e.key === 'ArrowUp') return action("Up")
            if (e.key === 'ArrowDown') return action("Down")
            if (e.key === 'ArrowLeft') return action("Left")
            if (e.key === 'ArrowRight') return action("Right")
        }

        document.addEventListener('keyup', onKeyup);
        return () => document.removeEventListener('keyup', onKeyup);
      }, []);
}
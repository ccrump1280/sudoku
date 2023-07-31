import { useState } from 'react';
import { useEffect } from 'react';
import { useCallback } from 'react';

type GenericObject = {[key: string]: true | false}



export const useKeyPress = (func: (event: KeyboardEvent)=>void, target = window) => {
  // persistent "store" to track what keys are being pressed
  const [pressed, setPressed] = useState<GenericObject>({});

  // whenever a keydown event is fired ontarget element
  const onKeyDown = useCallback(
    (event: KeyboardEvent) => {
      // if key isn't already pressed, run func
      if (!pressed[event.key])
        func(event);

      // add key to store
      setPressed({ ...pressed, [event.key]: true });
    },
    [func, pressed]
  );

  // whenever a keyup event is fired on the window element
  const onKeyUp = useCallback((event: KeyboardEvent) => {
    // remove key from store
    const { [event.key]: id, ...rest } = pressed;
    setPressed(rest);
  }, [pressed]);

  useEffect(() => {
    // add listeners when component mounts/changes
    target.addEventListener('keydown', onKeyDown);
    window.addEventListener('keyup', onKeyUp);

    // cleanup/remove listeners when component unmounts/changes
    return () => {
      target.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('keyup', onKeyUp);
    };
  }, [target, onKeyDown, onKeyUp]);
};
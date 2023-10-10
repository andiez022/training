import React, { Ref } from 'react';
import Tippy, { TippyProps } from '@tippyjs/react';

const LazyTippy = React.forwardRef((props: TippyProps, ref: Ref<Element> | undefined) => {
  const [mounted, setMounted] = React.useState(false);

  const lazyPlugin = {
    fn: () => ({
      onMount: () => setMounted(true),
      onHidden: () => setMounted(false),
    }),
  };

  const computedProps = { ...props };

  computedProps.plugins = [lazyPlugin, ...(props.plugins || [])];

  computedProps.content = mounted ? props.content : '';

  return <Tippy {...computedProps} ref={ref} />;
});

export default LazyTippy;

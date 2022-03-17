const prepareClickableContainer = onClick => {
  if (!onClick) {
    return null;
  }

  const onKeyDown = event => {
    if (event.key === 'Enter') {
      onClick(event);
    }
  };

  return {
    onClick,
    onKeyDown,
    role: 'button',
    tabIndex: 0,
  };
};

export default prepareClickableContainer;

export const addClickToGlobal = props => {
  return props.dispatch(
    {
      type: 'ADD_CLICK_TO_GLOBAL',
      payload: props.body,
    }
  );
};

import useActions from "./useActions";
import { useTypedSelector } from "./useTypedSelector";

export const useStore = () => {
  const actions = useActions();
  const store = useTypedSelector((state) => state);

  return {
    actions,
    store,
  };
};

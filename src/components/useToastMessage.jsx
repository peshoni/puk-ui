/* eslint-disable react/jsx-no-undef */
import { useToasts } from 'react-toast-notifications';
//https://jossmac.github.io/react-toast-notifications/
export const ToastDemo = ({ content }) => {
  const { addToast } = useToasts();
  return (
    <Button
      onClick={() =>
        addToast(content, {
          appearance: 'info',
          autoDismiss: true,
        })
      }
    >
      Add Toast
    </Button>
  );
};

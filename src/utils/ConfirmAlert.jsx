import { confirmAlert } from "react-confirm-alert";

export const generateConfirm = (
  title = "",
  message = "",
  id = "",
  yesFunc = () => {}
) => {
  confirmAlert({
    title,
    message,
    id,
    buttons: [
      {
        label: "Yes",
        onClick: yesFunc,
      },
      {
        label: "No",
        onClick: () => {},
      },
    ],
  });
};

// confirm alert for  imported Users

export const generateUsersConfirm = (
  title = "",
  message = "",
  yesFunc = () => {}
) => {
  confirmAlert({
    title,
    message,
    buttons: [
      {
        label: "Confirm",
        onClick: yesFunc,
      },
      {
        label: "Cancel",
        onClick: () => {},
      },
    ],
    overlayClassName: "custom-alert",
  });
};

export const noUniqueUsersConfirm = (
  title = "",
  message = "",
  yesFunc = () => {}
) => {
  confirmAlert({
    title,
    message,
    buttons: [
      {
        label: "Okay",
      },
    ],
    overlayClassName: "no-users-alert",
  });
};

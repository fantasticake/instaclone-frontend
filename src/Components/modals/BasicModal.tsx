import ReactModal from "react-modal";
import { useTheme } from "styled-components";

const BasicModal = ({
  isOpen,
  onClose,
  contentElement,
}: {
  isOpen: boolean;
  onClose: any;
  contentElement: any;
}) => {
  const theme = useTheme();
  return (
    <ReactModal
      style={{
        overlay: {
          zIndex: 1,
          backgroundColor: theme.colors.blurryBackgroundColor,
        },
        content: {
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          backgroundColor: theme.colors.backgroundColor,
          borderRadius: "18px",
          padding: "0px",
        },
      }}
      isOpen={isOpen}
      onRequestClose={onClose}
      contentElement={contentElement}
    />
  );
};

export default BasicModal;

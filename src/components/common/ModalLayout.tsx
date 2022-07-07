import {
  Button,
  Flex,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Spacer,
} from "@chakra-ui/react";

interface ModalLayoutProps {
  isOpen: boolean;
  onClose: any;
  children: any;
  [restProps: string]: any;
}

export default function ModalLayout(props: ModalLayoutProps) {
  const { isOpen, onClose, children, ...restProps } = props;
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      isCentered
      closeOnOverlayClick={true}
      closeOnEsc={false}
    >
      <ModalOverlay backdropFilter="blur(3px) !important;" />
      <ModalContent {...restProps}>{children}</ModalContent>
    </Modal>
  );
}

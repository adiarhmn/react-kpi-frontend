import { Modal, Button } from '@mantine/core';

interface ModalDeleteProps {
  opened: boolean;
  onClose: () => void;
  confirm: () => void;
  children: React.ReactNode;
}

export const ModalDelete: React.FC<ModalDeleteProps> = (props) => {
  return (
    <>
      <Modal opened={props.opened} onClose={close} title="Authentication" centered>
        {props.children}
        <div className="mt-5">
          <Button variant="light" onClick={props.onClose}>
            Cancel
          </Button>
          <Button variant="filled" onClick={props.confirm} color="red" className="ml-5">
            Delete
          </Button>
        </div>
      </Modal>
    </>
  );
};

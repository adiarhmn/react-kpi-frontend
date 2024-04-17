import { Button, Modal } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';

export const ScheduleAdmin: React.FC = () => {
  const [opened, { open, close }] = useDisclosure(false);
  return (
    <main>
      asdkj
      <Modal opened={opened} onClose={close} title="Authentication">
        {/* Modal content */}
        asdasdg
      </Modal>
      <Button onClick={open}>Open modal</Button>
    </main>
  );
};

import { Group, Modal, NativeSelect, Stack, TextInput } from '@mantine/core';
import { showNotification } from '@mantine/notifications';
import { deepClone, normalizeErrorString, WithId } from '@medplum/core';
import { UserConfiguration } from '@medplum/fhirtypes';
import { useMedplum } from '@medplum/react-hooks';
import { JSX } from 'react';
import { Form } from '../Form/Form';
import { SubmitButton } from '../Form/SubmitButton';

interface BookmarkDialogProps {
  readonly pathname: string;
  readonly searchParams: URLSearchParams;
  readonly visible: boolean;
  readonly onOk: () => void;
  readonly onCancel: () => void;
}
export function BookmarkDialog(props: BookmarkDialogProps): JSX.Element | null {
  const medplum = useMedplum();
  const config = medplum.getUserConfiguration() as WithId<UserConfiguration>;

  function submitHandler(formData: Record<string, string>): void {
    const { menuname, bookmarkname: name } = formData;
    const target = `${props.pathname}?${props.searchParams.toString()}`;
    const newConfig = deepClone(config);
    const menu = newConfig.menu?.find(({ title }) => title === menuname);

    menu?.link?.push({ name, target });
    medplum
      .updateResource(newConfig)
      .then((res) => {
        // refresh current config menu
        config.menu = res.menu;
        medplum.dispatchEvent({ type: 'change' });
        showNotification({ color: 'green', message: 'Success' });
        props.onOk();
      })
      .catch((err: any) => {
        showNotification({ color: 'red', message: normalizeErrorString(err) });
      });
  }

  return (
    <Modal
      title="Add Bookmark"
      closeButtonProps={{ 'aria-label': 'Close' }}
      opened={props.visible}
      onClose={props.onCancel}
    >
      <Form onSubmit={submitHandler}>
        <Stack>
          <SelectMenu config={config}></SelectMenu>
          <TextInput label="Bookmark Name" type="text" name="bookmarkname" placeholder="Bookmark Name" withAsterisk />
          <Group justify="flex-end">
            <SubmitButton mt="sm">OK</SubmitButton>
          </Group>
        </Stack>
      </Form>
    </Modal>
  );
}

interface SelectMenuProps {
  readonly config: UserConfiguration | undefined;
}

function SelectMenu(props: SelectMenuProps): JSX.Element {
  function userConfigToMenu(config: UserConfiguration | undefined): string[] {
    return config?.menu?.map((menu) => menu.title) as [];
  }
  const menus = userConfigToMenu(props.config);

  return <NativeSelect name="menuname" defaultValue={menus[0]} label="Select Menu Option" data={menus} withAsterisk />;
}

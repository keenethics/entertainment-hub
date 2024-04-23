'use client';

import { Switch } from '@mui/material';
import {
  Datagrid,
  List,
  TextField,
  WrapperField,
  useNotify,
  useRecordContext,
  useRedirect,
  useRefresh,
  useUpdate,
} from 'react-admin';

import { useCallback } from 'react';
import { LinkTextField } from '../LinkTextField';
import { UpDownArrowMenu } from '../UpDownArrowMenu';

function PriorityModifier() {
  const record = useRecordContext();
  const [update, { isLoading, error }] = useUpdate('activityType');
  const refresh = useRefresh();
  const notify = useNotify();

  const handleError = queryError => {
    notify(`Cannot update\nError: ${queryError.message}`, { type: 'error' });
  };

  const handleChange = diff => () => {
    const isDiffPositive = diff > 0;
    update(
      'activityType',
      { id: record.id, data: { priority: record.priority + diff }, previousData: record },
      {
        onSuccess: () => {
          notify(`Priority ${isDiffPositive ? 'increased' : 'decreased'}`);
          refresh();
        },
        onError: handleError,
      },
    );
  };

  if (error) {
    return handleError(error);
  }

  return (
    <UpDownArrowMenu onIncrease={handleChange(+1)} onDecrease={handleChange(-1)} disabled={isLoading}>
      {Number.isInteger(record.priority) ? <TextField label="Priority" source="priority" /> : '-'}
    </UpDownArrowMenu>
  );
}

function ActiveStatusToggle() {
  const notify = useNotify();
  const refresh = useRefresh();
  const record = useRecordContext();
  const [update, { isLoading, error }] = useUpdate('activityType');

  const handleError = queryError => {
    notify(`Cannot update\nError: ${queryError.message}`, { type: 'error' });
  };

  if (isLoading) {
    return null;
  }

  if (error) {
    return handleError(error);
  }

  function handleSwitch() {
    update(
      'activityType',
      { id: record.id, data: { isActive: !record.isActive }, previousData: record },
      {
        onSuccess: () => {
          refresh();
          notify(`Record updated successfully`);
        },
        onError: handleError,
      },
    );
  }

  return <Switch disabled={isLoading} checked={record.isActive} onChange={handleSwitch} />;
}

export function ActivityTypeList() {
  const redirect = useRedirect();

  const redirectToEdit = useCallback(
    id => {
      redirect(`/activityType/${id}/edit`);
    },
    [redirect],
  );

  // rowClick is not set in DataGrid(to prevent redirect on toggle, etc...), so we need to redirect manually
  return (
    <List>
      <Datagrid>
        <LinkTextField source="id" label="ID" onClick={redirectToEdit} />
        <WrapperField source="priority" label="Priority">
          <PriorityModifier />
        </WrapperField>
        <WrapperField source="isActive" label="Active">
          <ActiveStatusToggle />
        </WrapperField>
        <TextField label="Type" source="type" />
        <TextField label="Title" source="title" />
        <TextField label="Description" source="description" />
        <TextField label="Path to image" source="imagePath" />
      </Datagrid>
    </List>
  );
}

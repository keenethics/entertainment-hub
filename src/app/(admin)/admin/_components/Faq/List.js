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
import { FAQ_PRIORITY_CHANGE_STEP } from '@/lib/consts';
import { LinkTextField } from '../LinkTextField';
import { UpDownArrowMenu } from '../UpDownArrowMenu';
import { MAX_ACTIVE_FAQS, MIN_ACTIVE_FAQS } from './consts';
import { useActiveFaqs } from './hooks';

function PriorityModifier() {
  const record = useRecordContext();
  const [update, { isLoading, error }] = useUpdate('faq');
  const refresh = useRefresh();
  const notify = useNotify();

  const handleError = queryError => {
    notify(`Cannot update data\nError: ${queryError.message}`, { type: 'error' });
  };

  const handleChange = diff => () => {
    const isDiffPositive = diff > 0;
    update(
      'Faq',
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
    <UpDownArrowMenu
      onIncrease={handleChange(FAQ_PRIORITY_CHANGE_STEP)}
      onDecrease={handleChange(-FAQ_PRIORITY_CHANGE_STEP)}
      disabled={isLoading}
    >
      {record.priority ? <TextField source="priority" /> : '-'}
    </UpDownArrowMenu>
  );
}

function ActiveStatusToggle() {
  const notify = useNotify();
  const record = useRecordContext();
  const [update, { isLoading, error }] = useUpdate('faq');
  const { total: activeFaqsCount, isLoading: isLoadingActiveFaqs, error: faqsLoadingError } = useActiveFaqs();
  const refresh = useRefresh();

  const handleError = queryError => {
    notify(`Cannot update data\nError: ${queryError.message}`, { type: 'error' });
  };

  if (isLoadingActiveFaqs || faqsLoadingError) {
    return null;
  }

  function handleSwitch() {
    const isTryingToActivate = !record.isActive;
    const isTryingToDeactivate = record.isActive;

    if (isTryingToActivate && activeFaqsCount >= MAX_ACTIVE_FAQS) {
      return notify(`Too many active questions (${MAX_ACTIVE_FAQS} max). Please deactivate some of them.`, {
        type: 'error',
      });
    }

    if (isTryingToDeactivate && activeFaqsCount <= MIN_ACTIVE_FAQS) {
      return notify(`At least ${MIN_ACTIVE_FAQS} questions should be active.`, { type: 'error' });
    }

    return update(
      'Faq',
      { id: record.id, data: { isActive: !record.isActive }, previousData: record },
      {
        onSuccess: () => {
          refresh();
          notify(`Data updated successfully`);
        },
        onError: handleError,
      },
    );
  }

  if (error) {
    return handleError(error);
  }

  return <Switch disabled={isLoading} checked={record.isActive} onChange={handleSwitch} />;
}

export function FaqList() {
  const redirect = useRedirect();

  const redirectToEdit = useCallback(
    id => {
      redirect(`/Faq/${id}/edit`);
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
        <LinkTextField source="question" label="Question" onClick={redirectToEdit} />
        <LinkTextField source="answer" label="Answer" onClick={redirectToEdit} />
      </Datagrid>
    </List>
  );
}

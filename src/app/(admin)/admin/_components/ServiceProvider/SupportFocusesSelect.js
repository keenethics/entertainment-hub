'use client';

import {
  ArrayInput,
  AutocompleteArrayInput,
  AutocompleteInput,
  FormDataConsumer,
  NumberInput,
  ReferenceArrayInput,
  ReferenceInput,
  SimpleFormIterator,
  required,
  useGetList,
} from 'react-admin';
import { RESOURCES } from '@admin/_lib/consts';
import { useFormContext, useWatch } from 'react-hook-form';
import PropTypes from 'prop-types';
import { useCallback } from 'react';
import { activityTypePropType } from '@admin/_lib/specialistPropTypes';

function SupportFocusesForm({ getSource, supportFocuses, selectedActivityTypes, requestsIds, loading }) {
  const { setValue } = useFormContext();

  const activityTypeSource = getSource('activityType.id');
  const activityTypeIndex = Number(activityTypeSource.split('.')[1]);

  const resetRequests = useCallback(
    (_, record) => {
      const newCuts = supportFocuses.map((focus, i) => {
        if (i !== activityTypeIndex) {
          return focus;
        }

        return { ...focus, activityType: record, requestsIds: [] };
      });
      setValue('supportFocuses', newCuts);
    },
    [setValue, supportFocuses, activityTypeIndex],
  );

  return (
    <>
      <ReferenceInput
        source={getSource('activityType.id')}
        filter={{ id: { notIn: selectedActivityTypes } }}
        reference="Activity type"
        validate={required()}
        fullWidth
      >
        <AutocompleteInput
          isLoading={loading}
          optionText="title"
          optionValue="id"
          label="Activity type"
          validate={required()}
          onChange={resetRequests}
          fullWidth
        />
      </ReferenceInput>
      <NumberInput fullWidth source={getSource('price')} label="Price of activity from X UAH/hour" />
      <ReferenceArrayInput
        source={getSource('requestsIds')}
        reference="Request"
        filter={{ id: { in: requestsIds } }}
        sort={{ field: 'name', order: 'ASC' }}
        perPage={1000}
      >
        <AutocompleteArrayInput
          isLoading={loading}
          label="Requests that can be satisfied with this activity type"
          fullWidth
          optionText="name"
          optionValue="id"
        />
      </ReferenceArrayInput>
    </>
  );
}

SupportFocusesForm.propTypes = {
  getSource: PropTypes.func,
  supportFocuses: activityTypePropType,
  selectedActivityTypes: PropTypes.arrayOf(PropTypes.string),
  requestsIds: PropTypes.arrayOf(PropTypes.string),
  loading: PropTypes.bool,
};

export function SupportFocusesSelect() {
  const { data: activityTypesList, isLoading: activityTypesLoading } = useGetList(RESOURCES.activityType);

  const supportFocuses = useWatch({ name: 'supportFocuses' });

  const selectedActivityTypesIds =
    supportFocuses?.map(focus => focus.activityType && focus.activityType.id).filter(Boolean) ?? [];

  const activityTypeRequestsIds = useCallback(
    activityTypeId =>
      activityTypesList.find(activityType => activityType.id === activityTypeId)?.requests.map(request => request.id) ||
      [],
    [activityTypesList],
  );

  const selectedAllTerapies = supportFocuses?.length === activityTypesList?.length;
  return (
    <ArrayInput source="supportFocuses" isLoading={activityTypesLoading} label="Типи терапій">
      <SimpleFormIterator fullWidth disableReordering={true} disableAdd={selectedAllTerapies}>
        <FormDataConsumer>
          {({ scopedFormData, getSource }) => {
            if (!scopedFormData) return null;
            return (
              <SupportFocusesForm
                getSource={getSource}
                supportFocuses={supportFocuses}
                selectedActivityTypes={selectedActivityTypesIds}
                requestsIds={activityTypeRequestsIds(scopedFormData?.activityType?.id || '')}
                loading={activityTypesLoading}
              />
            );
          }}
        </FormDataConsumer>
      </SimpleFormIterator>
    </ArrayInput>
  );
}

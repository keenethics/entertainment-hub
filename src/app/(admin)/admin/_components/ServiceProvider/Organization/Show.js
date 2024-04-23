import React from 'react';

import {
  ArrayField,
  BooleanField,
  ChipField,
  Datagrid,
  DateField,
  FunctionField,
  NumberField,
  Show,
  SimpleShowLayout,
  SingleFieldList,
  TextField,
  WrapperField,
} from 'react-admin';
import { WorkTimeShow } from '@admin/components/ServiceProvider/WorkTimeShow';

export function OrganizationShow() {
  return (
    <Show>
      <SimpleShowLayout>
        <ArrayField label="Experts specializations" source="expertSpecializations">
          <SingleFieldList linkType={false}>
            <ChipField source="name" size="small" />
          </SingleFieldList>
        </ArrayField>
        <ArrayField label="Organization type" source="type">
          <SingleFieldList linkType={false}>
            <ChipField source="name" size="small" />
          </SingleFieldList>
        </ArrayField>
        <ArrayField label="Works with such clients" source="clientsWorkingWith">
          <SingleFieldList linkType={false}>
            <ChipField source="name" size="small" />
          </SingleFieldList>
        </ArrayField>
        <ArrayField label="Do not wirk with such clients" source="clientsNotWorkingWith">
          <SingleFieldList linkType={false}>
            <ChipField source="name" size="small" />
          </SingleFieldList>
        </ArrayField>
        <TextField label="Name" source="name" />
        <BooleanField label="Inclusive space" source="isInclusiveSpace" />
        <TextField label="Ownership" source="ownershipType" />
        <DateField label="Record creation date" showTime source="createdAt" />
        <NumberField label="Years on market" source="yearsOnMarket" />
        <TextField label="Format of work" source="formatOfWork" />
        <ArrayField label="Working addresses" source="addresses">
          <Datagrid bulkActionButtons={false}>
            <TextField label="Full address" source="fullAddress" />
            <TextField label="Name" source="nameOfClinic" />
            <TextField label="District" source="district.name" />
            <BooleanField label="Is primary" source="isPrimary" />
            <FunctionField
              source="location"
              render={record => (
                <a
                  className="text-primary-500"
                  target="_blank"
                  rel="noreferrer"
                  href={`https://www.google.com/maps/search/?api=1&query=${record.latitude},${record.longitude}`}
                >
                  Google Maps location
                </a>
              )}
              label="On the map"
            />
          </Datagrid>
        </ArrayField>
        <WrapperField label="Working time">
          <WorkTimeShow />
        </WrapperField>
        <ArrayField label="Activity types" source="supportFocuses">
          <Datagrid bulkActionButtons={false}>
            <TextField label="Type" source="activityType.title" />
            <TextField label="Price" source="price" />
            <ArrayField label="Requests" source="requests">
              <SingleFieldList linkType={false} className="p-3">
                <ChipField source="name" size="small" />
              </SingleFieldList>
            </ArrayField>
          </Datagrid>
        </ArrayField>
        <BooleanField label="Free reception" source="isFreeReception" />
        <BooleanField label="Active" source="isActive" />
        <TextField label="Description" source="description" />
        <TextField label="Phone number" source="phone" />
        <TextField source="email" />
        <TextField label="Website" source="website" />
        <TextField label="Instagram" source="instagram" />
        <TextField label="Facebook" source="facebook" />
        <TextField label="YouTube" source="youtube" />
        <TextField label="LinkedIn" source="linkedin" />
        <TextField label="TikTok" source="tiktok" />
        <TextField label="Viber" source="viber" />
        <TextField label="Telegram" source="telegram" />
      </SimpleShowLayout>
    </Show>
  );
}

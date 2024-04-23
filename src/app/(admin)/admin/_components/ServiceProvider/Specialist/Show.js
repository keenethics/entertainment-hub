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

export function SpecialistShow() {
  return (
    <Show>
      <SimpleShowLayout>
        <ArrayField label="Specializations" source="specializations">
          <SingleFieldList linkType={false}>
            <ChipField source="name" size="small" />
          </SingleFieldList>
        </ArrayField>
        <ArrayField label="Works with such clients" source="clientsWorkingWith">
          <SingleFieldList linkType={false}>
            <ChipField source="name" size="small" />
          </SingleFieldList>
        </ArrayField>
        <ArrayField label="Does not work with such clients" source="clientsNotWorkingWith">
          <SingleFieldList linkType={false}>
            <ChipField source="name" size="small" />
          </SingleFieldList>
        </ArrayField>
        <ArrayField label="Methods" source="specializationMethods">
          <SingleFieldList linkType={false}>
            <ChipField source="title" size="small" />
          </SingleFieldList>
        </ArrayField>
        <TextField label="First name" source="firstName" />
        <TextField label="Last name" source="lastName" />
        <TextField label="Surname" source="surname" />
        <TextField label="Gender" source="gender" />
        <DateField showTime label="Record creation date" source="createdAt" />
        <NumberField label="Years of experience" source="yearsOfExperience" />
        <TextField label="Format of work" source="formatOfWork" />
        <ArrayField label="Addresses" source="addresses">
          <Datagrid bulkActionButtons={false}>
            <TextField label="Full address" source="fullAddress" />
            <TextField label="Name of office" source="nameOfClinic" />
            <TextField label="District" source="district.name" />
            <BooleanField label="Is primary address" source="isPrimary" />
            <FunctionField
              source="location"
              render={record => (
                <a
                  className="text-primary-500"
                  target="_blank"
                  rel="noreferrer"
                  href={`https://www.google.com/maps/search/?api=1&query=${record.latitude},${record.longitude}`}
                >
                  Google maps location
                </a>
              )}
              label="On the map"
            />
          </Datagrid>
        </ArrayField>
        <WrapperField label="Work time">
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

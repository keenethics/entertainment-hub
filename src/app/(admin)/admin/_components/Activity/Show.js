import {
  ArrayField,
  ChipField,
  DateField,
  SimpleShowLayout,
  SingleFieldList,
  TextField,
  Show,
  BooleanField,
  NumberField,
} from 'react-admin';

export function ActivityTypeShow() {
  return (
    <Show>
      <SimpleShowLayout>
        <TextField label="Type" source="title" />
        <TextField label="Description" source="description" />
        <TextField label="Image path" source="imagePath" />
        <NumberField label="Priority" source="priority" />
        <NumberField label="Request count" source="_count.requests" />
        <ArrayField label="Requests" source="requests">
          <SingleFieldList linkType={false}>
            <ChipField source="name" size="small" />
          </SingleFieldList>
        </ArrayField>
        <BooleanField label="Active" source="isActive" />
        <DateField showTime label="Record creation date" source="createdAt" />
      </SimpleShowLayout>
    </Show>
  );
}

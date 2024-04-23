import { ArrayField, BooleanField, Datagrid, TextField } from 'react-admin';

export function WorkTimeShow() {
  return (
    <ArrayField label="Work schedule" source="workTime">
      <Datagrid empty="Not defined" title="Work schedule" bulkActionButtons={false}>
        <TextField label="Day" source="weekDay" />
        <TextField label="Time" source="time" />
        <BooleanField label="Day off" source="isDayOff" />
      </Datagrid>
    </ArrayField>
  );
}

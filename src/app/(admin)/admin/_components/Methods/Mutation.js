import {
  Create,
  Edit,
  SelectInput,
  SimpleForm,
  TextInput,
  required,
  useDataProvider,
  useRecordContext,
  DeleteWithConfirmButton,
  SaveButton,
  Toolbar,
} from 'react-admin';
import { RESOURCES } from '@admin/_lib/consts';

function TitleInput() {
  const record = useRecordContext();
  const dataProvider = useDataProvider();
  const isDuplicate = async value => {
    // we need this to return undefined to prevent error in case when we are
    // on edit page and title didn't change
    if (record?.title === value) {
      return;
    }
    const { data: method } = await dataProvider.getList(RESOURCES.method, { filter: { title_eq: value } });
    // eslint-disable-next-line consistent-return
    if (method?.length) return 'This method already exists';
  };
  return <TextInput label="Name" source="title" validate={[required('Required field'), isDuplicate]} />;
}

export function FormBase() {
  return (
    <>
      <TitleInput />
      <TextInput label="Description" source="description" multiline fullWidth />
    </>
  );
}

export function MethodsCreate() {
  return (
    <Create
      redirect="list"
      transform={data => ({ ...data, specialization: { connect: { name: data.specialization } } })}
    >
      <SimpleForm>
        <SelectInput
          source="specialization"
          required
          label="Specialization"
          choices={['Psychologist', 'Doctor'].map(entry => ({ id: entry, name: entry }))}
        />
        <FormBase />
      </SimpleForm>
    </Create>
  );
}

function CustomToolbar() {
  return (
    <Toolbar className="flex justify-between">
      <SaveButton />
      <DeleteWithConfirmButton
        confirmContent="Are you sure?"
        confirmTitle="This data will be removed from the database."
        confirmColor="warning"
        label="Delete"
      />
    </Toolbar>
  );
}
export function MethodsEdit() {
  return (
    <Edit redirect="list">
      <SimpleForm toolbar={<CustomToolbar />}>
        <FormBase />
      </SimpleForm>
    </Edit>
  );
}

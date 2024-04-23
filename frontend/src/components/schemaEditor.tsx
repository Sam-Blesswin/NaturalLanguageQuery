interface SchemaEditorProps {
  schema: string;
  setSchema: (schema: string) => void;
}

const SchemaEditor = ({ schema, setSchema }: SchemaEditorProps) => {
  return (
    <div>
      <textarea
        value={schema}
        onChange={(e) => setSchema(e.target.value)}
        rows={50}
        cols={50}
        placeholder=
        'Sample Schema Structure: 
        [
            {
                "tablename": "Employee",
                "fields": [
                    {
                        "name": "employee_id",
                        "type": "INT"
                    },
                    {
                        "name": "first_name",
                        "type": "VARCHAR(50)"
                    },
                ]
            }
        ],
        '
      />
    </div>
  );
};

export default SchemaEditor;

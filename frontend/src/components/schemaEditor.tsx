interface SchemaEditorProps {
  schema: string;
  setSchema: (schema: string) => void;
}

const SchemaEditor = ({ schema, setSchema }: SchemaEditorProps) => {
  return (
    <div className="rounded-lg shadow-lg p-4 bg-white">
      <h2 className="text-lg md:text-xl font-semibold text-gray-800 mb-4">
        Schema Editor
      </h2>
      <textarea
        className="w-full p-3 text-sm text-gray-700 border rounded-lg focus:ring-blue-500 focus:border-blue-500 block transition duration-300 ease-in-out h-96 overflow-auto"
        value={schema}
        onChange={(e) => setSchema(e.target.value)}
        placeholder={`Sample Schema Structure:\n[\n    {\n        "tablename": "Employee",\n        "fields": [\n            {\n                "name": "employee_id",\n                "type": "INT"\n            },\n            {\n                "name": "first_name",\n                "type": "VARCHAR(50)"\n            }\n        ]\n    }\n],`}
      />
    </div>
  );
};

export default SchemaEditor;

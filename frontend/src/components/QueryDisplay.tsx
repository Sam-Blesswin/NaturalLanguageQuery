interface QueryDisplayProp {
  query: string;
}

const QueryDisplay = ({ query }: QueryDisplayProp) => {
  return (
    <div>
      <div>Generated Query:</div>
      <div>{query}</div>
    </div>
  );
};

export default QueryDisplay;

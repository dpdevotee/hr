interface TableRowProps {
  columns: Array<string>,
  data: object,
}


function TableRow(props: TableRowProps) {
  const cells = props.columns.map(
    (col) => { return <td>{props.data[col as keyof typeof props.data]}</td> }
  );
  return (
    <tr>
      {cells}
    </tr>
  );
}

interface TableProps {
  headers: Array<string>,
  columns: Array<string>,
  data: Array<object>,
  keyName: string,
}

function Table(props: TableProps) {
  const tableHeader = props.headers.map(
    (item) => { return <th>{item}</th> }
  );
  const tableRows = props.data.map(
    (row) => {
      return <TableRow columns={props.columns}
        data={row}
        key={row[props.keyName as keyof typeof row]}
      />
    }
  );

  return (
    <table className="table">
      <thead>
        <tr>
          {tableHeader}
        </tr>
      </thead>
      <tbody>
        {tableRows}
      </tbody>
    </table>
  );
}

export default Table;

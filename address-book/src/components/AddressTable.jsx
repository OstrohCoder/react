import AddressTableRowItem from "./AddressTableRowItem";

const AddressTable = ({ books, loading, onUpdate, onDelete }) => {
  if (!books.length) {
    return <div>No data to display.</div>;
  }

  return (
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>First name</th>
          <th>Last name</th>
          <th>Phone</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {books.map((book) => (
          <AddressTableRowItem
            key={book.id}
            bookItem={book}
            loading={loading}
            onUpdate={onUpdate}
            onDelete={onDelete}
          />
        ))}
      </tbody>
    </table>
  );
};

export default AddressTable;

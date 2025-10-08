import useAddressBook from "../hooks/useAddressBook";
import AddAddressForm from "./AddAddressForm";
import AddressTable from "./AddressTable";
import SearchBar from "./SearchBar";

const AddressContainer = () => {
  const { books, loading, error, addBook, updateBook, deleteBook, search } =
    useAddressBook();

  return (
    <div>
      <h2>Address Book</h2>
      {error && <div style={{ color: "red" }}>Error: {error}</div>}
      
      <SearchBar onSearch={search} />
      <AddAddressForm onSubmit={addBook} loading={loading} />
      <AddressTable
        books={books}
        loading={loading}
        onUpdate={updateBook}
        onDelete={deleteBook}
      />
    </div>
  );
};

export default AddressContainer;

import { useState, useRef } from "react";

const AddressTableRowItem = ({ bookItem, loading, onUpdate, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editValues, setEditValues] = useState(bookItem);
  const [error, setError] = useState("");
  const clickedRowId = useRef(null);
  const [actionType, setActionType] = useState(null);

  const handleSave = async () => {
    if (!editValues.firstName || !editValues.lastName || !editValues.phone) {
      setError("All fields are required");
      return;
    }
    setError("");
    setActionType("save");
    clickedRowId.current = bookItem.id;
    await onUpdate(bookItem.id, editValues);
    setIsEditing(false);
    setActionType(null);
  };

  const handleDelete = async () => {
    setActionType("delete");
    clickedRowId.current = bookItem.id;
    await onDelete(bookItem.id);
    setActionType(null);
  };

  const isThisRowLoading =
    loading && clickedRowId.current === bookItem.id;

  return (
    <tr>
      <td>{bookItem.id}</td>
      <td>
        {isEditing ? (
          <input
            value={editValues.firstName}
            onChange={(e) =>
              setEditValues({ ...editValues, firstName: e.target.value })
            }
          />
        ) : (
          bookItem.firstName
        )}
      </td>
      <td>
        {isEditing ? (
          <input
            value={editValues.lastName}
            onChange={(e) =>
              setEditValues({ ...editValues, lastName: e.target.value })
            }
          />
        ) : (
          bookItem.lastName
        )}
      </td>
      <td>
        {isEditing ? (
          <input
            value={editValues.phone}
            onChange={(e) =>
              setEditValues({ ...editValues, phone: e.target.value })
            }
          />
        ) : (
          bookItem.phone
        )}
      </td>
      <td>
        {isEditing ? (
          <>
            <button onClick={handleSave} disabled={loading}>
              {isThisRowLoading && actionType === "save"
                ? "Saving..."
                : "Save"}
            </button>
            <button onClick={() => setIsEditing(false)} disabled={loading}>
              Cancel
            </button>
          </>
        ) : (
          <>
            <button onClick={() => setIsEditing(true)} disabled={loading}>
              Edit
            </button>
            <button onClick={handleDelete} disabled={loading}>
              {isThisRowLoading && actionType === "delete"
                ? "Deleting..."
                : "Delete"}
            </button>
          </>
        )}
      </td>
      {error && <td style={{ color: "red" }}>{error}</td>}
    </tr>
  );
};

export default AddressTableRowItem;

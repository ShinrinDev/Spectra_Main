import React, { useState, useEffect } from "react";
import {
  getFirestore,
  collection,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { getAuth, deleteUser } from "firebase/auth";

export function UserManagement() {
  const [users2, setUsers2] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [editingUser, setEditingUser] = useState(null);
  const [deletingUser, setDeletingUser] = useState(null);
  const [deleteConfirmation, setDeleteConfirmation] = useState("");

  const firestore = getFirestore();
  const auth = getAuth();

  // Fetch users from Firestore
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const querySnapshot = await getDocs(collection(firestore, "suser"));
        const userList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setUsers2(userList);
      } catch (error) {
        console.error("Error fetching users: ", error);
      }
    };

    fetchUsers();
  }, [firestore]);

  // Toggle user status
  const handleToggleStatus = async (id) => {
    try {
      const userRef = doc(firestore, "suser", id);
      const user = users2.find((user) => user.id === id);

      if (user) {
        const newStatus = user.status === "active" ? "inactive" : "active";

        // Update Firestore
        await updateDoc(userRef, { status: newStatus });

        // Update local state
        setUsers2(
          users2.map((u) =>
            u.id === id ? { ...u, status: newStatus } : u
          )
        );
      }
    } catch (error) {
      console.error("Error toggling status:", error);
    }
  };

  // Handle delete user
  const handleDeleteUser = async () => {
    if (deletingUser && deleteConfirmation === deletingUser.name) {
      try {
        const userRef = doc(firestore, "suser", deletingUser.id);

        // Delete from Firestore
        await deleteDoc(userRef);

        // Delete from Authentication
       /* const authUser = auth.currentUser;
        if (authUser && authUser.uid === deletingUser.id) {
          await deleteUser(authUser);
        }*/

        // Update local state
        setUsers2(users2.filter((user) => user.id !== deletingUser.id));
        setDeletingUser(null);
        setDeleteConfirmation("");
      } catch (error) {
        console.error("Error deleting user:", error);
      }
    }
  };

  // Handle save changes for editing
  const handleSaveChanges = async () => {
    try {
      if (editingUser) {
        const userRef = doc(firestore, "suser", editingUser.id);

        // Update Firestore
        await updateDoc(userRef, {
          name: editingUser.name,
          role: editingUser.role,
        });

        // Update local state
        setUsers2(
          users2.map((u) =>
            u.id === editingUser.id
              ? { ...u, name: editingUser.name, role: editingUser.role }
              : u
          )
        );

        setEditingUser(null);
      }
    } catch (error) {
      console.error("Error saving changes:", error);
    }
  };

  // Filtered users based on search term
  const filteredUsers = users2.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-white dark:bg-gray-900 text-black dark:text-white">
      <h2 className="text-2xl font-bold mb-4">User Management</h2>
      <div className="flex justify-between mb-4">
        <input
          type="text"
          placeholder="Search users..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="px-3 py-2 border rounded-md bg-white dark:bg-gray-700 placeholder-gray-500 dark:placeholder-[#fad949] text-black dark:text-white"
        />
      </div>
      <table className="min-w-full bg-white dark:bg-gray-900">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">Names</th>
            <th className="py-2 px-4 border-b">Email</th>
            <th className="py-2 px-4 border-b">Role</th>
            <th className="py-2 px-4 border-b">Status</th>
            <th className="py-2 px-4 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map((user) => (
            <tr key={user.id}>
              <td className="py-2 px-4 border-b">{user.name}</td>
              <td className="py-2 px-4 border-b">{user.email}</td>
              <td className="py-2 px-4 border-b">{user.role}</td>
              <td className="py-2 px-4 border-b">
                <button
                  onClick={() => handleToggleStatus(user.id)}
                  className={`px-2 py-1 rounded ${
                    user.status === "active"
                      ? "bg-green-500 text-white"
                      : "bg-red-500 text-white"
                  }`}
                >
                  {user.status}
                </button>
              </td>
              <td className="py-2 px-4 border-b">
                <button
                  onClick={() => setEditingUser(user)}
                  className="bg-yellow-500 text-white px-2 py-1 rounded mr-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => setDeletingUser(user)}
                  className="bg-red-500 text-white px-2 py-1 rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Edit User Form */}
      {editingUser && (
        <div className="mt-4">
          <h3 className="text-xl font-bold mb-2">Edit User</h3>
          <div className="space-y-2">
            <input
              type="text"
              value={editingUser.name || ""}
              onChange={(e) =>
                setEditingUser({ ...editingUser, name: e.target.value })
              }
              className="w-full px-3 py-2 border rounded-md bg-white dark:bg-gray-700 text-black dark:text-white"
            />
            <select
              value={editingUser.role || ""}
              onChange={(e) =>
                setEditingUser({ ...editingUser, role: e.target.value })
              }
              className="w-full px-3 py-2 border rounded-md bg-white dark:bg-gray-700 text-black dark:text-white"
            >
              <option value="Admin">Admin</option>
              <option value="Editor">Editor</option>
              <option value="Viewer">Viewer</option>
            </select>
            <div className="flex space-x-2">
              <button
                onClick={handleSaveChanges}
                className="bg-blue-500 text-white px-4 py-2 rounded-md"
              >
                Save Changes
              </button>
              <button
                onClick={() => setEditingUser(null)}
                className="bg-gray-500 text-white px-4 py-2 rounded-md"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deletingUser && (
        <div className="mt-4 bg-gray-100 dark:bg-gray-800 p-4 rounded">
          <h3 className="text-xl font-bold mb-2">
            Confirm Deletion of {deletingUser.name}
          </h3>
          <p>
            Please type <strong>{deletingUser.name}</strong> to confirm deletion.
          </p>
          <input
            type="text"
            value={deleteConfirmation}
            onChange={(e) => setDeleteConfirmation(e.target.value)}
            className="w-full px-3 py-2 border rounded-md bg-white dark:bg-gray-700 text-black dark:text-white"
          />
          <div className="flex space-x-2 mt-2">
            <button
              onClick={handleDeleteUser}
              className="bg-red-500 text-white px-4 py-2 rounded-md"
              disabled={deleteConfirmation !== deletingUser.name}
            >
              Confirm Delete
            </button>
            <button
              onClick={() => {
                setDeletingUser(null);
                setDeleteConfirmation("");
              }}
              className="bg-gray-500 text-white px-4 py-2 rounded-md"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

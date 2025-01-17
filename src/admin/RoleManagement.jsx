import React, { useState,useEffect } from 'react';
import {
  getFirestore,
  collection,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { getAuth, deleteUser } from "firebase/auth";

export function RoleManagement() {
    const [users2, setUsers2] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");

    const [deletingUser, setDeletingUser] = useState(null);
    const [deleteConfirmation, setDeleteConfirmation] = useState("");

    const firestore = getFirestore();
    const auth = getAuth();

      useEffect(() => {
        const fetchUsers = async () => {
          try {
            const querySnapshot = await getDocs(collection(firestore, "users"));
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


        const handleToggleStatus = async (id) => {
          try {
            const userRef = doc(firestore, "users", id);
            const user = users2.find((user) => user.id === id);
      
            if (user) {
              const newStatus = user.isVerified ? false : true;
            
              // Update Firestore
              await updateDoc(userRef, { isVerified: newStatus });
            
              // Update local state
              setUsers2(
                users2.map((u) =>
                  u.id === id ? { ...u, isVerified: newStatus } : u
                )
              );
            }
            
          } catch (error) {
            console.error("Error toggling status:", error);
          }
        };
        const handleToggleDOne = async (id) =>{
          try{
            const userRef = doc(firestore, "users", id);
            const user = users2.find((user) => user.id === id);
      
            if (user) {
              const newStatus = user.done ? false : true;
            
              // Update Firestore
              await updateDoc(userRef, { done: newStatus });
            
              // Update local state
              setUsers2(
                users2.map((u) =>
                  u.id === id ? { ...u, done: newStatus } : u
                )
              );
            }
          }catch(error){
            console.error("Error toggling done:", error);
          }
        }

         const handleDeleteUser = async () => {
            if (deletingUser && deleteConfirmation === deletingUser.name) {
              try {
                const userRef = doc(firestore, "users", deletingUser.id);
        
                // Delete from Firestore
                await deleteDoc(userRef);
        
            
                // Update local state
                setUsers2(users2.filter((user) => user.id !== deletingUser.id));
                setDeletingUser(null);
                setDeleteConfirmation("");
              } catch (error) {
                console.error("Error deleting user:", error);
              }
            }
          };

            const filteredUsers = users2.filter(
              (user) =>
                user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                user.email.toLowerCase().includes(searchTerm.toLowerCase())
            );
          

  return (
    <div className="bg-white dark:bg-gray-900 text-black dark:text-white">
      <h2 className="text-2xl font-bold mb-4">Clients Management</h2>
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
            <th className="py-2 px-4 border-b">Status</th>
            <th className="py-2 px-4 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map((user) => (
            <tr key={user.id}>
              <td className="py-2 px-4 border-b">{user.name}</td>
              <td className="py-2 px-4 border-b">{user.email}</td>
              <td className="py-2 px-4 border-b">
                <button
                  onClick={() => handleToggleStatus(user.id)}
                  className={`px-2 py-1 rounded ${
                    user.isVerified
                      ? "bg-green-500 text-white"
                      : "bg-red-500 text-white"
                  }`}
                >
                {user.isVerified ? "Verified" : "Not Verified"}
                </button>

                <button
                onClick={() => handleToggleDOne(user.id)}
                className={`px-2 py-1 rounded ${
                  user.done
                  ? "bg-[#fad949] text-white"
                  : "bg-gray-500 text-white"
                }`}>
                {user.done ? "Done" : "Not Done"}
                </button>
              </td>
              <td className="py-2 px-4 border-b">
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


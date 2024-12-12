import React, { useState } from 'react';

const initialUsers = [
  { id: 1, name: "John Doe", email: "john@example.com", role: "Admin", status: 'active' },
  { id: 2, name: "Jane Smith", email: "jane@example.com", role: "Editor", status: 'active' },
  { id: 3, name: "Bob Johnson", email: "bob@example.com", role: "Viewer", status: 'inactive' },
];

export function UserManagement() {
  const [users, setUsers] = useState(initialUsers);
  const [newUser, setNewUser] = useState({});
  const [searchTerm, setSearchTerm] = useState('');
  const [editingUser, setEditingUser] = useState(null);

  const handleAddUser = () => {
    if (newUser.name && newUser.email && newUser.role) {
      if (editingUser) {
        setUsers(users.map(user => user.id === editingUser.id ? { ...newUser, id: editingUser.id } : user));
        setEditingUser(null);
      } else {
        setUsers([...users, { ...newUser, id: users.length + 1, status: 'active' }]);
      }
      setNewUser({});
    }
  };

  const handleToggleStatus = (id) => {
    setUsers(users.map(user => 
      user.id === id ? { ...user, status: user.status === 'active' ? 'inactive' : 'active' } : user
    ));
  };

  const handleEditUser = (user) => {
    setEditingUser(user);
    setNewUser(user);
  };

  const handleDeleteUser = (id) => {
    setUsers(users.filter(user => user.id !== id));
  };

  const filteredUsers = users.filter(user => 
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
        <button 
          onClick={() => setEditingUser(null)}
          className="bg-gray-500 text-white px-4 py-2 rounded-md"

        >
          Add User
        </button>
      </div>
      <table className="min-w-full bg-white dark:bg-gray-900">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">Name</th>
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
                  className={`px-2 py-1 rounded ${user.status === 'active' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}`}
                >
                  {user.status}
                </button>
              </td>
              <td className="py-2 px-4 border-b">
                <button 
                  onClick={() => handleEditUser(user)}
                  className="bg-yellow-500 text-white px-2 py-1 rounded mr-2"
                >
                  Edit
                </button>
                <button 
                  onClick={() => handleDeleteUser(user.id)}
                  className="bg-red-500 text-white px-2 py-1 rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* Add/Edit User Form */}
      <div className="mt-4">
        <h3 className="text-xl font-bold mb-2">{editingUser ? 'Edit User' : 'Add New User'}</h3>
        <div className="space-y-2">
          <input
            type="text"
            placeholder="Name"
            value={newUser.name || ''}
            onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                        className="w-full px-3 py-2 border rounded-md bg-white dark:bg-gray-700 placeholder-gray-500 dark:placeholder-[#fad949] text-black dark:text-white"

          />
          <input
            type="email"
            placeholder="Email"
            value={newUser.email || ''}
            onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
            className="w-full px-3 py-2 border rounded-md bg-white dark:bg-gray-700 placeholder-gray-500 dark:placeholder-[#fad949] text-black dark:text-white"

          />
          <select
            value={newUser.role || ''}
            onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
            className="w-full px-3 py-2 border rounded-md bg-white dark:bg-gray-700 placeholder-gray-500 dark:placeholder-[#fad949] text-black dark:text-white"

          >
            <option value="">Select a role</option>
            <option value="Admin">Admin</option>
            <option value="Editor">Editor</option>
            <option value="Viewer">Viewer</option>
          </select>
          <button 
            onClick={handleAddUser}
            className="bg-gray-500 dark: bg-[#fad949] text-white px-4 py-2 rounded-md"

          >
            {editingUser ? 'Save Changes' : 'Add User'}
          </button>


        </div>
      </div>
    </div>
  );
}


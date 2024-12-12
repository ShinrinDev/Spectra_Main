import React, { useState } from 'react';

const initialRoles = [
  { id: 1, name: "Admin", description: "Full access to all features", permissions: ["create", "read", "update", "delete"] },
  { id: 2, name: "Editor", description: "Can edit and publish content", permissions: ["create", "read", "update"] },
  { id: 3, name: "Viewer", description: "Can view content only", permissions: ["read"] },
];

const allPermissions = ["create", "read", "update", "delete"];

export function RoleManagement() {
  const [roles, setRoles] = useState(initialRoles);
  const [newRole, setNewRole] = useState({ permissions: [] });
  const [searchTerm, setSearchTerm] = useState('');
  const [editingRole, setEditingRole] = useState(null);

  const handleAddRole = () => {
    if (newRole.name && newRole.description) {
      if (editingRole) {
        setRoles(roles.map(role => role.id === editingRole.id ? { ...newRole, id: editingRole.id } : role));
        setEditingRole(null);
      } else {
        setRoles([...roles, { ...newRole, id: roles.length + 1, permissions: newRole.permissions || [] }]);
      }
      setNewRole({ permissions: [] });
    }
  };

  const handleTogglePermission = (permission) => {
    setNewRole(prev => ({
      ...prev,
      permissions: prev.permissions.includes(permission)
        ? prev.permissions.filter(p => p !== permission)
        : [...prev.permissions, permission]
    }));
  };

  const handleEditRole = (role) => {
    setEditingRole(role);
    setNewRole(role);
  };

  const handleDeleteRole = (id) => {
    setRoles(roles.filter(role => role.id !== id));
  };

  const filteredRoles = roles.filter(role => 
    role.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    role.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-white dark:bg-gray-900 text-black dark:text-white">
      <h2 className="text-2xl font-bold mb-4">Role Management</h2>
      <div className="flex justify-between mb-4">
        <input 
          type="text"
          placeholder="Search roles..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="px-3 py-2 border rounded-md bg-white dark:bg-gray-700 placeholder-gray-500 dark:placeholder-[#fad949] text-black dark:text-white"

        />
        <button 
          onClick={() => setEditingRole(null)}
          className="bg-gray-500 text-white px-4 py-2 rounded-md"
        >
          Add Role
        </button>
      </div>
      <table className="min-w-full bg-white dark:bg-gray-900">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">Name</th>
            <th className="py-2 px-4 border-b">Description</th>
            <th className="py-2 px-4 border-b">Permissions</th>
            <th className="py-2 px-4 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredRoles.map((role) => (
            <tr key={role.id}>
              <td className="py-2 px-4 border-b">{role.name}</td>
              <td className="py-2 px-4 border-b">{role.description}</td>
              <td className="py-2 px-4 border-b">{role.permissions.join(', ')}</td>
              <td className="py-2 px-4 border-b">
                <button 
                  onClick={() => handleEditRole(role)}
                  className="bg-yellow-500 text-white px-2 py-1 rounded mr-2"
                >
                  Edit
                </button>
                <button 
                  onClick={() => handleDeleteRole(role.id)}
                  className="bg-red-500 text-white px-2 py-1 rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* Add/Edit Role Form */}
      <div className="mt-4">
        <h3 className="text-xl font-bold mb-2">{editingRole ? 'Edit Role' : 'Add New Role'}</h3>
        <div className="space-y-2">
          <input
            type="text"
            placeholder="Name"
            value={newRole.name || ''}
            onChange={(e) => setNewRole({ ...newRole, name: e.target.value })}
            className="w-full px-3 py-2 border rounded-md bg-white dark:bg-gray-700 placeholder-gray-500 dark:placeholder-[#fad949] text-black dark:text-white"

          />
          <input
            type="text"
            placeholder="Description"
            value={newRole.description || ''}
            onChange={(e) => setNewRole({ ...newRole, description: e.target.value })}
            className="w-full px-3 py-2 border rounded-md bg-white dark:bg-gray-700 placeholder-gray-500 dark:placeholder-[#fad949] text-black dark:text-white"

          />
          <div>
            <p className="font-bold mb-2">Permissions:</p>
            {allPermissions.map(permission => (
              <label key={permission} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={newRole.permissions?.includes(permission)}
                  onChange={() => handleTogglePermission(permission)}
                />
                <span>{permission}</span>
              </label>
            ))}
          </div>
          <button 
            onClick={handleAddRole}
            className="bg-gray-500 dark: bg-[#fad949] text-white px-4 py-2 rounded-md"

          >
            {editingRole ? 'Save Changes' : 'Add Role'}
          </button>
        </div>
      </div>
    </div>
  );
}


import React, { useState } from 'react';

const initialPermissions = [
  { id: 1, name: "Create Posts", description: "Ability to create new posts", roles: ["Admin", "Editor"] },
  { id: 2, name: "Edit Posts", description: "Ability to edit existing posts", roles: ["Admin", "Editor"] },
  { id: 3, name: "Delete Posts", description: "Ability to delete posts", roles: ["Admin"] },
  { id: 4, name: "View Posts", description: "Ability to view posts", roles: ["Admin", "Editor", "Viewer"] },
];

const allRoles = ["Admin", "Editor", "Viewer"];

export function PermissionManagement() {
  const [permissions, setPermissions] = useState(initialPermissions);
  const [newPermission, setNewPermission] = useState({ roles: [] });
  const [searchTerm, setSearchTerm] = useState('');
  const [editingPermission, setEditingPermission] = useState(null);

  const handleAddPermission = () => {
    if (newPermission.name && newPermission.description) {
      if (editingPermission) {
        setPermissions(permissions.map(permission => permission.id === editingPermission.id ? { ...newPermission, id: editingPermission.id } : permission));
        setEditingPermission(null);
      } else {
        setPermissions([...permissions, { ...newPermission, id: permissions.length + 1, roles: newPermission.roles || [] }]);
      }
      setNewPermission({ roles: [] });
    }
  };

  const handleToggleRole = (role) => {
    setNewPermission(prev => ({
      ...prev,
      roles: prev.roles.includes(role)
        ? prev.roles.filter(r => r !== role)
        : [...prev.roles, role]
    }));
  };

  const handleEditPermission = (permission) => {
    setEditingPermission(permission);
    setNewPermission(permission);
  };

  const handleDeletePermission = (id) => {
    setPermissions(permissions.filter(permission => permission.id !== id));
  };

  const filteredPermissions = permissions.filter(permission => 
    permission.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    permission.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div  className="bg-white dark:bg-gray-900 text-black dark:text-white">
      <h2 className="text-2xl font-bold mb-4">Permission Management</h2>
      <div className="flex justify-between mb-4">
        <input 
          type="text"
          placeholder="Search permissions..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
         
  className="px-3 py-2 border rounded-md bg-white dark:bg-gray-700 placeholder-gray-500 dark:placeholder-[#fad949] text-black dark:text-white"

        />
        <button 
          onClick={() => setEditingPermission(null)}
          className="bg-gray-500 text-white px-4 py-2 rounded-md"
        >
          Add Permission
        </button>
      </div>
      <table className="min-w-full bg-white dark:bg-gray-900">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">Name</th>
            <th className="py-2 px-4 border-b">Description</th>
            <th className="py-2 px-4 border-b">Roles</th>
            <th className="py-2 px-4 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredPermissions.map((permission) => (
            <tr key={permission.id}>
              <td className="py-2 px-4 border-b">{permission.name}</td>
              <td className="py-2 px-4 border-b">{permission.description}</td>
              <td className="py-2 px-4 border-b">{permission.roles.join(', ')}</td>
              <td className="py-2 px-4 border-b">
                <button 
                  onClick={() => handleEditPermission(permission)}

                  className="bg-[#fad949] text-white hover:bg-[#f4c235] border-none px-2 py-1 rounded mt-2 mr-2"
                >
                  Edit
                </button>
                <button 
                  onClick={() => handleDeletePermission(permission.id)}
                   className="bg-[#fad949] text-white hover:bg-[#f4c235] border-none px-2 py-1 rounded mt-2"
                >
                  Delete
                </button> 
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* Add/Edit Permission Form */}
      <div className="mt-4">
        <h3 className="text-xl font-bold mb-2">{editingPermission ? 'Edit Permission' : 'Add New Permission'}</h3>
        <div className="space-y-2">
        <input
  type="text"
  placeholder="Name"
  value={newPermission.name || ''}
  onChange={(e) => setNewPermission({ ...newPermission, name: e.target.value })}
  className="w-full px-3 py-2 border rounded-md bg-white dark:bg-gray-700 placeholder-gray-500 dark:placeholder-[#fad949] text-black dark:text-white"
/>

          <input
            type="text"
            placeholder="Description"
            value={newPermission.description || ''}
            onChange={(e) => setNewPermission({ ...newPermission, description: e.target.value })}
            className="w-full px-3 py-2 border rounded-md bg-white dark:bg-gray-700 placeholder-gray-500 dark:placeholder-[#fad949] text-black dark:text-white"

          />
          <div>
            <p className="font-bold mb-2">Roles:</p>
            {allRoles.map(role => (
              <label key={role} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={newPermission.roles?.includes(role)}
                  onChange={() => handleToggleRole(role)}
                />
                <span>{role}</span>
              </label>
            ))}
          </div>
          <button 
            onClick={handleAddPermission}
            className="bg-gray-500 dark: bg-[#fad949] text-white px-4 py-2 rounded-md"
          >
            {editingPermission ? 'Save Changes' : 'Add Permission'}
          </button>
        </div>
      </div>
    </div>
  );
}


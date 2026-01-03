import React, { useState } from 'react';
import { Trash2, ArrowUpDown, ArrowUp, ArrowDown, Users, Mail, Phone, MessageSquare, Calendar, User2 } from 'lucide-react';
import DeleteModal from './DeleteModal';

const ContactTable = ({ contacts=[], onDelete, isLoading }) => {
  const [sortConfig, setSortConfig] = useState({ key: 'createdAt', direction: 'desc' });
  const [deleteModal, setDeleteModal] = useState({ isOpen: false, contact: null });
  const [isDeleting, setIsDeleting] = useState(false);

  const handleSort = (key) => {
    setSortConfig(prev => ({
      key,
      direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

  const sortedContacts = [...contacts].sort((a, b) => {
    const { key, direction } = sortConfig;
    let aVal = a[key];
    let bVal = b[key];

    if (key === 'createdAt') {
      aVal = new Date(aVal);
      bVal = new Date(bVal);
    } else {
      aVal = aVal?.toString().toLowerCase() || '';
      bVal = bVal?.toString().toLowerCase() || '';
    }

    if (aVal < bVal) return direction === 'asc' ? -1 : 1;
    if (aVal > bVal) return direction === 'asc' ? 1 : -1;
    return 0;
  });

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleDeleteClick = (contact) => {
    setDeleteModal({ isOpen: true, contact });
  };

  const handleDeleteConfirm = async () => {
    setIsDeleting(true);
    await onDelete(deleteModal.contact._id);
    setIsDeleting(false);
    setDeleteModal({ isOpen: false, contact: null });
  };

  const getSortIcon = (columnKey) => {
    if (sortConfig.key !== columnKey) {
      return <ArrowUpDown className="w-4 h-4 text-gray-400" />;
    }
    return sortConfig.direction === 'asc' 
      ? <ArrowUp className="w-4 h-4 text-primary-600" />
      : <ArrowDown className="w-4 h-4 text-primary-600" />;
  };

  if (isLoading) {
    return (
      <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
        <div className="flex flex-col items-center justify-center py-12">
          <div className="w-16 h-16 border-4 border-primary-500 border-t-transparent rounded-full animate-spin mb-4" />
          <p className="text-gray-600 font-medium">Loading contacts...</p>
        </div>
      </div>
    );
  }

  if (contacts.length === 0) {
    return (
      <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
        <div className="flex flex-col items-center justify-center py-12">
          <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-4">
            <Users className="w-10 h-10 text-gray-400" />
          </div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">No contacts found</h3>
          <p className="text-gray-500 text-center">
            Start by adding your first contact using the form above
          </p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
        <div className="px-6 py-5 border-b border-gray-200 bg-linear-to-r from-primary-50 to-green-50">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary-500 rounded-lg flex items-center justify-center">
                <Users className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-800">Contact List</h2>
                <p className="text-sm text-gray-600">{contacts.length} total contacts</p>
              </div>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left">
                  <button
                    onClick={() => handleSort('name')}
                    className="flex items-center gap-2 text-xs font-semibold text-gray-700 uppercase tracking-wider hover:text-primary-600 transition-colors"
                  >
                    <User2 className="w-4 h-4" />
                    Name
                    {getSortIcon('name')}
                  </button>
                </th>
                <th className="px-6 py-4 text-left">
                  <button
                    onClick={() => handleSort('email')}
                    className="flex items-center gap-2 text-xs font-semibold text-gray-700 uppercase tracking-wider hover:text-primary-600 transition-colors"
                  >
                    <Mail className="w-4 h-4" />
                    Email
                    {getSortIcon('email')}
                  </button>
                </th>
                <th className="px-6 py-4 text-left">
                  <button
                    onClick={() => handleSort('phone')}
                    className="flex items-center gap-2 text-xs font-semibold text-gray-700 uppercase tracking-wider hover:text-primary-600 transition-colors"
                  >
                    <Phone className="w-4 h-4" />
                    Phone
                    {getSortIcon('phone')}
                  </button>
                </th>
                <th className="px-6 py-4 text-left">
                  <div className="flex items-center gap-2 text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    <MessageSquare className="w-4 h-4" />
                    Message
                  </div>
                </th>
                <th className="px-6 py-4 text-left">
                  <button
                    onClick={() => handleSort('createdAt')}
                    className="flex items-center gap-2 text-xs font-semibold text-gray-700 uppercase tracking-wider hover:text-primary-600 transition-colors"
                  >
                    <Calendar className="w-4 h-4" />
                    Created
                    {getSortIcon('createdAt')}
                  </button>
                </th>
                <th className="px-6 py-4 text-left">
                  <div className="text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Actions
                  </div>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {sortedContacts.map((contact, index) => (
                <tr 
                  key={contact._id}
                  className="hover:bg-gray-50 transition-colors"
                  style={{ animation: `slideIn 0.3s ease-out ${index * 0.05}s both` }}
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-linear-to-br from-primary-400 to-primary-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                        {contact.name.charAt(0).toUpperCase()}
                      </div>
                      <span className="font-medium text-gray-900">{contact.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <a 
                      href={`mailto:${contact.email}`}
                      className="text-primary-600 hover:text-primary-700 hover:underline transition-colors"
                    >
                      {contact.email}
                    </a>
                  </td>
                  <td className="px-6 py-4">
                    <a 
                      href={`tel:${contact.phone}`}
                      className="text-gray-700 hover:text-primary-600 transition-colors"
                    >
                      {contact.phone}
                    </a>
                  </td>
                  <td className="px-6 py-4">
                    <div className="max-w-xs">
                      {contact.message ? (
                        <p className="text-gray-600 text-sm truncate" title={contact.message}>
                          {contact.message}
                        </p>
                      ) : (
                        <span className="text-gray-400 text-sm italic">No message</span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-gray-600">
                      {formatDate(contact.createdAt)}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => handleDeleteClick(contact)}
                      className="p-2 cursor-pointer text-red-600 hover:bg-red-50 rounded-lg transition-colors group"
                      title="Delete contact"
                    >
                      <Trash2 className="w-5 h-5 group-hover:scale-110 transition-transform" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <DeleteModal
        isOpen={deleteModal.isOpen}
        onClose={() => setDeleteModal({ isOpen: false, contact: null })}
        onConfirm={handleDeleteConfirm}
        contactName={deleteModal.contact?.name}
        isDeleting={isDeleting}
      />
    </>
  );
};

export default ContactTable;
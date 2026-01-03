import React, { useState, useEffect } from 'react';
import { Toaster, toast } from 'sonner';
import { BookUser, RefreshCw } from 'lucide-react';
import ContactForm from './components/ContactForm';
import ContactTable from './components/ContactTable';
import SearchBar from './components/SearchBar';
import { getContacts, createContact, deleteContact } from './services/api';
import './App.css';

function App() {
  const [contacts, setContacts] = useState([]);
  const [filteredContacts, setFilteredContacts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    fetchContacts();
  }, []);

  useEffect(() => {
    if (searchTerm.trim() === '') {
      setFilteredContacts(contacts);
    } else {
      const filtered = contacts.filter(contact => 
        contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        contact.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        contact.phone.includes(searchTerm)
      );
      setFilteredContacts(filtered);
    }
  }, [searchTerm, contacts]);

  const fetchContacts = async () => {
    try {
      setIsLoading(true);
      const response = await getContacts();
      setContacts(response.contacts);
      setFilteredContacts(response.data);
    } catch (error) {
      toast.error('Failed to load contacts', {
        description: error.message || 'Please check your connection and try again'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateContact = async (contactData) => {
    try {
      setIsSubmitting(true);
      const response = await createContact(contactData);
      
      setContacts(prev => [response.contact, ...prev]);
      
      toast.success('Contact added successfully!', {
        description: `${contactData.name} has been added to your contacts`,
        duration: 3000
      });
      
      return true;
    } catch (error) {
      toast.error('Failed to add contact', {
        description: error.message || 'Please try again'
      });
      return false;
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteContact = async (id) => {
    try {
      await deleteContact(id);
      
      setContacts(prev => prev.filter(contact => contact._id !== id));
      
      toast.success('Contact deleted successfully!', {
        description: 'The contact has been removed from your list',
        duration: 3000
      });
    } catch (error) {
      toast.error('Failed to delete contact', {
        description: error.message || 'Please try again'
      });
    }
  };

  const handleRefresh = () => {
    fetchContacts();
    toast.info('Refreshing contacts...', { duration: 1000 });
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-green-50 via-emerald-50 to-teal-50">
      <Toaster position="top-right" richColors closeButton />
      
    <header className="bg-white shadow-sm border-b border-gray-200">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
    <div className="flex items-center justify-between gap-3">
      
      <div className="flex items-center gap-3 min-w-0">
        <div className="w-12 h-12 shrink-0 bg-linear-to-br from-primary-500 to-primary-600 rounded-xl flex items-center justify-center shadow-lg">
          <BookUser className="w-7 h-7 text-white" />
        </div>

        <div className="min-w-0">
          <h1 className="text-xl sm:text-3xl font-bold text-gray-900 truncate">
            Contact Manager
          </h1>
          <p className="text-sm text-gray-600 mt-1 truncate">
            Organize and manage your contacts efficiently
          </p>
        </div>
      </div>

      <button
        onClick={handleRefresh}
        className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors shrink-0"
        title="Refresh contacts"
      >
        <RefreshCw className="w-4 h-4" />
        <span className="hidden sm:inline">Refresh</span>
      </button>

    </div>
  </div>
</header>



      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <ContactForm 
              onSubmit={handleCreateContact}
              isSubmitting={isSubmitting}
            />
          </div>

          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
              <div className="flex items-center gap-3 mb-4">
                <h3 className="text-lg font-semibold text-gray-800">Search Contacts</h3>
                {searchTerm && (
                  <span className="px-3 py-1 bg-primary-100 text-primary-700 text-sm font-medium rounded-full">
                    {filteredContacts.length} found
                  </span>
                )}
              </div>
              <SearchBar 
                searchTerm={searchTerm}
                onSearchChange={setSearchTerm}
              />
            </div>

            <ContactTable 
              contacts={filteredContacts}
              onDelete={handleDeleteContact}
              isLoading={isLoading}
            />
          </div>
        </div>
      </main>

    
    </div>
  );
}

export default App;
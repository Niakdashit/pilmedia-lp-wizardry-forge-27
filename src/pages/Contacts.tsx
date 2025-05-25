import React, { useState } from 'react';
import {
  Users,
  Search,
  Filter,
  Download,
  MoreVertical,
  UserPlus,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Trash2,
  Edit,
  Loader2
} from 'lucide-react';

interface Contact {
  id: number;
  name: string;
  email: string;
  phone: string;
  city: string;
  source: string;
  tags: string[];
  createdAt: string;
  lastActivity: string;
  status: 'active' | 'inactive';
}

const Contacts: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedContacts, setSelectedContacts] = useState<number[]>([]);
  const [filterStatus, setFilterStatus] = useState('all');
  const [isLoading, setIsLoading] = useState(false);

  const mockContacts: Contact[] = [
    {
      id: 1,
      name: 'John Doe',
      email: 'john.doe@example.com',
      phone: '123-456-7890',
      city: 'New York',
      source: 'Website',
      tags: ['lead', 'customer'],
      createdAt: '2024-01-20',
      lastActivity: '2024-02-15',
      status: 'active'
    },
    {
      id: 2,
      name: 'Jane Smith',
      email: 'jane.smith@example.com',
      phone: '987-654-3210',
      city: 'Los Angeles',
      source: 'Referral',
      tags: ['prospect'],
      createdAt: '2023-12-01',
      lastActivity: '2024-02-20',
      status: 'inactive'
    },
    {
      id: 3,
      name: 'Alice Johnson',
      email: 'alice.johnson@example.com',
      phone: '555-123-4567',
      city: 'Chicago',
      source: 'Advertisement',
      tags: ['lead', 'hot'],
      createdAt: '2024-02-01',
      lastActivity: '2024-02-22',
      status: 'active'
    },
    {
      id: 4,
      name: 'Bob Williams',
      email: 'bob.williams@example.com',
      phone: '777-888-9999',
      city: 'Houston',
      source: 'Social Media',
      tags: ['customer'],
      createdAt: '2023-11-15',
      lastActivity: '2024-02-25',
      status: 'active'
    },
    {
      id: 5,
      name: 'Charlie Brown',
      email: 'charlie.brown@example.com',
      phone: '111-222-3333',
      city: 'Philadelphia',
      source: 'Event',
      tags: ['prospect', 'cold'],
      createdAt: '2024-01-10',
      lastActivity: '2024-02-28',
      status: 'inactive'
    },
    {
      id: 6,
      name: 'Diana Miller',
      email: 'diana.miller@example.com',
      phone: '444-555-6666',
      city: 'Phoenix',
      source: 'Website',
      tags: ['lead'],
      createdAt: '2024-02-05',
      lastActivity: '2024-03-01',
      status: 'active'
    },
    {
      id: 7,
      name: 'Ethan Davis',
      email: 'ethan.davis@example.com',
      phone: '222-333-4444',
      city: 'San Antonio',
      source: 'Referral',
      tags: ['customer', 'vip'],
      createdAt: '2023-10-20',
      lastActivity: '2024-03-03',
      status: 'active'
    },
    {
      id: 8,
      name: 'Fiona Wilson',
      email: 'fiona.wilson@example.com',
      phone: '666-777-8888',
      city: 'San Diego',
      source: 'Advertisement',
      tags: ['prospect'],
      createdAt: '2024-01-25',
      lastActivity: '2024-03-05',
      status: 'inactive'
    },
    {
      id: 9,
      name: 'George Garcia',
      email: 'george.garcia@example.com',
      phone: '333-444-5555',
      city: 'Dallas',
      source: 'Social Media',
      tags: ['lead', 'hot'],
      createdAt: '2024-02-10',
      lastActivity: '2024-03-07',
      status: 'active'
    },
    {
      id: 10,
      name: 'Hannah Rodriguez',
      email: 'hannah.rodriguez@example.com',
      phone: '888-999-0000',
      city: 'San Jose',
      source: 'Event',
      tags: ['customer'],
      createdAt: '2023-12-25',
      lastActivity: '2024-03-10',
      status: 'active'
    }
  ];

  const [contacts, setContacts] = useState<Contact[]>(mockContacts);

  const filteredContacts = contacts.filter(contact => {
    const searchTermLower = searchTerm.toLowerCase();
    const matchesSearch =
      contact.name.toLowerCase().includes(searchTermLower) ||
      contact.email.toLowerCase().includes(searchTermLower) ||
      contact.phone.toLowerCase().includes(searchTermLower) ||
      contact.city.toLowerCase().includes(searchTermLower);

    const matchesStatus = filterStatus === 'all' || contact.status === filterStatus;

    return matchesSearch && matchesStatus;
  });

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleStatusFilter = (status: string) => {
    setFilterStatus(status);
  };

  const handleContactSelect = (id: number) => {
    setSelectedContacts(prev => {
      if (prev.includes(id)) {
        return prev.filter(contactId => contactId !== id);
      } else {
        return [...prev, id];
      }
    });
  };

  const isContactSelected = (id: number) => {
    return selectedContacts.includes(id);
  };

  const handleSelectAll = () => {
    if (selectedContacts.length === filteredContacts.length) {
      setSelectedContacts([]);
    } else {
      setSelectedContacts(filteredContacts.map(contact => contact.id));
    }
  };

  const isAllSelected = selectedContacts.length === filteredContacts.length && filteredContacts.length > 0;

  const handleCreateContact = () => {
    alert('Create contact');
  };

  const handleEditContact = (id: number) => {
    alert(`Edit contact ${id}`);
  };

  const handleDeleteContact = (id: number) => {
    setContacts(prev => prev.filter(contact => contact.id !== id));
    setSelectedContacts(prev => prev.filter(contactId => contactId !== id));
  };

  const handleSendEmail = (id: number) => {
    alert(`Send email to ${id}`);
  };

  const handleCallContact = (id: number) => {
    alert(`Call contact ${id}`);
  };

  const handleLocateContact = (id: number) => {
    alert(`Locate contact ${id}`);
  };

  const handleScheduleMeeting = (id: number) => {
    alert(`Schedule meeting with ${id}`);
  };

  const handleBulkAction = (action: string) => {
    setIsLoading(true);
    setTimeout(() => {
      console.log(`Bulk action: ${action} on contacts:`, selectedContacts);
      setSelectedContacts([]);
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="-mx-6 -mt-6">
      <div className="relative h-[180px] bg-[#841b60] overflow-hidden">
        <div className="absolute inset-10 opacity-[0.15]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            backgroundSize: '60px 60px',
          }}
        />

        <div className="relative h-full max-w-7xl mx-auto px-6 flex items-center justify-between">
          <h1 className="text-3xl font-bold text-white">Contacts</h1>
          <div className="flex space-x-4">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <Search className="w-5 h-5 text-gray-400" />
              </div>
              <input
                type="search"
                placeholder="Rechercher un contact..."
                className="w-64 bg-white/90 backdrop-blur-sm border-0 text-gray-700 py-2 pl-10 pr-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-white/20"
                value={searchTerm}
                onChange={handleSearch}
              />
            </div>
            <button
              onClick={handleCreateContact}
              className="inline-flex items-center px-4 py-2 bg-white/90 backdrop-blur-sm text-[#841b60] text-sm font-medium rounded-xl hover:bg-white/70 transition-colors duration-200"
            >
              <UserPlus className="w-5 h-5 mr-2" />
              Nouveau
            </button>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0">
          <svg
            viewBox="0 0 1440 116"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full"
            preserveAspectRatio="none"
            height="10"
          >
            <path
              d="M0 116L60 96.3C120 76.7 240 37.3 360 21.7C480 6 600 14 720 34.7C840 55.3 960 89.7 1080 96.3C1200 103 1320 82 1380 71.5L1440 61V116H1380C1320 116 1200 116 1080 116C960 116 840 116 720 116C600 116 480 116 360 116C240 116 120 116 60 116H0Z"
              fill="#ebf4f7"
            />
          </svg>
        </div>
      </div>

      <div className="px-6 pb-6">
        <div className="flex items-center justify-between mt-6">
          <div className="flex items-center space-x-3">
            <select
              className="bg-white border border-gray-300 text-gray-700 py-2 px-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#841b60]"
              value={filterStatus}
              onChange={(e) => handleStatusFilter(e.target.value)}
            >
              <option value="all">Tous les contacts</option>
              <option value="active">Actifs</option>
              <option value="inactive">Inactifs</option>
            </select>
            {selectedContacts.length > 0 && (
              <div className="flex items-center space-x-3 text-gray-600">
                <span>{selectedContacts.length} sélectionnés</span>
                <button
                  onClick={() => handleBulkAction('archive')}
                  className="hover:text-[#841b60] transition-colors duration-200"
                >
                  Archiver
                </button>
                <button
                  onClick={() => handleBulkAction('delete')}
                  className="hover:text-red-500 transition-colors duration-200"
                >
                  Supprimer
                </button>
              </div>
            )}
          </div>
          <button className="p-2 text-gray-500 hover:text-[#841b60] rounded-lg hover:bg-gray-100">
            <Filter className="w-5 h-5" />
          </button>
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center mt-6">
            <Loader2 className="w-6 h-6 animate-spin text-[#841b60]" />
          </div>
        ) : (
          <div className="mt-4 overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <label className="inline-flex items-center">
                      <input
                        type="checkbox"
                        className="rounded border-gray-300 text-[#841b60] focus:ring-[#841b60]"
                        checked={isAllSelected}
                        onChange={handleSelectAll}
                      />
                    </label>
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Nom
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Téléphone
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Ville
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Source
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Tags
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Création
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Dernière activité
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Statut
                  </th>
                  <th className="relative px-6 py-3">
                    <span className="sr-only">Actions</span>
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredContacts.map(contact => (
                  <tr key={contact.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <label className="inline-flex items-center">
                        <input
                          type="checkbox"
                          className="rounded border-gray-300 text-[#841b60] focus:ring-[#841b60]"
                          checked={isContactSelected(contact.id)}
                          onChange={() => handleContactSelect(contact.id)}
                        />
                      </label>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {contact.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {contact.email}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {contact.phone}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {contact.city}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {contact.source}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {contact.tags.join(', ')}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {contact.createdAt}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {contact.lastActivity}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${contact.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                        {contact.status === 'active' ? 'Actif' : 'Inactif'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="relative inline-block text-left">
                        <button
                          type="button"
                          className="inline-flex items-center justify-center p-2 text-gray-500 rounded-md hover:bg-gray-100 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-[#841b60]"
                          id={`options-menu-button-${contact.id}`}
                          aria-expanded="false"
                          aria-haspopup="true"
                        >
                          <MoreVertical className="w-5 h-5" />
                        </button>
                        <div
                          className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
                          role="menu"
                          aria-orientation="vertical"
                          aria-labelledby={`options-menu-button-${contact.id}`}
                          tabIndex={-1}
                        >
                          <div className="py-1" role="none">
                            <a
                              href="#"
                              className="text-gray-700 block px-4 py-2 text-sm hover:bg-gray-100 hover:text-[#841b60]"
                              role="menuitem"
                              onClick={() => handleEditContact(contact.id)}
                            >
                              <Edit className="w-4 h-4 mr-2 inline-block" />
                              Modifier
                            </a>
                            <a
                              href="#"
                              className="text-gray-700 block px-4 py-2 text-sm hover:bg-gray-100 hover:text-blue-500"
                              role="menuitem"
                              onClick={() => handleSendEmail(contact.id)}
                            >
                              <Mail className="w-4 h-4 mr-2 inline-block" />
                              Envoyer un email
                            </a>
                            <a
                              href="#"
                              className="text-gray-700 block px-4 py-2 text-sm hover:bg-gray-100 hover:text-green-500"
                              role="menuitem"
                              onClick={() => handleCallContact(contact.id)}
                            >
                              <Phone className="w-4 h-4 mr-2 inline-block" />
                              Appeler
                            </a>
                            <a
                              href="#"
                              className="text-gray-700 block px-4 py-2 text-sm hover:bg-gray-100 hover:text-yellow-500"
                              role="menuitem"
                              onClick={() => handleLocateContact(contact.id)}
                            >
                              <MapPin className="w-4 h-4 mr-2 inline-block" />
                              Localiser
                            </a>
                            <a
                              href="#"
                              className="text-gray-700 block px-4 py-2 text-sm hover:bg-gray-100 hover:text-purple-500"
                              role="menuitem"
                              onClick={() => handleScheduleMeeting(contact.id)}
                            >
                              <Calendar className="w-4 h-4 mr-2 inline-block" />
                              Planifier
                            </a>
                            <a
                              href="#"
                              className="text-gray-700 block px-4 py-2 text-sm hover:bg-gray-100 hover:text-red-500"
                              role="menuitem"
                              onClick={() => handleDeleteContact(contact.id)}
                            >
                              <Trash2 className="w-4 h-4 mr-2 inline-block" />
                              Supprimer
                            </a>
                          </div>
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Contacts;

import React, { useState } from 'react';
import { Search, Download, Upload, Plus, ChevronDown, ChevronUp, UserCircle, X } from 'lucide-react';
interface Contact {
  id: string;
  name: string;
  email: string;
  phone: string;
  status: 'Nouveau' | 'Qualifié' | 'Client' | 'Perdu';
  topics: string[];
  channels: string[];
}
const mockContacts: Contact[] = [{
  id: '1',
  name: 'Jean Dupont',
  email: 'jean.dupont@example.com',
  phone: '06 12 34 56 78',
  status: 'Nouveau',
  topics: ['Marketing Digital', 'SEO'],
  channels: ['Email', 'WhatsApp']
}, {
  id: '2',
  name: 'Marie Martin',
  email: 'marie.martin@example.com',
  phone: '06 23 45 67 89',
  status: 'Qualifié',
  topics: ['Réseaux Sociaux'],
  channels: ['Email', 'SMS']
}, {
  id: '3',
  name: 'Pierre Durand',
  email: 'pierre.durand@example.com',
  phone: '06 34 56 78 90',
  status: 'Client',
  topics: ['E-commerce', 'PPC'],
  channels: ['WhatsApp']
}];
const Contacts: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'all' | 'subscribed' | 'unsubscribed' | 'clients'>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortField, setSortField] = useState<keyof Contact>('name');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showImportModal, setShowImportModal] = useState(false);
  const [selectedContacts, setSelectedContacts] = useState<string[]>([]);
  const [newContact, setNewContact] = useState<Partial<Contact>>({
    status: 'Nouveau',
    topics: [],
    channels: []
  });
  const tabs = [{
    id: 'all',
    label: 'Tous les contacts'
  }, {
    id: 'subscribed',
    label: 'Abonnés à la newsletter'
  }, {
    id: 'unsubscribed',
    label: 'Désabonnés'
  }, {
    id: 'clients',
    label: 'Tous les clients'
  }];
  const statusColors = {
    'Nouveau': 'bg-blue-100 text-blue-800',
    'Qualifié': 'bg-yellow-100 text-yellow-800',
    'Client': 'bg-green-100 text-green-800',
    'Perdu': 'bg-red-100 text-red-800'
  };
  const handleSort = (field: keyof Contact) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };
  const filteredContacts = mockContacts.filter(contact => {
    const matchesSearch = contact.name.toLowerCase().includes(searchTerm.toLowerCase()) || contact.email.toLowerCase().includes(searchTerm.toLowerCase()) || contact.phone.includes(searchTerm);
    switch (activeTab) {
      case 'subscribed':
        return matchesSearch && contact.channels.includes('Email');
      case 'unsubscribed':
        return matchesSearch && !contact.channels.includes('Email');
      case 'clients':
        return matchesSearch && contact.status === 'Client';
      default:
        return matchesSearch;
    }
  }).sort((a, b) => {
    if (sortDirection === 'asc') {
      return a[sortField] > b[sortField] ? 1 : -1;
    }
    return a[sortField] < b[sortField] ? 1 : -1;
  });
  const handleCreateContact = () => {
    // Implement contact creation logic
    setShowCreateModal(false);
  };
  const handleImportContacts = () => {
    // Implement contact import logic
    setShowImportModal(false);
  };
  return <div className="-mx-6 -mt-6">
      <div className="relative h-[100px] bg-[#841b60] overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-10 opacity-[0.15]" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        backgroundSize: '60px 60px'
      }} />
        
        {/* Content */}
        <div className="relative h-full max-w-7xl mx-auto px-6 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white mb-3">Contacts</h1>
          </div>
          <div className="flex space-x-3">
            <button onClick={() => setShowImportModal(true)} className="inline-flex items-center px-4 py-2 bg-white/20 text-white font-medium rounded-xl hover:bg-white/30 transition-all duration-200 mb-3">
              <Upload className="w-5 h-5 mr-2" />
              Importer
            </button>
            <button onClick={() => setShowCreateModal(true)} className="inline-flex items-center px-6 py-3 bg-white text-[#841b60] font-medium rounded-xl hover:bg-white/90 transition-all duration-200 shadow-lg hover:shadow-xl mb-3">
              <Plus className="w-5 h-5 mr-2" />
              Créer contact
            </button>
          </div>
        </div>

        {/* Decorative bottom curve */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 116" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full" preserveAspectRatio="none" height="10">
            <path d="M0 116L60 96.3C120 76.7 240 37.3 360 21.7C480 6 600 14 720 34.7C840 55.3 960 89.7 1080 96.3C1200 103 1320 82 1380 71.5L1440 61V116H1380C1320 116 1200 116 1080 116C960 116 840 116 720 116C600 116 480 116 360 116C240 116 120 116 60 116H0Z" fill="#ebf4f7" />
          </svg>
        </div>
      </div>

      <div className="px-6">
        <div className="bg-white rounded-xl shadow-sm mt-6">
          {/* Tabs */}
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6" aria-label="Tabs">
              {tabs.map(tab => <button key={tab.id} onClick={() => setActiveTab(tab.id as typeof activeTab)} className={`py-4 px-1 font-medium text-sm border-b-2 transition-colors duration-200 ${activeTab === tab.id ? 'border-[#841b60] text-[#841b60]' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}>
                  {tab.label}
                </button>)}
            </nav>
          </div>

          {/* Search and filters */}
          <div className="p-6 border-b border-gray-200">
            <div className="flex space-x-4">
              <div className="flex-1">
                <div className="relative">
                  <input type="text" placeholder="Rechercher un contact..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#841b60]" />
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                </div>
              </div>
              <button onClick={() => {/* Implement export logic */}} className="px-4 py-2 text-gray-700 font-medium rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors duration-200 flex items-center">
                <Download className="w-5 h-5 mr-2" />
                Exporter
              </button>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50">
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-8">
                    <input type="checkbox" checked={selectedContacts.length === filteredContacts.length} onChange={e => {
                    if (e.target.checked) {
                      setSelectedContacts(filteredContacts.map(c => c.id));
                    } else {
                      setSelectedContacts([]);
                    }
                  }} className="rounded border-gray-300 text-[#841b60] focus:ring-[#841b60]" />
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <button className="flex items-center space-x-1" onClick={() => handleSort('name')}>
                      <span>Nom</span>
                      {sortField === 'name' && (sortDirection === 'asc' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />)}
                    </button>
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <button className="flex items-center space-x-1" onClick={() => handleSort('email')}>
                      <span>Email</span>
                      {sortField === 'email' && (sortDirection === 'asc' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />)}
                    </button>
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Téléphone
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Statut
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Sujets favoris
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Canaux préférés
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredContacts.map(contact => <tr key={contact.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <input type="checkbox" checked={selectedContacts.includes(contact.id)} onChange={e => {
                    if (e.target.checked) {
                      setSelectedContacts([...selectedContacts, contact.id]);
                    } else {
                      setSelectedContacts(selectedContacts.filter(id => id !== contact.id));
                    }
                  }} className="rounded border-gray-300 text-[#841b60] focus:ring-[#841b60]" />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10">
                          <div className="h-10 w-10 rounded-full bg-[#f8f0f5] flex items-center justify-center">
                            <UserCircle className="w-6 h-6 text-[#841b60]" />
                          </div>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{contact.name}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{contact.email}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{contact.phone}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <select value={contact.status} onChange={() => {/* Implement status update logic */}} className={`text-sm font-medium rounded-full px-2.5 py-0.5 ${statusColors[contact.status]}`}>
                        <option value="Nouveau">Nouveau</option>
                        <option value="Qualifié">Qualifié</option>
                        <option value="Client">Client</option>
                        <option value="Perdu">Perdu</option>
                      </select>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex flex-wrap gap-2">
                        {contact.topics.map((topic, index) => <span key={index} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#f8f0f5] text-[#841b60]">
                            {topic}
                          </span>)}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex flex-wrap gap-2">
                        {contact.channels.map((channel, index) => <span key={index} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                            {channel}
                          </span>)}
                      </div>
                    </td>
                  </tr>)}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="px-6 py-4 flex items-center justify-between border-t border-gray-200">
            <div className="flex-1 flex justify-between sm:hidden">
              <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                Précédent
              </button>
              <button className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                Suivant
              </button>
            </div>
            <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
              <div>
                <p className="text-sm text-gray-700">
                  Affichage de <span className="font-medium">1</span> à{' '}
                  <span className="font-medium">25</span> sur{' '}
                  <span className="font-medium">{filteredContacts.length}</span> résultats
                </p>
              </div>
              <div>
                <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                  <button className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                    Précédent
                  </button>
                  <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
                    1
                  </button>
                  <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
                    2
                  </button>
                  <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
                    3
                  </button>
                  <button className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                    Suivant
                  </button>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Create Contact Modal */}
      {showCreateModal && <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 max-w-2xl w-full mx-4">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-bold text-gray-800">Créer un contact</h3>
              <button onClick={() => setShowCreateModal(false)} className="text-gray-400 hover:text-gray-500">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Nom
                  </label>
                  <input type="text" value={newContact.name || ''} onChange={e => setNewContact({
                ...newContact,
                name: e.target.value
              })} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#841b60]" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <input type="email" value={newContact.email || ''} onChange={e => setNewContact({
                ...newContact,
                email: e.target.value
              })} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#841b60]" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Téléphone
                  </label>
                  <input type="tel" value={newContact.phone || ''} onChange={e => setNewContact({
                ...newContact,
                phone: e.target.value
              })} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#841b60]" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Statut
                  </label>
                  <select value={newContact.status} onChange={e => setNewContact({
                ...newContact,
                status: e.target.value as Contact['status']
              })} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#841b60]">
                    <option value="Nouveau">Nouveau</option>
                    <option value="Qualifié">Qualifié</option>
                    <option value="Client">Client</option>
                    <option value="Perdu">Perdu</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Sujets favoris
                </label>
                <input type="text" placeholder="Séparez les sujets par des virgules" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#841b60]" onChange={e => setNewContact({
              ...newContact,
              topics: e.target.value.split(',').map(t => t.trim())
            })} />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Canaux préférés
                </label>
                <div className="space-y-2">
                  {['Email', 'SMS', 'WhatsApp'].map(channel => <label key={channel} className="flex items-center">
                      <input type="checkbox" checked={newContact.channels?.includes(channel)} onChange={e => {
                  const channels = newContact.channels || [];
                  if (e.target.checked) {
                    setNewContact({
                      ...newContact,
                      channels: [...channels, channel]
                    });
                  } else {
                    setNewContact({
                      ...newContact,
                      channels: channels.filter(c => c !== channel)
                    });
                  }
                }} className="rounded border-gray-300 text-[#841b60] focus:ring-[#841b60]" />
                      <span className="ml-2 text-sm text-gray-700">{channel}</span>
                    </label>)}
                </div>
              </div>
            </div>

            <div className="mt-6 flex justify-end space-x-3">
              <button onClick={() => setShowCreateModal(false)} className="px-4 py-2 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors duration-200">
                Annuler
              </button>
              <button onClick={handleCreateContact} className="px-4 py-2 bg-[#841b60] text-white font-medium rounded-lg hover:bg-[#6d164f] transition-colors duration-200">
                Créer le contact
              </button>
            </div>
          </div>
        </div>}

      {/* Import Modal */}
      {showImportModal && <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 max-w-lg w-full mx-4">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-bold text-gray-800">Importer des contacts</h3>
              <button onClick={() => setShowImportModal(false)} className="text-gray-400 hover:text-gray-500">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-6">
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-sm text-gray-600 mb-2">
                  Glissez-déposez votre fichier Excel ici ou
                </p>
                <button className="text-[#841b60] font-medium hover:text-[#6d164f]">
                  parcourez vos fichiers
                </button>
                <input type="file" className="hidden" accept=".xlsx,.xls,.csv" />
              </div>

              <div className="bg-[#f8f0f5] text-[#841b60] p-4 rounded-lg text-sm">
                <p>Format attendu :</p>
                <ul className="list-disc list-inside mt-2">
                  <li>Nom</li>
                  <li>Email</li>
                  <li>Téléphone</li>
                  <li>Statut</li>
                  <li>Sujets favoris (séparés par des virgules)</li>
                  <li>Canaux préférés (séparés par des virgules)</li>
                </ul>
              </div>
            </div>

            <div className="mt-6 flex justify-end space-x-3">
              <button onClick={() => setShowImportModal(false)} className="px-4 py-2 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors duration-200">
                Annuler
              </button>
              <button onClick={handleImportContacts} className="px-4 py-2 bg-[#841b60] text-white font-medium rounded-lg hover:bg-[#6d164f] transition-colors duration-200">
                Importer
              </button>
            </div>
          </div>
        </div>}
    </div>;
};
export default Contacts;
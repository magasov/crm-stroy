import { useState } from 'react';
import { Send, Paperclip, Phone, Video, MoreVertical, Search } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card, CardContent } from './ui/card';
import { Avatar, AvatarFallback } from './ui/avatar';
import { ScrollArea } from './ui/scroll-area';

type Contact = {
  id: number;
  name: string;
  lastMessage: string;
  time: string;
  unread: number;
  online: boolean;
};

type Message = {
  id: number;
  sender: 'me' | 'other';
  text: string;
  time: string;
};

const contacts: Contact[] = [
  {
    id: 1,
    name: 'Александр Иванов',
    lastMessage: 'Когда планируется начать работы?',
    time: '10:30',
    unread: 2,
    online: true,
  },
  {
    id: 2,
    name: 'Петр Смирнов',
    lastMessage: 'Спасибо за смету',
    time: 'Вчера',
    unread: 0,
    online: false,
  },
  {
    id: 3,
    name: 'Мария Сидорова',
    lastMessage: 'Нужно обсудить изменения',
    time: 'Вчера',
    unread: 1,
    online: true,
  },
  {
    id: 4,
    name: 'Дмитрий Козлов',
    lastMessage: 'Отлично, согласовано',
    time: '15 ноя',
    unread: 0,
    online: false,
  },
];

const initialMessages: Message[] = [
  {
    id: 1,
    sender: 'other',
    text: 'Здравствуйте! Хотел уточнить по проекту ЖК "Солнечный"',
    time: '10:25',
  },
  {
    id: 2,
    sender: 'me',
    text: 'Добрый день! Конечно, слушаю вас',
    time: '10:26',
  },
  {
    id: 3,
    sender: 'other',
    text: 'Когда планируется начать работы по фасаду?',
    time: '10:27',
  },
  {
    id: 4,
    sender: 'me',
    text: 'Работы начнутся со следующей недели, 25 ноября. Все материалы уже закуплены.',
    time: '10:28',
  },
  {
    id: 5,
    sender: 'other',
    text: 'Отлично! А сроки окончания остаются прежними?',
    time: '10:30',
  },
];

export function Chat() {
  const [selectedContact, setSelectedContact] = useState<Contact>(contacts[0]);
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [newMessage, setNewMessage] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;

    const message: Message = {
      id: messages.length + 1,
      sender: 'me',
      text: newMessage,
      time: new Date().toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages([...messages, message]);
    setNewMessage('');
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase();
  };

  const filteredContacts = contacts.filter((contact) =>
    contact.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="h-screen flex">
      {/* Contacts Sidebar */}
      <div className="w-80 border-r bg-white flex flex-col">
        <div className="p-4 border-b">
          <h2 className="text-xl mb-4">Сообщения</h2>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Поиск..."
              className="pl-9"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <ScrollArea className="flex-1">
          <div className="p-2">
            {filteredContacts.map((contact) => (
              <button
                key={contact.id}
                onClick={() => setSelectedContact(contact)}
                className={`w-full p-3 rounded-lg flex items-center gap-3 hover:bg-gray-50 transition-colors ${
                  selectedContact.id === contact.id ? 'bg-blue-50' : ''
                }`}
              >
                <div className="relative">
                  <Avatar className="w-12 h-12 bg-blue-600">
                    <AvatarFallback className="bg-blue-600 text-white">
                      {getInitials(contact.name)}
                    </AvatarFallback>
                  </Avatar>
                  {contact.online && (
                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white" />
                  )}
                </div>
                <div className="flex-1 text-left">
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="font-medium">{contact.name}</h4>
                    <span className="text-xs text-gray-500">{contact.time}</span>
                  </div>
                  <p className="text-sm text-gray-600 truncate">{contact.lastMessage}</p>
                </div>
                {contact.unread > 0 && (
                  <div className="bg-blue-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {contact.unread}
                  </div>
                )}
              </button>
            ))}
          </div>
        </ScrollArea>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col bg-gray-50">
        {/* Chat Header */}
        <div className="bg-white border-b p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative">
              <Avatar className="w-10 h-10 bg-blue-600">
                <AvatarFallback className="bg-blue-600 text-white">
                  {getInitials(selectedContact.name)}
                </AvatarFallback>
              </Avatar>
              {selectedContact.online && (
                <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white" />
              )}
            </div>
            <div>
              <h3 className="font-medium">{selectedContact.name}</h3>
              <p className="text-sm text-gray-600">
                {selectedContact.online ? 'В сети' : 'Не в сети'}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm">
              <Phone className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="sm">
              <Video className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="sm">
              <MoreVertical className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* Messages */}
        <ScrollArea className="flex-1 p-6">
          <div className="space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === 'me' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-md px-4 py-3 rounded-2xl ${
                    message.sender === 'me'
                      ? 'bg-blue-600 text-white'
                      : 'bg-white text-gray-900'
                  }`}
                >
                  <p>{message.text}</p>
                  <p
                    className={`text-xs mt-1 ${
                      message.sender === 'me' ? 'text-blue-100' : 'text-gray-500'
                    }`}
                  >
                    {message.time}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>

        {/* Input Area */}
        <div className="bg-white border-t p-4">
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm">
              <Paperclip className="w-5 h-5" />
            </Button>
            <Input
              placeholder="Введите сообщение..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  handleSendMessage();
                }
              }}
              className="flex-1"
            />
            <Button
              onClick={handleSendMessage}
              className="bg-blue-600 hover:bg-blue-700"
              disabled={!newMessage.trim()}
            >
              <Send className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

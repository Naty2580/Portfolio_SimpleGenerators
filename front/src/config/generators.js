import { Key, QrCode, User, Smile, IndentIcon } from 'lucide-react';

export const generatorsConfig = [
  {
    id: 'password',
    name: 'Cipher Key',
    description: 'Museumcore minimal password generation.',
    icon: Key,
    path: '/password',
    span: 'col-span-12 md:col-span-6 lg:col-span-4 lg:row-span-2',
    color: 'from-zinc-800 to-zinc-950'
  },
  {
    id: 'qrcode',
    name: 'QR Matrix',
    description: 'Neumorphic styled QR encoding.',
    icon: QrCode,
    path: '/qrcode',
    span: 'col-span-12 md:col-span-6 lg:col-span-8',
    color: 'from-blue-900/40 to-base-dark'
  },
  {
    id: 'randomuser',
    name: 'Identity Forge',
    description: 'Brutalist random identity generator.',
    icon: User,
    path: '/random-user',
    span: 'col-span-12 md:col-span-6 lg:col-span-4',
    color: 'from-yellow-500/20 to-base-dark'
  },
  {
    id: 'joke',
    name: 'Chaos Comedy',
    description: 'Maximalist joke delivery system.',
    icon: Smile,
    path: '/joke',
    span: 'col-span-12 md:col-span-6 lg:col-span-4',
    color: 'from-purple-600/30 to-base-dark'
  },
  {
    id: 'profilecard',
    name: 'Aura Profile',
    description: 'Glassmorphic dynamic profile cards.',
    icon: IndentIcon,
    path: '/profile-card',
    span: 'col-span-12 lg:col-span-8',
    color: 'from-accent/20 to-base-dark'
  }
];
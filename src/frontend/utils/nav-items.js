import { v4 as uuid } from 'uuid';

export default [
    {
        id: uuid(),
        name: 'Marketplace',
        to: '/marketplace',
    },
    {
        id: uuid(),
        name: 'About',
        to: '/about',
    },
    {
        id: uuid(),
        name: 'Create NFT',
        to: '/create',
    },
    {
        id: uuid(),
        name: 'My Listed NFTs',
        to: '/listed',
    },
    {
        id: uuid(),
        name: 'My Purchased NFTs',
        to: '/purchased',
    },
];

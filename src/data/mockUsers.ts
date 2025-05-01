import { User } from '../types';

export const MOCK_USERS: User[] = [
  {
    id: '101',
    email: 'italian.chef@example.com',
    username: 'italianChef',
    profilePicture: 'https://images.pexels.com/photos/3814446/pexels-photo-3814446.jpeg',
    createdAt: new Date('2022-03-14')
  },
  {
    id: '102',
    email: 'spice.expert@example.com',
    username: 'spiceExpert',
    profilePicture: 'https://images.pexels.com/photos/1081685/pexels-photo-1081685.jpeg',
    createdAt: new Date('2022-05-21')
  },
  {
    id: '103',
    email: 'healthy.eater@example.com',
    username: 'healthyEater',
    profilePicture: 'https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg',
    createdAt: new Date('2022-07-08')
  },
  {
    id: '104',
    email: 'baking.queen@example.com',
    username: 'bakingQueen',
    profilePicture: 'https://images.pexels.com/photos/1382731/pexels-photo-1382731.jpeg',
    createdAt: new Date('2022-09-30')
  },
  {
    id: '105',
    email: 'nutritious.cook@example.com',
    username: 'nutritiousCook',
    profilePicture: 'https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg',
    createdAt: new Date('2022-11-12')
  }
];

export default MOCK_USERS;
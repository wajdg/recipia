import { Comment } from '../types';

export const MOCK_COMMENTS: Comment[] = [
  {
    id: '1',
    recipeId: '1',
    userId: '103',
    username: 'healthyEater',
    profilePicture: 'https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg',
    content: 'This pizza was amazing! I used fresh basil from my garden and it made all the difference.',
    createdAt: new Date('2023-06-15')
  },
  {
    id: '2',
    recipeId: '1',
    userId: '105',
    username: 'nutritiousCook',
    profilePicture: 'https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg',
    content: 'I substituted the regular dough with a cauliflower crust and it was still delicious!',
    createdAt: new Date('2023-07-22')
  },
  {
    id: '3',
    recipeId: '2',
    userId: '104',
    username: 'bakingQueen',
    profilePicture: 'https://images.pexels.com/photos/1382731/pexels-photo-1382731.jpeg',
    content: 'This tikka masala is better than my local Indian restaurant! The spice blend is perfect.',
    createdAt: new Date('2023-08-05')
  },
  {
    id: '4',
    recipeId: '3',
    userId: '102',
    username: 'spiceExpert',
    profilePicture: 'https://images.pexels.com/photos/1081685/pexels-photo-1081685.jpeg',
    content: 'I added a pinch of red pepper flakes to give it a kick. Delicious breakfast!',
    createdAt: new Date('2023-09-18')
  },
  {
    id: '5',
    recipeId: '4',
    userId: '101',
    username: 'italianChef',
    profilePicture: 'https://images.pexels.com/photos/3814446/pexels-photo-3814446.jpeg',
    content: 'Perfect cookie recipe! I added some chopped walnuts for extra texture.',
    createdAt: new Date('2023-10-30')
  },
  {
    id: '6',
    recipeId: '5',
    userId: '103',
    username: 'healthyEater',
    profilePicture: 'https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg',
    content: 'This quinoa salad is my go-to lunch prep. I add chickpeas for extra protein.',
    createdAt: new Date('2023-11-14')
  }
];

export default MOCK_COMMENTS;
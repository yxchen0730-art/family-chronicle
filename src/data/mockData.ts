// 模拟数据

export interface Family {
  id: string;
  name: string;
  description: string;
  memberCount: number;
  photoCount: number;
  createdAt: string;
  coverUrl: string;
}

export interface Person {
  id: string;
  name: string;
  gender: '男' | '女';
  birthYear?: number;
  deathYear?: number;
  avatarUrl?: string;
  relation?: string;
  bio?: string;
  photoCount: number;
}

export interface Photo {
  id: string;
  url: string;
  title: string;
  date: string;
  year: number;
  people: string[];
  description?: string;
}

export interface TimelineEvent {
  year: number;
  photos: Photo[];
}

export interface FamilyTreeNode {
  id: string;
  name: string;
  gender: '男' | '女';
  birthYear?: number;
  deathYear?: number;
  spouseId?: string;
  parentId?: string;
  generation: number;
}

export const families: Family[] = [
  { id: '1', name: '张氏家族', description: '源自山东济南的张氏一脉，传承五代', memberCount: 24, photoCount: 156, createdAt: '2024-01-15', coverUrl: 'https://images.unsplash.com/photo-1609220136736-443140cffec6?w=400&h=300&fit=crop' },
  { id: '2', name: '李氏家族', description: '祖籍福建泉州的李氏家族', memberCount: 18, photoCount: 89, createdAt: '2024-03-20', coverUrl: 'https://images.unsplash.com/photo-1511895426328-dc8714191300?w=400&h=300&fit=crop' },
  { id: '3', name: '王氏家族', description: '北京王氏，四世同堂', memberCount: 32, photoCount: 210, createdAt: '2023-11-08', coverUrl: 'https://images.unsplash.com/photo-1516733725897-1aa73b87c8e8?w=400&h=300&fit=crop' },
];

export const people: Person[] = [
  { id: '1', name: '张明远', gender: '男', birthYear: 1935, deathYear: 2010, relation: '祖父', bio: '张氏家族第三代长子，一生从事教育工作，桃李满天下。', photoCount: 23 },
  { id: '2', name: '李秀兰', gender: '女', birthYear: 1938, deathYear: 2018, relation: '祖母', bio: '温婉贤淑，操持家务数十年，是全家的精神支柱。', photoCount: 19 },
  { id: '3', name: '张建国', gender: '男', birthYear: 1960, relation: '父亲', bio: '继承父志投身教育，现为大学教授。', photoCount: 45 },
  { id: '4', name: '王美华', gender: '女', birthYear: 1962, relation: '母亲', bio: '医院护士长，照顾家庭三十余年。', photoCount: 38 },
  { id: '5', name: '张小明', gender: '男', birthYear: 1988, relation: '长子', bio: '软件工程师，热爱摄影和家族历史记录。', photoCount: 67 },
  { id: '6', name: '张小丽', gender: '女', birthYear: 1991, relation: '长女', bio: '自由设计师，负责家族相册的整理工作。', photoCount: 52 },
];

export const photos: Photo[] = [
  { id: '1', url: 'https://images.unsplash.com/photo-1609220136736-443140cffec6?w=400&h=400&fit=crop', title: '全家福', date: '1985-02-10', year: 1985, people: ['张明远', '李秀兰', '张建国'], description: '1985年春节，三代人的第一张全家福' },
  { id: '2', url: 'https://images.unsplash.com/photo-1511895426328-dc8714191300?w=400&h=400&fit=crop', title: '婚礼照片', date: '1958-10-01', year: 1958, people: ['张明远', '李秀兰'], description: '祖父母的婚礼，在济南举办' },
  { id: '3', url: 'https://images.unsplash.com/photo-1516733725897-1aa73b87c8e8?w=400&h=400&fit=crop', title: '儿时回忆', date: '1992-07-15', year: 1992, people: ['张小明', '张小丽'], description: '兄妹俩在老家院子里玩耍' },
  { id: '4', url: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=400&h=400&fit=crop', title: '毕业典礼', date: '2010-06-20', year: 2010, people: ['张小明'], description: '大学毕业典礼' },
  { id: '5', url: 'https://images.unsplash.com/photo-1491438590914-bc09fcaaf77a?w=400&h=400&fit=crop', title: '家庭聚餐', date: '2019-02-05', year: 2019, people: ['张建国', '王美华', '张小明', '张小丽'], description: '2019年除夕年夜饭' },
  { id: '6', url: 'https://images.unsplash.com/photo-1476234251651-f353a9b0879c?w=400&h=400&fit=crop', title: '老房子', date: '1975-03-12', year: 1975, people: [], description: '济南老家的四合院' },
  { id: '7', url: 'https://images.unsplash.com/photo-1506869640319-fe1a24fd76cb?w=400&h=400&fit=crop', title: '春游', date: '1995-04-08', year: 1995, people: ['张小明', '张小丽'], description: '跟着爷爷奶奶去公园春游' },
  { id: '8', url: 'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?w=400&h=400&fit=crop', title: '生日宴', date: '2005-08-18', year: 2005, people: ['张明远'], description: '爷爷七十大寿' },
];

export const timelineEvents: TimelineEvent[] = [
  { year: 1958, photos: photos.filter(p => p.year === 1958) },
  { year: 1975, photos: photos.filter(p => p.year === 1975) },
  { year: 1985, photos: photos.filter(p => p.year === 1985) },
  { year: 1992, photos: photos.filter(p => p.year === 1992) },
  { year: 1995, photos: photos.filter(p => p.year === 1995) },
  { year: 2005, photos: photos.filter(p => p.year === 2005) },
  { year: 2010, photos: photos.filter(p => p.year === 2010) },
  { year: 2019, photos: photos.filter(p => p.year === 2019) },
];

export const familyTreeNodes: FamilyTreeNode[] = [
  { id: '1', name: '张明远', gender: '男', birthYear: 1935, deathYear: 2010, generation: 1, spouseId: '2' },
  { id: '2', name: '李秀兰', gender: '女', birthYear: 1938, deathYear: 2018, generation: 1 },
  { id: '3', name: '张建国', gender: '男', birthYear: 1960, parentId: '1', generation: 2, spouseId: '4' },
  { id: '4', name: '王美华', gender: '女', birthYear: 1962, generation: 2 },
  { id: '5', name: '张小明', gender: '男', birthYear: 1988, parentId: '3', generation: 3 },
  { id: '6', name: '张小丽', gender: '女', birthYear: 1991, parentId: '3', generation: 3 },
];

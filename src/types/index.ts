import type {
  Community,
  CommunityMember,
  Match,
  Message,
  User,
  UserPhoto,
} from '@prisma/client';

// User types
export type UserWithPhotos = User & {
  photos: UserPhoto[];
};

export type UserProfile = UserWithPhotos & {
  age: number;
};

// Community types
export type CommunityWithMembers = Community & {
  members: (CommunityMember & {
    user: User;
  })[];
  creator: User | null;
};

// Match types
export type MatchWithUsers = Match & {
  user1: UserWithPhotos;
  user2: UserWithPhotos;
  messages: Message[];
};

// Auth types
export interface AuthUser {
  id: string;
  email: string;
  email_verified?: boolean;
  user_metadata?: {
    display_name?: string;
    avatar_url?: string;
  };
}

// Form types
export interface ProfileSetupData {
  displayName: string;
  birthDate: Date;
  gender: 'MALE' | 'FEMALE' | 'OTHER';
  prefecture: string;
  city?: string;
  occupation?: string;
  interests: string[];
  lookingFor: 'FRIENDSHIP' | 'ROMANCE' | 'HOBBY_PARTNER' | 'COUNSELOR';
  bio?: string;
}

// UI types
export interface TabNavigationItem {
  id: string;
  label: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
}

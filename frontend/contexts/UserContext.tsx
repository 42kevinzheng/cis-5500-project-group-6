import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface User {
  id: string;
  username: string;
  email: string;
}

interface LikedItems {
  songs: Set<string>;
  artists: Set<string>;
  albums: Set<string>;
}

interface UserContextType {
  user: User | null;
  likedItems: LikedItems;
  login: (email: string, password: string) => boolean;
  register: (username: string, email: string, password: string) => boolean;
  logout: () => void;
  toggleLike: (type: 'songs' | 'artists' | 'albums', itemId: string) => void;
  isLiked: (type: 'songs' | 'artists' | 'albums', itemId: string) => boolean;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [likedItems, setLikedItems] = useState<LikedItems>({
    songs: new Set(),
    artists: new Set(),
    albums: new Set(),
  });

  // Load user and liked items from localStorage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      const userData = JSON.parse(storedUser);
      setUser(userData);
      loadLikedItems(userData.id);
    }
  }, []);

  const loadLikedItems = (userId: string) => {
    const stored = localStorage.getItem(`likes_${userId}`);
    if (stored) {
      const parsed = JSON.parse(stored);
      setLikedItems({
        songs: new Set(parsed.songs || []),
        artists: new Set(parsed.artists || []),
        albums: new Set(parsed.albums || []),
      });
    } else {
      setLikedItems({
        songs: new Set(),
        artists: new Set(),
        albums: new Set(),
      });
    }
  };

  const saveLikedItems = (userId: string, items: LikedItems) => {
    const toStore = {
      songs: Array.from(items.songs),
      artists: Array.from(items.artists),
      albums: Array.from(items.albums),
    };
    localStorage.setItem(`likes_${userId}`, JSON.stringify(toStore));
  };

  const register = (username: string, email: string, password: string): boolean => {
    // Get existing users
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    
    // Check if email already exists
    if (users.some((u: any) => u.email === email)) {
      return false;
    }

    // Create new user
    const newUser: User & { password: string } = {
      id: Date.now().toString(),
      username,
      email,
      password, // In real app, this should be hashed
    };

    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));

    // Auto login after registration
    const { password: _, ...userWithoutPassword } = newUser;
    setUser(userWithoutPassword);
    localStorage.setItem('currentUser', JSON.stringify(userWithoutPassword));
    loadLikedItems(userWithoutPassword.id);

    return true;
  };

  const login = (email: string, password: string): boolean => {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const foundUser = users.find((u: any) => u.email === email && u.password === password);

    if (foundUser) {
      const { password: _, ...userWithoutPassword } = foundUser;
      setUser(userWithoutPassword);
      localStorage.setItem('currentUser', JSON.stringify(userWithoutPassword));
      loadLikedItems(userWithoutPassword.id);
      return true;
    }

    return false;
  };

  const logout = () => {
    setUser(null);
    setLikedItems({
      songs: new Set(),
      artists: new Set(),
      albums: new Set(),
    });
    localStorage.removeItem('currentUser');
  };

  const toggleLike = (type: 'songs' | 'artists' | 'albums', itemId: string) => {
    if (!user) return;

    setLikedItems((prev) => {
      const newItems = { ...prev };
      const set = new Set(prev[type]);
      
      if (set.has(itemId)) {
        set.delete(itemId);
      } else {
        set.add(itemId);
      }
      
      newItems[type] = set;
      saveLikedItems(user.id, newItems);
      return newItems;
    });
  };

  const isLiked = (type: 'songs' | 'artists' | 'albums', itemId: string): boolean => {
    return likedItems[type].has(itemId);
  };

  return (
    <UserContext.Provider value={{ user, likedItems, login, register, logout, toggleLike, isLiked }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}

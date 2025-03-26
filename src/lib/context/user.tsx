'use client';

import { createContext, useContext, useEffect, useState } from 'react';

import type { Character } from '@/components/card';

interface UserContextType {
    collection: Character[];
    addToCollection: (character: Character) => void;
    removeFromCollection: (characterId: number) => void;
}

const UserContext = createContext<UserContextType>({
    collection: [],
    addToCollection: () => { },
    removeFromCollection: () => { },
});

export function UserProvider({ children }: React.PropsWithChildren) {
    const [collection, setCollection] = useState<Character[]>([]);

    const addToCollection = (character: Character) => {
        setCollection((prev) => {
            const updatedCollection = [...prev, {
                ...character,
                media: [character.media ? character.media[0] : 'Unknown'],
            }];
            localStorage.setItem('collection', JSON.stringify(updatedCollection));
            return updatedCollection;
        });
    };

    const removeFromCollection = (characterId: number) => {
        setCollection((prev) => {
            const updatedCollection = prev.filter((char) => char.id !== characterId);
            localStorage.setItem('collection', JSON.stringify(updatedCollection));
            return updatedCollection;
        });
    };

    useEffect(() => {
        const storedCollection = localStorage.getItem('collection');
        if (storedCollection) {
            setCollection(JSON.parse(storedCollection));
        } else {
            setCollection([]);
        }
    }, []);

    return (
        <UserContext.Provider value={{ collection: collection, addToCollection, removeFromCollection }}>
            {children}
        </UserContext.Provider>
    );
}

export function useUserContext() {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error('useUserContext must be used within a UserProvider');
    }
    return context;
}
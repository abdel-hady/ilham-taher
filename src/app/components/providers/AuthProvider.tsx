'use client';

import { MiniUser, User } from '@/app/util/types/local-types';
import React, { createContext, useContext, useMemo } from 'react';

interface AuthContextProps {
	user: User | null;
	isLoggedIn: () => boolean;
	getMiniUser: () => MiniUser | null;
	canDisplayVerify: () => boolean;
}

export const AuthContext = createContext<AuthContextProps>({
	user: null,
	isLoggedIn: () => false,
	getMiniUser: () => null,
	canDisplayVerify: () => false,
});

interface AuthProviderProps {
	user: User | null;
	children: React.ReactNode;
}

export function AuthProvider({ user, children }: AuthProviderProps) {
	const isLoggedIn = () => Boolean(user);
	const canDisplayVerify = () => {
		if (isLoggedIn() && user?.verifiedAt === null) {
			return true;
		}
		return false;
	};
	const getMiniUser = () => {
		if (!user) {
			return null;
		}
		return {
			name: `${user.firstName} ${user.lastName}`,
			avatar: user.avatarFileUrl,
			email: user.email,
		} as MiniUser;
	};
	const value = useMemo(() => ({
		user, isLoggedIn, getMiniUser, canDisplayVerify,
	}), [user]);
	return (
		<AuthContext.Provider value={value}>
			{children}
		</AuthContext.Provider>
	);
}

export const useAuth = (): AuthContextProps => useContext(AuthContext);

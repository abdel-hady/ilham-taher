import { useState } from 'react';

type UseDropdownReturnType = {
	isOpen: boolean,
	openDropdown: () => void,
	closeDropdown: () => void,
	toggleDropdown: () => void,
};

const useDropdown = (initialState: boolean = false): UseDropdownReturnType => {
	const [isOpen, setIsOpen] = useState<boolean>(initialState);

	const openDropdown = () => {
		setIsOpen(true);
	};

	const closeDropdown = () => {
		setIsOpen(false);
	};

	const toggleDropdown = () => {
		setIsOpen(!isOpen);
	};

	return {
		isOpen, openDropdown, closeDropdown, toggleDropdown,
	};
};


export default useDropdown;

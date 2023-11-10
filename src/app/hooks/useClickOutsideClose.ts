import { RefObject, useEffect, useRef } from 'react';

interface UseClickOutsideCloseProps {
	closeCb: () => void;
}

interface UseClickOutsideCloseReturn {
	dropdownRef: RefObject<HTMLDivElement>;
}

const useClickOutsideClose = ({
	closeCb,
}: UseClickOutsideCloseProps): UseClickOutsideCloseReturn => {
	const dropdownRef = useRef<HTMLDivElement | null>(null);

	const handleClickOutside = (event: any) => {
		if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
			closeCb();
		}
	};

	useEffect(() => {
		document.addEventListener('click', handleClickOutside);
		return () => {
			document.removeEventListener('click', handleClickOutside);
		};
	}, []);

	return { dropdownRef };
};

export default useClickOutsideClose;

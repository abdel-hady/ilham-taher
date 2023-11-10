import useClickOutsideClose from '@/app/hooks/useClickOutsideClose';
import useDropdown from '@/app/hooks/useDropdown';
import Link from 'next/link';
import React from 'react';

interface DropdownOption {
	title: string,
	link: string,
}

interface DropdownWithOptionsProps {
	title: string,
	options: DropdownOption[],
}

export default function DropdownWithOptions({ title, options }: DropdownWithOptionsProps) {
	const {
		isOpen, closeDropdown, toggleDropdown,
	} = useDropdown(false);

	const handleLiClicked = (event: any) => {
		if (event.key === 'Enter') {
			closeDropdown();
		}
	};


	const { dropdownRef } = useClickOutsideClose({ closeCb: closeDropdown });

	return (
		<div ref={dropdownRef} className="relative">
			<div
				onClick={toggleDropdown}
				className="text-gray-800 hover:text-gray-600 px-3 py-4 lg:py-2 flex items-center text-xs uppercase font-bold"
				onKeyDown={handleLiClicked}
				role="button"
				tabIndex={0}
			>
				<span>{title}</span>
			</div>
			{
				isOpen	&& (
					<ul className="absolute bg-slate-50 shadow-lg rounded-lg py-1 z-50 w-40 right-0">
						{options.map((option) => (
							<Link href={option.link}>
								<li key={option.link} className="py-3 hover:bg-gray-200 px-5">
									<button type="button" className="w-full text-left" onClick={closeDropdown} onKeyDown={handleLiClicked}>
										{option.title}
									</button>
								</li>
							</Link>
						))}
					</ul>
				)
			}

		</div>

	);
}

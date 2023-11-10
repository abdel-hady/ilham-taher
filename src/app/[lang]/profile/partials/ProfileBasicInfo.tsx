'use client';

import parseImageUrl from '@/app/util/parseImageUrl';
import { MiniUser } from '@/app/util/types/local-types';
import { faClose, faEdit, faLock } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Image from 'next/image';
import React, { useState } from 'react';
import ChangePasswordModal from '@/app/[lang]/profile/partials/modals/ChangePasswordModal';
import ShowModal from '@/app/[lang]/profile/partials/modals/showModal';
import EditProfileImageModal from './modals/EditProfileImageModal';
import DeleteProfileImageModal from './modals/DeleteProfileImageModal';

interface ProfileBasicInfoType {
	miniUser: MiniUser;
}

function HoverButton({ icon, onClick }: { icon: any, onClick: ()=>void }) {
	return (
		<button
			className="
				bg-golden text-grey-700
				hover:bg-greenish hover:text-white
				hover:scale-110
				transform duration-200
				flex justify-center items-center
			"
			style={{
				width: '50px',
				height: '50px',
				borderRadius: '50%',
				padding: '10px',
				cursor: 'pointer',
			}}
			type="button"
			onClick={onClick}
		>
			<FontAwesomeIcon icon={icon} size="xl" />
		</button>
	);
}
export default function ProfileBasicInfo({ miniUser }:ProfileBasicInfoType) {
	const [isEditProfileModalOpen, setIsEditProfileModalOpen] = useState<boolean>(false);
	const [isDeleteImageModalOpen, setIsDeleteImageModalOpen] = useState<boolean>(false);
	const [isChangePasswordModalOpen, setIsChangePasswordModalOpen] = useState<boolean>(false);

	return (
		<>
			<div className="
				relative
				w-full rounded-lg p-4
				border-dashed border-golden border-4"
			>
				<Image
					width={1000}
					height={1000}
					alt="profile cover image"
					src={parseImageUrl(miniUser.avatar)}
					className="object-cover rounded-lg h-72"
				/>

				<div
					className="absolute top-2 bottom-2 flex gap-2 flex-col"
				>
					<HoverButton icon={faEdit} onClick={() => { setIsEditProfileModalOpen(true); }} />
					<HoverButton icon={faClose} onClick={() => { setIsDeleteImageModalOpen(true); }} />
					<HoverButton icon={faLock} onClick={() => { setIsChangePasswordModalOpen(true); }} />

				</div>

			</div>
			<div className="
				w-full rounded-lg
				text-center p-8 mt-8 text-greenish
				border-dashed border-greenish border-2 "
			>
				{miniUser.name}
				<br />
				{miniUser.email}
			</div>
			<EditProfileImageModal
				isOpen={isEditProfileModalOpen}
				closeModal={() => { setIsEditProfileModalOpen(false); }}
			/>
			<DeleteProfileImageModal
				isOpen={isDeleteImageModalOpen}
				closeModal={() => { setIsDeleteImageModalOpen(false); }}
			/>
			<ChangePasswordModal
				isOpen={isChangePasswordModalOpen}
				closeModal={() => { setIsChangePasswordModalOpen(false); }}
			/>
			<ShowModal title="thank_you_for_verifying_your_email" description="your_email_verified" param="verified" />
		</>
	);
}

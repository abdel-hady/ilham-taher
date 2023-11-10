'use client';

/* eslint-disable consistent-return */
import React, { useEffect, useRef, useState } from 'react';
import Vimeo from '@vimeo/player';

export default function CustomVimeoPlayer({ videoId }: { videoId: string }) {
	const playerRef = useRef(null);

	const [playerReady, setPlayerReady] = useState<boolean>(false);
	useEffect(() => {
		if (!videoId || !playerRef || !playerRef.current) {
			return;
		}
		const options = {
			id: parseInt(videoId, 10),
			autoplay: true,
			muted: true,
			loop: true,
			controls: true,
			responsive: true,
			speed: false,
			background: false,
			byline: false,
			title: false,
			portrait: false,
			badge: false,
			share: false,
			collections: false,
		} as Vimeo.Options;

		const player = new Vimeo(playerRef.current, options);
		player.on('loaded', () => {
			setPlayerReady(true);
		});
		return () => {
			player.destroy();
		};
	}, [videoId, playerRef]);


	return (
		<>
			<div className={`
				w-full h-[600px] bg-white flex justify-center border-2 border-gray-200 rounded-lg
				${playerReady ? 'hidden' : 'block'}
			`}
			>
				<span className="loading loading-spinner loading-lg text-golden" />
			</div>
			<div ref={playerRef} className={`${playerReady ? ' block' : 'hidden'}`} style={{ width: '100%' }} />
		</>

	);
}

import React from 'react';
import { Session } from '@/app/util/types/remote-types';
import parseImageUrl from '@/app/util/parseImageUrl';
import WideCardImage from './partials/WideCardImage';
import WideCardText from './partials/WideCardText';

interface SessionWideCardProps {
	session: Session,
	imgOnLeft: boolean,
}

export default function SessionWideCard({ session, imgOnLeft }: SessionWideCardProps) {
	return (
		<div>
			<div
				className={`
				w-full rounded-lg shadow-lg relative
				flex flex-row min-h-600-sm ${imgOnLeft ? '' : ' justify-end'}
				h-[80vh] md:h-[65vh] lg:h-[500px] border-golden border-2
				`}
				style={{
					background: 'url("/assets/images/heros/bg/flowers-low-opcaity.jpg")',
					backgroundSize: 'cover',
					backgroundPosition: 'center',
				}}
			>
				<div className="w-10 bg-golden lg:w-32">
					<div />
				</div>
				<div className={`
					absolute top-0 left-0 right-0 bottom-0 overflow-hidden rounded-l-xl px-12 flex items-center gap-4 justify-center lg:w-full
					${imgOnLeft ? ' flex-col lg:flex-row ' : ' flex-col-reverse lg:flex-row lg:py-12'} 
				`}
				>
					{imgOnLeft ? (
						<>
							<WideCardImage
								title={session.name}
								coverImg={parseImageUrl(session.externalImageFileUrl)}
								easeInFromLeft
							/>
							<WideCardText
								slug={session.slug}
								description={session.shortDescription}
								title={session.name}
								easeInFromLeft={false}
								icons={session.icons}
							/>
						</>
					) : (
						<>
							<WideCardText
								slug={session.slug}
								description={session.shortDescription}
								title={session.name}
								easeInFromLeft
								icons={session.icons}
							/>
							<WideCardImage
								title={session.name}
								coverImg={parseImageUrl(session.externalImageFileUrl)}
								easeInFromLeft={false}
							/>
						</>
					)}
				</div>
			</div>
		</div>
	);
}

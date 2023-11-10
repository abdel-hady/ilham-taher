import React from 'react';
import { Lesson } from '@/app/util/types/remote-types';
import parseImageUrl from '@/app/util/parseImageUrl';
import WideCardImage from './partials/WideCardImage';
import WideCardText from './partials/WideCardText';

interface LessonWideCardProps {
	lesson: Lesson;
	imgOnLeft: boolean;
	onClick: ()=>void;
}

export default function LessonWideCard({ lesson, imgOnLeft, onClick }: LessonWideCardProps) {
	return (
		<div>
			<div
				className={`
				w-full rounded-lg shadow-lg relative
				flex flex-row ${imgOnLeft ? '' : ' justify-end'}
				h-[80vh] lg:h-[70vh] border-golden border-2
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
								title={lesson.title}
								coverImg={parseImageUrl(lesson.featureImageUrl)}
								easeInFromLeft
							/>
							<WideCardText
								description={lesson.description}
								title={lesson.title}
								easeInFromLeft={false}
								icons={[]}
								onClick={onClick}
								isFree={lesson.free}
							/>
						</>
					) : (
						<>
							<WideCardText
								description={lesson.description}
								title={lesson.title}
								easeInFromLeft
								icons={[]}
								onClick={onClick}
								isFree={lesson.free}

							/>
							<WideCardImage
								title={lesson.title}
								coverImg={parseImageUrl(lesson.featureImageUrl)}
								easeInFromLeft={false}
							/>
						</>
					)}
				</div>
			</div>
		</div>
	);
}

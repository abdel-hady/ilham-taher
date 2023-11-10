import Image from 'next/image';
import React from 'react';

interface SessionWideCardProps {
	title: string;
	description: string;
	// id: number;
	coverImg: string;
	imgOnLeft?: boolean;
}


function SessionWideCard({
	title, description, coverImg, imgOnLeft = false,
}: SessionWideCardProps) {
	return (
		<>
			<div className="block lg:hidden relative rounded-lg ">
				<div className="h-96 relative overflow-hidden rounded-lg">
					<Image
						className="rounded-lg w-full object-cover"
						src={coverImg}
						width={1000}
						height={1000}
						alt={`${title} cover image`}
					/>
					<div className="block lg:hidden absolute top-0 left-0 right-0 bottom-0 bg-gray-500 opacity-50 " />
					<div className="absolute top-0 left-0 right-0 bottom-0 flex flex-col justify-center px-8 w-full sm:w-2/3">
						<h4 className="w-full text-white text-2xl sm:text-3xl font-bold mb-2">{title}</h4>
						<p className="text-white text-sm sm:text-base md:text-lg  mb-4">{description}</p>
						<button type="button" className="w-1/4 h-13 text-sm bg-yellow-200 sm:text-lg  py-2 rounded-tr-lg rounded-bl-lg">
							Learn More
						</button>
					</div>
				</div>
			</div>

			<div className="lg:grid rounded-lg shadow-lg grid grid-cols-2" style={{ height: '400px' }}>
				{imgOnLeft
					? (
						<>
							<div className="overflow-hidden rounded-l-xl relative">
								<Image
									src={coverImg}
									width={1000}
									height={1000}
									alt={`${title} cover image`}
									className="w-full  h-full object-cover object-center absolute top-0"
								/>
							</div>
							<div className="p-12 flex flex-col gap-7 text-left">
								<h4 className="text-3xl font-bold">{title}</h4>
								<p className="text-md">{description}</p>
								<button type="button" className="w-1/4 border-solid border-2 border-yellow-600 py-4 rounded-tr-lg rounded-bl-lg">Learn More</button>
							</div>
						</>
					)
					: (
						<>

							<div className="p-12 flex flex-col gap-7 text-left">
								<h4 className="text-3xl font-bold">{title}</h4>
								<p className="text-md">{description}</p>
								<button type="button" className="w-1/4 border-solid border-2 border-yellow-600 py-4 rounded-tr-lg rounded-bl-lg">Learn More</button>
							</div>
							<div className=" overflow-hidden rounded-r-xl relative">
								<Image
									src={coverImg}
									width={1000}
									height={1000}
									alt={`${title} cover image`}
									className="w-full  h-full object-cover object-center absolute top-0"
								/>
							</div>
						</>
					)}

			</div>
		</>
	);
}

export default function SessionsSection() {
	const sessions = [
		{
			title: "Why It's Important to Take Care of Your Mental Health",
			description: 'Learn about the importance of maintaining good mental health and how to prioritize your mental wellbeing. Learn about the importance of maintaining good mental health and how to prioritize your mental wellbeing.',
			id: 456,
			coverImg: '/assets/images/chairs.png',
			imgOnLeft: true,
		},
		{
			title: "Why It's Important to Take Care of Your Mental Health",
			description: 'Learn about the importance of maintaining good mental health and how to prioritize your mental wellbeing. Learn about the importance of maintaining good mental health and how to prioritize your mental wellbeing.',
			id: 456,
			coverImg: '/assets/images/chairs.png',
			imgOnLeft: false,

		},
		{
			title: "Why It's Important to Take Care of Your Mental Health",
			description: 'Learn about the importance of maintaining good mental health and how to prioritize your mental wellbeing. Learn about the importance of maintaining good mental health and how to prioritize your mental wellbeing.',
			id: 456,
			coverImg: '/assets/images/chairs.png',
			imgOnLeft: true,

		},
	];

	return (
		<section className=" container mx-auto w-full">
			<h2 className=" text-center text-4xl font-bold mb-5">Our Sessions</h2>

			<div className="flex flex-col gap-5">
				{sessions.map((session) => (
					<SessionWideCard
						key={session.id}
						title={session.title}
						description={session.description}
						// id={session.id}
						coverImg={session.coverImg}
						imgOnLeft={session.imgOnLeft}
					/>
				))}
			</div>
		</section>
	);
}

SessionWideCard.defaultProps = {
	imgOnLeft: false,
};

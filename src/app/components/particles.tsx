'use client';

import React, { useCallback } from 'react';
import type { Engine } from 'tsparticles-engine';
import Particles from 'react-particles';
import { loadFull } from 'tsparticles';

function ParticlesComponent() {
	const particlesInit = useCallback(async (engine: Engine) => {
		await loadFull(engine);
	}, []);

	const particlesLoaded = useCallback(async () => {
	}, []);
	return (
		<div className="absolute z-0">
			<Particles
				id="tsparticles"
				init={particlesInit}
				loaded={particlesLoaded}
				options={
					{
						particles: {
							number: {
								value: 100,
								density: {
									enable: true,
									value_area: 1000,
								},
							},
							color: {
								value: 'rgb(223, 176, 90)',
							},
							shape: {
								type: 'circle',
								stroke: {
									width: 0,
									color: '#000000',
								},
								image: {
									src: 'img/github.svg',
									width: 100,
									height: 100,
								},
							},
							opacity: {
								value: 0.9,
								random: false,
								anim: {
									enable: true,
									speed: 0.9,
									opacity_min: 0,
									sync: false,
								},
							},
							size: {
								value: 7,
								random: false,
								anim: {
									enable: true,
									speed: 3,
									size_min: 0,
									sync: false,
								},
							},
							line_linked: {
								enable: false,
								distance: 150,
								color: '#ffffff',
								opacity: 0,
								width: 0,
							},
							move: {
								enable: true,
								speed: 3, // Set a fixed speed here
								direction: 'none',
								random: true,
								straight: false,
								out_mode: 'out',
								bounce: false,
								attract: {
									enable: false,
									rotateX: 600,
									rotateY: 1200,
								},
							},
						},
					}
				}
			/>
		</div>
	);
}


export default ParticlesComponent;

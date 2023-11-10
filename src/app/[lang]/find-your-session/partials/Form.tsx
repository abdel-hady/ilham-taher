'use client';

import React, { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';
import StandardBtn from '@/app/components/common/StandardBtn';
import QuestionDisplayer from './QuestionDisplayer';
import handleDataOfForm from './data';

interface IForm {
	q1: 'yes' | 'no' | null;
	q1_1: 'yes' | 'no' | null;
	q2: 'yes' | 'no' | null;
	q3: 'yes' | 'no' | null;
	q4: 'yes' | 'no' | null;
	q5: 'yes' | 'no' | null;
	q6: 'yes' | 'no' | null;
	q7: 'yes' | 'no' | null;
	q8: 'yes' | 'no' | null;
	q9: 'yes' | 'no' | null;

}

export default function Form({ onSubmitHandler }:{ onSubmitHandler:(keys:string[])=>void }) {
	const [isSubQuestion1Shown, setIsSubQuestion1Shown] = useState<boolean>(false);
	const t = useTranslations();
	const {
		register, handleSubmit, setValue, watch, formState: { errors },
	} = useForm<IForm>();


	const onSubmit = (data: IForm) => {
		const sessionKeys = handleDataOfForm(data);
		onSubmitHandler(sessionKeys);
	};

	const q1Value = watch('q1');


	useEffect(() => {
		if (q1Value === 'yes') {
			setIsSubQuestion1Shown(true);
		} else {
			setValue('q1_1', null);
			setIsSubQuestion1Shown(false);
		}
	}, [q1Value]);

	return (
		<section>
			<div className="
                shadow-lg bg-white border-2 border-gray-200
                p-6 md:p-24 pt-12 rounded-lg
				bg-flowers text-greenish
                "
			>

				<h1 className="text-center text-4xl mb-10">{t('find_your_session_page')}</h1>
				<div className="divider" />


				<form className="flex flex-col gap-3" onSubmit={handleSubmit(onSubmit)}>

					<QuestionDisplayer errors={errors} questionNumber="1" register={register} />

					{isSubQuestion1Shown && (
						<div className="px-5">
							<QuestionDisplayer errors={errors} questionNumber="1_1" register={register} />
						</div>
					)}

					<div className="divider" />

					<QuestionDisplayer errors={errors} questionNumber="2" register={register} />

					<div className="divider" />

					<QuestionDisplayer errors={errors} questionNumber="3" register={register} />

					<div className="divider" />

					<QuestionDisplayer errors={errors} questionNumber="4" register={register} />

					<div className="divider" />

					<QuestionDisplayer errors={errors} questionNumber="5" register={register} />

					<div className="divider" />

					<QuestionDisplayer errors={errors} questionNumber="6" register={register} />

					<div className="divider" />

					<QuestionDisplayer errors={errors} questionNumber="7" register={register} />

					<div className="divider" />

					<QuestionDisplayer errors={errors} questionNumber="8" register={register} />

					<div className="divider" />

					<QuestionDisplayer errors={errors} questionNumber="9" register={register} />


					<div className="flex justify-center mt-5">

						<StandardBtn text={t('submit')} buttonType="submit" />
					</div>
				</form>
			</div>
		</section>
	);
}

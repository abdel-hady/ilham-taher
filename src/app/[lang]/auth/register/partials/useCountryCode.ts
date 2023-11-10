/* eslint-disable max-len */
import { Country } from '@/app/util/types/remote-types';
import { useEffect, useState } from 'react';

interface UseCountryCodeProps { selectedCountryValue: number; 	countries: Country[]; }

export default function useCountryCode({ selectedCountryValue, countries }: UseCountryCodeProps) {
	const [selectedCountryCode, setSelectedCountryCode] = useState<string | null>(null);

	useEffect(() => {
		if (!selectedCountryValue || parseInt(selectedCountryValue?.toString(), 10) === (-1)) {
			return;
		}
		const selectedCountryObject = countries.find((country) => country.id.toString() === selectedCountryValue.toString());
		setSelectedCountryCode(selectedCountryObject!.phoneNumberCode!);
	}, [selectedCountryValue]);

	return { selectedCountryCode };
}

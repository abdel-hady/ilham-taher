import ObjectToFormData from '../../ObjectToFormData';


const DataToSendParser = (data: any, isFormData: boolean = false): FormData | string => {
	let dataToSend: FormData | string;

	if (isFormData) {
		dataToSend = ObjectToFormData(data);
	} else {
		dataToSend = JSON.stringify(data);
	}
	return dataToSend;
};


export default DataToSendParser;

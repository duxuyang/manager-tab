

const env = process.env.NODE_ENV;
const envProduction = 'production';
export const UATHOST: string = 'http://bms.uat.shopshops.top';
export const DEVHOST: string = 'http://bms.test.shopshops.top';
export const PRODUCTIONHOST: string = 'http://develop.shopshops.top:50001/';
export const getBaseUrl = () => {
	const envFlag = process.env.VUE_APP_FLAG;
	// console.log('------------------222', process.env);
	if (env === 'production' && envFlag === 'pro' ) {
		return PRODUCTIONHOST;
	} else if (env === 'production' && envFlag === 'test') {
		return DEVHOST;
	} else if (env === 'production' && envFlag === 'uat') {
		return UATHOST;
	} else if (env.includes('dev')) {
		return DEVHOST;
	} else {
		return location.origin;
	}
};

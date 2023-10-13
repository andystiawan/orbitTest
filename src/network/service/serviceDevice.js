import {get} from '../helper';
import json2 from '../json/orbit-fe-test-2.json';

export const deviceList = async () => {
  return await get('https://s3-preprod.myorbit.id/files/orbit-fe-test-2.json');
};

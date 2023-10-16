import {get} from '../helper';
import json1 from '../json/orbit-fe-test-1.json';

export const getModemList = async () => {
  return await get('https://s3-preprod.myorbit.id/files/orbit-fe-test-1.json');
};

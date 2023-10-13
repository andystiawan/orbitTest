var myHeaders = new Headers();
myHeaders.append('authority', 's3-preprod.myorbit.id');
myHeaders.append(
  'accept',
  'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
);
myHeaders.append(
  'user-agent',
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/117.0.0.0 Safari/537.36 Edg/117.0.2045.60',
);

var requestOptions = {
  method: 'GET',
  headers: myHeaders,
  redirect: 'follow',
};

export const get = async url => {
  const response = await fetch(url, requestOptions)
    .then(res => res.text())
    .catch(err => err);
  return response;
};

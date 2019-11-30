import sha1 from 'sha1';

export const removeImage = (image) => {
  const timeStamp = Date.now();
  const filename = image.split('/').pop();
  const imageId = filename.split('.').shift();
  const toSha = `public_id=my-jam/${imageId}&timestamp=${timeStamp}${process.env.CLOUDINARY_API_SECRET}`;
  
  const data = new FormData();
  data.append('public_id', `my-jam/${imageId}`);
  data.append('timestamp', timeStamp);
  data.append('api_key', process.env.CLOUDINARY_API_KEY);
  data.append('signature', sha1(toSha));
  
  return fetch(
    'https://api.cloudinary.com/v1_1/margaridadinis/image/destroy',
    {
      method: 'POST',
      body: data,
    },
  ).then(() => console.log('image was removed'));
};

export const uploadImage = async(image) => {
  const data = new FormData();
  data.append('file', image);
  data.append('upload_preset', 'albums');
  data.append('public_id', Date.now());
  
  const response = await fetch(
    'https://api.cloudinary.com/v1_1/margaridadinis/image/upload',
    {
      method: 'POST',
      body: data,
    },
  );
  
  return await response.json();
};

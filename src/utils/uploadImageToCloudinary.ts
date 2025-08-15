export const uploadImageToCloudinary = async (
  file: string
): Promise<string> => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', 'portfolio_upload');
  formData.append('cloud_name', 'dtvnmf35l');

  const res = await fetch(
    'https://api.cloudinary.com/v1_1/dtvnmf35l/image/upload',
    {
      method: 'POST',
      body: formData,
    }
  );

  if (!res.ok) {
    throw new Error('Image upload failed');
  }

  const data = await res.json();
  return data.secure_url;
};

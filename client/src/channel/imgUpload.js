import cloudinary from 'cloudinary-core';

cloudinary.cloudinary_js_config();

$(() => {
  if ($.fn.cloudinary_fileupload)
    $('input.cloudinary-fileupload[type=file]').cloudinary_fileupload();
});

var cl = new cloudinary.Cloudinary({
  cloud_name: 'grecvie',
  api_key: '399657373367251',
  api_secret: 'SuksbOzfKj58y6deiG18ZjJ_v9E'
});

module.exports = cl;

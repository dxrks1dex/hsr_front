export const convertPngToJpg = (src: string) => {
  return new Promise<string>((resolve) => {
    const img = new Image();
    img.crossOrigin = "anonymous"; // Важно для кросс-доменных запросов
    img.src = src;
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext("2d");
      ctx?.drawImage(img, 0, 0);
      resolve(canvas.toDataURL("image/jpeg")); // Конвертация в JPG
    };
  });
};

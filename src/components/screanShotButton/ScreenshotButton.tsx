import React, { useRef } from "react";

export const ScreenshotButton = () => {
  // const canvasRef = useRef(null);
  //
  // const takeScreenshot = async () => {
  //   try {
  //     // Запрашиваем разрешение на захват экрана
  //     const screenStream = await navigator.mediaDevices.getDisplayMedia({
  //       video: { mediaSource: "screen" },
  //     });
  //     const track = screenStream.getVideoTracks()[0];
  //     const imageCapture = new ImageCapture(track);
  //
  //     // Захватываем изображение с экрана
  //     const bitmap = await imageCapture.grabFrame();
  //     track.stop(); // Останавливаем захват экрана после получения кадра
  //
  //     // Отображаем кадр на canvas
  //     const canvas = canvasRef.current;
  //     canvas.width = bitmap.width;
  //     canvas.height = bitmap.height;
  //     const ctx = canvas.getContext("2d");
  //     ctx.drawImage(bitmap, 0, 0, bitmap.width, bitmap.height);
  //
  //     // Преобразуем canvas в изображение и скачиваем его
  //     canvas.toBlob((blob) => {
  //       const link = document.createElement("a");
  //       link.href = URL.createObjectURL(blob);
  //       link.download = "screenshot.png";
  //       link.click();
  //     }, "image/png");
  //   } catch (error) {
  //     console.error("Ошибка захвата экрана:", error);
  //   }
  // };

  return (
    <div>
      {/*<button onClick={takeScreenshot}>Сделать скриншот</button>*/}
      <canvas style={{ display: "none" }} />
    </div>
  );
};

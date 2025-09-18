import HandsIcon from '@/public/images/profile/mission/svg/hands.svg';
import AddIcon from '@/public/images/profile/mission/svg/plus_icon.svg';
import styles from './MissionType.module.scss';
import { useRef, useState } from 'react';
import Image from 'next/image';

interface IBonusMissionProps {
  handleDownload: () => void;
  handleUpload: () => void;
}

export const BonuseMissionView = ({ handleDownload, handleUpload }: IBonusMissionProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Проверяем тип файла
    if (!file.type.startsWith('image/')) {
      alert('Пожалуйста, выберите изображение (PNG/JPEG)');
      return;
    }

    setIsUploading(true);

    // Симуляция загрузки
    // await new Promise((resolve) => setTimeout(resolve, 2000));

    const imageUrl = URL.createObjectURL(file);
    setUploadedImage(imageUrl);
    setIsUploading(false);

    handleUpload();
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="grid h-full w-full grid-cols-2 gap-[20px]">
      <div className="relative col-span-1 row-span-2 h-full w-full overflow-hidden rounded-[20px] bg-[url('/images/profile/mission/video_bg.webp')] bg-cover bg-center">
        <div className="absolute top-1/2 left-1/2 flex w-[60%] -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center">
          <button
            type="button"
            className={`flex w-full flex-col items-center justify-center gap-[5px] ${styles.videoButton}`}
            onClick={handleDownload}
          >
            <HandsIcon className="cursor-pointer" />
          </button>
        </div>
        <span
          className={`absolute bottom-[10%] left-1/2 -translate-x-1/2 -translate-y-1/2 text-4xl font-semibold ${styles.btnText}`}
        >
          Interaction
        </span>
      </div>
      <div ref={containerRef} className={`col-span-1 row-span-1 ${styles.bonuseMissionText}`}>
        <p className="font-regular text-2xl leading-[2]">
          Открой инструкцию, выполни задание шаг за шагом и загрузи фото своего результата
        </p>
      </div>
      <div
        className={`relative col-span-1 row-span-1 flex items-center justify-center overflow-hidden ${styles.bonuseMissionText}`}
        style={{
          height: containerRef.current?.clientHeight,
        }}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="image/png,image/jpeg,image/jpg"
          onChange={handleFileUpload}
          className="hidden"
        />

        {uploadedImage ? (
          <div className="flex flex-col items-center justify-center gap-[10px]">
            <Image
              src={uploadedImage}
              alt="Uploaded"
              fill
              objectFit="cover"
              className="z-0 object-cover"
            />
            <button
              type="button"
              className="z-10 cursor-pointer"
              onClick={() => {
                setUploadedImage(null);
                fileInputRef.current?.click();
              }}
            >
              <span className="text-2xl font-semibold">Загрузить другой файл</span>
            </button>
          </div>
        ) : (
          <button
            type="button"
            className="flex flex-col items-center justify-center gap-[5px]"
            onClick={triggerFileInput}
            disabled={isUploading}
          >
            {isUploading ? (
              <>
                <div className="h-[50px] w-[50px] animate-spin rounded-full border-4 border-blue-500 border-t-transparent"></div>
                <span className="text-2xl">Загрузка...</span>
              </>
            ) : (
              <>
                <AddIcon className="w-[15%] cursor-pointer" />
                <span className={`${styles.subtitle} block w-[100%] text-3xl uppercase`}>
                  add your file png/jpeg
                </span>
              </>
            )}
          </button>
        )}
      </div>
    </div>
  );
};

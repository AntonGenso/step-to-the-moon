import styles from './MissionType.module.scss';
import { useRef, useState } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';

interface IBonusMissionProps {
  handleDownload: () => void;
  handleUpload: () => void;
}

export const BonuseMissionView = ({ handleDownload, handleUpload }: IBonusMissionProps) => {
  const t = useTranslations('mission');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert(t('selectImage'));
      return;
    }

    setIsUploading(true);
    const imageUrl = URL.createObjectURL(file);
    setUploadedImage(imageUrl);
    setIsUploading(false);

    handleUpload();
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className={styles.bonusWrapper}>
      {/* Instruction card */}
      <button
        type="button"
        className={`${styles.bonusCard} ${styles.instructionCard}`}
        onClick={handleDownload}
      >
        <div className={styles.bonusIconCircle}>
          <svg width="44%" height="44%" viewBox="0 0 48 48" fill="none" aria-hidden="true">
            <path
              d="M12 6h18l10 10v26H12V6z"
              stroke="#00d4c8"
              strokeWidth="3"
              strokeLinejoin="round"
              fill="rgba(0,200,200,0.08)"
            />
            <path
              d="M30 6v10h10"
              stroke="#00d4c8"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M18 22h14M18 29h14M18 36h8"
              stroke="#00d4c8"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
          </svg>
        </div>
        <span className={styles.activityLabel}>{t('seeInstruction')}</span>
        <span className={styles.activityHint}>{t('playNotGame')}</span>
      </button>

      {/* Upload card */}
      <button
        type="button"
        className={`${styles.bonusCard} ${styles.uploadCard}`}
        onClick={triggerFileInput}
        disabled={isUploading}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="image/png,image/jpeg,image/jpg"
          onChange={handleFileUpload}
          className="hidden"
        />

        {uploadedImage ? (
          <div className={styles.uploadPreview}>
            <Image src={uploadedImage} alt="Uploaded" fill className={styles.uploadPreviewImg} />
            <span className={styles.uploadPreviewText}>{t('uploadAnother')}</span>
          </div>
        ) : isUploading ? (
          <>
            <div className={styles.bonusIconCircle}>
              <span className={styles.spinner} />
            </div>
            <span className={styles.activityLabel}>{t('uploading')}</span>
          </>
        ) : (
          <>
            <div className={styles.bonusIconCircle}>
              <svg width="44%" height="44%" viewBox="0 0 48 48" fill="none" aria-hidden="true">
                <path
                  d="M24 32V16M24 16L16 24M24 16L32 24"
                  stroke="#fff"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path d="M10 36h28" stroke="#fff" strokeWidth="3" strokeLinecap="round" />
              </svg>
            </div>
            <span className={styles.activityLabel}>{t('uploadFile')}</span>
            <span className={styles.activityHint}>{t('sendUsFile')}</span>
          </>
        )}
      </button>
    </div>
  );
};

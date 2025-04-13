import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

const UploadSection = () => {
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [isCameraModalOpen, setIsCameraModalOpen] = useState(false);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const { toast } = useToast();

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleUpload(files);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleUpload(files);
    }
  };

  const handleUpload = async (files: FileList | File[]) => {
    setIsUploading(true);
    try {
      for (const file of Array.from(files)) {
        const formData = new FormData();
        formData.append('filename', file);

        await fetch('http://localhost:4000/upload', {
          method: 'POST',
          body: formData,
        });
      }

      toast({
        title: 'Upload successful',
        description: `${files.length} file(s) uploaded.`,
      });
    } catch (err) {
      toast({
        variant: 'destructive',
        title: 'Upload failed',
        description: 'Something went wrong while uploading files.',
      });
    } finally {
      setIsUploading(false);
    }
  };

  const openCameraModal = async () => {
    setIsCameraModalOpen(true);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (err) {
      toast({
        variant: 'destructive',
        title: 'Camera Error',
        description: 'Unable to access camera.',
      });
    }
  };

  const closeCameraModal = () => {
    setIsCameraModalOpen(false);
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    setCapturedImage(null);
  };

  const handleCapture = () => {
    if (videoRef.current && canvasRef.current) {
      const canvas = canvasRef.current;
      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
        const imageUrl = canvas.toDataURL('image/png');
        setCapturedImage(imageUrl);
      }
    }
  };

  const handleUploadCapturedImage = () => {
    if (!capturedImage) return;
    fetch(capturedImage)
      .then(res => res.blob())
      .then(blob => {
        const file = new File([blob], `scanned-${Date.now()}.png`, { type: 'image/png' });
        handleUpload([file]);
        closeCameraModal();
      });
  };

  return (
    <div
      className={`p-6 border-2 rounded-lg transition-colors ${
        isDragging ? 'border-cyan-500 bg-cyan-50' : 'border-dashed border-gray-300 bg-gray-50'
      }`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <motion.div
        initial={{ scale: 1 }}
        animate={{ scale: isDragging ? 1.02 : 1 }}
        transition={{ duration: 0.2 }}
        className="text-center"
      >
        <div className="text-4xl text-gray-400 mb-3">
          <i className="fas fa-cloud-upload-alt" />
        </div>
        <h3 className="text-lg font-semibold mb-1">Upload Medical Records</h3>
        <p className="text-sm text-gray-500 mb-4">Drag files here or use buttons below</p>

        <div className="flex justify-center gap-4 mt-2">
          <input
            ref={fileInputRef}
            type="file"
            multiple
            hidden
            onChange={handleFileChange}
          />
          <Button
            onClick={() => fileInputRef.current?.click()}
            className="bg-cyan-600 text-white"
            disabled={isUploading}
          >
            <i className="fas fa-plus mr-2" />
            {isUploading ? 'Uploading...' : 'Add Files'}
          </Button>

          <Button variant="outline" onClick={openCameraModal} disabled={isUploading}>
            <i className="fas fa-camera mr-2" />
            Scan Document
          </Button>
        </div>
      </motion.div>

      {isCameraModalOpen && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white rounded-lg p-6 max-w-md w-full shadow-lg">
            <h2 className="text-lg font-bold mb-4 text-center">Scan Document</h2>

            {!capturedImage ? (
              <video
                ref={videoRef}
                autoPlay
                playsInline
                className="w-full rounded-lg mb-4 border"
              />
            ) : (
              <img
                src={capturedImage}
                alt="Captured"
                className="w-full rounded-lg mb-4"
              />
            )}

            <canvas ref={canvasRef} className="hidden" />

            <div className="flex justify-center gap-4">
              {!capturedImage ? (
                <Button onClick={handleCapture} className="bg-cyan-600 text-white">
                  <i className="fas fa-camera mr-2" />
                  Capture
                </Button>
              ) : (
                <Button onClick={handleUploadCapturedImage} className="bg-cyan-600 text-white">
                  <i className="fas fa-upload mr-2" />
                  Upload
                </Button>
              )}
              <Button variant="ghost" onClick={closeCameraModal}>
                Cancel
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UploadSection;

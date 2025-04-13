import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Brain, FileText, Microscope, Stethoscope } from "lucide-react";
import { Link } from "wouter";
import { Service } from "@/types/inputs";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { ref, uploadBytes } from "firebase/storage";
import { storage } from "@/lib/firebase";

const services: Service[] = [
  {
    id: "skin-cancer",
    title: "Skin Cancer Detection",
    icon: <Microscope className="w-6 h-6" />,
    description: "Upload skin images for instant AI analysis",
    input: {
      type: "file",
      fileConfig: {
        accept: "image/jpeg,image/png",
        multiple: false,
        maxSize: 10
      }
    }
  },
  {
    id: "breast-cancer",
    title: "Breast Cancer Screening",
    icon: <Microscope className="w-6 h-6" />,
    description: "Analyze mammogram images with AI",
    input: {
      type: "file",
      fileConfig: {
        accept: "image/jpeg,image/png,image/dicom",
        multiple: false,
        maxSize: 50
      }
    }
  },
  {
    id: "lung-cancer",
    title: "Lung Cancer Detection",
    icon: <Stethoscope className="w-6 h-6" />,
    description: "CT scan and X-ray analysis",
    input: {
      type: "file",
      fileConfig: {
        accept: "image/jpeg,image/png,image/dicom",
        multiple: false,
        maxSize: 100
      }
    }
  },
  {
    id: "tuberculosis",
    title: "Tuberculosis Screening",
    icon: <Stethoscope className="w-6 h-6" />,
    description: "X-ray and CT scan analysis",
    input: {
      type: "file",
      fileConfig: {
        accept: "image/jpeg,image/png,image/dicom",
        multiple: false,
        maxSize: 50
      }
    }
  },
  {
    id: "parkinsons",
    title: "Parkinson's Detection",
    icon: <Brain className="w-6 h-6" />,
    description: "Voice recording analysis",
    input: {
      type: "audio",
      audioConfig: {
        maxDuration: 30,
        sampleRate: 44100,
        channels: 1
      }
    }
  },
  {
    id: "medical-records",
    title: "Medical Records",
    icon: <FileText className="w-6 h-6" />,
    description: "Store and manage your health records",
    input: {
      type: "file",
      fileConfig: {
        accept: ".pdf,.doc,.docx,.jpg,.png",
        multiple: true,
        maxSize: 25
      }
    }
  }
];

const ServicesSection = () => {
  const { toast } = useToast();
  const [uploading, setUploading] = useState<{ [key: string]: boolean }>({});
  const [results, setResults] = useState<{ [key: string]: { predicted_class: string; calming_tips: string[] } }>({});

  const handleFileUpload = async (serviceId: string, event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    setUploading(prev => ({ ...prev, [serviceId]: true }));

    try {
      const formData = new FormData();
      formData.append("image", files[0]);

      const response = await fetch("http://127.0.0.1:5000/predict", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        setResults(prev => ({
          ...prev,
          [serviceId]: data,
        }));

        toast({
          title: `Prediction: ${data.predicted_class}`,
          description: data.calming_tips?.join("\n"),
        });
      } else {
        toast({
          title: "Prediction Error",
          description: data.error || "Unknown error",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Upload error:", error);
      toast({
        title: "Error",
        description: "Failed to upload files",
        variant: "destructive",
      });
    } finally {
      setUploading(prev => ({ ...prev, [serviceId]: false }));
    }
  };

  return (
    <section className="mt-16 px-4 md:px-12 lg:px-20">
      <h2 className="text-3xl font-bold mb-10 text-gray-800 text-center">
        Available Services
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {services.map((service) => (
          <div key={service.id} className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all hover:scale-102">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 rounded-full bg-cyan-100 flex items-center justify-center mr-4">
                {service.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-800">{service.title}</h3>
            </div>
            <p className="text-gray-600 mb-4">{service.description}</p>
            <div className="flex items-center text-sm text-gray-500 mb-4">
              <span>Input Type: {service.input.type === "file" ? `Files (${service.input.fileConfig?.accept})` : "Audio Recording"}</span>
            </div>

            {service.input.type === "file" ? (
              <div className="space-y-2">
                <input
                  type="file"
                  id={`file-${service.id}`}
                  className="hidden"
                  accept={service.input.fileConfig?.accept}
                  multiple={service.input.fileConfig?.multiple}
                  onChange={(e) => handleFileUpload(service.id, e)}
                />
                <Button
                  className="w-full bg-cyan-500 hover:bg-cyan-600 text-white"
                  onClick={() => document.getElementById(`file-${service.id}`)?.click()}
                  disabled={uploading[service.id]}
                >
                  {uploading[service.id] ? "Uploading..." : "Start Screening"}
                </Button>
              </div>
            ) : (
              <Link href={`/service/${service.id}`}>
                <Button className="w-full bg-cyan-500 hover:bg-cyan-600 text-white">
                  Start Recording
                </Button>
              </Link>
            )}

            {/* Display report if available */}
            {results[service.id] && (
              <Card className="mt-4 p-4 border-t border-gray-200">
                <h4 className="text-lg font-semibold text-gray-800 mb-2">Screening Report</h4>
                <p className="text-gray-700 mb-2">
                  <strong>Prediction:</strong> {results[service.id].predicted_class}
                </p>
                <ul className="list-disc list-inside text-sm text-gray-600">
                  {results[service.id].calming_tips.map((tip, index) => (
                    <li key={index}>{tip}</li>
                  ))}
                </ul>
              </Card>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default ServicesSection;
import React, { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Toaster } from "@/components/ui/toaster";
import { toast } from "../hooks/use-toast";
import getBlobDuration from "get-blob-duration";
import { Mic, StopCircle, Rocket, Loader2 } from "lucide-react";
import { motion } from "framer-motion";

export default function ParkinsonRecorder() {
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [result, setResult] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const startRecording = async () => {
    setResult(null);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream, { mimeType: "audio/webm" });
      mediaRecorderRef.current = mediaRecorder;
      const chunks: Blob[] = [];

      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) chunks.push(e.data);
      };

      mediaRecorder.onstop = async () => {
        const completeBlob = new Blob(chunks, { type: "audio/webm" });

        try {
          const duration = await getBlobDuration(completeBlob);
          console.log("Recorded blob duration:", duration.toFixed(2), "seconds");
        } catch (e) {
          console.warn("Duration fetch failed:", e);
        }

        setAudioBlob(completeBlob);
        toast({ title: "Recording complete", description: "Your voice is ready for analysis." });
      };

      mediaRecorder.start();
      setIsRecording(true);
    } catch (err) {
      console.error("Mic error:", err);
      toast({ title: "Microphone access denied", variant: "destructive" });
    }
  };

  const stopRecording = () => {
    mediaRecorderRef.current?.stop();
    setIsRecording(false);
  };

  const sendAudioForAnalysis = async () => {
    if (!audioBlob) return;

    const formData = new FormData();
    formData.append("audio", audioBlob, "recording.webm");

    try {
      setIsAnalyzing(true);
      const res = await fetch("http://localhost:5000/parkinson", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Failed to analyze audio.");
      }

      const data = await res.json();

      if (data.prediction && data.probability !== undefined) {
        const formattedResult = `${data.prediction} (${data.probability.toFixed(2)}%)`;
        setResult(formattedResult);
        toast({ title: "Analysis complete", description: formattedResult });
      } else {
        setResult("No prediction available.");
        toast({ title: "Analysis failed", description: "Invalid response from server." });
      }
    } catch (error: any) {
      console.error("Error:", error);
      setResult(null);
      toast({
        title: "Error",
        description: error.message || "Something went wrong.",
        variant: "destructive",
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="min-h-screen px-6 py-10 flex items-center justify-center bg-gradient-to-b from-white to-blue-50">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-2xl"
      >
        <Card className="shadow-xl border border-gray-200 rounded-2xl">
          <CardContent className="p-8">
            <div className="text-center mb-6">
              <h1 className="text-3xl font-bold text-gray-800 mb-2">
                Parkinson’s Voice Analysis
              </h1>
              <p className="text-gray-600 text-sm">
                This tool uses AI to detect potential signs of Parkinson’s Disease through voice patterns.
                Please ensure a quiet environment before recording.
              </p>
            </div>

            <div className="flex flex-col md:flex-row justify-center gap-4 mb-6">
              {!isRecording ? (
                <Button
                  onClick={startRecording}
                  className="w-full md:w-1/2 bg-green-600 hover:bg-green-700 text-white"
                >
                  <Mic className="mr-2" /> Start Recording
                </Button>
              ) : (
                <Button
                  onClick={stopRecording}
                  className="w-full md:w-1/2 bg-red-600 hover:bg-red-700 text-white"
                >
                  <StopCircle className="mr-2" /> Stop Recording
                </Button>
              )}

              <Button
                onClick={sendAudioForAnalysis}
                disabled={!audioBlob || isAnalyzing}
                className="w-full md:w-1/2 bg-blue-700 text-white hover:bg-blue-800"
              >
                {isAnalyzing ? (
                  <>
                    <Loader2 className="animate-spin mr-2" /> Analyzing...
                  </>
                ) : (
                  <>
                    <Rocket className="mr-2" /> Analyze Audio
                  </>
                )}
              </Button>
            </div>

            {audioBlob && (
              <div className="mb-4">
                <p className="text-sm text-gray-500 mb-2">Recorded Audio:</p>
                <audio controls className="w-full rounded border">
                  <source src={URL.createObjectURL(audioBlob)} type="audio/webm" />
                  Your browser does not support the audio element.
                </audio>
              </div>
            )}

            {result && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4 px-4 py-3 rounded-md bg-blue-100 text-blue-800 font-semibold text-center"
              >
                Result: {result}
              </motion.div>
            )}
          </CardContent>
        </Card>

        <Toaster />
      </motion.div>
    </div>
  );
}
